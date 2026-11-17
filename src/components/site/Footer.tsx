"use client";

import Link from "next/link";
import Image from "next/image";
import logoWhite from "@/assets/logo-white.webp";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Phone, Mail, MapPin } from "lucide-react";
import type { ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { label: "SEO Services", href: "/search-engine-optimization" },
  { label: "PPC Services", href: "/pay-per-click" },
  { label: "Social Media Marketing", href: "/social-media-marketing" },
  { label: "AI Automation", href: "/ai-automation" },
  { label: "Web Design & Development", href: "/web-design-development" },
  { label: "Mobile App Development", href: "/mobile-app-development" },
  { label: "CRO", href: "/conversion-rate-optimization" },
  { label: "Content Marketing", href: "/content-marketing" },
  { label: "Ecommerce Services", href: "/ecommerce-services" },
];

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services Directory", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Process", href: "/process" },
  { label: "Testimonial", href: "/testimonials" },
  { label: "Pricing", href: "/pricing" },
  { label: "Solutions", href: "/solutions" },
  { label: "Products", href: "/products" },
];

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/clickmasters-digital-marketing-agency-us/",
    path: "M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5V9h3v10zM6.5 7.7a1.7 1.7 0 110-3.5 1.7 1.7 0 010 3.5zM19 19h-3v-5c0-1.2-.5-2-1.6-2-.8 0-1.4.6-1.6 1.2-.1.2-.1.5-.1.8V19h-3V9h3v1.4c.4-.6 1.1-1.5 2.7-1.5 2 0 3.6 1.3 3.6 4.1V19z",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/clickmastersdigitalmarketingagencyus",
    path: "M13.5 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.6 1.6-1.6h1.7V3.5c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2v2.3H7.5V13h2.8v8h3.2z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/clickmastersus/",
    // Rounded-square camera outline + lens + flash dot (drawn with even-odd fill)
    path: "M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zM7.6 4A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4zM12 7.2a4.8 4.8 0 1 0 0 9.6a4.8 4.8 0 1 0 0-9.6zM12 9a3 3 0 1 1 0 6a3 3 0 1 1 0-6zM17.3 5.5a1.2 1.2 0 1 0 0 2.4a1.2 1.2 0 1 0 0-2.4z",
  },
];

