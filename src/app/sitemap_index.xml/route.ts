const siteUrl = 'https://clickmastersdigitalmarketing.com';
const lastModified = new Date().toISOString();

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${siteUrl}/sitemap_pages.xml</loc>
    <lastmod>${lastModified}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${siteUrl}/sitemap_services.xml</loc>
    <lastmod>${lastModified}</lastmod>
  </sitemap>


  <sitemap>
    <loc>${siteUrl}/sitemap_digital_marketing_locations.xml</loc>
    <lastmod>${lastModified}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${siteUrl}/sitemap_seo_locations.xml</loc>
    <lastmod>${lastModified}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${siteUrl}/sitemap_social_media_locations.xml</loc>
    <lastmod>${lastModified}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${siteUrl}/sitemap_ppc_locations.xml</loc>
    <lastmod>${lastModified}</lastmod>
  </sitemap>


  
  <sitemap>
    <loc>${siteUrl}/sitemap_blogs.xml</loc>
    <lastmod>${lastModified}</lastmod>
  </sitemap>
</sitemapindex>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}