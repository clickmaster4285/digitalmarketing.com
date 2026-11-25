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

const VOID_TAGS = new Set(["br", "hr", "img", "col"]);

/** Dropped together with everything inside them. */
const DROP_WITH_CONTENT = new Set([
  "script", "style", "iframe", "object", "embed", "template", "noscript", "svg", "math",
  "textarea", "select", "option", "title", "head", "frame", "frameset", "applet", "audio", "video",
  "canvas", "form", "button", "input", "link", "meta", "base",
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
      val.split(/\s+/).every((part) => LENGTH.test(part) && !part.endsWith("%"))
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

function sanitizeAttrs(tag: string, raw: Record<string, string>): Record<string, string> | null {
  const attrs: Record<string, string> = {};
  if (tag === "a") {
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
  if (raw.style) {
    const style = blockStyle(raw.style);
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
export function sanitizeRichHtml(input: unknown): RichNode[] {
  if (typeof input !== "string" || !input.trim()) return [];
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
    if (DROP_WITH_CONTENT.has(tagName)) {
      if (!closing && !match[0].endsWith("/>")) {
        dropUntil = tagName;
        dropDepth = 1;
      }
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

    const allowed = ALLOWED_TAGS.has(tagName);
    const attrs = allowed ? sanitizeAttrs(tagName, parseAttrs(match[2] ?? "")) : null;
    if (VOID_TAGS.has(tagName)) {
      if (allowed && attrs) current().children.push({ type: "element", tag: tagName, attrs, children: [] });
      continue;
    }
    if (match[0].endsWith("/>")) continue;
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
  return normalizeTree(root.children);
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
