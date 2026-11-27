import { describe, expect, it } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { sanitizeRichHtml, type RichNode } from "./richText";
import { parsePageEdits, sanitizeStyles, validateCustomCss } from "./pageEdits";
import { CmsComparisonTable, parseComparisonTable } from "../components/cms/CmsComparisonTable";
import { CmsRichText } from "../components/cms/CmsRichText";

type El = RichNode & { type: "element" };

function all(nodes: RichNode[]): El[] {
  return nodes.flatMap((node) => (node.type === "element" ? [node, ...all(node.children)] : []));
}
const tags = (nodes: RichNode[]) => all(nodes).map((node) => node.tag);
const find = (nodes: RichNode[], tag: string) => all(nodes).find((node) => node.tag === tag);

const HOSTILE =
  '<p onclick="x()">Hi <img src="https://x.test/a.png" onerror="alert(1)"><img src="javascript:alert(1)">' +
  '<a href="javascript:alert(1)">bad</a><a href="https://ok.test" onmouseover="x()">ok</a></p>' +
  "<script>alert(1)</script><style>body{display:none}</style>" +
  '<iframe src="https://evil.test/embed"><p>fallback</p></iframe>' +
  '<form action="https://evil.test"><input name="q"></form><object data="x"></object>';

describe("sectionInsert sanitizer", () => {
  it("keeps buttons and cards only with the exact ERP classes in normal sections", () => {
    const nodes = sanitizeRichHtml(
      '<div class="erp-cards"><div class="erp-card"><h3>A</h3><p>x</p></div><div class="evil">y</div></div>' +
        '<p><a class="erp-btn" href="/contact">Go</a> <a class="erp-btn erp-btn-outline" href="#more">More</a>' +
        ' <a class="erp-btn hacked" href="/x">X</a></p><p><span style="font-size: 18px; color: red">big</span></p>',
      "section",
    );
    const classes = all(nodes).map((node) => node.attrs.class).filter(Boolean);
    expect(classes).toEqual(["erp-cards", "erp-card", "erp-btn", "erp-btn erp-btn-outline"]);
    expect(find(nodes, "span")?.attrs.style).toBe("font-size: 18px");
  });

  it("does not let created-page rich text use ERP classes", () => {
    const nodes = sanitizeRichHtml('<a class="erp-btn" href="/x">x</a><div class="erp-cards">y</div>');
    expect(all(nodes).some((node) => node.attrs.class)).toBe(false);
  });

  for (const mode of ["rich", "section", "custom"] as const) {
    it(`neutralises a hostile payload (${mode})`, () => {
      const nodes = sanitizeRichHtml(HOSTILE, mode);
      const found = tags(nodes);
      for (const tag of ["script", "style", "iframe", "form", "input", "object"]) expect(found).not.toContain(tag);
      for (const node of all(nodes)) {
        for (const [name, value] of Object.entries(node.attrs)) {
          expect(name.startsWith("on")).toBe(false);
          expect(value.toLowerCase()).not.toContain("javascript:");
        }
      }
      expect(all(nodes).filter((node) => node.tag === "img")).toHaveLength(1);
      expect(JSON.stringify(nodes)).not.toContain("fallback");
    });
  }
});

