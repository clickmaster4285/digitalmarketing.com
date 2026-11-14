"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import {
  ExternalLink,
  CheckCircle2,
  Users,
  Target,
  Award,
  TrendingUp,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const reasons = [
  {
    icon: <Users className="h-5 w-5" />,
    num: "01",
    title: "Full-Service Team",
    description:
      "SEO, PPC, social media, web design, and content  all under one roof. No juggling five agencies.",
  },
  {
    icon: <Award className="h-5 w-5" />,
    num: "02",
    title: "10+ Years of Experience",
    description:
      "Hands-on experience across multiple industries and platforms, not theory from a case study deck.",
  },
  {
    icon: <TrendingUp className="h-5 w-5" />,
    num: "03",
    title: "Transparent Reporting",
    description: "So you always know what's working, what isn't, and what we're doing about it.",
  },
  {
    icon: <Target className="h-5 w-5" />,
    num: "04",
    title: "Custom Strategies",
    description: "Built around your goals and your budget  not templated packages sold at scale.",
  },
  {
    icon: <Sparkles className="h-5 w-5" />,
    num: "05",
    title: "Dedicated Point of Contact",
    description: "A real person who knows your business, picks up the phone, and owns your results.",
  },
];

const stats = [
  { value: 10, suffix: "+", label: "Years in Business" },
  { value: 3500, suffix: "+", label: "Client Accounts Served" },
  { value: 5, suffix: "", label: "Ad Platforms Managed" },
  { value: 5, suffix: "", label: "Core Services, One Team" },
];

const processSteps = [
  {
    n: "01",
    title: "Discovery",
    description: "We start by learning your business, your goals, and your competitors.",
  },
  {
    n: "02",
    title: "Strategy",
    description: "We build a custom marketing plan across the channels that move the needle fastest.",
  },
  {
    n: "03",
    title: "Execution",
    description: "Our specialists implement, launch, and manage every part of your campaign.",
  },
  {
    n: "04",
    title: "Reporting & Optimization",
    description: "We track performance closely and adjust continuously, so your budget works harder.",
  },
];

const marqueeItems = [
  "Full-Service Digital Marketing",
  "10+ Years of Experience",
  "3,500+ Client Accounts Served",
  "Google · Meta · LinkedIn · TikTok · Amazon",
  "Custom Strategies, Not Templates",
];

/* ------------------------------------------------------------------ */
/*  Motion variants                                                    */
/* ------------------------------------------------------------------ */

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: "110%" },
  visible: {
    opacity: 1,
    y: "0%",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* ------------------------------------------------------------------ */
/*  Small building blocks                                              */
/* ------------------------------------------------------------------ */

/** Headline that reveals word-by-word from behind a mask */
function KineticHeadline({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <motion.h1
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className={className}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={i}>
          <span className="inline-block overflow-hidden pb-1 mr-[0.28em] align-top">
            <motion.span variants={wordVariants} className="inline-block">
              {word}
            </motion.span>
          </span>
          {" "}
        </span>
      ))}
    </motion.h1>
  );
}

