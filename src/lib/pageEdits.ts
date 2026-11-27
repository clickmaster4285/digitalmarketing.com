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
      /** The website's typography per tag (h1-h4, p, li, th, td, btn). */
      theme: [string, [string, string][]][];
      /** "custom": built in the ERP's visual builder or written as HTML/CSS. */
      sectionKind?: "custom";
      /** Custom sections only: CSS nested in the section's scope (validated). */
      css?: string;
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
const THEME_TAGS = new Set(["h1", "h2", "h3", "h4", "p", "li", "th", "td", "btn"]);
const MAX_CUSTOM_CSS_LENGTH = 20_000;
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
  "height",
  "min-height",
  "max-height",
  "object-fit",
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
    const safeValue = withinLayoutLimits(prop, cssValue);
    if (safeValue) styles.push([prop, safeValue]);
  }
  return styles;
}

/**
 * Largest size (in px; em/rem count as 16px, vh/vw as 10px per unit) each
 * property may get from an ERP edit. A typo like `margin: 2000px` or
 * `font-size: 400px` would otherwise blow the page apart into blank screens.
 */
const MAX_PX: Record<string, number> = {
  padding: 160,
  margin: 160,
  "font-size": 120,
  "line-height": 160,
  "letter-spacing": 24,
  border: 24,
  "border-width": 24,
  width: 2400,
  "max-width": 2400,
  height: 2400,
  "min-height": 2400,
  "max-height": 2400,
};
const UNIT_PX: Record<string, number> = { px: 1, em: 16, rem: 16, vh: 10, vw: 10, pt: 1.34 };

/** Clamps sizes to MAX_PX and keeps opacity visible; `null` drops the style. */
export function withinLayoutLimits(prop: string, value: string): string | null {
  if (prop === "opacity") {
    const amount = parseFloat(value);
    if (!Number.isFinite(amount)) return null;
    // Hiding is what "remove" edits are for; a faded-out section reads as a blank page.
    return String(Math.min(1, Math.max(0.3, value.trim().endsWith("%") ? amount / 100 : amount)));
  }
  const max = MAX_PX[prop];
  if (max === undefined) return value;
  // calc()/clamp()/var() can't be checked here.
  if (value.includes("(")) return null;
  if (prop === "line-height" && /^\d*\.?\d+$/.test(value.trim())) {
    return String(Math.min(4, parseFloat(value)));
  }
  return value.replace(/(-?\d*\.?\d+)(px|r?em|vh|vw|pt|%)?/g, (match, raw: string, unit?: string) => {
    const amount = parseFloat(raw);
    if (!Number.isFinite(amount) || !unit) return match;
    if (unit === "%") {
      const pctLimit = /width|height/.test(prop) ? 100 : prop === "padding" || prop === "margin" ? 10 : 400;
      return `${Math.min(pctLimit, Math.max(-pctLimit, amount))}%`;
    }
    const limit = max / UNIT_PX[unit];
    const clamped = Math.min(limit, Math.max(-limit, amount));
    return `${Number(clamped.toFixed(2))}${unit}`;
  });
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

/**
 * A custom section's CSS, nested in its scope (`<scope>{<css>}`), or
 * `undefined` when any check fails (the section is still shown, unstyled):
 * at most 20,000 characters without comments; no `<`, `@import`,
 * `expression(`, `javascript:`, `behavior:` or `-moz-binding`; every url() is
 * https; no escapes outside strings (they could spell `url(`); braces
 * balanced outside strings and never closing the section's scope.
 */
export function validateCustomCss(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const css = value.replace(/\/\*[\s\S]*?\*\//g, "").trim();
  if (!css || css.length > MAX_CUSTOM_CSS_LENGTH || css.includes("/*")) return undefined;
  if (/<|@import|expression\s*\(|javascript\s*:|behavior\s*:|-moz-binding/i.test(css)) return undefined;
  const urls = css.match(/url\s*\(/gi)?.length ?? 0;
  const httpsUrls = css.match(/url\s*\(\s*['"]?https:\/\//gi)?.length ?? 0;
  if (urls !== httpsUrls || /image-set\s*\(|\bsrc\s*\(/i.test(css)) return undefined;
  let depth = 0;
  let quote: string | null = null;
  let escaped = false;
  for (const char of css) {
    if (quote) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === quote) quote = null;
      else if (char === "\n") return undefined;
    } else if (char === "\\") {
      return undefined;
    } else if (char === '"' || char === "'") {
      quote = char;
    } else if (char === "{") {
      depth += 1;
    } else if (char === "}") {
      depth -= 1;
      if (depth < 0) return undefined;
    }
  }
  return depth === 0 && !quote ? css : undefined;
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
      const custom = op.kind === "custom";
      const css = custom ? validateCustomCss(op.css) : undefined;
      return {
        kind: "insert",
        selector,
        id,
        position: op.position === "before" ? "before" : "after",
        html,
        ...(layout ? { layout } : {}),
        theme: sanitizeTheme(op.theme),
        ...(custom ? { sectionKind: "custom" as const } : {}),
        ...(css ? { css } : {}),
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
