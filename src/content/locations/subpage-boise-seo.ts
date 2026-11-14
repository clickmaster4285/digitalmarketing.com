// src/content/locations/subpage-boise-seo.ts
// Content for the /search-engine-optimization/locations/seo-services-boise
// sub page. Every string below is the exact copy provided for this page.

export interface BoiseSubPageCaseStudy {
  title: string;
  startingPoint: string;
  whatWeDid: string;
  result: string;
}

export interface BoiseSubPageFaq {
  question: string;
  answer: string;
}

export interface BoiseSubPageTestimonial {
  quote: string;
  attribution?: string;
}

export interface BoiseSubPageStat {
  value: string;
  label: string;
}

export interface BoiseSubPageContent {
  slug: string;
  /** Main service this page belongs under, e.g. "search-engine-optimization" */
  serviceSlug: string;
  cityDisplay: string;
  stateDisplay: string;
  metaTitle: string;
  metaDescription: string;
  hero: {
    eyebrow: string;
    title: string;
    titleHighlight: string;
    paragraphs: string[];
    ctaPrimary: string;
    ctaSecondary: string;
    serving: string;
  };
  ctaTop: {
    title: string;
    description: string;
    description2: string;
    cta: string;
    note: string;
  };
  about: {
    title: string;
    paragraphs: string[];
    workWithTitle: string;
    workWith: string[];
  };
  services: {
    title: string;
    intro: string;
    items: { icon: string; title: string; body: string }[];
  };
  process: {
    title: string;
    intro: string;
    steps: { title: string; body: string }[];
  };
  whyChoose: {
    title: string;
    items: { icon: string; title: string; body: string }[];
  };
  results: {
    title: string;
    items: BoiseSubPageCaseStudy[];
    note: string;
  };
  realResults: {
    title: string;
    intro: string;
    items: { icon: string; title: string; body: string }[];
  };
  industries: {
    title: string;
    intro: string;
    items: { icon: string; title: string; body: string }[];
  };
  tools: {
    title: string;
    intro: string;
    items: { icon: string; title: string; body: string }[];
  };
  faqs: BoiseSubPageFaq[];
  /** Optional testimonials block (only rendered when present). */
  testimonials?: {
    title: string;
    intro?: string;
    items: BoiseSubPageTestimonial[];
  };
  /** Optional stats / numbers block (only rendered when present). */
  stats?: {
    title: string;
    intro?: string;
    items: BoiseSubPageStat[];
  };
  ctaBottom: {
    title: string;
    description: string;
    cta: string;
  };
}

