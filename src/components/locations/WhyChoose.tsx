// src/components/locations/LocationWhyChoose.tsx
"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Sparkles, Star, Zap, Shield, Award, TrendingUp, Users } from "lucide-react";

interface LocationWhyChooseProps {
  title: string;
  points: string[];
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.08,
      ease: [0.65, 0, 0.35, 1] as const,
    },
  }),
};

// Icon mapping for visual variety
const iconMap = [
  Star, Zap, Shield, Award, TrendingUp, Users, Sparkles, CheckCircle2
];

export default function LocationWhyChoose({
  title,
  points,
}: LocationWhyChooseProps) {
  return (
    <section className="py-16 md:py-24 bg-black text-white relative overflow-hidden">
      {/* Colorful Background Effects */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#FF3D77]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-[#6C5CE7]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FFB020]/5 rounded-full blur-3xl pointer-events-none" />
      
      {/* Floating blobs */}
      <div className="absolute top-[15%] right-[10%] w-48 h-48 bg-[#FF3D77]/5 rounded-full blur-2xl pointer-events-none float-a" />
      <div className="absolute bottom-[25%] left-[5%] w-56 h-56 bg-[#6C5CE7]/5 rounded-full blur-2xl pointer-events-none float-b" />
      <div className="absolute top-[50%] right-[20%] w-32 h-32 bg-[#FFB020]/5 rounded-full blur-2xl pointer-events-none float-c" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50 pointer-events-none" />
      
      {/* Grain overlay */}
      <div className="grain absolute inset-0 pointer-events-none opacity-20" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT: Content */}
          <div className="lg:col-span-7">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
            >
              {/* Eyebrow */}
              <motion.div
                variants={fadeUp}
                custom={0}
                className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF3D77] animate-pulse" />
                <span className="text-xs font-medium uppercase tracking-wider text-white/70">
                  Why Choose Us
                </span>
              </motion.div>

              {/* Title */}
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 text-white text-left"
              >
                {title}
                <span className="block text-lg font-sans font-normal text-white/60 mt-2">
                  What makes us the right partner for your business
                </span>
              </motion.h2>

              {/* Decorative line */}
              <motion.div
                variants={fadeUp}
                custom={2}
                className="w-20 h-1 bg-gradient-to-r from-[#FF3D77] to-[#6C5CE7] rounded-full mb-8"
              />

              {/* Points Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {points.map((point, index) => {
                  const Icon = iconMap[index % iconMap.length];
                  return (
                    <motion.div
                      key={index}
                      variants={fadeUp}
                      custom={3 + index}
                      className="group relative"
                    >
                      <div className="flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:border-[#FF3D77]/30 hover:-translate-y-1">
                        {/* Icon with gradient background */}
                        <div className="shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF3D77]/20 to-[#6C5CE7]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-5 h-5 text-[#FF3D77]" />
                        </div>
                        
                        <p className="text-sm leading-relaxed text-white/90">
                          {point}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom CTA */}
              <motion.div
                variants={fadeUp}
                custom={3 + points.length}
                className="mt-10 flex items-center gap-6 flex-wrap"
              >
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF3D77] text-white rounded-full font-medium hover:opacity-90 transition-all hover:scale-105 group"
                >
                  Get Started Today
                  <span className="grid place-items-center w-8 h-8 rounded-full bg-white/20 transition-transform group-hover:rotate-45">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </a>
                <span className="text-sm text-white/40">No long-term contracts</span>
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT: Visual Graphics / Stats Cards - with extensive top padding */}
          <div className="lg:col-span-5 pt-12 md:pt-16 lg:pt-28 xl:pt-36 2xl:pt-44">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {/* Stat Card 1 */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF3D77]/30 to-[#6C5CE7]/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-display font-bold text-white">3,500+</div>
                      <div className="text-sm text-white/60">Businesses Served</div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-[#FF3D77]/10 flex items-center justify-center">
                      <Users className="w-6 h-6 text-[#FF3D77]" />
                    </div>
                  </div>
                  <div className="mt-3 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-[85%] bg-gradient-to-r from-[#FF3D77] to-[#6C5CE7] rounded-full" />
                  </div>
                </div>
              </div>

              {/* Stat Card 2 */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6C5CE7]/30 to-[#FFB020]/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-display font-bold text-white">10+</div>
                      <div className="text-sm text-white/60">Years Experience</div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-[#6C5CE7]/10 flex items-center justify-center">
                      <Award className="w-6 h-6 text-[#6C5CE7]" />
                    </div>
                  </div>
                  <div className="mt-3 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-[100%] bg-gradient-to-r from-[#6C5CE7] to-[#FFB020] rounded-full" />
                  </div>
                </div>
              </div>

              {/* Stat Card 3 */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FFB020]/30 to-[#FF3D77]/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-display font-bold text-white">4.9/5</div>
                      <div className="text-sm text-white/60">Client Rating</div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-[#FFB020]/10 flex items-center justify-center">
                      <Star className="w-6 h-6 text-[#FFB020]" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#FFB020] text-[#FFB020]" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Trust badge */}
              <div className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-center">
                <p className="text-sm text-white/60">
                  <span className="text-[#FF3D77] font-medium">100%</span> Client Satisfaction • 
                  <span className="text-[#6C5CE7] font-medium ml-1">No Lock-in Contracts</span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}