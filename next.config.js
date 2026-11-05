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
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }]
  },
  async redirects() {
    return [
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
