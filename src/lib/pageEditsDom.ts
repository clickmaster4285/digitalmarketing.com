import {
  CLONE_ID_PATTERN,
  CLONE_SELECTOR_PREFIX,
  safeEditImageUrl,
  sanitizeStyles,
  type EditInstruction,
} from "./pageEdits";
import { sanitizeRichHtml, type RichNode } from "./richText";

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
const TABLE_CELL_STYLES =
  /^(font-family|font-size|font-weight|font-style|line-height|letter-spacing|text-transform|text-align|border-color)$/;

// Responsive variants and lazy-load attributes would bring a replaced image's
// old file back, so they are updated too. Mirrors the ERP loader.
const LAZY_SRC = [
  "data-src", "data-lazy-src", "data-original", "data-lazy", "data-ll-src",
  "data-orig-src", "data-pagespeed-lazy-src", "data-actualsrc", "data-echo",
];
const LAZY_SRCSET = ["data-srcset", "data-lazy-srcset", "data-ll-srcset"];
const LAZY_BACKGROUND = [
  "data-bg", "data-background", "data-bg-image", "data-background-image",
  "data-lazy-background", "data-ll-bg",
];

const SLIDER_CLASS = /swiper|slick|carousel|owl-|splide|flickity|glide/i;
const POSITIONED = /^(absolute|fixed|sticky)$/;

// Sections added in the ERP editor: neutral layout that inherits the site's
// fonts and colours. Mirrors INSERTED_SECTION_CSS in the ERP loader.
const SECTION_STYLE_ID = "erp-section-style";
const INSERTED_SECTION_CSS =
  ".erp-section{box-sizing:border-box;width:100%;max-width:1200px;margin:48px auto;padding:0 20px}.erp-section>*:first-child{margin-top:0}.erp-section p{margin:0 0 12px}.erp-section h2,.erp-section h3,.erp-section h4{margin:24px 0 12px}.erp-section ul,.erp-section ol{margin:12px 0;padding-left:1.5em}.erp-section ul{list-style:disc}.erp-section ol{list-style:decimal}.erp-section img{display:block;max-width:100%;height:auto;margin:16px 0}.erp-section a{text-decoration:underline;text-underline-offset:3px}.erp-section table{width:100%;border-collapse:separate;border-spacing:0;margin:16px 0;border:1px solid rgba(127,127,127,.35);overflow:hidden}.erp-section th,.erp-section td{border:0 solid rgba(127,127,127,.35);border-right-width:1px;border-bottom-width:1px;padding:10px 12px;text-align:left;vertical-align:top}.erp-section tr>:last-child{border-right-width:0}.erp-section tr:last-child>*{border-bottom-width:0}.erp-section th{font-weight:600;background:rgba(127,127,127,.08)}.erp-section td p,.erp-section th p{margin:0}.erp-section.erp-layout-image-left,.erp-section.erp-layout-image-right{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);grid-template-rows:repeat(var(--erp-text-rows,1),auto) 1fr;column-gap:40px;align-items:start}.erp-layout-image-left>*{grid-column:2}.erp-layout-image-left>img:first-of-type{grid-column:1;grid-row:1/-1}.erp-layout-image-right>*{grid-column:1}.erp-layout-image-right>img:first-of-type{grid-column:2;grid-row:1/-1}.erp-layout-image-left>img:first-of-type,.erp-layout-image-right>img:first-of-type{width:100%;height:auto;margin:0;align-self:center}.erp-section .erp-section{margin:16px 0;padding:0}@media (max-width:767px){.erp-section.erp-layout-image-left,.erp-section.erp-layout-image-right{display:block}.erp-layout-image-left>img:first-of-type,.erp-layout-image-right>img:first-of-type{margin:16px 0}.erp-section img[style*=float]{float:none!important;width:100%!important}}";

/** Builds DOM nodes from the sanitized tree: never innerHTML. */
function buildNodes(doc: Document, nodes: RichNode[]): Node[] {
  return nodes.map((node) => {
    if (node.type === "text") return doc.createTextNode(node.value);
    const element = doc.createElement(node.tag);
    for (const [name, value] of Object.entries(node.attrs)) element.setAttribute(name, value);
    element.append(...buildNodes(doc, node.children));
    return element;
  });
}

function computed(element: Element): CSSStyleDeclaration {
  return element.ownerDocument.defaultView!.getComputedStyle(element);
}

