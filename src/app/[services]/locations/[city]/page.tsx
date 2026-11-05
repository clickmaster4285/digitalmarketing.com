// src/app/[services]/locations/[city]/page.tsx
// One service in one city — e.g. /search-engine-optimization/locations/seo-services-boston
// These are the sub-location pages shown as "Latest locations" cards on the
// /{services}/locations hub.
//
// A slug that exists in SUB_PAGE_REGISTRY renders a fully-custom sub page
// (e.g. seo-services-atlanta). Everything else falls back to the generic
// city page built from locationPagesData.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceCityPage } from "@/components/service-locations/ServiceCityPage";
import { ServiceSubPage } from "@/components/service-locations/ServiceSubPage";
import RegionalLocations from "@/components/locations/RegionalLocations";
import ServiceCityCrossLinks from "@/components/service-locations/ServiceCityCrossLinks";
import ServicesPage from "@/components/services/ServicesPage";
import { SeoServicesUsaContent } from "@/content/services/SeoServicesUsa";
import { getSubPageBySlug } from "@/content/locations/subPageRegistry";
import {
  getMainService,
  getLocationByCitySlug,
  getLatestServiceSubLocations,
  getTotalCityCount,
  resolveServiceCitySlug,
  isMainServiceSlug,
} from "@/content/locations/serviceLocations";
import { CmsPageRenderer } from "@/components/cms/CmsPageRenderer";
import { cmsPageMetadata, getCmsPage } from "@/lib/cms";
import { normalizeMetadataText } from "@/lib/serviceMetadata";
import { organizationRef } from "@/lib/organizationSchema";

const BASE_URL = "https://clickmastersdigitalmarketing.com";

type Params = { params: Promise<{ services: string; city: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { services, city } = await params;
  if (!isMainServiceSlug(services)) {
    const cmsPage = await getCmsPage([services, "locations", city]);
    return cmsPage ? cmsPageMetadata(cmsPage) : notFound();
  }
  const svc = getMainService(services);

  if (services === "search-engine-optimization" && city === "seo-services-usa") {
    const title = normalizeMetadataText(
      `${SeoServicesUsaContent.hero.title} ${SeoServicesUsaContent.hero.titleHighlight}`,
      60,
    );
    const description = normalizeMetadataText(
      SeoServicesUsaContent.hero.description,
      155,
    );
    const canonical = `${BASE_URL}/${svc.slug}/locations/${city}`;

    return {
      title,
      description,
      alternates: { canonical },
      openGraph: { title, description, url: canonical, type: "website" },
      twitter: { card: "summary_large_image", title, description },
    };
  }

  // Custom sub page (e.g. the Atlanta SEO page)
  const subPage =
    services === "search-engine-optimization" ? getSubPageBySlug(city) : undefined;
  if (subPage) {
    const title = normalizeMetadataText(subPage.metaTitle, 60);
    const description = normalizeMetadataText(subPage.metaDescription, 155);
    return {
      title,
      description,
      alternates: {
        canonical: `${BASE_URL}/${svc.slug}/locations/${city}`,
      },
      openGraph: {
        title,
        description,
        url: `${BASE_URL}/${svc.slug}/locations/${city}`,
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
    };
  }

  // Generic city page
  const locationCity = resolveServiceCitySlug(services, city);
  if (!locationCity) {
    const cmsPage = await getCmsPage([services, "locations", city]);
    if (cmsPage) return cmsPageMetadata(cmsPage);
    notFound();
  }

  const location = getLocationByCitySlug(locationCity);
  if (!location) {
    const cmsPage = await getCmsPage([services, "locations", city]);
    if (cmsPage) return cmsPageMetadata(cmsPage);
    notFound();
  }

  const title = normalizeMetadataText(location.metaTitle, 60);
  const description = normalizeMetadataText(
    location.metaDescription ||
      `Looking for ${svc.name.toLowerCase()} in ${location.name}? Clickmasters delivers data-driven ${svc.short.toLowerCase()} for ${location.name} businesses. Book your free strategy call.`,
    155,
  );

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${svc.slug}/locations/${city}`,
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${svc.slug}/locations/${city}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

// __ROUTE_P2__



export default async function Page({ params }: Params) {
  const { services, city } = await params;
  if (!isMainServiceSlug(services)) {
    const cmsPage = await getCmsPage([services, "locations", city]);
    if (!cmsPage) notFound();
    return <CmsPageRenderer page={cmsPage} />;
  }
  const svc = getMainService(services);

  if (services === "search-engine-optimization" && city === "seo-services-usa") {
    return <ServicesPage slugOverride="seo-services-usa" />;
  }

  // Custom sub page (e.g. the Atlanta SEO page)
  const subPage =
    services === "search-engine-optimization" ? getSubPageBySlug(city) : undefined;
  if (subPage) {
    const subPageCitySlug = resolveServiceCitySlug(services, city);
    const subPageLocation = subPageCitySlug
      ? getLocationByCitySlug(subPageCitySlug)
      : undefined;
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          name: `${subPage.cityDisplay} ${svc.title}`,
          serviceType: svc.title,
          provider: organizationRef,
          areaServed: {
            "@type": "City",
            name: `${subPage.cityDisplay}, ${subPage.stateDisplay}`,
          },
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: BASE_URL,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: svc.name,
              item: `${BASE_URL}/${svc.slug}`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "Locations",
              item: `${BASE_URL}/${svc.slug}/locations`,
            },
            {
              "@type": "ListItem",
              position: 4,
              name: subPage.cityDisplay,
              item: `${BASE_URL}/${svc.slug}/locations/${city}`,
            },
          ],
        },
      ],
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ServiceSubPage service={svc} content={subPage} />
        {subPageLocation && (
          <>
            <ServiceCityCrossLinks serviceSlug={svc.slug} current={subPageLocation} />
            <RegionalLocations current={subPageLocation} />
          </>
        )}
      </>
    );
  }

  const locationCity = resolveServiceCitySlug(services, city);
  if (!locationCity) {
    const cmsPage = await getCmsPage([services, "locations", city]);
    if (cmsPage) return <CmsPageRenderer page={cmsPage} />;
    notFound();
  }

  const location = getLocationByCitySlug(locationCity);
  if (!location) {
    const cmsPage = await getCmsPage([services, "locations", city]);
    if (cmsPage) return <CmsPageRenderer page={cmsPage} />;
    notFound();
  }

  const otherCities = getLatestServiceSubLocations(svc.slug, 7)
    .filter((sub) => sub.slug !== city)
    .slice(0, 6);
  const cityCount = getTotalCityCount();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: `${svc.title} in ${location.name}, ${location.state}`,
        serviceType: svc.title,
        provider: organizationRef,
        areaServed: {
          "@type": "City",
          name: `${location.name}, ${location.state}`,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: BASE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: svc.name,
            item: `${BASE_URL}/${svc.slug}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Locations",
            item: `${BASE_URL}/${svc.slug}/locations`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: location.name,
            item: `${BASE_URL}/${svc.slug}/locations/${city}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServiceCityPage
        service={svc}
        location={location}
        otherCities={otherCities}
        cityCount={cityCount}
      />
      <ServiceCityCrossLinks serviceSlug={svc.slug} current={location} />
      <RegionalLocations current={location} />
    </>
  );
}
