// src/content/locations/serviceLocations.ts
//
// Shared data layer for the service-level location pages:
//   /{main-service}/locations           -> "Service Locations" hub page
//   /{main-service}/locations/{city}    -> Service page for one city
//
// The 9 main services below mirror the contentMap used in
// src/app/[services]/page.tsx and src/app/[services]/layout.tsx so the
// location pages always stay in sync with the main service routes.

import { locations, type LocationData } from "./locationPagesData";

export interface MainServiceInfo {
  slug: string;
  /** Nav label, e.g. "SEO Services" */
  name: string;
  /** Short badge label, e.g. "SEO" */
  short: string;
  /** Hero title, e.g. "Search Engine Optimization" */
  title: string;
  /** Pink highlight line in the hero */
  highlight: string;
  /** One-liner used under the hero title */
  blurb: string;
}
  
export const MAIN_SERVICES: Record<string, MainServiceInfo> = {
  "search-engine-optimization": {
    slug: "search-engine-optimization",
    name: "SEO Services",
    short: "SEO",
    title: "Search Engine Optimization",
    highlight: "in every city we serve.",
    blurb:
      "One playbook, every zip code. We take our proven SEO system — technical fixes, content built on real search intent, and authority link building — and roll it out city by city so you rank where your customers actually search.",
  },
  "pay-per-click": {
    slug: "pay-per-click",
    name: "Pay Per Click",
    short: "PPC",
    title: "Pay Per Click Management",
    highlight: "everywhere your buyers are.",
    blurb:
      "Google Ads, paid social, and remarketing campaigns managed against cost-per-lead and return on ad spend — launched and optimized locally in every market we cover.",
  },
  "social-media-marketing": {
    slug: "social-media-marketing",
    name: "Social Media Marketing",
    short: "Social",
    title: "Social Media Marketing",
    highlight: "in every local market.",
    blurb:
      "Consistent content, community management, and paid social campaigns that make your brand recognizable in each city — not just on a national dashboard.",
  },
  "mobile-app-development": {
    slug: "mobile-app-development",
    name: "Mobile App Development",
    short: "Apps",
    title: "Mobile App Development",
    highlight: "for every market you launch in.",
    blurb:
      "iOS, Android, and cross-platform apps designed, built, and shipped with launch-market research baked in — so your product lands well in every city you target.",
  },
  "conversion-rate-optimization": {
    slug: "conversion-rate-optimization",
    name: "CRO",
    short: "CRO",
    title: "Conversion Rate Optimization",
    highlight: "tested market by market.",
    blurb:
      "Traffic behaves differently in every city. We test messaging, layouts, and offers per market so your conversion rate climbs where it matters — locally.",
  },
  "content-marketing": {
    slug: "content-marketing",
    name: "Content Marketing",
    short: "Content",
    title: "Content Marketing",
    highlight: "localized in every city.",
    blurb:
      "Content planned around the real questions customers ask in each market — service pages, local guides, and articles that build authority city by city.",
  },
  "ecommerce-services": {
    slug: "ecommerce-services",
    name: "Ecommerce",
    short: "Ecommerce",
    title: "Ecommerce Services",
    highlight: "selling in every region.",
    blurb:
      "Store builds, feed management, and full-funnel ecommerce marketing tuned for the regions where your customers live — from first click to repeat purchase.",
  },
  "ai-automation": {
    slug: "ai-automation",
    name: "AI Automation",
    short: "AI",
    title: "AI Automation",
    highlight: "working in every timezone.",
    blurb:
      "AI lead qualification, follow-up sequences, and workflow automation that respond to every lead in minutes — no matter which city they come from.",
  },
  "web-design-development": {
    slug: "web-design-development",
    name: "Web Design & Development",
    short: "Web",
    title: "Web Design & Development",
    highlight: "built for every market.",
    blurb:
      "Fast, mobile-first, conversion-focused websites with the local structure search engines reward — designed once, scaled across every city you serve.",
  },
};

export const getMainService = (slug?: string | null): MainServiceInfo =>
  MAIN_SERVICES[slug ?? ""] ?? MAIN_SERVICES["search-engine-optimization"];

/** Location slugs look like "digital-marketing-agency-boston" -> "boston" */
const CITY_SLUG_PREFIX = "digital-marketing-agency-";

