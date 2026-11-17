"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef, useState } from "react";
import { 
  ArrowRight,
  Building2,
  Users,
  Wrench,
  Stethoscope,
  Home,
  Briefcase,
  ShoppingBag,
  Factory,
  Layers,
  Target,
  ChevronRight,
  Circle,
} from "lucide-react";
import { SectionTag } from "@/components/site/SectionTag";

const AUDIENCES = [
  { 
    name: "Small & Mid-Sized Businesses", 
    icon: <Building2 className="h-5 w-5" />, 
    category: "Business",
    color: "from-blue-500 to-cyan-500",
    bg: "bg-blue-500/5",
    border: "border-blue-500/20",
    hoverBorder: "hover:border-blue-500/40",
    glow: "hover:shadow-blue-500/10",
  },
  { 
    name: "B2B Companies", 
    icon: <Users className="h-5 w-5" />, 
    category: "Business",
    color: "from-purple-500 to-violet-500",
    bg: "bg-purple-500/5",
    border: "border-purple-500/20",
    hoverBorder: "hover:border-purple-500/40",
    glow: "hover:shadow-purple-500/10",
  },
  { 
    name: "Home Service Businesses", 
    icon: <Wrench className="h-5 w-5" />, 
    category: "Service",
    color: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-500/5",
    border: "border-emerald-500/20",
    hoverBorder: "hover:border-emerald-500/40",
    glow: "hover:shadow-emerald-500/10",
  },
  { 
    name: "Healthcare Providers", 
    icon: <Stethoscope className="h-5 w-5" />, 
    category: "Healthcare",
    color: "from-rose-500 to-pink-500",
    bg: "bg-rose-500/5",
    border: "border-rose-500/20",
    hoverBorder: "hover:border-rose-500/40",
    glow: "hover:shadow-rose-500/10",
  },
  { 
    name: "Real Estate Agents", 
    icon: <Home className="h-5 w-5" />, 
    category: "Real Estate",
    color: "from-amber-500 to-orange-500",
    bg: "bg-amber-500/5",
    border: "border-amber-500/20",
    hoverBorder: "hover:border-amber-500/40",
    glow: "hover:shadow-amber-500/10",
  },
  { 
    name: "Financial Services", 
    icon: <Briefcase className="h-5 w-5" />, 
    category: "Finance",
    color: "from-indigo-500 to-blue-500",
    bg: "bg-indigo-500/5",
    border: "border-indigo-500/20",
    hoverBorder: "hover:border-indigo-500/40",
    glow: "hover:shadow-indigo-500/10",
  },
  { 
    name: "Ecommerce & Retail", 
    icon: <ShoppingBag className="h-5 w-5" />, 
    category: "Retail",
    color: "from-fuchsia-500 to-pink-500",
    bg: "bg-fuchsia-500/5",
    border: "border-fuchsia-500/20",
    hoverBorder: "hover:border-fuchsia-500/40",
    glow: "hover:shadow-fuchsia-500/10",
  },
  { 
    name: "Manufacturing Companies", 
    icon: <Factory className="h-5 w-5" />, 
    category: "Industrial",
    color: "from-lime-500 to-green-500",
    bg: "bg-lime-500/5",
    border: "border-lime-500/20",
    hoverBorder: "hover:border-lime-500/40",
    glow: "hover:shadow-lime-500/10",
  },
  { 
    name: "Franchise Businesses", 
    icon: <Layers className="h-5 w-5" />, 
    category: "Business",
    color: "from-sky-500 to-blue-500",
    bg: "bg-sky-500/5",
    border: "border-sky-500/20",
    hoverBorder: "hover:border-sky-500/40",
    glow: "hover:shadow-sky-500/10",
  },
  { 
    name: "Professional Service Firms", 
    icon: <Target className="h-5 w-5" />, 
    category: "Professional",
    color: "from-teal-500 to-cyan-500",
    bg: "bg-teal-500/5",
    border: "border-teal-500/20",
    hoverBorder: "hover:border-teal-500/40",
    glow: "hover:shadow-teal-500/10",
  },
];

