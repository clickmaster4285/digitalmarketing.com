"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Home,
  Car,
  Store,
  ShoppingCart,
  PawPrint,
  Pill,
  ScanLine,
  Stethoscope,
  Dumbbell,
  UtensilsCrossed,
  Package as FallbackIcon,
  type LucideIcon,
} from "lucide-react";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import type { ProductContent } from "@/content/product/productContent";
import { useInView } from "framer-motion";


const PRODUCT_ICONS: Record<string, LucideIcon> = {
  Home, Car, Store, ShoppingCart, PawPrint,
  Pill, ScanLine, Stethoscope, Dumbbell, UtensilsCrossed,
};

const Reveal = ({ children, delay = 0, y = 30 }: any) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const SectionLabel = ({ n, t }: { n: string; t: string }) => (
  <div className="flex items-center gap-3 mb-6">
    <span className="text-[10px] uppercase tracking-[0.4em] opacity-60">[ {n} ]</span>
    <span className="h-px w-10 bg-foreground/30" />
    <span className="text-[10px] uppercase tracking-[0.4em] opacity-60">{t}</span>
  </div>
);

/* ───────────── HERO: cover image only, full viewport ───────────── */
// const HeroCover = ({ product }: { product: ProductContent }) => {
//   const ref = useRef<HTMLDivElement>(null);
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start start", "end start"],
//   });

//   // image: slow zoom + parallax drift
//   const scale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
//   const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
//   // subtle dark tint so the transition into the next section feels clean
//   const tint = useTransform(scrollYProgress, [0, 1], [0, 0.45]);

//   const heroImage = product.images[0];
//   if (!heroImage) return null;

//   return (
//     <section
//       ref={ref}
//       className="relative w-full overflow-hidden bg-black"
//       style={{ height: "100vh" }}          // ← FULL VIEWPORT
//     >
//       {/* Image — fills the entire viewport */}
//       <motion.div
//         style={{ scale, y }}
//         className="absolute inset-0 will-change-transform"
//       >
//         <Image
//           src={heroImage.src}
//           alt={heroImage.alt}
//           fill
//           priority
//           sizes="100vw"
//           className="object-cover"
//         />
//       </motion.div>

//       {/* Only a scroll-tied dark tint — no text, no buttons */}
//       <motion.div
//         style={{ opacity: tint }}
//         className="absolute inset-0 bg-black pointer-events-none"
//       />
//     </section>
//   );
// };




// const HeroCover = ({ product }: { product: ProductContent }) => {
//   const ref = useRef<HTMLDivElement>(null);
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start start", "end start"],
//   });

//   const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
//   const y = useTransform(scrollYProgress, [0, 1], [0, 60]);
//   const tint = useTransform(scrollYProgress, [0, 1], [0, 0.45]);

//   const heroImage = product.images[0];
//   if (!heroImage) return null;

//   return (
//     <section
//       ref={ref}
//       className="relative w-full overflow-hidden bg-[#0a0a0a] pt-16 md:pt-0"
//     >
//       <motion.div
//         style={{ scale, y }}
//         className="relative w-full will-change-transform"
//       >
//         <Image
//           src={heroImage.src}
//           alt={heroImage.alt}
//           width={1920}
//           height={1080}
//           priority
//           sizes="100vw"
//           // This guarantees the image is 100% visible, edge-to-edge, with no gaps!
//           className="w-full h-auto object-contain"
//         />
//       </motion.div>

//       {/* Scroll-tied dark tint */}
//       <motion.div
//         style={{ opacity: tint }}
//         className="absolute inset-0 bg-black pointer-events-none"
//       />
//     </section>
//   );
// };


const HeroCover = ({ product }: { product: ProductContent }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // image: slow zoom + parallax drift
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  // subtle dark tint so the transition into the next section feels clean
  const tint = useTransform(scrollYProgress, [0, 1], [0, 0.45]);

  const heroImage = product.images[0];
  if (!heroImage) return null;

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-black"
      // mobile: natural height (no full viewport) / md+: full viewport
      style={{ height: undefined }}
    >
      {/* ═══════════ MOBILE: natural image height, object-contain ═══════════ */}
      <div className="md:hidden pt-16">
        <motion.div
          style={{ scale, y }}
          className="relative w-full will-change-transform"
        >
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            width={1920}
            height={1080}
            priority
            sizes="100vw"
            className="w-full h-auto object-contain"
          />
        </motion.div>

        <motion.div
          style={{ opacity: tint }}
          className="absolute inset-0 bg-black pointer-events-none"
        />
      </div>

      {/* ═══════════ DESKTOP/TABLET: full viewport cover (unchanged) ═══════════ */}
      <div
        className="hidden md:block relative w-full overflow-hidden bg-black"
        style={{ height: "100vh" }}
      >
        <motion.div
          style={{ scale, y }}
          className="absolute inset-0 will-change-transform"
        >
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>

        <motion.div
          style={{ opacity: tint }}
          className="absolute inset-0 bg-black pointer-events-none"
        />
      </div>
    </section>
  );
};


