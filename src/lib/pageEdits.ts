/**
 * Edited pages: DOM edit instructions saved by the ERP visual editor.
 *
 * Pure parsing / sanitization shared by the server proxy (route handlers,
 * generateMetadata) and the browser applier. No DOM or server-only imports.
 */

type JsonRecord = Record<string, unknown>;

export interface ImageEdit {
  /** New image URL (http/https only). */
  src?: string;
  alt?: string;
}

export type InsertLayout = "image-left" | "image-right";

export type EditInstruction =
  | {
      kind: "edit";
      selector: string;
      text?: string;
      /** Rich text; sanitized again (allow-list) by the browser applier. */
      html?: string;
      styles: [string, string][];
      image?: ImageEdit;
      backgroundImage?: string;
    }
  | { kind: "duplicate"; selector: string; id: string }
  | {
      kind: "insert";
      selector: string;
      id: string;
      position: "before" | "after";
      /** New section content; sanitized again (allow-list) by the applier. */
      html: string;
      layout?: InsertLayout;
      /** The website's typography per tag (h1-h4, p, li, th, td). */
      theme: [string, [string, string][]][];
    }
  | { kind: "move"; selector: string; target: string; position: "before" | "after" }
  | { kind: "remove"; selector: string };

export interface PageEditsSeo {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  robots?: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

export interface PageEdits {
  instructions: EditInstruction[];
  seo: PageEditsSeo;
  /** JSON-LD objects for this URL only (`seo.schema`). */
  schema: JsonRecord[];
  version?: number;
}

export interface EditedPageEntry {
  path: string;
  noindex: boolean;
}

export const CLONE_SELECTOR_PREFIX = "[data-erp-clone=";
export const CLONE_ID_PATTERN = /^[A-Za-z0-9-]{1,64}$/;

const MAX_SELECTOR_LENGTH = 2000;
const MAX_TEXT_LENGTH = 20000;
const MAX_HTML_LENGTH = 100_000;
const MAX_SCHEMA_ENTRIES = 20;
const MAX_SCHEMA_BYTES = 100_000;
const THEME_TAGS = new Set(["h1", "h2", "h3", "h4", "p", "li", "th", "td"]);
const SAFE_IMAGE_URL = /^https?:\/\/[^\s"'()<>\\]+$/i;
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

/** Absolute http(s) image URL without characters that could break CSS url(). */
export function safeEditImageUrl(value: unknown): string | undefined {
  return typeof value === "string" && value.length <= 2000 && SAFE_IMAGE_URL.test(value.trim())
    ? value.trim()
    : undefined;
}

function imageEdit(value: unknown): ImageEdit | undefined {
  if (!isRecord(value)) return undefined;
  const src = safeEditImageUrl(value.src);
  const alt = typeof value.alt === "string" ? value.alt.slice(0, 500) : undefined;
  return src || alt !== undefined ? { ...(src ? { src } : {}), ...(alt !== undefined ? { alt } : {}) } : undefined;
}

function sanitizeTheme(value: unknown): [string, [string, string][]][] {
  if (!isRecord(value)) return [];
  return Object.entries(value).flatMap(([tag, styles]): [string, [string, string][]][] => {
    const key = tag.toLowerCase();
    if (!THEME_TAGS.has(key)) return [];
    const clean = sanitizeStyles(styles);
    return clean.length ? [[key, clean]] : [];
  });
}

function htmlString(value: unknown): string | undefined {
  return typeof value === "string" && value.length <= MAX_HTML_LENGTH ? value : undefined;
}

function validSelector(value: unknown): string | undefined {
  const selector = nonEmptyString(value);
  return selector && selector.length <= MAX_SELECTOR_LENGTH ? selector : undefined;
}

function editInstruction(source: JsonRecord, stylesValue: unknown): EditInstruction | null {
  const selector = validSelector(source.selector);
  if (!selector) return null;
  const text =
    typeof source.text === "string" && source.text.length <= MAX_TEXT_LENGTH
      ? source.text
      : undefined;
  const html = htmlString(source.html);
  const styles = sanitizeStyles(stylesValue);
  const image = imageEdit(source.image);
  const backgroundImage = safeEditImageUrl(source.backgroundImage);
  if (text === undefined && html === undefined && styles.length === 0 && !image && !backgroundImage) {
    return null;
  }
  return {
    kind: "edit",
    selector,
    ...(text !== undefined ? { text } : {}),
    ...(html !== undefined ? { html } : {}),
    styles,
    ...(image ? { image } : {}),
    ...(backgroundImage ? { backgroundImage } : {}),
  };
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
    case "insert": {
      const id = typeof op.id === "string" ? op.id : "";
      const html = htmlString(op.html);
      if (!CLONE_ID_PATTERN.test(id) || html === undefined) return null;
      const layout =
        op.layout === "image-left" || op.layout === "image-right" ? op.layout : undefined;
      return {
        kind: "insert",
        selector,
        id,
        position: op.position === "before" ? "before" : "after",
        html,
        ...(layout ? { layout } : {}),
        theme: sanitizeTheme(op.theme),
      };
    }
    default:
      return null;
  }
}

const SECTION_TYPE_ACTIONS: Record<string, string> = {
  sectionDuplicate: "duplicate",
  sectionInsert: "insert",
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
        const styles =
          isRecord(section.styles) && Object.keys(section.styles).length
            ? section.styles
            : section.content.styles;
        const edit = editInstruction(section.content, styles);
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
    const edit = editInstruction(patch, patch.styles);
    return edit ? [edit] : [];
  });
  const ops = operations.filter(isRecord).flatMap((op) => {
    if (op.hidden === true || typeof op.action !== "string") return [];
    const instruction = operationInstruction(op.action, op);
    return instruction ? [instruction] : [];
  });
  return [...edits, ...ops];
}

function parseKeywords(value: unknown): string[] | undefined {
  const raw = Array.isArray(value) ? value : typeof value === "string" ? value.split(",") : [];
  const keywords = raw
    .filter((keyword): keyword is string => typeof keyword === "string")
    .map((keyword) => keyword.trim())
    .filter((keyword) => keyword && keyword.length <= 100)
    .slice(0, 30);
  return keywords.length ? keywords : undefined;
}

function parseSchema(rawSeo: unknown): JsonRecord[] {
  const raw = isRecord(rawSeo) ? rawSeo.schema : undefined;
  const list = Array.isArray(raw) ? raw : isRecord(raw) ? [raw] : [];
  return list
    .filter(isRecord)
    .filter((entry) => {
      try {
        return JSON.stringify(entry).length <= MAX_SCHEMA_BYTES;
      } catch {
        return false;
      }
    })
    .slice(0, MAX_SCHEMA_ENTRIES);
}

function parseSeo(rawSeo: unknown, title: unknown): PageEditsSeo {
  const seo = isRecord(rawSeo) ? rawSeo : {};
  const openGraph = isRecord(seo.openGraph) ? seo.openGraph : {};
  return {
    title: nonEmptyString(seo.title) ?? nonEmptyString(seo.metaTitle) ?? nonEmptyString(title),
    description: nonEmptyString(seo.metaDescription) ?? nonEmptyString(seo.description),
    canonicalUrl: nonEmptyString(seo.canonicalUrl),
    robots: nonEmptyString(seo.robots),
    keywords: parseKeywords(seo.keywords) ?? parseKeywords(seo.focusKeyword),
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
    schema: parseSchema(source.seo),
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
