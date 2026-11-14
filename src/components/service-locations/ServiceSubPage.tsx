"use client";

// src/components/service-locations/ServiceSubPage.tsx
// UI for a fully-custom service-location sub page (e.g. Atlanta SEO).
// Content comes from SUB_PAGE_REGISTRY. Styling matches the site's
// main service page design system: dark #0a0a0a hero with grid + pink glow,
// font-display headings, rounded-3xl cards, and reveal animations.

import { useRef } from "react";
import Link from "next/link";
import { IllustrativeBadge, IllustrativeResultsNotice } from "@/components/site/IllustrativeResults";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  MapPin,
  Check,
  ChevronRight,
} from "lucide-react";

import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { Reveal, SectionLabel, iconFor } from "./shared";
import type { MainServiceInfo } from "@/content/locations/serviceLocations";
import type { SubPageContent } from "@/content/locations/subpage-atlanta-seo";

/* ---------------- Hero ---------------- */

const SubHero = ({
  service,
  content,
}: {
  service: MainServiceInfo;
  content: SubPageContent;
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
      {/* grid pattern */}
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

      {/* pink glow */}
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
            <span className="text-[#FF2E86]">{content.cityDisplay}</span>
          </nav>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="text-[10px] uppercase tracking-[0.4em] opacity-60 mb-6">
            [ {content.hero.eyebrow} ]
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <h1 className="font-display text-5xl md:text-8xl font-bold leading-[0.95] tracking-tight max-w-5xl">
            {content.hero.title} <br />
            <span className="text-[#FF2E86]">{content.hero.titleHighlight}</span>
          </h1>
        </Reveal>

        <Reveal delay={0.28}>
          <div className="mt-10 max-w-2xl space-y-5">
            {content.hero.paragraphs.map((p, i) => (
              <p key={i} className="text-lg md:text-xl opacity-70 leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.38}>
          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 bg-white text-black px-7 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:bg-[#FF2E86] hover:text-white transition-colors"
            >
              {content.hero.ctaPrimary}
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 border border-white/20 px-7 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:border-[#FF2E86] hover:text-[#FF2E86] transition-colors"
            >
              {content.hero.ctaSecondary}
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.5}>
          <div className="mt-16 flex flex-wrap items-center gap-3 text-sm opacity-70">
            <span className="grid place-items-center w-9 h-9 rounded-full bg-[#FF2E86]/10 text-[#FF2E86] shrink-0">
              <MapPin className="w-4 h-4" />
            </span>
            <span>{content.hero.serving}</span>
          </div>
        </Reveal>
      </motion.div>
    </section>
  );
};

/* ---------------- CTA top (light) ---------------- */

const CtaTop = ({ content }: { content: SubPageContent }) => (
  <section className="relative bg-background text-foreground py-28 overflow-hidden">
    <div
      aria-hidden
      className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full bg-[#FF2E86]/10 blur-[140px] pointer-events-none"
    />
    <div className="container relative max-w-4xl text-center">
      <Reveal>
        <p className="text-[10px] uppercase tracking-[0.4em] opacity-60 mb-4">
          [ 01 · Free consultation ]
        </p>
        <h2 className="font-display text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight text-balance">
          {content.ctaTop.title}
        </h2>
      </Reveal>
      <Reveal delay={0.12}>
        <p className="mt-8 text-lg md:text-xl opacity-70 leading-relaxed max-w-2xl mx-auto">
          {content.ctaTop.description}
        </p>
      </Reveal>
      <Reveal delay={0.18}>
        <p className="mt-5 text-base md:text-lg opacity-60 leading-relaxed max-w-2xl mx-auto">
          {content.ctaTop.description2}
        </p>
      </Reveal>
      <Reveal delay={0.28}>
        <div className="mt-10 flex justify-center">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 bg-foreground text-background px-7 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:bg-[#FF2E86] hover:text-white transition-colors"
          >
            {content.ctaTop.cta}
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </Reveal>
      <Reveal delay={0.36}>
        <p className="mt-8 text-xs uppercase tracking-[0.3em] opacity-50">
          {content.ctaTop.note}
        </p>
      </Reveal>
    </div>
  </section>
);

/* ---------------- About the firm (dark) ---------------- */

const About = ({ content }: { content: SubPageContent }) => (
  <section className="relative bg-[#0a0a0a] text-white py-28 overflow-hidden">
    <div
      aria-hidden
      className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#FF2E86]/10 blur-[160px] pointer-events-none"
    />
    <div className="container max-w-6xl relative">
      <SectionLabel n="02" t="About this firm" />
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
        <div className="lg:col-span-7 space-y-6">
          <Reveal>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-[1.02] tracking-tight text-balance">
              {content.about.title}
            </h2>
          </Reveal>
          {content.about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.12 + i * 0.08}>
              <p className="text-base md:text-lg opacity-70 leading-relaxed">
                {p}
              </p>
            </Reveal>
          ))}
        </div>
        <div className="lg:col-span-5">
          <Reveal delay={0.2}>
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
              <p className="text-sm uppercase tracking-[0.35em] opacity-60 mb-6">
                {content.about.workWithTitle}
              </p>
              <ul className="space-y-5">
                {content.about.workWith.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="grid place-items-center w-6 h-6 rounded-full bg-[#FF2E86]/15 text-[#FF2E86] mt-0.5 shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-sm md:text-base opacity-80 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);

/* ---------------- Services (light) ---------------- */

const ServicesSection = ({ content }: { content: SubPageContent }) => {
  if (!content.services) return null;
  return (
  <section className="relative bg-background text-foreground py-28">
    <div className="container max-w-6xl">
      <SectionLabel n="03" t="What we do" />
      <div className="grid md:grid-cols-12 gap-8 items-end mb-12">
        <Reveal className="md:col-span-8">
          <h2 className="font-display text-4xl md:text-7xl font-bold leading-[0.95] tracking-tight text-balance">
            {content.services.title}
          </h2>
        </Reveal>
        <Reveal delay={0.12} className="md:col-span-4">
          <p className="text-sm md:text-base opacity-70 leading-relaxed">
            {content.services.intro}
          </p>
        </Reveal>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {content.services.items.map((item, idx) => {
          const Icon = iconFor(item.icon);
          const wide = idx === content.services!.items.length - 1;
          return (
            <Reveal
              key={item.title}
              delay={idx * 0.06}
              className={wide ? "md:col-span-2 xl:col-span-3" : ""}
            >
              <div
                className={`flex h-full gap-6 rounded-3xl border border-foreground/10 bg-foreground/[0.02] p-8 hover:border-[#FF2E86]/40 transition ${
                  wide
                    ? "bg-gradient-to-br from-foreground/[0.03] to-[#FF2E86]/[0.04]"
                    : ""
                }`}
              >
                <span className="grid place-items-center w-12 h-12 rounded-2xl bg-foreground/[0.04] text-foreground shrink-0">
                  <Icon className="w-6 h-6" />
                </span>
                <div>
                  <h3 className="font-display text-2xl mb-3">{item.title}</h3>
                  <p className="text-sm md:text-base opacity-70 leading-relaxed">
                    {item.body}
                  </p>
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

/* ---------------- Process (dark) ---------------- */

const ProcessSection = ({ content }: { content: SubPageContent }) => (
  <section className="relative bg-[#0a0a0a] text-white py-28 overflow-hidden">
    <div
      aria-hidden
      className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[#FF2E86]/10 blur-[160px] pointer-events-none"
    />
    <div className="container max-w-6xl relative">
      <SectionLabel n="04" t="The process" />
      <Reveal>
        <h2 className="font-display text-4xl md:text-7xl font-bold leading-[0.95] tracking-tight mb-6 max-w-4xl">
          {content.process.title}
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="max-w-3xl text-lg opacity-75 leading-relaxed mb-14">
          {content.process.intro}
        </p>
      </Reveal>

      <div className="border-t border-white/10">
        {content.process.steps.map((step, idx) => (
          <Reveal key={step.title} delay={idx * 0.06}>
            <div className="grid md:grid-cols-12 gap-6 border-b border-white/10 py-10 group">
              <div className="md:col-span-2 font-display text-5xl opacity-40 group-hover:opacity-100 group-hover:text-[#FF2E86] transition">
                {String(idx + 1).padStart(2, "0")}
              </div>
              <div className="md:col-span-4 font-display text-2xl md:text-3xl leading-tight">
                {step.title}
              </div>
              <div className="md:col-span-6 text-sm md:text-base opacity-70 leading-relaxed">
                {step.body}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ---------------- Why choose (light) ---------------- */

const WhySection = ({ content }: { content: SubPageContent }) => (
  <section className="relative bg-background text-foreground py-28">
    <div className="container max-w-6xl">
      <SectionLabel n="05" t="Why Atlanta businesses choose us" />
      <Reveal>
        <h2 className="font-display text-4xl md:text-7xl font-bold leading-[0.95] tracking-tight mb-12 max-w-4xl text-balance">
          {content.whyChoose.title}
        </h2>
      </Reveal>
      <div className="grid gap-6 md:grid-cols-2">
        {content.whyChoose.items.map((item, idx) => {
          const Icon = iconFor(item.icon);
          const wide = idx === content.whyChoose.items.length - 1;
          return (
            <Reveal
              key={item.title}
              delay={idx * 0.06}
              className={wide ? "md:col-span-2" : ""}
            >
              <div className="flex gap-6 h-full rounded-3xl border border-foreground/10 bg-foreground/[0.02] p-8 hover:border-[#FF2E86]/40 transition">
                <span className="grid place-items-center w-12 h-12 rounded-2xl bg-foreground/[0.04] text-[#FF2E86] shrink-0">
                  <Icon className="w-6 h-6" />
                </span>
                <div>
                  <h3 className="font-display text-2xl mb-3">{item.title}</h3>
                  <p className="text-sm md:text-base opacity-70 leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

/* ---------------- Results (dark) ---------------- */

const ResultsSection = ({ content }: { content: SubPageContent }) => (
  <section className="relative bg-[#0a0a0a] text-white py-28 overflow-hidden">
    <div
      aria-hidden
      className="absolute bottom-0 right-1/4 w-[500px] h-[400px] rounded-full bg-[#FF2E86]/10 blur-[160px] pointer-events-none"
    />
    <div className="container max-w-6xl relative">
      <SectionLabel n="06" t="Illustrative results" />
      <Reveal>
        <h2 className="font-display text-4xl md:text-7xl font-bold leading-[0.95] tracking-tight mb-6 max-w-4xl">
          {content.results.title}
        </h2>
        <IllustrativeResultsNotice className="mb-12" />
      </Reveal>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {content.results.items.map((item, idx) => (
          <Reveal key={item.title} delay={idx * 0.08}>
            <div className="flex flex-col h-full rounded-3xl border border-white/10 bg-white/[0.03] p-8 hover:border-[#FF2E86]/40 transition">
              <IllustrativeBadge className="mb-4 self-start" />
              <h3 className="font-display text-2xl mb-6">{item.title}</h3>
              <div className="space-y-5 text-sm md:text-base leading-relaxed">
                <p>
                  <span className="block text-[10px] uppercase tracking-[0.3em] opacity-60 mb-1">
                    Challenge
                  </span>
                  <span className="opacity-70">{item.startingPoint}</span>
                </p>
                <p>
                  <span className="block text-[10px] uppercase tracking-[0.3em] opacity-60 mb-1">
                    Solution
                  </span>
                  <span className="opacity-70">{item.whatWeDid}</span>
                </p>
                <p className="flex-1">
                  <span className="block text-[10px] uppercase tracking-[0.3em] text-[#FF2E86] mb-1">
                    Result
                  </span>
                  <span className="opacity-85">{item.result}</span>
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      {content.results.note && (
        <Reveal delay={0.2}>
          <p className="mt-8 text-xs opacity-50 italic">{content.results.note}</p>
        </Reveal>
      )}
    </div>
  </section>
);

/* ---------------- Real results (light) ---------------- */

const RealResultsSection = ({ content }: { content: SubPageContent }) => {
  if (!content.realResults) return null;
  return (
  <section className="relative bg-background text-foreground py-28">
    <div className="container max-w-6xl">
      <SectionLabel n="07" t="What you can expect" />
      <div className="grid md:grid-cols-12 gap-8 items-end mb-12">
        <Reveal className="md:col-span-8">
          <h2 className="font-display text-4xl md:text-7xl font-bold leading-[0.95] tracking-tight max-w-3xl">
            {content.realResults.title}
          </h2>
        </Reveal>
        <Reveal delay={0.12} className="md:col-span-4">
          <p className="text-sm md:text-base opacity-70 leading-relaxed">
            {content.realResults.intro}
          </p>
        </Reveal>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {content.realResults.items.map((item, idx) => {
          const Icon = iconFor(item.icon);
          const wide = idx === content.realResults!.items.length - 1;
          return (
            <Reveal
              key={item.title}
              delay={idx * 0.06}
              className={wide ? "md:col-span-2" : ""}
            >
              <div className="flex gap-6 h-full rounded-3xl border border-foreground/10 bg-foreground/[0.02] p-8 hover:border-[#FF2E86]/40 transition">
                <span className="grid place-items-center w-12 h-12 rounded-2xl bg-[#FF2E86]/10 text-[#FF2E86] shrink-0">
                  <Icon className="w-6 h-6" />
                </span>
                <div>
                  <h3 className="font-display text-2xl mb-3">{item.title}</h3>
                  <p className="text-sm md:text-base opacity-70 leading-relaxed">
                    {item.body}
                  </p>
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

/* ---------------- Industries (dark) ---------------- */

const IndustriesSection = ({ content }: { content: SubPageContent }) => (
  <section className="relative bg-[#0a0a0a] text-white py-28 overflow-hidden">
    <div
      aria-hidden
      className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#FF2E86]/10 blur-[160px] pointer-events-none"
    />
    <div className="container max-w-6xl relative">
      <SectionLabel n="08" t="Industries" />
      <div className="grid md:grid-cols-12 gap-8 items-end mb-12">
        <Reveal className="md:col-span-8">
          <h2 className="font-display text-4xl md:text-7xl font-bold leading-[0.95] tracking-tight max-w-3xl">
            {content.industries.title}
          </h2>
        </Reveal>
        <Reveal delay={0.12} className="md:col-span-4">
          <p className="text-sm md:text-base opacity-70 leading-relaxed">
            {content.industries.intro}
          </p>
        </Reveal>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {content.industries.items.map((item, idx) => {
          const Icon = iconFor(item.icon);
          const wide = idx === content.industries.items.length - 1;
          return (
            <Reveal
              key={item.title}
              delay={idx * 0.06}
              className={wide ? "md:col-span-2 xl:col-span-3" : ""}
            >
              <div
                className={`flex h-full gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-8 hover:border-[#FF2E86]/40 transition ${
                  wide
                    ? "bg-gradient-to-br from-white/[0.04] to-[#FF2E86]/[0.05]"
                    : ""
                }`}
              >
                <span className="grid place-items-center w-12 h-12 rounded-2xl bg-[#FF2E86]/10 text-[#FF2E86] shrink-0">
                  <Icon className="w-6 h-6" />
                </span>
                <div>
                  <h3 className="font-display text-2xl mb-3">{item.title}</h3>
                  <p className="text-sm md:text-base opacity-70 leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

/* ---------------- Tools (light) ---------------- */

const ToolsSection = ({ content }: { content: SubPageContent }) => {
  if (!content.tools) return null;
  return (
  <section className="relative bg-background text-foreground py-28">
    <div className="container max-w-6xl">
      <SectionLabel n="09" t="Tools platform" />
      <div className="grid md:grid-cols-12 gap-8 items-end mb-12">
        <Reveal className="md:col-span-8">
          <h2 className="font-display text-4xl md:text-7xl font-bold leading-[0.95] tracking-tight max-w-3xl">
            {content.tools.title}
          </h2>
        </Reveal>
        <Reveal delay={0.12} className="md:col-span-4">
          <p className="text-sm md:text-base opacity-70 leading-relaxed">
            {content.tools.intro}
          </p>
        </Reveal>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {content.tools.items.map((item, idx) => {
          const Icon = iconFor(item.icon);
          return (
            <Reveal key={item.title} delay={idx * 0.06}>
              <div className="h-full rounded-3xl border border-foreground/10 bg-foreground/[0.02] p-8 hover:border-[#FF2E86]/40 transition">
                <span className="grid place-items-center w-12 h-12 rounded-2xl bg-foreground/[0.04] text-foreground mb-6">
                  <Icon className="w-6 h-6" />
                </span>
                <h3 className="font-display text-2xl mb-3">{item.title}</h3>
                <p className="text-sm md:text-base opacity-70 leading-relaxed">
                  {item.body}
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

/* ---------------- Stats (dark) ---------------- */

const StatsSection = ({ content }: { content: SubPageContent }) => {
  if (!content.stats) return null;
  return (
    <section className="relative bg-[#0a0a0a] text-white py-28 overflow-hidden">
      <div
        aria-hidden
        className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[#FF2E86]/10 blur-[160px] pointer-events-none"
      />
      <div className="container max-w-6xl relative">
        <SectionLabel n="10" t="By the numbers" />
        <Reveal>
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-[0.95] tracking-tight mb-6 max-w-4xl">
            {content.stats.title}
          </h2>
        </Reveal>
        {content.stats.intro && (
          <Reveal delay={0.1}>
            <p className="max-w-3xl text-lg opacity-75 leading-relaxed mb-14">
              {content.stats.intro}
            </p>
          </Reveal>
        )}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {content.stats.items.map((stat, idx) => (
            <Reveal key={stat.label} delay={idx * 0.06}>
              <div className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center hover:border-[#FF2E86]/40 transition">
                <div className="font-display text-5xl md:text-6xl font-bold text-[#FF2E86] leading-none">
                  {stat.value}
                </div>
                <p className="mt-4 text-sm md:text-base opacity-75 leading-relaxed">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------------- Testimonials (light) ---------------- */

const TestimonialsSection = ({ content }: { content: SubPageContent }) => {
  if (!content.testimonials) return null;
  return (
    <section className="relative bg-background text-foreground py-28">
      <div className="container max-w-6xl">
        <SectionLabel n="11" t="Client reviews" />
        <Reveal>
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-[0.95] tracking-tight mb-6 max-w-4xl">
            {content.testimonials.title}
          </h2>
        </Reveal>
        {content.testimonials.intro && (
          <Reveal delay={0.1}>
            <p className="max-w-3xl text-lg opacity-70 leading-relaxed mb-12">
              {content.testimonials.intro}
            </p>
          </Reveal>
        )}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {content.testimonials.items.map((item, idx) => (
            <Reveal key={idx} delay={idx * 0.06}>
              <figure className="flex flex-col h-full rounded-3xl border border-foreground/10 bg-foreground/[0.02] p-8 hover:border-[#FF2E86]/40 transition">
                <span className="font-display text-6xl leading-none text-[#FF2E86] mb-4 select-none">
                  &ldquo;
                </span>
                <blockquote className="text-sm md:text-base opacity-80 leading-relaxed">
                  {item.quote}
                </blockquote>
                {item.attribution && (
                  <figcaption className="mt-6 text-xs uppercase tracking-[0.25em] opacity-60">
                    {item.attribution}
                  </figcaption>
                )}
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------------- FAQ (dark) ---------------- */

const FaqsSection = ({ content }: { content: SubPageContent }) => (
  <section className="relative bg-[#0a0a0a] text-white py-28 overflow-hidden">
    <div
      aria-hidden
      className="absolute bottom-0 left-1/4 w-[500px] h-[400px] rounded-full bg-[#FF2E86]/10 blur-[160px] pointer-events-none"
    />
    <div className="container max-w-4xl relative">
      <SectionLabel n="12" t="FAQs" />
      <Reveal>
        <h2 className="font-display text-4xl md:text-6xl font-bold leading-[0.95] tracking-tight mb-12">
          {content.faqsTitle ?? (
            <>
              Frequently asked{" "}
              <span className="text-[#FF2E86]">questions.</span>
            </>
          )}
        </h2>
      </Reveal>
      <div className="space-y-4">
        {content.faqs.map((faq, idx) => (
          <Reveal key={faq.question} delay={idx * 0.05}>
            <details className="group rounded-3xl border border-white/10 bg-white/[0.03] px-7 py-1 transition hover:border-[#FF2E86]/40">
              <summary className="cursor-pointer list-none flex items-center justify-between gap-6 py-6">
                <span className="font-display text-lg md:text-xl pr-4">
                  {faq.question}
                </span>
                <span className="shrink-0 w-8 h-8 rounded-full border border-white/20 grid place-items-center text-base group-open:rotate-45 group-open:border-[#FF2E86] group-open:text-[#FF2E86] transition-all">
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

/* ---------------- Final CTA (light) ---------------- */

const CtaBottom = ({ content }: { content: SubPageContent }) => (
  <section className="relative bg-background text-foreground py-32 overflow-hidden">
    <motion.div
      aria-hidden
      className="absolute inset-0 grid place-items-center pointer-events-none"
    >
      <span className="font-display text-[22vw] leading-none opacity-[0.04] tracking-tighter select-none whitespace-nowrap">
        READY
      </span>
    </motion.div>
    <div
      aria-hidden
      className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-[#FF2E86]/15 blur-[160px] pointer-events-none"
    />
    <div className="container relative max-w-5xl text-center">
      <Reveal>
        <p className="text-[10px] uppercase tracking-[0.4em] opacity-60 mb-8">
          [ Ready when you are ]
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="font-display text-5xl md:text-8xl font-bold leading-[0.95] tracking-tight max-w-4xl mx-auto">
          {content.ctaBottom.title}
        </h2>
      </Reveal>
      <Reveal delay={0.22}>
        <p className="mt-10 text-lg md:text-xl opacity-70 max-w-2xl mx-auto leading-relaxed">
          {content.ctaBottom.description}
        </p>
      </Reveal>
      <Reveal delay={0.32}>
        <div className="mt-12 flex flex-wrap gap-4 justify-center">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 bg-foreground text-background px-7 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:bg-[#FF2E86] hover:text-white transition-colors"
          >
            {content.ctaBottom.cta}
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          {content.ctaBottom.cta2 && (
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 border border-foreground/20 text-foreground px-7 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:bg-[#FF2E86] hover:text-white hover:border-[#FF2E86] transition-colors"
            >
              {content.ctaBottom.cta2}
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          )}
        </div>
      </Reveal>
    </div>
  </section>
);

/* ---------------- Page ---------------- */

export function ServiceSubPage({
  service,
  content,
}: {
  service: MainServiceInfo;
  content: SubPageContent;
}) {
  useSmoothScroll();

  return (
    <div className="theme-light w-full overflow-x-clip bg-background text-foreground">
      <main>
        <SubHero service={service} content={content} />
        {content.stats && <StatsSection content={content} />}
        <CtaTop content={content} />
        <About content={content} />
        <ServicesSection content={content} />
        <ProcessSection content={content} />
        <WhySection content={content} />
        <ResultsSection content={content} />
        <RealResultsSection content={content} />
        <IndustriesSection content={content} />
        <ToolsSection content={content} />
        <TestimonialsSection content={content} />
        <FaqsSection content={content} />
        <CtaBottom content={content} />
      </main>
    </div>
  );
}
