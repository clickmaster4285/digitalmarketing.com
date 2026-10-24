import {
  getAllCitySlugs,
  getServiceCityUrlSlug,
} from "@/content/locations/serviceLocations";

const siteUrl = "https://clickmastersdigitalmarketing.com";
const SERVICE = "social-media-marketing";

export async function GET() {
  const lastMod = new Date().toISOString().split("T")[0];
  const urls = new Set<string>();

  // Every base city → canonical social-media URL
  for (const city of getAllCitySlugs()) {
    const urlSlug = getServiceCityUrlSlug(SERVICE, city);
    urls.add(`${siteUrl}/${SERVICE}/locations/${urlSlug}`);
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