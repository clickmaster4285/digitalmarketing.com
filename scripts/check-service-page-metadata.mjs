import { spawn } from "node:child_process";
import { createServer } from "node:net";

const host = "127.0.0.1";
const serviceRoots = [
  "search-engine-optimization",
  "pay-per-click",
  "social-media-marketing",
  "mobile-app-development",
  "conversion-rate-optimization",
  "content-marketing",
  "ai-automation",
  "web-design-development",
  "ecommerce-services",
  "pay-per-click-ppc",
];

const getAvailablePort = async () => {
  const server = createServer();
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, host, resolve);
  });
  const { port } = server.address();
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
  return port;
};

const decodeHtml = (value) =>
  value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/gi, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

const extractInternalLinks = (html) =>
  new Set(
    [...html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/gi)]
      .map((match) => decodeHtml(match[1]))
      .filter((href) => href.startsWith("/")),
  );

const checkServiceLinkCoverage = async (baseUrl, sitemapRoutes) => {
  const directoryResponse = await fetch(new URL("/services", baseUrl));
  if (!directoryResponse.ok) {
    throw new Error(`/services returned HTTP ${directoryResponse.status}`);
  }
  const directoryHtml = await directoryResponse.text();
  const directoryLinks = extractInternalLinks(directoryHtml);
  const missingSitemapRoutes = sitemapRoutes.filter(
    (route) => !directoryLinks.has(route),
  );
  if (missingSitemapRoutes.length) {
    throw new Error(
      `/services does not link to sitemap routes:\n${missingSitemapRoutes
        .map((route) => `- ${route}`)
        .join("\n")}`,
    );
  }

  const categoryLists = [
    ...directoryHtml.matchAll(
      /<ul\b[^>]*\bdata-service-category="([^"]+)"[^>]*>([\s\S]*?)<\/ul>/gi,
    ),
  ];
  if (!categoryLists.length) {
    throw new Error("/services rendered no categorized service links");
  }

  const childRoutes = new Set();
  for (const [, categoryHref, categoryMarkup] of categoryLists) {
    const categoryResponse = await fetch(new URL(categoryHref, baseUrl));
    if (!categoryResponse.ok) {
      throw new Error(`${categoryHref} returned HTTP ${categoryResponse.status}`);
    }
    const categoryHtml = await categoryResponse.text();
    const children = extractInternalLinks(categoryMarkup);
    for (const childRoute of children) {
      childRoutes.add(childRoute);
      if (!categoryHtml.includes(`href="${childRoute}"`)) {
        throw new Error(
          `${categoryHref} does not link to its listed child ${childRoute}`,
        );
      }
    }
  }

  const invalidRoutes = [];
  let nextRoute = 0;
  const routes = [...childRoutes];
  await Promise.all(
    Array.from({ length: Math.min(8, routes.length) }, async () => {
      while (nextRoute < routes.length) {
        const route = routes[nextRoute];
        nextRoute += 1;
        const response = await fetch(new URL(route, baseUrl));
        if (!response.ok) {
          invalidRoutes.push(`${route}: HTTP ${response.status}`);
        }
      }
    }),
  );
  if (invalidRoutes.length) {
    throw new Error(
      `Service directory contains invalid links:\n${invalidRoutes
        .map((route) => `- ${route}`)
        .join("\n")}`,
    );
  }

  console.log(
    `Verified ${childRoutes.size} service links on their parent hubs and in the service directory.`,
  );
};

