"use client";

import { useEffect, useState, useRef } from "react";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { Hero } from "@/components/site/Hero";
import { Pricing } from "@/components/site/Pricing";
import { RoamingRobot } from "@/components/site/RoamingRobot";


type Theme = { bg: string; fg: string };

const LIGHT: Theme = { bg: "0 0% 98%", fg: "0 0% 6%" };
const DARK: Theme = { bg: "0 0% 6%", fg: "0 0% 98%" };



export default function PricingPage() {
  useSmoothScroll();
  const [idx, setIdx] = useState(0);
  const sections = useRef<(HTMLElement | null)[]>([]);

  const themes: Theme[] = [
    LIGHT,
    DARK,
    LIGHT,
    DARK,
    LIGHT,
    DARK,
    LIGHT,
    DARK,
    LIGHT,
    DARK,
    LIGHT,
    DARK,
    LIGHT,
    DARK,
    DARK,
    LIGHT,
    DARK,
  ];



  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = sections.current.findIndex((s) => s === e.target);
            if (i !== -1) setIdx(i);
          }
        });
      },
      { threshold: 0.4 }
    );

    sections.current.forEach((s) => s && obs.observe(s));

    return () => obs.disconnect();
  }, []);

  const t = themes[idx] ?? LIGHT;

  useEffect(() => {
    const root = document.documentElement;

    const isDark = t.bg === DARK.bg;

    root.setAttribute(
      "data-section-theme",
      isDark ? "dark" : "light"
    );

    root.style.setProperty("--background", t.bg);
    root.style.setProperty("--foreground", t.fg);

    root.style.setProperty(
      "--border",
      t.fg === DARK.fg ? "0 0% 18%" : "0 0% 88%"
    );

    root.style.setProperty(
      "--muted-foreground",
      t.fg === DARK.fg ? "0 0% 65%" : "0 0% 40%"
    );
  }, [t.bg, t.fg]);

  return (
    <div
      className="w-full overflow-x-clip transition-colors duration-700"
      style={{
        backgroundColor: `hsl(${t.bg})`,
        color: `hsl(${t.fg})`,
        ["--background" as any]: t.bg,
        ["--foreground" as any]: t.fg,
        ["--border" as any]:
          t.fg === DARK.fg ? "0 0% 18%" : "0 0% 88%",
        ["--muted-foreground" as any]:
          t.fg === DARK.fg ? "0 0% 65%" : "0 0% 40%",
      }}
    >
      <RoamingRobot />

      <main className="relative">      
        <section ref={(el) => { sections.current[0] = el; }}><Pricing headingLevel="h1" /></section>
      </main>
    </div>
  );
}