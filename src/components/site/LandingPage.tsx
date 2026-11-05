"use client";

import { useEffect, useState, useRef } from "react";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Services } from "@/components/site/Services";
import { Process } from "@/components/site/Process";
import { Projects } from "@/components/site/Projects";
import { Stats } from "@/components/site/Stats";
import { About } from "@/components/site/About";
import { Pricing } from "@/components/site/Pricing";
import { Testimonials } from "@/components/site/Testimonials";
import { FAQ } from "@/components/site/FAQ";
import { Contact } from "@/components/site/Contact";
import { RoamingRobot } from "@/components/site/RoamingRobot";
import { Jiffz } from "@/components/site/Jiffz";
import { Solutions } from "@/components/site/Solutions";
import { TechStack } from "@/components/site/TechStack";
import { Workflow } from "@/components/site/Workflow";
import { Awards } from "@/components/site/Awards";
import { LumosSay } from "@/components/site/LumosSay";
import { WhyLoved } from "@/components/site/WhyLoved";
import { CeoCube } from "@/components/site/CeoCube";
import { AffordableServices } from "@/components/site/AffordableServices";
import { BestAgencySection } from "@/components/site/BestAgency";
import BenefitsSection from "@/components/site/BenefitsSection";
import WhoIsThisFor from "@/components/site/WhoIsThisFor";
import Locations from "@/components/site/Locations";



type Theme = { bg: string; fg: string };

const LIGHT: Theme = { bg: "0 0% 98%", fg: "0 0% 6%" };
const DARK: Theme = { bg: "0 0% 6%", fg: "0 0% 98%" };

export default function LandingPage() {
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
        <section ref={(el) => { sections.current[0] = el; }}><Hero /></section>
        <section ref={(el) => { sections.current[0] = el; }}><AffordableServices /></section>
        <section ref={(el) => { sections.current[1] = el; }}><Marquee /><Services /></section>
        <section ref={(el) => { sections.current[2] = el; }}><BestAgencySection /></section>
        <section ref={(el) => { sections.current[3] = el; }}><BenefitsSection /></section>
        <section ref={(el) => { sections.current[2] = el; }}><Solutions /></section>
        <section ref={(el) => { sections.current[3] = el; }}><Projects /></section>
        <section ref={(el) => { sections.current[4] = el; }}><TechStack /></section>
        <section ref={(el) => { sections.current[5] = el; }}><Process /></section>
        <section ref={(el) => { sections.current[4] = el; }}><Locations /></section>
        <section ref={(el) => { sections.current[6] = el; }}><WhoIsThisFor /></section>
        <section ref={(el) => { sections.current[6] = el; }}><Workflow /></section>
        <section ref={(el) => { sections.current[7] = el; }}><Jiffz /></section>
        <section ref={(el) => { sections.current[8] = el; }}><Stats /></section>
        <section ref={(el) => { sections.current[14] = el; }}><Awards /></section>
        <section ref={(el) => { sections.current[16] = el; }}><WhyLoved /></section>

        <section><CeoCube /></section>

        <section ref={(el) => { sections.current[9] = el; }}><About /></section>
        <section ref={(el) => { sections.current[10] = el; }}><Pricing /></section>
        <section ref={(el) => { sections.current[15] = el; }}><LumosSay /></section>
        <section ref={(el) => { sections.current[11] = el; }}><Testimonials /></section>
        <section ref={(el) => { sections.current[12] = el; }}><FAQ /></section>
        <section ref={(el) => { sections.current[13] = el; }}><Contact /></section>
      </main>
    </div>
  );
}