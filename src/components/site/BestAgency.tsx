"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useEffect, useState, type ReactNode, type MouseEvent, useMemo } from "react";
import { ArrowRight, BarChart3, Target, Shield, TrendingUp } from "lucide-react";

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const stats = [
  { value: "3,500+", label: "Client Accounts Served" },
  { value: "$120M+", label: "Ad Spend Managed" },
  { value: "4.9/5", label: "Client Rating" },
];

const features = [
  {
    icon: <Target className="h-4 w-4" />,
    title: "Custom Strategies",
    description: "No one-size-fits-all packages. Every plan is built around your unique business goals.",
  },
  {
    icon: <BarChart3 className="h-4 w-4" />,
    title: "Transparent Reporting",
    description: "Know exactly what's working and why with clear, honest performance dashboards.",
  },
  {
    icon: <Shield className="h-4 w-4" />,
    title: "Full-Service Agency",
    description: "From SEO and PPC to social media and web design  everything under one roof.",
  },
  {
    icon: <TrendingUp className="h-4 w-4" />,
    title: "Proven Results",
    description: "Combined strategies across channels that drive more leads, revenue, and growth.",
  },
];

const tickerBadges = [
  "SEO & Content Strategy",
  "Paid Media Management",
  "Web Design & Development",
  "Conversion Rate Optimization",
  "Marketing Analytics",
];

/* ---------------------------------------------------------------------- */
/* Marquee  optimized with will-change and hardware acceleration */
/* ---------------------------------------------------------------------- */

