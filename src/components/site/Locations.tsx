"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef, useState } from "react";
import { 
  ArrowRight,
  MapPin,
  Building2,
  Users,
  TrendingUp,
  Sparkles,
  Globe,
  ChevronRight,
  Circle,
  LocateFixed
} from "lucide-react";

const locations = [
  {
    url: "digital-marketing-agency-chicago",
    city: "Chicago",
    state: "IL",
    tagline: "Digital Marketing Services Chicago",
    description: "Clickmasters helps Chicago businesses stand out in a competitive market with SEO, PPC, and local search strategies built for the city's unique customer base. From the Loop to the suburbs, we help you reach more local customers and grow revenue.",
    color: "from-blue-500 to-cyan-500",
    bg: "bg-blue-500/5",
    border: "border-blue-500/20",
    hoverBorder: "hover:border-blue-500/40",
    glow: "hover:shadow-blue-500/10",
    emoji: "🏙️",
    coordinates: "41.8781° N, 87.6298° W",
  },
  {
    url: "digital-marketing-agency-denver",
    city: "Denver",
    state: "CO",
    tagline: "Digital Marketing Services Denver",
    description: "Our digital marketing services in Denver are designed to help local businesses compete in a fast-growing market. We combine local SEO, paid ads, and social media to drive real, measurable growth for Denver-based brands.",
    color: "from-orange-500 to-amber-500",
    bg: "bg-orange-500/5",
    border: "border-orange-500/20",
    hoverBorder: "hover:border-orange-500/40",
    glow: "hover:shadow-orange-500/10",
    emoji: "⛰️",
    coordinates: "39.7392° N, 104.9903° W",
  },
  {
    url: "digital-marketing-agency-atlanta",
    city: "Atlanta",
    state: "GA",
    tagline: "Digital Marketing Services Atlanta",
    description: "Atlanta businesses trust Clickmasters for data-driven strategies that generate leads and boost visibility across the metro area. We tailor every campaign to Atlanta's diverse industries, from home services to healthcare.",
    color: "from-purple-500 to-violet-500",
    bg: "bg-purple-500/5",
    border: "border-purple-500/20",
    hoverBorder: "hover:border-purple-500/40",
    glow: "hover:shadow-purple-500/10",
    emoji: "🍑",
    coordinates: "33.7490° N, 84.3880° W",
  },
  {
    url: "seo-services-phoenix",
    city: "Phoenix",
    state: "AZ",
    tagline: "Digital Marketing Services Phoenix",
    description: "We help Phoenix businesses grow with targeted SEO, Google Ads, and social media campaigns built for the local market. Our team understands the competitive Phoenix landscape and builds strategies that deliver results fast.",
    color: "from-rose-500 to-pink-500",
    bg: "bg-rose-500/5",
    border: "border-rose-500/20",
    hoverBorder: "hover:border-rose-500/40",
    glow: "hover:shadow-rose-500/10",
    emoji: "🌵",
    coordinates: "33.4484° N, 112.0740° W",
  },
  {
    url: "seo-services-tampa",
    city: "Tampa",
    state: "FL",
    tagline: "Digital Marketing Services Tampa",
    description: "Clickmasters supports Tampa businesses with local SEO, paid advertising, and content strategies that drive foot traffic and online leads. We help you stand out in Tampa's growing digital marketplace.",
    color: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-500/5",
    border: "border-emerald-500/20",
    hoverBorder: "hover:border-emerald-500/40",
    glow: "hover:shadow-emerald-500/10",
    emoji: "🌊",
    coordinates: "27.9506° N, 82.4572° W",
  },
  {
    url: "digital-marketing-agency-houston",
    city: "Houston",
    state: "TX",
    tagline: "Digital Marketing Services Houston",
    description: "Our digital marketing services in Houston cover everything from local SEO to full-funnel paid campaigns for businesses of all sizes. We help Houston companies attract more customers and scale their online presence with confidence.",
    color: "from-indigo-500 to-blue-500",
    bg: "bg-indigo-500/5",
    border: "border-indigo-500/20",
    hoverBorder: "hover:border-indigo-500/40",
    glow: "hover:shadow-indigo-500/10",
    emoji: "🤠",
    coordinates: "29.7604° N, 95.3698° W",
  },
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
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

export default function LocationsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section ref={ref} className="relative overflow-hidden border-t border-border bg-background py-28">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient orbs */}
        <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-gradient-to-b from-blue-500/5 via-purple-500/5 to-transparent blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-gradient-to-t from-emerald-500/5 via-teal-500/5 to-transparent blur-3xl" />
        
        {/* Map-like grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        
        {/* Decorative location dots */}
        <div className="absolute top-1/4 left-1/4 h-2 w-2 rounded-full bg-blue-500/20" />
        <div className="absolute top-1/3 right-1/4 h-3 w-3 rounded-full bg-purple-500/20" />
        <div className="absolute bottom-1/3 left-1/3 h-2 w-2 rounded-full bg-emerald-500/20" />
        <div className="absolute bottom-1/4 right-1/3 h-3 w-3 rounded-full bg-rose-500/20" />
      </div>

      {/* Grain Texture */}
      <div className="grain absolute inset-0 -z-5 opacity-10" />

      <div className="container px-4 md:px-0">
        {/* Header */}
        <div className="mb-16">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.05 }}
            className="inline-flex items-center gap-3 rounded-full border border-border/50 bg-background/50 px-5 py-2 text-xs backdrop-blur-sm"
          >
            <LocateFixed className="h-3 w-3 text-foreground/60" />
            <span className="tracking-[0.15em] text-muted-foreground">Where We Work</span>
          </motion.div>

          <motion.h2
            variants={slideUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.1 }}
            className="mt-6 font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] tracking-tight text-balance"
          >
            Locations <em className="font-display italic">We Serve</em>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.3 }}
            className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed"
          >
            Clickmasters offers digital marketing services near me and nationwide, with clients across major U.S. cities and remote support everywhere. No matter your location, you get the same dedicated team and results.
          </motion.p>
        </div>

        {/* Location Cards - Unique Zigzag Layout */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="space-y-8"
        >
          {locations.map((location, index) => (
            <motion.div
              key={location.city}
              variants={item}
              onHoverStart={() => setActiveIndex(index)}
              onHoverEnd={() => setActiveIndex(null)}
              className={`group relative rounded-2xl border ${location.border} ${location.hoverBorder} ${location.bg} p-6 md:p-8 transition-all duration-500 ${location.glow} ${
                index % 2 === 0 ? 'md:ml-0 md:mr-12' : 'md:ml-12 md:mr-0'
              }`}
            >
              {/* Decorative line connecting cards */}
              {index < locations.length - 1 && (
                <div className="absolute -bottom-8 left-1/2 h-8 w-px -translate-x-1/2 bg-gradient-to-b from-border to-transparent md:hidden" />
              )}
              
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                {/* Left: City Info */}
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    {/* Animated pin */}
                    <motion.div
                      animate={{
                        scale: activeIndex === index ? [1, 1.2, 1] : 1,
                      }}
                      transition={{ duration: 0.6 }}
                      className="relative flex-shrink-0"
                    >
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${location.color} blur-md opacity-0 transition-opacity duration-500 group-hover:opacity-30`} />
                      <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-border/30 bg-background/50 text-2xl transition-all duration-500 group-hover:scale-110">
                        {location.emoji}
                      </div>
                    </motion.div>

                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                          {location.city}
                        </h3>
                        <span className="rounded-full border border-border/50 px-2 py-0.5 text-xs font-medium text-muted-foreground">
                          {location.state}
                        </span>
                      </div>
                      <p className="mt-1 text-sm font-medium text-muted-foreground/70">
                        {location.tagline}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right: Description */}
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground/80 leading-relaxed">
                    {location.description}
                  </p>
                  
                  {/* Bottom row: Coordinates + Learn More */}
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground/50">
                      <MapPin className="h-3 w-3" />
                      <span>{location.coordinates}</span>
                    </div>
                    
                    <a
                      href={`/locations/${location.url}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-foreground/40 transition-all duration-300 group-hover:text-foreground/80"
                    >
                      Learn more
                      <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Progress bar on hover */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 overflow-hidden rounded-b-2xl transition-all duration-700 group-hover:w-full">
                <div className={`h-full w-full bg-gradient-to-r ${location.color}`} />
              </div>

              {/* Decorative dot pattern */}
              <div className="absolute -right-4 -top-4 opacity-5">
                <div className="grid grid-cols-3 gap-1">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="h-1 w-1 rounded-full bg-foreground" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 rounded-full border border-border/50 bg-background/30 px-6 py-3 backdrop-blur-sm">
            <Globe className="h-4 w-4 text-foreground/40" />
            <span className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Nationwide</span>  We serve clients across the U.S.
            </span>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </div>
          
          <div className="mt-8">
            <a
              href="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-foreground px-8 py-4 text-sm font-medium text-background transition-all hover:opacity-90"
            >
              Let's Talk About Your Location
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}