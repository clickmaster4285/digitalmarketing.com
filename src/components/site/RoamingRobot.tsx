"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import robot from "@/assets/robot.png";

export const RoamingRobot = () => {
  const [vh, setVh] = useState(800);
  const [vw, setVw] = useState(1200);
  const scrollY = useMotionValue(0);

  useEffect(() => {
    const onResize = () => { setVh(window.innerHeight); setVw(window.innerWidth); };
    const onScroll = () => scrollY.set(window.scrollY);
    onResize();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, [scrollY]);

  // map scroll to a wandering path across the viewport
  const docH = typeof document !== "undefined"
    ? Math.max(document.body.scrollHeight - vh, 1)
    : 1;

  const progress = useTransform(scrollY, [0, docH], [0, 1]);

  // X wanders left↔right as user scrolls
  const xRaw = useTransform(progress, (p) => {
    const margin = vw < 768 ? 20 : 60;
    const range = vw - 120 - margin * 2;
    // sine wave for a wandering feel
    const wave = (Math.sin(p * Math.PI * 4) + 1) / 2; // 0..1
    return margin + wave * range;
  });
  const yRaw = useTransform(progress, (p) => {
    const top = vh * 0.15;
    const bottom = vh * 0.7;
    const wave = (Math.cos(p * Math.PI * 3) + 1) / 2;
    return top + wave * (bottom - top);
  });
  const rot = useTransform(progress, (p) => Math.sin(p * Math.PI * 6) * 12);

  const x = useSpring(xRaw, { stiffness: 60, damping: 18, mass: 0.8 });
  const y = useSpring(yRaw, { stiffness: 60, damping: 18, mass: 0.8 });
  const rotate = useSpring(rot, { stiffness: 80, damping: 20 });

  return (
    <motion.div
      style={{ x, y, rotate }}
      className="fixed top-0 left-0 z-[60] pointer-events-none"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="w-20 h-20 md:w-24 md:h-24"
      >
        <Image
          src={robot}
          alt="Clickmasters mascot robot"
          width={96}
          height={96}
          className="w-full h-full drop-shadow-[0_15px_25px_rgba(0,0,0,0.35)]"
        />
      </motion.div>
    </motion.div>
  );
};