export const citySlugOf = (loc: LocationData): string =>
  loc.slug.startsWith(CITY_SLUG_PREFIX)
    ? loc.slug.slice(CITY_SLUG_PREFIX.length)
    : loc.slug.startsWith("seo-services-")
      ? loc.slug.slice("seo-services-".length)
      : loc.slug;

/** All locations deduped by city, keeping the freshest entry of each. */
export const uniqueCityLocations = (): LocationData[] => {
  const map = new Map<string, LocationData>();
  for (const loc of locations) {
    const key = citySlugOf(loc);
    const existing = map.get(key);
    // Later entries in the data file win (they are the most recent revision)
    map.set(key, existing ? { ...existing, ...loc } : loc);
  }
  return Array.from(map.values());
};

export const getLocationByCitySlug = (
  citySlug: string
): LocationData | undefined =>
  uniqueCityLocations().find((loc) => citySlugOf(loc) === citySlug);

export const getAllCitySlugs = (): string[] =>
  uniqueCityLocations().map(citySlugOf);

/**
 * Resolves a possibly-prefixed city slug (e.g. "seo-services-austin",
 * "local-seo-services-austin") to its bare city slug ("austin").
 * Returns the input unchanged when it is already a valid bare city slug,
 * and undefined when no known city matches.
 */
export const resolvePrefixedCitySlug = (input: string): string | undefined => {
  if (getLocationByCitySlug(input)) return input;
  const matches = getAllCitySlugs().filter((city) => input.endsWith(`-${city}`));
  // Longest suffix wins, e.g. "oklahoma-city" over "city"
  return matches.sort((a, b) => b.length - a.length)[0];
};

/**
 * The N most recently added cities. New location entries are appended to the
 * end of `locations` in locationPagesData.ts, so the tail of the (deduped)
 * list is always the latest batch — these are the cards shown on the hub page.
 */
export const getLatestCityLocations = (count = 9): LocationData[] => {
  const seen = new Set<string>();
  const result: LocationData[] = [];
  for (let i = locations.length - 1; i >= 0 && result.length < count; i--) {
    const key = citySlugOf(locations[i]);
    if (seen.has(key)) continue;
    seen.add(key);
    result.unshift(locations[i]);
  }
  return result;
};

/** Total number of distinct cities we cover (for stats/labels). */
export const getTotalCityCount = (): number => uniqueCityLocations().length;

/* ------------------------------------------------------------------ */
/*  Manually managed sub-location pages: /{service}/locations/{slug}   */
/* ------------------------------------------------------------------ */

export interface ServiceSubLocation {
  /** URL slug -> /{service}/locations/{slug} */
  slug: string;
  /** City name shown on the card, e.g. "Cincinnati" */
  city: string;
  /** State code shown on the card badge, e.g. "OH" */
  state: string;
  /** Short card description (2–3 lines) */
  description: string;
}

/**
 * LIVE sub-location pages per main service slug.
 *
 * Currently EMPTY on purpose — the real sub pages under
 * /{service}/locations/____ haven't been published yet, so the
 * "Latest locations" section on the hub page renders nothing at all.
 *
 * When a new sub page goes live, append an entry to that service's array:
 *
 *   "search-engine-optimization": [
 *     {
 *       slug: "cincinnati",   // -> /search-engine-optimization/locations/cincinnati
 *       city: "Cincinnati",
 *       state: "OH",
 *       description: "One or two lines about this city page…",
 *     },
 *   ],
 *
 * New entries always go at the END of the array — the hub shows the last 9
 * (newest first) automatically. Nothing else needs to be touched.
 */
