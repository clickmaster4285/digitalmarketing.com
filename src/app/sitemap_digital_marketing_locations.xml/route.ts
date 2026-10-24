import { getAllLocationSlugs } from "@/content/locations/locationPagesData";

const siteUrl = "https://clickmastersdigitalmarketing.com";

const REDIRECTED_SLUGS = new Set([
  "digital-marketing-agency-tampa",
  "digital-marketing-agency-seattle",
  "digital-marketing-agency-phoenix",
  "digital-marketing-agency-richmond",
]);

export async function GET() {
  const lastMod = new Date().toISOString().split("T")[0];

  // Dedupe + filter redirects — fully automatic from locationPagesData.ts
  const slugs = Array.from(
    new Set(
      getAllLocationSlugs()
        .map((p) => (typeof p === "string" ? p : p.params.slug))
        .filter((slug) => !REDIRECTED_SLUGS.has(slug))
    )
  );

  const urls = [
    `${siteUrl}/locations`,
    ...slugs.map((slug) => `${siteUrl}/locations/${slug}`),
  ].sort();

  const xmlUrls = urls.map(
    (u) => `  <url>\n    <loc>${u}</loc>\n    <lastmod>${lastMod}</lastmod>\n  </url>`
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${xmlUrls.join("\n")}\n</urlset>\n`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}