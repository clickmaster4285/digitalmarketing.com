"use client";

import { useRef } from "react";
import { notFound, useParams } from "next/navigation";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import Link from "next/link";

import {
  Code2, Gauge, ShieldCheck, Plug, Search, Server, ShoppingBag, Layers,
  Rocket, ArrowUpRight, Check, Cpu, Database, Globe, Sparkles,
  Beaker, Network, TrendingUp, Zap, RefreshCw, MessageSquare,
  Camera, FileText, GitBranch, Target, BarChart3, Shuffle, Eye,
  TrendingDown, PieChart, FileEdit, Mail, ShoppingCart, Megaphone, Smartphone,
} from "lucide-react";

import { SERVICE_CATEGORIES } from "@/content/services/serviceCategories";





import SchemaMarkup from "@/components/landingPage/SchemaMarkup";

const routedPageRegistry: Record<string, any> = {};


const RelatedServiceLinks = ({
  parentSlug,
  slug,
}: {
  parentSlug: string;
  slug: string;
}) => {
  const category = SERVICE_CATEGORIES.find((item) =>
    item.items.some((service) => service.href === `/${parentSlug}/${slug}`),
  );
  const relatedServices = category?.items.filter(
    (service) => service.href !== `/${parentSlug}/${slug}`,
  );

  if (!category || !relatedServices?.length) return null;

  return (
    <section className="bg-background px-5 py-16 text-foreground sm:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-3xl font-semibold">
          Related {category.title} services
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {relatedServices.map((service) => (
            <li key={service.href}>
              <Link
                href={service.href}
                className="block rounded-xl border border-foreground/10 px-5 py-4 text-sm transition-colors hover:border-primary/40 hover:text-primary"
              >
                {service.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

/* ---------- Reusable bits ---------- */

const Reveal = ({ children, delay = 0, y = 30 }: any) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const SectionLabel = ({ n, t }: { n: string; t: string }) => (
  <div className="flex items-center gap-3 mb-6">
    <span className="text-[10px] uppercase tracking-[0.4em] opacity-60">[ {n} ]</span>
    <span className="h-px w-10 bg-foreground/30" />
    <span className="text-[10px] uppercase tracking-[0.4em] opacity-60">{t}</span>
  </div>
);

const getIcon = (iconName: string) => {
  const icons: Record<string, any> = {
    Beaker, Database, Network, TrendingUp, Zap, RefreshCw,
    Cpu, MessageSquare, Camera, FileText, GitBranch, Target,
    BarChart3, Shuffle, Eye, Rocket, TrendingDown, PieChart, 
    FileEdit, Mail, ShoppingCart, Megaphone, Smartphone, Globe,
  };
  const Icon = icons[iconName] || Cpu;
  return Icon;
};

/* ---------- HERO with parallax ---------- */

const Hero = ({ content }: { content: any }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const heroContent = content.hero;

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-[#0a0a0a] text-white pt-32 pb-20">
      <motion.div
        aria-hidden
        style={{ y: y1, scale }}
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
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full blur-[180px] opacity-30"
      >
        <div className="w-full h-full rounded-full bg-[#FF2E86]" />
      </motion.div>

      <motion.div style={{ opacity }} className="container relative">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.4em] opacity-60 mb-6">
            {heroContent.tag}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="font-display text-5xl md:text-8xl font-bold leading-[0.95] tracking-tight">
            {heroContent.title} <br />
            <span className="text-[#FF2E86]">{heroContent.titleHighlight}</span>
            <br className="hidden md:block" /> {heroContent.subtitle}
          </h1>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-10 max-w-2xl text-lg md:text-xl opacity-70 leading-relaxed">
            {heroContent.description}
          </p>
        </Reveal>

        <Reveal delay={0.35}>
          <div className="mt-12 flex flex-wrap gap-4">
            <a
              href="/contact"
              className="group inline-flex items-center gap-3 bg-white text-black px-7 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:bg-[#FF2E86] hover:text-white transition-colors"
            >
              Free consultation
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#stack"
              className="inline-flex items-center gap-3 border border-white/20 px-7 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:border-white/60 transition-colors"
            >
              See our stack
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.5}>
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 pt-10">
            {heroContent.stats.map((s: any) => (
              <div key={s.v}>
                <p className="font-display text-3xl md:text-5xl">{s.k}</p>
                <p className="text-[10px] uppercase tracking-[0.3em] opacity-60 mt-2">{s.v}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </motion.div>
    </section>
  );
};

/* ---------- Intro / promise ---------- */

const Intro = ({ content }: { content: any }) => {
  const introContent = content.intro;

  // Helper for problem text (pink color)
  const renderProblemText = (text: any) => {
    if (!text) return null;
    if (Array.isArray(text)) {
      return text.map((part: any, idx: number) => (
        <span
          key={idx}
          className={part.type === "highlight" ? "text-[#FF2E86]" : ""}
        >
          {part.text}
        </span>
      ));
    }
    return text;
  };

  // Helper for solution & promise text (bold only)
  const renderBoldText = (text: any) => {
    if (!text) return null;
    if (Array.isArray(text)) {
      return text.map((part: any, idx: number) => (
        <span
          key={idx}
          className={part.type === "highlight" ? "font-bold" : ""}
        >
          {part.text}
        </span>
      ));
    }
    return text;
  };

  return (
    <section className="relative bg-background text-foreground py-10">
      <div className="container max-w-5xl">
        <SectionLabel n="02" t="The gap" />
        <Reveal>
          <p className="font-display text-3xl md:text-5xl leading-[1.15] tracking-tight">
            {renderProblemText(introContent.problem)}
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-10 text-lg opacity-70 max-w-3xl leading-relaxed">
            {renderBoldText(introContent.solution)}
          </p>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-6 text-lg opacity-70 max-w-3xl leading-relaxed">
            {renderBoldText(introContent.promise)}
          </p>
        </Reveal>
      </div>
    </section>
  );
};

/* ---------- Problem (parallax dark) ---------- */

const Problem = ({ content }: { content: any }) => {
  const problemContent = content.problem;

  // If no problem section OR no items, don't render a scroll-tracked section.
  if (!problemContent || !problemContent.items || problemContent.items.length === 0) {
    return null;
  }

  return <ProblemSection problemContent={problemContent} />;
};

const ProblemSection = ({ problemContent }: { problemContent: any }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const headlineX = useTransform(scrollYProgress, [0, 1],   [-30, 30]);

  return (
    <section ref={ref} className="relative bg-[#0a0a0a] text-white py-32 overflow-hidden">
      <motion.div
        aria-hidden
        style={{ y }}
        className="absolute inset-0 grid place-items-center pointer-events-none"
      >
        <span className="font-display text-[24vw] leading-none opacity-[0.04] tracking-tighter select-none">
          PROBLEM
        </span>
      </motion.div>

      <div className="container relative">
        <SectionLabel n="03" t="The problem" />
        <motion.h2
          style={{ x: headlineX }}
          className="font-display text-4xl md:text-7xl font-bold leading-[0.95] mb-20"
        >
          {problemContent.title}<br />
          <span className="text-[#FF2E86]">{problemContent.titleHighlight}</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6 mb-28">
          {problemContent.items.map((it: any, i: number) => {
            const Icon = getIcon(it.icon);
            return (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-8 hover:border-[#FF2E86]/40 transition-colors"
              >
                <Icon className="w-8 h-8 text-[#FF2E86] mb-6" />
                <h3 className="font-display text-2xl mb-4 leading-tight">{it.title}</h3>
                <p className="text-sm opacity-70 leading-relaxed">{it.body}</p>
              </motion.div>
            );
          })}
        </div>

        {/* After section - only if it exists */}
        {problemContent.afterItems && problemContent.afterItems.length > 0 && (
          <>
            <SectionLabel n="03.5" t="The after" />
            <motion.h2
              style={{ x: headlineX }}
              className="font-display text-4xl md:text-7xl font-bold leading-[0.95] mb-20"
            >
              {problemContent.afterTitle}<br />
              <span className="text-[#FF2E86]">{problemContent.afterHighlight}</span>
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-6">
              {problemContent.afterItems.map((it: any, i: number) => {
                const Icon = getIcon(it.icon);
                return (
                  <motion.div
                    key={it.title}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -6 }}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-8 hover:border-[#FF2E86]/40 transition-colors"
                  >
                    <Icon className="w-8 h-8 text-[#FF2E86] mb-6" />
                    <h3 className="font-display text-2xl mb-4 leading-tight">{it.title}</h3>
                    <p className="text-sm opacity-70 leading-relaxed">{it.body}</p>
                  </motion.div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

/* ---------- Services ---------- */

const ServicesGrid = ({ content }: { content: any }) => {
  const services = content.services;
  
  if (!services || services.length === 0) return null;

  return (
    <section id="stack" className="relative bg-background text-foreground py-32">
      <div className="container">
        <SectionLabel n="04" t="What we build" />
        <Reveal>
          <h2 className="font-display text-4xl md:text-7xl font-bold leading-[0.95] mb-20 tracking-tight">
            Our services<br />
            <span className="text-[#FF2E86]"> built to last.</span>
          </h2>
        </Reveal>

        <div className="space-y-24">
          {services.map((s: any, i: number) => {
            const Icon = getIcon(s.icon);
            const reverse = i % 2 === 1;
            return (
              <div
                key={s.n}
                className={`grid lg:grid-cols-12 gap-10 items-start ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}
              >
                <motion.div
                  initial={{ opacity: 0, x: reverse ? 60 : -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="lg:col-span-5 lg:sticky lg:top-32"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl border border-foreground/15 grid place-items-center bg-foreground/[0.03]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.4em] opacity-60">
                      [ {s.tag} · {s.n} ]
                    </span>
                  </div>
                  <h3 className="font-display text-3xl md:text-5xl leading-[1.05] tracking-tight mb-6">
                    {s.title}
                  </h3>
                  <p className="text-base md:text-lg opacity-70 leading-relaxed">{s.intro}</p>
                </motion.div>

                <div className="lg:col-span-7 space-y-4">
                  {s.blocks.map((b: any, j: number) => (
                    <motion.div
                      key={b.h}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ delay: j * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ y: -4 }}
                      className="group relative rounded-2xl border border-foreground/10 p-7 md:p-9 bg-foreground/[0.02] hover:border-[#FF2E86]/40 hover:bg-foreground/[0.04] transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <Check className="w-5 h-5 mt-1 text-[#FF2E86] shrink-0" />
                        <div>
                          <h4 className="font-display text-xl md:text-2xl mb-3">{b.h}</h4>
                          <p className="text-sm md:text-base opacity-70 leading-relaxed">{b.p}</p>
                        </div>
                      </div>
                      <ArrowUpRight className="absolute top-6 right-6 w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0 transition-all" />
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ---------- Case studies ---------- */

const Cases = ({ content }: { content: any }) => {
  const cases = content.cases;
  
  if (!cases || cases.length === 0) return null;

  return <CasesSection cases={cases} />;
};

const CasesSection = ({ cases }: { cases: any[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={ref} className="relative bg-[#0a0a0a] text-white py-32 overflow-hidden">
      <motion.div
        aria-hidden
        style={{ y }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[160px] opacity-25 bg-[#FF2E86] pointer-events-none"
      />
      <div className="container relative">
        <SectionLabel n="05" t="Client results" />
        <Reveal>
          <h2 className="font-display text-4xl md:text-7xl font-bold leading-[0.95] mb-20 tracking-tight">
            Client results<br /><span className="text-[#FF2E86]">in practice.</span>
          </h2>
        </Reveal>

        <div className="space-y-8">
          {cases.map((c: any, i: number) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="grid md:grid-cols-12 gap-8 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur p-8 md:p-12 hover:border-[#FF2E86]/40 transition-colors"
            >
              <div className="md:col-span-4">
                <p className="text-[10px] uppercase tracking-[0.4em] opacity-60 mb-4">[ {c.tag} ]</p>
                <p className="font-display text-5xl md:text-6xl text-[#FF2E86] leading-none">
                  {c.metric}
                </p>
                <p className="mt-3 text-sm opacity-70">{c.sub}</p>
              </div>
              <div className="md:col-span-8">
                <h3 className="font-display text-2xl md:text-4xl leading-[1.1] mb-5">{c.title}</h3>
                <p className="text-sm md:text-base opacity-70 leading-relaxed">{c.body}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- Why Clickmasters ---------- */

const Why = ({ content }: { content: any }) => {
  const why = content.why;

  if (!why || why.length === 0) return null;

  return (
    <section className="relative bg-background text-foreground py-32">
      <div className="container">
        <SectionLabel n="06" t="Why Clickmasters" />
        <Reveal>
          <h2 className="font-display text-4xl md:text-7xl font-bold leading-[0.95] mb-20 tracking-tight">
            Why teams choose us<br />
            <span className="text-[#FF2E86]">for their projects.</span>
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-6">
          {why?.map((w: any, i: number) => {
            const Icon = w.icon ? getIcon(w.icon) : null;
            return (
              <motion.div
                key={w.h}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-foreground/10 p-8 bg-foreground/[0.02] hover:border-[#FF2E86]/40 transition-colors"
              >
                {Icon && <Icon className="w-8 h-8 mb-5 text-[#FF2E86]" />}
                <h3 className="font-display text-2xl mb-3">{w.h}</h3>
                <p className="text-sm opacity-70 leading-relaxed">{w.p}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ---------- FAQs ---------- */

const Faqs = ({ content }: { content: any }) => {
  const faqs = content.faqs;
  
  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="relative bg-[#0a0a0a] text-white py-32">
      <div className="container max-w-4xl">
        <SectionLabel n="07" t="FAQs" />
        <Reveal>
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-[0.95] mb-16 tracking-tight">
            Frequently asked <span className="text-[#FF2E86]">questions.</span>
          </h2>
        </Reveal>
        <div className="space-y-3">
          {faqs.map((f: any, i: number) => (
            <motion.details
              key={f.q}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.5 }}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] open:border-[#FF2E86]/40 transition-colors"
            >
              <summary className="cursor-pointer list-none flex items-center justify-between gap-6 p-6 md:p-7">
                <span className="font-display text-lg md:text-xl pr-4">{f.q}</span>
                <span className="shrink-0 w-8 h-8 rounded-full border border-white/20 grid place-items-center text-base group-open:rotate-45 group-open:border-[#FF2E86] group-open:text-[#FF2E86] transition-all">
                  +
                </span>
              </summary>
              <div className="px-6 md:px-7 pb-7 -mt-1 text-sm md:text-base opacity-75 leading-relaxed max-w-3xl">
                {f.a}
              </div>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- Final CTA ---------- */

const CTA = ({ content }: { content: any }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1.05]), {
    stiffness: 60,
    damping: 22,
  });

  const ctaContent = content.cta;
  const footer = content.footer;

  return (
    <section
      id="contact"
      ref={ref}
      className="relative bg-background text-foreground py-32 overflow-hidden"
    >
      <motion.div
        aria-hidden
        style={{ y }}
        className="absolute inset-0 grid place-items-center pointer-events-none"
      >
        <span className="font-display text-[22vw] leading-none opacity-[0.04] tracking-tighter select-none">
          READY
        </span>
      </motion.div>

      <motion.div style={{ scale }} className="container relative max-w-5xl text-center">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.4em] opacity-60 mb-8">
            [ 08 ] Ready when you are
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl md:text-8xl font-bold leading-[0.95] tracking-tight">
            {ctaContent.title}
          </h2>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-10 text-lg md:text-xl opacity-70 max-w-2xl mx-auto leading-relaxed">
            {ctaContent.description}
          </p>
        </Reveal>
        <Reveal delay={0.35}>
          <div className="mt-12 flex flex-wrap gap-4 justify-center">
            <a
              href='/contact'
              className="group inline-flex items-center gap-3 bg-foreground text-background px-7 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:bg-[#FF2E86] hover:text-white transition-colors"
            >
              Get started
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            {/* <a
              href='/contact'
              className="inline-flex items-center gap-3 border border-foreground/20 px-7 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:border-foreground/60 transition-colors"
            >
              Talk to an expert
            </a> */}
          </div>
        </Reveal>
        <Reveal delay={0.5}>
          <p className="mt-16 text-xs uppercase tracking-[0.3em] opacity-50">
            {footer.company} · Serving {footer.regions}
          </p>
          <p className="mt-3 text-xs opacity-50">
            {footer.author}
          </p>
        </Reveal>
      </motion.div>
    </section>
  );
};

/* ---------- Main Page Component ---------- */

export default function ServicesPage({
  slugOverride,
  content,
}: {
  slugOverride?: string;
  /** This page's entry from serviceContentRegistry, resolved on the server. */
  content?: any;
}) {
  const params = useParams();
  const slug = slugOverride ?? (params?.slug as string);
  const parentSlug = params?.services as string;
  useSmoothScroll();

  const RoutedPage = routedPageRegistry[slug || ""];
  if (!content) notFound();

  // <title> and meta description come from the route's generateMetadata.

  if (RoutedPage) return <RoutedPage />;

  return (
    <div className="theme-light w-full overflow-x-clip bg-background text-foreground">
          <SchemaMarkup schema={content.schema} slug={slug} faqs={content.faqs} />
      <main>
        <Hero content={content} />
        <Intro content={content} />
        <Problem content={content} />
        <ServicesGrid content={content} />
        <RelatedServiceLinks parentSlug={parentSlug} slug={slug} />
        <Cases content={content} />
        <Why content={content} />
        <Faqs content={content} />
        <CTA content={content} />
          </main>
         
    </div>
  );
}
