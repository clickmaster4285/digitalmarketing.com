import { getCmsPageList, type CmsPageSummary } from "./cms";

const SITE_URL = "https://clickmastersdigitalmarketing.com";

/** Published, indexable ERP-created pages (newest first). */
export async function indexableCmsPages(
  filter: (page: CmsPageSummary) => boolean,
): Promise<CmsPageSummary[]> {
  const pages = await getCmsPageList();
  const seen = new Set<string>();
  return pages
    .filter((page) => !page.noindex && filter(page))
    .filter((page) => (seen.has(page.slug) ? false : (seen.add(page.slug), true)))
    .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));
}

/** urlset XML. Slugs are validated to [A-Za-z0-9_-/] so they need no escaping. */
export function cmsUrlset(pages: CmsPageSummary[]): Response {
  const urls = pages
    .map((page) => {
      const lastmod =
        page.publishedAt && !Number.isNaN(Date.parse(page.publishedAt))
          ? `\n    <lastmod>${new Date(page.publishedAt).toISOString()}</lastmod>`
          : "";
      return `  <url>\n    <loc>${SITE_URL}/${page.slug}</loc>${lastmod}\n  </url>`;
    })
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}${urls ? "\n" : ""}</urlset>\n`;
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
