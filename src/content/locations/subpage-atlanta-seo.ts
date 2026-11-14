// src/content/locations/subpage-atlanta-seo.ts
// Content for the /search-engine-optimization/locations/seo-services-atlanta
// sub page. Every string below is the exact copy provided for this page.

export interface SubPageCaseStudy {
  title: string;
  startingPoint: string;
  whatWeDid: string;
  result: string;
}

export interface SubPageFaq {
  question: string;
  answer: string;
}

export interface SubPageTestimonial {
  quote: string;
  attribution?: string;
}

export interface SubPageStat {
  value: string;
  label: string;
}

export interface SubPageContent {
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
  services?: {
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
    items: SubPageCaseStudy[];
    note: string;
  };
  realResults?: {
    title: string;
    intro: string;
    items: { icon: string; title: string; body: string }[];
  };
  industries: {
    title: string;
    intro: string;
    items: { icon: string; title: string; body: string }[];
  };
  tools?: {
    title: string;
    intro: string;
    items: { icon: string; title: string; body: string }[];
  };
  faqs: SubPageFaq[];
  /** Optional custom FAQ section heading (defaults to "Frequently asked questions."). */
  faqsTitle?: string;
  /** Optional testimonials block (only rendered when present). */
  testimonials?: {
    title: string;
    intro?: string;
    items: SubPageTestimonial[];
  };
  /** Optional stats / numbers block (only rendered when present). */
  stats?: {
    title: string;
    intro?: string;
    items: SubPageStat[];
  };
  ctaBottom: {
    title: string;
    description: string;
    cta: string;
    /** Optional secondary CTA button (rendered next to the primary). */
    cta2?: string;
  };
}

