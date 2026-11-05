import ServicesPage from "@/components/services/ServicesPage";
import { notFound, permanentRedirect } from "next/navigation";
import { CmsPageRenderer } from "@/components/cms/CmsPageRenderer";
import { isMainServiceSlug } from "@/content/locations/serviceLocations";
import { SERVICE_PAGE_SLUGS } from "@/content/services/servicePageSlugs";
import { getCmsPage } from "@/lib/cms";

export default async function Page({
  params,
}: {
  params: Promise<{ services: string; cmsSlug: string[] }>;
}) {
  const { services, cmsSlug } = await params;
  const slug = cmsSlug.length === 1 ? cmsSlug[0] : null;

  if (
    slug &&
    isMainServiceSlug(services) &&
    services === "search-engine-optimization" &&
    slug.startsWith("seo-services-")
  ) {
    permanentRedirect(`/${services}/locations/${slug}`);
  }

  if (slug && isMainServiceSlug(services) && SERVICE_PAGE_SLUGS.has(slug)) {
    return <ServicesPage slugOverride={slug} />;
  }

  const page = await getCmsPage([services, ...cmsSlug]);
  if (!page) notFound();
  return <CmsPageRenderer page={page} />;
}
