/**
 * Allow-list HTML sanitizer for ERP rich text (created-page `bodyHtml`,
 * edited-page `html` patches and inserted sections).
 *
 * The HTML is parsed into a small tree of allowed elements/attributes. Callers
 * render that tree as React elements (server) or with document.createElement
 * (browser), so ERP HTML is never assigned to innerHTML or
 * dangerouslySetInnerHTML. Pure: no DOM or server-only imports.
 */

export type RichNode =
  | { type: "text"; value: string }
  | { type: "element"; tag: string; attrs: Record<string, string>; children: RichNode[] };

/**
 * - `rich`: created-page rich text and `elementEdit.html`.
 * - `section`: a section added in the ERP editor (`sectionInsert`): rich text
 *   plus `a.erp-btn` buttons and `div.erp-cards` / `div.erp-card` cards.
 * - `custom`: a custom section (`sectionInsert` with `kind: "custom"`): layout
 *   tags, classes/ids/inline styles, buttons, video/audio, YouTube/Vimeo/Maps
 *   iframes and inline SVG. Browser-only (built with createElement/NS).
 */
export type RichMode = "rich" | "section" | "custom";

const MAX_HTML_LENGTH = 200_000;
const MAX_DEPTH = 40;

const ALLOWED_TAGS = new Set([
  "p", "br", "hr", "h1", "h2", "h3", "h4", "h5", "h6",
  "strong", "b", "em", "i", "u", "s", "strike", "del", "ins", "mark", "small", "sub", "sup", "code", "pre",
  "a", "span", "div", "blockquote", "figure", "figcaption",
  "ul", "ol", "li",
  "img",
  "table", "thead", "tbody", "tfoot", "tr", "th", "td", "caption", "colgroup", "col",
]);

/** Inline SVG (custom sections only). Lower-case, as the tokenizer reads them. */
export const SVG_TAGS = new Set([
  "svg", "g", "path", "circle", "ellipse", "rect", "line", "polyline", "polygon",
  "defs", "lineargradient", "radialgradient", "stop", "symbol", "clippath", "mask",
]);

const CUSTOM_TAGS = new Set([
  ...ALLOWED_TAGS,
  "section", "article", "header", "footer", "aside", "nav", "main",
  "abbr", "cite", "q", "kbd", "samp", "var", "time", "dfn", "bdi", "bdo", "wbr",
  "dl", "dt", "dd", "picture", "source", "details", "summary",
  "button", "video", "audio", "iframe",
  ...SVG_TAGS,
]);

const VOID_TAGS = new Set(["br", "hr", "img", "col", "source", "wbr"]);

/** Dropped together with everything inside them. */
const DROP_WITH_CONTENT = new Set([
  "script", "style", "iframe", "object", "embed", "template", "noscript", "svg", "math",
  "textarea", "select", "option", "title", "head", "frame", "frameset", "applet", "audio", "video",
  "canvas", "form", "button", "input", "link", "meta", "base",
]);

/** Custom sections keep svg/iframe/media/buttons; everything else above still goes. */
const CUSTOM_DROP_WITH_CONTENT = new Set([
  "script", "style", "object", "embed", "template", "noscript", "math",
  "textarea", "select", "option", "title", "head", "frame", "frameset", "applet",
  "canvas", "form", "input", "link", "meta", "base", "use", "foreignobject",
  "image", "feimage", "animate", "set", "animatemotion", "animatetransform", "pattern", "marker",
]);

const TEXT_ALIGN = /^(left|right|center|justify|start|end)$/;
const LENGTH = /^(\d{1,4}(\.\d{1,2})?(px|%|em|rem)|auto|0)$/;

