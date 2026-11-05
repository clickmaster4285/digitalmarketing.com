// src/app/[services]/locations/page.tsx
// "Service Locations" hub — e.g. /search-engine-optimization/locations
// This static segment takes precedence over [services]/[slug] for the
// "locations" path, replacing the previously empty page.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceLocationsHub } from "@/components/service-locations/ServiceLocationsHub";
import { CmsPageRenderer } from "@/components/cms/CmsPageRenderer";
import { cmsPageMetadata, getCmsPage } from "@/lib/cms";
import {
  getMainService,
  getLatestServiceSubLocations,
  getTotalCityCount,
  isMainServiceSlug,
} from "@/content/locations/serviceLocations";

const BASE_URL = "https://clickmastersdigitalmarketing.com";

type Params = { params: Promise<{ services: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { services } = await params;
  if (!isMainServiceSlug(services)) {
    const cmsPage = await getCmsPage([services, "locations"]);
    return cmsPage ? cmsPageMetadata(cmsPage) : notFound();
  }
  const svc = getMainService(services);
  const cityCount = getTotalCityCount();
  const subLocations = getLatestServiceSubLocations(svc.slug, 9);

  const title = `${svc.name} Locations — ${cityCount}+ US Cities We Serve`;
  const description =
    subLocations.length > 0
      ? `Clickmasters ${svc.name.toLowerCase()} in ${subLocations
          .map((s) => s.city)
          .join(", ")} and ${cityCount}+ US cities. Explore our newest local ${svc.short.toLowerCase()} programs.`
      : `Clickmasters ${svc.name.toLowerCase()} now available in ${cityCount}+ US cities. Explore our newest local programs and see what a city-level ${svc.short.toLowerCase()} rollout includes.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${svc.slug}/locations`,
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${svc.slug}/locations`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function Page({ params }: Params) {
  const { services } = await params;
  if (!isMainServiceSlug(services)) {
    const cmsPage = await getCmsPage([services, "locations"]);
    if (!cmsPage) notFound();
    return <CmsPageRenderer page={cmsPage} />;
  }
  const service = getMainService(services);
  const subLocations = getLatestServiceSubLocations(service.slug, 9);
  const cityCount = getTotalCityCount();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.name} — ${cityCount}+ US Cities`,
    serviceType: service.title,
    provider: {
      "@type": "Organization",
      name: "Clickmasters Digital Marketing",
      url: BASE_URL,
    },
    areaServed:
      subLocations.length > 0
        ? subLocations.map((s) => ({
            "@type": "City",
            name: `${s.city}, ${s.state}`,
          }))
        : [{ "@type": "Country", name: "United States" }],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServiceLocationsHub
        service={service}
        subLocations={subLocations}
        cityCount={cityCount}
      />
    </>
  );
}