const CodeSnippets = ({ product }: { product: ProductContent }) => {
  const snippets = product.codeSnippets ?? [];
  if (snippets.length === 0) return null;

  return (
    <section className="relative bg-background text-foreground py-24 md:py-32 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(50% 40% at 50% 0%, rgba(255,46,134,0.10), transparent 70%)",
        }}
      />

      <div className="container relative max-w-6xl">
        <SectionLabel n="05" t="Code snippets" />

        <Reveal>
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-[0.95] mb-4 tracking-tight">
            Built <span className="text-[#FF2E86]">in code.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-base md:text-lg opacity-60 max-w-2xl mb-20">
            A peek at the real implementation — the components and server
            actions that ship with the kit. No pseudo-code, no hand-waving.
          </p>
        </Reveal>

        <div className="space-y-24 md:space-y-32">
          {snippets.map((s, i) => {
            const num = String(i + 1).padStart(2, "0");
            const lines = s.code.split("\n");

            return (
              <div key={s.id} className="space-y-8">
                {/* ═══════════ TEXT — above code ═══════════ */}
                <div className="max-w-3xl">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="relative text-[10px] uppercase tracking-[0.4em] opacity-50">
                      [ {num} ]
                      <motion.span
                        aria-hidden
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="absolute left-0 top-1/2 h-px w-full origin-left bg-[#FF2E86]"
                      />
                    </span>
                    <motion.span
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
                      className="h-px w-10 origin-left bg-foreground/30"
                    />
                    <span className="text-[10px] uppercase tracking-[0.4em] opacity-50">
                      {s.language} snippet
                    </span>
                  </div>

                  <h3 className="font-display text-3xl md:text-4xl font-bold leading-[1.05] tracking-tight mb-4">
                    {s.title}
                  </h3>

                  <p className="text-base md:text-lg opacity-70 leading-relaxed mb-5">
                    {s.description}
                  </p>

                  <TypedFile path={s.file} />
                </div>

                {/* ═══════════ CODE editor — full width below ═══════════ */}
                <div className="group relative rounded-2xl border border-white/10 bg-[#0b0b0b] overflow-hidden hover:border-[#FF2E86]/40 transition-colors">
                  <span
                    aria-hidden
                    className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF2E86]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                  />

                  {/* editor chrome */}
                  <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-white/10 bg-white/[0.02]">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                      </div>
                      <span className="h-4 w-px bg-white/10 shrink-0" />
                      <span className="font-mono text-[11px] text-white/50 truncate">
                        {s.file}
                      </span>
                    </div>
                    <span className="shrink-0 text-[9px] uppercase tracking-[0.3em] text-white/40">
                      {s.language}
                    </span>
                  </div>

                  {/* code block — scanline draws across each line */}
                  <div className="relative bg-[#080808]">
                    <pre className="overflow-x-auto px-2 py-4 text-[12.5px] leading-[1.65]">
                      <code className="font-mono grid">
                        {lines.map((line, idx) => (
                          <span
                            key={idx}
                            className="relative grid grid-cols-[2.5rem_1fr]"
                          >
                            <span className="select-none text-right pr-3 text-white/25 tabular-nums">
                              {idx + 1}
                            </span>
                            <motion.span
                              initial={{ clipPath: "inset(0 100% 0 0)" }}
                              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                              viewport={{ once: true }}
                              transition={{
                                duration: 0.28,
                                delay: 0.12 + idx * 0.04,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                              className="text-white/85 whitespace-pre relative"
                            >
                              {line || " "}
                              <motion.span
                                aria-hidden
                                initial={{ left: "0%", opacity: 1 }}
                                whileInView={{ left: "100%", opacity: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                  duration: 0.28,
                                  delay: 0.12 + idx * 0.04,
                                  ease: [0.22, 1, 0.36, 1],
                                }}
                                className="absolute top-0 bottom-0 w-px bg-[#FF2E86] pointer-events-none"
                              />
                            </motion.span>
                          </span>
                        ))}
                      </code>
                    </pre>

                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#080808] to-transparent"
                    />
                  </div>

                  {/* bottom strip */}
                  <div className="flex items-center justify-between px-5 py-3 border-t border-white/10 text-[10px] uppercase tracking-[0.3em] text-white/40">
                    <span>Included in kit</span>
                    <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-[#FF2E86] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ─────────── Typed file path ─────────── */
const TypedFile = ({ path }: { path: string }) => {
const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [text, setText] = useState("");

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setText(path.slice(0, i));
      if (i >= path.length) clearInterval(id);
    }, 18);
    return () => clearInterval(id);
  }, [inView, path]);

  return (
    <div
      ref={ref}
      className="flex items-center gap-2 font-mono text-xs opacity-50"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#FF2E86]" />
      <span>
        {text}
        {text.length < path.length && (
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block w-[5px] h-[11px] bg-[#FF2E86] ml-0.5 align-middle"
          />
        )}
      </span>
    </div>
  );
};

/* ---------- Animated counter ---------- */
const Counter = ({
  value,
  duration = 1600,
}: {
  value: string;
  duration?: number;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView) return;

    // extract leading number, suffix, prefix
    const match = value.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
    if (!match) {
      // no number to animate (e.g. "Ready", "Light + Dark")
      setDisplay(value);
      return;
    }

    const prefix = match[1];
    const target = parseFloat(match[2]);
    const suffix = match[3];
    const isFloat = target % 1 !== 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      const current = target * eased;
      const formatted = isFloat
        ? current.toFixed(1)
        : Math.round(current).toString();
      setDisplay(`${prefix}${formatted}${suffix}`);
      if (t < 1) requestAnimationFrame(tick);
      else setDisplay(value); // guarantee exact final string
    };

    requestAnimationFrame(tick);
  }, [inView, value, duration]);

  return <span ref={ref}>{display}</span>;
};

