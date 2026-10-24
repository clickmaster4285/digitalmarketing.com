import {
  getAllCitySlugs,
  getServiceCityUrlSlug,
} from "@/content/locations/serviceLocations";
import { SUB_PAGE_REGISTRY } from "@/content/locations/subPageRegistry";

const siteUrl = "https://clickmastersdigitalmarketing.com";
const SERVICE = "search-engine-optimization";

// Custom SEO sub-page slugs — from the SAME registry the page uses.
const SEO_SUBPAGE_SLUGS = new Set(Object.keys(SUB_PAGE_REGISTRY));

export async function GET() {
  const lastMod = new Date().toISOString().split("T")[0];
  const urls = new Set<string>();

  const citySlugs = new Set(getAllCitySlugs());

  // 1. Every base city → canonical SEO URL
  for (const city of citySlugs) {
    const urlSlug = getServiceCityUrlSlug(SERVICE, city);
    urls.add(`${siteUrl}/${SERVICE}/locations/${urlSlug}`);
  }

  // 2. Sub-pages whose city isn't a base city (greenville, san-jose, chattanooga, raleigh, …)
  for (const subSlug of SEO_SUBPAGE_SLUGS) {
    const citySlug = subSlug.replace(/^seo-services-/, "");
    if (!citySlugs.has(citySlug)) {
      urls.add(`${siteUrl}/${SERVICE}/locations/${subSlug}`);
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