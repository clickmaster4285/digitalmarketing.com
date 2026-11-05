// src/app/locations/[slug]/page.tsx

import { getLocationBySlug, getAllLocationSlugs } from "@/content/locations/locationPagesData";
import { LocationPage } from "@/components/locations";
import { notFound, permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import { CmsPageRenderer } from "@/components/cms/CmsPageRenderer";
import { cmsPageMetadata, getCmsPage } from "@/lib/cms";
import { normalizeMetadataText } from "@/lib/serviceMetadata";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const LEGACY_LOCATION_REDIRECTS = new Set([
  "digital-marketing-agency-tampa",
  "digital-marketing-agency-seattle",
  "digital-marketing-agency-phoenix",
  "digital-marketing-agency-richmond",
]);

// Generate static paths for all locations
export async function generateStaticParams() {
  return getAllLocationSlugs();
}

// Generate metadata for each location page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    if (LEGACY_LOCATION_REDIRECTS.has(slug)) {
      return { title: "Location Not Found" };
    }
    const cmsPage = await getCmsPage(["locations", slug]);
    return cmsPage ? cmsPageMetadata(cmsPage) : { title: "Location Not Found" };
  }

  const title = normalizeMetadataText(location.metaTitle, 60);
  const description = normalizeMetadataText(location.metaDescription, 155);

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: `/locations/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/locations/${slug}`,
      siteName: "Clickmasters Digital Marketing",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

// Main page component
export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  if (slug === "digital-marketing-agency-tampa") {
    permanentRedirect("/locations/seo-services-tampa");
  }
 if (slug === "digital-marketing-agency-seattle") {
    permanentRedirect("/locations/seo-services-seattle");
  }
   if (slug === "digital-marketing-agency-phoenix") {
    permanentRedirect("/locations/seo-services-phoenix");
  }
  if (slug === "digital-marketing-agency-richmond") {
    permanentRedirect("/locations/seo-services-richmond");
  }
  

  const location = getLocationBySlug(slug);

  if (!location) {
    const cmsPage = await getCmsPage(["locations", slug]);
    if (cmsPage) return <CmsPageRenderer page={cmsPage} />;
    notFound();
  }
 
  return <LocationPage data={location} />;
}