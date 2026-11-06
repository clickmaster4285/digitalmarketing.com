import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CmsPageRenderer } from "@/components/cms/CmsPageRenderer";
import { isMainServiceSlug, MAIN_SERVICES } from "@/content/locations/serviceLocations";
import { cmsPageMetadata, getCmsPage } from "@/lib/cms";
import ServiceLandingClient from "./ServiceLandingClient";

type PageProps = {
  params: Promise<{ services: string }>;
};

// Prerender the code-defined service landing pages; CMS slugs render on demand.
export async function generateStaticParams() {
  return Object.keys(MAIN_SERVICES).map((services) => ({ services }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { services } = await params;
  if (isMainServiceSlug(services)) return {};

  const page = await getCmsPage(services);
  return page ? cmsPageMetadata(page) : { title: "Page Not Found" };
}

export default async function Page({ params }: PageProps) {
  const { services } = await params;

  if (isMainServiceSlug(services)) {
    return <ServiceLandingClient />;
  }

  const page = await getCmsPage(services);
  if (!page) notFound();
  return <CmsPageRenderer page={page} />;
}
