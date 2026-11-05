// Server-rendered cross-links for /{service}/locations/{city} pages: the same
// service in other cities of the region, and other services in this city.
import Link from "next/link";
import type { LocationData } from "@/content/locations/locationPagesData";
import {
  MAIN_SERVICES,
  SERVICE_SUB_LOCATIONS,
  SERVICES_WITH_CITY_PAGES,
  citySlugOf,
  getLocationPageHref,
  getServiceCityUrlSlug,
  uniqueCityLocations,
} from "@/content/locations/serviceLocations";
import { stateRegions } from "@/components/locations/RegionalLocations";

const cityHref = (serviceSlug: string, location: LocationData) =>
  `/${serviceSlug}/locations/${getServiceCityUrlSlug(serviceSlug, citySlugOf(location))}`;

export default function ServiceCityCrossLinks({
  serviceSlug,
  current,
}: {
  serviceSlug: string;
  current: LocationData;
}) {
  if (!SERVICES_WITH_CITY_PAGES.includes(serviceSlug)) return null;
  const service = MAIN_SERVICES[serviceSlug];
  const currentCity = citySlugOf(current);

  const region = Object.entries(stateRegions).find(([, states]) =>
    states.includes(current.state),
  )?.[0];
  const regionStates = region ? stateRegions[region] : [current.state];
  const nearby = new Map<string, { href: string; city: string; state: string }>();
  for (const location of uniqueCityLocations()) {
    if (citySlugOf(location) === currentCity || !regionStates.includes(location.state)) continue;
    const href = cityHref(serviceSlug, location);
    nearby.set(href, { href, city: location.name, state: location.state });
  }
  // Hand-built sub-pages (e.g. SEO Greenville) that are not in the city dataset.
  for (const sub of SERVICE_SUB_LOCATIONS[serviceSlug] ?? []) {
    const href = `/${serviceSlug}/locations/${sub.slug}`;
    if (sub.city === current.name || !regionStates.includes(sub.state) || nearby.has(href)) continue;
    nearby.set(href, { href, city: sub.city, state: sub.state });
  }
  const nearbyLinks = [...nearby.values()].sort((a, b) => a.city.localeCompare(b.city));

  const otherServices = SERVICES_WITH_CITY_PAGES.filter(
    (slug) => slug !== serviceSlug,
  ).map((slug) => MAIN_SERVICES[slug]);

  const linkClass =
    "text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline";

  return (
    <section
      data-service-city-links
      className="bg-background px-5 py-16 text-foreground sm:px-8"
    >
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl font-semibold">
            {service.name} in nearby cities
          </h2>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
            {nearbyLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {service.name} in {link.city}, {link.state}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={`/${serviceSlug}/locations`}
                className="text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                All {service.name} locations
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="font-display text-3xl font-semibold">
            More services in {current.name}
          </h2>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
            {otherServices.map((other) => (
              <li key={other.slug}>
                <Link href={cityHref(other.slug, current)} className={linkClass}>
                  {other.name} in {current.name}, {current.state}
                </Link>
              </li>
            ))}
            <li>
              <Link href={getLocationPageHref(current)} className={linkClass}>
                Digital marketing in {current.name}, {current.state}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