function decodeEntities(value: string): string {
  return value.replace(/&(#x[0-9a-f]{1,6}|#\d{1,7}|[a-z]{2,8});/gi, (match, entity: string) => {
    const lower = entity.toLowerCase();
    if (lower.startsWith("#x")) return codePoint(parseInt(lower.slice(2), 16), match);
    if (lower.startsWith("#")) return codePoint(parseInt(lower.slice(1), 10), match);
    return NAMED_ENTITIES[lower] ?? match;
  });
}

function codePoint(value: number, fallback: string): string {
  if (!Number.isFinite(value) || value <= 0 || value > 0x10ffff) return fallback;
  try {
    return String.fromCodePoint(value);
  } catch {
    return fallback;
  }
}

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  ndash: "–", mdash: "—", lsquo: "‘", rsquo: "’",
  ldquo: "“", rdquo: "”", hellip: "…", copy: "©",
  reg: "®", trade: "™", middot: "·", bull: "•", euro: "€",
};

/** `/path`, `#hash`, http(s), mailto: and tel: only. */
export function safeRichHref(value: string): string | null {
  const href = value.trim();
  if (!href || href.length > 2000 || /[\u0000-\u001f\s]/.test(href)) return null;
  if (/^#[\w-]*$/.test(href)) return href;
  if (/^\/(?!\/)/.test(href)) return href;
  if (/^(mailto|tel):[^\s<>"']+$/i.test(href)) return href;
  try {
    const url = new URL(href);
    return ["http:", "https:"].includes(url.protocol) && !url.username && !url.password ? href : null;
  } catch {
    return null;
  }
}

/** `/path` or http(s) only. */
export function safeRichImage(value: string): string | null {
  const src = value.trim();
  if (!src || src.length > 2000 || /[\s"'<>]/.test(src)) return null;
  if (/^\/(?!\/)/.test(src)) return src;
  try {
    const url = new URL(src);
    return ["http:", "https:"].includes(url.protocol) && !url.username && !url.password ? src : null;
  } catch {
    return null;
  }
}

/** Image margins above ~64px only open up empty gaps. */
function tooLargeMargin(part: string): boolean {
  const amount = parseFloat(part);
  if (!Number.isFinite(amount)) return false;
  return part.endsWith("px") ? amount > 64 : /r?em$/.test(part) ? amount > 4 : false;
}

/** The editor's image format/size: width, max-width, height, float, display, margin. */
function imageStyle(value: string): string {
  const out: string[] = [];
  for (const declaration of value.split(";")) {
    const [rawProp, ...rest] = declaration.split(":");
    const prop = rawProp?.trim().toLowerCase();
    const val = rest.join(":").trim().toLowerCase();
    if (!prop || !val) continue;
    if (prop === "width" && /^(\d{1,3}(\.\d+)?%|\d{1,4}px)$/.test(val)) out.push(`width: ${val}`);
    else if (prop === "max-width" && val === "100%") out.push("max-width: 100%");
    else if (prop === "height" && val === "auto") out.push("height: auto");
    else if (prop === "float" && /^(left|right)$/.test(val)) out.push(`float: ${val}`);
    else if (prop === "display" && val === "block") out.push("display: block");
    else if (
      /^margin(-(top|right|bottom|left))?$/.test(prop) &&
      val.split(/\s+/).length <= 4 &&
      val.split(/\s+/).every((part) => LENGTH.test(part) && !part.endsWith("%") && !tooLargeMargin(part))
    ) {
      out.push(`${prop}: ${val}`);
    }
  }
  return out.join("; ");
}

/** Text alignment only (editor paragraph alignment). */
function blockStyle(value: string): string {
  const match = /(?:^|;)\s*text-align\s*:\s*([a-z]+)\s*(?:;|$)/i.exec(value);
  return match && TEXT_ALIGN.test(match[1].toLowerCase()) ? `text-align: ${match[1].toLowerCase()}` : "";
}

const REL_TOKENS = new Set(["noopener", "noreferrer", "nofollow", "ugc", "sponsored", "external"]);

/** `font-size: <number>(px|em|rem|%)` (the ERP's text size), plus alignment. */
function spanStyle(value: string): string {
  const out: string[] = [];
  const size = /(?:^|;)\s*font-size\s*:\s*(\d{1,3}(?:\.\d{1,3})?(?:px|em|rem|%))\s*(?:;|$)/i.exec(value);
  if (size) out.push(`font-size: ${size[1].toLowerCase()}`);
  const align = blockStyle(value);
  if (align) out.push(align);
  return out.join("; ");
}

const BUTTON_CLASSES = new Set(["erp-btn", "erp-btn erp-btn-outline"]);
const CARD_CLASSES = new Set(["erp-cards", "erp-card"]);

/** http(s) only (media, iframes, srcset candidates). */
function httpUrl(value: string | undefined): string | null {
  const src = (value ?? "").trim();
  if (!src || src.length > 2000 || /[\s"'<>\\]/.test(src)) return null;
  try {
    const url = new URL(src);
    return ["http:", "https:"].includes(url.protocol) && !url.username && !url.password ? src : null;
  } catch {
    return null;
  }
}

/** YouTube / Vimeo / Google Maps embeds only. */
export function safeEmbedUrl(value: string | undefined): string | null {
  const src = httpUrl(value);
  if (!src) return null;
  const url = new URL(src);
  if (url.protocol !== "https:" || url.port) return null;
  const host = url.hostname.toLowerCase();
  const path = url.pathname;
  if (host === "www.youtube.com" && path.startsWith("/embed/")) return src;
  if (host === "www.youtube-nocookie.com" && path.startsWith("/embed/")) return src;
  if (host === "player.vimeo.com" && path.startsWith("/video/")) return src;
  if (host === "www.google.com" && path.startsWith("/maps")) return src;
  return null;
}

/** Declarations of a custom section's `style` attribute; unsafe ones are dropped. */
export function sanitizeInlineStyle(value: string): string {
  if (value.length > 4000) return "";
  return value
    .split(";")
    .map((declaration) => declaration.trim())
    .filter((declaration) => {
      const colon = declaration.indexOf(":");
      if (colon < 1) return false;
      if (!/^(--[\w-]+|-?[a-z][a-z-]*)$/i.test(declaration.slice(0, colon).trim())) return false;
      const lower = declaration.toLowerCase();
      if (/expression|javascript:|behavior|-moz-binding|@import|[<>\\{}]/.test(lower)) return false;
      // Every url() must load over https.
      const urls = lower.match(/url\(/g)?.length ?? 0;
      const httpsUrls = lower.match(/url\(\s*['"]?https:\/\//g)?.length ?? 0;
      return urls === httpsUrls && !/image-set|src\(/.test(lower);
    })
    .join("; ");
}

const SVG_ATTRS = new Set([
  "viewbox", "xmlns", "width", "height", "fill", "fill-opacity", "fill-rule", "clip-rule",
  "stroke", "stroke-width", "stroke-linecap", "stroke-linejoin", "stroke-dasharray",
  "stroke-dashoffset", "stroke-opacity", "stroke-miterlimit", "opacity", "d", "cx", "cy", "r",
  "rx", "ry", "x", "y", "x1", "y1", "x2", "y2", "fx", "fy", "points", "transform", "offset",
  "stop-color", "stop-opacity", "gradientunits", "gradienttransform", "spreadmethod",
  "preserveaspectratio", "clip-path", "clippathunits", "mask", "maskunits", "maskcontentunits",
  "vector-effect", "shape-rendering", "color", "display", "visibility", "focusable",
]);

/** Presentation values: no scripts or markup; url() only to an in-document #id. */
function safeSvgValue(value: string): boolean {
  if (value.length > 10_000 || /[<>\\]|javascript:|expression/i.test(value)) return false;
  return !/url\(/i.test(value.replace(/url\(\s*['"]?#[\w-]+['"]?\s*\)/gi, ""));
}

const ID_VALUE = /^[A-Za-z][\w-]{0,63}$/;
const DATA_ATTR = /^data-[a-z0-9_.-]{1,40}$/;
const ARIA_ATTR = /^aria-[a-z]{2,30}$/;

/** class, id, style, title, role, aria-*, data-* (never `data-erp-*`, used by the applier). */
function globalAttrs(raw: Record<string, string>, attrs: Record<string, string>) {
  for (const [name, value] of Object.entries(raw)) {
    if (name === "class") {
      const classes = value.split(/\s+/).filter((token) => /^[\w-]{1,64}$/.test(token)).slice(0, 30);
      if (classes.length) attrs.class = classes.join(" ");
    } else if (name === "id") {
      if (ID_VALUE.test(value)) attrs.id = value;
    } else if (name === "style") {
      const style = sanitizeInlineStyle(value);
      if (style) attrs.style = style;
    } else if (name === "title" || name === "role") {
      if (value) attrs[name] = value.slice(0, 300);
    } else if ((ARIA_ATTR.test(name) || (DATA_ATTR.test(name) && !name.startsWith("data-erp"))) && value.length <= 500) {
      attrs[name] = value;
    }
  }
}

const MEDIA_FLAGS = ["controls", "autoplay", "muted", "loop", "playsinline"] as const;

/** Attributes of a custom section element; `null` drops it. */
function customAttrs(tag: string, raw: Record<string, string>): Record<string, string> | null {
  if (SVG_TAGS.has(tag)) {
    const attrs: Record<string, string> = {};
    for (const [name, value] of Object.entries(raw)) {
      if (name === "class" || name === "id" || name === "role" || ARIA_ATTR.test(name)) continue;
      if (SVG_ATTRS.has(name) && safeSvgValue(value)) attrs[name] = value;
    }
    globalAttrs(
      Object.fromEntries(Object.entries(raw).filter(([name]) => /^(class|id|role|style|aria-)/.test(name))),
      attrs,
    );
    if (attrs.xmlns && attrs.xmlns !== "http://www.w3.org/2000/svg") delete attrs.xmlns;
    return attrs;
  }

  const attrs: Record<string, string> = {};
  if (tag === "iframe") {
    const src = safeEmbedUrl(raw.src);
    if (!src) return null;
    globalAttrs(raw, attrs);
    attrs.src = src;
    for (const size of ["width", "height"] as const) {
      if (raw[size] && /^\d{1,4}%?$/.test(raw[size])) attrs[size] = raw[size];
    }
    if ("allowfullscreen" in raw) attrs.allowfullscreen = "";
    const allow = (raw.allow ?? "")
      .split(";")
      .map((token) => token.trim().toLowerCase())
      .filter((token) =>
        /^(accelerometer|autoplay|clipboard-write|encrypted-media|gyroscope|picture-in-picture|fullscreen|web-share)$/.test(token),
      );
    if (allow.length) attrs.allow = allow.join("; ");
    attrs.loading = "lazy";
    attrs.referrerpolicy = "strict-origin-when-cross-origin";
    return attrs;
  }

  globalAttrs(raw, attrs);
  if (tag === "a" || tag === "img") {
    const own = sanitizeAttrs(tag, raw, "rich");
    if (!own) return null;
    delete own.style;
    // The <img> keeps the custom section's style (sizes, object-fit, ...).
    return { ...attrs, ...own, ...(attrs.style ? { style: attrs.style } : {}) };
  }
  if (tag === "button") attrs.type = "button";
  if (tag === "video" || tag === "audio") {
    const src = httpUrl(raw.src);
    if (src) attrs.src = src;
    const poster = tag === "video" ? httpUrl(raw.poster) : null;
    if (poster) attrs.poster = poster;
    for (const flag of MEDIA_FLAGS) if (flag in raw) attrs[flag] = "";
    if (raw.preload && /^(auto|metadata|none)$/.test(raw.preload)) attrs.preload = raw.preload;
    for (const size of ["width", "height"] as const) {
      if (tag === "video" && raw[size] && /^\d{1,4}$/.test(raw[size])) attrs[size] = raw[size];
    }
  }
  if (tag === "source") {
    const src = httpUrl(raw.src);
    if (src) attrs.src = src;
    if (raw.srcset) {
      const candidates = raw.srcset.split(",").map((part) => part.trim()).filter(Boolean);
      const safe = candidates.every((part) => {
        const [url, descriptor, extra] = part.split(/\s+/);
        return httpUrl(url) && !extra && (!descriptor || /^\d+(\.\d+)?[wx]$/.test(descriptor));
      });
      if (safe && candidates.length) attrs.srcset = candidates.join(", ");
    }
    if (raw.type && /^[\w.+-]+\/[\w.+-]+$/.test(raw.type)) attrs.type = raw.type;
    if (raw.media && /^[\w\s():,.-]{1,200}$/.test(raw.media)) attrs.media = raw.media;
    if (!attrs.src && !attrs.srcset) return null;
  }
  if (tag === "details" && "open" in raw) attrs.open = "";
  if (tag === "time" && raw.datetime && /^[\w:+.-]{1,40}$/.test(raw.datetime)) attrs.datetime = raw.datetime;
  if (tag === "td" || tag === "th" || tag === "col" || tag === "ol") {
    const own = sanitizeAttrs(tag, raw, "rich") ?? {};
    delete own.style;
    Object.assign(attrs, own);
  }
  return attrs;
}

function sanitizeAttrs(tag: string, raw: Record<string, string>, mode: RichMode = "rich"): Record<string, string> | null {
  if (mode === "custom") return customAttrs(tag, raw);
  const attrs: Record<string, string> = {};
  if (tag === "a") {
    if (mode === "section" && BUTTON_CLASSES.has((raw.class ?? "").trim())) attrs.class = raw.class.trim();
    const href = raw.href !== undefined ? safeRichHref(raw.href) : null;
    if (href) attrs.href = href;
    if (raw.title) attrs.title = raw.title.slice(0, 300);
    // target/rel are kept as the ERP sent them (same-site links have none).
    if (raw.target === "_blank") attrs.target = "_blank";
    const rel = (raw.rel ?? "")
      .toLowerCase()
      .split(/\s+/)
      .filter((token) => REL_TOKENS.has(token));
    if (attrs.target === "_blank") {
      for (const token of ["noopener", "noreferrer"]) if (!rel.includes(token)) rel.push(token);
    }
    if (rel.length) attrs.rel = Array.from(new Set(rel)).join(" ");
    return attrs;
  }
  if (tag === "img") {
    const src = raw.src !== undefined ? safeRichImage(raw.src) : null;
    if (!src) return null; // an image without a safe source is dropped
    attrs.src = src;
    attrs.alt = (raw.alt ?? "").slice(0, 500);
    if (raw.title) attrs.title = raw.title.slice(0, 300);
    for (const size of ["width", "height"] as const) {
      if (raw[size] && /^\d{1,5}$/.test(raw[size])) attrs[size] = raw[size];
    }
    const style = raw.style ? imageStyle(raw.style) : "";
    if (style) attrs.style = style;
    attrs.loading = "lazy";
    attrs.decoding = "async";
    return attrs;
  }
  if (tag === "td" || tag === "th") {
    for (const span of ["colspan", "rowspan"] as const) {
      if (raw[span] && /^\d{1,2}$/.test(raw[span])) attrs[span] = raw[span];
    }
    if (tag === "th" && raw.scope && /^(row|col|rowgroup|colgroup)$/.test(raw.scope)) attrs.scope = raw.scope;
  }
  if (tag === "col" && raw.span && /^\d{1,2}$/.test(raw.span)) attrs.span = raw.span;
  if (tag === "ol" && raw.start && /^-?\d{1,6}$/.test(raw.start)) attrs.start = raw.start;
  if (tag === "div" && mode === "section" && CARD_CLASSES.has((raw.class ?? "").trim())) {
    attrs.class = raw.class.trim();
  }
  if (raw.style) {
    const style = tag === "span" ? spanStyle(raw.style) : blockStyle(raw.style);
    if (style) attrs.style = style;
  }
  return attrs;
}

const ATTR_PATTERN = /([^\s"'<>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;

function parseAttrs(source: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  for (const match of source.matchAll(ATTR_PATTERN)) {
    const name = match[1].toLowerCase();
    if (name in attrs) continue;
    attrs[name] = decodeEntities(match[2] ?? match[3] ?? match[4] ?? "");
  }
  return attrs;
}

const TOKEN_PATTERN = /<!--[\s\S]*?(?:-->|$)|<!\[CDATA\[[\s\S]*?(?:\]\]>|$)|<![^>]*>|<\?[^>]*>|<\/?([a-zA-Z][a-zA-Z0-9-]*)((?:\s+[^\s"'<>/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'=<>`]+))?)*)\s*\/?>/g;

/** Parses and sanitizes ERP HTML into an allow-listed node tree. */
export function sanitizeRichHtml(input: unknown, mode: RichMode = "rich"): RichNode[] {
  if (typeof input !== "string" || !input.trim()) return [];
  const allowedTags = mode === "custom" ? CUSTOM_TAGS : ALLOWED_TAGS;
  const dropWithContent = mode === "custom" ? CUSTOM_DROP_WITH_CONTENT : DROP_WITH_CONTENT;
  const html = input.length > MAX_HTML_LENGTH ? input.slice(0, MAX_HTML_LENGTH) : input;

  const root: RichNode & { type: "element" } = { type: "element", tag: "#root", attrs: {}, children: [] };
  // `kept: false` = element not allowed: its children go to the parent.
  const stack: { tag: string; node: RichNode & { type: "element" }; kept: boolean }[] = [
    { tag: "#root", node: root, kept: true },
  ];
  let dropUntil: string | null = null;
  let dropDepth = 0;
  let last = 0;

  const current = () => stack[stack.length - 1].node;
  const pushText = (raw: string) => {
    if (dropUntil || !raw) return;
    const value = decodeEntities(raw);
    const children = current().children;
    const prev = children[children.length - 1];
    if (prev?.type === "text") prev.value += value;
    else children.push({ type: "text", value });
  };

  for (const match of html.matchAll(TOKEN_PATTERN)) {
    pushText(html.slice(last, match.index));
    last = (match.index ?? 0) + match[0].length;
    const tagName = match[1]?.toLowerCase();
    if (!tagName) continue; // comment, doctype, CDATA, processing instruction
    const closing = match[0].startsWith("</");

    if (dropUntil) {
      if (tagName === dropUntil) dropDepth += closing ? -1 : match[0].endsWith("/>") ? 0 : 1;
      if (dropDepth <= 0) dropUntil = null;
      continue;
    }
    const startDrop = () => {
      if (!closing && !match[0].endsWith("/>")) {
        dropUntil = tagName;
        dropDepth = 1;
      }
    };
    if (dropWithContent.has(tagName)) {
      startDrop();
      continue;
    }
    // Inline SVG only inside an <svg>; outside one, a stray SVG tag is dropped.
    const inSvg = stack.some((entry) => entry.kept && entry.tag === "svg");
    if (mode === "custom" && SVG_TAGS.has(tagName) && tagName !== "svg" && !inSvg && !closing) {
      startDrop();
      continue;
    }

    if (closing) {
      for (let i = stack.length - 1; i > 0; i--) {
        if (stack[i].tag === tagName) {
          stack.length = i;
          break;
        }
      }
      continue;
    }

    const allowed = allowedTags.has(tagName);
    const attrs = allowed ? sanitizeAttrs(tagName, parseAttrs(match[2] ?? ""), mode) : null;
    if (VOID_TAGS.has(tagName)) {
      if (allowed && attrs) current().children.push({ type: "element", tag: tagName, attrs, children: [] });
      continue;
    }
    // An iframe from any other site goes, with its fallback content.
    if (tagName === "iframe" && !attrs) {
      startDrop();
      continue;
    }
    if (match[0].endsWith("/>")) {
      // Self-closing SVG shapes (<path ... />) are real, empty elements.
      if (mode === "custom" && SVG_TAGS.has(tagName) && attrs) {
        current().children.push({ type: "element", tag: tagName, attrs, children: [] });
      }
      continue;
    }
    if (stack.length > MAX_DEPTH) continue;
    if (allowed && attrs) {
      const node: RichNode & { type: "element" } = { type: "element", tag: tagName, attrs, children: [] };
      current().children.push(node);
      stack.push({ tag: tagName, node, kept: true });
    } else {
      // Unknown element: keep its text/children, drop the element itself.
      stack.push({ tag: tagName, node: current(), kept: false });
    }
  }
  pushText(html.slice(last));
  // Custom sections are designed on purpose (empty decorative boxes, spacing):
  // keep them exactly as built.
  if (mode === "custom") return normalizeTree(root.children);
  return tidySpacing(normalizeTree(root.children));
}

/** Elements that are meaningful even with no text inside. */
const KEEP_EMPTY = new Set(["br", "hr", "img", "col", "colgroup", "td", "th", "tr", "thead", "tbody", "tfoot"]);
/** Text inside these keeps its exact whitespace. */
const PRESERVE_WHITESPACE = new Set(["pre", "code"]);
const MAX_CONSECUTIVE_BREAKS = 2;

function isBreak(node: RichNode | undefined): boolean {
  return node?.type === "element" && node.tag === "br";
}

function isBlank(node: RichNode): boolean {
  return node.type === "text" && !node.value.replace(/[\s ​﻿]/g, "");
}

/** Whether a node shows anything (text, an image, a rule or a table cell). */
function isVisible(node: RichNode): boolean {
  if (node.type === "text") return !isBlank(node);
  if (node.tag === "br") return false;
  if (KEEP_EMPTY.has(node.tag)) return true;
  return node.children.some(isVisible);
}

/**
 * Removes the spacing junk editors leave behind, so a careless CMS entry
 * cannot push the page apart with blank screens:
 *  - empty paragraphs / headings / list items / wrappers (`<p>&nbsp;</p>`,
 *    `<p><br></p>`, `<div></div>`), at any depth;
 *  - runs of `<br>` (max two in a row) and `<br>` at the start/end of a block;
 *  - repeated `<hr>`;
 *  - long runs of spaces / non-breaking spaces in text.
 */
function tidySpacing(nodes: RichNode[], preserve = false): RichNode[] {
  const out: RichNode[] = [];
  for (const node of nodes) {
    if (node.type === "text") {
      if (preserve) {
        out.push(node);
        continue;
      }
      const value = node.value
        .replace(/[​﻿]/g, "")
        .replace(/[ \t ]* [ \t ]*/g, (run) => (run.length > 1 ? " " : run))
        .replace(/\s{2,}/g, " ");
      if (value) out.push({ type: "text", value });
      continue;
    }
    const keepWhitespace = preserve || PRESERVE_WHITESPACE.has(node.tag);
    const children = tidySpacing(node.children, keepWhitespace);
    const cleaned = { ...node, children };
    if (!KEEP_EMPTY.has(node.tag) && !children.some(isVisible)) {
      // An empty inline tag between two words still separates them.
      if (!BLOCK_TAGS.has(node.tag)) {
        const prev = out[out.length - 1];
        if (prev?.type === "text") {
          if (!/\s$/.test(prev.value)) prev.value += " ";
        } else if (prev) out.push({ type: "text", value: " " });
      }
      continue;
    }
    if (node.tag === "hr") {
      const prev = [...out].reverse().find((n) => !isBlank(n));
      if (prev?.type === "element" && prev.tag === "hr") continue;
      if (!out.some(isVisible)) continue; // no leading rule
    }
    if (node.tag === "br") {
      const prev = [...out].reverse().find((n) => !isBlank(n));
      // A paragraph/heading/list already ends the line: a <br> after it is only a gap.
      if (prev?.type === "element" && BLOCK_TAGS.has(prev.tag)) continue;
      let run = 0;
      for (let i = out.length - 1; i >= 0; i--) {
        if (isBreak(out[i])) run++;
        else if (!isBlank(out[i])) break;
      }
      if (run >= MAX_CONSECUTIVE_BREAKS) continue;
    }
    out.push(cleaned);
  }
  // No line breaks or blank text at the start or end of a block.
  while (out.length && (isBreak(out[0]) || isBlank(out[0]))) out.shift();
  while (out.length && (isBreak(out[out.length - 1]) || isBlank(out[out.length - 1]))) out.pop();
  const lastVisible = out[out.length - 1];
  if (lastVisible?.type === "element" && lastVisible.tag === "hr") out.pop();
  return out;
}

/** Plain text from the CMS: no more than one blank line in a row, no padding lines. */
export function tidyPlainText(value: string): string {
  return value
    .replace(/[​﻿]/g, "")
    .replace(/ /g, " ")
    .replace(/[ \t]+$/gm, "")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

const BLOCK_TAGS = new Set([
  "p", "div", "h1", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li", "table", "blockquote",
  "figure", "figcaption", "pre", "hr",
]);
const TABLE_SECTIONS = new Set(["thead", "tbody", "tfoot", "caption", "colgroup"]);

/**
 * Makes the tree match what an HTML parser would build, so server-rendered
 * markup hydrates without mismatches: rows directly in a <table> get a
 * <tbody>, and a <p> that contains block elements becomes a <div>.
 */
function normalizeTree(nodes: RichNode[]): RichNode[] {
  return nodes.map((node) => {
    if (node.type === "text") return node;
    let children = normalizeTree(node.children);
    let tag = node.tag;
    if (tag === "table") {
      const fixed: RichNode[] = [];
      let body: (RichNode & { type: "element" }) | null = null;
      for (const child of children) {
        if (child.type === "element" && TABLE_SECTIONS.has(child.tag)) {
          body = null;
          fixed.push(child);
        } else if (child.type === "element" && child.tag === "tr") {
          if (!body) {
            body = { type: "element", tag: "tbody", attrs: {}, children: [] };
            fixed.push(body);
          }
          body.children.push(child);
        } else if (child.type === "text" && !child.value.trim()) {
          continue;
        }
      }
      children = fixed;
    }
    if (tag === "p" && children.some((child) => child.type === "element" && BLOCK_TAGS.has(child.tag))) {
      tag = "div";
    }
    return { ...node, tag, children };
  });
}

/** Plain text of a sanitized tree (for excerpts / fallbacks). */
export function richText(nodes: RichNode[]): string {
  return nodes
    .map((node) => (node.type === "text" ? node.value : `${richText(node.children)} `))
    .join("")
    .replace(/\s+/g, " ")
    .trim();
}

export function hasRichContent(nodes: RichNode[]): boolean {
  return nodes.some((node) =>
    node.type === "text" ? node.value.trim() !== "" : node.tag === "img" || hasRichContent(node.children),
  );
}

/** Whether a string looks like HTML (vs. plain text with line breaks). */
export function looksLikeHtml(value: unknown): boolean {
  return typeof value === "string" && /<\/?[a-z][\s\S]*?>/i.test(value);
}
