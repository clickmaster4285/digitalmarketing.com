import Link from "next/link";
import {
  getLocationPageHref,
} from "@/content/locations/serviceLocations";
import { locations, type LocationData } from "@/content/locations/locationPagesData";

export const stateRegions: Record<string, readonly string[]> = {
  Northeast: ["CT", "ME", "MA", "NH", "RI", "VT", "NJ", "NY", "PA"],
  Midwest: ["IL", "IN", "MI", "OH", "WI", "IA", "KS", "MN", "MO", "NE", "ND", "SD"],
  South: ["AL", "AR", "DE", "FL", "GA", "KY", "LA", "MD", "MS", "NC", "OK", "SC", "TN", "TX", "VA", "WV"],
  West: ["AK", "AZ", "CA", "CO", "HI", "ID", "MT", "NV", "NM", "OR", "UT", "WA", "WY"],
};

export default function RegionalLocations({
  current,
}: {
  current: LocationData;
}) {
  const region = Object.entries(stateRegions).find(([, states]) =>
    states.includes(current.state),
  )?.[0];
  const states = region ? stateRegions[region] : [current.state];
  const relatedLocations = Array.from(
    new Map(
      locations
        .filter(
          (location) =>
            location.slug !== current.slug && states.includes(location.state),
        )
        .map((location) => [location.slug, location]),
    ).values(),
  ).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <section
      data-location-region-links
      className="bg-background px-5 py-16 text-foreground sm:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-3xl font-semibold">
          Explore more {region ? `${region} region` : current.state} locations
        </h2>
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
          {relatedLocations.map((location) => (
            <li key={location.slug}>
              <Link
                href={getLocationPageHref(location)}
                className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                {location.name}, {location.state}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/locations"
              className="text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              View all locations
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
