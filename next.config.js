/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
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
