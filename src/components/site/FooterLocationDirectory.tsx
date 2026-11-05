import Link from "next/link";
import { locations } from "@/content/locations/locationPagesData";
import { getLocationPageHref } from "@/content/locations/serviceLocations";

export default function FooterLocationDirectory() {
  const uniqueLocations = Array.from(
    new Map(locations.map((location) => [location.slug, location])).values(),
  ).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <nav
      className="footer-item border-t border-neutral-800/80 py-8"
      aria-label="Service locations"
    >
      <details>
        <summary className="cursor-pointer text-sm font-medium text-neutral-300 hover:text-white">
          Browse all {uniqueLocations.length} service locations
        </summary>
        <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {uniqueLocations.map((location) => (
            <li key={location.slug}>
              <Link
                href={getLocationPageHref(location)}
                className="text-sm text-neutral-500 transition-colors hover:text-white"
              >
                {location.name}, {location.state}
              </Link>
            </li>
          ))}
        </ul>
      </details>
    </nav>
  );
}