const checkLocationLinks = async (baseUrl) => {
  const locationsResponse = await fetch(new URL("/locations", baseUrl));
  if (!locationsResponse.ok) {
    throw new Error(`/locations returned HTTP ${locationsResponse.status}`);
  }
  const locationsHtml = await locationsResponse.text();
  extractMetadata(locationsHtml, "/locations");
  const locationRoutes = [
    ...extractInternalLinks(locationsHtml),
  ].filter((route) =>
    /^\/(?:locations\/[^/]+|search-engine-optimization\/locations\/seo-services-[^/]+)$/.test(
      route,
    ),
  );
  if (!locationRoutes.length) {
    throw new Error("/locations rendered no city-page links");
  }

  const homeResponse = await fetch(new URL("/", baseUrl));
  const homeHtml = await homeResponse.text();
  extractMetadata(homeHtml, "/");
  const aboutResponse = await fetch(new URL("/about", baseUrl));
  if (!aboutResponse.ok) {
    throw new Error(`/about returned HTTP ${aboutResponse.status}`);
  }
  extractMetadata(await aboutResponse.text(), "/about");
  const footerLinks = extractInternalLinks(homeHtml);
  const missingFooterRoutes = locationRoutes.filter(
    (route) => !footerLinks.has(route),
  );
  if (missingFooterRoutes.length) {
    throw new Error(
      `Footer does not link to location pages:\n${missingFooterRoutes
        .map((route) => `- ${route}`)
        .join("\n")}`,
    );
  }

  const failures = [];
  const locationTitles = new Map();
  let nextRoute = 0;
  await Promise.all(
    Array.from({ length: Math.min(8, locationRoutes.length) }, async () => {
      while (nextRoute < locationRoutes.length) {
        const route = locationRoutes[nextRoute];
        nextRoute += 1;
        const response = await fetch(new URL(route, baseUrl));
        if (!response.ok) {
          failures.push(`${route}: HTTP ${response.status}`);
          continue;
        }
        const html = await response.text();
        await checkImageMarkup(html, route, baseUrl);
        const title = extractMetadata(html, route);
        if (locationTitles.has(title)) {
          failures.push(
            `${route}: duplicate title also used by ${locationTitles.get(title)}`,
          );
        } else {
          locationTitles.set(title, route);
        }
        const regionalLinks = html.match(
          /<section\b[^>]*\bdata-location-region-links(?:="[^"]*")?[^>]*>([\s\S]*?)<\/section>/i,
        )?.[1];
        if (
          !regionalLinks ||
          ![...extractInternalLinks(regionalLinks)].some(
            (linkedRoute) =>
              /^\/(?:locations\/[^/]+|search-engine-optimization\/locations\/seo-services-[^/]+)$/.test(
                linkedRoute,
              ) && linkedRoute !== route,
          )
        ) {
          failures.push(`${route}: missing links to other regional city pages`);
        }
        if (!html.includes("+1 325 202 4074")) {
          failures.push(`${route}: missing the displayed US contact number`);
        }
        if (!html.includes("sales@clickmastersdigitalmarketing.com")) {
          failures.push(`${route}: missing the on-domain email`);
        }
        if (/555\D*123\D*4567/i.test(html)) {
          failures.push(`${route}: contains the placeholder phone number`);
        }
      }
    }),
  );
  if (failures.length) {
    throw new Error(
      `Location-page check failed:\n${failures
        .map((failure) => `- ${failure}`)
        .join("\n")}`,
    );
  }

  for (const claim of [
    "Certified Google Partner",
    "200+ US Businesses Grown",
    "$50M+ Client Revenue Generated",
    "5-Star Rated Agency",
    "Certified Experts",
  ]) {
    if (homeHtml.includes(claim)) {
      throw new Error(`Homepage still displays an unlinked proof claim: ${claim}`);
    }
  }
  if (
    !homeHtml.includes(
      "https://techbehemoths.com/company/clickmasters-digital-marketing-agency-us",
    )
  ) {
    throw new Error("Homepage footer is missing its linked TechBehemoths profile");
  }

  console.log(
    `Verified ${locationRoutes.length} location links in the footer and valid contact details on each page.`,
  );
};

const checkServiceCityDirectories = async (baseUrl) => {
  const hubs = [
    ["search-engine-optimization", "sitemap_seo_locations.xml"],
    ["pay-per-click", "sitemap_ppc_locations.xml"],
    ["social-media-marketing", "sitemap_social_media_locations.xml"],
  ];
  let total = 0;
  for (const [service, sitemap] of hubs) {
    const sitemapXml = await (await fetch(new URL(`/${sitemap}`, baseUrl))).text();
    const cityRoutes = [
      ...sitemapXml.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g),
    ].map((match) => match[1]);
    if (!cityRoutes.length) throw new Error(`${sitemap} listed no city pages`);

    const hubRoute = `/${service}/locations`;
    const hubResponse = await fetch(new URL(hubRoute, baseUrl));
    if (!hubResponse.ok) {
      throw new Error(`${hubRoute} returned HTTP ${hubResponse.status}`);
    }
    const hubLinks = extractInternalLinks(await hubResponse.text());
    const unlinked = cityRoutes.filter((route) => !hubLinks.has(route));
    if (unlinked.length) {
      throw new Error(
        `${hubRoute} does not link to ${unlinked.length} city pages from ${sitemap}:\n${unlinked
          .slice(0, 10)
          .map((route) => `- ${route}`)
          .join("\n")}`,
      );
    }

    const serviceLinks = extractInternalLinks(
      await (await fetch(new URL(`/${service}`, baseUrl))).text(),
    );
    if (!serviceLinks.has(hubRoute)) {
      throw new Error(`/${service} does not link to ${hubRoute}`);
    }
    total += cityRoutes.length;
  }
  console.log(`Verified ${total} service city pages are linked from their location hubs.`);
};

