"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Phone, Mail, MapPin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { label: "SEO Services", href: "https://clickmastersdigitalmarketing.com/search-engine-optimization" },
  { label: "PPC Services", href: "https://clickmastersdigitalmarketing.com/pay-per-click" },
  { label: "Social Media Marketing", href: "https://clickmastersdigitalmarketing.com/social-media-marketing" },
  { label: "AI Automation", href: "https://clickmastersdigitalmarketing.com/ai-automation" },
  { label: "Web Design & Development", href: "https://clickmastersdigitalmarketing.com/web-design-development" },
  { label: "Mobile App Development", href: "https://clickmastersdigitalmarketing.com/mobile-app-development" },
  { label: "CRO", href: "https://clickmastersdigitalmarketing.com/conversion-rate-optimization" },
];

const quickLinks = [
  { label: "Home", href: "https://clickmastersdigitalmarketing.com" },
  { label: "About", href: "https://clickmastersdigitalmarketing.com/about" },
  { label: "Contact Us", href: "https://clickmastersdigitalmarketing.com/contact" },
  { label: "Process", href: "https://clickmastersdigitalmarketing.com/process" },
  { label: "Testimonial", href: "https://clickmastersdigitalmarketing.com/testimonials" },
  { label: "Pricing", href: "https://clickmastersdigitalmarketing.com/pricing" },
  { label: "Solutions", href: "https://clickmastersdigitalmarketing.com/solutions" },
];

const offices = [
  {
    city: "San Francisco",
    line1: "300 Broadway,",
    line2: "San Francisco, CA 94133",
  },
  {
    city: "New York",
    line1: "148 Lafayette St,",
    line2: "New York, NY 10013",
  },
  {
    city: "Austin",
    line1: "600 Congress Ave,",
    line2: "Austin, TX 78701",
  },
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
    path: "M12 2.2c3.2 0 3.6 0 4.9.1 1.2 0 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.9.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c0 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.9.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2 0-1.8-.2-2.2-.4a3.8 3.8 0 01-1.4-.9 3.8 3.8 0 01-.9-1.4c-.2-.4-.4-1-.4-2.2-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c0-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.9-.7 1.4-.9.7-.3 1.6-.5 2.8-.6 1.3-.1 1.7-.1 5-.1zm0 0C8.7 0 8.3 0 7 .1 5.8.1 4.9.3 4.2.6c-.8.3-1.5.7-2.1 1.4C1.4 2.6 1 3.3.7 4.1.3 4.9.1 5.7.1 7 0 8.3 0 8.7 0 12s0 3.7.1 5c.1 1.2.3 2.1.6 2.8.3.8.7 1.5 1.4 2.1.7.7 1.4 1.1 2.1 1.4.7.3 1.6.5 2.8.6 1.3.1 1.7.1 5 .1s3.7 0 5-.1c1.2-.1 2.1-.3 2.8-.6.8-.3 1.5-.7 2.1-1.4.7-.7 1.1-1.4 1.4-2.1.3-.7.5-1.6.6-2.8.1-1.3.1-1.7.1-5s0-3.7-.1-5c-.1-1.2-.3-2.1-.6-2.8a5.8 5.8 0 00-1.4-2.1A5.8 5.8 0 0019.8.7c-.7-.3-1.6-.5-2.8-.6C15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 100 12.4 6.2 6.2 0 000-12.4zm6.4-1.4a1.4 1.4 0 100 2.9 1.4 1.4 0 000-2.9z",
  },
];

