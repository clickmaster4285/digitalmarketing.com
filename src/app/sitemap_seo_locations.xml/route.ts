import {
  getAllCitySlugs,
  getServiceCityUrlSlug,
  SERVICE_SUB_LOCATIONS,
} from "@/content/locations/serviceLocations";

const siteUrl = "https://clickmastersdigitalmarketing.com";
const SEO_SERVICE = "search-engine-optimization";

// All custom SEO sub-page slugs (e.g. "seo-services-atlanta").
const SEO_SUBPAGE_SLUGS = new Set(
  (SERVICE_SUB_LOCATIONS[SEO_SERVICE] ?? []).map((s) => s.slug)
);

export async function GET() {
  const lastMod = new Date().toISOString().split("T")[0];
  const urls = new Set<string>();

  for (const city of getAllCitySlugs()) {
    urls.add(
      `${siteUrl}/${SEO_SERVICE}/locations/${getServiceCityUrlSlug(SEO_SERVICE, city)}`
    );
  }

  // Include custom SEO sub-pages that are not otherwise in the city list.
  for (const subSlug of SEO_SUBPAGE_SLUGS) {
    urls.add(`${siteUrl}/${SEO_SERVICE}/locations/${subSlug}`);
  }

  const sorted = Array.from(urls).sort();
  const xmlUrls = sorted.map(
    (u) => `  <url>\n    <loc>${u}</loc>\n    <lastmod>${lastMod}</lastmod>\n  </url>`
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${xmlUrls.join("\n")}\n</urlset>\n`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}