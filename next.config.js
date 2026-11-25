const { erpAdminOrigins } = require("./src/lib/erpAdminOrigins")

// Content-Security-Policy with the given frame-ancestors; everything else is
// the same on every route.
const contentSecurityPolicy = (frameAncestors) =>
  [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      `frame-ancestors ${frameAncestors}`,
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:",
      "style-src 'self' 'unsafe-inline' https:",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data: https:",
      "connect-src 'self' https: wss:",
      "media-src 'self' blob: https:",
      "worker-src 'self' blob:",
      "frame-src 'self' https:",
      "form-action 'self' https:",
  ].join("; ")

const commonSecurityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
]

// Same policy as clickmastersaiautomation.com, plus Permissions-Policy.
// Set here (not only in nginx) so every response from the app carries them.
const securityHeaders = [
  ...commonSecurityHeaders,
  { key: "Content-Security-Policy", value: contentSecurityPolicy("'self'") },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
]

// /erp-preview is shown in the ERP page editor's iframe: only the ERP admin
// origins (ERP_ADMIN_ORIGINS, read at build time) may frame it, and it has no
// X-Frame-Options (SAMEORIGIN would block the ERP). No caching: it renders an
// unsaved draft behind a token.
const erpPreviewHeaders = [
  ...commonSecurityHeaders,
  {
    key: "Content-Security-Policy",
    value: contentSecurityPolicy(["'self'", ...erpAdminOrigins()].join(" ")),
  },
  { key: "Cache-Control", value: "private, no-store, max-age=0" },
  { key: "X-Robots-Tag", value: "noindex, nofollow" },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  poweredByHeader: false,
  // Keep streamed metadata in <head> for every user agent.
  htmlLimitedBots: /.*/,
  images: {
    // AVIF first (smaller), WebP fallback for browsers without AVIF support.
    formats: ["image/avif", "image/webp"],
    // Optimized images were re-generated after 60s (the default), so the
    // server kept re-encoding the same product images. Files in /public are
    // sometimes replaced in place under the same name, so keep this moderate.
    minimumCacheTTL: 14400,
  },
  async headers() {
    // Images served directly from /public (no hashed filenames, occasionally
    // replaced in place): short browser cache + background revalidation
    // instead of the default max-age=0. Extension-matched so the /locations/*
    // and /products/* pages themselves are not affected.
    const publicImageCache = [
      {
        key: "Cache-Control",
        value: "public, max-age=3600, stale-while-revalidate=86400",
      },
    ]
    return [
      // Every route except /erp-preview keeps the normal framing protection.
      { source: "/:path((?!erp-preview$).*)", headers: securityHeaders },
      { source: "/erp-preview", headers: erpPreviewHeaders },
      {
        source: "/:dir(flags|locations|products)/:file([^/]+\\.(?:png|jpe?g|webp|avif|svg))",
        headers: publicImageCache,
      },
    ]
  },
  async redirects() {
    return [
      // www served a full 200 duplicate of the site; send it to the apex host.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.clickmastersdigitalmarketing.com" }],
        destination: "https://clickmastersdigitalmarketing.com/:path*",
        permanent: true,
      },
      // Product images were converted from PNG to WebP; keep any indexed or
      // external links to the old files working.
      {
        source: "/products/:file([A-Za-z0-9_-]+)\\.png",
        destination: "/products/:file.webp",
        permanent: true,
      },
      {
        source: "/locations/seo-services-tampa",
        destination:
          "/search-engine-optimization/locations/seo-services-tampa",
        permanent: true,
      },
      {
        source: "/locations/seo-services-seattle",
        destination:
          "/search-engine-optimization/locations/seo-services-seattle",
        permanent: true,
      },
      {
        source: "/locations/seo-services-phoenix",
        destination:
          "/search-engine-optimization/locations/seo-services-phoenix",
        permanent: true,
      },
      {
        source: "/locations/seo-services-richmond",
        destination:
          "/search-engine-optimization/locations/seo-services-richmond",
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
