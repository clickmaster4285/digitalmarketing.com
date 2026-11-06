"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef, useState } from "react";
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  BarChart3, 
  Gauge, 
  FileText,
  Target,
  ArrowRight,
  Sparkles,
  CheckCircle2
} from "lucide-react";

const BENEFITS = [
  {
    title: "Expertise Across Channels",
    detail: "Get expert-level skills across every digital channel without the cost of hiring multiple specialists.",
    icon: <Users className="h-5 w-5" />,
    gradient: "from-blue-500/20 to-cyan-500/20",
    border: "hover:border-blue-500/30",
    glow: "group-hover:shadow-blue-500/20",
    number: "01",
  },
  {
    title: "Faster Results",
    detail: "Leverage proven frameworks and tools that deliver results faster than building capabilities from scratch.",
    icon: <TrendingUp className="h-5 w-5" />,
    gradient: "from-green-500/20 to-emerald-500/20",
    border: "hover:border-green-500/30",
    glow: "group-hover:shadow-green-500/20",
    number: "02",
  },
  {
    title: "Cost Savings",
    detail: "Significant cost savings compared to building and maintaining an in-house marketing team.",
    icon: <DollarSign className="h-5 w-5" />,
    gradient: "from-purple-500/20 to-pink-500/20",
    border: "hover:border-purple-500/30",
    glow: "group-hover:shadow-purple-500/20",
    number: "03",
  },
  {
    title: "Data-Driven Decisions",
    detail: "Every decision is backed by data — no guesswork, just measurable results and real ROI.",
    icon: <BarChart3 className="h-5 w-5" />,
    gradient: "from-orange-500/20 to-amber-500/20",
    border: "hover:border-orange-500/30",
    glow: "group-hover:shadow-orange-500/20",
    number: "04",
  },
  {
    title: "Scalability",
    detail: "Easily scale your campaigns up or down as your business grows and market conditions change.",
    icon: <Gauge className="h-5 w-5" />,
    gradient: "from-red-500/20 to-rose-500/20",
    border: "hover:border-red-500/30",
    glow: "group-hover:shadow-red-500/20",
    number: "05",
  },
  {
    title: "Transparent Reporting",
    detail: "Clear, transparent reporting so you always know exactly where your marketing spend is going and the ROI you're getting.",
    icon: <FileText className="h-5 w-5" />,
    gradient: "from-indigo-500/20 to-violet-500/20",
    border: "hover:border-indigo-500/30",
    glow: "group-hover:shadow-indigo-500/20",
    number: "06",
  },
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const slideUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function BenefitsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section ref={ref} className="relative overflow-hidden border-t border-border bg-background py-28">
      {/* Unique Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#F0F4FF/15,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,#FFF1F1/10,transparent_50%)]" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        
        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 h-80 w-80 rounded-full bg-purple-500/5 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Grain Texture */}
      <div className="grain absolute inset-0 -z-5 opacity-10" />

      <div className="container px-4 md:px-0">
        {/* Header - with decorative element */}
        <div className="mb-16 text-center relative">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.05 }}
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-border/50 bg-background/50 px-5 py-2 text-xs backdrop-blur-sm"
          >
            <Sparkles className="h-3 w-3 text-foreground/60" />
            <span className="tracking-[0.15em] text-muted-foreground">Why Choose Clickmasters</span>
          </motion.div>

          <motion.div
            variants={slideUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] tracking-tight text-balance">
              {"Benefits of Working With a "}
              <span className="relative">
                <span className="relative z-10 font-display italic">Digital Marketing</span>
                <span className="absolute -bottom-2 left-0 right-0 h-3 bg-foreground/10 blur-sm" />
              </span>{" "}
              <span className="font-display">Agency</span>
            </h2>
          </motion.div>

          <motion.p
            variants={fadeIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.3 }}
            className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground leading-relaxed"
          >
            You get expert-level skills across every channel, faster results, and lower costs than hiring in-house. 
            Our data-driven approach means transparent reporting and real ROI, not guesswork.
          </motion.p>
        </div>

        {/* Benefit Grid - Unique Card Design */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {BENEFITS.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              variants={item}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
              }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className={`group relative overflow-hidden rounded-2xl border border-border/50 bg-background/40 backdrop-blur-sm p-0 transition-all duration-500 ${benefit.glow}`}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
              
              {/* Animated Border */}
              <div className={`absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-500 ${benefit.border} opacity-0 group-hover:opacity-100`} />
              
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 h-12 w-12 overflow-hidden">
                <div className="absolute -top-6 -left-6 h-12 w-12 rotate-45 bg-foreground/5 transition-all duration-500 group-hover:bg-foreground/10" />
              </div>
              <div className="absolute top-0 right-0 h-12 w-12 overflow-hidden">
                <div className="absolute -top-6 -right-6 h-12 w-12 -rotate-45 bg-foreground/5 transition-all duration-500 group-hover:bg-foreground/10" />
              </div>

              {/* Content */}
              <div className="relative p-8">
                {/* Top Row: Number + Icon */}
                <div className="mb-6 flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    {/* Number Badge */}
                    <span className="font-mono text-xs font-bold tracking-[0.15em] text-muted-foreground/30 transition-all duration-500 group-hover:text-muted-foreground/60">
                      {benefit.number}
                    </span>
                    
                    {/* Icon with unique styling */}
                    <div className="relative">
                      <div className="absolute inset-0 rounded-xl bg-foreground/5 blur-md transition-all duration-500 group-hover:scale-150 group-hover:opacity-50" />
                      <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-border/30 bg-background/50 text-foreground transition-all duration-500 group-hover:scale-110 group-hover:border-foreground/20 group-hover:bg-foreground group-hover:text-background">
                        {benefit.icon}
                      </div>
                    </div>
                  </div>

                  {/* Status Badge - Unique style */}
                  <div className="flex items-center gap-1.5 rounded-full border border-border/30 bg-background/30 px-3 py-1 backdrop-blur-sm transition-all duration-500 group-hover:border-foreground/20">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground/70">
                      Active
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display text-xl font-bold tracking-tight text-foreground transition-colors duration-500 group-hover:text-foreground">
                  {benefit.title}
                </h3>
                
                {/* Description */}
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground/80 transition-colors duration-500 group-hover:text-muted-foreground">
                  {benefit.detail}
                </p>

                {/* Bottom Row: Learn More */}
                <div className="mt-6 flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground/0 transition-all duration-500 group-hover:text-foreground/60">
                    Learn more
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground/0 transition-all duration-500 group-hover:translate-x-1 group-hover:text-foreground/60" />
                </div>

                {/* Progress Line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden rounded-b-2xl">
                  <div 
                    className="h-full w-0 bg-gradient-to-r from-transparent via-foreground/20 to-transparent transition-all duration-1000 group-hover:w-full"
                    style={{ 
                      transitionDelay: `${index * 50}ms`,
                    }}
                  />
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div 
                className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-r ${benefit.gradient} opacity-0 blur-xl transition-all duration-700 group-hover:opacity-30`}
                style={{ 
                  transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)',
                  transition: 'all 0.7s cubic-bezier(0.22, 1, 0.36, 1)'
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA - with unique style */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.7 }}
          className="mt-16 text-center"
        >
          <div className="relative inline-block">
            {/* Decorative ring */}
            <div className="absolute -inset-4 rounded-full border border-foreground/5 opacity-0 transition-all duration-700 group-hover:opacity-100" />
            
            <a
              href="/contact"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-foreground px-8 py-4 text-sm font-medium text-background transition-all hover:opacity-90"
            >
              <span className="relative z-10 flex items-center gap-3">
                Start Your Project Today
                <span className="grid h-9 w-9 place-items-center rounded-full bg-background/10 text-background transition-all duration-300 group-hover:rotate-45 group-hover:bg-background/20">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </span>
              
              {/* Shine effect */}
              <span className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </a>
          </div>
          
          <p className="mt-4 text-xs text-muted-foreground/60">
            Join 200+ businesses already growing with Clickmasters
          </p>
        </motion.div>
      </div>
    </section>
  );
}