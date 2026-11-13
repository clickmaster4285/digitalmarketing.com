import {
  CLONE_ID_PATTERN,
  CLONE_SELECTOR_PREFIX,
  sanitizeStyles,
  type EditInstruction,
} from "./pageEdits";

/**
 * Applies ERP edit instructions to the live DOM, in the same order as the ERP
 * visual editor, and returns a function that reverts every change.
 *
 * Reverting matters for React: framework-owned nodes must be back in their
 * original place (and with their original children) before React commits the
 * next route, otherwise it throws "Failed to execute 'removeChild'".
 */

type StyledElement = Element & ElementCSSInlineStyle;

function hasStyle(element: Element): element is StyledElement {
  return "style" in element && element.style instanceof CSSStyleDeclaration;
}

function isCloneSelector(selector: string): boolean {
  return selector.startsWith(CLONE_SELECTOR_PREFIX);
}

function query(root: ParentNode, selector: string): Element | null {
  try {
    return root.querySelector(selector);
  } catch {
    return null;
  }
}

/*
 * Selector resolution tolerant to differences between the DOM the ERP editor
 * recorded selectors against and the DOM visitors get:
 *  - GSAP ScrollTrigger wraps pinned elements in <div class="pin-spacer">
 *    after hydration; the editor records selectors without that wrapper.
 *  - The editor counts one extra element of its own at the top of <body>.
 * ERP selectors are chains of `tag:nth-of-type(n)` joined by ` > `, so they
 * can be walked step by step under a given "reading" of the DOM. One reading
 * is chosen per page (the one that resolves the most selectors) and used for
 * every instruction, so edits never mix interpretations.
 */
interface Reading {
  /** Added to the first `body > tag:nth-of-type(n)` index. */
  bodyOffset: number;
  /** Treat GSAP pin-spacer wrappers as if their children were in the parent. */
  skipPinSpacers: boolean;
}

const READINGS: Reading[] = [
  { bodyOffset: 0, skipPinSpacers: false }, // exact (plain querySelector)
  { bodyOffset: 0, skipPinSpacers: true },
  { bodyOffset: -1, skipPinSpacers: true },
  { bodyOffset: -1, skipPinSpacers: false },
  { bodyOffset: 1, skipPinSpacers: true },
  { bodyOffset: 1, skipPinSpacers: false },
];

const STEP_PATTERN = /^([a-z][a-z0-9-]*)(?::nth-of-type\((\d+)\))?$/i;

function parseChain(selector: string): { tag: string; index: number }[] | null {
  const steps = selector.split(">").map((step) => step.trim());
  if (steps[0]?.toLowerCase() !== "body") return null;
  const parsed: { tag: string; index: number }[] = [];
  for (const step of steps.slice(1)) {
    const match = STEP_PATTERN.exec(step);
    if (!match) return null;
    parsed.push({ tag: match[1].toUpperCase(), index: match[2] ? Number(match[2]) : 1 });
  }
  return parsed;
}

function isPinSpacer(element: Element): boolean {
  return element.tagName === "DIV" && element.classList.contains("pin-spacer");
}

function effectiveChildren(parent: Element, skipPinSpacers: boolean): Element[] {
  const children: Element[] = [];
  for (const child of Array.from(parent.children)) {
    if (skipPinSpacers && isPinSpacer(child)) {
      children.push(...effectiveChildren(child, true));
    } else {
      children.push(child);
    }
  }
  return children;
}

function resolveWith(root: Document, selector: string, reading: Reading): Element | null {
  if (reading.bodyOffset === 0 && !reading.skipPinSpacers) return query(root, selector);
  const chain = parseChain(selector);
  if (!chain || !root.body) return null;
  let node: Element = root.body;
  for (let i = 0; i < chain.length; i++) {
    const { tag, index } = chain[i];
    const position = index + (i === 0 ? reading.bodyOffset : 0);
    const sameTag = effectiveChildren(node, reading.skipPinSpacers).filter(
      (child) => child.tagName === tag,
    );
    const next = sameTag[position - 1];
    if (!next) return null;
    node = next;
  }
  return node;
}

function chooseReading(root: Document, selectors: string[]): Reading {
  let best = READINGS[0];
  let bestScore = -1;
  for (const reading of READINGS) {
    const score = selectors.filter((s) => resolveWith(root, s, reading)).length;
    if (score > bestScore) {
      best = reading;
      bestScore = score;
    }
    if (score === selectors.length) break;
  }
  return best;
}

/**
 * Entrance animations (framer-motion `initial`, GSAP `from`) leave inline
 * `opacity: 0` + `transform` on elements until they scroll into view. A clone
 * of such an element is never animated by the library, so it would stay
 * invisible forever: settle it (and its descendants) to the final state.
 */
