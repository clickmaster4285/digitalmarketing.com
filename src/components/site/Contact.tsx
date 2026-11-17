import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SectionTag } from "@/components/site/SectionTag";

export const Contact = () => (
  <section id="contact" className="py-12 sm:py-20 container text-center relative px-4 sm:px-6">
    <SectionTag className="mb-6 sm:mb-8">Let's Talk</SectionTag>
    
    <motion.h2
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="font-display text-[clamp(2.5rem,10vw,12rem)] leading-[1.1] sm:leading-[0.9] text-balance"
    >
      Got a <em className="text-brand">vision?</em>
      <br />Let's build it.
    </motion.h2>
    
    {/* Email - Mobile optimized */}
<Link
  href="/contact"
  className="group mt-10 sm:mt-16 inline-flex items-center gap-2 sm:gap-3 rounded-full bg-foreground text-background px-6 sm:px-10 py-3 sm:py-5 text-sm sm:text-lg font-medium shadow-[0_15px_35px_-15px_rgba(0,0,0,0.45)] hover:bg-brand hover:text-white hover:scale-105 transition-all break-all sm:break-normal"
>
  sales@clickmastersdigitalmarketing.com
  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 transition-transform group-hover:translate-x-1" />
</Link>

    {/* Phone Numbers - Uncommented and mobile optimized */}
    {/* <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 px-2">
      <a
        href="tel:+447988576086"
        className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-background/80 text-foreground px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium hover:scale-105 transition-transform backdrop-blur-sm"
      >
        <span className="text-base sm:text-lg">🇬🇧</span>
        <span className="hidden xs:inline">UK:</span>
        <span>+44 7988 576086</span>
      </a>
      
      <a
        href="tel:+13252024074"
        className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-background/80 text-foreground px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium hover:scale-105 transition-transform backdrop-blur-sm"
      >
        <span className="text-base sm:text-lg">🇺🇸</span>
        <span className="hidden xs:inline">US:</span>
        <span>+1 325 202 4074</span>
      </a>
      
      <a
        href="tel:+923325394285"
        className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-background/80 text-foreground px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium hover:scale-105 transition-transform backdrop-blur-sm"
      >
        <span className="text-base sm:text-lg">🇵🇰</span>
        <span className="hidden xs:inline">PK:</span>
        <span>+92 332 5394285</span>
      </a>
    </div>

    <footer className="mt-16 sm:mt-32 pt-8 sm:pt-10 border-t border-background/20 flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm opacity-60 gap-4">
      <span>© 2026 ClickMasters Digital Marketing Agency</span>
      <div className="flex gap-6">
        <a href="#" className="hover:opacity-100 transition-opacity">Instagram</a>
        <a href="#" className="hover:opacity-100 transition-opacity">Dribbble</a>
        <a href="#" className="hover:opacity-100 transition-opacity">LinkedIn</a>
      </div>
    </footer> */}
  </section>
);