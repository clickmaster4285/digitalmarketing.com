"use client";

import { useRef } from "react";
import { useParams } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  SeoServicesContent,
  SocialMediaMarketingContent,
  MobileAppDevelopmentContent,
  ConversionRateOptimizationContent,
  ContentMarketingServicesContent,
  AIAutomationServicesContent,
  WebDesignServicesContent,
  PayPerClickManagementContent,
  EcommerceServicesContent
} from "@/content/services/main-services";

import SchemaMarkup from "@/components/landingPage/SchemaMarkup";


const contentMap: Record<string, any> = {
  "search-engine-optimization": SeoServicesContent,
  "social-media-marketing": SocialMediaMarketingContent,
  "mobile-app-development": MobileAppDevelopmentContent,
  "conversion-rate-optimization": ConversionRateOptimizationContent,
  "content-marketing": ContentMarketingServicesContent,
  "ai-automation": AIAutomationServicesContent,
  "web-design-development": WebDesignServicesContent,
  "ecommerce-services": EcommerceServicesContent,
  "pay-per-click": PayPerClickManagementContent,
};

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

const Hero = ({ content }: { content: any }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const heroContent = content.hero;

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-[#0a0a0a] text-white pt-32 pb-20">
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
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full blur-[180px] opacity-30"
      >
        <div className="w-full h-full rounded-full bg-[#FF2E86]" />
      </motion.div>

      <motion.div style={{ opacity }} className="container relative">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.4em] opacity-60 mb-6">{heroContent.tag}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="font-display text-5xl md:text-8xl font-bold leading-[0.95] tracking-tight">
            {heroContent.title} <br />
            <span className="text-[#FF2E86]">{heroContent.titleHighlight}</span>
            <br className="hidden md:block" /> {heroContent.subtitle}
          </h1>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-10 max-w-2xl text-lg md:text-xl opacity-70 leading-relaxed">{heroContent.description}</p>
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
          </div>
        </Reveal>

        <Reveal delay={0.5}>
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 pt-10">
            {heroContent.stats?.map((s: any) => (
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

const Intro = ({ content }: { content: any }) => {
  const introContent = content.intro;

  const renderProblemText = (text: any) => {
    if (!text) return null;
    if (Array.isArray(text)) {
      return text.map((part: any, idx: number) => (
        <span key={idx} className={part.type === "highlight" ? "text-[#FF2E86]" : ""}>
          {part.text}
        </span>
      ));
    }
    return text;
  };

  const renderBoldText = (text: any) => {
    if (!text) return null;
    if (Array.isArray(text)) {
      return text.map((part: any, idx: number) => (
        <span key={idx} className={part.type === "highlight" ? "font-bold" : ""}>
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
          <p className="font-display text-3xl md:text-5xl leading-[1.15] tracking-tight">{renderProblemText(introContent.problem)}</p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-10 text-lg opacity-70 max-w-3xl leading-relaxed">{renderBoldText(introContent.solution)}</p>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-6 text-lg opacity-70 max-w-3xl leading-relaxed">{renderBoldText(introContent.promise)}</p>
        </Reveal>
      </div>
    </section>
  );
};

const Features = ({ content }: { content: any }) => {
  const features = content.features?.items || [];
  if (!features.length) return null;

  return (
    <section className="relative bg-[#0a0a0a] text-white py-24">
      <div className="container max-w-6xl">
        <SectionLabel n="03" t="What we do" />
        <Reveal>
          <h2 className="font-display text-4xl md:text-7xl font-bold leading-[0.95] tracking-tight mb-10">{content.features.title}</h2>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {features.map((item: any, idx: number) => (
            <Reveal key={item.id || idx} delay={idx * 0.08}>
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 hover:border-[#FF2E86]/40 transition">
                <h3 className="font-display text-2xl md:text-3xl mb-4">{item.title}</h3>
                <p className="text-sm md:text-base opacity-70 leading-relaxed">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const TopRatedSection = ({ content }: { content: any }) => {
  const topRated = content.topRated;
  if (!topRated) return null;

  return (
    <section className="relative bg-background text-foreground py-24">
      <div className="container max-w-5xl">
        <SectionLabel n="03.5" t="Top rated" />
        <Reveal>
          <h2 className="font-display text-4xl md:text-7xl font-bold leading-[0.95] tracking-tight mb-8">
            {topRated.title}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-lg opacity-75 leading-relaxed max-w-4xl">{topRated.body}</p>
        </Reveal>
      </div>
    </section>
  );
};

const CtaMidSection = ({ content }: { content: any }) => {
  const ctaMid = content.ctaMid;
  if (!ctaMid) return null;

  return (
    <section className="relative bg-[#0a0a0a] text-white py-24">
      <div className="container max-w-5xl text-center">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.4em] opacity-60 mb-8">[ Growth ]</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-4xl md:text-7xl font-bold leading-[0.95] tracking-tight mb-8">
            {ctaMid.title}
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-lg opacity-75 leading-relaxed max-w-3xl mx-auto">{ctaMid.description}</p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-10 flex justify-center">
            <a
              href={ctaMid.contactLink || "/contact"}
              className="group inline-flex items-center gap-3 bg-white text-black px-7 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:bg-[#FF2E86] hover:text-white transition-colors"
            >
              {ctaMid.buttonText || "Get started"}
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const ProblemSection = ({ content }: { content: any }) => {
  const problem = content.problem;
  if (!problem || !problem.items?.length) return null;

  return (
    <section className="relative bg-background text-foreground py-24">
      <div className="container max-w-6xl">
        <SectionLabel n="04" t="The problem" />
        <Reveal>
          <h2 className="font-display text-4xl md:text-7xl font-bold leading-[0.95] tracking-tight mb-10">
            {problem.title}
            <br />
            <span className="text-[#FF2E86]">{problem.titleHighlight}</span>
          </h2>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {problem.items.map((item: any, idx: number) => (
            <Reveal key={item.title || idx} delay={idx * 0.08}>
              <div className="rounded-3xl border border-foreground/10 bg-foreground/[0.02] p-8">
                <h3 className="font-display text-2xl mb-4">{item.title}</h3>
                <p className="text-sm opacity-70 leading-relaxed">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        {problem.afterItems?.length ? (
          <div className="mt-20">
            <Reveal>
              <h3 className="font-display text-3xl md:text-5xl font-bold mb-8">
                {problem.afterTitle} <span className="text-[#FF2E86]">{problem.afterHighlight}</span>
              </h3>
            </Reveal>
            <div className="grid gap-6 md:grid-cols-3">
              {problem.afterItems.map((item: any, idx: number) => (
                <Reveal key={item.title || idx} delay={idx * 0.08}>
                  <div className="rounded-3xl border border-foreground/10 bg-foreground/[0.02] p-8">
                    <h4 className="font-display text-xl mb-4">{item.title}</h4>
                    <p className="text-sm opacity-70 leading-relaxed">{item.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};

const Services = ({ content }: { content: any }) => {
  const services = content.services || [];
  if (!services.length) return null;

  return (
    <section className="relative bg-[#0a0a0a] text-white py-24">
      <div className="container max-w-6xl">
        <SectionLabel n="05" t="Core services" />
        <Reveal>
          <h2 className="font-display text-4xl md:text-7xl font-bold leading-[0.95] tracking-tight mb-10">What we deliver</h2>
        </Reveal>
        <div className="space-y-20">
          {services.map((service: any, idx: number) => (
            <Reveal key={service.title || idx} delay={idx * 0.08}>
              <div className="grid gap-10 lg:grid-cols-12 items-start">
                <div className="lg:col-span-4">
                  <p className="text-[10px] uppercase tracking-[0.4em] opacity-60 mb-4">[ {service.tag} · {service.n} ]</p>
                  <h3 className="font-display text-3xl md:text-4xl mb-4">{service.title}</h3>
                  <p className="text-sm md:text-base opacity-70 leading-relaxed">{service.intro}</p>
                </div>
                <div className="lg:col-span-8 space-y-6">
                  {service.blocks.map((block: any, blockIdx: number) => (
                    <div key={block.h || blockIdx} className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
                      <h4 className="font-display text-2xl mb-3">{block.h}</h4>
                      <p className="text-sm opacity-70 leading-relaxed">{block.p}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Process = ({ content }: { content: any }) => {
  const timeline = content.process?.timeline || [];
  if (!timeline.length) return null;

  return (
    <section className="relative bg-background text-foreground py-24">
      <div className="container max-w-6xl">
        <SectionLabel n="06" t="The process" />
        <Reveal>
          <h2 className="font-display text-4xl md:text-7xl font-bold leading-[0.95] tracking-tight mb-10">{content.process.title}</h2>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {timeline.map((step: any, idx: number) => (
            <Reveal key={step.title || idx} delay={idx * 0.08}>
              <div className="rounded-3xl border border-foreground/10 bg-foreground/[0.02] p-8">
                <p className="text-sm uppercase tracking-[0.35em] opacity-60 mb-3">{step.month}</p>
                <h3 className="font-display text-2xl mb-4">{step.title}</h3>
                <p className="text-base opacity-70 leading-relaxed">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Cases = ({ content }: { content: any }) => {
  const cases = content.cases || [];
  if (!cases.length) return null;

  return (
    <section className="relative bg-[#0a0a0a] text-white py-24">
      <div className="container max-w-6xl">
        <SectionLabel n="07" t="Client results" />
        <Reveal>
          <h2 className="font-display text-4xl md:text-7xl font-bold leading-[0.95] tracking-tight mb-10">Client results that matter</h2>
        </Reveal>
        <div className="space-y-8">
          {cases.map((item: any, idx: number) => (
            <Reveal key={item.title || idx} delay={idx * 0.08}>
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-10">
                <p className="text-[10px] uppercase tracking-[0.35em] opacity-60 mb-4">{item.tag}</p>
                <p className="font-display text-5xl text-[#FF2E86] leading-none mb-4">{item.metric}</p>
                <p className="text-sm uppercase tracking-[0.35em] opacity-60 mb-4">{item.sub}</p>
                <h3 className="font-display text-2xl mb-4">{item.title}</h3>
                <p className="text-sm opacity-70 leading-relaxed">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Why = ({ content }: { content: any }) => {
  const whyItems = content.why || [];
  if (!whyItems.length) return null;

  return (
    <section className="relative bg-background text-foreground py-24">
      <div className="container max-w-6xl">
        <SectionLabel n="08" t="Why Clickmasters" />
        <Reveal>
          <h2 className="font-display text-4xl md:text-7xl font-bold leading-[0.95] tracking-tight mb-10">Why our clients stay</h2>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {whyItems.map((item: any, idx: number) => (
            <Reveal key={item.h || idx} delay={idx * 0.08}>
              <div className="rounded-3xl border border-foreground/10 bg-foreground/[0.02] p-8">
                <h3 className="font-display text-2xl mb-4">{item.h}</h3>
                <p className="text-sm opacity-70 leading-relaxed">{item.p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Pricing = ({ content }: { content: any }) => {
  const tiers = content.pricing?.tiers || [];
  if (!tiers.length) return null;

  return (
    <section className="relative bg-[#0a0a0a] text-white py-24">
      <div className="container max-w-6xl">
        <SectionLabel n="09" t="Pricing" />
        <Reveal>
          <h2 className="font-display text-4xl md:text-7xl font-bold leading-[0.95] tracking-tight mb-10">{content.pricing.title}</h2>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map((tier: any, idx: number) => (
            <Reveal key={tier.name || idx} delay={idx * 0.08}>
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 hover:border-[#FF2E86]/40 transition">
                <p className="text-sm uppercase tracking-[0.35em] opacity-60 mb-4">{tier.name}</p>
                <p className="text-base opacity-70 leading-relaxed">{tier.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const IndustriesSection = ({ content }: { content: any }) => {
  const industries = content.industries?.items || [];
  if (!industries.length) return null;

  return (
    <section className="relative bg-background text-foreground py-24">
      <div className="container max-w-6xl">
        <SectionLabel n="09.5" t="Industries" />
        <Reveal>
          <h2 className="font-display text-4xl md:text-7xl font-bold leading-[0.95] tracking-tight mb-10">
            {content.industries.title}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-3xl text-lg opacity-75 leading-relaxed mb-10">{content.industries.description}</p>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {industries.map((item: any, idx: number) => (
            <Reveal key={item.id || item.title || idx} delay={idx * 0.08}>
              <div className="rounded-3xl border border-foreground/10 bg-foreground/[0.02] p-8 h-full">
                <h3 className="font-display text-2xl mb-4">{item.title}</h3>
                <p className="text-sm opacity-70 leading-relaxed">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Faqs = ({ content }: { content: any }) => {
  const faqs = content.faqs || [];
  if (!faqs.length) return null;

  return (
    <section className="relative bg-background text-foreground py-24">
      <div className="container max-w-6xl">
        <SectionLabel n="10" t="FAQs" />
        <Reveal>
          <h2 className="font-display text-4xl md:text-7xl font-bold leading-[0.95] tracking-tight mb-10">Frequently asked questions</h2>
        </Reveal>
        <div className="space-y-4">
          {faqs.map((faq: any, idx: number) => (
            <Reveal key={faq.q || idx} delay={idx * 0.05}>
              <details className="group rounded-3xl border border-foreground/10 bg-foreground/[0.02] p-7 transition hover:border-[#FF2E86]/40">
                <summary className="cursor-pointer list-none text-lg md:text-xl font-semibold">{faq.q}</summary>
                <div className="mt-4 text-sm opacity-75 leading-relaxed">{faq.a}</div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = ({ content }: { content: any }) => {
  const ctaContent = content.cta;
  const footer = content.footer;

  return (
    <section id="contact" className="relative bg-[#0a0a0a] text-white py-10 overflow-hidden">
      <div className="container relative max-w-5xl text-center">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.4em] opacity-60 mb-8">[ 11 ] Ready when you are</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl md:text-8xl font-bold leading-[0.95] tracking-tight">{ctaContent.title}</h2>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-10 text-lg md:text-xl opacity-70 max-w-2xl mx-auto leading-relaxed">{ctaContent.description}</p>
        </Reveal>
        <Reveal delay={0.35}>
          <div className="mt-12 flex flex-wrap gap-4 justify-center">
            <a
              href='/contact'
              className="group inline-flex items-center gap-3 bg-white text-black px-7 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:bg-[#FF2E86] hover:text-white transition-colors"
            >
              Get started
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </Reveal>
        {/* <Reveal delay={0.5}>
          <p className="mt-16 text-xs uppercase tracking-[0.3em] opacity-50">{footer.company} · Serving {footer.regions}</p>
          <p className="mt-3 text-xs opacity-50">{footer.author}</p>
        </Reveal> */}
      </div>
    </section>
  );
};
const LocationsSection = ({ content }: { content: any }) => {
  const locations = content.locations?.items || [];
  if (!locations.length) return null;

  return (
    <section className="relative bg-background text-foreground py-24">
      <div className="container max-w-6xl">
        <SectionLabel n="09.7" t="Locations" />
        <Reveal>
          <h2 className="font-display text-4xl md:text-7xl font-bold leading-[0.95] tracking-tight mb-10">
            {content.locations.title}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-3xl text-lg opacity-75 leading-relaxed mb-10">
            {content.locations.description}
          </p>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {locations.map((item: any, idx: number) => (
            <Reveal key={item.id || item.title || idx} delay={idx * 0.05}>
              <div className="group rounded-3xl border border-foreground/10 bg-foreground/[0.02] p-8 h-full transition hover:border-[#FF2E86]/40 hover:bg-foreground/[0.04]">
                <h3 className="font-display text-2xl mb-4">{item.title}</h3>
                <p className="text-sm opacity-70 leading-relaxed">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
export default function ServicesPage() {
  const params = useParams();
  const slug = params?.services as string;
  const content = contentMap[slug];

  return (
    <div className="theme-light w-full overflow-x-clip bg-background text-foreground">
        <SchemaMarkup schema={content.schema} slug={slug} />
      <main>
        <Hero content={content} />
        <Intro content={content} />
        <Features content={content} />
        <TopRatedSection content={content} />
        <ProblemSection content={content} />
        <Services content={content} />
        <Process content={content} />
        <Cases content={content} />
        <Why content={content} />
        <CtaMidSection content={content} />
        <Pricing content={content} />
        <IndustriesSection content={content} />
        <Faqs content={content} />
        <CTA content={content} />
        <LocationsSection content={content} />
      </main>
     
    </div>
  );
}
