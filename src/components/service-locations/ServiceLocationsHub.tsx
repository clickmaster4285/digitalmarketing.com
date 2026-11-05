"use client";

// src/components/service-locations/ServiceLocationsHub.tsx
// UI for /{main-service}/locations — the "service locations" hub page.
// Layout + styling follow the design system of the main service pages.

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  MapPin,
  Crosshair,
  Star,
  Gauge,
  Link2,
  LineChart,
  Search,
  PenTool,
  PhoneCall,
  Globe2,
} from "lucide-react";

import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { Reveal, SectionLabel, LatestLocationsGrid } from "./shared";
import type {
  MainServiceInfo,
  ServiceSubLocation,
} from "@/content/locations/serviceLocations";

/* ---------------- Static copy ---------------- */

const WHY_CITY_PAGES = [
  {
    icon: Crosshair,
    t: "Local intent converts",
    d: "Searches with a city in them come from people ready to buy. We position you exactly where that intent happens instead of hoping national pages rank locally.",
  },
  {
    icon: MapPin,
    t: "Maps & pack visibility",
    d: "The Google Map Pack drives a huge share of local clicks. City-level optimization is what gets your business into that three-pack in each market.",
  },
  {
    icon: Star,
    t: "Proximity builds trust",
    d: "Customers pick businesses that feel local. Location pages let us speak to each city's neighborhoods, landmarks, and market realities — not generic filler.",
  },
  {
    icon: Gauge,
    t: "Faster journeys",
    d: "Visitors land on a page that already speaks their city's language, so they call, book, or buy sooner. Shorter path, higher conversion rate.",
  },
  {
    icon: Link2,
    t: "Cleaner attribution",
    d: "City-level landing pages make reporting honest. You see exactly which market produced which lead, call, or sale — and where to invest next.",
  },
  {
    icon: LineChart,
    t: "Authority compounds",
    d: "Every localized page strengthens the next one. Rankings, reviews, and citations stack across markets until your brand owns the map.",
  },
];

const WHATS_INCLUDED = [
  {
    icon: Search,
    t: "City keyword mapping",
    d: "We map the real search demand in each city — service + city terms, near-me queries, and neighborhood modifiers — before a single page is written.",
  },
  {
    icon: PenTool,
    t: "Location landing pages",
    d: "Original, useful pages per city: local proof, service details, FAQs, and clear next steps. No copy-paste templates that search engines ignore.",
  },
  {
    icon: MapPin,
    t: "Google Business Profile",
    d: "Profile categories, services, photos, posts, and Q&A tuned per location so Maps sends you calls, not just views.",
  },
  {
    icon: Globe2,
    t: "Citations & directories",
    d: "Consistent name, address, and phone data across the directories that matter in each market — the foundation of local rankings.",
  },
  {
    icon: PhoneCall,
    t: "Local ads & call tracking",
    d: "Geo-targeted campaigns with per-city tracking numbers, so paid spend and organic growth are both measurable market by market.",
  },
  {
    icon: LineChart,
    t: "Market-level reporting",
    d: "One dashboard, every city. Rankings, calls, forms, and cost per lead broken out by location so scaling decisions are obvious.",
  },
];

const ROLLOUT = [
  {
    when: "Week 1",
    t: "Market research",
    d: "We audit search demand, competitors, and the review landscape in the target city and lock the keyword map.",
  },
  {
    when: "Week 2",
    t: "Assets & profiles",
    d: "Landing page built, Google Business Profile tuned, citations submitted, and tracking numbers wired up.",
  },
  {
    when: "Weeks 3–4",
    t: "Launch",
    d: "Page goes live, local ads start, and the first review-generation push begins in that market.",
  },
  {
    when: "Monthly",
    t: "Optimize & report",
    d: "Rankings, calls, and leads reviewed per city. Winners get more budget; weak spots get fixed.",
  },
];

const FAQS = [
  {
    q: "Do you actually work in every city listed here?",
    a: "Yes. These pages represent markets where we actively run client programs — with local keyword targeting, location landing pages, and market-level reporting. If your city isn't listed yet, we can usually add it within days.",
  },
  {
    q: "How is a city page different from a generic service page?",
    a: "A generic service page competes nationally. A city page targets searches like “service + city” with locally relevant content, proof, and schema — which is what wins the Map Pack and local organic results.",
  },
  {
    q: "How fast will I see results in my market?",
    a: "Paid campaigns can generate leads within the first week. Local SEO typically shows meaningful movement in 60–90 days, depending on competition in your city and the current state of your profiles and website.",
  },
  {
    q: "Can you serve multiple cities at once?",
    a: "That's exactly what this system is built for. We roll out markets in batches, share learnings between cities, and report everything in one dashboard so you always know which market deserves the next dollar.",
  },
  {
    q: "What do you need from me to launch a new location?",
    a: "Mostly access and approvals: your Google Business Profile, website access, and a short intake call. We handle research, copy, design, tracking, and launch from there.",
  },
];