export const SERVICE_SUB_LOCATIONS: Record<string, ServiceSubLocation[]> = {
  "search-engine-optimization": [
    {
      slug: "seo-services-atlanta",
      city: "Atlanta",
      state: "GA",
      description:
        "Professional SEO services in Atlanta — local SEO, full SEO programs, technical SEO, and consulting that help small businesses, law firms, and ecommerce brands get found across metro Atlanta.",
    },
    {
      slug: "seo-services-baltimore",
      city: "Baltimore",
      state: "MD",
      description:
        "Results-driven Baltimore SEO services — local SEO, technical audits, content strategy, and consulting that help Baltimore and Maryland businesses rank higher and turn searches into customers.",
    },
    {
      slug: "seo-services-birmingham",
      city: "Birmingham",
      state: "AL",
      description:
        "Birmingham SEO company built around how this metro searches — local SEO, technical audits, and suburb-specific strategy for businesses from the city to the Over the Mountain suburbs.",
    },
    {
      slug: "seo-services-boise",
      city: "Boise",
      state: "ID",
      description:
        "Expert SEO services in Boise — keyword research, on-page and technical SEO, local SEO, content, and link building that help Idaho businesses grow traffic, leads, and sales.",
    },
    {
      slug: "seo-services-boston",
      city: "Boston",
      state: "MA",
      description:
        "Proven Boston SEO services — strategy, on-page and technical SEO, local SEO, content, link building, and AI search visibility that help Greater Boston businesses grow their search visibility.",
    },
    {
      slug: "seo-services-charlotte",
      city: "Charlotte",
      state: "NC",
      description:
        "Expert Charlotte SEO services — keyword research, on-page and technical SEO, local SEO, content, and link building that help Charlotte businesses get found by more customers.",
    },
    {
      slug: "seo-services-greenville",
      city: "Greenville",
      state: "SC",
      description:
        "Greenville SEO services built on data, not guesswork — local SEO, technical SEO, content strategy, and consulting that help Greenville and Upstate South Carolina businesses rank higher and turn search traffic into customers.",
    },
    {
      slug: "seo-services-huntsville",
      city: "Huntsville",
      state: "AL",
      description:
        "SEO services in Huntsville built around real local search behavior — local SEO, website SEO, content strategy, and SEM that help Huntsville and North Alabama businesses get found and generate consistent organic leads.",
    },
    {
      slug: "seo-services-indianapolis",
      city: "Indianapolis",
      state: "IN",
      description:
        "Full-service Indianapolis SEO agency — technical audits, on-page and content optimization, local SEO, link building, and ecommerce SEO that help Indy businesses rank higher and turn traffic into customers.",
    },
    {
      slug: "seo-services-louisville",
      city: "Louisville",
      state: "KY",
      description:
        "Results-driven Louisville SEO services — technical SEO, local SEO and Google Business Profile optimization, content, and link building that help Louisville businesses rank higher and turn searches into real opportunities.",
    },
    {
      slug: "seo-services-knoxville",
      city: "Knoxville",
      state: "TN",
      description:
        "Knoxville SEO agency focused on what your customers actually search — technical fixes, local optimization, and content that ranks, helping East Tennessee businesses grow sustainable organic traffic.",
    },
    {
      slug: "seo-services-memphis",
      city: "Memphis",
      state: "TN",
      description:
        "Memphis SEO company built to turn Google searches into real customers — technical SEO, local SEO, AI search optimization, and transparent reporting for Memphis businesses.",
    },
    {
      slug: "seo-services-oklahoma-city",
      city: "Oklahoma City",
      state: "OK",
      description:
        "Results-driven SEO services in Oklahoma City — technical SEO, local SEO, content strategy, and AI search optimization that improve rankings and generate more qualified leads.",
    },
    {
      slug: "seo-services-tulsa",
      city: "Tulsa",
      state: "OK",
      description:
        "Professional SEO services Tulsa — local SEO, technical SEO, content, and link building that help Tulsa businesses strengthen search visibility, improve rankings, and generate more opportunities.",
    },
    {
      slug: "seo-services-wichita",
      city: "Wichita",
      state: "KS",
      description:
        "SEO services in Wichita — local SEO, technical SEO, content strategy, and link building that help Wichita businesses grow traffic, rankings, and leads.",
    },
    {
      slug: "seo-services-st-louis",
      city: "St. Louis",
      state: "MO",
      description:
        "SEO services in St. Louis — local SEO, technical SEO, content optimization, and authority building that turn St. Louis search traffic into qualified leads.",
    },
    {
      slug: "seo-services-san-jose",
      city: "San Jose",
      state: "CA",
      description:
        "San Jose SEO services — local SEO, technical SEO, and AI-search-ready strategies that help San Jose and Silicon Valley businesses turn search visibility into real revenue.",
    },
    {
      slug: "seo-services-pittsburgh",
      city: "Pittsburgh",
      state: "PA",
      description:
        "Search engine optimization in Pittsburgh, PA — technical audits, local SEO, content strategy, and link building that build rankings, traffic, and real revenue.",
    },
    {
      slug: "seo-services-minneapolis",
      city: "Minneapolis",
      state: "MN",
      description:
        "SEO services in Minneapolis — local SEO, technical SEO, content, and authority building that help Twin Cities businesses rank higher and turn searches into customers.",
    },
    {
      slug: "seo-services-new-orleans",
      city: "New Orleans",
      state: "LA",
      description:
        "SEO services in New Orleans — local visibility, technical fixes, and content that converts, built around how customers search across the city.",
    },
    {
      slug: "seo-services-sacramento",
      city: "Sacramento",
      state: "CA",
      description:
        "SEO services in Sacramento — local SEO, technical SEO, content, and AI-search readiness that improve rankings and turn everyday searches into real leads.",
    },
    {
      slug: "seo-services-portland",
      city: "Portland",
      state: "OR",
      description:
        "SEO services in Portland — local visibility, technical fixes, and content that converts, built around how Portland businesses get found and grow.",
    },
    {
      slug: "seo-services-salt-lake-city",
      city: "Salt Lake City",
      state: "UT",
      description:
        "SEO services in Salt Lake City — technical SEO, local SEO, content, and authority building that turn search traffic into real customers across the Wasatch Front.",
    },
    {
      slug: "seo-services-houston",
      city: "Houston",
      state: "TX",
      description:
        "SEO services in Houston — technical SEO, local SEO, content, and AI search readiness that grow online visibility, qualified leads, and conversions.",
    },
    {
      slug: "seo-services-jacksonville",
      city: "Jacksonville",
      state: "FL",
      description:
        "SEO services in Jacksonville — local SEO, technical SEO, content, and authority building that turn Google searches into real customers across the city.",
    },
    {
      slug: "seo-services-kansas-city",
      city: "Kansas City",
      state: "MO",
      description:
        "SEO services in Kansas City that turn rankings into revenue with local visibility, technical fixes, content, and qualified lead generation.",
    },
    {
      slug: "seo-services-las-vegas",
      city: "Las Vegas",
      state: "NV",
      description:
        "SEO services in Las Vegas built around local visibility, technical fixes, content, backlinks, and measurable lead growth.",
    },
    {
      slug: "seo-services-los-angeles",
      city: "Los Angeles",
      state: "CA",
      description:
        "SEO services in Los Angeles built around your business, local visibility, qualified traffic, leads, and long-term organic growth.",
    },
    {
      slug: "seo-services-miami",
      city: "Miami",
      state: "FL",
      description:
        "Your customers in Miami are searching Google right now — the question is whether they're finding you or a competitor.",
    },
    {
      slug: "seo-services-nashville",
      city: "Nashville",
      state: "TN",
      description:
        "SEO Services Nashville, TN  Get Found, Get Leads, Get Growth",
    },
    {
      slug: "seo-services-new-york",
      city: "New York",
      state: "NY",
      description:
        "Your customers in New York are searching Google right now — the question is whether they're finding you or a competitor across town.",
    },
    {
      slug: "seo-services-phoenix",
      city: "Phoenix",
      state: "AZ",
      description:
        "SEO services in Phoenix — local SEO, technical optimization, and search strategies that help Valley businesses improve visibility and generate qualified leads.",
    },
    {
      slug: "seo-services-seattle",
      city: "Seattle",
      state: "WA",
      description:
        "SEO services in Seattle — technical SEO, local search strategy, and content that helps Seattle businesses attract qualified traffic and grow.",
    },
    {
      slug: "seo-services-tampa",
      city: "Tampa",
      state: "FL",
      description:
        "SEO services in Tampa — local SEO, technical optimization, and search strategies that help Tampa businesses earn more traffic and qualified leads.",
    },
      {
      slug: "seo-services-richmond",
      city: "Richmond",
      state: "VA",
      description:
        "SEO services in Richmond — local SEO, technical optimization, and search strategies that help Richmond businesses earn more traffic and qualified leads.",
    },
  ],
};

/** Latest N sub-location entries for a service (newest first). */
export const getLatestServiceSubLocations = (
  serviceSlug: string,
  limit = 9
): ServiceSubLocation[] => {
  const all = SERVICE_SUB_LOCATIONS[serviceSlug] ?? [];
  return all.slice(Math.max(0, all.length - limit)).reverse();
};