type Gap = { node: StyledElement; child: Element; gap: number };

// ---- ERP-inserted FAQs -> accordion. Looks like the location pages' FAQ.
const FAQ_STYLE_ID = "erp-faq-style";
const FAQ_CSS =
  ".erp-faq{display:flex;flex-direction:column;gap:12px;margin:0 0 12px}" +
  ".erp-faq-item{border:1px solid hsl(var(--border)/.6);border-radius:16px;transition:border-color .3s,background .3s,box-shadow .3s}" +
  ".erp-faq-item:hover{border-color:rgba(255,61,119,.2)}" +
  ".erp-faq-item[data-open]{border-color:rgba(255,61,119,.3);background:linear-gradient(to right,rgba(255,61,119,.04),rgba(108,92,231,.04));box-shadow:0 1px 2px rgba(0,0,0,.05)}" +
  ".erp-faq-q{all:unset;box-sizing:border-box;width:100%;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:20px;cursor:pointer;text-align:left}" +
  ".erp-faq-q:focus-visible{outline:2px solid #FF3D77;outline-offset:2px;border-radius:16px}" +
  ".erp-faq-lead{display:flex;align-items:flex-start;gap:12px}" +
  ".erp-faq-num{flex:none;width:24px;height:24px;border-radius:999px;border:1px solid hsl(var(--border)/.6);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:500;color:hsl(var(--muted-foreground))}" +
  ".erp-faq-text{font-family:inherit;font-weight:500;font-size:15px;line-height:1.5;color:hsl(var(--foreground));transition:color .3s}" +
  "@media (min-width:768px){.erp-faq-text{font-size:16px}}" +
  ".erp-faq-item[data-open] .erp-faq-text{color:#FF3D77}" +
  ".erp-faq-icon{position:relative;flex:none;width:32px;height:32px;border-radius:999px;background:hsl(var(--muted)/.2);color:hsl(var(--muted-foreground));transition:background .3s,color .3s,transform .3s cubic-bezier(.65,0,.35,1)}" +
  ".erp-faq-item:hover .erp-faq-icon{background:rgba(255,61,119,.05)}" +
  ".erp-faq-icon::before,.erp-faq-icon::after{content:\"\";position:absolute;left:50%;top:50%;width:12px;height:1.5px;border-radius:1px;background:currentColor;transform:translate(-50%,-50%)}" +
  ".erp-faq-icon::after{transform:translate(-50%,-50%) rotate(90deg);transition:transform .3s cubic-bezier(.65,0,.35,1)}" +
  ".erp-faq-item[data-open] .erp-faq-icon{background:rgba(255,61,119,.1);color:#FF3D77;transform:rotate(180deg)}" +
  ".erp-faq-item[data-open] .erp-faq-icon::after{transform:translate(-50%,-50%) rotate(0deg)}" +
  ".erp-faq-a{display:grid;grid-template-rows:0fr;opacity:0;transition:grid-template-rows .3s cubic-bezier(.65,0,.35,1),opacity .3s}" +
  ".erp-faq-item[data-open] .erp-faq-a{grid-template-rows:1fr;opacity:1}" +
  ".erp-faq-a-inner{overflow:hidden;min-height:0}" +
  ".erp-faq-a-body{padding:8px 20px 20px 56px;font-size:14px;line-height:1.7;color:hsl(var(--muted-foreground))}" +
  ".erp-faq-a-body>*{margin:0 0 10px!important}.erp-faq-a-body>:last-child{margin-bottom:0!important}" +
  ".erp-faq-a-body ul{list-style:disc;padding-left:1.25em}.erp-faq-a-body ol{list-style:decimal;padding-left:1.25em}" +
  ".erp-faq-a-body a{color:#FF3D77;text-decoration:underline;text-underline-offset:3px}" +
  ".erp-faq-a-body strong,.erp-faq-a-body b{color:hsl(var(--foreground));font-weight:600}" +
  ".erp-faq-a-body img{max-width:100%;height:auto;border-radius:12px}" +
  "@media (max-width:640px){.erp-faq-a-body{padding-left:20px}}";

const FAQ_CONTEXT = /frequently asked|\bfaqs?\b/i;
const ANSWER_BLOCKS = new Set(["P", "UL", "OL", "TABLE", "BLOCKQUOTE", "FIGURE", "IMG", "PRE"]);