const extractMetadata = (html, route) => {
  const headEnd = html.indexOf("</head>");
  if (headEnd === -1) {
    throw new Error(`${route} rendered without a closing </head>`);
  }
  const head = html.slice(0, headEnd);
  const titleMatch = head.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!titleMatch || !titleMatch[1].trim()) {
    throw new Error(`${route} rendered without a non-empty <title> in <head>`);
  }

  const descriptionMatch = head.match(
    /<meta\b[^>]*\bname="description"[^>]*\bcontent="([^"]*)"/i,
  );
  if (!descriptionMatch) {
    throw new Error(`${route} rendered without a meta description in <head>`);
  }
  if (!/<link\b[^>]*\brel="canonical"[^>]*\bhref="[^"]+"/i.test(head)) {
    throw new Error(`${route} rendered without a canonical link in <head>`);
  }
  if (!/<meta\b[^>]*\bname="robots"[^>]*\bcontent="[^"]+"/i.test(head)) {
    throw new Error(`${route} rendered without a robots directive in <head>`);
  }

  const title = decodeHtml(titleMatch[1].replace(/<[^>]*>/g, "")).trim();
  const description = decodeHtml(descriptionMatch[1]).trim();
  if (
    /<title\b|<meta\b[^>]*\bname="(?:description|robots)"|<link\b[^>]*\brel="canonical"/i.test(
      html.slice(headEnd + "</head>".length),
    )
  ) {
    throw new Error(`${route} rendered metadata outside <head>`);
  }
  if (title.length > 60) {
    throw new Error(`${route} title exceeds 60 characters (${title.length})`);
  }
  if (description.length < 70 || description.length > 155) {
    throw new Error(
      `${route} description must be 70-155 characters (${description.length})`,
    );
  }
  return title;
};

const checkedImageUrls = new Set();
const checkImageMarkup = async (html, route, baseUrl) => {
  const imageTags = [...html.matchAll(/<img\b[^>]*>/gi)].map((match) => match[0]);
  const failures = [];

  for (const tag of imageTags) {
    if (!/\balt\s*=\s*(?:"[^"]*"|'[^']*')/i.test(tag)) {
      failures.push(`${route}: image is missing an alt attribute`);
    }

    const source = tag.match(/\bsrc="([^"]+)"/i)?.[1];
    if (!source) continue;
    const imageUrl = decodeHtml(source);
    if (!imageUrl.startsWith("/") || checkedImageUrls.has(imageUrl)) continue;
    checkedImageUrls.add(imageUrl);

    const response = await fetch(new URL(imageUrl, baseUrl));
    if (!response.ok) {
      failures.push(`${route}: image ${imageUrl} returned HTTP ${response.status}`);
      continue;
    }
    const contentType = response.headers.get("content-type") ?? "";
    if (contentType.startsWith("image/")) {
      const byteLength = (await response.arrayBuffer()).byteLength;
      if (byteLength > 300 * 1024) {
        failures.push(
          `${route}: image ${imageUrl} exceeds 300 KB (${byteLength} bytes)`,
        );
      }
    }
  }

  if (failures.length) {
    throw new Error(failures.join("\n"));
  }
};

