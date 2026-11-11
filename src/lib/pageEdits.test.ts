import { afterEach, describe, expect, it, vi } from "vitest";
import { normalizeEditPath, parseEditedPagesList, parsePageEdits, sanitizeStyles } from "./pageEdits";
import { applyEditedPageSeo } from "./pageEdits.server";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("edited pages parsing", () => {
  it("normalizes paths", () => {
    expect(normalizeEditPath("/services/x/")).toBe("/services/x");
    expect(normalizeEditPath("services/x?a=1#b")).toBe("/services/x");
    expect(normalizeEditPath("/")).toBe("/");
    expect(normalizeEditPath("/a//b")).toBeNull();
    expect(normalizeEditPath("/<script>")).toBeNull();
  });

  it("allow-lists style properties and rejects unsafe values", () => {
    expect(
      sanitizeStyles({
        color: "#f83a3a",
        "font-family": '"Courier New", monospace',
        position: "fixed",
        "background-color": "url(javascript:alert(1))",
        width: "expression(alert(1))",
        margin: "0 auto; display:none",
      }),
    ).toEqual([
      ["color", "#f83a3a"],
      ["font-family", '"Courier New", monospace'],
    ]);
  });

  it("orders the sections form, skips hidden/unknown/invalid entries", () => {
    const edits = parsePageEdits({
      success: true,
      data: {
        page: {
          title: "T",
          sections: [
            { type: "sectionRemove", order: 8, content: { selector: "section:nth-of-type(3)" } },
            { type: "elementEdit", order: 0, content: { selector: "h2", text: "Hi" }, styles: { color: "red" } },
            { type: "sectionDuplicate", order: 6, content: { selector: "div", id: "bad id!" } },
            { type: "sectionDuplicate", order: 5, content: { selector: "div", id: "abc-12" } },
            { type: "elementEdit", order: 1, hidden: true, content: { selector: "p", text: "x" } },
            { type: "mystery", order: 2, content: { selector: "p" } },
            { type: "sectionMove", order: 7, content: { selector: "a", target: "b", position: "before" } },
          ],
        },
      },
    });
    expect(edits?.instructions).toEqual([
      { kind: "edit", selector: "h2", text: "Hi", styles: [["color", "red"]] },
      { kind: "duplicate", selector: "div", id: "abc-12" },
      { kind: "move", selector: "a", target: "b", position: "before" },
      { kind: "remove", selector: "section:nth-of-type(3)" },
    ]);
  });

  it("parses the flat page-edits form", () => {
    const edits = parsePageEdits({
      success: true,
      data: {
        title: "Edited",
        seo: { description: "Desc", ogTitle: "OG" },
        patches: [{ selector: "h2", styles: { color: "#f83a3a" } }],
        operations: [{ action: "duplicate", selector: "div", id: "cmhx2k9abc12" }],
        version: 3,
      },
    });
    expect(edits?.instructions.map((i) => i.kind)).toEqual(["edit", "duplicate"]);
    expect(edits?.seo).toMatchObject({ title: "Edited", description: "Desc", ogTitle: "OG" });
    expect(edits?.version).toBe(3);
  });

  it("parses the edited-pages list", () => {
    expect(
      parseEditedPagesList({
        data: { pages: [{ slug: "/services/a/" }, { slug: "/", noindex: true }, { slug: 5 }] },
      }),
    ).toEqual([
      { path: "/services/a", noindex: false },
      { path: "/", noindex: true },
    ]);
  });
});

describe("applyEditedPageSeo", () => {
  const base = { title: "Base title", description: "Base description" };

  it("returns base metadata untouched when the ERP is unreachable", async () => {
    vi.stubEnv("CMS_API_URL", "http://127.0.0.1:1");
    vi.stubEnv("CMS_SITE_DOMAIN", "example.com");
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("ECONNREFUSED")));
    await expect(applyEditedPageSeo("/about", base)).resolves.toBe(base);
  });

  it("returns base metadata untouched for paths without edits", async () => {
    vi.stubEnv("CMS_API_URL", "https://erp.example");
    vi.stubEnv("CMS_SITE_DOMAIN", "example.com");
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ success: true, data: { pages: [{ slug: "/other" }] } })),
    );
    vi.stubGlobal("fetch", fetchMock);
    await expect(applyEditedPageSeo("/about", base)).resolves.toBe(base);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("overlays edited SEO for edited paths", async () => {
    vi.stubEnv("CMS_API_URL", "https://erp.example");
    vi.stubEnv("CMS_SITE_DOMAIN", "example.com");
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string) =>
        url.includes("page-edits?path=%2Fpricing")
          ? new Response(
              JSON.stringify({
                success: true,
                data: {
                  title: "Edited title",
                  seo: { description: "Edited description", canonicalUrl: "https://example.com/pricing", robots: "noindex" },
                  patches: [],
                  operations: [],
                },
              }),
            )
          : new Response(JSON.stringify({ success: true, data: { pages: [{ slug: "/pricing" }] } })),
      ),
    );
    const metadata = await applyEditedPageSeo("/pricing", base);
    expect(metadata).toMatchObject({
      title: "Edited title",
      description: "Edited description",
      alternates: { canonical: "https://example.com/pricing" },
      robots: { index: false, follow: true },
    });
  });
});