/** Counts up from 0 to `value` once it scrolls into view */
function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView) return;

    setDisplay(0);
    const controls = animate(0, value, {
      type: "spring",
      damping: 24,
      stiffness: 80,
      onUpdate: (current) => setDisplay(Math.round(current)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums" data-counter="true">
      {display.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

/** Infinite horizontal ticker */
function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-border py-4">
      <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-10">
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-10 shrink-0">
            <span className="font-display text-2xl md:text-3xl italic text-foreground/80 whitespace-nowrap">
              {item}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-foreground/30 shrink-0" />
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

/** Magnetic-ish CTA pill button, shared across sections */
function CTAButton({ children, href = "/contact" }: { children: React.ReactNode; href?: string }) {
  return (
    <a
      href={href}
      className="group inline-flex items-center gap-3 rounded-full bg-foreground text-background pl-7 pr-3 py-3.5 text-sm font-medium hover:opacity-90 transition-all"
    >
      {children}
      <span className="grid place-items-center w-9 h-9 rounded-full bg-background text-foreground transition-transform duration-300 group-hover:rotate-45">
        <ExternalLink className="w-4 h-4" />
      </span>
    </a>
  );
}

/** Rotating circular badge  the page's signature element */
function OrbitBadge() {
  const label = "GROWTH PARTNER • EST. 10+ YEARS • CLICKMASTERS • ";
  const chars = label.split("");
  const radius = 62;

  return (
    <div className="relative hidden md:flex h-40 w-40 items-center justify-center shrink-0">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      >
        <svg viewBox="0 0 140 140" className="h-full w-full">
          <g fontSize="9" letterSpacing="1" fill="currentColor" className="text-muted-foreground">
            {chars.map((char, i) => {
              const angle = (i / chars.length) * 2 * Math.PI - Math.PI / 2;
              const x = 70 + radius * Math.cos(angle);
              const y = 70 + radius * Math.sin(angle);
              const rotate = (angle * 180) / Math.PI + 90;
              return (
                <text key={i} x={x} y={y} transform={`rotate(${rotate} ${x} ${y})`} textAnchor="middle">
                  {char}
                </text>
              );
            })}
          </g>
        </svg>
      </motion.div>
      <div className="relative grid h-16 w-16 place-items-center rounded-full bg-foreground text-background">
        <Sparkles className="h-6 w-6" />
      </div>
    </div>
  );
}

/** Flip card used in the "Why Choose Us" grid */
function FlipCard({ reason }: { reason: (typeof reasons)[number] }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="group h-56 [perspective:1200px]"
    >
      <div className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* Front */}
        <div className="absolute inset-0 rounded-2xl border border-border bg-background/50 backdrop-blur-sm p-6 flex flex-col justify-between [backface-visibility:hidden]">
          <div className="flex items-start justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground/10 text-foreground">
              {reason.icon}
            </div>
            <span className="font-display text-xs text-muted-foreground">{reason.num}</span>
          </div>
          <div>
            <h3 className="font-display text-lg font-medium">{reason.title}</h3>
            <p className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
              Hover to read more <ArrowUpRight className="h-3 w-3" />
            </p>
          </div>
        </div>
        {/* Back */}
        <div className="absolute inset-0 rounded-2xl border border-border bg-foreground text-background p-6 flex flex-col justify-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <span className="font-display text-xs opacity-60 mb-2">{reason.num}</span>
          <h3 className="font-display text-lg font-medium mb-2">{reason.title}</h3>
          <p className="text-sm opacity-80 leading-relaxed">{reason.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export const AboutPageContent = () => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[520px] w-[520px] rounded-full bg-foreground/10 blur-[140px]"
      />

      <div className="container relative">
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto text-center mb-16 relative">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-foreground animate-pulse" />
                About Us
              </span>
            </motion.div>
          </motion.div>

          <KineticHeadline
            text="Clickmasters  Your Growth Partner"
            className="font-display text-5xl md:text-8xl leading-[0.95] text-balance"
          />

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.5 }}
            className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
          >
            A full-service digital marketing agency helping businesses grow their online presence,
            generate leads, and increase revenue. For more than 10 years, we've built strategies
            that actually deliver results.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.65 }}
            className="mt-8 flex justify-center"
          >
            <CTAButton>Get a Free Consultation</CTAButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="absolute -right-4 top-0 md:-right-10"
          >
            <OrbitBadge />
          </motion.div>
        </div>

        {/* Marquee */}
        <div className="mb-20">
          <Marquee items={marqueeItems} />
        </div>

        {/* Who We Are */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid md:grid-cols-12 gap-12 mb-20"
        >
          <div className="md:col-span-5">
            <motion.span variants={fadeInUp} className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Who We Are
            </motion.span>
            <motion.h2 variants={fadeInUp} className="font-display text-4xl md:text-5xl leading-[1.05] mt-4">
              A Team of <em className="font-display italic">Experts</em> Under One Roof
            </motion.h2>
          </div>
          <div className="md:col-span-7 space-y-4">
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground leading-relaxed">
              We are a team of SEO specialists, paid advertising experts, web designers, content
              strategists, and social media managers working together under one roof. Instead of
              juggling multiple freelancers or agencies, our clients get a single team that
              understands their whole business  website, search rankings, ads, content, and social
              media  and makes sure every part works together.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground leading-relaxed">
              We work across every major platform, including Google, Meta (Facebook & Instagram),
              LinkedIn, TikTok, and Amazon, and we serve clients across a wide range of industries,
              from retail and healthcare to real estate, professional services, and e-commerce.
            </motion.p>
          </div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-border mb-20 bg-border"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="bg-background px-6 py-10 text-center"
            >
              <div className="font-display text-4xl md:text-5xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <motion.span variants={fadeInUp} className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Why Choose Us
            </motion.span>
            <motion.h2 variants={fadeInUp} className="font-display text-4xl md:text-5xl leading-[1.05] mt-4">
              Why Businesses Choose <em className="font-display italic">Clickmasters</em>
            </motion.h2>
            <motion.p variants={fadeInUp} className="mt-3 text-sm text-muted-foreground">
              Hover a card to flip it.
            </motion.p>
          </div>

          <motion.div variants={staggerContainer} className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {reasons.map((reason, index) => (
              <FlipCard key={index} reason={reason} />
            ))}
          </motion.div>
        </motion.div>

        {/* Experience */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid md:grid-cols-12 gap-12 mb-20"
        >
          <div className="md:col-span-5">
            <motion.span variants={fadeInUp} className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Our Experience
            </motion.span>
            <motion.h2 variants={fadeInUp} className="font-display text-4xl md:text-5xl leading-[1.05] mt-4">
              10+ Years of <em className="font-display italic">Proven</em> Results
            </motion.h2>
          </div>
          <div className="md:col-span-7 space-y-4">
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground leading-relaxed">
              Over the past 10+ years, we've managed campaigns for 3,500+ client accounts across a wide range
              of industries. Our team includes certified specialists, so every strategy we build is
              backed by real, up-to-date platform knowledge  not guesswork.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground leading-relaxed">
              We've helped businesses improve their search visibility, generate more qualified
              leads, and grow their online presence  with strategies built around what actually
              works for their industry and audience, not generic templates.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground leading-relaxed">
              We don't believe in one-size-fits-all marketing. Every business we work with gets
              research-backed, custom-built strategies designed around their specific goals,
              audience, and budget.
            </motion.p>
          </div>
        </motion.div>

        {/* Mission & How We Work */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-12 mb-20"
        >
          {/* Mission */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -4 }}
            className="rounded-2xl border border-border bg-background/30 p-8 backdrop-blur-sm transition-all"
          >
            <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Our Mission</span>
            <h3 className="font-display text-3xl md:text-4xl leading-[1.05] mt-4 mb-4">
              Turning <em className="font-display italic">Marketing Spend</em> Into Results
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Our mission is simple: help businesses grow by turning marketing spend into
              measurable results  more traffic, more leads, and more sales. We measure our success
              by our clients' success.
            </p>
          </motion.div>

          {/* How We Work */}
          <motion.div
            variants={fadeInUp}
            className="rounded-2xl border border-border bg-background/30 p-8 backdrop-blur-sm"
          >
            <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">How We Work</span>
            <h3 className="font-display text-3xl md:text-4xl leading-[1.05] mt-4 mb-6">
              Our <em className="font-display italic">Process</em>
            </h3>
            <div className="relative space-y-1">
              <div className="absolute left-[15px] top-2 bottom-2 w-px bg-border" aria-hidden />
              {processSteps.map((step) => (
                <div key={step.n} className="group relative flex items-start gap-4 py-3">
                  <div className="relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border bg-background font-display text-xs transition-colors group-hover:bg-foreground group-hover:text-background">
                    {step.n}
                  </div>
                  <div className="pt-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-medium">{step.title}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="text-center"
        >
          <div className="relative overflow-hidden rounded-3xl border border-border bg-foreground text-background p-12 md:p-16">
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-background/10 blur-3xl"
            />
            <h3 className="font-display text-4xl md:text-6xl leading-[1.02] text-balance">
              Let's Grow Your Business <em className="font-display italic">Together</em>
            </h3>
            <p className="mt-4 text-lg opacity-70 max-w-2xl mx-auto">
              Whether you're looking to increase website traffic, generate more leads, or build a
              stronger brand online, Clickmasters Digital Marketing is ready to help.
            </p>
            <div className="mt-8 flex justify-center">
              <a
                href="/contact"
                className="group inline-flex items-center gap-3 rounded-full bg-background text-foreground pl-7 pr-3 py-3.5 text-sm font-medium hover:opacity-90 transition-all"
              >
                Get a Free Consultation
                <span className="grid place-items-center w-9 h-9 rounded-full bg-foreground text-background transition-transform duration-300 group-hover:rotate-45">
                  <ExternalLink className="w-4 h-4" />
                </span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};