function Marquee({
  items,
  direction = "left",
  duration = 26,
}: {
  items: string[];
  direction?: "left" | "right";
  duration?: number;
}) {
  const track = useMemo(() => [...items, ...items, ...items], [items]);
  
  return (
    <div
      className="group/marquee relative overflow-hidden border-y border-border py-3"
      style={{
        maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div
        className="ba-marquee flex w-max items-center gap-8 whitespace-nowrap text-xs uppercase tracking-[0.15em] text-muted-foreground"
        style={{
          animation: `marquee-${direction} ${duration}s linear infinite`,
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      >
        {track.map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            {item}
            <span className="text-foreground/25">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Count-up stat  optimized with useMemo */
/* ---------------------------------------------------------------------- */

function CountStat({ value, start }: { value: string; start: boolean }) {
  // Digits may contain thousands separators ("3,500+").
  const match = useMemo(() => value.match(/^(\D*)(\d[\d,]*)(.*)$/), [value]);
  if (!match) return <>{value}</>;
  const [, prefix, digits, suffix] = match;
  const target = parseInt(digits.replace(/,/g, ""), 10);
  const grouped = digits.includes(",");

  return (
    <StatNumber prefix={prefix} target={target} suffix={suffix} start={start} grouped={grouped} />
  );
}

function StatNumber({
  prefix,
  target,
  suffix,
  start,
  grouped = false,
}: {
  prefix: string;
  target: number;
  suffix: string;
  start: boolean;
  grouped?: boolean;
}) {
  return (
    <span className="tabular-nums" data-counter="true">
      <AnimatedDigits prefix={prefix} target={target} suffix={suffix} start={start} grouped={grouped} />
    </span>
  );
}

function AnimatedDigits({
  prefix,
  target,
  suffix,
  start,
  grouped = false,
}: {
  prefix: string;
  target: number;
  suffix: string;
  start: boolean;
  grouped?: boolean;
}) {
  const [display, setDisplay] = useState(target);

  useEffect(() => {
    if (!start) return;

    setDisplay(0);
    const controls = animate(0, target, {
      type: "spring",
      stiffness: 60,
      damping: 18,
      onUpdate: (current) => setDisplay(Math.round(current)),
    });
    return () => controls.stop();
  }, [start, target]);

  const shown = grouped ? display.toLocaleString("en-US") : String(display);
  return <span>{`${prefix}${shown}${suffix}`}</span>;
}

/* ---------------------------------------------------------------------- */
/* Magnetic CTA button  optimized with useCallback */
/* ---------------------------------------------------------------------- */

function MagneticButton({ children, href }: { children: ReactNode; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 18, mass: 0.45 });
  const springY = useSpring(y, { stiffness: 180, damping: 18, mass: 0.45 });

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const nextX = clamp((e.clientX - rect.left - rect.width / 2) * 0.25, -18, 18);
    const nextY = clamp((e.clientY - rect.top - rect.height / 2) * 0.35, -18, 18);

    x.set(nextX);
    y.set(nextY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY, willChange: "transform" }}
      className="group inline-flex items-center gap-3 rounded-full bg-foreground pl-7 pr-3 py-3.5 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
    >
      {children}
    </motion.a>
  );
}

/* ---------------------------------------------------------------------- */

export const BestAgencySection = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothPointerX = useSpring(pointerX, { stiffness: 120, damping: 22, mass: 0.7 });
  const smoothPointerY = useSpring(pointerY, { stiffness: 120, damping: 22, mass: 0.7 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const blobY1 = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const blobY2 = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const handlePointerMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = ((event.clientX - rect.left) / rect.width - 0.5) * 18;
    const offsetY = ((event.clientY - rect.top) / rect.height - 0.5) * 18;

    pointerX.set(clamp(offsetX, -16, 16));
    pointerY.set(clamp(offsetY, -16, 16));
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const headline = useMemo(() => "Best Digital Marketing Agency for".split(" "), []);
  const customEase: any = [0.22, 1, 0.36, 1];
  const customEaseSoft: any = [0.24, 1.4, 0.5, 1];

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.06, delayChildren: 0.15 },
    },
  };
  const word = {
    hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: customEase },
    },
  };

  const rightContainer = {
    hidden: { opacity: 0, x: 60 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: customEase,
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  const rightItem = {
    hidden: { opacity: 0, x: 40 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: customEase },
    },
  };

  // Colors matching the Industries section
  const cardColors = [
    "bg-[#F0FFF4]",
    "bg-[#FFF1F1]",
    "bg-[#F0F4FF]",
    "bg-[#FFF7E6]",
    "bg-[#F5F0FF]",
    "bg-[#FFEAF0]",
  ];

  return (
    <section
      ref={ref}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      className="relative overflow-hidden border-t border-border bg-background py-28"
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .ba-marquee { animation: none !important; }
        }
        .ba-marquee {
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
        }
      `}</style>

      {/* Background Elements  parallax-linked to scroll */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          style={{ y: blobY1, x: smoothPointerX, willChange: "transform" }}
          className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-[#F0F4FF]/30 blur-3xl"
        />
        <motion.div
          style={{ y: blobY2, x: smoothPointerY, willChange: "transform" }}
          className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-[#FFF1F1]/20 blur-3xl"
        />
        <motion.div
          style={{ x: smoothPointerX, y: smoothPointerY, willChange: "transform" }}
          className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F5F0FF]/20 blur-3xl"
        />
      </div>

      {/* Grain Texture */}
      <div className="grain absolute inset-0 -z-5 opacity-20" />

      {/* Top ticker  Left to Right */}
      <div className="mb-16">
        <Marquee items={tickerBadges} direction="left" duration={30} />
      </div>

      <div className="container px-4 md:px-0">
        <div className="grid items-center gap-16 lg:grid-cols-12">
          {/* Left Content */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.05, duration: 0.7 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-1.5 text-xs backdrop-blur"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-foreground" />
              Trusted Digital Marketing Agency
            </motion.div>

            <motion.h2
              variants={container}
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
              className="text-balance font-display text-[clamp(2.2rem,6vw,4.5rem)] leading-[1.05] tracking-tight"
            >
              {headline.map((w, i) => (
                <motion.span key={i} variants={word} className="mr-[0.3ch] inline-block">
                  {w}
                </motion.span>
              ))}{" "}
              <motion.span variants={word} className="inline-block font-display italic">
                Business Growth
              </motion.span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.55, duration: 0.8 }}
              className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground"
            >
              Finding the best digital marketing agency means finding a partner that understands
              your business, not just your industry. Clickmasters combines proven strategies
              across SEO, PPC, and social media with transparent reporting, so you always know
              what's working and why.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground"
            >
              As a full-service digital marketing agency, we build custom plans instead of
              one-size-fits-all packages, helping businesses of every size generate more leads
              and revenue. Whether you're a small business or an established brand, our team is
              built to drive real, measurable growth.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.85, duration: 0.7 }}
              className="mt-10 flex flex-wrap items-center gap-6"
            >
              <MagneticButton href="/contact">
                Contact Us
                <span className="grid h-9 w-9 place-items-center rounded-full bg-background text-foreground transition-transform duration-300 group-hover:rotate-45">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </MagneticButton>
              <a href="#services" className="text-sm underline underline-offset-4">
                Explore our services
              </a>
            </motion.div>
          </div>

          {/* Right Side - Stats & Features - Slide in from right */}
          <motion.div
            variants={rightContainer}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="space-y-8 lg:col-span-5"
          >
            {/* Stats Grid */}
            <motion.div variants={rightItem} className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 16, scale: 0.94 }}
                  animate={
                    isInView
                      ? { opacity: 1, y: 0, scale: 1 }
                      : { opacity: 0, y: 16, scale: 0.94 }
                  }
                  transition={{
                    delay: 0.35 + index * 0.08,
                    duration: 0.5,
                    ease: [0.24, 1.4, 0.5, 1],
                  }}
                  whileHover={{ y: -4 }}
                  className={`rounded-2xl border border-border p-5 text-center backdrop-blur transition-colors duration-300 hover:border-foreground/20 ${cardColors[index % cardColors.length]}`}
                >
                  <div className="font-display text-2xl font-bold text-zinc-900 md:text-3xl">
                    <CountStat value={stat.value} start={isInView} />
                  </div>
                  <div className="mt-1 text-xs text-zinc-700/70">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Feature list  numbered, matching the "01 ↗" pattern on site */}
            <motion.div variants={rightItem}>
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                  transition={{ delay: 0.45 + index * 0.1, duration: 0.6 }}
                  className={`group flex items-center gap-4 rounded-xl border border-border p-4 transition-colors duration-300 hover:border-foreground/20 ${cardColors[(index + 2) % cardColors.length]}`}
                >
                  <span className="font-mono text-xs text-zinc-700/50">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-shrink-0 rounded-full bg-foreground/10 p-2 text-foreground transition-colors duration-300 group-hover:bg-foreground group-hover:text-background">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-zinc-900">{feature.title}</h3>
                    <p className="text-xs text-zinc-700/70">{feature.description}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 -translate-x-1 text-zinc-700/0 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-0 group-hover:rotate-[-45deg] group-hover:text-foreground" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom ticker  Right to Left (opposite direction) */}
      <div className="mt-16">
        <Marquee
          items={["Strategy", "Execution", "Measurement", "Optimization", "Growth"]}
          direction="right"
          duration={34}
        />
      </div>
    </section>
  );
};