/* ---------------- Sections ---------------- */

const Hero = ({
  service,
  cityCount,
  subCount,
}: {
  service: MainServiceInfo;
  cityCount: number;
  subCount: number;
}) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[92vh] overflow-hidden bg-[#0a0a0a] text-white pt-36 pb-24 flex items-center"
    >
      <motion.div
        aria-hidden
        style={{ y: y1 }}
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </motion.div>

      <motion.div
        aria-hidden
        style={{ y: y2 }}
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full blur-[180px] opacity-30 pointer-events-none"
      >
        <div className="w-full h-full rounded-full bg-[#FF2E86]" />
      </motion.div>

      <motion.div style={{ opacity }} className="container relative">
        <Reveal>
          <nav
            aria-label="Breadcrumb"
            className="text-[10px] uppercase tracking-[0.4em] opacity-60 mb-8"
          >
            <Link href="/" className="hover:opacity-100 transition-opacity">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link
              href={`/${service.slug}`}
              className="hover:opacity-100 transition-opacity"
            >
              {service.name}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[#FF2E86]">Locations</span>
          </nav>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="text-[10px] uppercase tracking-[0.4em] opacity-60 mb-6">
            [ {service.short} · Locations ]
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <h1 className="font-display text-5xl md:text-8xl font-bold leading-[0.95] tracking-tight max-w-5xl">
            {service.title} <br />
            <span className="text-[#FF2E86]">{service.highlight}</span>
          </h1>
        </Reveal>

        <Reveal delay={0.28}>
          <p className="mt-10 max-w-2xl text-lg md:text-xl opacity-70 leading-relaxed">
            {service.blurb}
            {subCount > 0 && (
              <>
                {" "}Below you'll find our newest city programs — {subCount}{" "}
                fresh markets from a network of {cityCount}+ we already serve.
              </>
            )}
          </p>
        </Reveal>

        <Reveal delay={0.38}>
          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 bg-white text-black px-7 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:bg-[#FF2E86] hover:text-white transition-colors"
            >
              Free consultation
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/locations"
              className="inline-flex items-center gap-3 border border-white/20 px-7 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:border-[#FF2E86] hover:text-[#FF2E86] transition-colors"
            >
              <MapPin className="w-4 h-4" />
              All locations
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.5}>
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 pt-10">
            {[
              { k: `${cityCount}+`, v: "Cities served" },
              { k: "9", v: "Core services" },
              { k: "500+", v: "Clients nationwide" },
              { k: "10+", v: "Years of growth" },
            ].map((s) => (
              <div key={s.v}>
                <p className="font-display text-3xl md:text-5xl">{s.k}</p>
                <p className="text-[10px] uppercase tracking-[0.3em] opacity-60 mt-2">
                  {s.v}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </motion.div>
    </section>
  );
};

/* ---------------- Light intro statement ---------------- */

const LocalEdge = ({ cityCount }: { cityCount: number }) => (
  <section className="relative bg-background text-foreground py-28">
    <div className="container max-w-5xl">
      <SectionLabel n="01" t="The local edge" />
      <Reveal>
        <p className="font-display text-3xl md:text-5xl leading-[1.15] tracking-tight">
          National rankings look nice in a report.{" "}
          <span className="text-[#FF2E86]">Local leads pay the bills.</span>
        </p>
      </Reveal>
      <Reveal delay={0.15}>
        <p className="mt-10 text-lg opacity-70 max-w-3xl leading-relaxed">
          Your next customer isn't searching for "the best company in America."
          They're searching for a company in their city that can actually show
          up. That's why we run {cityCount}+ dedicated city programs — each one
          built around the searches, neighborhoods, and buying habits of that
          specific market.
        </p>
      </Reveal>
      <Reveal delay={0.25}>
        <p className="mt-6 text-lg opacity-70 max-w-3xl leading-relaxed">
          The result: you stop competing with everyone, everywhere, and start
          winning the markets that are actually close enough to buy from you.
        </p>
      </Reveal>
    </div>
  </section>
);

/* ---------------- Why city pages win (dark) ---------------- */

const WhyCityPages = () => (
  <section className="relative bg-[#0a0a0a] text-white py-24 overflow-hidden">
    <div
      aria-hidden
      className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#FF2E86]/10 blur-[160px] pointer-events-none"
    />
    <div className="container max-w-6xl relative">
      <SectionLabel n="02" t="Why it works" />
      <Reveal>
        <h2 className="font-display text-4xl md:text-7xl font-bold leading-[0.95] tracking-tight mb-12 max-w-4xl">
          Why city-level programs{" "}
          <span className="text-[#FF2E86]">outperform generic ones.</span>
        </h2>
      </Reveal>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {WHY_CITY_PAGES.map((item, idx) => (
          <Reveal key={item.t} delay={idx * 0.08}>
            <div className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-8 hover:border-[#FF2E86]/40 transition group">
              <span className="grid place-items-center w-12 h-12 rounded-2xl bg-[#FF2E86]/10 text-[#FF2E86] mb-6 transition-transform duration-300 group-hover:scale-110">
                <item.icon className="w-6 h-6" />
              </span>
              <h3 className="font-display text-2xl mb-3">{item.t}</h3>
              <p className="text-sm md:text-base opacity-70 leading-relaxed">
                {item.d}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ---------------- What's included (light) ---------------- */

const WhatsIncluded = () => (
  <section className="relative bg-background text-foreground py-24">
    <div className="container max-w-6xl">
      <SectionLabel n="03" t="What's included" />
      <Reveal>
        <h2 className="font-display text-4xl md:text-7xl font-bold leading-[0.95] tracking-tight mb-12 max-w-4xl">
          Everything every city gets.{" "}
          <span className="text-[#FF2E86]">No exceptions.</span>
        </h2>
      </Reveal>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {WHATS_INCLUDED.map((item, idx) => (
          <Reveal key={item.t} delay={idx * 0.08}>
            <div className="h-full rounded-3xl border border-foreground/10 bg-foreground/[0.02] p-8 hover:border-[#FF2E86]/40 transition">
              <span className="grid place-items-center w-12 h-12 rounded-2xl bg-foreground/[0.04] text-foreground mb-6">
                <item.icon className="w-6 h-6" />
              </span>
              <h3 className="font-display text-2xl mb-3">{item.t}</h3>
              <p className="text-sm md:text-base opacity-70 leading-relaxed">
                {item.d}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ---------------- Rollout (light) ---------------- */

const Rollout = () => (
  <section className="relative bg-background text-foreground pb-24">
    <div className="container max-w-6xl">
      <SectionLabel n="04" t="The rollout" />
      <Reveal>
        <h2 className="font-display text-4xl md:text-7xl font-bold leading-[0.95] tracking-tight mb-12 max-w-4xl">
          How a new market goes live in{" "}
          <span className="text-[#FF2E86]">under a month.</span>
        </h2>
      </Reveal>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {ROLLOUT.map((step, idx) => (
          <Reveal key={step.t} delay={idx * 0.08}>
            <div className="relative h-full rounded-3xl border border-foreground/10 bg-foreground/[0.02] p-8">
              <p className="text-sm uppercase tracking-[0.35em] opacity-60 mb-3">
                {step.when}
              </p>
              <h3 className="font-display text-2xl mb-4">{step.t}</h3>
              <p className="text-sm opacity-70 leading-relaxed">{step.d}</p>
              <span className="absolute top-6 right-7 font-display text-4xl opacity-10">
                0{idx + 1}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ---------------- Latest locations cards (dark) ---------------- */

const LatestLocations = ({
  service,
  subLocations,
}: {
  service: MainServiceInfo;
  subLocations: ServiceSubLocation[];
}) => {
  // Sub pages under /{service}/locations/____ haven't been published yet,
  // so until entries are added to SERVICE_SUB_LOCATIONS this whole
  // section renders nothing at all.
  if (!subLocations.length) return null;

  return (
    <section className="relative bg-[#0a0a0a] text-white py-24 overflow-hidden">
      <div
        aria-hidden
        className="absolute bottom-0 left-1/4 w-[600px] h-[400px] rounded-full bg-[#FF2E86]/10 blur-[160px] pointer-events-none"
      />
      <div className="container max-w-6xl relative">
        <SectionLabel n="05" t="Latest locations" />
        <div className="grid md:grid-cols-12 gap-8 items-end mb-14">
          <Reveal className="md:col-span-8">
            <h2 className="font-display text-4xl md:text-7xl font-bold leading-[0.95] tracking-tight">
              Fresh off the map — <br />
              <span className="text-[#FF2E86]">our newest cities.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12} className="md:col-span-4">
            <p className="text-sm md:text-base opacity-70 leading-relaxed">
              The {subLocations.length} newest {service.short} pages we've
              published — newest first. Your city could be next.
            </p>
          </Reveal>
        </div>

        <LatestLocationsGrid
          items={subLocations.map((sub) => ({
            href: `/${service.slug}/locations/${sub.slug}`,
            city: sub.city,
            state: sub.state,
            title: `${service.short} in ${sub.city}`,
            description: sub.description,
          }))}
        />
      </div>
    </section>
  );
};

/* ---------------- All city pages directory (light) ---------------- */

export interface ServiceCityPageLink {
  href: string;
  city: string;
  state: string;
}

const AllCityPages = ({
  service,
  cityPages,
  n,
}: {
  service: MainServiceInfo;
  cityPages: ServiceCityPageLink[];
  n: string;
}) => {
  if (!cityPages.length) return null;

  return (
    <section
      className="relative bg-background text-foreground py-24"
      data-service-city-directory
    >
      <div className="container max-w-6xl">
        <SectionLabel n={n} t="All cities" />
        <h2 className="font-display text-4xl md:text-6xl font-bold leading-[0.95] tracking-tight mb-12">
          {service.name} in every city we serve.
        </h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-3">
          {cityPages.map((page) => (
            <li key={page.href}>
              <Link
                href={page.href}
                className="text-sm md:text-base opacity-80 hover:opacity-100 hover:text-[#FF2E86] transition-colors"
              >
                {service.name} in {page.city}, {page.state}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

/* ---------------- FAQ (light) ---------------- */

const Faqs = ({ n = "06" }: { n?: string }) => (
  <section className="relative bg-background text-foreground py-24">
    <div className="container max-w-4xl">
      <SectionLabel n={n} t="FAQs" />
      <Reveal>
        <h2 className="font-display text-4xl md:text-6xl font-bold leading-[0.95] tracking-tight mb-12">
          Questions about{" "}
          <span className="text-[#FF2E86]">local coverage.</span>
        </h2>
      </Reveal>
      <div className="space-y-4">
        {FAQS.map((faq, idx) => (
          <Reveal key={faq.q} delay={idx * 0.05}>
            <details className="group rounded-3xl border border-foreground/10 bg-foreground/[0.02] px-7 py-1 transition hover:border-[#FF2E86]/40">
              <summary className="cursor-pointer list-none flex items-center justify-between gap-6 py-6">
                <span className="font-display text-lg md:text-xl pr-4">
                  {faq.q}
                </span>
                <span className="shrink-0 w-8 h-8 rounded-full border border-foreground/20 grid place-items-center text-base group-open:rotate-45 group-open:border-[#FF2E86] group-open:text-[#FF2E86] transition-all">
                  +
                </span>
              </summary>
              <p className="pb-6 text-sm md:text-base opacity-70 leading-relaxed max-w-3xl">
                {faq.a}
              </p>
            </details>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ---------------- Final CTA (dark) ---------------- */

const Cta = ({ service }: { service: MainServiceInfo }) => (
  <section className="relative bg-[#0a0a0a] text-white py-32 overflow-hidden">
    <motion.div
      aria-hidden
      className="absolute inset-0 grid place-items-center pointer-events-none"
    >
      <span className="font-display text-[22vw] leading-none opacity-[0.04] tracking-tighter select-none">
        READY
      </span>
    </motion.div>
    <div
      aria-hidden
      className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-[#FF2E86]/20 blur-[160px] pointer-events-none"
    />
    <div className="container relative max-w-5xl text-center">
      <Reveal>
        <p className="text-[10px] uppercase tracking-[0.4em] opacity-60 mb-8">
          [ Ready when you are ]
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="font-display text-5xl md:text-8xl font-bold leading-[0.95] tracking-tight">
          Ready to own <span className="text-[#FF2E86]">your city?</span>
        </h2>
      </Reveal>
      <Reveal delay={0.22}>
        <p className="mt-10 text-lg md:text-xl opacity-70 max-w-2xl mx-auto leading-relaxed">
          Book a free strategy call and we'll show you exactly how{" "}
          {service.name.toLowerCase()} would perform in your market — with real
          keyword data, competitor gaps, and a launch plan.
        </p>
      </Reveal>
      <Reveal delay={0.32}>
        <div className="mt-12 flex flex-wrap gap-4 justify-center">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 bg-white text-black px-7 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:bg-[#FF2E86] hover:text-white transition-colors"
          >
            Get my free market plan
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </Reveal>
    </div>
  </section>
);

/* ---------------- Page ---------------- */

export function ServiceLocationsHub({
  service,
  subLocations,
  cityCount,
  cityPages,
}: {
  service: MainServiceInfo;
  subLocations: ServiceSubLocation[];
  cityCount: number;
  cityPages: ServiceCityPageLink[];
}) {
  useSmoothScroll();
  const hasLatest = subLocations.length > 0;

  return (
    <div className="theme-light w-full overflow-x-clip bg-background text-foreground">
      <main>
        <Hero
          service={service}
          cityCount={cityCount}
          subCount={subLocations.length}
        />
        <LocalEdge cityCount={cityCount} />
        <WhyCityPages />
        <WhatsIncluded />
        <Rollout />
        <LatestLocations service={service} subLocations={subLocations} />
        <AllCityPages
          service={service}
          cityPages={cityPages}
          n={hasLatest ? "06" : "05"}
        />
        <Faqs n={hasLatest ? "07" : "06"} />
        <Cta service={service} />
      </main>
    </div>
  );
}