const checkPageHeadingsAndImages = async (baseUrl) => {
  const expectedHeadings = new Map([
    ["/", "Grow Your Business With a Full-Service"],
    ["/about", "Clickmasters Your Growth Partner"],
    ["/solutions", "Industries We Serve"],
    ["/pricing", "Our Digital Marketing Agency Pricing"],
  ]);
  for (const [route, expectedHeading] of expectedHeadings) {
    const response = await fetch(new URL(route, baseUrl));
    if (!response.ok) {
      throw new Error(`${route} returned HTTP ${response.status}`);
    }
    const html = await response.text();
    extractMetadata(html, route);
    const headings = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
    if (headings.length !== 1) {
      throw new Error(`${route} must render exactly one H1 (found ${headings.length})`);
    }
    const headingText = decodeHtml(
      headings[0][1].replace(/<[^>]*>/g, " ").replace(/\s+/g, " "),
    ).trim();
    if (!headingText.includes(expectedHeading)) {
      throw new Error(`${route} H1 does not contain "${expectedHeading}": ${headingText}`);
    }
    await checkImageMarkup(html, route, baseUrl);
  }

  const contactResponse = await fetch(new URL("/contact", baseUrl));
  if (!contactResponse.ok) {
    throw new Error(`/contact returned HTTP ${contactResponse.status}`);
  }
  const contactHtml = await contactResponse.text();
  await checkImageMarkup(contactHtml, "/contact", baseUrl);
  if (contactHtml.includes("https://flagcdn.com")) {
    throw new Error("/contact still loads flags from the external flag CDN");
  }
  console.log("Verified page H1s, image alt attributes, and image sizes (<=300 KB).");
};

const checkCounters = async (baseUrl, routes) => {
  for (const route of routes) {
    const response = await fetch(new URL(route, baseUrl));
    if (!response.ok) {
      throw new Error(`${route} returned HTTP ${response.status}`);
    }
    const html = await response.text();
    const values = [
      ...html.matchAll(
        /<span\b[^>]*\bdata-counter="true"[^>]*>([\s\S]*?)<\/span>/gi,
      ),
    ].map((match) => decodeHtml(match[1].replace(/<[^>]*>/g, "")).trim());

    if (!values.length) {
      throw new Error(`${route} rendered no server-visible counters`);
    }
    if (
      values.some((value) => {
        const numericPart = value.match(/^\D*(\d+)/)?.[1];
        return numericPart !== undefined && Number(numericPart) === 0;
      })
    ) {
      throw new Error(`${route} rendered a zeroed counter: ${values.join(", ")}`);
    }
  }
  console.log(`Verified server-visible non-zero counters on ${routes.join(" and ")}.`);
};

const jsonLdTypes = (html) => {
  const types = new Set();
  const visit = (node) => {
    if (Array.isArray(node)) return node.forEach(visit);
    if (!node || typeof node !== "object") return;
    if (node["@type"]) types.add(node["@type"]);
    if (node["@graph"]) visit(node["@graph"]);
  };
  for (const match of html.matchAll(
    /<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi,
  )) {
    visit(JSON.parse(match[1]));
  }
  return types;
};

const checkSitewideStructuredData = async (baseUrl) => {
  const expectations = {
    "/": ["Organization", "WebSite"],
    "/about": ["Organization", "WebSite", "BreadcrumbList"],
    "/locations/digital-marketing-agency-chicago": [
      "Organization",
      "BreadcrumbList",
      "Service",
    ],
    "/conversion-rate-optimization/roi-calculator": ["Organization", "BreadcrumbList", "WebPage"],
  };
  for (const [route, required] of Object.entries(expectations)) {
    const html = await (await fetch(new URL(route, baseUrl))).text();
    const types = jsonLdTypes(html);
    const missing = required.filter((type) => !types.has(type));
    if (missing.length) {
      throw new Error(`${route} is missing structured data: ${missing.join(", ")}`);
    }
    if (/Answer available on page content/.test(html)) {
      throw new Error(`${route} has placeholder FAQ answers in structured data`);
    }
    const organization = html.match(/"@type":"Organization","@id":"[^"]+#organization"[^<]*/)?.[0] ?? "";
    for (const field of ['"logo"', '"telephone"', '"sameAs"', '"address"']) {
      if (!organization.includes(field)) {
        throw new Error(`${route} Organization schema is missing ${field}`);
      }
    }
  }
  console.log(`Verified Organization, WebSite and BreadcrumbList structured data on sample pages.`);
};

const REQUIRED_SECURITY_HEADERS = [
  "strict-transport-security",
  "content-security-policy",
  "x-frame-options",
  "x-content-type-options",
  "referrer-policy",
  "permissions-policy",
];

const checkSecurityHeaders = async (baseUrl, routes) => {
  for (const route of routes) {
    const response = await fetch(new URL(route, baseUrl));
    const missing = REQUIRED_SECURITY_HEADERS.filter(
      (header) => !response.headers.get(header),
    );
    if (missing.length) {
      throw new Error(`${route} is missing security headers: ${missing.join(", ")}`);
    }
    if (response.headers.get("x-powered-by")) {
      throw new Error(`${route} still sends X-Powered-By`);
    }
  }
  console.log(`Verified security headers on ${routes.length} routes.`);
};

