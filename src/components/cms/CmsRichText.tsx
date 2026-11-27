import React from "react";
import { sanitizeRichHtml, type RichNode } from "../../lib/richText";

/**
 * Renders ERP rich text (`bodyHtml`, `bioHtml`, ...) through the allow-list
 * sanitizer in lib/richText as React elements: no dangerouslySetInnerHTML.
 * Styled by `.cms-rich-text` in globals.css (site prose styles).
 */

const REACT_ATTR: Record<string, string> = {
  colspan: "colSpan",
  rowspan: "rowSpan",
};

function styleObject(style: string): React.CSSProperties {
  const out: Record<string, string> = {};
  for (const declaration of style.split(";")) {
    const [prop, ...rest] = declaration.split(":");
    const value = rest.join(":").trim();
    if (!prop?.trim() || !value) continue;
    out[prop.trim().replace(/-([a-z])/g, (_, c: string) => c.toUpperCase())] = value;
  }
  return out as React.CSSProperties;
}

/** ✓ / ✗ cells of comparison tables (shown in the success / muted colour). */
export function checkMark(value: string): "yes" | "no" | null {
  const mark = value.replace(/\s+/g, "");
  if (/^[✓✔☑✅]$/u.test(mark)) return "yes";
  if (/^[✗✘✕✖×❌]$/u.test(mark)) return "no";
  return null;
}

function nodeText(nodes: RichNode[]): string {
  return nodes.map((node) => (node.type === "text" ? node.value : nodeText(node.children))).join("");
}

function renderNodes(nodes: RichNode[], keyPrefix: string, demoteH1: boolean): React.ReactNode[] {
  return nodes.map((node, index) => {
    const key = `${keyPrefix}${index}`;
    if (node.type === "text") return node.value;
    // The page hero owns the only <h1>.
    const tag = demoteH1 && node.tag === "h1" ? "h2" : node.tag;
    const props: Record<string, unknown> = { key };
    for (const [name, value] of Object.entries(node.attrs)) {
      if (name === "style") props.style = styleObject(value);
      else props[REACT_ATTR[name] ?? name] = value;
    }
    if ((tag === "td" || tag === "th") && checkMark(nodeText(node.children))) {
      props.className = `cms-mark-${checkMark(nodeText(node.children))}`;
    }
    if (node.children.length === 0 && ["br", "hr", "img", "col"].includes(tag)) {
      return React.createElement(tag, props);
    }
    const children = renderNodes(node.children, `${key}-`, demoteH1);
    if (tag !== "table") return React.createElement(tag, props, ...children);
    // Wide tables scroll sideways on phones instead of breaking the layout.
    const { key: _key, ...tableProps } = props;
    return (
      <div key={key} className="cms-table-scroll">
        {React.createElement(tag, tableProps, ...children)}
      </div>
    );
  });
}

export function CmsRichText({
  html,
  className = "",
  demoteH1 = true,
}: {
  html: unknown;
  className?: string;
  demoteH1?: boolean;
}) {
  const nodes = sanitizeRichHtml(html);
  if (nodes.length === 0) return null;
  return (
    <div className={`cms-rich-text ${className}`.trim()}>{renderNodes(nodes, "n", demoteH1)}</div>
  );
}
