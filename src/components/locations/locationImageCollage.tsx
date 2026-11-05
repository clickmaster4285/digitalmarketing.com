// src/components/locations/LocationImageCollage.tsx
"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkle } from "lucide-react";

interface LocationImageCollageProps {
  /** Alt text for the images */
  altText?: string;
}

export default function LocationImageCollage({
  altText = "Location",
}: LocationImageCollageProps) {
  // Repeat the badge text enough times to fill the circular path
  const badgeText = "IN OUR MOST RECENT PROJECT • ";
  const loopedText = badgeText.repeat(3);

  // Same images for all location pages
  const images = {
    main: "/locations/image1.jpg",
    topRight: "/locations/image2.jpg",
    bottomRight: "/locations/image3.jpg",
  };

  return (
    <div className="relative w-full aspect-[4/5] lg:aspect-[7/8] select-none">
      {/* Soft backdrop panel */}
      <div className="absolute inset-y-0 right-0 w-[86%] rounded-[2.5rem] bg-primary/5 border border-border overflow-hidden">
        {/* Topographic contour lines */}
        <svg
          className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] opacity-70"
          viewBox="0 0 200 200"
        >
          {[0.45, 0.6, 0.75, 0.9, 1.05, 1.2].map((scale, i) => (
            <path
              key={i}
              d="M100,25 C138,25 172,44 182,80 C192,116 176,154 140,174 C104,194 62,188 38,158 C14,128 16,88 38,58 C56,34 76,25 100,25 Z"
              fill="none"
              stroke="hsl(var(--muted-foreground))"
              strokeWidth="1"
              opacity={0.3 - i * 0.04}
              transform={`translate(100 100) scale(${scale}) translate(-100 -100)`}
            />
          ))}
        </svg>
      </div>

      {/* Star burst */}
      <svg
        viewBox="0 0 40 40"
        className="absolute left-[8%] top-[8%] w-9 h-9 lg:w-11 lg:h-11"
      >
        <path
          d="M20 0 L23 15 L38 12 L26 21 L36 32 L21 26 L20 40 L19 26 L4 32 L14 21 L2 12 L17 15 Z"
          fill="hsl(var(--foreground))"
        />
      </svg>

      {/* Tab peeking above the panel */}
      <div className="absolute -top-3 right-[16%] w-14 h-8 bg-primary rounded-t-xl rotate-2" />

      {/* Main arch-shaped image */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
        className="absolute left-0 top-[10%] w-[58%] h-[80%] rounded-t-[999px] rounded-b-[2rem] overflow-hidden shadow-2xl"
      >
        <img
          src={images.main}
          alt={altText}
          className="w-full h-full object-cover"
        />
        <Sparkle
          className="absolute top-[16%] left-[55%] w-5 h-5 text-white drop-shadow-md"
          fill="white"
        />
      </motion.div>

      {/* Top-right rounded-square image */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.65, 0, 0.35, 1] }}
        className="absolute right-[1%] -top-[3%] w-[38%] h-[32%] rounded-[2rem] overflow-hidden rotate-3 shadow-xl bg-muted"
      >
        <img
          src={images.topRight}
          alt={`${altText} exterior`}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Bottom-right circular image */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
        className="absolute right-[6%] bottom-[3%] w-[44%] h-[35%] rounded-full overflow-hidden shadow-xl bg-muted"
      >
        <img
          src={images.bottomRight}
          alt={`${altText} skyline`}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Rotating badge */}
      <div className="absolute -left-[4%] bottom-[6%] w-[26%] aspect-square max-w-[130px] z-10">
        <motion.svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="50" cy="50" r="48" fill="hsl(var(--primary))" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
          <path id="badgeCircle" d="M50,10 A40,40 0 1,1 49.9,10" fill="none" />
          <text fontSize="6.2" fill="hsl(var(--primary-foreground))" letterSpacing="1">
            <textPath href="#badgeCircle" startOffset="0%">
              {loopedText}
            </textPath>
          </text>
        </motion.svg>
        {/* Static center arrow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-9 h-9 rounded-full bg-foreground flex items-center justify-center">
            <ArrowUpRight className="w-4 h-4 text-background" />
          </div>
        </div>
      </div>
    </div>
  );
}