/* ---------- Intro ---------- */
const Intro = ({ product }: { product: ProductContent }) => {
  const Icon = PRODUCT_ICONS[product.icon] ?? FallbackIcon;

  return (
    <section className="relative bg-background text-foreground py-20 md:py-32">
      <div className="container max-w-6xl">
        <SectionLabel n="01" t={product.category} />

        <Reveal>
          <div className="flex items-start gap-6 mb-8">
            {/* <div
              className={`shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${product.accent} grid place-items-center text-white shadow-lg`}
            >
              <Icon className="w-8 h-8" />
            </div> */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] opacity-60 mb-2">
                {product.badge}
              </p>
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight">
                {product.name}
              </h1>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="text-lg md:text-2xl opacity-70 max-w-3xl leading-relaxed">
            {product.tagline}
          </p>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href={product.demoUrl ?? "/contact"}
              className="group inline-flex items-center gap-3 bg-foreground text-background px-7 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:bg-[#FF2E86] hover:text-white transition-colors"
            >
              Request a demo
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <a
              href="#gallery"
              className="inline-flex items-center gap-3 border border-foreground/20 px-7 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:border-foreground/60 transition-colors"
            >
              View screens
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.35}>
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-foreground/10 pt-10">
            {product.highlights.map((h) => (
              <div key={h.label}>
                <p className="font-display text-3xl md:text-5xl tabular-nums">
                  <Counter value={h.value} />
                </p>
                <p className="text-[10px] uppercase tracking-[0.3em] opacity-60 mt-2">
                  {h.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

/* ───────────── OVERVIEW ───────────── */
const Overview = ({ product }: { product: ProductContent }) => (
  <section className="relative bg-[#0a0a0a] text-white py-24 md:py-32 overflow-hidden">
    <div className="container max-w-4xl">
      <SectionLabel n="02" t="Overview" />
      <Reveal>
        <p className="font-display text-3xl md:text-5xl leading-[1.15] tracking-tight">
          {product.overview}
        </p>
      </Reveal>
      <Reveal delay={0.15}>
        <p className="mt-10 text-lg opacity-70 max-w-3xl leading-relaxed">
          {product.longDescription}
        </p>
      </Reveal>
    </div>
  </section>
);

/* ───────────── GALLERY ───────────── */
const Gallery = ({ product }: { product: ProductContent }) => {
  const images = product.images.slice(1);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowLeft")
        setActive((a) => (a! - 1 + images.length) % images.length);
      if (e.key === "ArrowRight")
        setActive((a) => (a! + 1) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, images.length]);

  if (images.length === 0) return null;

  return (
    <section id="gallery" className="relative bg-background text-foreground py-24 md:py-32">
      <div className="container max-w-7xl">
        <SectionLabel n="03" t="Screens & modules" />
        <Reveal>
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-[0.95] mb-4 tracking-tight">
            Screens <span className="text-[#FF2E86]">& modules.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-base md:text-lg opacity-60 max-w-2xl mb-20">
            Every screen included in the kit — dashboards, portals, and flows.
            Click any screenshot to open the full-size view.
          </p>
        </Reveal>

        <div className="space-y-24 md:space-y-32">
          {images.map((img, i) => {
            const reverse = i % 2 === 1;
            const num = String(i + 1).padStart(2, "0");
            const total = String(images.length).padStart(2, "0");

            return (
              <div
                key={img.src}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
              >
                {/* ── IMAGE: edge-to-edge cover, no padding, no letterbox ── */}
                <motion.div
                  initial={{ opacity: 0, x: reverse ? 60 : -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className={`lg:col-span-7 ${reverse ? "lg:order-2" : "lg:order-1"}`}
                >
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    className="group relative block w-full rounded-2xl overflow-hidden border border-foreground/10 bg-[#0a0a0a] hover:border-[#FF2E86]/40 transition-colors cursor-zoom-in"
                  >
                    {/* fixed ratio, image fills it completely */}
                    <div className="relative w-full aspect-[16/10]">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(min-width: 1024px) 58vw, 100vw"
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </div>

                    {/* hover darkening so overlay elements stay legible */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                    {/* corner badge */}
                    <div className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.3em] text-white/70 drop-shadow">
                      [ {num} / {total} ]
                    </div>

                    {/* zoom affordance */}
                    <div className="absolute bottom-4 right-4 w-9 h-9 rounded-full border border-white/25 grid place-items-center text-white bg-black/50 backdrop-blur-sm group-hover:border-[#FF2E86] group-hover:text-[#FF2E86] transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </button>
                </motion.div>

                {/* ── DETAILS (unchanged) ── */}
                <motion.div
                  initial={{ opacity: 0, x: reverse ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className={`lg:col-span-5 ${reverse ? "lg:order-1" : "lg:order-2"}`}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-[10px] uppercase tracking-[0.4em] opacity-50">
                      [ {num} ]
                    </span>
                    <span className="h-px w-10 bg-foreground/30" />
                    <span className="text-[10px] uppercase tracking-[0.4em] opacity-50">
                      {img.type}
                    </span>
                  </div>

                  <h3 className="font-display text-3xl md:text-4xl font-bold leading-[1.05] tracking-tight mb-4">
                    {img.caption ?? img.alt}
                  </h3>

                  <p className="text-base md:text-lg opacity-70 leading-relaxed mb-6">
                    {img.alt}
                  </p>

                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    className="group inline-flex items-center gap-3 text-sm tracking-[0.15em] uppercase font-medium border-b border-foreground/20 pb-2 hover:border-[#FF2E86] hover:text-[#FF2E86] transition-colors"
                  >
                    View full screen
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── LIGHTBOX (unchanged) ── */}
      {active !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <div className="absolute top-0 inset-x-0 z-10 flex items-center justify-between p-4 md:p-6 bg-gradient-to-b from-black/80 to-transparent">
            <div className="text-white/80">
              <div className="text-[10px] uppercase tracking-[0.3em] opacity-60">
                {product.shortName}
              </div>
              <div className="text-sm md:text-base font-medium mt-0.5 max-w-md truncate">
                {images[active].caption ?? images[active].alt}
              </div>
            </div>
            <button
              className="shrink-0 w-10 h-10 rounded-full border border-white/20 grid place-items-center text-white/80 hover:text-white hover:border-white/60 transition-colors"
              onClick={() => setActive(null)}
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {images.length > 1 && (
            <>
              <button
                className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 md:w-12 md:h-12 rounded-full border border-white/20 grid place-items-center text-white/80 hover:text-white hover:border-white/60 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setActive((a) => (a! - 1 + images.length) % images.length);
                }}
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 md:w-12 md:h-12 rounded-full border border-white/20 grid place-items-center text-white/80 hover:text-white hover:border-white/60 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setActive((a) => (a! + 1) % images.length);
                }}
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          <div
            className="absolute inset-0 grid place-items-center p-4 md:p-16"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-w-[1400px] h-full max-h-[85vh]">
              <Image
                src={images[active].src}
                alt={images[active].alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
          </div>

          <div className="absolute bottom-0 inset-x-0 p-4 md:p-6 flex justify-center bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
            <div className="text-[11px] uppercase tracking-[0.3em] text-white/60">
              {String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

/* ───────────── FEATURES ───────────── */
const Features = ({ product }: { product: ProductContent }) => {
  return (
    <section className="relative bg-[#0a0a0a] text-white py-24 md:py-32 overflow-hidden">
      {/* faint top radial accent */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background:
            "radial-gradient(50% 40% at 50% 0%, rgba(255,46,134,0.12), transparent 70%)",
        }}
      />

      <div className="container relative max-w-6xl">
        <SectionLabel n="04" t="What's included" />

        <Reveal>
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-[0.95] mb-4 tracking-tight">
            Everything you <span className="text-[#FF2E86]">need.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-base md:text-lg opacity-60 max-w-2xl mb-20">
            Every feature is production-ready — scoped, designed, and wired up.
            No placeholders, no half-finished flows.
          </p>
        </Reveal>

        {/* ── Grid of engineered feature tiles ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-white/10">
          {product.features.map((f, i) => {
            const num = String(i + 1).padStart(2, "0");

            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  delay: i * 0.05,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative border-b border-r border-white/10 p-6 md:p-7 hover:bg-white/[0.04] transition-colors duration-300"
              >
                {/* corner accent that draws in on hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute top-0 left-0 w-6 h-6 border-l border-t border-[#FF2E86] opacity-0 scale-75 origin-top-left transition-all duration-300 group-hover:opacity-100 group-hover:scale-100"
                />

                {/* index + marker row */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display text-xs tracking-[0.4em] text-white/35">
                    {num}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#FF2E86] transition-colors duration-300" />
                </div>

                {/* title */}
                <h3 className="font-display text-xl md:text-2xl leading-[1.15] tracking-tight mb-3">
                  {f.title}
                </h3>

                {/* description */}
                <p className="text-sm text-white/55 leading-relaxed">
                  {f.description}
                </p>

                {/* arrow slide-in on hover */}
                <ArrowUpRight className="absolute bottom-6 right-6 w-4 h-4 text-white/30 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:text-[#FF2E86] group-hover:translate-x-0 transition-all duration-300" />
              </motion.div>
            );
          })}
        </div>

        {/* ── Footer meta strip ── */}
        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-6 text-[10px] uppercase tracking-[0.35em] text-white/40">
            <span>All features included in every plan</span>
            <span className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[#FF2E86]" />
              No add-ons · No lock-in
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

/* ───────────── MODULES ───────────── */
const Modules = ({ product }: { product: ProductContent }) => {
  return (
    <section className="relative bg-[#0a0a0a] text-white py-24 md:py-32 overflow-hidden">
      {/* faint radial glow behind grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(255,46,134,0.15), transparent 70%)",
        }}
      />

      <div className="container relative max-w-6xl">
        <SectionLabel n="05" t="Modules & screens" />
        <Reveal>
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-[0.95] mb-4 tracking-tight">
            Modular <span className="text-[#FF2E86]">by design.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-base md:text-lg opacity-60 max-w-2xl mb-20">
            Every module ships as its own surface — plug the ones you need into
            your product. Roles, screens, and flows are already scoped.
          </p>
        </Reveal>

        {/* ── Module cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {product.modules.map((m, i) => {
            const num = String(i + 1).padStart(2, "0");
            const itemCount = m.items.length;

            return (
              <motion.article
                key={m.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -4 }}
                className="group relative rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur p-8 md:p-10 hover:border-[#FF2E86]/50 hover:bg-white/[0.05] transition-colors overflow-hidden"
              >
                {/* corner accent glow on hover */}
                <div
                  aria-hidden
                  className="absolute -top-24 -right-24 w-56 h-56 rounded-full blur-3xl bg-[#FF2E86]/0 group-hover:bg-[#FF2E86]/25 transition-colors duration-500"
                />

                {/* header row: number + title + count */}
                <div className="relative flex items-start justify-between mb-8">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-3">
                      [ Module · {num} ]
                    </div>
                    <h3 className="font-display text-3xl md:text-4xl leading-[1.05] tracking-tight">
                      {m.title}
                    </h3>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="font-display text-4xl md:text-5xl text-[#FF2E86] leading-none tabular-nums">
                      {itemCount.toString().padStart(2, "0")}
                    </div>
                    <div className="text-[9px] uppercase tracking-[0.3em] text-white/40 mt-2">
                      Screens
                    </div>
                  </div>
                </div>

                {/* item chips */}
                <div className="relative flex flex-wrap gap-2">
                  {m.items.map((item, j) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: i * 0.1 + 0.2 + j * 0.04,
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs md:text-[13px] text-white/80 hover:border-[#FF2E86]/60 hover:text-white hover:bg-white/[0.08] transition-colors"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#FF2E86]" />
                      {item}
                    </motion.span>
                  ))}
                </div>

                {/* bottom hairline + arrow */}
                <div className="relative mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-white/40">
                  <span>Everything included</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:text-[#FF2E86] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* ── "One system" footer strip ── */}
        <Reveal delay={0.2}>
          <div className="mt-16 grid md:grid-cols-3 gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
            {[
              { k: "01", t: "Composable", d: "Pick only the modules your product needs." },
              { k: "02", t: "Role-ready", d: "Each module ships with its own permission set." },
              { k: "03", t: "Consistent", d: "One design system across every screen." },
            ].map((f) => (
              <div key={f.k} className="flex items-start gap-4">
                <span className="shrink-0 font-display text-2xl text-[#FF2E86] leading-none">
                  {f.k}
                </span>
                <div>
                  <div className="text-sm font-medium mb-1">{f.t}</div>
                  <div className="text-xs text-white/50 leading-relaxed">{f.d}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

/* ───────────── TECH + USE CASES ───────────── */
const TechAndUseCases = ({ product }: { product: ProductContent }) => (
  <section className="relative bg-[#0a0a0a] text-white py-24 md:py-32">
    <div className="container max-w-6xl grid md:grid-cols-2 gap-16">
      <div>
        <SectionLabel n="06" t="Tech stack" />
        <Reveal>
          <h2 className="font-display text-3xl md:text-5xl font-bold leading-[0.95] mb-8">
            Built <span className="text-[#FF2E86]">with.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="flex flex-wrap gap-2">
            {product.techStack.map((t) => (
              <span key={t} className="px-4 py-2 rounded-full border border-white/15 text-sm">
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </div>

      <div>
        <SectionLabel n="07" t="Use cases" />
        <Reveal>
          <h2 className="font-display text-3xl md:text-5xl font-bold leading-[0.95] mb-8">
            Made <span className="text-[#FF2E86]">for.</span>
          </h2>
        </Reveal>
        <div className="space-y-6">
          {product.useCases.map((u, i) => (
            <motion.div
              key={u.title}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
            >
              <h3 className="font-display text-xl mb-1">{u.title}</h3>
              <p className="text-sm opacity-70">{u.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ───────────── CTA ───────────── */
const CTA = ({ product }: { product: ProductContent }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      ref={ref}
      className="relative bg-background text-foreground py-24 md:py-32 overflow-hidden"
    >
      <motion.div
        aria-hidden
        style={{ y }}
        className="absolute inset-0 grid place-items-center pointer-events-none"
      >
        <span className="font-display text-[22vw] leading-none opacity-[0.04] tracking-tighter select-none">
          DEMO
        </span>
      </motion.div>

      <div className="container relative max-w-4xl text-center">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.4em] opacity-60 mb-8">
            [ 08 ] Ready when you are
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-4xl md:text-7xl font-bold leading-[0.95] tracking-tight">
            {product.ctaHeading}
          </h2>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-8 text-lg md:text-xl opacity-70 max-w-2xl mx-auto leading-relaxed">
            {product.ctaDescription}
          </p>
        </Reveal>
        <Reveal delay={0.35}>
          <div className="mt-12 flex flex-wrap gap-4 justify-center">
            <Link
              href={product.demoUrl ?? "/contact"}
              className="group inline-flex items-center gap-3 bg-foreground text-background px-7 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:bg-[#FF2E86] hover:text-white transition-colors"
            >
              Get started
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-3 border border-foreground/20 px-7 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:border-foreground/60 transition-colors"
            >
              Browse all
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
};



/* ───────────── STATIC CTA (no props) ───────────── */
const StaticCTA = () => {
  const year = new Date().getFullYear();

  return (
    <section className="relative bg-background text-foreground overflow-hidden">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#FF2E86]/60 to-transparent" />

      <div
        aria-hidden
        className="absolute inset-0 grid place-items-center pointer-events-none select-none"
      >
        <span className="font-display text-[24vw] leading-none opacity-[0.035] tracking-tighter">
          DEMO
        </span>
      </div>

      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background:
            "radial-gradient(50% 40% at 50% 100%, rgba(255,46,134,0.10), transparent 70%)",
        }}
      />

      <div className="container relative max-w-5xl py-24 md:py-32">
        <SectionLabel n="09" t="Get started" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight">
              Build faster. <span className="text-[#FF2E86]">Ship sooner.</span>
            </h2>

            <p className="mt-8 text-lg md:text-xl opacity-70 max-w-xl leading-relaxed">
              Production-ready UI kits, dashboards, and admin panels — designed
              for teams that would rather build product than boilerplate.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 bg-foreground text-background px-7 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:bg-[#FF2E86] hover:text-white transition-colors"
              >
                Request a demo
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                href="/products"
                className="inline-flex items-center gap-3 border border-foreground/20 px-7 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:border-foreground/60 transition-colors"
              >
                Browse all products
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-6 md:p-8">
              <p className="text-[10px] uppercase tracking-[0.4em] opacity-50 mb-6">
                At a glance
              </p>

              <ul className="space-y-4">
                {[
                  { label: "Screens", value: "50+" },
                  { label: "Components", value: "125+" },
                  { label: "Frameworks", value: "Next.js" },
                ].map((h) => (
                  <li
                    key={h.label}
                    className="flex items-baseline justify-between gap-4 border-b border-foreground/10 pb-3 last:border-0 last:pb-0"
                  >
                    <span className="text-[10px] uppercase tracking-[0.3em] opacity-50">
                      {h.label}
                    </span>
                    <span className="font-display text-xl md:text-2xl tabular-nums">
                      {h.value}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-6 border-t border-foreground/10">
                <p className="text-[10px] uppercase tracking-[0.3em] opacity-50 mb-3">
                  Built with
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {["Next.js", "React", "Tailwind", "TypeScript", "Figma"].map(
                    (t) => (
                      <span
                        key={t}
                        className="text-[11px] px-2.5 py-1 rounded-full border border-foreground/15 opacity-70"
                      >
                        {t}
                      </span>
                    )
                  )}
                </div>
              </div>

              <p className="mt-6 text-[10px] uppercase tracking-[0.3em] opacity-40">
                Figma + code · Lifetime updates
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-6 border-t border-foreground/10 flex flex-wrap items-center justify-between gap-4 text-[10px] uppercase tracking-[0.3em] opacity-40">
          <span>ClickMasters · Products</span>
          <span className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-[#FF2E86]" />
            © {year} ClickMasters
          </span>
        </div>
      </div>
    </section>
  );
};


/* ───────────── MAIN ───────────── */
export default function ProductDetailPage({ product }: { product: ProductContent }) {
  useSmoothScroll();

  useEffect(() => {
    document.title = `${product.name} | ClickMasters Products`;
    const desc = product.tagline.slice(0, 160);
    let m = document.querySelector('meta[name="description"]');
    if (!m) {
      m = document.createElement("meta");
      m.setAttribute("name", "description");
      document.head.appendChild(m);
    }
    m.setAttribute("content", desc);
  }, [product]);

  return (
    <div className="theme-light w-full overflow-x-clip bg-background text-foreground">
      <main>
        <HeroCover product={product} />       {/* full-screen image, nothing else */}
        <Intro product={product} />           {/* title, tagline, CTAs, stats */}
        <Overview product={product} />
        <Gallery product={product} />
        <Features product={product} />
        <CodeSnippets product={product} />
        <Modules product={product} />
        <StaticCTA />
        <TechAndUseCases product={product} />
        <CTA product={product} />
      </main>
    </div>
  );
}