import { afterEach, describe, expect, it, vi } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  cmsPageMetadata,
  getCmsPage,
  getCmsPreviewPage,
  isValidPreviewToken,
  metadataRobots,
  parseCmsPage,
  serializeJsonLd,
} from "./cms";
import { sanitizeRichHtml, type RichNode } from "./richText";
import { parsePageEdits } from "./pageEdits";
import { CmsPageRenderer } from "../components/cms/CmsPageRenderer";
import { erpAdminOrigins } from "./erpAdminOrigins";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

const page = (overrides: Record<string, unknown> = {}) => ({
  data: {
    page: {
      title: "Post",
      slug: "/blog/post",
      pageType: "blog",
      sections: [],
      seo: {},
      ...overrides,
    },
  },
});

function tags(nodes: RichNode[]): string[] {
  return nodes.flatMap((node) => (node.type === "element" ? [node.tag, ...tags(node.children)] : []));
}

describe("rich text sanitizer", () => {
  it("keeps allowed markup and drops scripts, handlers and unsafe URLs", () => {
    const nodes = sanitizeRichHtml(
      '<h2 onclick="x()">Title</h2><p>Hi <strong>there</strong><script>alert(1)</script></p>' +
        '<a href="javascript:alert(1)">bad</a><a href="/contact">ok</a>' +
        '<img src="javascript:x" onerror="y"><iframe src="https://evil"></iframe><style>p{}</style>',
    );
    const markup = renderToStaticMarkup(
      <CmsPageRenderer
        page={{ title: "t", slug: "t", sections: [{ type: "richText", content: { bodyHtml: "" } }] }}
      />,
    );
    expect(markup).not.toContain("<script");
    expect(tags(nodes)).toEqual(["h2", "p", "strong", "a", "a"]);
    const [heading, , badLink, goodLink] = nodes as Extract<RichNode, { type: "element" }>[];
    expect(heading.attrs).toEqual({});
    expect(badLink.attrs.href).toBeUndefined();
    expect(goodLink.attrs).toEqual({ href: "/contact" });
  });

  it("keeps link target/rel as sent and only adds noopener to _blank links", () => {
    const [internal, external, blank] = sanitizeRichHtml(
      '<a href="/a">a</a><a href="https://x.com" target="_blank" rel="noopener noreferrer">b</a>' +
        '<a href="https://y.com" target="_blank">c</a>',
    ) as Extract<RichNode, { type: "element" }>[];
    expect(internal.attrs).toEqual({ href: "/a" });
    expect(external.attrs).toEqual({ href: "https://x.com", target: "_blank", rel: "noopener noreferrer" });
    expect(blank.attrs.rel).toBe("noopener noreferrer");
  });

  it("keeps only the editor's image format styles", () => {
    const [image] = sanitizeRichHtml(
      '<img src="https://apierp.clickmasters.pk/uploads/a.png" alt="A" style="width: 50%; float: left; position: fixed; margin: 0 16px 8px 0; background: url(x)">',
    ) as Extract<RichNode, { type: "element" }>[];
    expect(image.attrs.src).toBe("https://apierp.clickmasters.pk/uploads/a.png");
    expect(image.attrs.style).toBe("width: 50%; float: left; margin: 0 16px 8px 0");
    expect(image.attrs.loading).toBe("lazy");
  });

  it("wraps bare table rows in tbody and decodes entities", () => {
    const nodes = sanitizeRichHtml("<table><tr><td>A &amp; B</td></tr></table>");
    expect(tags(nodes)).toEqual(["table", "tbody", "tr", "td"]);
  });
});

describe("created pages", () => {
  it("renders rich text, images and the page's own JSON-LD schema", () => {
    const parsed = parseCmsPage(
      page({
        sections: [
          {
            type: "richText",
            order: 1,
            content: {
              bodyHtml:
                '<h2>Intro</h2><p>Read <a href="/contact"><u>more</u></a></p><img src="https://apierp.clickmasters.pk/uploads/x.png" alt="X" style="width: 50%; float: left">',
            },
          },
        ],
        seo: {
          schema: [{ "@context": "https://schema.org", "@type": "Article", headline: "</script><b>" }, "bad", [1]],
        },
      }),
      "blog/post",
    );
    const markup = renderToStaticMarkup(<CmsPageRenderer page={parsed} />);
    expect(markup).toContain('<div class="cms-rich-text');
    expect(markup).toContain("<h2>Intro</h2>");
    expect(markup).toContain('<a href="/contact"><u>more</u></a>');
    expect(markup).toContain('style="width:50%;float:left"');
    const scripts = markup.match(/<script type="application\/ld\+json">/g) ?? [];
    expect(scripts).toHaveLength(1);
    expect(markup).not.toContain("</script><b>");
    expect(markup).toContain("u003c/script");
  });

  it("serializes JSON-LD without a closing script tag", () => {
    expect(serializeJsonLd({ a: "</script>" })).toBe('{"a":"\\u003c/script\\u003e"}');
  });

  it("uses metaDescription, keywords, article type and featured image in metadata", () => {
    const metadata = cmsPageMetadata(
      parseCmsPage(
        page({
          featuredImage: "https://apierp.clickmasters.pk/uploads/cover.jpg",
          publishedAt: "2026-11-01T00:00:00.000Z",
          seo: {
            title: "Post title",
            metaDescription:
              "A long enough meta description from the ERP that is used as the page description text.",
            keywords: ["seo", "marketing"],
            focusKeyword: "SEO",
          },
        }),
      ),
    );
    expect(metadata.title).toBe("Post title");
    expect(metadata.description).toContain("A long enough meta description");
    expect(metadata.keywords).toEqual(["seo", "marketing"]);
    expect(metadata.openGraph).toMatchObject({
      type: "article",
      images: ["https://apierp.clickmasters.pk/uploads/cover.jpg"],
    });
  });

  it("reads robots from a pasted meta tag", () => {
    expect(metadataRobots('<meta name="robots" content="noindex, nofollow">')).toEqual({
      index: false,
      follow: false,
    });
    expect(metadataRobots("index, follow")).toEqual({ index: true, follow: true });
  });

  it("returns null instead of throwing when the ERP fails", async () => {
    vi.stubEnv("CMS_API_URL", "https://erp.example");
    vi.stubEnv("CMS_SITE_DOMAIN", "example.com");
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("oops", { status: 500 })));
    await expect(getCmsPage("blog/post")).resolves.toBeNull();
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("ECONNREFUSED")));
    await expect(getCmsPage("blog/post")).resolves.toBeNull();
  });
});

