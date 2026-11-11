/**
 * Edited pages: DOM edit instructions saved by the ERP visual editor.
 *
 * Pure parsing / sanitization shared by the server proxy (route handlers,
 * generateMetadata) and the browser applier. No DOM or server-only imports.
 */

type JsonRecord = Record<string, unknown>;

export type EditInstruction =
  | { kind: "edit"; selector: string; text?: string; styles: [string, string][] }
  | { kind: "duplicate"; selector: string; id: string }
  | { kind: "move"; selector: string; target: string; position: "before" | "after" }
  | { kind: "remove"; selector: string };

export interface PageEditsSeo {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  robots?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

export interface PageEdits {
  instructions: EditInstruction[];
  seo: PageEditsSeo;
  version?: number;
}

export interface EditedPageEntry {
  path: string;
  noindex: boolean;
}

export const CLONE_SELECTOR_PREFIX = "[data-erp-clone=";
export const CLONE_ID_PATTERN = /^[A-Za-z0-9-]+$/;

const MAX_SELECTOR_LENGTH = 2000;
const MAX_TEXT_LENGTH = 20000;
const MAX_INSTRUCTIONS = 1000;

const ALLOWED_STYLE_PROPERTIES = new Set([
  "color",
  "font-size",
  "font-weight",
  "font-style",
  "font-family",
  "text-align",
  "text-transform",
  "text-decoration",
  "line-height",
  "letter-spacing",
  "background-color",
  "padding",
  "margin",
  "border",
  "border-width",
  "border-style",
  "border-color",
  "border-radius",
  "width",
  "max-width",
  "opacity",
]);

const STYLE_VALUE_PATTERN = /^[\w\s#(),.%'"+\-/]*$/;
const STYLE_VALUE_BLOCKLIST = /url\(|expression|javascript|@import/i;

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function nonEmptyString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

/**
 * Normalizes a URL path for comparison with ERP slugs: leading slash, no
 * trailing slash (except "/"), no query/hash. Returns null for anything that
 * does not look like a plain site path.
 */
export function normalizeEditPath(value: unknown): string | null {
  if (typeof value !== "string") return null;
  let path = value.trim().split(/[?#]/)[0];
  if (!path.startsWith("/")) path = `/${path}`;
  path = path.replace(/\/+$/, "") || "/";
  if (path.length > 512 || !/^[A-Za-z0-9/_\-.~%]*$/.test(path) || path.includes("//")) {
    return null;
  }
  return path;
}

export function sanitizeStyles(value: unknown): [string, string][] {
  if (!isRecord(value)) return [];
  const styles: [string, string][] = [];
  for (const [rawProp, rawValue] of Object.entries(value)) {
    const prop = rawProp.trim().toLowerCase();
    if (!ALLOWED_STYLE_PROPERTIES.has(prop)) continue;
    if (typeof rawValue !== "string" && typeof rawValue !== "number") continue;
    const cssValue = String(rawValue).trim();
    if (
      !cssValue ||
      cssValue.length > 200 ||
      !STYLE_VALUE_PATTERN.test(cssValue) ||
      STYLE_VALUE_BLOCKLIST.test(cssValue)
    ) {
      continue;
    }
    styles.push([prop, cssValue]);
  }
  return styles;
}

function validSelector(value: unknown): string | undefined {
  const selector = nonEmptyString(value);
  return selector && selector.length <= MAX_SELECTOR_LENGTH ? selector : undefined;
}

function editInstruction(
  selectorValue: unknown,
  textValue: unknown,
  stylesValue: unknown,
): EditInstruction | null {
  const selector = validSelector(selectorValue);
  if (!selector) return null;
  const text =
    typeof textValue === "string" && textValue.length <= MAX_TEXT_LENGTH
      ? textValue
      : undefined;
  const styles = sanitizeStyles(stylesValue);
  if (text === undefined && styles.length === 0) return null;
  return { kind: "edit", selector, text, styles };
}

function operationInstruction(
  action: string,
  op: JsonRecord,
): EditInstruction | null {
  const selector = validSelector(op.selector);
  if (!selector) return null;

  switch (action) {
    case "duplicate": {
      const id = typeof op.id === "string" ? op.id : "";
      return CLONE_ID_PATTERN.test(id) ? { kind: "duplicate", selector, id } : null;
    }
    case "move": {
      const target = validSelector(op.target);
      const position = op.position === "after" ? "after" : op.position === "before" ? "before" : null;
      return target && position ? { kind: "move", selector, target, position } : null;
    }
    case "remove":
      return { kind: "remove", selector };
    default:
      return null;
  }
}

const SECTION_TYPE_ACTIONS: Record<string, string> = {
  sectionDuplicate: "duplicate",
  sectionMove: "move",
  sectionRemove: "remove",
};

/** `data.page.sections` form (GET .../edited-pages/{slug}). */
function instructionsFromSections(sections: unknown[]): EditInstruction[] {
  return sections
    .filter(isRecord)
    .map((section, index) => ({ section, index }))
    .sort(
      (a, b) =>
        (typeof a.section.order === "number" ? a.section.order : 0) -
          (typeof b.section.order === "number" ? b.section.order : 0) ||
        a.index - b.index,
    )
    .flatMap(({ section }): EditInstruction[] => {
      if (section.hidden === true || !isRecord(section.content)) return [];
      const type = section.type;
      if (type === "elementEdit") {
        const edit = editInstruction(
          section.content.selector,
          section.content.text,
          section.styles ?? section.content.styles,
        );
        return edit ? [edit] : [];
      }
      const action = typeof type === "string" ? SECTION_TYPE_ACTIONS[type] : undefined;
      const op = action ? operationInstruction(action, section.content) : null;
      return op ? [op] : [];
    });
}

/** Flat form (GET .../page-edits?path=...). */
function instructionsFromFlat(data: JsonRecord): EditInstruction[] {
  const patches = Array.isArray(data.patches) ? data.patches : [];
  const operations = Array.isArray(data.operations) ? data.operations : [];
  const edits = patches.filter(isRecord).flatMap((patch) => {
    if (patch.hidden === true) return [];
    const edit = editInstruction(patch.selector, patch.text, patch.styles);
    return edit ? [edit] : [];
  });
  const ops = operations.filter(isRecord).flatMap((op) => {
    if (op.hidden === true || typeof op.action !== "string") return [];
    const instruction = operationInstruction(op.action, op);
    return instruction ? [instruction] : [];
  });
  return [...edits, ...ops];
}

function parseSeo(rawSeo: unknown, title: unknown): PageEditsSeo {
  const seo = isRecord(rawSeo) ? rawSeo : {};
  const openGraph = isRecord(seo.openGraph) ? seo.openGraph : {};
  return {
    title: nonEmptyString(seo.title) ?? nonEmptyString(seo.metaTitle) ?? nonEmptyString(title),
    description: nonEmptyString(seo.metaDescription) ?? nonEmptyString(seo.description),
    canonicalUrl: nonEmptyString(seo.canonicalUrl),
    robots: nonEmptyString(seo.robots),
    keywords: nonEmptyString(seo.keywords),
    ogTitle: nonEmptyString(seo.ogTitle) ?? nonEmptyString(openGraph.title),
    ogDescription: nonEmptyString(seo.ogDescription) ?? nonEmptyString(openGraph.description),
    ogImage: nonEmptyString(seo.ogImage) ?? nonEmptyString(openGraph.image),
  };
}

/** Parses either ERP response shape into sanitized, ordered instructions. */
export function parsePageEdits(payload: unknown): PageEdits | null {
  if (!isRecord(payload) || !isRecord(payload.data)) return null;
  const data = payload.data;
  const page = isRecord(data.page) ? data.page : null;

  const instructions = page
    ? Array.isArray(page.sections)
      ? instructionsFromSections(page.sections)
      : []
    : instructionsFromFlat(data);
  const source = page ?? data;

  return {
    instructions: instructions.slice(0, MAX_INSTRUCTIONS),
    seo: parseSeo(source.seo, source.title),
    version: typeof source.version === "number" ? source.version : undefined,
  };
}

/** Parses GET .../edited-pages into normalized path entries. */
export function parseEditedPagesList(payload: unknown): EditedPageEntry[] {
  if (!isRecord(payload) || !isRecord(payload.data) || !Array.isArray(payload.data.pages)) {
    return [];
  }
  return payload.data.pages.filter(isRecord).flatMap((page) => {
    const path = normalizeEditPath(page.slug);
    return path ? [{ path, noindex: page.noindex === true }] : [];
  });
}