export const atlantaSeoSubPage: SubPageContent = {
  slug: "seo-services-atlanta",
  serviceSlug: "search-engine-optimization",
  cityDisplay: "Atlanta",
  stateDisplay: "GA",
  metaTitle: "Atlanta SEO Services | Professional SEO Services Agency & Consultants",
  metaDescription:
    "Looking for professional SEO services in Atlanta? Our SEO services agency delivers search engine optimization services that help small businesses, law firms, and e-commerce brands rank higher and grow.",
  hero: {
    eyebrow: "Atlanta · SEO Services",
    title: "Professional SEO Services in Atlanta",
    titleHighlight: "That Actually Grow Your Business",
    paragraphs: [
      "Ranking on Google isn't luck — it's strategy. As a full-service SEO services agency, we help local businesses, from small startups to established law firms and online stores, get found by the customers who are already searching for what they offer.",
      "We don't sell one-size-fits-all packages. Every SEO strategy we build starts with your business, your competitors, and your customers in Atlanta — not a template.",
    ],
    ctaPrimary: "Get My Free SEO Audit",
    ctaSecondary: "Talk to an SEO Consultant",
    serving: "Serving Atlanta, Alpharetta, Marietta, and the surrounding metro area.",
  },
  ctaTop: {
    title: "Ready to Show Up Where Your Customers Are Searching?",
    description:
      "Every day you wait, someone in Atlanta is searching for a business like yours — and clicking on a competitor instead. Let's fix that.",
    description2:
      "Book a free, no-pressure SEO consultation. We'll review your website, show you exactly where you're losing visibility, and tell you honestly whether SEO is the right move for your business right now.",
    cta: "Book My Free Consultation",
    note: "No contracts required to get started. No confusing jargon. Just a clear plan.",
  },
  about: {
    title: "An Atlanta SEO Services Firm That Actually Lives and Works Here",
    paragraphs: [
      "We're not a call center reading from a script, and we're not an out-of-state agency treating Atlanta as one dot on a map. As a local SEO services firm, our team works with businesses across metro Atlanta every day, which means we understand how local search behavior here is different — how people search for a \"law firm near Buckhead\" differently than they search for one in a smaller town, or how ecommerce shoppers in Atlanta compare prices before they buy.",
      "We started this agency because too many small businesses were being sold expensive SEO packages by SEO service providers full of vague promises and no real reporting. Our approach is simple: show up, do the work, explain what we're doing in plain English, and prove it with numbers you can actually understand.",
    ],
    workWithTitle: "We work with:",
    workWith: [
      "Small businesses that need to compete with bigger budgets",
      "Ecommerce brands that need consistent organic traffic, not just paid ads",
      "Law firms and professional services that depend on trust and local visibility",
      "Multi-location businesses across Atlanta, Alpharetta, Marietta, and nearby areas",
    ],
  },

  services: {
    title: "Our Atlanta SEO Agency Services",
    intro:
      "We offer full-service SEO services, but we never push a package you don't actually need. After your free audit, we recommend only the services that will realistically move the needle — not a bundle designed to inflate the invoice.",
    items: [
      {
        icon: "MapPin",
        title: "Local SEO Services",
        body: "If most of your customers live nearby, local SEO is where your budget should go first. We optimize your Google Business Profile, clean up and build local citations across trusted directories, and target the \"near me\" and neighborhood searches people actually type in. This is the difference between showing up for \"SEO company Atlanta\" and getting completely skipped in the local map pack.",
      },
      {
        icon: "Search",
        title: "Search Engine Optimization Services (Full SEO Programs)",
        body: "For businesses that want a complete search engine optimization strategy — not just one piece of it — we combine technical fixes, content, and authority-building into one coordinated plan instead of treating each as a separate add-on.",
      },
      {
        icon: "Settings2",
        title: "Technical SEO & Optimization Services",
        body: "Site speed, broken links, duplicate pages, poor mobile experience, and indexing errors quietly cap your rankings no matter how good your content is. Our SEO optimization services find and fix these issues first, because fixing the foundation always comes before adding more content on top of it.",
      },
      {
        icon: "Users",
        title: "SEO Services Consultants & Strategy",
        body: "Already have an in-house marketing person or another agency handling content? Our SEO services consultants can audit the current strategy, flag what's missing, and guide the team — without taking over everything or requiring you to switch agencies completely.",
      },
      {
        icon: "ShoppingCart",
        title: "Ecommerce SEO Services",
        body: "Online stores live or die by product and category page structure. We optimize product titles, descriptions, internal linking, and site search so shoppers searching for what you sell can actually find your store instead of a competitor's listing.",
      },
      {
        icon: "Gauge",
        title: "Small Business SEO Packages",
        body: "Not every business needs an enterprise-level strategy on day one. Our small business SEO packages are built to be affordable and scalable — so you're only paying for what your current stage of growth actually needs.",
      },
      {
        icon: "PenTool",
        title: "SEO Marketing & Content Services",
        body: "Rankings without content that converts don't help much. Our SEO marketing services include keyword-targeted blog content, service pages, and landing pages written for real readers first and structured for search engines second.",
      },
    ],
  },
  process: {
    title: "How Our SEO Agency Delivers Results",
    intro:
      "Every project follows the same clear process, whether you're hiring us for local SEO, e-commerce SEO, or a full search engine optimization program.",
    steps: [
      {
        title: "Step 1 — SEO Audit & Competitor Analysis",
        body: "We start with a full audit of your website, current rankings, and three to five of your closest competitors in Atlanta. This tells us exactly where you stand today and what's realistically achievable, instead of guessing.",
      },
      {
        title: "Step 2 — Keyword Research & Strategy",
        body: "Using real search-volume data for your industry and area, we build a keyword and content strategy specific to your business — not a generic checklist copied across every client.",
      },
      {
        title: "Step 3 — On-Page & Technical Implementation",
        body: "We fix technical issues, optimize existing pages, and strengthen your Google Business Profile and local citations so both search engines and customers can find you easily.",
      },
      {
        title: "Step 4 — Content & Authority Building",
        body: "We create content that answers the real questions your customers are searching for, and work on earning links and mentions that build your site's credibility in Google's eyes.",
      },
      {
        title: "Step 5 — Reporting & Ongoing Optimization",
        body: "You get monthly reports in plain English covering rankings, traffic, and leads. We adjust the strategy based on what's actually working for your business, not what we assumed would work on day one.",
      },
    ],
  },

  whyChoose: {
    title: "Why Atlanta Businesses Choose Our Professional SEO Services",
    items: [
      {
        icon: "MessageSquare",
        title: "We explain everything in plain language.",
        body: "No confusing reports full of jargon. You'll always know what we're doing and why.",
      },
      {
        icon: "Target",
        title: "We build strategies around your business, not a template.",
        body: "A law firm and an ecommerce store don't need the same SEO approach — we don't treat them like they do.",
      },
      {
        icon: "Clock",
        title: "We're honest about timelines.",
        body: "SEO takes time. We'll tell you realistically what to expect instead of promising overnight results no agency can guarantee.",
      },
      {
        icon: "KeyRound",
        title: "You keep ownership of everything.",
        body: "Your content, your website access, your data — it's yours, not locked into our systems.",
      },
      {
        icon: "LineChart",
        title: "We focus on leads and revenue, not just rankings.",
        body: "Ranking #1 for a keyword nobody searches means nothing. We track the traffic and leads that actually matter to your business.",
      },
    ],
  },
  results: {
    title: "Example Results for Atlanta Businesses",
    items: [
      {
        title: "Local Home Services Company",
        startingPoint:
          "Page 3 rankings for core service keywords, minimal organic leads.",
        whatWeDid:
          "Fixed technical SEO issues, rebuilt service pages around real customer search terms, and optimized their Google Business Profile.",
        result:
          "Moved into the top 5 local results for their main service keywords within six months, with organic form submissions increasing noticeably month over month.",
      },
      {
        title: "Boutique Ecommerce Store",
        startingPoint:
          "Reliant almost entirely on paid ads, with organic traffic under 10% of total visits.",
        whatWeDid:
          "Rebuilt product category structure, fixed duplicate content issues, and created buyer-focused product content.",
        result:
          "Organic traffic became a consistent, growing source of orders — reducing dependence on ad spend over time.",
      },
      {
        title: "Local Law Firm",
        startingPoint:
          "Website ranked well for the firm's name but nowhere for actual practice area searches.",
        whatWeDid:
          "Built out practice-area pages targeted at real client questions, strengthened local citations, and improved page speed.",
        result:
          "New practice-area pages began ranking on page one for competitive local search terms within the first several months.",
      },
    ],
    note: "",
  },
  realResults: {
    title: "Real SEO Results for Atlanta Businesses",
    intro:
      "We don't promise a fixed percentage increase for every business, because every starting point is different. What every client does get is a clear, honest baseline and regular proof of progress.",
    items: [
      {
        icon: "MapPin",
        title: "Local Search Visibility",
        body: "Businesses working with us typically see stronger placement in the local map pack and in \"near me\" searches — the exact moment when a nearby customer is ready to call or visit.",
      },
      {
        icon: "TrendingUp",
        title: "Organic Traffic Growth",
        body: "As technical issues get fixed and content targets the right keywords, organic traffic grows steadily instead of spiking and disappearing the way paid traffic does when the budget runs out.",
      },
      {
        icon: "UserPlus",
        title: "Lead Quality Improvement",
        body: "Ranking for the right search terms — not just any keyword — brings in visitors who are actually looking to buy or hire, which shows up as better-quality leads, not just more website visits.",
      },
      {
        icon: "Gauge",
        title: "Site Health & Technical Performance",
        body: "Faster load times, cleaner site structure, and fixed indexing errors improve both user experience and how easily Google can crawl and rank the site.",
      },
      {
        icon: "Wallet",
        title: "Reduced Dependence on Paid Ads",
        body: "As organic rankings improve, many clients are able to scale back ad spend without losing overall traffic and leads, lowering their total cost per customer over time.",
      },
    ],
  },

  industries: {
    title: "SEO for Atlanta Industries",
    intro:
      "Different industries search differently, buy differently, and rank differently. Here's how we approach SEO for the industries we work with most in Atlanta.",
    items: [
      {
        icon: "Building2",
        title: "Small Business SEO",
        body: "Affordable, scalable SEO built for businesses competing against bigger budgets. We focus on the local and long-tail keywords where small businesses can realistically win first.",
      },
      {
        icon: "Scale",
        title: "Atlanta Law Firm SEO",
        body: "Law firm SEO depends heavily on trust and local relevance. We build out practice-area pages, strengthen local citations, and improve the trust signals Google looks for before ranking legal services.",
      },
      {
        icon: "ShoppingCart",
        title: "Ecommerce SEO",
        body: "Online stores need product and category pages that are structured for both search engines and shoppers. We optimize both so browsers turn into buyers, not bounces.",
      },
      {
        icon: "Wrench",
        title: "Contractor & Home Services SEO",
        body: "When a pipe bursts or the AC breaks, people search and call immediately. Local SEO for contractors focuses on showing up fast in \"near me\" searches at exactly that moment.",
      },
      {
        icon: "Home",
        title: "Real Estate SEO",
        body: "Real estate searches are hyper-local and neighborhood-specific. We target the area and property-type searches that bring in genuinely interested buyers and sellers.",
      },
      {
        icon: "Utensils",
        title: "Restaurant & Hospitality SEO",
        body: "Restaurant SEO leans heavily on Google Business Profile optimization, reviews, and local search — the details that turn a hungry search into a table booked or an order placed.",
      },
      {
        icon: "Stethoscope",
        title: "Healthcare & Professional Services SEO",
        body: "Healthcare and professional services need SEO that builds credibility and visibility while respecting industry compliance and accuracy standards.",
      },
    ],
  },
  tools: {
    title: "Tools We Use for Search Engine Optimization Services",
    intro:
      "We combine industry-standard SEO platforms with hands-on human analysis, because tools give us data — but experience is what turns that data into an actual strategy.",
    items: [
      {
        icon: "KeySquare",
        title: "Keyword Research & Search Volume Tools",
        body: "We use professional keyword research platforms to find real search volume and competition data for your market, so strategy is based on how people actually search, not guesswork.",
      },
      {
        icon: "Bug",
        title: "Technical SEO Audit & Crawling Tools",
        body: "Site-crawling software helps us find broken links, duplicate content, indexing errors, and speed issues across your entire website, even on sites with hundreds of pages.",
      },
      {
        icon: "LineChart",
        title: "Rank Tracking Tools",
        body: "We track your rankings across desktop and mobile search over time, so progress is measured with real data instead of a screenshot from a lucky day.",
      },
      {
        icon: "Search",
        title: "Google Search Console & Analytics",
        body: "These free but essential tools show us exactly how Google sees your site and how real visitors behave once they land on it — critical for knowing what to fix next.",
      },
      {
        icon: "MapPin",
        title: "Local Citation & Google Business Profile Tools",
        body: "For local SEO, we use citation management tools to keep your business information consistent across directories, which directly affects local map pack rankings.",
      },
      {
        icon: "Eye",
        title: "Competitor Analysis Tools",
        body: "We keep an eye on what's working for your closest competitors in Atlanta, so your strategy adapts instead of falling behind.",
      },
    ],
  },

  faqs: [
    {
      question: "What Makes SEO Services Different in Atlanta, GA?",
      answer:
        "Atlanta has a competitive local market, so SEO needs to focus on the areas, customers, and search terms that matter to your business. Our strategy combines local, on-page, technical, and content SEO to improve visibility and attract relevant Atlanta customers.",
    },
    {
      question: "How Long Does SEO Take to Show Results?",
      answer:
        "SEO results depend on your website's current condition, competition, industry, and target keywords. Some improvements may appear within a few months, while stronger rankings and consistent organic traffic generally require ongoing SEO work.",
    },
    {
      question: "How Do I Get Started With SEO for My Atlanta Business?",
      answer:
        "We begin by reviewing your website, competitors, target audience, keywords, and current search performance. We then create a customized SEO plan based on your goals and prioritize the improvements that can create the greatest impact.",
    },
    {
      question: "How Much Does SEO Cost in Atlanta?",
      answer:
        "SEO pricing varies based on your industry, competition, website size, target locations, and the level of work required. Instead of using the same package for every business, we recommend an SEO approach based on your specific goals, website needs, and growth opportunities.",
    },
  ],
  ctaBottom: {
    title: "Ready to Show Up When Atlanta Searches for You?",
    description:
      "Every day you're not ranking, a competitor is getting the call that should've been yours. Let's fix that.",
    cta: "Get My Free SEO Audit",
  },
};
