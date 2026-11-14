// src/content/locations/subpage-boston-seo.ts
// Content for the /search-engine-optimization/locations/seo-services-boston
// sub page. Every string below is the exact copy provided for this page.

export interface BostonSubPageCaseStudy {
  title: string;
  startingPoint: string;
  whatWeDid: string;
  result: string;
}

export interface BostonSubPageFaq {
  question: string;
  answer: string;
}

export interface BostonSubPageTestimonial {
  quote: string;
  attribution?: string;
}

export interface BostonSubPageStat {
  value: string;
  label: string;
}

export interface BostonSubPageContent {
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
    items: BostonSubPageCaseStudy[];
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
  faqs: BostonSubPageFaq[];
  /** Optional testimonials block (only rendered when present). */
  testimonials?: {
    title: string;
    intro?: string;
    items: BostonSubPageTestimonial[];
  };
  /** Optional stats / numbers block (only rendered when present). */
  stats?: {
    title: string;
    intro?: string;
    items: BostonSubPageStat[];
  };
  ctaBottom: {
    title: string;
    description: string;
    cta: string;
  };
}

export const bostonSeoSubPage: BostonSubPageContent = {
  slug: "seo-services-boston",
  serviceSlug: "search-engine-optimization",
  cityDisplay: "Boston",
  stateDisplay: "MA",
  metaTitle: "Boston SEO Services | Grow Your Search Visibility",
  metaDescription:
    "Grow your search visibility with proven Boston SEO services. Improve Google rankings, attract more organic traffic, and reach customers actively searching online.",
  hero: {
    eyebrow: "Boston · SEO Services",
    title: "Improve Your Search Visibility With SEO Services",
    titleHighlight: "Boston Businesses Trust",
    paragraphs: [
      "Search rankings don't improve through shortcuts. They require the right strategy, quality content, a technically sound website, and consistent optimization. Our SEO services in Boston bring these elements together to help your business build stronger organic visibility.",
      "We analyze your website and competition, identify valuable search opportunities, and create a focused SEO plan designed to support traffic, leads, and long-term growth.",
    ],
    ctaPrimary: "Get a Free SEO Consultation",
    ctaSecondary: "Talk to an SEO Consultant",
    serving: "Serving Boston, Cambridge, Somerville, and businesses across Greater Boston and Massachusetts.",
  },
  ctaTop: {
    title: "A Boston SEO Company Built Around Real Strategy",
    description:
      "We are a Boston-based SEO company that helps businesses across Massachusetts grow their visibility in Google search — and increasingly, in AI-generated answers too. We don't run one-size-fits-all campaigns. Every SEO strategy we build starts with your specific business, your customers, and your competition.",
    description2:
      "Book a free, no-pressure SEO consultation. We'll review your website, show you exactly where you're losing visibility, and give you an honest view of what a realistic path forward looks like.",
    cta: "Get a Free SEO Consultation",
    note: "No-pressure, no-jargon. Just a clear plan built around your business.",
  },
  about: {
    title: "A Boston SEO Company Built Around Real Strategy",
    paragraphs: [
      "Our team combines technical SEO knowledge with a genuine understanding of the Boston market — from Downtown and Back Bay businesses to companies serving Cambridge, Somerville, and the wider Greater Boston area. We've worked with home service companies, law firms, healthcare providers, contractors, and e-commerce brands, and we know what it takes to compete in a crowded market like Boston.",
      "What sets us apart is simple honesty. We explain our strategy in plain language, report results without spin, and treat every client relationship as a long-term partnership — not a one-off project.",
    ],
    workWithTitle: "Businesses we regularly work with include:",
    workWith: [
      "Home service companies across Greater Boston",
      "Law firms, healthcare providers, and contractors",
      "E-commerce brands competing in a crowded market",
      "Businesses serving Boston, Cambridge, Somerville, and the wider Greater Boston area",
    ],
  },
  services: {
    title: "SEO Services in Boston That Drive Real Business Growth",
    intro:
      "We offer a complete range of SEO services in Boston, all working together as one coordinated strategy.",
    items: [
      {
        icon: "Target",
        title: "SEO Strategy & Consulting",
        body: "Every campaign starts with a clear plan. We study your business, your competitors, and your customers to build an SEO strategy focused on your actual goals — more calls, more foot traffic, or more online sales.",
      },
      {
        icon: "KeySquare",
        title: "Keyword Research",
        body: "We find the exact terms your Boston customers are searching for, then build your content and site structure around those terms so the right people find you at the right time.",
      },
      {
        icon: "Search",
        title: "On-Page SEO",
        body: "We optimize your page titles, headings, content, and internal links so both search engines and real visitors understand exactly what you offer.",
      },
      {
        icon: "Settings2",
        title: "Technical SEO",
        body: "Site speed, mobile-friendliness, crawl errors, and site structure all affect your rankings. We audit and fix the technical issues quietly holding your website back.",
      },
      {
        icon: "MapPin",
        title: "Local SEO for Boston Businesses",
        body: "If you serve customers in Boston, Cambridge, Somerville, or anywhere in Massachusetts, local SEO helps you show up in \"near me\" searches and Google Maps results — exactly where local customers start looking.",
      },
      {
        icon: "PenTool",
        title: "Content Creation",
        body: "We write content that answers your customers' real questions, builds trust, and gives search engines a reason to rank your pages higher.",
      },
      {
        icon: "Share2",
        title: "Link Building",
        body: "We earn backlinks from relevant, trustworthy websites to build your site's authority with search engines over time.",
      },
      {
        icon: "Sparkles",
        title: "AI Search Visibility",
        body: "As more people get answers directly from AI Overviews and AI chat tools, we help structure your content so it's easier for these systems to find, understand, and cite — alongside your traditional SEO work.",
      },
      {
        icon: "LineChart",
        title: "SEO Audits",
        body: "Not sure why your site isn't ranking? Our SEO audits review your content, technical setup, and backlink profile, and give you a clear list of what to fix first.",
      },
    ],
  },
  process: {
    title: "How Our Boston SEO Company Works",
    intro:
      "Every project follows the same clear, results-driven process — from the first audit through ongoing optimization.",
    steps: [
      {
        title: "Step 1 — Audit & Research",
        body: "We start by auditing your current website and researching your competitors and target keywords, so we know exactly where you stand and where the opportunities are.",
      },
      {
        title: "Step 2 — Strategy",
        body: "Based on the audit, we build a custom SEO plan tied to your specific business goals — not a generic template used for every client.",
      },
      {
        title: "Step 3 — Execution",
        body: "Our team gets to work on-page, technically, and off-page: fixing site issues, publishing optimized content, and building relevant links.",
      },
      {
        title: "Step 4 — Tracking & Reporting",
        body: "We track rankings, traffic, and conversions, and send you clear, honest reports so you always know what's happening with your campaign.",
      },
      {
        title: "Step 5 — Ongoing Adjustments",
        body: "Search engines change their algorithms often, so we continually adjust your strategy to keep results moving in the right direction.",
      },
    ],
  },
  whyChoose: {
    title: "Why Choose a Boston SEO Company for Your Business",
    items: [
      {
        icon: "MapPin",
        title: "Local SEO Expertise",
        body: "We understand the Boston market and the search behavior of local customers, helping your business build stronger visibility in relevant local searches.",
      },
      {
        icon: "MessageSquare",
        title: "Clear and Honest Reporting",
        body: "Get simple, easy-to-understand updates on your SEO progress, rankings, traffic, and the work completed each month.",
      },
      {
        icon: "Target",
        title: "Custom SEO Strategies",
        body: "Your strategy is based on your business, industry, competitors, website, and goals rather than a one-size-fits-all plan.",
      },
      {
        icon: "Layers",
        title: "Complete SEO Services",
        body: "From search engine optimization Boston businesses need to content, technical SEO, local SEO, and link building, everything works together under one strategy.",
      },
      {
        icon: "TrendingUp",
        title: "Focused on Long-Term Growth",
        body: "We focus on sustainable Boston SEO strategies designed to build organic visibility and qualified traffic over time.",
      },
      {
        icon: "Users",
        title: "Experienced SEO Team",
        body: "Work with SEO professionals who understand how to improve website performance, search visibility, and organic growth.",
      },
      {
        icon: "Eye",
        title: "Transparent Approach",
        body: "No unrealistic ranking promises or confusing SEO jargon. You get a clear strategy and measurable goals.",
      },
      {
        icon: "Clock",
        title: "Flexible SEO Support",
        body: "Whether you need ongoing SEO services Boston businesses can rely on or support for a specific SEO project, we can build an approach around your needs.",
      },
    ],
  },
  results: {
    title: "Example Results for Boston Businesses",
    items: [
      {
        title: "A Home Services Company Serving Greater Boston",
        startingPoint:
          "Ranked on page two for most core service keywords, with most leads coming from paid ads alone.",
        whatWeDid:
          "Rebuilt on-page SEO, fixed technical issues slowing down the site, and published content targeting the services they wanted to grow.",
        result:
          "Moved multiple core keywords onto page one of Google and reduced dependence on paid ads over several months.",
      },
      {
        title: "A Boston-Area Law Firm",
        startingPoint:
          "Strong reputation locally, but very little organic visibility for their practice areas.",
        whatWeDid:
          "Built out practice-area pages, optimized their Google Business Profile, and earned relevant local backlinks.",
        result:
          "Increased visibility for practice-area keywords and grew qualified consultation requests from organic search.",
      },
      {
        title: "An E-Commerce Retailer Based in Massachusetts",
        startingPoint:
          "Product pages weren't ranking, and organic traffic made up a small share of total sales.",
        whatWeDid:
          "Fixed technical SEO issues affecting product pages, improved site speed, and optimized product content for search intent.",
        result:
          "Grew organic traffic share and improved rankings across top product categories.",
      },
    ],
    note: "",
  },
  realResults: {
    title: "What We Track",
    intro:
      "We measure the SEO metrics that matter to your business, and our reporting helps you understand what is improving, where new opportunities exist, and which areas need more attention.",
    items: [
      {
        icon: "TrendingUp",
        title: "Organic website traffic",
        body: "We track organic visitors and engagement to show how your search visibility is growing over time.",
      },
      {
        icon: "Search",
        title: "Keyword ranking improvements",
        body: "We monitor the searches that matter, including new keyword opportunities and gains across important service pages.",
      },
      {
        icon: "MapPin",
        title: "Local search visibility",
        body: "We measure Google Business Profile performance and local search visibility to show how you show up for nearby customers.",
      },
      {
        icon: "UserPlus",
        title: "Qualified leads & organic conversions",
        body: "We connect rankings to results by tracking the enquiries and conversions that actually reach your business.",
      },
      {
        icon: "Gauge",
        title: "Technical SEO improvements",
        body: "We track the technical fixes that help your site perform, get indexed, and rank more effectively.",
      },
    ],
  },
  industries: {
    title: "SEO Services for Boston Businesses Across Multiple Industries",
    intro:
      "Different industries search and buy differently. Here's how we approach SEO for the industries we work with most across Boston and Massachusetts.",
    items: [
      {
        icon: "Wrench",
        title: "Home Services & Contractors",
        body: "From plumbing and HVAC to remodeling and general contracting, SEO helps home service businesses reach customers searching for immediate solutions.",
      },
      {
        icon: "Scale",
        title: "Legal Services",
        body: "We help Boston law firms improve search visibility for specific practice areas and connect with potential clients actively looking for legal support.",
      },
      {
        icon: "Stethoscope",
        title: "Healthcare & Dental",
        body: "Patients often search online before choosing a provider. SEO helps healthcare and dental practices appear for relevant searches and build trust with useful content.",
      },
      {
        icon: "ShoppingCart",
        title: "E-Commerce & Retail",
        body: "We optimize online stores to improve product visibility, strengthen technical SEO, and attract customers searching for products they want to buy.",
      },
      {
        icon: "Home",
        title: "Real Estate",
        body: "Our SEO strategies help real estate agents and agencies target property, neighborhood, and location-based searches to reach buyers and sellers.",
      },
      {
        icon: "Briefcase",
        title: "Professional & B2B Services",
        body: "We help accountants, consultants, agencies, and other B2B companies improve online visibility and reach decision-makers searching for their services.",
      },
      {
        icon: "Truck",
        title: "Moving & Logistics",
        body: "SEO helps moving and logistics companies appear for high-intent searches from customers looking for reliable services and quick quotes.",
      },
      {
        icon: "Utensils",
        title: "Restaurants & Hospitality",
        body: "We help restaurants, hotels, and hospitality businesses improve local search visibility and connect with customers searching for places to eat, stay, or visit.",
      },
      {
        icon: "Car",
        title: "Automotive Repair",
        body: "We help auto repair shops and automotive businesses target local service searches, increase visibility, and attract customers looking for repairs and maintenance.",
      },
    ],
  },
  tools: {
    title: "A Data-Driven Approach to Boston SEO",
    intro:
      "Our SEO services Boston campaigns are built around measurable improvements in search visibility, organic traffic, keyword rankings, and qualified leads. Every business starts from a different position, so we focus on realistic, trackable progress rather than guaranteed rankings.",
    items: [
      {
        icon: "KeySquare",
        title: "Keyword research & strategy",
        body: "We build your content and site structure around the exact terms Boston customers are actually searching for.",
      },
      {
        icon: "Settings2",
        title: "Technical SEO & on-page optimization",
        body: "We fix the site speed, structure, and indexing issues that hold you back, then optimize every page for relevance.",
      },
      {
        icon: "MapPin",
        title: "Local SEO",
        body: "We strengthen your local presence so you show up in \"near me\" searches and Google Maps across Massachusetts.",
      },
      {
        icon: "Sparkles",
        title: "AI search visibility",
        body: "We structure your content so AI Overviews and chat tools can easily find, understand, and cite your business.",
      },
      {
        icon: "LineChart",
        title: "Tracking & reporting",
        body: "We monitor rankings, traffic, conversions, and technical improvements, and report on what matters most to your growth.",
      },
    ],
  },
  faqs: [
    {
      question: "How Long Does SEO Take to Show Results?",
      answer:
        "Most businesses can see early improvements within 3 to 6 months, such as better rankings, increased impressions, and more organic traffic. Stronger and more consistent growth often takes 6 to 12 months, depending on competition, website condition, and the SEO strategy.",
    },
    {
      question: "What Does Local SEO Include?",
      answer:
        "Local SEO focuses on helping businesses appear in searches from nearby customers. It can include Google Business Profile optimization, local keywords, reviews, citations, location pages, and consistent business information across the web.",
    },
    {
      question: "How Do I Choose an SEO Company?",
      answer:
        "Look for an SEO company in Boston that understands your industry, explains its strategy clearly, provides regular reporting, and focuses on sustainable results. Experience, communication, transparency, and relevant case studies are often more important than company size.",
    },
    {
      question: "Is SEO Still a Good Investment for Businesses?",
      answer:
        "Yes. SEO can provide long-term value by helping your website appear when potential customers are actively searching for your products or services. A strong SEO strategy can increase organic visibility, qualified traffic, leads, and sales over time.",
    },
  ],
  testimonials: {
    title: "What Our Clients Say",
    intro:
      "Businesses choose clickmasters for clear SEO strategies, transparent communication, and consistent optimization. Our team focuses on improving online visibility, attracting relevant traffic, and turning search opportunities into meaningful business growth.",
    items: [
      {
        quote:
          "They explained the SEO process clearly and kept us updated throughout the campaign. It was easy to understand what was being done and why.",
        attribution: "[Real Client Name, Business Name]",
      },
      {
        quote:
          "The team helped us improve our website visibility and gave us a clear plan for growing through organic search. The communication was clear from start to finish.",
        attribution: "[Real Client Name, Business Name]",
      },
      {
        quote:
          "What stood out was the honesty and transparency. There were no inflated promises, just clear reporting and steady progress.",
        attribution: "[Real Client Name, Business Name]",
      },
    ],
  },
  stats: {
    title: "The Numbers Behind Our SEO Services",
    intro:
      "Our SEO services Boston campaigns are built around measurable improvements in search visibility, organic traffic, keyword rankings, and qualified leads. Every business starts from a different position, so we focus on realistic, trackable progress rather than guaranteed rankings.",
    items: [
      { value: "3,500+", label: "clients grown through digital marketing" },
      { value: "50+", label: "certified experts on our team" },
      { value: "$120M+", label: "in ad spend managed" },
      { value: "2023", label: "helping businesses build stronger digital presence since" },
    ],
  },
  ctaBottom: {
    title: "Ready to Grow Your Boston Search Visibility?",
    description:
      "Whether you need Boston SEO services, local SEO, technical SEO, or complete search engine optimization, clickmasters builds a strategy around your business goals and target audience.",
    cta: "Get Your Free SEO Report",
  },
};
