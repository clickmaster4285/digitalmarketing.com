// src/content/locations/subpage-charlotte-seo.ts
// Content for the /search-engine-optimization/locations/seo-services-charlotte
// sub page. Every string below is the exact copy provided for this page.

export interface CharlotteSubPageCaseStudy {
  title: string;
  startingPoint: string;
  whatWeDid: string;
  result: string;
}

export interface CharlotteSubPageFaq {
  question: string;
  answer: string;
}

export interface CharlotteSubPageTestimonial {
  quote: string;
  attribution?: string;
}

export interface CharlotteSubPageStat {
  value: string;
  label: string;
}

export interface CharlotteSubPageContent {
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
    items: CharlotteSubPageCaseStudy[];
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
  faqs: CharlotteSubPageFaq[];
  /** Optional testimonials block (only rendered when present). */
  testimonials?: {
    title: string;
    intro?: string;
    items: CharlotteSubPageTestimonial[];
  };
  /** Optional stats / numbers block (only rendered when present). */
  stats?: {
    title: string;
    intro?: string;
    items: CharlotteSubPageStat[];
  };
  ctaBottom: {
    title: string;
    description: string;
    cta: string;
  };
}

export const charlotteSeoSubPage: CharlotteSubPageContent = {
  slug: "seo-services-charlotte",
  serviceSlug: "search-engine-optimization",
  cityDisplay: "Charlotte",
  stateDisplay: "NC",
  metaTitle: "Charlotte SEO Services | Get Found by More Customers",
  metaDescription:
    "Get your Charlotte business found online with expert SEO services. Improve visibility, reach customers searching for your services, and generate more qualified leads.",
  hero: {
    eyebrow: "Charlotte · SEO Services",
    title: "Get More Customers With SEO Services",
    titleHighlight: "in Charlotte",
    paragraphs: [
      "If your business is not appearing when people search Google for your services in Charlotte, you are missing potential customers every day. Our Charlotte SEO services help businesses improve search rankings, attract qualified organic traffic, and turn more visitors into calls, enquiries, and sales.",
      "From local SEO and on-page optimization to technical SEO, content, link building, and AI search visibility, our SEO services in Charlotte are built around your business goals. Instead of using the same plan for every business, we create a strategy based on your market, competitors, customers, and opportunities.",
    ],
    ctaPrimary: "Get a Free SEO Consultation",
    ctaSecondary: "Talk to an SEO Consultant",
    serving: "Serving Uptown, South End, Matthews, Huntersville, Concord, Mooresville, and the wider Charlotte, NC area.",
  },
  ctaTop: {
    title: "A Charlotte SEO Company Focused on Real Growth",
    description:
      "Choosing the right SEO company in Charlotte is about more than finding someone who can improve rankings. Your SEO strategy should help your business attract the right customers and generate measurable results.",
    description2:
      "Our Charlotte SEO company works with businesses that want long-term search visibility rather than short-term ranking tricks. Every campaign starts with research into your website, competitors, industry, customers, and target search terms. Whether you need SEO services Charlotte NC businesses can rely on, local search optimization, technical improvements, or a complete organic growth strategy, our approach is built around what your business actually needs.",
    cta: "Get a Free SEO Consultation",
    note: "No-pressure, no-jargon. Just a clear plan built around your business.",
  },
  about: {
    title: "A Charlotte SEO Company Focused on Real Growth",
    paragraphs: [
      "Charlotte is a competitive and growing market. Businesses across Uptown, South End, Matthews, Huntersville, Concord, Mooresville, and the wider Charlotte area need a strong online presence to compete for customers searching online.",
      "Choosing the right SEO company in Charlotte is about more than finding someone who can improve rankings. Your SEO strategy should help your business attract the right customers and generate measurable results — which is exactly what we focus on for every client.",
    ],
    workWithTitle: "Businesses we regularly work with include:",
    workWith: [
      "Local businesses across Uptown, South End, Matthews, and Huntersville",
      "Companies serving Concord, Mooresville, and the wider Charlotte metro",
      "Service businesses that want long-term search visibility rather than short-term ranking tricks",
      "Growing businesses that need a complete organic growth strategy",
    ],
  },
  services: {
    title: "Results-Driven SEO Services for Charlotte Businesses",
    intro:
      "Our Charlotte SEO services help businesses improve search visibility, attract qualified traffic, and generate more leads through a focused SEO strategy. From technical improvements to local search and content, each service works together to support long-term growth.",
    items: [
      {
        icon: "Target",
        title: "SEO Strategy & Consulting",
        body: "We create a clear SEO roadmap based on your website, competitors, target audience, and business goals. Our SEO consulting in Charlotte helps identify the opportunities that deserve the most attention.",
      },
      {
        icon: "KeySquare",
        title: "Keyword Research",
        body: "We find relevant, high-intent search terms your customers use to find products and services like yours. Our Charlotte SEO company uses these keywords to guide content, landing pages, and overall search strategy.",
      },
      {
        icon: "Search",
        title: "On-Page SEO",
        body: "We optimize important website pages to make them easier for search engines to understand and more useful for visitors. Our on-page SEO services in Charlotte cover titles, headings, content, URLs, internal links, images, and search intent.",
      },
      {
        icon: "Settings2",
        title: "Technical SEO",
        body: "We identify and fix technical issues that can affect crawling, indexing, speed, and website performance. Our technical SEO services in Charlotte can include Core Web Vitals, mobile optimization, redirects, sitemaps, canonical tags, and schema markup.",
      },
      {
        icon: "MapPin",
        title: "Local SEO",
        body: "We help local businesses improve visibility when customers search for services in Charlotte and nearby areas. Our local SEO services in Charlotte focus on Google Business Profile optimization, local keywords, citations, reviews, location pages, and Google Maps visibility.",
      },
      {
        icon: "PenTool",
        title: "SEO Content Creation",
        body: "We create useful, search-focused content that answers customer questions and supports your important services. Our Charlotte SEO services use blogs, service pages, FAQs, and location content to build topical relevance and attract qualified organic traffic.",
      },
      {
        icon: "Share2",
        title: "Link Building",
        body: "We help strengthen your website's authority by earning relevant and trustworthy backlinks. Our link building services in Charlotte focus on quality, relevance, and sustainable SEO growth rather than low-quality links.",
      },
      {
        icon: "LineChart",
        title: "SEO Audits & Performance Tracking",
        body: "We review your website to identify SEO issues, missed opportunities, and areas for improvement. With SEO audits in Charlotte, we also track rankings, organic traffic, leads, and other key metrics to measure campaign progress.",
      },
    ],
  },
  process: {
    title: "Our Charlotte SEO Process",
    intro:
      "Every project follows the same clear, research-driven process so your campaign has a clear direction from day one.",
    steps: [
      {
        title: "Step 1 — SEO Audit & Research",
        body: "We review your current website, rankings, content, technical setup, competitors, backlinks, and target search terms.",
      },
      {
        title: "Step 2 — SEO Strategy",
        body: "We create a custom roadmap based on your business goals and the opportunities found during research.",
      },
      {
        title: "Step 3 — Website Optimization",
        body: "Our team works on technical SEO, on-page SEO, internal linking, content optimization, and other priority improvements.",
      },
      {
        title: "Step 4 — Content & Authority Building",
        body: "We create useful content and work on relevant link-building opportunities to strengthen your website.",
      },
      {
        title: "Step 5 — Local SEO",
        body: "For businesses targeting Charlotte customers, we optimize local search signals and location-focused content.",
      },
      {
        title: "Step 6 — Tracking & Reporting",
        body: "We monitor rankings, organic traffic, leads, conversions, and other important SEO metrics.",
      },
      {
        title: "Step 7 — Ongoing SEO Optimization",
        body: "SEO is an ongoing process. We review performance, identify new opportunities, and adjust the strategy as search behavior and competition change.",
      },
    ],
  },
  whyChoose: {
    title: "Why Choose Our Charlotte SEO Company?",
    items: [
      {
        icon: "MapPin",
        title: "Local Charlotte SEO Knowledge",
        body: "A local SEO strategy needs to understand the market. We focus on Charlotte search behavior, competitors, service areas, and customer intent.",
      },
      {
        icon: "Target",
        title: "Custom SEO Strategies",
        body: "We do not use one template for every business. Your SEO strategy is built around your website, industry, competition, and goals.",
      },
      {
        icon: "Layers",
        title: "Full-Service SEO",
        body: "From keyword research and technical SEO to content, local SEO, and link building, the main parts of your campaign can work together under one strategy.",
      },
      {
        icon: "MessageSquare",
        title: "Clear Reporting",
        body: "You should understand what is happening with your SEO campaign. We provide clear updates on the work completed, performance, and next priorities.",
      },
      {
        icon: "TrendingUp",
        title: "Long-Term Growth",
        body: "SEO takes time, especially for competitive searches. Our focus is on building sustainable visibility rather than chasing temporary ranking spikes.",
      },
      {
        icon: "LineChart",
        title: "Focus on Business Results",
        body: "Rankings are useful, but they are not the final goal. We focus on attracting relevant traffic that can generate enquiries, calls, leads, and sales.",
      },
    ],
  },
  results: {
    title: "Example Charlotte SEO Results",
    items: [
      {
        title: "Charlotte Home Services Business",
        startingPoint:
          "The business was struggling to appear on the first page for its main service keywords and was receiving very few organic enquiries.",
        whatWeDid:
          "Fixed technical SEO issues, improved key service pages, targeted Charlotte-specific search terms, and strengthened the Google Business Profile.",
        result:
          "The website gained stronger local visibility, moved closer to the top local results, and began generating a steady increase in organic enquiries.",
      },
      {
        title: "Charlotte Multi-Location Business",
        startingPoint:
          "One general location page was being used for multiple service areas, making it difficult to rank well across Charlotte and nearby locations.",
        whatWeDid:
          "Created dedicated location pages, improved local keyword targeting, and cleaned up inconsistent business information across online directories.",
        result:
          "Individual locations gained better local search visibility and started appearing for relevant searches in their respective areas.",
      },
      {
        title: "Charlotte Professional Services Company",
        startingPoint:
          "The website ranked mainly for branded searches but had very little visibility for the services customers were actually searching for.",
        whatWeDid:
          "Developed focused service pages around relevant search terms, improved on-page SEO, strengthened internal linking, and built stronger local trust signals.",
        result:
          "Service pages began gaining first-page visibility for valuable Charlotte search terms, bringing in more qualified organic traffic and enquiries.",
      },
    ],
    note: "",
  },
  realResults: {
    title: "What Makes Our SEO Services Different?",
    intro:
      "Our approach focuses on business outcomes, not rankings alone — combining technical improvements, content, local optimization, keyword targeting, and ongoing analysis to create a strategy based on your industry, competitors, audience, and specific growth goals.",
    items: [
      {
        icon: "Target",
        title: "Strategy Before Execution",
        body: "We research before making major changes so your campaign has a clear direction.",
      },
      {
        icon: "Search",
        title: "Search Intent Focus",
        body: "We target keywords based on what people actually want when they search.",
      },
      {
        icon: "MapPin",
        title: "Local + Organic SEO",
        body: "Charlotte businesses can benefit from both traditional organic rankings and local search visibility.",
      },
      {
        icon: "PenTool",
        title: "Content That Helps Customers",
        body: "We create content for people first while making it easy for search engines to understand.",
      },
      {
        icon: "Settings2",
        title: "Technical Foundation",
        body: "Technical SEO is addressed alongside content and authority rather than treated as an afterthought.",
      },
      {
        icon: "TrendingUp",
        title: "Continuous Improvement",
        body: "We use performance data to find new opportunities and improve the campaign over time.",
      },
    ],
  },
  industries: {
    title: "SEO Services for Charlotte Businesses by Industry",
    intro:
      "Different industries need different SEO strategies. A local law firm does not need the same approach as an ecommerce store or contractor.",
    items: [
      {
        icon: "Wrench",
        title: "SEO for Home Services & Contractors",
        body: "We help roofers, electricians, plumbers, HVAC companies, remodelers, and other contractors reach customers searching for services in Charlotte. Our strategy can target service keywords, local searches, service-area pages, and high-intent queries.",
      },
      {
        icon: "Scale",
        title: "SEO for Law Firms",
        body: "Law firms need strong visibility and trustworthy content. We create SEO strategies around practice areas, local searches, legal questions, and the services potential clients are researching.",
      },
      {
        icon: "Stethoscope",
        title: "Healthcare SEO",
        body: "Healthcare businesses need accurate, useful, and trustworthy content. SEO can help clinics and healthcare providers improve visibility for relevant searches while building confidence with potential patients.",
      },
      {
        icon: "Building2",
        title: "B2B & Manufacturing SEO",
        body: "B2B buyers often spend significant time researching before contacting a company. We build content around technical topics, products, services, industries, and buyer questions.",
      },
      {
        icon: "ShoppingCart",
        title: "Ecommerce SEO",
        body: "For online stores, SEO can help product and category pages reach customers searching for products. We focus on site structure, product optimization, technical SEO, category content, and organic purchase opportunities.",
      },
      {
        icon: "Home",
        title: "Real Estate SEO",
        body: "Real estate businesses can benefit from location-focused content, neighborhood searches, property-related queries, and local SEO strategies designed to attract buyers and sellers.",
      },
      {
        icon: "Briefcase",
        title: "Professional Services SEO",
        body: "Accountants, consultants, agencies, financial professionals, and other service businesses need visibility when potential customers start researching providers.",
      },
      {
        icon: "Car",
        title: "Automotive SEO",
        body: "We help dealerships, auto repair businesses, and automotive companies target high-intent searches from people looking for vehicles, repairs, maintenance, and related services.",
      },
    ],
  },
  tools: {
    title: "A Focused Charlotte SEO Approach",
    intro:
      "Our SEO services Charlotte businesses can use to improve organic visibility combine technical SEO, content, local SEO, keyword research, authority building, and ongoing optimization.",
    items: [
      {
        icon: "KeySquare",
        title: "Keyword research",
        body: "We identify relevant, high-intent search terms to guide content, landing pages, and overall search strategy.",
      },
      {
        icon: "Settings2",
        title: "Technical SEO",
        body: "We identify and fix issues that affect crawling, indexing, speed, and website performance, including Core Web Vitals and mobile optimization.",
      },
      {
        icon: "MapPin",
        title: "Local SEO",
        body: "We optimize Google Business Profile, local keywords, citations, reviews, location pages, and Google Maps visibility for Charlotte customers.",
      },
      {
        icon: "PenTool",
        title: "Content & on-page optimization",
        body: "We create useful content and optimize titles, headings, content, URLs, internal links, images, and search intent.",
      },
      {
        icon: "Share2",
        title: "Authority building",
        body: "We strengthen your website's authority by earning relevant and trustworthy backlinks that support sustainable growth.",
      },
      {
        icon: "LineChart",
        title: "Ongoing optimization",
        body: "We track rankings, organic traffic, leads, and other key metrics, then adjust the strategy as search behavior and competition change.",
      },
    ],
  },
  faqs: [
    {
      question: "How Long Does SEO Take to Work for Charlotte Businesses?",
      answer:
        "SEO results depend on your website's current condition, competition, authority, and target keywords. Some improvements may appear within a few months, while competitive Charlotte search terms typically require consistent optimization and content work over a longer period.",
    },
    {
      question: "What Does a Charlotte SEO Company Actually Do?",
      answer:
        "A Charlotte SEO company helps improve your website's visibility for relevant searches. This can involve keyword research, technical SEO, on-page optimization, content development, local SEO, link building, competitor research, and ongoing performance analysis.",
    },
    {
      question: "How Much Does SEO Cost in Charlotte?",
      answer:
        "The cost of SEO depends on factors such as your industry, website size, competition, target locations, and the scope of work. Rather than using a one-size-fits-all package, we build an SEO strategy around your website and business objectives.",
    },
    {
      question: "How Do You Optimize for Google Maps and Local Pack Rankings in Charlotte?",
      answer:
        "We improve local visibility through Google Business Profile optimization, accurate business information, location-focused content, local citations, review signals, and relevant on-page optimization. The strategy is designed to connect your business with customers searching for services in Charlotte.",
    },
    {
      question: "What Makes Your Charlotte SEO Services Different?",
      answer:
        "Our approach focuses on business outcomes, not rankings alone. We combine technical improvements, content, local optimization, keyword targeting, and ongoing analysis to create a strategy based on your industry, competitors, audience, and specific growth goals.",
    },
    {
      question: "Is SEO Worth Paying for in Charlotte?",
      answer:
        "Yes, especially when your customers actively use Google to find products or services like yours. A strong SEO campaign can build long-term organic visibility, attract relevant visitors, and generate qualified leads without requiring you to pay for every website visit.",
    },
  ],
  testimonials: {
    title: "What Charlotte Businesses Say About Our SEO",
    intro:
      "See what business owners have to say about their experience working with clickmasters. From improved search visibility to more qualified leads, our SEO strategies are built around measurable business growth.",
    items: [
      {
        quote:
          "Our website started getting much more visibility after working with clickmasters. We began receiving more relevant enquiries through Google and saw steady growth in organic traffic.",
        attribution: "Michael R., Business Owner | Charlotte, NC",
      },
      {
        quote:
          "clickmasters made SEO much easier to understand. They improved our service pages, fixed technical issues, and helped us target the right local keywords.",
        attribution: "Sarah T., Marketing Manager | Charlotte, NC",
      },
      {
        quote:
          "We needed more local customers, and the SEO campaign helped improve our presence in Charlotte searches. We're now getting more calls and enquiries from people looking for our services.",
        attribution: "James W., Local Business Owner | Charlotte, NC",
      },
      {
        quote:
          "The team was professional, responsive, and focused on real results. Our keyword visibility and organic traffic have improved consistently since the campaign started.",
        attribution: "Emily K., Business Owner | Charlotte, NC",
      },
    ],
  },
  ctaBottom: {
    title: "Get More Customers With Charlotte SEO Services",
    description:
      "Your customers are already searching for the products and services you offer. The question is whether they are finding your business or your competitors. Whether you need a complete SEO strategy, local SEO services in Charlotte, technical improvements, content optimization, or ongoing search engine optimization, we can build a plan around your business.",
    cta: "Start Your Charlotte SEO Campaign",
  },
};