const checkSitemaps = async (baseUrl) => {
  const index = await (await fetch(new URL("/sitemap_index.xml", baseUrl))).text();
  const children = [...index.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g)].map(
    (match) => match[1],
  );
  const urls = new Set();
  for (const child of children) {
    const response = await fetch(new URL(child, baseUrl), { redirect: "manual" });
    if (response.status !== 200) {
      throw new Error(`Sitemap index child ${child} returned HTTP ${response.status}`);
    }
    for (const match of (await response.text()).matchAll(
      /<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g,
    )) {
      urls.add(match[1] || "/");
    }
  }

  const failures = [];
  const routes = [...urls];
  let next = 0;
  await Promise.all(
    Array.from({ length: 8 }, async () => {
      while (next < routes.length) {
        const route = routes[next++];
        const response = await fetch(new URL(route, baseUrl), { redirect: "manual" });
        if (response.status !== 200) {
          failures.push(`${route}: HTTP ${response.status}`);
          continue;
        }
        const html = await response.text();
        const head = html.slice(0, html.indexOf("</head>"));
        const canonical = head.match(/<link rel="canonical" href="https?:\/\/[^/"]+([^"]*)"/)?.[1] || "/";
        if (canonical !== route) failures.push(`${route}: canonical is ${canonical}`);
        if (/<meta name="robots" content="[^"]*noindex/.test(head)) {
          failures.push(`${route}: noindex`);
        }
      }
    }),
  );
  if (failures.length) {
    throw new Error(
      `Sitemap URLs must be 200, self-canonical and indexable:\n${failures
        .map((failure) => `- ${failure}`)
        .join("\n")}`,
    );
  }
  console.log(`Verified ${children.length} sitemaps and ${routes.length} sitemap URLs.`);
};

const checkStructuredData = async (baseUrl) => {
  const route = "/conversion-rate-optimization/roi-calculator";
  const response = await fetch(new URL(route, baseUrl));
  if (!response.ok) {
    throw new Error(`${route} returned HTTP ${response.status}`);
  }

  const html = await response.text();
  const blocks = [
    ...html.matchAll(
      /<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ];
  const schemas = blocks.map((match) => JSON.parse(match[1]));
  if (schemas.some((schema) => schema["@type"] === "WebApplication")) {
    throw new Error(`${route} must not claim WebApplication without genuine app reviews`);
  }
  if (!schemas.some((schema) => schema["@type"] === "WebPage")) {
    throw new Error(`${route} must include WebPage structured data`);
  }
  console.log(`Verified WebPage structured data on ${route}.`);
};

const checkRoutes = async (baseUrl, routes) => {
  const titles = new Map();
  const failures = [];
  let nextRoute = 0;
  const workerCount = Math.min(8, routes.length);

  await Promise.all(
    Array.from({ length: workerCount }, async () => {
      while (nextRoute < routes.length) {
        const route = routes[nextRoute];
        nextRoute += 1;

        try {
          const response = await fetch(new URL(route, baseUrl));
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
          }
          const html = await response.text();
          const title = extractMetadata(html, route);
          await checkImageMarkup(html, route, baseUrl);
          if (title === "Clickmasters Digital Marketing") {
            throw new Error("generic fallback title rendered on a service page");
          }
          if (/software crafted with care/i.test(title)) {
            throw new Error("generic software-studio title rendered on a service page");
          }
          if (/<h1\b[^>]*>\s*Service Not Found\s*<\/h1>/i.test(html)) {
            throw new Error("soft-404 heading rendered with HTTP 200");
          }
          if (titles.has(title)) {
            throw new Error(`duplicate title also used by ${titles.get(title)}`);
          }
          titles.set(title, route);
        } catch (error) {
          failures.push(`${route}: ${error.message}`);
        }
      }
    }),
  );

  if (failures.length) {
    throw new Error(
      `Service metadata check failed:\n${failures
        .map((failure) => `- ${failure}`)
        .join("\n")}`,
    );
  }
  console.log(`Verified title and description metadata on ${routes.length} service routes.`);
};

const port = await getAvailablePort();
const baseUrl = `http://${host}:${port}`;
const server = spawn(
  process.execPath,
  ["node_modules/next/dist/bin/next", "start", "--hostname", host, "--port", String(port)],
  { cwd: process.cwd(), env: { ...process.env, NODE_ENV: "production" }, stdio: ["ignore", "pipe", "pipe"] },
);