export default function Footer({ children }: { children?: ReactNode }) {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-item",
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: footerRef.current, start: "top 88%" },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative overflow-hidden bg-[#0a0a0a] text-neutral-300 antialiased">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-neutral-700/60 to-transparent" />

      <div className="pointer-events-none absolute -top-40 right-1/4 h-80 w-80 rounded-full bg-brand/[0.06] blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-40 left-1/4 h-80 w-80 rounded-full bg-brand/[0.04] blur-[140px]" />

      <div className="relative mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
        {/* ───── CTA band ───── */}
        <div className="footer-item flex flex-col gap-6 border-b border-neutral-800/80 py-12 sm:flex-row sm:items-end sm:justify-between sm:py-16">
          <div>
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-brand">
              Get in touch
            </p>
            <h2 className="font-display text-5xl leading-[1.05] text-white sm:text-6xl lg:text-7xl">
              Let&apos;s build <em className="text-neutral-400">something</em>
              <br />
              great together.
            </h2>
          </div>

          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 self-start rounded-full border border-neutral-700 bg-neutral-900/60 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:border-brand hover:bg-brand hover:text-white sm:self-auto"
          >
            Start a project
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-x-10 gap-y-12 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-x-12 lg:gap-x-16">
          {/* Brand + contact */}
          <div className="footer-item col-span-2 md:col-span-1">
            <Link href="/" className="mb-6 inline-flex items-center" aria-label="ClickMasters home">
              <Image src={logoWhite} alt="ClickMasters" className="h-auto w-36" />
            </Link>

            <p className="mb-6 max-w-xs text-base leading-relaxed tracking-[0.01em] text-neutral-500">
              A full-service digital marketing agency helping brands grow through data-driven strategy, design, and automation.
            </p>

            <div className="space-y-4">
              <a href="mailto:sales@clickmastersdigitalmarketing.com" className="group flex items-start gap-3 text-sm leading-relaxed tracking-[0.01em] text-neutral-400 transition-colors hover:text-white">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-neutral-600 transition-colors group-hover:text-brand" />
                <span className="break-all">sales@clickmastersdigitalmarketing.com</span>
              </a>
              <a href="tel:+447988576086" className="group flex items-start gap-3 text-sm leading-relaxed tracking-[0.01em] text-neutral-400 transition-colors hover:text-white">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-neutral-600 transition-colors group-hover:text-brand" />
                <span>+44 7988 576086 <span className="ml-2 font-sans text-xs text-neutral-600">UK</span></span>
              </a>
              <a href="tel:+13252024074" className="group flex items-start gap-3 text-sm leading-relaxed tracking-[0.01em] text-neutral-400 transition-colors hover:text-white">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-neutral-600 transition-colors group-hover:text-brand" />
                <span>+1 325 202 4074 <span className="ml-2 font-sans text-xs text-neutral-600">US</span></span>
              </a>
              <a href="tel:+923325394285" className="group flex items-start gap-3 text-sm leading-relaxed tracking-[0.01em] text-neutral-400 transition-colors hover:text-white">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-neutral-600 transition-colors group-hover:text-brand" />
                <span>+92 332 5394285 <span className="ml-2 font-sans text-xs text-neutral-600">PK</span></span>
              </a>
            </div>
          </div>

          {/* Explore Services */}
          <nav className="footer-item" aria-label="Services">
            <h3 className="font-display mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Explore Services
            </h3>
            <ul className="space-y-3.5">
              {services.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="group inline-flex items-center gap-1.5 text-[15px] leading-relaxed tracking-[0.01em] text-neutral-400 transition-colors duration-200 hover:text-white">
                    <span className="relative">
                      {item.label}
                      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-brand transition-all duration-300 group-hover:w-full" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Quick Links */}
          <nav className="footer-item" aria-label="Quick links">
            <h3 className="font-display mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Quick Links
            </h3>
            <ul className="space-y-3.5">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="group inline-flex items-center gap-1.5 text-[15px] leading-relaxed tracking-[0.01em] text-neutral-400 transition-colors duration-200 hover:text-white">
                    <span className="relative">
                      {item.label}
                      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-brand transition-all duration-300 group-hover:w-full" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Service areas */}
          <div className="footer-item">
            <h3 className="font-display mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Service Areas
            </h3>
            <Link
              href="/locations"
              className="group inline-flex items-start gap-3 text-sm leading-relaxed text-neutral-400 transition-colors hover:text-white"
            >
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-neutral-600 transition-colors group-hover:text-brand" />
              <span>Browse all cities we serve</span>
            </Link>
          </div>
        </div>

        {children}

        {/* ───── Bottom bar ───── */}
        <div className="footer-item flex flex-col gap-6 border-t border-neutral-800/80 py-8 md:flex-row md:items-center md:justify-between">
          <p className="text-center text-[14px] leading-relaxed tracking-[0.01em] text-neutral-500 md:text-left">
            © {new Date().getFullYear()} ClickMasters Digital Marketing Agency. All rights reserved.
          </p>
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
            <div className="flex gap-6 text-[14px] leading-relaxed tracking-[0.01em] text-neutral-500">
              <Link href="#privacy" className="transition-colors hover:text-white">Privacy</Link>
              <Link href="#terms" className="transition-colors hover:text-white">Terms</Link>
              <Link href="/sitemap_index.xml" className="transition-colors hover:text-white">Sitemap</Link>
            </div>
            <div className="flex items-center gap-1">
              {socialLinks.map((social) => (
                <SocialIcon key={social.label} label={social.label} href={social.href} path={social.path} />
              ))}
            </div>
          </div>
        </div>

        {/* Verification */}
        <div className="flex justify-center border-t border-neutral-800/60 py-5">
          <a
            href="https://techbehemoths.com/company/clickmasters-digital-marketing-agency-us"
            target="_blank"
            rel="noopener noreferrer"
            data-techbehemoths-verification
            className="inline-flex items-center gap-1.5 text-[13px] leading-relaxed tracking-[0.01em] text-neutral-600 transition-colors hover:text-brand"
          >
            Verified on TechBehemoths
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ label, href, path }: { label: string; href: string; path: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ClickMasters on ${label}`}
      title={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 transition-all duration-200 hover:bg-neutral-800 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-[17px] w-[17px]">
        <path d={path} fillRule="evenodd" clipRule="evenodd" />
      </svg>
    </a>
  );
}