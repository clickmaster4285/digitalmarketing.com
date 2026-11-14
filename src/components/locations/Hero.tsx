// src/components/locations/LocationHero.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MapPin, Star, Users, Compass } from "lucide-react";
import LocationImageCollage from "./locationImageCollage";

interface LocationHeroProps {
  heading: string;
  subheading: string;
  ctaText: string;
  ctaLink: string;
  locationName: string;
  badgeText?: string;
  altText?: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
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

export default function LocationHero({
  heading,
  subheading,
  ctaText,
  ctaLink,
  locationName,
  badgeText = "IN OUR MOST RECENT PROJECT • ",
  altText = "Location",
}: LocationHeroProps) {
  // Extract city name without state for display
  const cityName = locationName.split(",")[0];

  return (
    <section className="relative min-h-[70vh] flex items-center pt-32 pb-20 overflow-hidden bg-background">
      {/* Grain overlay */}
      <div className="grain absolute inset-0 pointer-events-none" />

      {/* Decorative blobs with colors */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-[#FF3D77]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#6C5CE7]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* LEFT: content */}
          <div className="lg:col-span-6 text-left">
            {/* Breadcrumb */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0}
              className="flex items-center gap-2 text-sm text-muted-foreground mb-6"
            >
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/locations" className="hover:text-foreground transition-colors">
                Locations
              </Link>
              <span>/</span>
              <span className="text-foreground font-medium">{locationName}</span>
            </motion.div>

            {/* Eyebrow with color accent */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={1}
              className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-border bg-muted/40"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF3D77]" />
              <span className="text-sm font-medium text-foreground">
                Digital Marketing Services in {locationName}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={2}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight text-foreground text-left"
            >
              {heading}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={3}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed text-left"
            >
              {subheading}
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={4}
              className="flex flex-wrap gap-4"
            >
              <Link
                href={ctaLink}
                className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background rounded-full font-medium hover:opacity-90 transition-all hover:scale-105 group"
              >
                {ctaText}
                <span className="grid place-items-center w-9 h-9 rounded-full bg-background text-foreground transition-transform group-hover:rotate-45">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
              <Link
                href="#services"
                className="inline-flex items-center gap-2 px-8 py-4 border border-border rounded-full font-medium hover:bg-muted/50 transition-all"
              >
                Explore Services
              </Link>
            </motion.div>

            {/* Trust indicators with color accents */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={5}
              className="flex flex-wrap items-center gap-6 mt-10 pt-6 border-t border-border"
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl font-display font-bold text-foreground">3,500+</span>
                <span className="text-sm text-muted-foreground">Clients Served</span>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="flex items-center gap-2">
                <span className="text-2xl font-display font-bold text-foreground">10+</span>
                <span className="text-sm text-muted-foreground">Years Experience</span>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="flex items-center gap-2">
                <div className="flex text-[#FF3D77]">{"★".repeat(5)}</div>
                <span className="text-sm text-muted-foreground">4.9/5 Rating</span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Image Collage */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.65, 0, 0.35, 1] }}
            >
              <LocationImageCollage
                altText={altText || locationName}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Improved Sliding Bar - Clean and Minimal */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8, ease: [0.65, 0, 0.35, 1] }}
        className="absolute bottom-0 left-0 right-0 py-5 border-t border-border bg-background/80 backdrop-blur-md overflow-hidden"
      >
        <div className="relative flex overflow-hidden">
          {/* Gradient fades on edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {/* Marquee Track */}
          <motion.div
            className="flex gap-12 px-4 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[
              `📍 Serving ${locationName} & Surrounding Areas`,
              `⭐ 4.9/5 Average Client Rating`,
              `🚀 3,500+ Businesses Served`,
              `🏆 Award-Winning Digital Marketing Agency`,
              `📍 Serving ${locationName} & Surrounding Areas`,
              `⭐ 4.9/5 Average Client Rating`,
              `🚀 3,500+ Businesses Served`,
              `🏆 Award-Winning Digital Marketing Agency`,
            ].map((text, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-3 text-sm font-medium text-muted-foreground"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF3D77]" />
                {text}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}