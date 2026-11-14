// src/components/locations/LocationFAQ.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown, HelpCircle, MessageCircle, Sparkles, Zap, Shield, CheckCircle2, MapPin, TrendingUp, Users } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface LocationFAQProps {
  items: FAQItem[];
}

export default function LocationFAQ({ items }: LocationFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.4, 1, 1, 0.4]);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-white text-foreground relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#FF3D77]/[0.04] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-[#6C5CE7]/[0.04] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FFB020]/[0.03] rounded-full blur-3xl pointer-events-none" />

      {/* Floating blobs */}
      <div className="absolute top-[15%] right-[10%] w-48 h-48 bg-[#FF3D77]/[0.03] rounded-full blur-2xl pointer-events-none float-a" />
      <div className="absolute bottom-[25%] left-[5%] w-56 h-56 bg-[#6C5CE7]/[0.03] rounded-full blur-2xl pointer-events-none float-b" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50 pointer-events-none" />

      {/* Grain overlay */}
      <div className="grain absolute inset-0 pointer-events-none opacity-10" />

      <motion.div style={{ opacity }} className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT: FAQ Content */}
          <div className="lg:col-span-7">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
            >
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-border/60 bg-gradient-to-r from-[#FF3D77]/[0.04] to-[#6C5CE7]/[0.04] backdrop-blur-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#FF3D77] to-[#6C5CE7]" />
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Frequently Asked Questions
                </span>
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 text-foreground text-left"
              >
                Got Questions?
                <br />
                <span className="text-muted-foreground text-lg font-sans font-normal mt-2 block">
                  We've got answers
                </span>
              </motion.h2>

              {/* Decorative line */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.65, 0, 0.35, 1] }}
                viewport={{ once: true }}
                className="w-20 h-0.5 bg-gradient-to-r from-[#FF3D77] to-[#6C5CE7] rounded-full mb-8"
              />

              {/* FAQ List */}
              <div className="space-y-3">
                {items.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05, ease: [0.65, 0, 0.35, 1] }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className={`w-full flex items-center justify-between p-5 text-left transition-all duration-300 rounded-2xl border ${
                        openIndex === index
                          ? "border-[#FF3D77]/30 bg-gradient-to-r from-[#FF3D77]/[0.04] to-[#6C5CE7]/[0.04] shadow-sm"
                          : "border-border/60 hover:border-[#FF3D77]/20 hover:bg-muted/10"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="shrink-0 w-6 h-6 rounded-full border border-border/60 flex items-center justify-center text-xs font-medium text-muted-foreground group-hover:border-[#FF3D77]/30 transition-colors duration-300">
                          {index + 1}
                        </span>
                        <span className={`font-medium text-sm md:text-base text-foreground transition-colors duration-300 ${
                          openIndex === index ? "text-[#FF3D77]" : ""
                        }`}>
                          {item.question}
                        </span>
                      </div>
                      <motion.span
                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
                        className={`shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                          openIndex === index
                            ? "bg-[#FF3D77]/10 text-[#FF3D77]"
                            : "bg-muted/20 text-muted-foreground group-hover:bg-[#FF3D77]/5"
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.span>
                    </button>

                    <AnimatePresence>
                      {openIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="p-5 pt-2 pl-14 text-sm text-muted-foreground leading-relaxed">
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>

              {/* Bottom CTA */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                viewport={{ once: true }}
                className="mt-8 flex items-center gap-4 flex-wrap"
              >
                <span className="text-sm text-muted-foreground">Still have questions?</span>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#FF3D77] hover:text-[#6C5CE7] transition-colors group"
                >
                  Contact us
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT: Visual Graphics - Map/Graph Style with Top Padding */}
          <div className="lg:col-span-5 pt-8 md:pt-12 lg:pt-20 xl:pt-24">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Visual Map Card */}
              <div className="relative p-6 rounded-3xl border border-border/60 bg-gradient-to-br from-[#FF3D77]/[0.04] to-[#6C5CE7]/[0.04] overflow-hidden">
                {/* Map-like decorative grid */}
                <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
                  <svg className="w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="none">
                    {/* Grid lines */}
                    {Array.from({ length: 10 }).map((_, i) => (
                      <line
                        key={`h-${i}`}
                        x1="0"
                        y1={i * 22}
                        x2="200"
                        y2={i * 22}
                        stroke="currentColor"
                        strokeWidth="0.5"
                        vectorEffect="non-scaling-stroke"
                      />
                    ))}
                    {Array.from({ length: 10 }).map((_, i) => (
                      <line
                        key={`v-${i}`}
                        x1={i * 22}
                        y1="0"
                        x2={i * 22}
                        y2="200"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        vectorEffect="non-scaling-stroke"
                      />
                    ))}
                    {/* Map markers */}
                    <circle cx="60" cy="70" r="4" fill="currentColor" opacity="0.4" />
                    <circle cx="120" cy="50" r="4" fill="currentColor" opacity="0.4" />
                    <circle cx="140" cy="120" r="4" fill="currentColor" opacity="0.4" />
                    <circle cx="80" cy="140" r="4" fill="currentColor" opacity="0.4" />
                    <circle cx="30" cy="130" r="4" fill="currentColor" opacity="0.4" />
                  </svg>
                </div>

                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF3D77]/10 to-[#6C5CE7]/10 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-[#FF3D77]" />
                    </div>
                    <div>
                      <div className="text-2xl font-display font-bold text-foreground">
                        {items.length}+
                      </div>
                      <div className="text-xs text-muted-foreground">Common Questions</div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We've compiled the most frequently asked questions to help you quickly find the answers you need.
                  </p>

                  {/* Quick tips with map pins */}
                  <div className="mt-6 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-[#FF3D77]" />
                      <span>Clear, honest answers</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-[#6C5CE7]" />
                      <span>Updated regularly</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-[#FFB020]" />
                      <span>Real client questions</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Graph/Chart Style Card */}
              <div className="relative p-6 rounded-3xl border border-border/60 bg-gradient-to-br from-[#6C5CE7]/[0.04] to-[#FFB020]/[0.04] overflow-hidden">
                {/* Bar chart visualization */}
                <div className="flex items-end justify-between h-24 px-2">
                  {[65, 80, 45, 90, 55, 70, 85].map((height, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${height}%` }}
                      transition={{ duration: 0.8, delay: 0.2 + i * 0.05, ease: [0.65, 0, 0.35, 1] }}
                      className="w-6 rounded-t-md"
                      style={{
                        height: `${height}%`,
                        background: `linear-gradient(to top, ${
                          i % 2 === 0 ? '#FF3D77' : '#6C5CE7'
                        }, ${i % 2 === 0 ? '#FF6B9D' : '#8B7CE7'})`,
                        opacity: 0.8,
                      }}
                    />
                  ))}
                </div>

                <div className="flex justify-between mt-3 text-[10px] text-muted-foreground">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#FF3D77]" />
                    <span className="text-sm font-medium text-foreground">+42%</span>
                    <span className="text-xs text-muted-foreground">engagement</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#6C5CE7]" />
                    <span className="text-sm font-medium text-foreground">3,500+</span>
                    <span className="text-xs text-muted-foreground">clients</span>
                  </div>
                </div>
              </div>

              {/* Trust badge */}
              <div className="p-4 rounded-2xl border border-border/60 bg-muted/10 text-center">
                <div className="flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#FF3D77]" />
                  <span className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">100%</span> of questions answered within 24 hours
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}