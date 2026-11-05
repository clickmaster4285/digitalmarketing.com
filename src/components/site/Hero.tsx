"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import sculpture from "@/assets/hero-sculpture.jpg";
import { ExternalLink } from "lucide-react";

const techs = [
  "SEO & Content Strategy",
  "Paid Media Management",
  "Web Design & Development",
  "Conversion Rate Optimization",
  "Marketing Analytics",
  "Automation",
];

const floatIcons = [
  { l: "⚛", cls: "top-[14%] left-[5%] float-a", color: "bg-[#61DAFB] text-zinc-900" },
  { l: "TS", cls: "top-[58%] left-[8%] float-b", color: "bg-[#3178C6] text-white" },
  { l: "▲", cls: "top-[26%] right-[6%] float-c", color: "bg-zinc-900 text-white" },
  { l: "Py", cls: "bottom-[24%] right-[12%] float-a", color: "bg-[#FFD43B] text-zinc-900" },
  { l: "◆", cls: "top-[10%] left-[42%] float-b", color: "bg-[#FF8FA3] text-zinc-900" },
  { l: "JS", cls: "bottom-[30%] left-[36%] float-c", color: "bg-[#F7DF1E] text-zinc-900" },
  { l: "GO", cls: "top-[40%] right-[28%] float-b", color: "bg-[#A8EFE0] text-zinc-900" },
  { l: "✦", cls: "bottom-[12%] left-[12%] float-c", color: "bg-[#D9C2FF] text-zinc-900" },
];

export const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 25]);

  return (
    <section ref={ref} className="relative min-h-[100svh] pt-28 pb-28 overflow-hidden grain">
      {/* huge background word */}
      <div aria-hidden className="absolute inset-x-0 -top-10 flex justify-center pointer-events-none select-none z-0">
        <motion.span
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -120]) }}
          className="font-display text-[28vw] leading-none opacity-[0.06] tracking-tighter"
        >
          marketings 
        </motion.span>
      </div>

      {/* floating tokens */}
      {floatIcons.map((f, i) => (
        <div
          key={i}
          className={`absolute ${f.cls} ${f.color} hidden md:flex w-14 h-14 rounded-2xl items-center justify-center font-display text-xl shadow-[0_15px_35px_-10px_rgba(0,0,0,0.35)] border border-black/5 pointer-events-none z-10`}
        >
          {f.l}
        </div>
      ))}

      <motion.div style={{ opacity }} className="container relative z-20 px-4 md:px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 backdrop-blur px-4 py-1.5 text-xs"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse" />
          Full-Service Digital Marketing Agency
        </motion.div>

        <div className="mt-10 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 relative z-10">
            <h1 className="font-display text-[clamp(2.5rem,10vw,6rem)] leading-[0.92] text-balance tracking-tight">
              {"Grow Your Business With a Full-Service".split(" ").map((word, i) => (
                <span key={i}>
                  <motion.span initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + i * 0.06, duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
                    className="inline-block mr-2">{word}</motion.span>
                  {" "}
                </span>
              ))}
              <br />
              <motion.span
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.9 }}
                className="italic font-display"
              >
                Digital Marketing <span className="not-italic">Agency</span>
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.8 }}
              className="mt-6 max-w-2xl w-full text-lg text-muted-foreground leading-relaxed"
            >
              Clickmasters is a results-driven digital marketing agency helping businesses attract more customers, generate qualified leads, and grow revenue online. Whether you're a small business owner, a B2B company, or an enterprise brand, our team combines strategy, creativity, and data to deliver measurable results.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }}
              className="mt-4 max-w-2xl w-full text-lg text-muted-foreground leading-relaxed"
            >
              As a full-service digital marketing agency, we manage every part of your online presence  SEO, paid advertising, social media, content, email, and web design  so you don't have to juggle multiple vendors or freelancers. One team, one strategy, one goal: your growth.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 0.7 }}
              className="mt-10 flex items-center gap-6 flex-wrap"
            >
              <a href="/contact" className="group inline-flex items-center gap-3 rounded-full bg-foreground text-background pl-6 pr-3 py-3 text-sm font-medium hover:opacity-90 transition">
                Get a Free Consultation
                <span className="grid place-items-center w-9 h-9 rounded-full bg-background text-foreground transition-transform group-hover:rotate-45"> <ExternalLink className="w-4 h-4" /></span>
              </a>
              <a href="#work" className="text-sm underline underline-offset-4">See our work</a>
            </motion.div>
          </div>

          <motion.div style={{ y, scale, rotate }} className="lg:col-span-5 relative">
            <Image
              src={sculpture}
              alt="Abstract chrome sculpture representing creative digital marketing"
              className="w-full h-auto select-none pointer-events-none drop-shadow-[0_30px_60px_rgba(0,0,0,0.25)]"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* tech marquee row */}
      <div className="absolute bottom-0 left-0 right-0 py-6 border-t border-border bg-background/60 backdrop-blur overflow-hidden">
        <div className="marquee gap-4 px-4">
          {[...techs, ...techs, ...techs].map((t, i) => (
            <span key={i} className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 text-sm whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-foreground" />
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};