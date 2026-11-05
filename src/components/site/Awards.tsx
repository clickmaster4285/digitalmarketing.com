"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const reasons = [
  {
    bg: "#E5B83B",
    logo: "🏆",
    title: "Proven Track Record",
    org: "Years of experience driving measurable growth for clients across industries.",
    pattern: "stars",
  },
  {
    bg: "#6C3DF4",
    logo: "✅",
    title: "Platform Expertise",
    org: "Our team works across paid media, analytics, social, and marketing automation platforms.",
    pattern: "dots",
  },
  {
    bg: "#3DDFB7",
    logo: "📊",
    title: "Transparent Reporting",
    org: "No black-box marketing. You see exactly what we do and the results it drives.",
    pattern: "grid",
    dark: true,
  },
  {
    bg: "#FF6B6B",
    logo: "🎯",
    title: "Custom Strategies",
    org: "No cookie-cutter packages. Every plan is built around your specific goals.",
    pattern: "stars",
    dark: true,
  },
  {
    bg: "#111827",
    logo: "👤",
    title: "Dedicated Account Management",
    org: "A real person you can call, not a ticket number.",
    pattern: "dots",
  },
  {
    bg: "#FFFFFF",
    logo: "📈",
    title: "Data-Driven Approach",
    org: "Every decision backed by analytics, not assumptions.",
    pattern: "grid",
    dark: true,
  },
];

const Pattern = ({ type }: { type: string }) => {
  if (type === "stars") {
    return (
      <div className="absolute inset-0 grid grid-cols-4 gap-3 p-6 opacity-25">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="flex items-center justify-center text-3xl">★</div>
        ))}
      </div>
    );
  }
  if (type === "dots") {
    return (
      <div className="absolute inset-0 grid grid-cols-6 gap-3 p-6 opacity-20">
        {Array.from({ length: 36 }).map((_, i) => (
          <div key={i} className="w-3 h-3 rounded-full bg-current" />
        ))}
      </div>
    );
  }
  return (
    <div className="absolute inset-0 opacity-20"
      style={{
        backgroundImage:
          "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    />
  );
};

export const Awards = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section id="awards" ref={ref} className="relative" style={{ height: `${reasons.length * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center">
        <h2 className="font-display text-5xl md:text-8xl text-center leading-[1.05] mb-4 px-6 z-10 pointer-events-none">
          Why Choose Clickmasters as Your{" "}
          <em className="text-[#FF3B47]">Digital Marketing</em>
          <br />Company
        </h2>

        <p className="text-center max-w-2xl mx-auto text-lg md:text-base text-muted-foreground mb-12 px-6 z-10 pointer-events-none">
          We combine cross-channel expertise, transparent reporting, and dedicated account management with no cookie-cutter packages. Every strategy is custom-built around your business, not a template.
        </p>

        {/* Increased card height from w-[280px] h-[340px] to w-[320px] h-[420px] */}
        <div className="relative w-[320px] h-[420px] md:w-[480px] md:h-[560px]">
          {reasons.map((a, i) => {
            const start = i / reasons.length;
            const end = (i + 1) / reasons.length;
            const mid = (start + end) / 2;

            const y = useTransform(
              scrollYProgress,
              [start, mid, end],
              i === 0 ? [0, 0, 0] : [600, 0, 0]
            );
            const rotate = useTransform(
              scrollYProgress,
              [start, mid, end],
              [i % 2 ? 18 : -18, (i - 2) * 4, (i - 2) * 4]
            );
            const scale = useTransform(
              scrollYProgress,
              [start, mid, end],
              [0.85, 1, 1]
            );

            return (
              <motion.div
                key={i}
                style={{
                  y,
                  rotate,
                  scale,
                  backgroundColor: a.bg,
                  color: a.dark ? "#0a0a0a" : "#fff",
                  zIndex: i + 1,
                }}
                // Increased padding from p-7 md:p-9 to p-8 md:p-10 for more breathing room
                className="absolute inset-0 rounded-3xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] overflow-hidden p-8 md:p-10 flex flex-col justify-between"
              >
                <Pattern type={a.pattern} />
                <div className="relative flex items-start justify-between">
                  {/* Slightly larger icon */}
                  <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-white/90 text-zinc-900 flex items-center justify-center font-display text-4xl md:text-5xl">
                    {a.logo}
                  </div>
                  <span className="text-xs uppercase tracking-widest opacity-70">
                    {String(i + 1).padStart(2, "0")} / {String(reasons.length).padStart(2, "0")}
                  </span>
                </div>
                <div className="relative flex-1 flex flex-col justify-center">
                  <h3 className="font-display text-3xl md:text-5xl leading-[1.05] whitespace-pre-line mb-4">
                    {a.title}
                  </h3>
                  {/* Increased text size and improved readability */}
                  <div className="text-sm md:text-base leading-relaxed opacity-80 max-w-md">
                    {a.org}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};