// Group audiences by category
const groupedAudiences = AUDIENCES.reduce((acc, item) => {
  if (!acc[item.category]) acc[item.category] = [];
  acc[item.category].push(item);
  return acc;
}, {} as Record<string, typeof AUDIENCES>);

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
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

export default function WhoIsThisFor() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = Object.keys(groupedAudiences);

  return (
    <section ref={ref} className="relative overflow-hidden border-t border-border bg-background py-28">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient orbs */}
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-gradient-to-b from-blue-500/5 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-gradient-to-t from-purple-500/5 to-transparent blur-3xl" />
        
        {/* Hexagon grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(60deg, transparent, transparent 40px, rgba(255,255,255,0.05) 40px, rgba(255,255,255,0.05) 41px),
              repeating-linear-gradient(-60deg, transparent, transparent 40px, rgba(255,255,255,0.05) 40px, rgba(255,255,255,0.05) 41px)
            `,
          }}
        />
      </div>

      <div className="container px-4 md:px-0">
        {/* Header */}
        <div className="mb-16">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.05 }}
          >
            <SectionTag>Who We Serve</SectionTag>
          </motion.div>

          <motion.h2
            variants={slideUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.1 }}
            className="mt-6 font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] tracking-tight text-balance"
          >
            Who Is This <em className="font-display italic">For?</em>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.3 }}
            className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed"
          >
            Our digital marketing agency services support businesses across industries  from local startups to enterprise brands. We tailor strategy to fit your goals.
          </motion.p>
        </div>

        {/* Category Tabs */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.4 }}
          className="mb-10 flex flex-wrap gap-2"
        >
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === null
                ? 'bg-foreground text-background'
                : 'bg-background/50 text-muted-foreground hover:bg-foreground/10 border border-border/50'
            }`}
          >
            All Industries
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-foreground text-background'
                  : 'bg-background/50 text-muted-foreground hover:bg-foreground/10 border border-border/50'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Audience Grid - Professional Visual Layout */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {(activeCategory ? groupedAudiences[activeCategory] : AUDIENCES).map((audience, index) => (
            <motion.div
              key={audience.name}
              variants={item}
              whileHover={{ 
                y: -4,
                transition: { duration: 0.2 }
              }}
              className={`group relative rounded-xl border ${audience.border} ${audience.hoverBorder} ${audience.bg} p-5 transition-all duration-300 ${audience.glow}`}
            >
              {/* Icon with gradient ring */}
              <div className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-border/30 bg-background/50 transition-all duration-300 group-hover:scale-110">
                <div className={`absolute inset-0 rounded-lg bg-gradient-to-br ${audience.color} opacity-0 transition-opacity duration-300 group-hover:opacity-10`} />
                <span className="relative text-foreground/70 transition-colors duration-300 group-hover:text-foreground">
                  {audience.icon}
                </span>
              </div>

              {/* Name */}
              <h3 className="font-medium text-foreground/90 transition-colors duration-300 group-hover:text-foreground">
                {audience.name}
              </h3>

              {/* Category badge */}
              <div className="mt-2 flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full border border-border/30 bg-background/30 px-2 py-0.5 text-[10px] text-muted-foreground/60">
                  <Circle className="h-1.5 w-1.5 fill-current" />
                  {audience.category}
                </span>
              </div>

              {/* Hover arrow */}
              <div className="absolute bottom-4 right-4 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5">
                <ChevronRight className="h-4 w-4 text-foreground/40" />
              </div>

              {/* Bottom accent line */}
              <div className={`absolute bottom-0 left-0 h-0.5 w-0 rounded-b-xl bg-gradient-to-r ${audience.color} transition-all duration-500 group-hover:w-full`} />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.6 }}
          className="mt-12 flex flex-col items-center gap-6 rounded-2xl border border-border/50 bg-background/30 p-8 backdrop-blur-sm"
        >
          <div className="text-center">
            <p className="font-display italic text-2xl md:text-4xl text-foreground leading-snug max-w-6xl text-balance">
              Whether you need a digital marketing company for small business growth or an experienced B2B digital marketing agency for enterprise lead generation, we tailor our approach to your industry and goals.
            </p>
          </div>
          
          <a
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-all hover:opacity-90"
          >
            Let's Talk About Your Industry
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}