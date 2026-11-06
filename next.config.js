// Same policy as clickmastersaiautomation.com, plus Permissions-Policy.
// Set here (not only in nginx) so every response from the app carries them.
const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:",
      "style-src 'self' 'unsafe-inline' https:",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data: https:",
      "connect-src 'self' https: wss:",
      "media-src 'self' blob: https:",
      "worker-src 'self' blob:",
      "frame-src 'self' https:",
      "form-action 'self' https:",
    ].join("; "),
  },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
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
      { source: "/:path*", headers: securityHeaders },
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