export const boiseSeoSubPage: BoiseSubPageContent = {
  slug: "seo-services-boise",
  serviceSlug: "search-engine-optimization",
  cityDisplay: "Boise",
  stateDisplay: "ID",
  metaTitle: "SEO Services Boise | Grow Traffic, Leads & Sales",
  metaDescription:
    "Grow your Boise business with expert SEO services. Improve Google rankings, attract qualified traffic, generate more leads, and increase your online visibility.",
  hero: {
    eyebrow: "Boise · SEO Services",
    title: "Get More Customers With SEO Services",
    titleHighlight: "Boise Businesses Can Trust",
    paragraphs: [
      "If your business isn't showing up when local customers search on Google, you're missing valuable opportunities. Clickmasters offers SEO services in Boise that help businesses improve search visibility, attract relevant website traffic, and generate more leads.",
      "Our approach starts with understanding your business, competitors, customers, and goals. From keyword research and on-page optimization to technical SEO, content, and local search, every part of the strategy is designed to support sustainable growth.",
      "Whether you run a small local business or a growing company serving customers across Idaho, our team creates a practical SEO strategy that helps your website compete in search results.",
    ],
    ctaPrimary: "Get a Free SEO Consultation",
    ctaSecondary: "Talk to an SEO Consultant",
    serving: "Serving Boise, Meridian, Nampa, Eagle, and businesses across the Treasure Valley and Idaho.",
  },
  ctaTop: {
    title: "A Boise SEO Company That Understands Local Business",
    description:
      "We are a Boise-based SEO company that has spent years helping small and mid-sized businesses across Idaho grow their online presence. We don't believe in cookie-cutter SEO. Every business is different, so every SEO strategy we build is different too.",
    description2:
      "Book a free, no-pressure SEO consultation. We'll review your website, show you exactly where you're losing visibility, and tell you honestly whether SEO is the right move for your business right now.",
    cta: "Get a Free SEO Consultation",
    note: "No-load, no-pressure. Just clear, honest direction for your Boise business.",
  },
  about: {
    title: "A Boise SEO Company That Understands Local Business",
    paragraphs: [
      "Our team includes SEO specialists who understand both the technical side of search engine optimization and the local Boise market. We've worked with home service companies, healthcare providers, legal practices, contractors, and retail businesses across the Treasure Valley, and we know what it takes to rank in a competitive market like Idaho.",
      "What makes us different is simple: we explain what we're doing and why, we report honestly on results, and we treat your business like it's our own. When you search for \"SEO services Boise,\" you're not just looking for someone to run a checklist — you're looking for a partner who cares about your growth. That's what we aim to be.",
    ],
    workWithTitle: "Businesses we regularly work with include:",
    workWith: [
      "Home service companies across the Treasure Valley",
      "Healthcare providers and legal practices",
      "Contractors and specialized trade businesses",
      "Retail businesses and growing companies serving customers across Idaho",
    ],
  },
  services: {
    title: "Professional SEO Services for Businesses in Boise",
    intro:
      "We offer a full range of SEO services in Boise, built to work together as one strategy instead of scattered fixes.",
    items: [
      {
        icon: "Target",
        title: "Search Engine Optimization Strategy",
        body: "Every SEO campaign starts with a plan. We study your business, your competitors, and your customers to build an SEO strategy that fits your specific goals — whether that's more calls, more store visits, or more online sales.",
      },
      {
        icon: "KeySquare",
        title: "Keyword Research",
        body: "We find the exact search terms your Boise customers are typing into Google, then build your content and site structure around those terms so the right people find you at the right time.",
      },
      {
        icon: "Search",
        title: "On-Page SEO",
        body: "We optimize your titles, headings, page content, and internal links so search engines — and real visitors — understand exactly what your business offers.",
      },
      {
        icon: "Settings2",
        title: "Technical SEO",
        body: "Site speed, mobile-friendliness, crawl errors, and site structure all affect your rankings. We audit and fix the technical issues that quietly hold your website back.",
      },
      {
        icon: "MapPin",
        title: "Local SEO for Boise Businesses",
        body: "If you serve customers in Boise, Meridian, Nampa, Eagle, or anywhere in the Treasure Valley, local SEO helps you show up in \"near me\" searches and Google Maps results — where a lot of local customers start looking.",
      },
      {
        icon: "PenTool",
        title: "Content Creation",
        body: "We write content that answers your customers' questions, builds trust, and gives search engines a reason to rank your pages higher.",
      },
      {
        icon: "Share2",
        title: "Link Building",
        body: "We earn quality backlinks from relevant, trustworthy websites, which helps build your site's authority in Google's eyes over time.",
      },
      {
        icon: "LineChart",
        title: "SEO Audits",
        body: "Not sure why your site isn't ranking? Our SEO audits look at your entire website — content, technical setup, and backlinks — and give you a clear list of what to fix first.",
      },
    ],
  },
  process: {
    title: "How Our Boise SEO Company Works",
    intro:
      "Every project follows the same clear, results-driven process — from the first audit through ongoing optimization.",
    steps: [
      {
        title: "Step 1 — Audit & Research",
        body: "We start by auditing your current website and researching your competitors and target keywords. This tells us exactly where you stand and where the opportunities are.",
      },
      {
        title: "Step 2 — Strategy",
        body: "Based on the audit, we build a custom SEO plan mapped to your business goals — not a generic template used for every client.",
      },
      {
        title: "Step 3 — Execution",
        body: "Our team gets to work on-page, technically, and off-page: fixing site issues, publishing optimized content, and building links.",
      },
      {
        title: "Step 4 — Tracking & Reporting",
        body: "We track rankings, traffic, and conversions, and send you honest, easy-to-read reports so you always know what's happening with your campaign.",
      },
      {
        title: "Step 5 — Ongoing Adjustments",
        body: "SEO isn't \"set it and forget it.\" Search engines change their algorithms often, so we adjust your strategy as needed to keep your results moving in the right direction.",
      },
    ],
  },
  whyChoose: {
    title: "Why Boise Businesses Choose Our SEO Services",
    items: [
      {
        icon: "MapPin",
        title: "Local Knowledge",
        body: "We understand the Boise and Idaho market, not just SEO in general.",
      },
      {
        icon: "MessageSquare",
        title: "Honest Reporting",
        body: "No confusing jargon or inflated numbers. You'll always know what we're doing and why.",
      },
      {
        icon: "Target",
        title: "Custom Strategies",
        body: "Your SEO plan is built around your business, not copied from another client.",
      },
      {
        icon: "Layers",
        title: "Full-Service Approach",
        body: "Content, technical SEO, and link building, all handled under one roof.",
      },
      {
        icon: "TrendingUp",
        title: "Long-Term Focus",
        body: "We build SEO strategies meant to keep working for your business, not just spike traffic for a month.",
      },
      {
        icon: "KeyRound",
        title: "No Long-Term Lock-In",
        body: "We earn your business every month through results, not through a contract that traps you.",
      },
    ],
  },
  results: {
    title: "Example SEO Results for Boise Businesses",
    items: [
      {
        title: "Local Home Services Company in Boise",
        startingPoint:
          "A Boise home services business was ranking on pages two and three for several important service keywords. Most of its leads were also coming from paid advertising.",
        whatWeDid:
          "We improved the website's on-page SEO, fixed technical SEO issues, optimized important service pages, and created content around high-value Boise search terms.",
        result:
          "Several important keywords moved toward page-one positions, helping the business increase organic visibility and create more opportunities from Google search.",
      },
      {
        title: "Boise-Area Healthcare Practice",
        startingPoint:
          "A healthcare practice had a relatively new website with limited organic traffic and weak visibility for local searches.",
        whatWeDid:
          "We optimized the website for local search, improved service pages, strengthened location-focused content, optimized the Google Business Profile, and worked on relevant local authority signals.",
        result:
          "The practice improved its local search visibility and generated more opportunities from organic search over time.",
      },
      {
        title: "Idaho E-commerce Business",
        startingPoint:
          "An ecommerce business serving Idaho and surrounding areas had product pages that were struggling to rank. Organic search represented only a small portion of its overall traffic.",
        whatWeDid:
          "We addressed technical SEO issues, improved website performance, optimized product pages, strengthened internal linking, and aligned product content with search intent.",
        result:
          "The website gained stronger organic visibility and improved rankings across important product categories, creating more opportunities to generate sales through search.",
      },
    ],
    note: "",
  },
  realResults: {
    title: "SEO Results That Focus on Business Growth",
    intro:
      "The goal of Boise SEO is not simply to rank for keywords. A successful SEO campaign should help your business reach more people who are actively searching for your products or services.",
    items: [
      {
        icon: "TrendingUp",
        title: "Increasing organic search traffic",
        body: "A data-driven approach focuses on improving website performance and building a steady flow of organic visitors who are genuinely searching for your services.",
      },
      {
        icon: "Search",
        title: "Improving Google rankings",
        body: "We target valuable keyword opportunities and strengthen internal linking to lift your pages across the searches that matter.",
      },
      {
        icon: "MapPin",
        title: "Growing local search visibility",
        body: "We optimize your Google Business Profile and local presence so your business shows up for nearby customers across the Treasure Valley.",
      },
      {
        icon: "Sparkles",
        title: "Creating useful SEO content",
        body: "We publish content that answers real customer questions, builds trust, and gives search engines a reason to rank you higher.",
      },
      {
        icon: "UserPlus",
        title: "Generating qualified leads and conversions",
        body: "Every part of the campaign is aligned to turn relevant search traffic into enquiries, calls, and customers.",
      },
    ],
  },
  industries: {
    title: "SEO Services for Every Type of Idaho Business",
    intro:
      "Different industries search and buy differently. Here's how we approach SEO for the industries we work with most across Boise and Idaho.",
    items: [
      {
        icon: "Wrench",
        title: "Home Services",
        body: "From HVAC to plumbing to pest control, we help home service businesses in Boise rank for the searches that turn into service calls.",
      },
      {
        icon: "Scale",
        title: "Legal Services",
        body: "We help Boise law firms build authority online and rank for the specific legal services they offer, so the right clients find them first.",
      },
      {
        icon: "Stethoscope",
        title: "Healthcare & Dental",
        body: "Patients search online before they book. We help healthcare and dental practices in Idaho show up in those searches and build trust with clear, accurate content.",
      },
      {
        icon: "Car",
        title: "Automotive Repair",
        body: "Whether it's a small shop or a multi-location operation, we help auto repair businesses in Boise rank for local, high-intent searches.",
      },
      {
        icon: "ShoppingCart",
        title: "E-Commerce & Retail",
        body: "We help online stores improve product page rankings, fix technical issues that slow down sales, and build content that drives organic purchases.",
      },
      {
        icon: "Home",
        title: "Real Estate",
        body: "We help Boise real estate agents and agencies rank for neighborhood and market-specific searches that bring in serious buyers and sellers.",
      },
      {
        icon: "Utensils",
        title: "Restaurants & Hospitality",
        body: "Local search matters most here. We help restaurants and hospitality businesses show up when hungry, nearby customers are searching.",
      },
      {
        icon: "Code2",
        title: "Contractors & Specialty Trades",
        body: "From spray foam insulation to general contracting, we build SEO strategies around the specific services and service areas that matter most to your business.",
      },
      {
        icon: "Briefcase",
        title: "Professional Services",
        body: "Accountants, consultants, agencies, and other professional service providers rely on trust and visibility — we help build both.",
      },
    ],
  },
  tools: {
    title: "A Data-Driven Approach to Boise SEO",
    intro:
      "Every SEO campaign starts from a different position. Our approach is to identify the biggest opportunities first, improve the website systematically, and measure progress over time.",
    items: [
      {
        icon: "Settings2",
        title: "Technical SEO improvements",
        body: "We audit and fix the technical site issues that quietly cap your rankings, from speed to crawl errors and site structure.",
      },
      {
        icon: "KeySquare",
        title: "Keyword research & on-page optimization",
        body: "We find the exact terms Boise customers search, then optimize titles, headings, content, and internal links around them.",
      },
      {
        icon: "MapPin",
        title: "Local SEO",
        body: "We strengthen your local presence so your business shows up in \"near me\" searches and Google Maps across the Treasure Valley.",
      },
      {
        icon: "PenTool",
        title: "Content optimization & authority building",
        body: "We create useful content and earn quality backlinks to build your site's authority in Google's eyes over time.",
      },
      {
        icon: "LineChart",
        title: "Organic traffic growth",
        body: "We systematically improve performance and conversion opportunities so growth compounds month after month.",
      },
    ],
  },
  faqs: [
    {
      question: "What Is Included in Professional SEO Services?",
      answer:
        "Professional SEO services can include technical SEO, keyword research, on-page optimization, content improvements, local SEO, backlink development, competitor analysis, and performance tracking. The exact work depends on your website, industry, competition, and growth goals.",
    },
    {
      question: "How Long Does SEO Take to Show Results?",
      answer:
        "SEO is a gradual process, and the timeline varies based on your website's current authority, competition, technical condition, and target keywords. Some improvements may become visible within a few months, while competitive terms generally require consistent, long-term optimization.",
    },
    {
      question: "What Is the Difference Between Local SEO and National SEO?",
      answer:
        "Local SEO focuses on reaching customers in specific cities or service areas, while national SEO targets searches across a wider country or market. The right approach depends on where your customers are located and the geographic reach of your business.",
    },
  ],
  testimonials: {
    title: "What Our Clients Say",
    intro:
      "Businesses choose clickmasters for clear SEO strategies, transparent communication, and consistent optimization. Our team focuses on improving search visibility, attracting relevant traffic, and helping businesses grow through organic search.",
    items: [
      {
        quote:
          "clickmasters made our SEO strategy much easier to understand. The team explained everything clearly and kept us updated throughout the campaign.",
        attribution: "clickmasters Client",
      },
      {
        quote:
          "The team helped us improve our website content, local visibility, and overall SEO strategy. Communication was clear and the process was easy to follow.",
        attribution: "clickmasters Client",
      },
      {
        quote:
          "What stood out was the clear communication and detailed reporting. We always knew what SEO work was being done and why.",
        attribution: "clickmasters Client",
      },
    ],
  },
  stats: {
    title: "The Numbers Behind Our SEO Services",
    intro:
      "Our SEO services Boise campaigns focus on measurable improvements in organic visibility, keyword rankings, website traffic, and qualified leads. Every campaign is different, so results depend on your industry, competition, website condition, and SEO goals.",
    items: [
      { value: "3,500+", label: "clients grown through digital marketing" },
      { value: "50+", label: "certified experts on our team" },
      { value: "$120M+", label: "in ad spend managed" },
      { value: "2023", label: "clickmasters established" },
    ],
  },
  ctaBottom: {
    title: "Ready to Grow Your Boise Business With SEO?",
    description:
      "Whether you need Boise SEO services, local SEO, technical SEO, or complete search engine optimization, clickmasters builds a strategy around your business goals and target audience.",
    cta: "Start Your Boise SEO Campaign",
  },
};