export default function Footer() {
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
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 88%",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-[#0a0a0a] text-neutral-300"
    >
      {/* Top accent hairline */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-neutral-700/60 to-transparent" />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-40 right-1/4 h-80 w-80 rounded-full bg-[#FF2E86]/[0.06] blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-40 left-1/4 h-80 w-80 rounded-full bg-[#FF2E86]/[0.04] blur-[140px]" />

      <div className="relative mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
        {/* ───── CTA band ───── */}
        <div className="footer-item flex flex-col gap-6 border-b border-neutral-800/80 py-12 sm:flex-row sm:items-end sm:justify-between sm:py-16">
          <div>
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[#FF2E86]">
              Get in touch
            </p>
            <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Let&apos;s build
              <span className="text-neutral-500"> something</span>
              <br className="hidden sm:block" /> great together.
            </h2>
          </div>

       <Link
  href="/contact"
  className="group inline-flex items-center gap-3 self-start rounded-full border border-neutral-700 bg-neutral-900/60 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:border-[#FF2E86] hover:bg-[#FF2E86] hover:text-black sm:self-auto"
>
  Start a project
  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
</Link>
        </div>

        {/* ───── Main grid ───── */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 py-14 sm:gap-x-12 md:grid-cols-4 lg:gap-x-16">
          {/* Brand + contact */}
          <div className="footer-item col-span-2 md:col-span-1">
            <Link
              href="#home"
              className="mb-6 inline-flex items-center gap-2.5"
              aria-label="ClickMasters home"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FF2E86] text-sm font-bold text-black">
                CM
              </span>
              <span className="text-lg font-semibold tracking-tight text-white">
                ClickMasters
              </span>
            </Link>

            <p className="mb-6 max-w-xs text-sm leading-relaxed text-neutral-500">
              A full-service digital marketing agency helping brands grow through
              data-driven strategy, design, and automation.
            </p>

            <div className="space-y-3.5">
              <a
                href="mailto:sales@clickmastersdigitalmarketing.com"
                className="group flex items-start gap-3 text-sm text-neutral-400 transition-colors hover:text-white"
              >
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-neutral-600 transition-colors group-hover:text-[#FF2E86]" />
                <span className="break-all">
                  sales@clickmastersdigitalmarketing.com
                </span>
              </a>

              <a
                href="tel:+447988576086"
                className="group flex items-start gap-3 text-sm text-neutral-400 transition-colors hover:text-white"
              >
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-neutral-600 transition-colors group-hover:text-[#FF2E86]" />
                <span>
                  +44 7988 576086
                  <span className="ml-2 text-xs text-neutral-600">UK</span>
                </span>
              </a>

              <a
                href="tel:+13252024074"
                className="group flex items-start gap-3 text-sm text-neutral-400 transition-colors hover:text-white"
              >
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-neutral-600 transition-colors group-hover:text-[#FF2E86]" />
                <span>
                  +1 325 202 4074
                  <span className="ml-2 text-xs text-neutral-600">US</span>
                </span>
              </a>

              <a
                href="tel:+923325394285"
                className="group flex items-start gap-3 text-sm text-neutral-400 transition-colors hover:text-white"
              >
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-neutral-600 transition-colors group-hover:text-[#FF2E86]" />
                <span>
                  +92 332 5394285
                  <span className="ml-2 text-xs text-neutral-600">PK</span>
                </span>
              </a>
            </div>
          </div>

          {/* Explore Services */}
          <nav className="footer-item" aria-label="Services">
            <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Explore Services
            </h3>
            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1.5 text-[14px] text-neutral-400 transition-colors duration-200 hover:text-white"
                  >
                    <span className="relative">
                      {item.label}
                      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#FF2E86] transition-all duration-300 group-hover:w-full" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Quick Links */}
          <nav className="footer-item" aria-label="Quick links">
            <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1.5 text-[14px] text-neutral-400 transition-colors duration-200 hover:text-white"
                  >
                    <span className="relative">
                      {item.label}
                      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#FF2E86] transition-all duration-300 group-hover:w-full" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Offices */}
          <div className="footer-item">
            <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Offices
            </h3>
            <ul className="space-y-5">
              {offices.map((office) => (
                <li key={office.city}>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(
                      `${office.line1} ${office.line2}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <div className="mb-1 flex items-center gap-1.5 text-sm font-medium text-neutral-200 transition-colors group-hover:text-[#FF2E86]">
                      <MapPin className="h-3.5 w-3.5 text-neutral-600 transition-colors group-hover:text-[#FF2E86]" />
                      {office.city}
                    </div>
                    <p className="pl-5 text-[13px] leading-relaxed text-neutral-500 transition-colors group-hover:text-neutral-400">
                      {office.line1}
                      <br />
                      {office.line2}
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ───── Bottom bar ───── */}
        <div className="footer-item flex flex-col gap-6 border-t border-neutral-800/80 py-8 md:flex-row md:items-center md:justify-between">
          <p className="text-center text-[13px] text-neutral-500 md:text-left">
            © {new Date().getFullYear()} ClickMasters Digital Marketing Agency.
            All rights reserved.
          </p>

          <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
            <div className="flex gap-6 text-[13px] text-neutral-500">
              <Link
                href="#privacy"
                className="transition-colors hover:text-white"
              >
                Privacy
              </Link>
              <Link href="#terms" className="transition-colors hover:text-white">
                Terms
              </Link>
              <Link
                href="/sitemap_index.xml"
                className="transition-colors hover:text-white"
              >
                Sitemap
              </Link>
            </div>

            <div className="flex items-center gap-1">
              {socialLinks.map((social) => (
                <SocialIcon
                  key={social.label}
                  label={social.label}
                  href={social.href}
                  path={social.path}
                />
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
            className="inline-flex items-center gap-1.5 text-[12px] text-neutral-600 transition-colors hover:text-[#FF2E86]"
          >
            Verified on TechBehemoths
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({
  label,
  href,
  path,
}: {
  label: string;
  href: string;
  path: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ClickMasters on ${label}`}
      title={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 transition-all duration-200 hover:bg-neutral-800 hover:text-[#FF2E86] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E86]"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="h-[17px] w-[17px]"
      >
        <path d={path} />
      </svg>
    </a>
  );
}