function settleAnimatedClone(clone: Element) {
  for (const element of [clone, ...Array.from(clone.querySelectorAll("*"))]) {
    if (!hasStyle(element)) continue;
    const style = element.style;
    const opacity = style.opacity === "" ? 1 : Number(style.opacity);
    if (!(opacity < 1) && style.visibility !== "hidden") continue;
    style.removeProperty("opacity");
    style.removeProperty("visibility");
    style.removeProperty("transform");
    style.removeProperty("will-change");
  }
}

const PROPAGATED_STYLES = new Set(["color", "text-decoration"]);

export function applyPageEdits(
  instructions: EditInstruction[],
  root: Document = document,
): () => void {
  const styleSnapshots = new Map<StyledElement, string | null>();
  const childSnapshots = new Map<Element, Node[]>();
  const clones: Element[] = [];
  const moves: { element: Element; parent: Node; next: Node | null }[] = [];

  const setStyle = (element: Element, prop: string, value: string) => {
    if (!hasStyle(element)) return;
    if (!styleSnapshots.has(element)) {
      styleSnapshots.set(element, element.getAttribute("style"));
    }
    element.style.setProperty(prop, value, "important");
  };

  // Pass 1: resolve every plain selector against the original DOM, before
  // any duplicate shifts :nth-of-type positions.
  const plainSelectors = instructions.flatMap((instruction) =>
    [instruction.selector, instruction.kind === "move" ? instruction.target : ""].filter(
      (selector) => selector && !isCloneSelector(selector),
    ),
  );
  const reading = chooseReading(root, plainSelectors);
  const resolved = new Map<EditInstruction, Element | null>();
  const targets = new Map<EditInstruction, Element | null>();
  for (const instruction of instructions) {
    if (!isCloneSelector(instruction.selector)) {
      resolved.set(instruction, resolveWith(root, instruction.selector, reading));
    }
    if (instruction.kind === "move" && !isCloneSelector(instruction.target)) {
      targets.set(instruction, resolveWith(root, instruction.target, reading));
    }
  }

  // Duplicates, in order. Clones are not framework-owned.
  for (const instruction of instructions) {
    if (instruction.kind !== "duplicate") continue;
    const element = resolved.get(instruction);
    if (!element || !element.parentNode || !CLONE_ID_PATTERN.test(instruction.id)) continue;
    if (query(root, `[data-erp-clone="${instruction.id}"]`)) continue;
    const clone = element.cloneNode(true) as Element;
    clone.setAttribute("data-erp-clone", instruction.id);
    settleAnimatedClone(clone);
    element.after(clone);
    clones.push(clone);
  }

  // Pass 2: copy selectors, now that clones carry their attributes.
  for (const instruction of instructions) {
    if (isCloneSelector(instruction.selector)) {
      resolved.set(instruction, query(root, instruction.selector));
    }
    if (instruction.kind === "move" && isCloneSelector(instruction.target)) {
      targets.set(instruction, query(root, instruction.target));
    }
  }

  // Element edits, in order.
  for (const instruction of instructions) {
    if (instruction.kind !== "edit") continue;
    const element = resolved.get(instruction);
    if (!element) continue;

    if (typeof instruction.text === "string") {
      if (!childSnapshots.has(element)) {
        childSnapshots.set(element, Array.from(element.childNodes));
      }
      element.textContent = instruction.text;
    }

    // Re-sanitize: instructions may come from any caller.
    const styles = sanitizeStyles(Object.fromEntries(instruction.styles));
    for (const [prop, value] of styles) {
      setStyle(element, prop, value);
      if (PROPAGATED_STYLES.has(prop)) {
        element.querySelectorAll("*").forEach((child) => setStyle(child, prop, value));
      }
    }
  }

  // Moves and removes, in order.
  for (const instruction of instructions) {
    if (instruction.kind !== "move" && instruction.kind !== "remove") continue;
    const element = resolved.get(instruction);
    if (!element || !element.isConnected) continue;

    if (instruction.kind === "remove") {
      // Hide instead of element.remove(): the node may be React-owned.
      setStyle(element, "display", "none");
      continue;
    }

    const target = targets.get(instruction);
    if (!target || !target.isConnected || target === element || element.contains(target)) {
      continue;
    }
    const parent = element.parentNode;
    if (!parent) continue;
    moves.push({ element, parent, next: element.nextSibling });
    if (instruction.position === "before") target.before(element);
    else target.after(element);
  }

  let reverted = false;
  return () => {
    if (reverted) return;
    reverted = true;

    // Put moved nodes back, newest move first, while clones (possible
    // reference siblings) still exist.
    for (const { element, parent, next } of moves.reverse()) {
      try {
        parent.insertBefore(element, next && next.parentNode === parent ? next : null);
      } catch {
        // Parent left the document; React owns its fate now.
      }
    }
    for (const clone of clones) clone.remove();
    childSnapshots.forEach((children, element) => element.replaceChildren(...children));
    styleSnapshots.forEach((style, element) => {
      if (style === null) element.removeAttribute("style");
      else element.setAttribute("style", style);
    });
  };
}
