import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { SERVICE_CATEGORIES } from "@/content/services/serviceCategories";
import {
  MAIN_SERVICES,
  SERVICES_WITH_CITY_PAGES,
} from "@/content/locations/serviceLocations";
import { applyEditedPageSeo } from "@/lib/pageEdits.server";

const metadata: Metadata = {
  title: "Digital Marketing Services Directory | Clickmasters",
  description:
    "Browse Clickmasters digital marketing, development, and optimization services by category, with links to every service page.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesDirectoryPage() {
  return (
    <main className="min-h-screen bg-background px-5 pb-24 pt-32 text-foreground sm:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-14 max-w-3xl">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-primary">
            Services directory
          </p>
          <h1 className="font-display text-5xl font-bold leading-tight md:text-7xl">
            Explore our services
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Browse our service categories and visit the page for any individual
            service.
          </p>
        </header>

        <div className="space-y-14">
          {SERVICE_CATEGORIES.map((category) => (
            <section
              key={category.href}
              aria-labelledby={`services-${category.href.slice(1)}`}
            >
              <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3 border-b border-border pb-4">
                <h2
                  id={`services-${category.href.slice(1)}`}
                  className="font-display text-3xl font-semibold md:text-4xl"
                >
                  <Link href={category.href} className="transition-colors hover:text-primary">
                    {category.title}
                  </Link>
                </h2>
                <Link
                  href={category.href}
                  className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  View category
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
              <ul
                data-service-category={category.href}
                className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
              >
                {category.items.map((service) => (
                  <li key={service.href}>
                    <Link
                      href={service.href}
                      className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
                    >
                      <span className="font-medium group-hover:text-primary">
                        {service.name}
                      </span>
                      <span className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {service.desc}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <section aria-labelledby="services-by-city" className="mt-14">
          <h2
            id="services-by-city"
            className="mb-6 border-b border-border pb-4 font-display text-3xl font-semibold md:text-4xl"
          >
            Services by city
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES_WITH_CITY_PAGES.map((slug) => (
              <li key={slug}>
                <Link
                  href={`/${slug}/locations`}
                  className="group flex h-full items-center justify-between rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
                >
                  <span className="font-medium group-hover:text-primary">
                    {MAIN_SERVICES[slug].name} locations
                  </span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/locations"
                className="group flex h-full items-center justify-between rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
              >
                <span className="font-medium group-hover:text-primary">
                  Digital marketing locations
                </span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return applyEditedPageSeo("/services", metadata);
}