let serverOutput = "";
server.stdout.setEncoding("utf8").on("data", (chunk) => (serverOutput += chunk));
server.stderr.setEncoding("utf8").on("data", (chunk) => (serverOutput += chunk));

try {
  let ready = false;
  for (let attempt = 0; attempt < 60 && !ready; attempt += 1) {
    if (server.exitCode !== null) {
      throw new Error(`next start exited before becoming ready:\n${serverOutput}`);
    }
    try {
      const response = await fetch(`${baseUrl}/`);
      ready = response.ok;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  if (!ready) {
    throw new Error(`next start did not become ready:\n${serverOutput}`);
  }

  const sitemapResponse = await fetch(`${baseUrl}/sitemap_services.xml`);
  if (!sitemapResponse.ok) {
    throw new Error(`Could not load service sitemap: HTTP ${sitemapResponse.status}`);
  }
  const sitemap = await sitemapResponse.text();
  const sitemapRoutes = [
    ...sitemap.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g),
  ].map((match) => match[1]);
  const routes = [...new Set([...serviceRoots.map((slug) => `/${slug}`), ...sitemapRoutes])];
  if (routes.length === serviceRoots.length) {
    throw new Error("The service sitemap contained no service routes to validate.");
  }
  await checkRoutes(baseUrl, routes);
  await checkServiceLinkCoverage(baseUrl, sitemapRoutes);
  await checkLocationLinks(baseUrl);
  await checkPageHeadingsAndImages(baseUrl);
  await checkServiceCityDirectories(baseUrl);
  await checkCounters(baseUrl, ["/", "/about"]);
  await checkStructuredData(baseUrl);
  await checkSitewideStructuredData(baseUrl);
  await checkSecurityHeaders(baseUrl, [
    "/",
    "/about",
    "/search-engine-optimization",
    "/locations/digital-marketing-agency-chicago",
    "/sitemap_index.xml",
  ]);
  await checkSitemaps(baseUrl);

  const seoUsaLocationRoute =
    "/search-engine-optimization/locations/seo-services-usa";
  const seoUsaLocationResponse = await fetch(
    new URL(seoUsaLocationRoute, baseUrl),
  );
  if (!seoUsaLocationResponse.ok) {
    throw new Error(
      `${seoUsaLocationRoute} returned HTTP ${seoUsaLocationResponse.status}`,
    );
  }
  extractMetadata(await seoUsaLocationResponse.text(), seoUsaLocationRoute);

  const redirects = [
    [
      "/search-engine-optimization/off-page-seo",
      "/search-engine-optimization/off-page-seo-link-building",
    ],
    [
      "/search-engine-optimization/website-audit",
      "/search-engine-optimization/seo-audit",
    ],
  ];
  for (const [source, destination] of redirects) {
    const response = await fetch(new URL(source, baseUrl), { redirect: "manual" });
    const location = response.headers.get("location");
    if (
      response.status !== 301 ||
      !location ||
      new URL(location, baseUrl).pathname !== destination
    ) {
      throw new Error(`${source} must return a 301 redirect to ${destination}`);
    }
  }

  const legacyLocationSitemap = await fetch(
    new URL("/sitemap_locations.xml", baseUrl),
    { redirect: "manual" },
  );
  if (
    legacyLocationSitemap.status !== 200 ||
    !(await legacyLocationSitemap.text()).includes("<urlset")
  ) {
    throw new Error("/sitemap_locations.xml must return a 200 sitemap");
  }

  for (const slug of ["content-optimization", "ai-search-optimization"]) {
    const route = `/search-engine-optimization/${slug}`;
    const response = await fetch(new URL(route, baseUrl), { redirect: "manual" });
    if (response.status !== 404) {
      throw new Error(`${route} must return HTTP 404 (got ${response.status})`);
    }
  }

  const seoResponse = await fetch(
    new URL("/search-engine-optimization", baseUrl),
  );
  const seoHtml = await seoResponse.text();
  const seoHead = seoHtml.slice(0, seoHtml.indexOf("</head>"));
  if (
    !/<link\b[^>]*\brel="canonical"[^>]*\bhref="https:\/\/clickmastersdigitalmarketing\.com\/search-engine-optimization"/i.test(
      seoHead,
    )
  ) {
    throw new Error(
      "/search-engine-optimization must have its self-canonical in <head>",
    );
  }
} finally {
  server.kill();
}
