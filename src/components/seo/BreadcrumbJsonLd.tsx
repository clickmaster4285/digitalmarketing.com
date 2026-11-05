"use client";

// Sitewide BreadcrumbList built from the URL path. Rendered during SSR/SSG
// so the JSON-LD is in the initial HTML.
import { usePathname } from "next/navigation";
import { SITE_URL } from "@/lib/organizationSchema";

const UPPERCASE = new Set([
  "seo", "ppc", "ai", "ml", "cro", "ui", "ux", "api", "pwa", "ada", "iot",
  "ar", "vr", "roi", "fba", "usa", "pos", "crm", "aeo", "geo",
]);
const LABELS: Record<string, string> = {
  "pay-per-click": "Pay-Per-Click",
  "ecommerce-services": "E-Commerce Services",
  "ecommerce-seo": "E-Commerce SEO",
  "ecommerce-development": "E-Commerce Development",
  "ecommerce-marketing": "E-Commerce Marketing",
  "ecommerce-analytics": "E-Commerce Analytics",
  "on-page-seo": "On-Page SEO",
  "off-page-seo-link-building": "Off-Page SEO & Link Building",
  "ios-app-development": "iOS App Development",
  "tiktok-shop-management": "TikTok Shop Management",
  "linkedin-ads-management": "LinkedIn Ads Management",
  "youtube-ads-management": "YouTube Ads Management",
  "youtube-seo": "YouTube SEO",
  "facebook-instagram-ads": "Facebook & Instagram Ads",
  "woocommerce-development": "WooCommerce Development",
  "woocommerce-marketing": "WooCommerce Marketing",
  "bigcommerce-marketing": "BigCommerce Marketing",
  "devops": "DevOps",
};

const labelFor = (segment: string) =>
  LABELS[segment] ??
  segment
    .split("-")
    .map((word) =>
      UPPERCASE.has(word) ? word.toUpperCase() : word[0].toUpperCase() + word.slice(1),
    )
    .join(" ");

// Service city pages emit their own, more specific BreadcrumbList.
const HAS_OWN_BREADCRUMBS = /^\/[^/]+\/locations\/[^/]+$/;

export default function BreadcrumbJsonLd() {
  const pathname = usePathname() || "/";
  if (pathname === "/" || HAS_OWN_BREADCRUMBS.test(pathname)) return null;

  const segments = pathname.split("/").filter(Boolean);
  const itemListElement = [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    ...segments.map((segment, index) => ({
      "@type": "ListItem",
      position: index + 2,
      name: labelFor(segment),
      item: `${SITE_URL}/${segments.slice(0, index + 1).join("/")}`,
    })),
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement,
        }),
      }}
    />
  );
}