describe("custom section sanitizer", () => {
  it("keeps layout, global attributes, media and allowed embeds", () => {
    const nodes = sanitizeRichHtml(
      '<section class="hero grid" id="top" data-anim="fade" aria-label="Intro" role="region" data-erp-clone="x">' +
        '<button onclick="x()">Click</button>' +
        '<iframe src="https://www.youtube.com/embed/abc" allow="autoplay; camera" allowfullscreen width="560"></iframe>' +
        '<iframe src="https://www.youtube.com/watch?v=abc"></iframe>' +
        '<iframe src="https://player.vimeo.com/video/1"></iframe>' +
        '<iframe src="https://www.google.com/maps/embed?pb=1"></iframe>' +
        '<video src="https://cdn.test/v.mp4" poster="https://cdn.test/p.jpg" controls muted autoplay loop playsinline preload="none"></video>' +
        '<audio src="http://cdn.test/a.mp3" controls></audio>' +
        "<details open><summary>More</summary><p>Body</p></details></section>",
      "custom",
    );
    const section = find(nodes, "section")!;
    expect(section.attrs).toEqual({
      class: "hero grid",
      id: "top",
      "data-anim": "fade",
      "aria-label": "Intro",
      role: "region",
    });
    expect(find(nodes, "button")?.attrs).toEqual({ type: "button" });
    const iframes = all(nodes).filter((node) => node.tag === "iframe");
    expect(iframes.map((node) => node.attrs.src)).toEqual([
      "https://www.youtube.com/embed/abc",
      "https://player.vimeo.com/video/1",
      "https://www.google.com/maps/embed?pb=1",
    ]);
    expect(iframes[0].attrs.allow).toBe("autoplay");
    expect(iframes[0].attrs.allowfullscreen).toBe("");
    expect(find(nodes, "video")?.attrs).toMatchObject({ controls: "", muted: "", preload: "none", poster: "https://cdn.test/p.jpg" });
    expect(tags(nodes)).toEqual(expect.arrayContaining(["audio", "details", "summary"]));
  });

  it("keeps inline SVG with presentation attributes only", () => {
    const nodes = sanitizeRichHtml(
      '<svg viewBox="0 0 24 24" width="24" onload="x()"><defs><linearGradient id="g"><stop offset="0" stop-color="#f00"/></linearGradient></defs>' +
        '<path d="M0 0L24 24" fill="url(#g)" stroke="url(https://evil.test/x)"/><use href="#g"/><foreignObject><p>x</p></foreignObject>' +
        '<circle cx="1" cy="1" r="1"/></svg><path d="M0 0"/>',
      "custom",
    );
    expect(tags(nodes)).toEqual(["svg", "defs", "lineargradient", "stop", "path", "circle"]);
    expect(find(nodes, "svg")?.attrs).toEqual({ viewbox: "0 0 24 24", width: "24" });
    expect(find(nodes, "path")?.attrs).toEqual({ d: "M0 0L24 24", fill: "url(#g)" });
  });

  it("drops unsafe inline style declarations and keeps the rest", () => {
    const nodes = sanitizeRichHtml(
      '<div style="color: red; background: url(http://x.test/a.png); background-image: url(&quot;https://x.test/b.png&quot;); width: expression(1); behavior: url(x.htc); --gap: 8px; content: \'\\41\'">x</div>',
      "custom",
    );
    expect(find(nodes, "div")?.attrs.style).toBe(
      'color: red; background-image: url("https://x.test/b.png"); --gap: 8px',
    );
  });
});

describe("custom section CSS", () => {
  it("accepts nested CSS with https urls, strings and media queries", () => {
    const css = '/* hi */ & { padding: 40px; } .card { background: url("https://cdn.test/a.png"); } .q::before { content: "}"; } @media (max-width: 767px) { .cols { display: block; } }';
    expect(validateCustomCss(css)).toBe(css.replace("/* hi */", "").trim());
  });

  it.each([
    ["closes the scope", "} body{display:none}"],
    ["unbalanced", ".a { color: red;"],
    ["http url", ".a { background: url(http://x.test/a.png) }"],
    ["data url", ".a { background: url(data:image/png;base64,AA) }"],
    ["@import", '@import "https://x.test/a.css";'],
    ["expression", ".a { width: expression(alert(1)) }"],
    ["javascript", ".a { background: url(javascript:alert(1)) }"],
    ["behavior", ".a { behavior: url(x.htc) }"],
    ["-moz-binding", ".a { -moz-binding: url(https://x.test/x.xml) }"],
    ["markup", ".a { color: red } </style><script>"],
    ["escape", ".a { background: u\\72l(http://x.test) }"],
    ["is too long", ".a{color:red}".repeat(1600)],
  ])("rejects CSS that %s", (_name, css) => {
    expect(validateCustomCss(css)).toBeUndefined();
  });
});