/** Own text, without the text of inserts nested inside it. */
const cleanText = (element: Element) => {
  let source = element;
  if (element.querySelector(".erp-section")) {
    source = element.cloneNode(true) as Element;
    source.querySelectorAll(".erp-section").forEach((nested) => nested.remove());
  }
  return (source.textContent ?? "").replace(/\s+/g, " ").trim();
};
/** "3. How long…" / "Q3) How long…" -> "How long…" (we number them ourselves). */
const stripNumber = (question: string) => question.replace(/^(?:q\s*)?\d{1,2}\s*[.):\-–]\s*/i, "").trim();

function isQuestion(element: Element): boolean {
  const text = cleanText(element);
  if (!text || text.length > 240) return false;
  if (/^H[1-6]$/.test(element.tagName)) return true;
  // A short paragraph that is entirely bold and ends with "?".
  if (element.tagName !== "P" || !text.endsWith("?")) return false;
  const bold = Array.from(element.querySelectorAll("strong,b"))
    .map(cleanText)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
  return bold.length >= text.length - 3;
}

const isHidden = (element: Element) =>
  "style" in element && (element as HTMLElement).style.getPropertyValue("display") === "none";

/** Headings and answer blocks of an inserted section, flattening nested inserts. */
function collectBlocks(container: Element, out: Element[]) {
  for (const child of Array.from(container.children)) {
    if (isHidden(child)) continue;
    if (child.classList.contains("erp-section") || child.classList.contains("erp-faq")) {
      if (child.classList.contains("erp-section")) collectBlocks(child, out);
      continue;
    }
    if (/^H[1-6]$/.test(child.tagName) || ANSWER_BLOCKS.has(child.tagName)) {
      out.push(child);
      // Inserts placed *inside* this block (e.g. after a span in a <p>).
      child.querySelectorAll(".erp-section").forEach((nested) => {
        if (nested.parentElement?.closest(".erp-section") === child.closest(".erp-section")) {
          collectBlocks(nested, out);
        }
      });
      continue;
    }
    collectBlocks(child, out);
  }
}

/** Copy of an answer block without nested inserts or duplicate ids. */
function answerCopy(block: Element): Element {
  const copy = block.cloneNode(true) as Element;
  copy.querySelectorAll(".erp-section").forEach((nested) => nested.remove());
  copy.removeAttribute("id");
  copy.querySelectorAll("[id]").forEach((node) => node.removeAttribute("id"));
  return copy;
}

function inFaqSection(element: Element): Element | null {
  const section = element.parentElement?.closest("section:not(.erp-section)");
  if (!section) return null;
  if (FAQ_CONTEXT.test(section.id) || FAQ_CONTEXT.test(String(section.className))) return section;
  const labels = Array.from(section.querySelectorAll("h1,h2,h3,h4,p,span"))
    .filter((node) => !node.closest(".erp-section"))
    .slice(0, 15);
  return labels.some((node) => FAQ_CONTEXT.test(cleanText(node).slice(0, 80))) ? section : null;
}

let faqCounter = 0;