describe("live preview", () => {
  const token = "a".repeat(48);

  it("validates tokens", () => {
    expect(isValidPreviewToken(token)).toBe(true);
    expect(isValidPreviewToken("abc")).toBe(false);
    expect(isValidPreviewToken("A".repeat(48))).toBe(false);
  });

  it("fetches the draft without cache and parses it like a published page", async () => {
    vi.stubEnv("CMS_API_URL", "https://erp.example");
    vi.stubEnv("CMS_SITE_DOMAIN", "example.com");
    const fetchMock = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify({ ...page(), preview: true }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    const draft = await getCmsPreviewPage(token);
    expect(draft?.slug).toBe("blog/post");
    expect(fetchMock).toHaveBeenCalledWith(
      `https://erp.example/public/example.com/preview/${token}`,
      expect.objectContaining({ cache: "no-store" }),
    );
  });

  it("treats an expired token as no preview and never fetches a bad token", async () => {
    vi.stubEnv("CMS_API_URL", "https://erp.example");
    vi.stubEnv("CMS_SITE_DOMAIN", "example.com");
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 404 }));
    vi.stubGlobal("fetch", fetchMock);
    await expect(getCmsPreviewPage(token)).resolves.toBeNull();
    await expect(getCmsPreviewPage("../x")).resolves.toBeNull();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("parses ERP admin origins", () => {
    expect(erpAdminOrigins("https://erp.clickmasters.pk/, http://192.168.88.38:3000,javascript:x")).toEqual([
      "https://erp.clickmasters.pk",
      "http://192.168.88.38:3000",
    ]);
    expect(erpAdminOrigins("")).toEqual(["https://erp.clickmasters.pk"]);
  });
});

describe("page edits: new ERP features", () => {
  it("parses inserted sections, rich text, images and schema (flat form)", () => {
    const edits = parsePageEdits({
      data: {
        seo: { keywords: ["a", "b"], schema: [{ "@type": "FAQPage" }, "x"] },
        patches: [
          { selector: "body > h1", text: "Hi", html: "<strong>Hi</strong>" },
          { selector: "body > img", image: { src: "https://cdn.example/new.png", alt: "New" } },
          { selector: "body > div", backgroundImage: "https://cdn.example/bg.png" },
          { selector: "body > img", image: { src: "javascript:alert(1)" } },
          { selector: "body > div", backgroundImage: 'https://x/a.png") ; color:red' },
        ],
        operations: [
          {
            action: "insert",
            selector: "body > p",
            id: "abc123",
            position: "after",
            html: "<p>New</p>",
            layout: "image-left",
            theme: { h2: { "font-size": "48px", position: "fixed" }, script: { color: "red" } },
          },
          { action: "insert", selector: "body > p", id: "bad id!", html: "<p>x</p>" },
          { action: "duplicate", selector: "body > p", id: "copy-1" },
        ],
      },
    });
    expect(edits?.instructions).toEqual([
      { kind: "edit", selector: "body > h1", text: "Hi", html: "<strong>Hi</strong>", styles: [] },
      {
        kind: "edit",
        selector: "body > img",
        styles: [],
        image: { src: "https://cdn.example/new.png", alt: "New" },
      },
      { kind: "edit", selector: "body > div", styles: [], backgroundImage: "https://cdn.example/bg.png" },
      {
        kind: "insert",
        selector: "body > p",
        id: "abc123",
        position: "after",
        html: "<p>New</p>",
        layout: "image-left",
        theme: [["h2", [["font-size", "48px"]]]],
      },
      { kind: "duplicate", selector: "body > p", id: "copy-1" },
    ]);
    expect(edits?.seo.keywords).toEqual(["a", "b"]);
    expect(edits?.schema).toEqual([{ "@type": "FAQPage" }]);
  });

  it("parses sectionInsert in the sections form", () => {
    const edits = parsePageEdits({
      data: {
        page: {
          sections: [
            {
              type: "sectionInsert",
              order: 1,
              content: { selector: "body > p", id: "smwumn9j563bxp", position: "before", html: "<p>A</p>" },
            },
          ],
        },
      },
    });
    expect(edits?.instructions).toEqual([
      { kind: "insert", selector: "body > p", id: "smwumn9j563bxp", position: "before", html: "<p>A</p>", theme: [] },
    ]);
  });
});