describe("sectionInsert / elementEdit parsing", () => {
  const payload = (sections: unknown[]) => ({ data: { page: { sections } } });

  it("parses custom sections, button theme and validated css", () => {
    const edits = parsePageEdits(
      payload([
        {
          type: "sectionInsert",
          order: 1,
          content: {
            selector: "body > main:nth-of-type(1)",
            position: "after",
            id: "abc-1",
            kind: "custom",
            html: "<div>x</div>",
            css: "& { padding: 8px }",
            theme: { h2: { "font-family": "Inter" }, btn: { "background-color": "#ff3d77", color: "#fff", "font-weight": "700" }, script: { color: "red" } },
            design: { ignored: true },
            label: "Custom",
          },
        },
        {
          type: "sectionInsert",
          order: 2,
          content: { selector: "body > main", position: "before", id: "abc-2", kind: "custom", html: "<p>y</p>", css: "} body{display:none}" },
        },
      ]),
    )!;
    expect(edits.instructions[0]).toEqual({
      kind: "insert",
      selector: "body > main:nth-of-type(1)",
      id: "abc-1",
      position: "after",
      html: "<div>x</div>",
      theme: [
        ["h2", [["font-family", "Inter"]]],
        ["btn", [["background-color", "#ff3d77"], ["color", "#fff"], ["font-weight", "700"]]],
      ],
      sectionKind: "custom",
      css: "& { padding: 8px }",
    });
    // Hostile CSS: the section stays, without its CSS.
    expect(edits.instructions[1]).toMatchObject({ kind: "insert", sectionKind: "custom" });
    expect(edits.instructions[1]).not.toHaveProperty("css");
  });

  it("allows the extended style list and per-side spacing", () => {
    expect(
      sanitizeStyles({
        padding: "12px 24px 12px 24px",
        margin: "-8px 0 16px 0",
        height: "320px",
        "min-height": "50vh",
        "max-height": "none",
        "object-fit": "cover",
        position: "fixed",
      }),
    ).toEqual([
      ["padding", "12px 24px 12px 24px"],
      ["margin", "-8px 0 16px 0"],
      ["height", "320px"],
      ["min-height", "50vh"],
      ["max-height", "none"],
      ["object-fit", "cover"],
    ]);
  });
});

describe("comparison and difference tables", () => {
  const content = {
    erpType: "comparisonTable",
    heading: "Compare plans",
    bodyHtml: "<table><tr><td>fallback</td></tr></table>",
    table: { columns: ["Feature", "Basic", "Pro"], rows: [["Integrations", "✗", "✓"], ["Support"]] },
    highlight: "pro",
    highlightLabel: "Recommended",
    note: "Note under the table",
  };

  it("parses a valid table and highlights the matching column", () => {
    const data = parseComparisonTable(content)!;
    expect(data.highlight).toBe(2);
    expect(data.rows[1]).toEqual(["Support", "", ""]);
    const html = renderToStaticMarkup(<CmsComparisonTable data={data} sectionClassName="container" />);
    expect(html).toContain("Compare plans");
    expect(html).toContain("Recommended");
    expect(html).toContain("Note under the table");
    expect(html).toContain("overflow-x-auto");
    expect(html).toContain("text-green-600");
    expect(html).not.toContain("fallback");
  });

  it("falls back to bodyHtml for invalid tables and never highlights column 0", () => {
    expect(parseComparisonTable({ ...content, table: { columns: ["a"], rows: [] } })).toBeNull();
    expect(parseComparisonTable({ ...content, table: { columns: Array(13).fill("c"), rows: [] } })).toBeNull();
    expect(parseComparisonTable({ ...content, table: { columns: ["a", "b"], rows: [[1, 2]] } })).toBeNull();
    expect(parseComparisonTable({ ...content, erpType: undefined })).toBeNull();
    expect(parseComparisonTable({ ...content, highlight: "Feature" })?.highlight).toBe(-1);
  });

  it("wraps rich-text tables in a scroll container and marks ✓/✗", () => {
    const html = renderToStaticMarkup(
      <CmsRichText html="<table><thead><tr><th>F</th><th><strong>Pro</strong> <em>(Rec)</em></th></tr></thead><tbody><tr><th>X</th><td><strong>✓</strong></td></tr><tr><th>Y</th><td>✗</td></tr></tbody></table>" />,
    );
    expect(html).toMatch(/<div class="cms-table-scroll"><table>/);
    expect(html).toContain('class="cms-mark-yes"');
    expect(html).toContain('class="cms-mark-no"');
    expect(html).toContain("<strong>Pro</strong> <em>(Rec)</em>");
  });
});
