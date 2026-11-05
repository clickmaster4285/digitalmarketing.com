// src/app/locations/page.tsx

import { locations } from "@/content/locations/locationPagesData";
import { getLocationPageHref } from "@/content/locations/serviceLocations";
import Link from "next/link";
import { Globe, ArrowRight, MapPin } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Locations | Clickmasters Digital Marketing Agency",
  description:
    "Explore Clickmasters' digital marketing services across the United States, including Boston, Atlanta, New York, Dallas, Houston, and Chicago.",
  alternates: {
    canonical: "/locations",
  },
};

export default function LocationsPage() {
  const uniqueLocations = Array.from(
    new Map(locations.map((location) => [location.slug, location])).values(),
  );

  return (
    <main className="min-h-screen pt-32 pb-20 bg-background">
      {/* Grain overlay */}
      <div className="grain fixed inset-0 pointer-events-none z-0" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Our Presence
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-foreground">
            Digital Marketing Agency Locations
          </h1>
          <p className="text-lg text-muted-foreground">
            We serve businesses across the United States with local expertise, 
            tailored strategies, and a commitment to measurable growth.
          </p>
        </div>

        {/* Location Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {uniqueLocations.map((location) => (
            <Link
              key={location.slug}
              href={getLocationPageHref(location)}
              className="group p-6 rounded-2xl border border-border bg-background hover:border-primary/30 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-display font-semibold text-foreground">
                    {location.name}
                  </h2>
                  <p className="text-xs text-muted-foreground">{location.state}</p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                {location.hero.subheading}
              </p>
              <div className="mt-4 flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                Learn More
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
  
        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="max-w-2xl mx-auto p-10 rounded-3xl border border-border bg-muted/20">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-3 text-foreground">
              Not in Your City?
            </h2>
            <p className="text-muted-foreground mb-6">
              We work with businesses nationwide. Even if we don't have a physical 
              location in your city, we can still help you grow.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-all hover:scale-105"
            >
              Contact Us Today
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}