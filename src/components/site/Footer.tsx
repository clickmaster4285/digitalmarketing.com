
"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Phone, Mail } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const navCol1 = ["Work", "Services", "About", "Industries"];
const navCol2 = ["Testimonials", "Solutions", "Pricing"];

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
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-[#0a0a0a] text-neutral-200 border-t border-neutral-800 pt-12 sm:pt-16 pb-8 sm:pb-12"
    >
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 gap-10 sm:gap-12 md:grid-cols-12">
          {/* Contact Information */}
          <div className="md:col-span-5 footer-item text-center sm:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white mb-8">
              Let&apos;s Talk
            </h2>

            <div className="space-y-8">
              {/* Email */}
              <div>
                <p className="text-neutral-500 text-xs uppercase tracking-widest mb-3">
                  EMAIL
                </p>

                <a
                  href="mailto:sales@clickmastersdigitalmarketing.com"
                  className="group flex items-center justify-center sm:justify-start gap-3 hover:text-[#FF2E86] transition-all duration-300"
                >
                  <Mail className="w-5 h-5 text-neutral-400 group-hover:text-[#FF2E86]" />

                  <span className="text-[15px] sm:text-[17px] break-all">
                    sales@clickmastersdigitalmarketing.com
                  </span>

                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                </a>
              </div>

              {/* Phone Numbers */}
              <div>
                <p className="text-neutral-500 text-xs uppercase tracking-widest mb-4">
                  PHONE
                </p>

                <div className="space-y-6">
                  {/* United Kingdom */}
                  <a
                    href="tel:+447988576086"
                    className="group flex items-center justify-center sm:justify-start gap-3 hover:text-[#FF2E86] transition-all duration-300"
                  >
                    <Phone className="w-5 h-5 text-neutral-400 group-hover:text-[#FF2E86]" />

                    <div className="flex-1">
                      <div className="text-[15px] sm:text-[17px]">
                        +44 7988 576086
                      </div>
                      <div className="text-xs text-neutral-500">
                        United Kingdom
                      </div>
                    </div>

                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                  </a>

                  {/* United States */}
                  <a
                    href="tel:+13252024074"
                    className="group flex items-center justify-center sm:justify-start gap-3 hover:text-[#FF2E86] transition-all duration-300"
                  >
                    <Phone className="w-5 h-5 text-neutral-400 group-hover:text-[#FF2E86]" />

                    <div className="flex-1">
                      <div className="text-[15px] sm:text-[17px]">
                        +1 325 202 4074
                      </div>
                      <div className="text-xs text-neutral-500">
                        United States
                      </div>
                    </div>

                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                  </a>

                  {/* Pakistan */}
                  <a
                    href="tel:+923325394285"
                    className="group flex items-center justify-center sm:justify-start gap-3 hover:text-[#FF2E86] transition-all duration-300"
                  >
                    <Phone className="w-5 h-5 text-neutral-400 group-hover:text-[#FF2E86]" />

                    <div className="flex items-center gap-2 flex-1">
                      <span className="text-xl">🇵🇰</span>

                      <div>
                        <div className="text-[15px] sm:text-[17px]">
                          +92 332 5394285
                        </div>
                        <div className="text-xs text-neutral-500">
                          Pakistan
                        </div>
                      </div>
                    </div>

                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-4 footer-item">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 sm:gap-y-10">
              <div>
                <p className="text-neutral-500 text-xs uppercase tracking-widest mb-4">
                  EXPLORE
                </p>

                <ul className="space-y-3 text-[15px] sm:text-[16px]">
                  {navCol1.map((item) => (
                    <li key={item}>
                      <Link
                        href={`#${item.toLowerCase()}`}
                        className="group inline-flex items-center gap-2 text-neutral-300 hover:text-white transition-all duration-200"
                      >
                        {item}

                        <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-neutral-500 text-xs uppercase tracking-widest mb-4">
                  MORE
                </p>

                <ul className="space-y-3 text-[15px] sm:text-[16px]">
                  {navCol2.map((item) => (
                    <li key={item}>
                      <Link
                        href={`#${item.toLowerCase()}`}
                        className="group inline-flex items-center gap-2 text-neutral-300 hover:text-white transition-all duration-200"
                      >
                        {item}

                        <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Offices */}
          <div className="md:col-span-3 footer-item text-center sm:text-left">
            <p className="text-xs uppercase tracking-[2px] text-neutral-500 mb-3 sm:mb-4">
              OFFICES
            </p>

            <div className="space-y-5 sm:space-y-6 text-sm">
              {offices.map((office) => (
                <div key={office.city}>
                  <div className="font-medium text-neutral-100 hover:text-[#FF2E86] transition-colors">
                    {office.city}
                  </div>

                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(
                      `${office.line1} ${office.line2}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex flex-col sm:flex-row sm:items-start gap-0 sm:gap-1 text-neutral-400 hover:text-neutral-200 transition-colors mt-1 leading-snug"
                  >
                    <span>
                      {office.line1}
                      <br />
                      {office.line2}
                    </span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 text-xs sm:text-sm text-neutral-400 footer-item">
          <div className="text-center md:text-left">
            © 2026 ClickMasters Digital Marketing Agency
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            {/* Legal Links */}
            <div className="flex gap-4 sm:gap-6">
              <Link
                href="#privacy"
                className="group inline-flex items-center gap-1 hover:text-neutral-200 transition-colors"
              >
                Privacy
                <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
              </Link>

              <Link
                href="#terms"
                className="group inline-flex items-center gap-1 hover:text-neutral-200 transition-colors"
              >
                Terms
                <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
              </Link>

              <Link
                href="#sitemap"
                className="group inline-flex items-center gap-1 hover:text-neutral-200 transition-colors"
              >
                Sitemap
                <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
              </Link>
            </div>

            {/* Working Social Media Icons */}
            <div className="flex items-center gap-4 sm:gap-5 mt-2 sm:mt-0">
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

        {/* TechBehemoths Verification - Very Bottom */}
        <div className="mt-6 pt-4 border-t border-neutral-800 text-center">
          <a
            href="https://techbehemoths.com/company/clickmasters-digital-marketing-agency-us"
            target="_blank"
            rel="noopener noreferrer"
            data-techbehemoths-verification
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-neutral-400 hover:text-[#FF2E86] transition-colors"
          >
            Verified on TechBehemoths
            <ArrowUpRight className="w-3.5 h-3.5" />
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
      className="inline-flex items-center justify-center text-neutral-400 hover:text-[#FF2E86] transition-all duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E86] rounded"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="w-[18px] h-[18px] sm:w-5 sm:h-5"
      >
        <path d={path} />
      </svg>
    </a>
  );
}
