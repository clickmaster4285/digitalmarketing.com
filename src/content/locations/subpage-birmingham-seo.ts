// src/content/locations/subpage-birmingham-seo.ts
// Content for the /search-engine-optimization/locations/seo-services-birmingham
// sub page. Every string below is the exact copy provided for this page.

export interface BirminghamSubPageCaseStudy {
  title: string;
  startingPoint: string;
  whatWeDid: string;
  result: string;
}

export interface BirminghamSubPageFaq {
  question: string;
  answer: string;
}

export interface BirminghamSubPageContent {
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
    items: BirminghamSubPageCaseStudy[];
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
  faqs: BirminghamSubPageFaq[];
  ctaBottom: {
    title: string;
    description: string;
    cta: string;
  };
}

export const birminghamSeoSubPage: BirminghamSubPageContent = {
  slug: "seo-services-birmingham",
  serviceSlug: "search-engine-optimization",
  cityDisplay: "Birmingham",
  stateDisplay: "AL",
  metaTitle: "Birmingham SEO Company | Local SEO Services in Alabama",
  metaDescription:
    "Looking for a trusted SEO agency in Birmingham, AL? We build strategies around how this metro actually searches — from the city to the Over the Mountain suburbs.",
  hero: {
    eyebrow: "Birmingham · SEO Services",
    title: "Birmingham SEO Company Built Around",
    titleHighlight: "How Your Market Searches",
    paragraphs: [
      "Birmingham isn't one search market — it's several. A buyer in Homewood searches differently than one in Woodlawn, and a business near UAB competes for different terms than one out past Hoover. Our Birmingham SEO company builds strategy around that reality instead of treating the metro as a single keyword list.",
      "We're a Birmingham SEO agency that starts every project with a real audit, not a templated proposal with the city name swapped in.",
    ],
    ctaPrimary: "Get My Free SEO Audit",
    ctaSecondary: "Talk to an SEO Consultant",
    serving: "Serving Birmingham, Hoover, Homewood, Vestavia Hills, Mountain Brook, and the greater Birmingham, AL metro.",
  },
  ctaTop: {
    title: "Get Found by More Customers With Local SEO in Birmingham",
    description:
      "Somewhere in the Birmingham metro, a customer is searching for exactly what your business offers. Whether they're searching in the city or Over the Mountain, if your website isn't visible when they search, a competitor is likely getting that click instead.",
    description2:
      "Book a free SEO consultation in Birmingham. We'll review your current visibility, identify where you're losing ground, and give you an honest view of what it would take to improve your rankings, traffic, and leads.",
    cta: "Book My Free SEO Consultation",
    note: "No contracts required to get started. No confusing jargon. Just a clear, honest plan.",
  },
  about: {
    title: "Boost Your Birmingham Business With Expert SEO",
    paragraphs: [
      "Most SEO companies treat Birmingham as one city with one set of keywords. We don't, because that's not how the metro actually works. Red Mountain physically splits Birmingham proper from the Over the Mountain suburbs — Homewood, Mountain Brook, Vestavia Hills, and Hoover — and buyers on either side search, shop, and decide differently.",
      "We built this agency because too many local Birmingham SEO companies were selling generic reporting that never mentioned a single Birmingham neighborhood by name. Our approach starts with the geography and economy of this specific metro, then builds a strategy from there — not the other way around.",
    ],
    workWithTitle: "Businesses we regularly work with include:",
    workWith: [
      "Local Birmingham businesses competing against national chains with bigger ad budgets",
      "Professional services and healthcare providers navigating a market where UAB and the major hospital systems dominate broad search terms",
      "Retailers and service businesses across the Over the Mountain suburbs, where discretionary spending concentrates",
      "Multi-location businesses spanning both the city side and the suburban corridor",
    ],
  },
  services: {
    title: "Professional SEO Services in Birmingham, AL",
    intro:
      "We keep our service list focused on what actually moves results for a Birmingham business — not a bundled package designed to look impressive on an invoice.",
    items: [
      {
        icon: "MapPin",
        title: "Local SEO Services",
        body: "For businesses depending on nearby customers, we build out your Google Business Profile, correct inconsistent citations, and target neighborhood-specific searches — the difference between ranking for \"Birmingham SEO company\" broadly and actually showing up when someone in Homewood or Hoover searches for you specifically. Our Birmingham local SEO work is built around exactly this kind of neighborhood-level precision.",
      },
      {
        icon: "Search",
        title: "Search Engine Optimization Services (Full SEO Programs)",
        body: "Our complete search engine optimization company Birmingham programs combine technical fixes, content strategy, and authority building into one coordinated plan, rather than selling each piece separately and hoping they add up to something.",
      },
      {
        icon: "Settings2",
        title: "Technical SEO Audits",
        body: "Site speed, broken internal links, and indexing errors quietly limit how well any Birmingham business can rank, regardless of how strong the content is. We find and fix these issues before investing further budget into content or outreach.",
      },
      {
        icon: "Users",
        title: "SEO Consulting & Strategy",
        body: "Already have someone managing content internally? Our Birmingham SEO consultants can review the current approach, flag what's missing, and guide the team directly — without requiring a full agency handoff.",
      },
      {
        icon: "Globe",
        title: "Municipality & Suburb-Specific SEO",
        body: "For businesses serving both the city and the suburbs, we build genuinely different content for each — a Five Points South location page and a Hoover location page shouldn't read like the same page with the city name swapped.",
      },
      {
        icon: "PenTool",
        title: "Digital Marketing & Content Services",
        body: "Rankings without content that actually converts don't do much for revenue. Our content is built around the real terms Birmingham customers search, written to read naturally to a person, not stuffed to satisfy an algorithm.",
      },
    ],
  },
  process: {
    title: "Our Step-by-Step Birmingham SEO Process",
    intro:
      "Every project follows the same clear, data-first process — no assumptions, no city-name-swapped templates, just a documented path to measurable growth.",
    steps: [
      {
        title: "Step 1 — Discovery Audit",
        body: "We start by auditing your site, current rankings, and a handful of real Birmingham-area competitors — including a look at whether you're losing ground on the city side, the suburban side, or both.",
      },
      {
        title: "Step 2 — Strategy Built for Your Specific Market",
        body: "We turn that audit into a keyword and content plan shaped around your industry and which side of the metro your customers actually come from, not a generic checklist reused for every client.",
      },
      {
        title: "Step 3 — Technical & On-Page Implementation",
        body: "We fix what's holding the site back first — broken structure, slow load times, indexing issues — before adding new content on top of a shaky foundation.",
      },
      {
        title: "Step 4 — Content & Authority Building",
        body: "We publish content that answers real customer questions and pursue links and mentions from credible local and industry sources, both of which Google weighs heavily.",
      },
      {
        title: "Step 5 — Monthly Reporting, Plain and Clear",
        body: "Every month you get a report explaining rankings, traffic, and lead movement in language that doesn't require a marketing background to understand.",
      },
    ],
  },
  whyChoose: {
    title: "Why Birmingham Businesses Choose Our SEO Company",
    items: [
      {
        icon: "Target",
        title: "We know the difference between Birmingham proper and Over the Mountain.",
        body: "A strategy that works for a Woodlawn business won't automatically work for one in Mountain Brook, and we don't pretend otherwise.",
      },
      {
        icon: "MessageSquare",
        title: "We explain everything in plain language.",
        body: "No inflated reports padded with metrics that don't connect to real business outcomes.",
      },
      {
        icon: "Clock",
        title: "We're upfront about competitive reality.",
        body: "UAB and the major hospital and banking headquarters dominate certain search categories here — we'll tell you honestly where that applies to your industry instead of promising rankings we can't deliver.",
      },
      {
        icon: "KeyRound",
        title: "Your website and data stay yours.",
        body: "Full access at all times, with nothing held hostage inside our systems if you ever decide to leave.",
      },
      {
        icon: "LineChart",
        title: "We track leads and revenue, not just rankings.",
        body: "A ranking that brings zero traffic isn't a result worth celebrating. We measure what actually reaches your bottom line.",
      },
    ],
  },
  results: {
    title: "Example Birmingham Results",
    items: [
      {
        title: "Over the Mountain Home Services Company",
        startingPoint:
          "Ranking on page three for core service terms, with almost no leads coming from search.",
        whatWeDid:
          "Fixed technical SEO issues, rebuilt service pages around real customer search language specific to the Homewood and Vestavia Hills area, and rebuilt the Google Business Profile.",
        result:
          "Reached the top five local results for primary service terms within six months, with steady growth in organic leads each month after.",
      },
      {
        title: "Multi-Location Birmingham Retailer",
        startingPoint:
          "A single generic location page trying to represent stores on both sides of Red Mountain, ranking well for neither.",
        whatWeDid:
          "Built separate, accurately optimized pages for the city-side and suburban locations, and corrected conflicting citation data between them.",
        result:
          "Each location began appearing in its own local map pack instead of competing against the other for the same search visibility.",
      },
      {
        title: "Birmingham Professional Services Firm",
        startingPoint:
          "Ranked for its business name but nowhere for the actual services it offered.",
        whatWeDid:
          "Built dedicated service pages around real client search terms and strengthened local trust signals.",
        result:
          "New pages reached page one for competitive local terms within the first several months of the campaign.",
      },
    ],
    note: "",
  },
  realResults: {
    title: "What Birmingham Clients Typically See",
    intro:
      "We don't hand out a generic percentage promise, because every business starts from a different competitive position in this metro. What every client gets is an honest baseline and consistent, visible proof of progress.",
    items: [
      {
        icon: "MapPin",
        title: "Stronger Local Search Placement",
        body: "Better visibility in the map pack for the specific side of the metro your customers search from — city or suburb.",
      },
      {
        icon: "TrendingUp",
        title: "Growing Organic Traffic",
        body: "Traffic that builds steadily over time instead of disappearing the moment an ad budget runs out.",
      },
      {
        icon: "UserPlus",
        title: "Better-Qualified Leads",
        body: "Ranking for searches that match real buying intent rather than broad keywords with volume but little relevance.",
      },
      {
        icon: "Gauge",
        title: "A Healthier, Faster Website",
        body: "Cleaner structure, faster load times, and fewer indexing errors — improvements that help both visitors and search engines.",
      },
      {
        icon: "Wallet",
        title: "Reduced Dependence on Paid Traffic",
        body: "As organic visibility grows, many clients scale back ad spend without losing overall lead flow.",
      },
    ],
  },
  industries: {
    title: "Birmingham SEO Services for Every Industry We Serve",
    intro:
      "Different industries search and buy differently across this metro. Here's how we approach SEO for the industries we work with most in Birmingham.",
    items: [
      {
        icon: "Building2",
        title: "Small & Local Business SEO",
        body: "Budget-conscious SEO for businesses competing against national chains and larger regional players for the same searches.",
      },
      {
        icon: "Stethoscope",
        title: "Healthcare & Medical SEO",
        body: "Independent medical and healthcare practices need SEO built around the reality that UAB and the major hospital systems dominate broad clinical search terms — we focus on the specific, winnable procedure and location-level searches instead.",
      },
      {
        icon: "Scale",
        title: "Legal Services SEO",
        body: "Legal SEO in Birmingham depends heavily on trust signals — verified reviews, practice-area pages, and local citations — since people research a firm carefully before ever calling.",
      },
      {
        icon: "Wrench",
        title: "Contractor & Home Services SEO",
        body: "When something breaks at home, people search and call within minutes. Local SEO for contractors is built to capture that exact moment, on whichever side of the metro the customer lives.",
      },
      {
        icon: "Wallet",
        title: "Financial & Professional Services SEO",
        body: "With major banking and insurance headquarters based in Birmingham, independent financial advisors and professional service firms need SEO that targets specific, winnable local searches rather than competing head-on with national brands.",
      },
      {
        icon: "ShoppingCart",
        title: "Retail & Over the Mountain Business SEO",
        body: "Retail and service businesses in Homewood, Mountain Brook, Vestavia Hills, and Hoover benefit from SEO that speaks to that suburban customer base specifically, not a generic Birmingham-wide approach.",
      },
    ],
  },
  tools: {
    title: "Our SEO Technology & Tools in Birmingham",
    intro:
      "Tools give us the data. Local market knowledge is what turns that data into a strategy that actually fits this specific metro.",
    items: [
      {
        icon: "KeySquare",
        title: "Keyword & Search Volume Research",
        body: "We use professional keyword research platforms to understand real search demand across both Birmingham proper and the surrounding suburbs.",
      },
      {
        icon: "Bug",
        title: "Technical Auditing & Site Crawling",
        body: "Crawling tools catch broken links, duplicate content, and indexing issues across sites of any size, from a single-location business to a multi-suburb retailer.",
      },
      {
        icon: "LineChart",
        title: "Rank Tracking",
        body: "We track keyword positions across desktop and mobile over time, giving you consistent data instead of a single snapshot.",
      },
      {
        icon: "Search",
        title: "Google Search Console & Analytics",
        body: "These tools show exactly how Google interacts with your site and how real visitors behave once they arrive — essential for prioritizing what to fix next.",
      },
      {
        icon: "MapPin",
        title: "Local Citation Management",
        body: "For local SEO across a metro split by geography like this one, citation tools keep your business information consistent everywhere it appears, which directly affects map pack visibility.",
      },
      {
        icon: "Eye",
        title: "AI & Generative Search Monitoring",
        body: "As more searches happen through AI tools and generative engines, we track how your business appears there too, so visibility isn't limited to traditional search results alone.",
      },
    ],
  },
  faqs: [
    {
      question: "How Much Does an SEO Agency Cost in Birmingham?",
      answer:
        "SEO pricing varies based on your industry, website size, competition, target keywords, and campaign goals. A local business targeting Birmingham may need a different level of investment than a larger company targeting multiple markets, so pricing should be based on the work required.",
    },
    {
      question: "How Long Does SEO Take to Show Results for a Birmingham Business?",
      answer:
        "SEO usually takes time because search engines need to discover, evaluate, and respond to website improvements. Some businesses may see early changes within a few months, while competitive Birmingham keywords can require several months of consistent optimization.",
    },
    {
      question: "How Does Birmingham SEO Help Local Businesses Get More Customers?",
      answer:
        "A well-planned SEO campaign helps your business appear when potential customers search for relevant products or services. We focus on local search visibility, useful content, technical improvements, and conversion-focused optimization to turn relevant search traffic into enquiries and customers.",
    },
    {
      question: "Do You Optimize for ChatGPT, Perplexity, and Google AI Overviews?",
      answer:
        "Yes. Search is expanding beyond traditional Google results, so we also consider how search engines and AI platforms understand website content. Clear information, strong topical relevance, structured content, and website authority can help improve your overall search presence.",
    },
    {
      question: "Is SEO Still Worth It for Small Businesses in Birmingham?",
      answer:
        "Yes. SEO can be especially valuable for small businesses because it helps them reach people who are already searching for their services. A focused local strategy can build visibility, attract relevant traffic, and create a sustainable source of leads without relying entirely on paid advertising.",
    },
    {
      question: "What Do SEO Services Actually Do?",
      answer:
        "SEO services improve different parts of a website to increase its visibility in search results. This can include keyword research, on-page optimization, technical SEO, content, local SEO, link building, performance tracking, and ongoing improvements based on search and business data.",
    },
  ],
  ctaBottom: {
    title: "Ready to Get Found Across the Birmingham Metro?",
    description:
      "Somewhere in Birmingham — the city or Over the Mountain — someone is searching for exactly what you offer right now. Let's make sure they find you first.",
    cta: "Get My Free SEO Audit",
  },
};
