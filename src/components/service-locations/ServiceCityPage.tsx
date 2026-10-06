"use client";

// src/components/service-locations/ServiceCityPage.tsx
// UI for /{main-service}/locations/{city} — one service in one city.
// Combines the service framing with the city data from locationPagesData.

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  MapPin,
  Star,
  Quote,
  ChevronRight,
} from "lucide-react";

import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { Reveal, SectionLabel, iconFor, LatestLocationsGrid } from "./shared";
import type {
  MainServiceInfo,
  ServiceSubLocation,
} from "@/content/locations/serviceLocations";
import type { LocationData } from "@/content/locations/locationPagesData";

/* ---------------- Hero ---------------- */

const CityHero = ({
  service,
  location,
  cityCount,
}: {
  service: MainServiceInfo;
  location: LocationData;
  cityCount: number;
}) => {
  const ref = useRef<HTMLElement>(null);
  const hasServiceSpecificHero =
    location.hero.heading.toLowerCase().includes(service.title.toLowerCase()) ||
    location.hero.heading.toLowerCase().includes(service.short.toLowerCase());
  const heading = hasServiceSpecificHero
    ? location.hero.heading
    : `${service.title} in ${location.name}.`;
  const subheading = hasServiceSpecificHero
    ? location.hero.subheading
    : `${service.blurb} We already run programs across ${cityCount}+ US cities — ${location.name} included.`;
  const cityNameIndex = heading.toLowerCase().lastIndexOf(location.name.toLowerCase());
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
            className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.4em] opacity-60 mb-8"
          >
            <Link href="/" className="hover:opacity-100 transition-opacity">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link
              href={`/${service.slug}`}
              className="hover:opacity-100 transition-opacity"
            >
              {service.name}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link
              href={`/${service.slug}/locations`}
              className="hover:opacity-100 transition-opacity"
            >
              Locations
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#FF2E86]">{location.name}</span>
          </nav>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="text-[10px] uppercase tracking-[0.4em] opacity-60 mb-6">
            [ {service.short} · {location.name}, {location.state} ]
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <h1 className="font-display text-5xl md:text-8xl font-bold leading-[0.95] tracking-tight max-w-5xl">
            {hasServiceSpecificHero ? (
              cityNameIndex >= 0 ? (
                <>
                  {heading.slice(0, cityNameIndex)}
                  <span className="text-[#FF2E86]">
                    {heading.slice(cityNameIndex)}
                  </span>
                </>
              ) : (
                heading
              )
            ) : (
              <>
                {service.title} <br />
                <span className="text-[#FF2E86]">in {location.name}.</span>
              </>
            )}
          </h1>
        </Reveal>

        <Reveal delay={0.28}>
          <p className="mt-10 max-w-2xl text-lg md:text-xl opacity-70 leading-relaxed">
            {subheading}
          </p>
        </Reveal>

        <Reveal delay={0.38}>
          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href={hasServiceSpecificHero ? location.hero.ctaLink : "/contact"}
              className="group inline-flex items-center gap-3 bg-white text-black px-7 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:bg-[#FF2E86] hover:text-white transition-colors"
            >
              {hasServiceSpecificHero
                ? location.hero.ctaText
                : `Free ${location.name} consultation`}
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href={`/${service.slug}/locations`}
              className="inline-flex items-center gap-3 border border-white/20 px-7 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:border-[#FF2E86] hover:text-[#FF2E86] transition-colors"
            >
              <MapPin className="w-4 h-4" />
              All {service.short} locations
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.5}>
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 pt-10">
            {[
              { k: "60–90", v: "Days to local traction" },
              { k: "500+", v: "Clients nationwide" },
              { k: "4.9/5", v: "Average client rating" },
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

/* ---------------- Local intro (light) ---------------- */

const CityIntro = ({ location }: { location: LocationData }) => (
  <section className="relative bg-background text-foreground py-28">
    <div className="container max-w-5xl">
      <SectionLabel n="01" t={`On the ground in ${location.name}`} />
      <Reveal>
        <h2 className="font-display text-4xl md:text-6xl leading-[1.05] tracking-tight max-w-4xl">
          {location.introduction?.title}
        </h2>
      </Reveal>
      <div className="mt-10 space-y-6">
        {(location.introduction?.content ?? []).map((para, i) => (
          <Reveal key={i} delay={0.1 + i * 0.08}>
            <p className="text-lg opacity-70 max-w-3xl leading-relaxed">
              {para}
            </p>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ---------------- What we do in this city (dark) ---------------- */

const ServicesInCity = ({ location }: { location: LocationData }) => {
  const items = (location.servicesSection?.items ?? []).slice(0, 8);
  if (!items.length) return null;

  return (
    <section className="relative bg-[#0a0a0a] text-white py-24 overflow-hidden">
      <div
        aria-hidden
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#FF2E86]/10 blur-[160px] pointer-events-none"
      />
      <div className="container max-w-6xl relative">
        <SectionLabel n="02" t={`What we do in ${location.name}`} />
        <Reveal>
          <h2 className="font-display text-4xl md:text-7xl font-bold leading-[0.95] tracking-tight mb-8 max-w-4xl">
            {location.servicesSection?.title ??
              `Services for ${location.name} businesses`}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-3xl text-lg opacity-75 leading-relaxed mb-12">
            {location.servicesSection?.description}
          </p>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, idx) => {
            const Icon = iconFor(item.icon);
            return (
              <Reveal key={item.title || idx} delay={idx * 0.08}>
                <div className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-8 hover:border-[#FF2E86]/40 transition group">
                  <span className="grid place-items-center w-12 h-12 rounded-2xl bg-[#FF2E86]/10 text-[#FF2E86] mb-6 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="w-6 h-6" />
                  </span>
                  <h3 className="font-display text-2xl mb-3">{item.title}</h3>
                  <p className="text-sm md:text-base opacity-70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ---------------- Why choose us here (light) ---------------- */

const WhyChooseHere = ({ location }: { location: LocationData }) => {
  const points = location.whyChooseSection?.points ?? [];
  if (!points.length) return null;

  return (
    <section className="relative bg-background text-foreground py-24">
      <div className="container max-w-6xl">
        <SectionLabel
          n="03"
          t={`Why ${location.name} businesses choose us`}
        />
        <Reveal>
          <h2 className="font-display text-4xl md:text-7xl font-bold leading-[0.95] tracking-tight mb-12 max-w-4xl">
            {location.whyChooseSection?.title ?? "Why teams stay with us."}
          </h2>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {points.map((point, idx) => (
            <Reveal key={idx} delay={idx * 0.06}>
              <div className="flex h-full gap-6 rounded-3xl border border-foreground/10 bg-foreground/[0.02] p-8 hover:border-[#FF2E86]/40 transition">
                <span className="font-display text-4xl opacity-30 shrink-0">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <p className="text-sm md:text-base opacity-75 leading-relaxed">
                  {point}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------------- Areas served (dark) ---------------- */

const AreasServed = ({ location }: { location: LocationData }) => {
  const areas = location.areasServed?.areas ?? [];
  if (!areas.length) return null;

  return (
    <section className="relative bg-[#0a0a0a] text-white py-24 overflow-hidden">
      <div
        aria-hidden
        className="absolute bottom-0 left-1/4 w-[500px] h-[400px] rounded-full bg-[#FF2E86]/10 blur-[160px] pointer-events-none"
      />
      <div className="container max-w-6xl relative">
        <SectionLabel n="04" t="Neighborhoods & nearby areas" />
        <Reveal>
          <h2 className="font-display text-4xl md:text-7xl font-bold leading-[0.95] tracking-tight mb-12 max-w-4xl">
            {location.areasServed?.title ??
              `Areas we serve around ${location.name}`}
          </h2>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2">
          {areas.map((area, idx) => {
            const [name, ...rest] = area.split(" — ");
            const desc = rest.join(" — ");
            return (
              <Reveal key={idx} delay={idx * 0.05}>
                <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 hover:border-[#FF2E86]/40 transition">
                  <MapPin className="w-5 h-5 mt-0.5 text-[#FF2E86] shrink-0" />
                  <div>
                    <p className="font-display text-xl leading-snug">{name}</p>
                    {desc && (
                      <p className="text-sm opacity-70 leading-relaxed mt-1">
                        {desc}
                      </p>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ---------------- Testimonials (light) ---------------- */

const CityTestimonials = ({ location }: { location: LocationData }) => {
  const items = (location.testimonialsSection?.items ?? []).slice(0, 6);
  if (!items.length) return null;

  return (
    <section className="relative bg-background text-foreground py-24">
      <div className="container max-w-6xl">
        <SectionLabel n="05" t={`What ${location.name} clients say`} />
        <Reveal>
          <h2 className="font-display text-4xl md:text-7xl font-bold leading-[0.95] tracking-tight mb-12 max-w-4xl">
            Real clients. <span className="text-[#FF2E86]">Real growth.</span>
          </h2>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, idx) => (
            <Reveal key={idx} delay={idx * 0.08}>
              <figure className="relative h-full rounded-3xl border border-foreground/10 bg-foreground/[0.02] p-8 hover:border-[#FF2E86]/40 transition">
                <Quote className="w-8 h-8 text-[#FF2E86]/60 mb-6" />
                <blockquote className="text-sm md:text-base opacity-75 leading-relaxed">
                  "{item.quote}"
                </blockquote>
                <figcaption className="mt-7 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{item.author}</p>
                    <p className="text-xs opacity-60 mt-0.5">{item.role}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: item.rating ?? 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-[#FF2E86] text-[#FF2E86]"
                      />
                    ))}
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------------- FAQ (light) ---------------- */

const CityFaqs = ({ location }: { location: LocationData }) => {
  const faqs = (location.faqs ?? []).slice(0, 5);
  if (!faqs.length) return null;

  return (
    <section className="relative bg-background text-foreground pb-10 ">
      <div className="container max-w-4xl">
        <SectionLabel n="06" t="FAQs" />
        <Reveal>
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-[0.95] tracking-tight mb-12">
            {location.name}{" "}
            <span className="text-[#FF2E86]">questions.</span>
          </h2>
        </Reveal>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <Reveal key={idx} delay={idx * 0.05}>
              <details className="group rounded-3xl border border-foreground/10 bg-foreground/[0.02] px-7 py-1 transition hover:border-[#FF2E86]/40">
                <summary className="cursor-pointer list-none flex items-center justify-between gap-6 py-6">
                  <span className="font-display text-lg md:text-xl pr-4">
                    {faq.question}
                  </span>
                  <span className="shrink-0 w-8 h-8 rounded-full border border-foreground/20 grid place-items-center text-base group-open:rotate-45 group-open:border-[#FF2E86] group-open:text-[#FF2E86] transition-all">
                    +
                  </span>
                </summary>
                <p className="pb-6 text-sm md:text-base opacity-70 leading-relaxed max-w-3xl">
                  {faq.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------------- More cities (dark) ---------------- */

const MoreCities = ({
  service,
  subLocations,
  cityCount,
}: {
  service: MainServiceInfo;
  subLocations: ServiceSubLocation[];
  cityCount: number;
}) => {
  // Sub pages under /{service}/locations/____ haven't been published yet,
  // so until entries are added to SERVICE_SUB_LOCATIONS this section
  // renders nothing at all.
  if (!subLocations.length) return null;

  return (
    <section className="relative bg-[#0a0a0a] text-white py-24 overflow-hidden">
      <div className="container max-w-6xl relative">
        <SectionLabel n="07" t="Latest locations" />
        <div className="grid md:grid-cols-12 gap-8 items-end mb-14">
          <Reveal className="md:col-span-8">
            <h2 className="font-display text-4xl md:text-7xl font-bold leading-[0.95] tracking-tight">
              Keep exploring —{" "}
              <span className="text-[#FF2E86]">our newest cities.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12} className="md:col-span-4">
            <p className="text-sm md:text-base opacity-70 leading-relaxed">
              Our newest {service.short} programs — from a network of{" "}
              {cityCount}+ markets and growing.
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


const Tools = ({ location }: { location: LocationData }) => {
  const tools = location.toolsSection?.tools ?? [];

  if (!tools.length) return null;

  return (
    <section className="relative bg-[#0a0a0a] text-white py-24 overflow-hidden">
      <div
        aria-hidden
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#FF2E86]/10 blur-[180px] pointer-events-none"
      />

      <div className="container max-w-6xl relative">
        <SectionLabel
          n="09"
          t="Tools and platforms we work with"
        />

        <Reveal>
          <h2 className="font-display text-4xl md:text-7xl font-bold leading-[0.95] tracking-tight mb-8 max-w-4xl">
            {location.toolsSection?.title ?? "Tools and Platforms We Work With"}
          </h2>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool, idx) => (
            <Reveal key={tool || idx} delay={idx * 0.06}>
              <div className="group h-full rounded-3xl border border-white/10 bg-white/[0.03] p-7 hover:border-[#FF2E86]/50 hover:bg-white/[0.05] transition-all duration-300">
                <div className="flex items-start justify-between gap-4 mb-10">
                  <span className="font-display text-4xl text-[#FF2E86]/30 group-hover:text-[#FF2E86]/60 transition-colors">
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  <ArrowUpRight className="w-5 h-5 text-[#FF2E86] opacity-50 group-hover:opacity-100 transition-opacity" />
                </div>

                <h3 className="font-display text-xl md:text-2xl leading-tight">
                  {tool}
                </h3>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
/* ---------------- Final CTA (dark) ---------------- */

const CityCta = ({ location }: { location: LocationData }) => (
  <section className="relative bg-[#0a0a0a] text-white py-32 overflow-hidden">
    <motion.div
      aria-hidden
      className="absolute inset-0 grid place-items-center pointer-events-none"
    >
      <span className="font-display text-[22vw] leading-none opacity-[0.04] tracking-tighter select-none">
        {location.name.toUpperCase()}
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
        <h2 className="font-display text-5xl md:text-8xl font-bold leading-[0.95] tracking-tight max-w-4xl mx-auto">
          {location.cta?.title ?? `Ready to grow in ${location.name}?`}
        </h2>
      </Reveal>
      <Reveal delay={0.22}>
        <p className="mt-10 text-lg md:text-xl opacity-70 max-w-2xl mx-auto leading-relaxed">
          {location.cta?.description}
        </p>
      </Reveal>
      <Reveal delay={0.32}>
        <div className="mt-12 flex flex-wrap gap-4 justify-center">
          <Link
            href={location.cta?.buttonLink ?? "/contact"}
            className="group inline-flex items-center gap-3 bg-white text-black px-7 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:bg-[#FF2E86] hover:text-white transition-colors"
          >
            {location.cta?.buttonText ?? "Get started"}
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </Reveal>
    </div>
  </section>
);


const Cases = ({ content }: { content: LocationData }) => {
  const cases = content.caseStudies?.items || [];

  if (!cases.length) return null;

  return (
    <section className="relative bg-[#0a0a0a] text-white py-24">
      <div className="container max-w-6xl">
        <SectionLabel n="07" t="Client results" />

        <Reveal>
          <h2 className="font-display text-4xl md:text-7xl font-bold leading-[0.95] tracking-tight mb-10 max-w-4xl">
            {content.caseStudies?.title ?? "SEO success stories"}
          </h2>
        </Reveal>

        <div className="space-y-8">
          {cases.map((item, idx) => (
            <Reveal key={item.title || idx} delay={idx * 0.08}>
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-10">
                <p className="text-[10px] uppercase tracking-[0.35em] opacity-60 mb-4">
                  {item.services?.join(" · ")}
                </p>

                <p className="font-display text-5xl md:text-7xl text-[#FF2E86] leading-none mb-4">
                  {item.results?.[0]?.split(" ").slice(0, 3).join(" ")}
                </p>

                <p className="text-sm uppercase tracking-[0.35em] opacity-60 mb-4">
                  {item.results?.[0]}
                </p>

                <h3 className="font-display text-2xl mb-4">
                  {item.title}
                </h3>

                <p className="text-sm opacity-70 leading-relaxed max-w-4xl">
                  {item.outcome}
                </p>

                {item.results && item.results.length > 1 && (
                  <div className="mt-6 flex flex-wrap gap-3">
                    {item.results.slice(1).map((result, resultIndex) => (
                      <span
                        key={resultIndex}
                        className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.15em] opacity-70"
                      >
                        {result}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};


const Process = ({ content }: { content: LocationData }) => {
  const steps = content.processSection?.steps || [];

  if (!steps.length) return null;

  return (
    <section className="relative bg-background text-foreground py-24">
      <div className="container max-w-6xl">
        <SectionLabel n="06" t="The process" />

        <Reveal>
          <h2 className="font-display text-4xl md:text-7xl font-bold leading-[0.95] tracking-tight mb-6 max-w-4xl">
            {content.processSection?.title}
          </h2>
        </Reveal>

        {content.processSection?.description && (
          <Reveal delay={0.1}>
            <p className="max-w-3xl text-lg opacity-70 leading-relaxed mb-12">
              {content.processSection.description}
            </p>
          </Reveal>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {steps.map((step, idx) => (
            <Reveal key={step.title || idx} delay={idx * 0.08}>
              <div className="rounded-3xl border border-foreground/10 bg-foreground/[0.02] p-8 md:p-10 hover:border-[#FF2E86]/40 transition">
                <p className="font-display text-5xl text-[#FF2E86]/30 mb-5">
                  {String(idx + 1).padStart(2, "0")}
                </p>

                <h3 className="font-display text-2xl md:text-3xl mb-4">
                  {step.title}
                </h3>

                <p className="text-base opacity-70 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};


/* ---------------- SEO Packages ---------------- */

const Packages = ({ location }: { location: LocationData }) => {
  const packages = location.packagesSection?.items ?? [];

  if (!packages.length) return null;

  return (
    <section className="relative bg-[#0a0a0a] text-white py-24 overflow-hidden">
      <div
        aria-hidden
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#FF2E86]/10 blur-[180px] pointer-events-none"
      />

      <div className="container max-w-6xl relative">
        <SectionLabel n="08" t={`SEO packages in ${location.name}`} />

        <Reveal>
          <h2 className="font-display text-4xl md:text-7xl font-bold leading-[0.95] tracking-tight mb-12 max-w-4xl">
            {location.packagesSection?.title ?? "SEO Packages"}
          </h2>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {packages.map((pkg, idx) => (
            <Reveal key={pkg.name || idx} delay={idx * 0.08}>
              <div className="relative h-full rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-9 hover:border-[#FF2E86]/50 transition-all duration-300 group">
                <div className="flex items-start justify-between gap-4 mb-8">
                  <span className="font-display text-5xl text-[#FF2E86]/30 group-hover:text-[#FF2E86]/50 transition-colors">
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  <ArrowUpRight className="w-5 h-5 text-[#FF2E86] opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>

                <h3 className="font-display text-2xl md:text-3xl leading-tight mb-4">
                  {pkg.name}
                </h3>

                {pkg.description && (
                  <p className="text-sm md:text-base opacity-70 leading-relaxed mb-8">
                    {pkg.description}
                  </p>
                )}

                {pkg.includes?.length ? (
                  <div className="border-t border-white/10 pt-6">
                    <p className="text-[10px] uppercase tracking-[0.3em] opacity-50 mb-5">
                      Includes
                    </p>

                    <ul className="space-y-3">
                      {pkg.includes.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="flex items-start gap-3 text-sm opacity-75"
                        >
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#FF2E86] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <Link
                  href="/contact"
                  className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#FF2E86] hover:text-white transition-colors"
                >
                  Get started
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
const Industries = ({ location }: { location: LocationData }) => {
  const industries = location.industriesSection?.items ?? [];

  if (!industries.length) return null;

  return (
    <section className="relative bg-background text-foreground py-24">
      <div className="container max-w-6xl">
        <SectionLabel n="05" t={`Industries we serve in ${location.name}`} />

        <Reveal>
          <h2 className="font-display text-4xl md:text-7xl font-bold leading-[0.95] tracking-tight mb-8 max-w-4xl">
            {location.industriesSection?.title ??
              "Professional SEO Services for Every Industry"}
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="max-w-3xl text-lg opacity-70 leading-relaxed mb-12">
            {location.industriesSection?.description}
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {industries.map((industry, idx) => (
            <Reveal key={industry.name || idx} delay={idx * 0.06}>
              <div className="h-full rounded-3xl border border-foreground/10 bg-foreground/[0.02] p-8 hover:border-[#FF2E86]/40 transition">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <span className="font-display text-4xl text-[#FF2E86]/30">
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  <ArrowUpRight className="w-5 h-5 text-[#FF2E86] opacity-60" />
                </div>

                <h3 className="font-display text-2xl md:text-3xl mb-4">
                  {industry.name}
                </h3>

                <p className="text-sm md:text-base opacity-70 leading-relaxed">
                  {industry.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
/* ---------------- Page ---------------- */

export function ServiceCityPage({
  service,
  location,
  otherCities,
  cityCount,
}: {
  service: MainServiceInfo;
  location: LocationData;
  otherCities: ServiceSubLocation[];
  cityCount: number;
}) {
  useSmoothScroll();

  return (
    <div className="theme-light w-full overflow-x-clip bg-background text-foreground">
      <main>
        <CityHero
          service={service}
          location={location}
          cityCount={cityCount}
        />
        <CityIntro location={location} />
        <ServicesInCity location={location} />
        <WhyChooseHere location={location} />
        <Process content={location} />
<Cases content={location} />
 <Packages location={location} />
<Industries location={location} />
      <Tools location={location} />
       <CityCta location={location} />
        <CityTestimonials location={location} />
        <CityFaqs location={location} />
      
        



      <AreasServed location={location} /> 



<MoreCities
  service={service}
  subLocations={otherCities}
  cityCount={cityCount}
/>
<CityCta location={location} />
      </main>
    </div>
  );
}