function buildFaqAccordions(
  root: Document,
  clones: Element[],
  setStyle: (element: Element, prop: string, value: string) => void,
  headNodes: Element[],
) {
  // Top-level inserted sections, grouped by the page section they sit in.
  const groups = new Map<Element, Element[]>();
  for (const clone of clones) {
    if (!clone.isConnected || !clone.classList.contains("erp-section")) continue;
    if (clone.parentElement?.closest(".erp-section") || isHidden(clone)) continue;
    const faqSection = inFaqSection(clone);
    const key = faqSection ?? clone;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(clone);
  }

  groups.forEach((sections, key) => {
    const inFaq = key.tagName === "SECTION" && !key.classList.contains("erp-section");
    sections.sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));

    const blocks: Element[] = [];
    sections.forEach((section) => collectBlocks(section, blocks));

    const items: { question: string; answer: Element[] }[] = [];
    const intro: Element[] = [];
    const seen = new Set<string>();
    let current: { question: string; answer: Element[] } | null = null;
    for (const block of blocks) {
      if (isQuestion(block)) {
        const question = stripNumber(cleanText(block));
        const id = question.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
        if (seen.has(id)) {
          current = null; // repeated question: drop it and its answer
          continue;
        }
        seen.add(id);
        current = { question, answer: [] };
        items.push(current);
      } else if (current) {
        if (cleanText(block) || block.querySelector("img") || block.tagName === "IMG") current.answer.push(block);
      } else if (seen.size === 0) {
        intro.push(block);
      }
    }
    const answered = items.filter((item) => item.answer.length > 0);
    // Outside an FAQ section, only clear Q&A lists (2+ questions with "?") qualify.
    const looksLikeFaq = inFaq
      ? answered.length > 0
      : answered.length >= 2 && answered.every((item) => item.question.endsWith("?"));
    if (!looksLikeFaq) return;

    if (!root.getElementById(FAQ_STYLE_ID)) {
      const style = root.createElement("style");
      style.id = FAQ_STYLE_ID;
      style.textContent = FAQ_CSS;
      root.head.appendChild(style);
      headNodes.push(style);
    }

    // Continue the numbering of the page's own (still visible) FAQ items.
    let offset = 0;
    if (inFaq) {
      offset = Array.from(key.querySelectorAll("button"))
        .filter((button) => !button.closest(".erp-faq") && !button.closest(".erp-section"))
        .filter((button) => !isHidden(button) && cleanText(button).endsWith("?")).length;
    }

    const list = root.createElement("div");
    list.className = "erp-faq";
    list.setAttribute("data-erp-faq", "");
    if (intro.length) {
      const introBox = root.createElement("div");
      introBox.className = "erp-faq-a-body";
      introBox.style.padding = "0 0 8px";
      intro.forEach((block) => introBox.append(answerCopy(block)));
      list.append(introBox);
    }

    const rows: HTMLElement[] = [];
    const setOpen = (open: HTMLElement | null) => {
      rows.forEach((row) => {
        const isOpen = row === open;
        row.toggleAttribute("data-open", isOpen);
        row.querySelector("button")?.setAttribute("aria-expanded", String(isOpen));
      });
    };

    answered.forEach((item, index) => {
      const uid = `erp-faq-${++faqCounter}`;
      const row = root.createElement("div");
      row.className = "erp-faq-item";

      const button = root.createElement("button");
      button.type = "button";
      button.className = "erp-faq-q";
      button.id = `${uid}-q`;
      button.setAttribute("aria-controls", `${uid}-a`);
      const lead = root.createElement("span");
      lead.className = "erp-faq-lead";
      const number = root.createElement("span");
      number.className = "erp-faq-num";
      number.textContent = String(offset + index + 1);
      const text = root.createElement("span");
      text.className = "erp-faq-text";
      text.textContent = item.question;
      lead.append(number, text);
      const icon = root.createElement("span");
      icon.className = "erp-faq-icon";
      icon.setAttribute("aria-hidden", "true");
      button.append(lead, icon);
      button.addEventListener("click", () => setOpen(row.hasAttribute("data-open") ? null : row));

      const panel = root.createElement("div");
      panel.className = "erp-faq-a";
      panel.id = `${uid}-a`;
      panel.setAttribute("role", "region");
      panel.setAttribute("aria-labelledby", button.id);
      const inner = root.createElement("div");
      inner.className = "erp-faq-a-inner";
      const body = root.createElement("div");
      body.className = "erp-faq-a-body";
      item.answer.forEach((block) => body.append(answerCopy(block)));
      inner.append(body);
      panel.append(inner);

      row.append(button, panel);
      rows.push(row);
      list.append(row);
    });
    // Like the site's FAQ: the first answer starts open, unless the page's own items come first.
    setOpen(offset === 0 ? rows[0] ?? null : null);

    sections[0].before(list);
    clones.push(list);
    sections.forEach((section) => setStyle(section, "display", "none"));
  });
}

