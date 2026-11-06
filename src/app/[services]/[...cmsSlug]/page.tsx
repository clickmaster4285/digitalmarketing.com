import ServicesPage from "@/components/services/ServicesPage";
import { notFound, permanentRedirect } from "next/navigation";
import { CmsPageRenderer } from "@/components/cms/CmsPageRenderer";
import { isMainServiceSlug } from "@/content/locations/serviceLocations";
import {
  CONSOLIDATED_SERVICE_SLUGS,
  SERVICE_PAGE_SLUGS,
} from "@/content/services/servicePageSlugs";
import {
  getAllServicePaths,
  getCanonicalServicePath,
} from "@/content/services/serviceCategories";
import { getCmsPage } from "@/lib/cms";
import { getServiceContent } from "@/content/services/serviceContentRegistry";

// Prerender every published sub-service page (the URLs in sitemap_services.xml).
// Anything else (CMS pages, redirects) is still handled on demand below.
export async function generateStaticParams() {
  return getAllServicePaths()
    .map((path) => path.split("/").filter(Boolean))
    .filter((segments) => segments.length === 2 && isMainServiceSlug(segments[0]))
    .map(([services, slug]) => ({ services, cmsSlug: [slug] }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ services: string; cmsSlug: string[] }>;
}) {
  const { services, cmsSlug } = await params;
  const slug = cmsSlug.length === 1 ? cmsSlug[0] : null;

  if (
    services === "search-engine-optimization" &&
    (slug === "content-optimization" || slug === "ai-search-optimization")
  ) {
    notFound();
  }

  if (
    slug &&
    isMainServiceSlug(services) &&
    services === "search-engine-optimization" &&
    slug.startsWith("seo-services-")
  ) {
    permanentRedirect(`/${services}/locations/${slug}`);
  }

  // Pages merged into their category hub redirect from every parent path.
  if (slug && isMainServiceSlug(services) && Object.hasOwn(CONSOLIDATED_SERVICE_SLUGS, slug)) {
    permanentRedirect(CONSOLIDATED_SERVICE_SLUGS[slug]);
  }

  if (slug && isMainServiceSlug(services) && SERVICE_PAGE_SLUGS.has(slug)) {
    // A service listed under several parents is served only at its canonical path.
    const canonicalPath = getCanonicalServicePath(slug);
    if (canonicalPath && canonicalPath !== `/${services}/${slug}`) {
      permanentRedirect(canonicalPath);
    }
    return <ServicesPage slugOverride={slug} content={getServiceContent(slug)} />;
  }

  const page = await getCmsPage([services, ...cmsSlug]);
  if (!page) notFound();
  return <CmsPageRenderer page={page} />;
}
