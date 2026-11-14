// src/components/locations/LocationCaseStudies.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { IllustrativeBadge, IllustrativeResultsNotice } from "@/components/site/IllustrativeResults";
import {
  Award,
  Clock,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Zap,
  Target,
  BarChart3,
  Users,
  Rocket,
} from "lucide-react";

interface CaseStudyItem {
  title: string;
  challenge: string;
  strategy: string;
  services?: string[];
  timeframe?: string;
  outcome: string;
  results?: string[];
}

interface LocationCaseStudiesProps {
  title: string;
  items: CaseStudyItem[];
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.65, 0, 0.35, 1] as const,
    },
  }),
};

// Result icons mapping
const resultIcons = [TrendingUp, Users, Rocket, BarChart3, Target, Zap, Sparkles, Award];

export default function LocationCaseStudies({
  title,
  items,
}: LocationCaseStudiesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.4, 1, 1, 0.4]);

  if (!items || items.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-black text-white relative overflow-hidden"
    >
      {/* Colorful Background Effects */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#FF3D77]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-[#6C5CE7]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FFB020]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Floating blobs */}
      <div className="absolute top-[10%] right-[5%] w-48 h-48 bg-[#FF3D77]/5 rounded-full blur-2xl pointer-events-none float-a" />
      <div className="absolute bottom-[20%] left-[3%] w-56 h-56 bg-[#6C5CE7]/5 rounded-full blur-2xl pointer-events-none float-b" />
      <div className="absolute top-[60%] right-[8%] w-40 h-40 bg-[#FFB020]/5 rounded-full blur-2xl pointer-events-none float-c" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50 pointer-events-none" />

      {/* Grain overlay */}
      <div className="grain absolute inset-0 pointer-events-none opacity-20" />

      <motion.div style={{ opacity }} className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          {/* Eyebrow */}
          <motion.div
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF3D77] animate-pulse" />
            <span className="text-xs font-medium uppercase tracking-wider text-white/70">
              Illustrative Examples
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 text-white"
          >
            {title}
          </motion.h2>

          {/* Decorative line */}
          <motion.div
            variants={fadeUp}
            custom={2}
            className="w-20 h-1 bg-gradient-to-r from-[#FF3D77] to-[#6C5CE7] rounded-full mx-auto"
          />
          <IllustrativeResultsNotice className="mx-auto mt-8" />
        </motion.div>

        {/* Case Studies Grid - Full Width Hero Cards */}
        <div className="space-y-8">
          {items.map((item, index) => {
            const ResultIcon = resultIcons[index % resultIcons.length];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.15,
                  ease: [0.65, 0, 0.35, 1],
                }}
                viewport={{ once: true, margin: "-50px" }}
                className="group relative"
              >
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#FF3D77]/10 to-[#6C5CE7]/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative p-8 md:p-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 hover:-translate-y-1">
                  {/* Header Row */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF3D77]/20 to-[#6C5CE7]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <span className="text-xl font-display font-bold text-[#FF3D77]">
                          {(index + 1).toString().padStart(2, "0")}
                        </span>
                      </div>
                      <div>
                        <IllustrativeBadge className="mb-2" />
                        <h3 className="text-2xl font-display font-bold text-white group-hover:text-[#FF3D77] transition-colors duration-300">
                          {item.title}
                        </h3>
                        {item.timeframe && (
                          <div className="flex items-center gap-2 mt-1">
                            <Clock className="w-4 h-4 text-white/40" />
                            <span className="text-sm text-white/40">{item.timeframe}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Results Badge */}
                    {item.results && item.results.length > 0 && (
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF3D77]/10 border border-[#FF3D77]/20">
                        <ResultIcon className="w-4 h-4 text-[#FF3D77]" />
                        <span className="text-sm font-medium text-white">
                          {item.results[0]}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                      {/* Challenge */}
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-white/40 mb-2">
                          Challenge
                        </p>
                        <p className="text-sm text-white/80 leading-relaxed">
                          {item.challenge}
                        </p>
                      </div>

                      {/* Strategy */}
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-white/40 mb-2">
                          Strategy
                        </p>
                        <p className="text-sm text-white/80 leading-relaxed">
                          {item.strategy}
                        </p>
                      </div>

                      {/* Services */}
                      {item.services && item.services.length > 0 && (
                        <div>
                          <p className="text-xs font-medium uppercase tracking-wider text-white/40 mb-2">
                            Services
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {item.services.map((service, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-white/60"
                              >
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Column - Outcome */}
                    <div className="space-y-4">
                      <div className="p-6 rounded-2xl bg-gradient-to-br from-[#FF3D77]/10 to-[#6C5CE7]/10 border border-white/10">
                        <p className="text-xs font-medium uppercase tracking-wider text-[#FF3D77] mb-2">
                          Outcome
                        </p>
                        <p className="text-base text-white leading-relaxed">
                          {item.outcome}
                        </p>
                      </div>

                      {/* Results List */}
                      {item.results && item.results.length > 1 && (
                        <div className="grid grid-cols-2 gap-2">
                          {item.results.slice(1).map((result, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-2 p-3 rounded-xl border border-white/5 bg-white/5"
                            >
                              <CheckCircle2 className="w-4 h-4 text-[#FF3D77] shrink-0" />
                              <span className="text-xs text-white/80">{result}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FF3D77] via-[#6C5CE7] to-[#FFB020] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left rounded-full" />

                  {/* Decorative corner accent */}
                  <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-gradient-to-br from-[#FF3D77] to-[#6C5CE7] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.65, 0, 0.35, 1] }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href="/contact"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#FF3D77] to-[#6C5CE7] text-white rounded-full font-medium hover:opacity-90 transition-all hover:scale-105"
          >
            Ready to be our next success story?
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}