export function applyPageEdits(
  instructions: EditInstruction[],
  root: Document = document,
): () => void {
  const styleSnapshots = new Map<StyledElement, string | null>();
  const attrSnapshots = new Map<Element, Map<string, string | null>>();
  const childSnapshots = new Map<Element, Node[]>();
  const clones: Element[] = [];
  const headNodes: Element[] = [];
  const moves: { element: Element; parent: Node; next: Node | null }[] = [];
  const view = root.defaultView ?? window;

  const snapshotStyle = (element: Element) => {
    if (hasStyle(element) && !styleSnapshots.has(element)) {
      styleSnapshots.set(element, element.getAttribute("style"));
    }
  };
  const setStyle = (element: Element, prop: string, value: string) => {
    if (!hasStyle(element)) return;
    snapshotStyle(element);
    element.style.setProperty(prop, value, "important");
  };
  const setAttr = (element: Element, name: string, value: string | null) => {
    let snapshot = attrSnapshots.get(element);
    if (!snapshot) {
      snapshot = new Map();
      attrSnapshots.set(element, snapshot);
    }
    if (!snapshot.has(name)) snapshot.set(name, element.getAttribute(name));
    if (value === null) element.removeAttribute(name);
    else element.setAttribute(name, value);
  };
  const replaceChildren = (element: Element, nodes: Node[]) => {
    if (!childSnapshots.has(element)) childSnapshots.set(element, Array.from(element.childNodes));
    element.replaceChildren(...nodes);
  };

  // ---- "Make room": changed text or added content may no longer fit a
  // fixed-height box (e.g. a hero). Mirrors makeRoomForCopy in the ERP loader.
  const coverBackground = (node: StyledElement) => {
    const style = computed(node);
    if (style.backgroundImage !== "none" && /^auto/.test(style.backgroundSize)) {
      setStyle(node, "background-size", "cover");
    }
  };
  const liftFixedHeight = (node: StyledElement) => {
    if (node.style.getPropertyPriority("height") === "important" && node.style.height !== "auto") return;
    const height = node.getBoundingClientRect().height;
    const before = node.getAttribute("style");
    node.style.setProperty("height", "auto", "important");
    node.style.setProperty("max-height", "none", "important");
    if (node.getBoundingClientRect().height <= height + 1) {
      if (before === null) node.removeAttribute("style");
      else node.setAttribute("style", before);
      return;
    }
    if (!styleSnapshots.has(node)) styleSnapshots.set(node, before);
    coverBackground(node);
  };
  const coveredTop = (node: Element, child: Element): number => {
    const box = node.getBoundingClientRect();
    const style = computed(node);
    let covered = parseFloat(style.paddingTop) + parseFloat(style.borderTopWidth) || 0;
    const y = box.top + 2;
    if (y < 0 || y > view.innerHeight || !root.elementsFromPoint) return covered;
    for (const at of [0.1, 0.5, 0.9]) {
      for (const element of root.elementsFromPoint(box.left + box.width * at, y)) {
        if (element.contains(node) || child.contains(element) || element.contains(child)) continue;
        const rect = element.getBoundingClientRect();
        if (rect.height >= box.height * 0.6 || rect.top > box.top + 2) continue;
        for (let item: Element | null = element; item && item !== node; item = item.parentElement) {
          if (POSITIONED.test(computed(item).position)) {
            covered = Math.max(covered, rect.bottom - box.top);
            break;
          }
        }
      }
    }
    return covered;
  };
  const contentTop = (child: Element): number => {
    let top = child.getBoundingClientRect().top;
    for (let item = child.previousElementSibling; item; item = item.previousElementSibling) {
      const rect = item.getBoundingClientRect();
      if (rect.height && !POSITIONED.test(computed(item).position)) top = Math.min(top, rect.top);
    }
    return top;
  };
  const topGaps = (element: Element | null): Gap[] => {
    const gaps: Gap[] = [];
    if (!element) return gaps;
    let child: Element = element;
    let node = element.parentElement;
    for (let depth = 0; node && node !== root.body && depth < 12; depth += 1) {
      if (typeof node.className === "string" && SLIDER_CLASS.test(node.className)) break;
      if (hasStyle(node)) {
        const gap = contentTop(child) - node.getBoundingClientRect().top;
        gaps.push({ node, child, gap: Math.min(gap, coveredTop(node, child) + 24) });
      }
      child = node;
      node = node.parentElement;
    }
    return gaps;
  };
  // Height of each node before we first gave it a min-height, so repeated
  // runs (load, fonts) never build on their own growth.
  const baseHeights = new Map<StyledElement, number>();
  const keepTopGaps = (gaps: Gap[]) => {
    for (const { node, child, gap } of gaps) {
      if (!node.isConnected || !node.contains(child)) continue;
      if (node.style.getPropertyPriority("height") === "important" && node.style.height !== "auto") continue;
      // Extra height only moves content down in a flex/grid box that centres
      // or bottom-aligns it (heroes). In normal flow it just adds blank space.
      if (!/flex|grid/.test(computed(node).display)) continue;
      if (!baseHeights.has(node)) {
        const ownMinHeight = node.style.getPropertyValue("min-height");
        if (ownMinHeight) node.style.removeProperty("min-height");
        baseHeights.set(node, node.getBoundingClientRect().height);
        if (ownMinHeight) node.style.setProperty("min-height", ownMinHeight, "important");
      }
      const base = baseHeights.get(node) ?? 0;
      // Never more than the lost gap twice over, and never more than a screen.
      const limit = base + Math.min(Math.max(gap, 0) * 2, view.innerHeight);
      const lostNow = () => gap - (contentTop(child) - node.getBoundingClientRect().top);
      const before = node.style.getPropertyValue("min-height");
      let grew = false;
      let factor = 1;
      for (let tries = 0; tries < 4; tries += 1) {
        const lost = lostNow();
        const height = parseFloat(computed(node).height);
        if (lost <= 1 || !Number.isFinite(height)) break;
        const next = Math.min(height + Math.ceil(lost * factor), limit);
        if (next <= height + 0.5) break;
        setStyle(node, "min-height", `${next}px`);
        const moved = lost - lostNow();
        if (moved <= 0.5) break;
        grew = true;
        factor = Math.min((next - height) / moved, 4);
      }
      if (grew) coverBackground(node);
      else if (node.style.getPropertyValue("min-height") !== before) {
        // It didn't help: don't leave the extra height behind.
        if (before) node.style.setProperty("min-height", before, "important");
        else node.style.removeProperty("min-height");
      }
    }
  };
  const makeRoomFor = (element: Element, gaps: Gap[]) => {
    keepTopGaps(gaps);
    if (
      hasStyle(element) &&
      element !== root.body &&
      !/auto|scroll/.test(computed(element).overflowY) &&
      element.scrollHeight > element.clientHeight + 1
    ) {
      liftFixedHeight(element);
    }
    let node = element.parentElement;
    for (let depth = 0; node && node !== root.body && depth < 12; depth += 1) {
      if (typeof node.className === "string" && SLIDER_CLASS.test(node.className)) break;
      if (!hasStyle(node)) break;
      const style = computed(node);
      let box = node.getBoundingClientRect();
      if (
        style.display.includes("flex") &&
        style.flexDirection.startsWith("row") &&
        style.flexWrap === "nowrap" &&
        element.getBoundingClientRect().right > box.right + 1
      ) {
        setStyle(node, "flex-wrap", "wrap");
      }
      const elementBox = element.getBoundingClientRect();
      box = node.getBoundingClientRect();
      if (elementBox.bottom > box.bottom + 1) liftFixedHeight(node);
      if (elementBox.right > box.right + 1 && /hidden|clip/.test(style.overflowX)) {
        setStyle(node, "width", "auto");
        setStyle(node, "max-width", "none");
      }
      node = node.parentElement;
    }
  };

  // ---- Element edits.
  const applyImage = (instruction: Extract<EditInstruction, { kind: "edit" }>, element: Element) => {
    const image = instruction.image;
    if (image && element.tagName === "IMG") {
      const src = image.src ? safeEditImageUrl(image.src) : undefined;
      if (src) {
        setAttr(element, "src", src);
        setAttr(element, "srcset", null);
        setAttr(element, "sizes", null);
        for (const name of LAZY_SRC) if (element.hasAttribute(name)) setAttr(element, name, src);
        for (const name of LAZY_SRCSET) if (element.hasAttribute(name)) setAttr(element, name, null);
        // <source> nodes may be framework-owned: point them at the new file
        // instead of removing them.
        element.closest("picture")?.querySelectorAll("source").forEach((source) => {
          setAttr(source, "srcset", src);
          setAttr(source, "type", null);
        });
      }
      if (typeof image.alt === "string") setAttr(element, "alt", image.alt);
    }
    const background = safeEditImageUrl(instruction.backgroundImage);
    if (background) {
      setStyle(element, "background-image", `url("${background}")`);
      for (const name of LAZY_BACKGROUND) if (element.hasAttribute(name)) setAttr(element, name, null);
    }
  };

  const changesText = (instruction: EditInstruction) =>
    instruction.kind === "edit" && (instruction.text !== undefined || instruction.html !== undefined);

  const applyEdit = (instruction: Extract<EditInstruction, { kind: "edit" }>, element: Element | null) => {
    if (!element) return;
    applyImage(instruction, element);

    if (typeof instruction.html === "string") {
      replaceChildren(element, buildNodes(root, sanitizeRichHtml(instruction.html)));
    } else if (typeof instruction.text === "string") {
      // Plain text: every line break shows as a new line.
      const nodes: Node[] = [];
      instruction.text.split("\n").forEach((line, index) => {
        if (index) nodes.push(root.createElement("br"));
        nodes.push(root.createTextNode(line));
      });
      replaceChildren(element, nodes);
    }

    // Re-sanitize: instructions may come from any caller.
    const styles = sanitizeStyles(Object.fromEntries(instruction.styles));
    const isTablePart = /^(TABLE|THEAD|TBODY|TFOOT|TR)$/.test(element.tagName);
    for (const [prop, value] of styles) {
      setStyle(element, prop, value);
      // Colour/decoration also go on descendants so theme rules on inner
      // links/spans cannot override them; table text styles go on its cells.
      if (PROPAGATED_STYLES.has(prop)) {
        element.querySelectorAll("*").forEach((child) => setStyle(child, prop, value));
      } else if (isTablePart && TABLE_CELL_STYLES.test(prop)) {
        element.querySelectorAll("th,td").forEach((cell) => setStyle(cell, prop, value));
      }
    }
  };

  // ---- Inserted sections.
  const addSectionStyle = () => {
    if (root.getElementById(SECTION_STYLE_ID)) return;
    const style = root.createElement("style");
    style.id = SECTION_STYLE_ID;
    style.textContent = INSERTED_SECTION_CSS;
    root.head.appendChild(style);
    headNodes.push(style);
  };
  const insertSection = (instruction: Extract<EditInstruction, { kind: "insert" }>, element: Element) => {
    addSectionStyle();
    const section = root.createElement("section");
    section.className = "erp-section";
    section.setAttribute("data-erp-clone", instruction.id);
    section.append(...buildNodes(root, sanitizeRichHtml(instruction.html)));
    if (instruction.layout) section.classList.add(`erp-layout-${instruction.layout}`);
    const textRows = section.children.length - (section.querySelector(":scope > img") ? 1 : 0);
    section.style.setProperty("--erp-text-rows", String(Math.max(textRows, 1)));
    const gaps = topGaps(element);
    if (instruction.position === "before") element.before(section);
    else element.after(section);
    clones.push(section);
    grow.push([section, gaps]);

    // The website's typography for this section (values passed the style
    // allow-list, which excludes braces and semicolons).
    const scope = `.erp-section[data-erp-clone="${instruction.id}"]`;
    const css = instruction.theme
      .map(([tag, styles]) => {
        const clean = sanitizeStyles(Object.fromEntries(styles));
        return clean.length
          ? `${scope} ${tag}{${clean.map(([prop, value]) => `${prop}:${value}`).join(";")}}`
          : "";
      })
      .join("");
    if (css) {
      const themeStyle = root.createElement("style");
      themeStyle.setAttribute("data-erp-theme", instruction.id);
      themeStyle.textContent =
        css +
        `${scope} th p,${scope} td p,${scope} li p{font-family:inherit;font-size:inherit;font-weight:inherit;font-style:inherit;line-height:inherit;letter-spacing:inherit;text-transform:inherit;color:inherit}`;
      root.head.appendChild(themeStyle);
      headNodes.push(themeStyle);
    }
  };

  // Pass 1: resolve every plain selector against the original DOM, before
  // any copy/insert/move shifts :nth-of-type positions.
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

  const grow: [Element, Gap[]][] = [];
  const gapsFor = new Map<EditInstruction, Gap[]>();
  const edits = instructions.filter(
    (instruction): instruction is Extract<EditInstruction, { kind: "edit" }> => instruction.kind === "edit",
  );

  // Layout before the text changes, to keep heroes from growing upwards.
  for (const instruction of edits) {
    const element = resolved.get(instruction);
    if (element && changesText(instruction)) gapsFor.set(instruction, topGaps(element));
  }

  // Text/design/image edits on the original page.
  for (const instruction of edits) {
    if (!isCloneSelector(instruction.selector)) applyEdit(instruction, resolved.get(instruction) ?? null);
  }

  // Copies, inserted sections, moves and removes, in order. Copy selectors
  // are looked up when used: after the copy has been made.
  for (const instruction of instructions) {
    if (instruction.kind === "edit") continue;
    const element = isCloneSelector(instruction.selector)
      ? query(root, instruction.selector)
      : resolved.get(instruction);
    if (!element || !element.isConnected || !element.parentNode) continue;

    if (instruction.kind === "remove") {
      // Hide instead of element.remove(): the node may be React-owned.
      setStyle(element, "display", "none");
      continue;
    }

    if (instruction.kind === "duplicate" || instruction.kind === "insert") {
      if (!CLONE_ID_PATTERN.test(instruction.id)) continue;
      // Already applied (e.g. edits ran twice): don't add a second copy.
      if (query(root, `[data-erp-clone="${instruction.id}"]`)) continue;
      if (instruction.kind === "insert") {
        insertSection(instruction, element);
        continue;
      }
      const clone = element.cloneNode(true) as Element;
      clone.setAttribute("data-erp-clone", instruction.id);
      settleAnimatedClone(clone);
      const gaps = topGaps(element);
      element.after(clone);
      clones.push(clone);
      grow.push([clone, gaps]);
      continue;
    }

    const target = isCloneSelector(instruction.target)
      ? query(root, instruction.target)
      : targets.get(instruction);
    if (!target || !target.isConnected || target === element || element.contains(target)) {
      continue;
    }
    moves.push({ element, parent: element.parentNode, next: element.nextSibling });
    if (instruction.position === "before") target.before(element);
    else target.after(element);
  }

  // Text/design edits made on copies and inserted sections.
  for (const instruction of edits) {
    if (!isCloneSelector(instruction.selector)) continue;
    const element = query(root, instruction.selector);
    if (element && changesText(instruction)) gapsFor.set(instruction, topGaps(element));
    applyEdit(instruction, element);
    resolved.set(instruction, element);
  }

  for (const instruction of edits) {
    if (!changesText(instruction)) continue;
    const element = resolved.get(instruction);
    if (element) grow.push([element, gapsFor.get(instruction) ?? []]);
  }

  // Sections emptied by removes (or inserted and then cleared in the editor)
  // would still keep their padding/margins: blank bands across the page.
  const showsNothing = (element: Element): boolean => {
    if (!(element instanceof view.HTMLElement) || typeof element.innerText !== "string") return false;
    if (element.innerText.trim()) return false;
    return !Array.from(element.querySelectorAll("img,picture,video,iframe,canvas,svg,input,select,textarea")).some(
      (media) => media.getClientRects().length > 0,
    );
  };
  const emptied = new Set<Element>();
  for (const instruction of instructions) {
    if (instruction.kind !== "remove") continue;
    const element = isCloneSelector(instruction.selector)
      ? query(root, instruction.selector)
      : resolved.get(instruction);
    const section = element?.parentElement?.closest("section");
    if (section && section.closest("main")) emptied.add(section);
  }
  clones.forEach((clone) => {
    if (clone.classList.contains("erp-section")) emptied.add(clone);
  });
  emptied.forEach((section) => {
    try {
      if (section.isConnected && showsNothing(section)) setStyle(section, "display", "none");
    } catch {
      // Best effort.
    }
  });

  // FAQs typed into the ERP arrive as plain headings + paragraphs. Show them
  // as the site's accordion instead (collapsed, + button, one open at a time).
  try {
    buildFaqAccordions(root, clones, setStyle, headNodes);
  } catch {
    // Best effort: the plain inserted content stays visible.
  }

  let reverted = false;
  const makeRoom = () => {
    if (reverted) return;
    for (const [element, gaps] of grow) {
      try {
        if (element.isConnected) makeRoomFor(element, gaps);
      } catch {
        // Layout measurement is best effort.
      }
    }
  };
  makeRoom();
  // Images and web fonts can finish later and make the content taller again.
  if (grow.length) {
    if (root.readyState !== "complete") view.addEventListener("load", makeRoom, { once: true });
    root.fonts?.ready.then(makeRoom).catch(() => {});
  }

  return () => {
    if (reverted) return;
    reverted = true;
    view.removeEventListener("load", makeRoom);

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
    for (const node of headNodes) node.remove();
    childSnapshots.forEach((children, element) => element.replaceChildren(...children));
    styleSnapshots.forEach((style, element) => {
      if (style === null) element.removeAttribute("style");
      else element.setAttribute("style", style);
    });
    attrSnapshots.forEach((snapshot, element) => {
      snapshot.forEach((value, name) => {
        if (value === null) element.removeAttribute(name);
        else element.setAttribute(name, value);
      });
    });
  };
}
