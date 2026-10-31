import {
  MAIN_SERVICES,
  getAllCitySlugs,
  getServiceCityUrlSlug,
  SERVICE_SUB_LOCATIONS,
} from "@/content/locations/serviceLocations";

const siteUrl = "https://clickmastersdigitalmarketing.com";

// All custom SEO sub-page slugs (e.g. "seo-services-atlanta").
const SEO_SUBPAGE_SLUGS = new Set(
  (SERVICE_SUB_LOCATIONS["search-engine-optimization"] ?? []).map((s) => s.slug)
);

export async function GET() {
  const lastMod = new Date().toISOString().split("T")[0];
  const urls = new Set<string>();

  const citySlugs = getAllCitySlugs();

  for (const serviceSlug of Object.keys(MAIN_SERVICES)) {
    const isSeo = serviceSlug === "search-engine-optimization";

    for (const city of citySlugs) {
      if (!isSeo) {
        // Non-SEO services: only the bare city slug is canonical.
        urls.add(`${siteUrl}/${serviceSlug}/locations/${city}`);
        continue;
      }

      urls.add(
        `${siteUrl}/${serviceSlug}/locations/${getServiceCityUrlSlug(serviceSlug, city)}`
      );
    }

    // Include custom SEO sub-pages that are not otherwise in the city list.
    if (isSeo) {
      for (const subSlug of SEO_SUBPAGE_SLUGS) {
        urls.add(`${siteUrl}/${serviceSlug}/locations/${subSlug}`);
      }
    }
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