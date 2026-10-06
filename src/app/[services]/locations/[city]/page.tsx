// src/app/[services]/locations/[city]/page.tsx
// One service in one city — e.g. /search-engine-optimization/locations/boston
// These are the sub-location pages shown as "Latest locations" cards on the
// /{services}/locations hub.
//
// A slug that exists in SUB_PAGE_REGISTRY renders a fully-custom sub page
// (e.g. seo-services-atlanta). Everything else falls back to the generic
// city page built from locationPagesData.

import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { ServiceCityPage } from "@/components/service-locations/ServiceCityPage";
import { ServiceSubPage } from "@/components/service-locations/ServiceSubPage";
import { getSubPageBySlug } from "@/content/locations/subPageRegistry";
import {
  getMainService,
  getLocationByCitySlug,
  getLatestServiceSubLocations,
  getTotalCityCount,
  resolvePrefixedCitySlug,
} from "@/content/locations/serviceLocations";

const BASE_URL = "https://clickmastersdigitalmarketing.com";
const SEO_CITY_URL_SLUGS: Record<string, string> = {
  phoenix: "seo-services-phoenix",
  seattle: "seo-services-seattle",
  tampa: "seo-services-tampa",
  richmond: "seo-services-richmond",
};

const getLocationCitySlug = (services: string, city: string): string => {
  if (services !== "search-engine-optimization") return city;
  return (
    Object.entries(SEO_CITY_URL_SLUGS).find(
      ([citySlug, seoSlug]) => city === citySlug || city === seoSlug
    )?.[0] ?? city
  );
};

const getCanonicalCitySlug = (services: string, city: string): string => {
  if (services !== "search-engine-optimization") return city;
  const entry = Object.entries(SEO_CITY_URL_SLUGS).find(
    ([citySlug, seoSlug]) => city === citySlug || city === seoSlug
  );
  return entry?.[1] ?? city;
};

type Params = { params: Promise<{ services: string; city: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { services, city } = await params;
  const svc = getMainService(services);

  // Custom sub page (e.g. the Atlanta SEO page)
  const subPage =
    services === "search-engine-optimization" ? getSubPageBySlug(city) : undefined;
  if (subPage) {
    return {
      title: subPage.metaTitle,
      description: subPage.metaDescription,
      alternates: {
        canonical: `${BASE_URL}/${svc.slug}/locations/${city}`,
      },
      openGraph: {
        title: subPage.metaTitle,
        description: subPage.metaDescription,
        url: `${BASE_URL}/${svc.slug}/locations/${city}`,
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: subPage.metaTitle,
        description: subPage.metaDescription,
      },
    };
  }

  // Generic city page
  const location = getLocationByCitySlug(getLocationCitySlug(services, city));
  const canonicalCity = getCanonicalCitySlug(services, city);

  if (!location) {
    // Prefixed slugs like "seo-services-austin" are not real pages — they
    // redirect to the bare city page (see Page below). Emit the target's
    // canonical so the redirect chain stays clean for crawlers.
    const resolvedCity = resolvePrefixedCitySlug(city);
    if (resolvedCity) {
      const canonical = `${BASE_URL}/${svc.slug}/locations/${resolvedCity}`;
      return {
        alternates: { canonical },
        openGraph: { url: canonical, type: "website" },
      };
    }
    return {};
  }

  const title = ` ${location.metaTitle} `;
  const description =
    location.metaDescription ||
    `Looking for ${svc.name.toLowerCase()} in ${location.name}? Clickmasters delivers data-driven ${svc.short.toLowerCase()} for ${location.name} businesses. Book your free strategy call.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${svc.slug}/locations/${canonicalCity}`,
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${svc.slug}/locations/${canonicalCity}`,
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
  const svc = getMainService(services);

  // Custom sub page (e.g. the Atlanta SEO page)
  const subPage =
    services === "search-engine-optimization" ? getSubPageBySlug(city) : undefined;
  if (subPage) {
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          name: `${subPage.cityDisplay} ${svc.title}`,
          serviceType: svc.title,
          provider: {
            "@type": "Organization",
            name: "Clickmasters Digital Marketing",
            url: BASE_URL,
          },
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
      </>
    );
  }

  const canonicalCity = getCanonicalCitySlug(services, city);
  if (canonicalCity !== city) {
    permanentRedirect(`/${services}/locations/${canonicalCity}`);
  }

  const location = getLocationByCitySlug(getLocationCitySlug(services, city));

  if (!location) {
    // e.g. /search-engine-optimization/locations/seo-services-austin
    //   -> 301-style redirect to /search-engine-optimization/locations/austin
    const resolvedCity = resolvePrefixedCitySlug(city);
    if (resolvedCity && resolvedCity !== city) {
      permanentRedirect(`/${svc.slug}/locations/${resolvedCity}`);
    }
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
        provider: {
          "@type": "Organization",
          name: "Clickmasters Digital Marketing",
          url: BASE_URL,
        },
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
    </>
  );
}
