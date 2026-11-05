import { getAllServicePaths } from "@/content/services/serviceCategories";
import { SERVICES_WITH_CITY_PAGES } from "@/content/locations/serviceLocations";

const siteUrl = "https://clickmastersdigitalmarketing.com";

// Built from the same registry as the /services directory and the category
// hubs, so every linked service page is listed, each once at its canonical URL.
export async function GET() {
  const lastMod = new Date().toISOString().split("T")[0];
  const paths = new Set([
    ...getAllServicePaths(),
    ...SERVICES_WITH_CITY_PAGES.map((service) => `/${service}/locations`),
  ]);

  const xmlUrls = Array.from(paths)
    .sort()
    .map(
      (path) =>
        `  <url>\n    <loc>${siteUrl}${path}</loc>\n    <lastmod>${lastMod}</lastmod>\n  </url>`,
    );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${xmlUrls.join("\n")}\n</urlset>\n`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
