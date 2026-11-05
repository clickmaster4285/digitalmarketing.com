"use client";

import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import ceoImg from "@/assets/ceo.webp";
import { ExternalLink } from "lucide-react";

const FlipCard = ({
  delay = 0,
  front,
  back,
  className = "",
}: {
  delay?: number;
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className={`relative ${className}`} style={{ perspective: "1400px" }}>
      <motion.div
        className="relative w-full h-full"
        initial={{ rotateY: 0 }}
        animate={isInView ? { rotateY: 180 } : { rotateY: 0 }}
        transition={{ duration: 0.9, delay, ease: [0.23, 0.84, 0.32, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute inset-0 overflow-hidden rounded-2xl border border-white/10"
          style={{ backfaceVisibility: "hidden" }}
        >
          {front}
        </div>
        <div
          className="absolute inset-0 overflow-hidden rounded-2xl border border-white/10"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {back}
        </div>
      </motion.div>
    </div>
  );
};

export const CeoCube = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const accentX = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const headingY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const imgScale = useSpring(
    useTransform(scrollYProgress, [0.2, 0.7], [0.97, 1.01]),
    { stiffness: 60, damping: 20 }
  );
  const imgY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0a0a0a] text-white overflow-hidden py-24 md:py-32"
    >
      {/* parallax grid */}
      <motion.div
        aria-hidden
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          y: bgY,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* drifting white glow */}
      <motion.div
        aria-hidden
        className="absolute top-1/3 left-1/2 w-[500px] h-[500px] rounded-full blur-[140px] opacity-15 pointer-events-none"
        style={{ x: accentX, background: "radial-gradient(circle, rgba(255,255,255,0.6), transparent 70%)" }}
      />

      <div className="container">
        {/* Heading */}
        <motion.div className="mb-12 md:mb-16" style={{ y: headingY }}>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] opacity-60 mb-3">
                [ Meet the CEO ]
              </p>
              <h2 className="font-display text-4xl md:text-6xl font-bold leading-[0.95]">
                Amjad
                <span className="block text-white/90"> in his words.</span>
              </h2>
            </div>
            <div className="hidden md:grid w-10 h-10 rounded-full bg-white place-items-center text-black">
              &#x2197;
            </div>
          </div>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 items-stretch">
          {/* LEFT CEO image */}
          <motion.div
            className="md:col-span-5 relative h-[380px] md:h-[460px] rounded-2xl overflow-hidden border border-white/10"
            style={{ y: imgY, scale: imgScale }}
          >
            <Image
              src={ceoImg}
              alt="Amjad, CEO"
              fill
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] opacity-70">Founder & CEO</p>
                <p className="font-display text-2xl mt-1">Amjad</p>
              </div>
              <span className="text-[10px] uppercase tracking-[0.3em] opacity-70">[ Lumos ]</span>
            </div>
            <span className="absolute top-3 left-3 text-[10px] tracking-[0.3em] opacity-70">[ 01 ]</span>
            <span className="absolute top-3 right-3 text-[10px] tracking-[0.3em] opacity-70">[ A ]</span>
          </motion.div>

          {/* RIGHT 3 flipping cards */}
          <div className="md:col-span-7 grid grid-rows-3 gap-5 h-[380px] md:h-[460px]">
            <FlipCard
              delay={0.1}
              front={
                <div className="w-full h-full bg-[#141414] p-5 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-[10px] tracking-[0.3em] opacity-60">
                    <span>[ 01 ] Quote</span>
                    <span>&#x21bb; flip</span>
                  </div>
                  <p className="font-display text-base md:text-lg leading-snug">
                    "I understand the responsibility that falls on my shoulders each day."
                  </p>
                  <span className="text-[10px] uppercase tracking-[0.3em] opacity-60">&mdash; Amjad</span>
                </div>
              }
              back={
                <div className="w-full h-full bg-white p-5 flex flex-col justify-center text-black">
                  <p className="text-[10px] uppercase tracking-[0.3em] opacity-60 mb-2">&mdash; Vision</p>
                  <p className="font-display text-lg leading-snug text-black/90">
                    Building software that matters, with people who care.
                  </p>
                </div>
              }
            />

            <FlipCard
              delay={0.25}
              front={
                <div className="w-full h-full bg-[#1a1a1a] p-5 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-[10px] tracking-[0.3em] opacity-60">
                    <span>[ 02 ] Team</span>
                    <span>&#x21bb; flip</span>
                  </div>
                  <p className="text-sm leading-relaxed opacity-85">
                    Every member of our team is a true professional, fully trustworthy and dedicated to their craft.
                  </p>
                  <span className="text-[10px] uppercase tracking-[0.3em] opacity-60">&mdash; Note from the team</span>
                </div>
              }
              back={
                <div className="w-full h-full bg-[#0f0f0f] p-5 flex flex-col justify-center border-t-2 border-white/40">
                  <p className="text-[10px] uppercase tracking-[0.3em] opacity-60 mb-2">&mdash; Mission</p>
                  <p className="text-sm leading-relaxed opacity-85">
                    Crafting digital experiences that combine clarity, performance, and a touch of soul.
                  </p>
                </div>
              }
            />

            <FlipCard
              delay={0.4}
              front={
                <div className="w-full h-full bg-[#141414] p-5 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] opacity-60 mb-2">[ 03 ] Track record</p>
                    <p className="font-display text-2xl">12+ years</p>
                    <p className="text-xs opacity-60 mt-1">leading product teams</p>
                  </div>
                  <span className="text-[10px] tracking-[0.3em] opacity-60">&#x21bb; flip</span>
                </div>
              }
              back={
                <div className="w-full h-full bg-white p-5 flex items-center justify-between text-black">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] opacity-60 mb-2">&mdash; Promise</p>
                    <p className="font-display text-lg text-black/90">Outstanding results, every engagement.</p>
                  </div>
                  <div className="w-10 h-10 rounded bg-black/10 grid place-items-center text-black/70">&#x2197;</div>
                </div>
              }
            />
          </div>
        </div>

        {/* Bottom tagline */}
        <motion.p
          className="text-[10px] uppercase tracking-[0.4em] opacity-40 text-center mt-10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 0.4, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          [ scroll &mdash; cards flip on view ]
        </motion.p>
      </div>


    </section>
  );
};
