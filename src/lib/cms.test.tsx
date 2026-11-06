import { describe, it, expect, afterEach, vi } from "vitest";
import React from "react";
import { getCmsPage, validateCmsSlug } from "./cms";
import { CmsPageRenderer } from "../components/cms/CmsPageRenderer";
import { renderToStaticMarkup } from "react-dom/server";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("CMS page integration", () => {
  it("accepts single and nested URL slugs but rejects invalid paths", () => {
    expect(validateCmsSlug("about")).toBe("about");
    expect(validateCmsSlug(["abc", "xyz"])).toBe("abc/xyz");
    expect(validateCmsSlug("")).toBeNull();
    expect(validateCmsSlug("../private")).toBeNull();
    expect(validateCmsSlug("bad%2Fslug")).toBeNull();
    expect(validateCmsSlug("abc//xyz")).toBeNull();
  });

  it("fetches a page from the public endpoint using the configured domain", async () => {
    vi.stubEnv("CMS_API_URL", "https://erp.example/");
    vi.stubEnv("CMS_SITE_DOMAIN", "clickmastersdigitalmarketing.com");
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          data: {
            page: {
              title: "Nested page",
              slug: "abc/xyz",
              pageType: "standard",
              sections: [
                { id: "later", type: "text", order: 2, content: {} },
                { id: "first", type: "hero", order: 1, content: {} },
              ],
              seo: { title: "SEO title" },
            },
          },
        }),
        { status: 200 },
      ),
    );
    vi.stubGlobal("fetch", fetchMock);

    const page = await getCmsPage(["abc", "xyz"]);

    expect(fetchMock).toHaveBeenCalledWith(
      "https://erp.example/public/clickmastersdigitalmarketing.com/pages/abc/xyz",
      expect.objectContaining({
        next: { revalidate: 300 },
        signal: expect.any(AbortSignal),
      }),
    );
    expect(page?.title).toBe("Nested page");
    expect(page?.sections.map((section) => section.id)).toEqual([
      "first",
      "later",
    ]);
  });

  it("treats a CMS 404 as a missing page", async () => {
    vi.stubEnv("CMS_API_URL", "https://erp.example");
    vi.stubEnv("CMS_SITE_DOMAIN", "clickmastersdigitalmarketing.com");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(null, { status: 404 })),
    );

    await expect(getCmsPage("missing")).resolves.toBeNull();
  });

  it("logs an HTML response as a CMS configuration error and treats the page as missing", async () => {
    vi.stubEnv("CMS_API_URL", "http://localhost:3000");
    vi.stubEnv("CMS_SITE_DOMAIN", "clickmastersdigitalmarketing.com");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response("<!doctype html><html></html>", {
          status: 200,
          headers: { "content-type": "text/html" },
        }),
      ),
    );

    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    await expect(getCmsPage("new-digital-page")).resolves.toBeNull();
    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining("CMS endpoint returned HTML instead of JSON"),
    );
    errorSpy.mockRestore();
  });

  it("does not fetch when the integration is not configured", async () => {
    vi.stubEnv("CMS_API_URL", "");
    vi.stubEnv("CMS_SITE_DOMAIN", "");
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    await expect(getCmsPage("about")).resolves.toBeNull();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("renders CMS text safely and ignores unsupported section types", () => {
    const markup = renderToStaticMarkup(
      <CmsPageRenderer
        page={{
          title: "Test",
          slug: "test",
          sections: [
            {
              type: "text",
              content: {
                heading: "<script>alert(1)</script>",
                bodyHtml: "<img src=x onerror=alert(1)>Safe text",
                primaryUrl: "javascript:alert(1)",
                primaryLabel: "Unsafe link",
              },
            },
            { type: "unknown-script", content: { bodyHtml: "<script>bad</script>" } },
          ]}
        }
      />,
    );

    expect(markup).toContain("&lt;script&gt;alert(1)&lt;/script&gt;");
    expect(markup).toContain("Safe text");
    expect(markup).not.toContain("<script>");
    expect(markup).not.toContain("onerror");
    expect(markup).not.toContain("javascript:");
    expect(markup).not.toContain("unknown-script");
  });
});
