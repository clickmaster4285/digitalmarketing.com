// src/content/locations/subpage-baltimore-seo.ts
// Content for the /search-engine-optimization/locations/seo-services-baltimore
// sub page. Every string below is the exact copy provided for this page.

export interface BaltimoreSubPageCaseStudy {
  title: string;
  startingPoint: string;
  whatWeDid: string;
  result: string;
}

export interface BaltimoreSubPageFaq {
  question: string;
  answer: string;
}

export interface BaltimoreSubPageContent {
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
    items: BaltimoreSubPageCaseStudy[];
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
  faqs: BaltimoreSubPageFaq[];
  ctaBottom: {
    title: string;
    description: string;
    cta: string;
  };
}

export const baltimoreSeoSubPage: BaltimoreSubPageContent = {
  slug: "seo-services-baltimore",
  serviceSlug: "search-engine-optimization",
  cityDisplay: "Baltimore",
  stateDisplay: "MD",
  metaTitle: "Baltimore SEO Services | Maryland SEO Company That Delivers Results",
  metaDescription:
    "Need a Baltimore SEO company that actually explains its work? We help Baltimore and Maryland businesses rank higher, earn more traffic, and turn searches into customers.",
  hero: {
    eyebrow: "Baltimore · SEO Services",
    title: "Results-Driven Baltimore SEO Services",
    titleHighlight: "for Maryland Businesses",
    paragraphs: [
      "Baltimore's business community is close-knit, and word travels fast when an agency overpromises and underdelivers. We built our Baltimore SEO services around the opposite approach — clear communication, honest timelines, and strategy shaped by how people in this city and across Maryland actually search.",
      "Whether you run a single storefront in Fells Point or a company serving clients across the whole state, we treat your website like it's ours to protect, not just optimize. Our search engine optimization services are designed to improve visibility, attract qualified visitors, and turn organic search into measurable business growth.",
    ],
    ctaPrimary: "Request Your Free SEO Review",
    ctaSecondary: "Speak With an SEO Consultant",
    serving: "Proudly serving Baltimore, Towson, Columbia, and businesses throughout Maryland.",
  },
  ctaTop: {
    title: "Baltimore SEO Services That Help Customers Find Your Business",
    description:
      "Somewhere in Baltimore right now, someone is typing a search for exactly what your business offers — and clicking on whichever result looks most trustworthy. If that's not you yet, our SEO services in Baltimore can help change that.",
    description2:
      "Get a free, straightforward SEO review of your website. We'll walk you through what's working, what's costing you visibility, and what a realistic path forward looks like — no sales pressure attached.",
    cta: "Get My Free Review",
    note: "You're never locked into a long contract just to find out if we're a fit.",
  },
  about: {
    title: "A Baltimore SEO Company Focused on Real Business Growth",
    paragraphs: [
      "We've watched too many local business owners get handed SEO reports full of confusing metrics and no real explanation of what any of it means for their bottom line. That's the gap we set out to close — SEO you can actually understand, delivered by people who are reachable when you have a question.",
      "Baltimore has its own rhythm. A law firm near the Inner Harbor competes differently than a contractor working across Baltimore County, and a Maryland-wide retailer needs an entirely different strategy than either. We build around those differences instead of running the same playbook for every client.",
    ],
    workWithTitle: "Businesses we regularly work with include:",
    workWith: [
      "Local Baltimore businesses competing against agencies with much bigger ad budgets",
      "Statewide Maryland companies that need visibility across multiple cities and counties",
      "Law firms and healthcare providers where trust and credibility drive every search decision",
      "Ecommerce and retail brands that need consistent, non-paid traffic feeding their sales funnel",
    ],
  },
  services: {
    title: "Our Baltimore & Maryland SEO Services",
    intro:
      "We keep our service list focused — every recommendation comes out of your audit, not a fixed package we push on every new client. Our professional SEO services combine technical improvements, content, local optimization, and authority building around your actual business goals.",
    items: [
      {
        icon: "MapPin",
        title: "Local SEO Services in Baltimore",
        body: "For businesses that depend on nearby customers, we fine-tune your Google Business Profile, correct and strengthen local citations across Maryland directories, and target the neighborhood-level searches that lead to a phone call or a visit that same day. Our local SEO services in Baltimore are built to improve visibility in local search and map results.",
      },
      {
        icon: "Search",
        title: "Search Engine Optimization Services",
        body: "Our full SEO programs bring technical fixes, content strategy, and off-site credibility building together under one plan, so nothing works in isolation from the rest of your online presence. These search engine optimization services focus on sustainable organic visibility rather than short-term ranking tricks.",
      },
      {
        icon: "Settings2",
        title: "Technical SEO Audits",
        body: "Slow load times, broken internal links, and indexing errors quietly cap how well any site can rank, no matter how good the content is. We diagnose and fix these issues before investing further budget in content or outreach.",
      },
      {
        icon: "Users",
        title: "SEO Consulting Services",
        body: "If you already have someone managing content or a separate agency handling parts of your marketing, our SEO consultants in Baltimore can review the current setup, flag what's missing, and advise your team directly — without asking you to hand over the whole account.",
      },
      {
        icon: "PenTool",
        title: "Organic SEO & Content Strategy",
        body: "We research the real search terms Baltimore and Maryland customers use, then build content around those terms that reads naturally to a person first and happens to satisfy search engines second. This helps businesses build stronger organic SEO visibility and attract visitors with genuine search intent.",
      },
      {
        icon: "Globe",
        title: "Maryland-Wide & Multi-Location SEO",
        body: "For businesses operating in more than one Maryland city—Baltimore, Rockville, Bethesda, Towson, Columbia, or beyond—we structure location pages and citations so each area gets its own accurate visibility instead of competing against your own listings.",
      },
    ],
  },
  process: {
    title: "Our Baltimore SEO Process: From Audit to Organic Growth",
    intro:
      "Every engagement follows a clear, data-first process — no assumptions, no guesses, just a documented path from where you are today to measurable organic growth.",
    steps: [
      {
        title: "Step 1 — Discovery SEO Audit",
        body: "We begin by auditing your current site, rankings, and a handful of direct Baltimore-area competitors, so every decision after this point is based on real data, not assumptions. Our SEO audit services in Baltimore help identify technical, content, local, and competitive opportunities.",
      },
      {
        title: "Step 2 — SEO Strategy Built for Your Market",
        body: "We turn that audit into a keyword and content plan shaped around your industry and the specific way your Baltimore or Maryland customers search — never a copy-paste template.",
      },
      {
        title: "Step 3 — Technical & On-Page SEO Fixes",
        body: "Before adding anything new, we clean up what's already holding the site back: broken structure, slow pages, and any indexing problems search engines are struggling with. Our on-page SEO work makes important pages easier for both users and search engines to understand.",
      },
      {
        title: "Step 4 — Content & Authority Growth",
        body: "We publish content that answers real customer questions and pursue links and mentions from credible sources, both of which Google weighs heavily when deciding who to rank.",
      },
      {
        title: "Step 5 — Monthly SEO Reporting in Plain English",
        body: "Every month you get a report that explains rankings, traffic, and lead movement in language you don't need a marketing background to understand — plus adjustments based on what the data is actually showing.",
      },
    ],
  },
  whyChoose: {
    title: "What Makes Our Baltimore SEO Company Different",
    items: [
      {
        icon: "MessageSquare",
        title: "We say what we mean in reports.",
        body: "No filler metrics dressed up to look impressive — just the numbers that connect to real business results.",
      },
      {
        icon: "Target",
        title: "Your strategy is built for your market.",
        body: "A Maryland-wide retailer and a single-location Baltimore contractor don't get the same plan from us — your strategy isn't repurposed from someone else's.",
      },
      {
        icon: "Clock",
        title: "We're upfront when something will take time.",
        body: "SEO isn't instant, and we won't pretend otherwise just to close a deal.",
      },
      {
        icon: "KeyRound",
        title: "Your website and data stay yours.",
        body: "Full access, always — nothing is held hostage inside our systems if you ever decide to leave.",
      },
      {
        icon: "LineChart",
        title: "We measure success in leads and revenue.",
        body: "A keyword ranking that brings zero traffic isn't a win. We track what actually reaches your bottom line — never rankings alone.",
      },
    ],
  },
  results: {
    title: "Example Baltimore & Maryland SEO Results",
    items: [
      {
        title: "Regional Home Services Company",
        startingPoint:
          "Buried on page three for its core service terms, with almost no organic leads coming in.",
        whatWeDid:
          "Repaired technical SEO issues, rewrote service pages around actual customer search language, and rebuilt the Google Business Profile from the ground up.",
        result:
          "Climbed into the top five local results for its primary service terms within six months, with organic leads growing steadily each month after.",
      },
      {
        title: "Multi-Location Maryland Retailer",
        startingPoint:
          "A single generic location page trying to represent locations across three counties, ranking for none of them well.",
        whatWeDid:
          "Built dedicated, accurately optimized pages for each location and cleaned up conflicting citation data.",
        result:
          "Each location began appearing in its own local map pack instead of competing against the others for the same visibility.",
      },
      {
        title: "Baltimore Professional Services Firm",
        startingPoint:
          "Ranked for its own name but invisible for the actual services it offered.",
        whatWeDid:
          "Created dedicated service pages built around real client search terms and strengthened local trust signals.",
        result:
          "New pages reached page one for competitive local terms within the first several months of the campaign.",
      },
    ],
    note: "",
  },
  realResults: {
    title: "What Businesses Can Expect From Our Baltimore SEO Services",
    intro:
      "We won't hand you a generic percentage promise, because every business starts from a different place. What we do commit to is an honest baseline and consistent, visible proof of movement.",
    items: [
      {
        icon: "MapPin",
        title: "Stronger Local Search Placement",
        body: "Better visibility in the map pack and \"near me\" searches, right when a nearby customer is deciding who to call.",
      },
      {
        icon: "TrendingUp",
        title: "Growing Organic Traffic",
        body: "Traffic that builds steadily over time instead of vanishing the moment an ad budget runs dry.",
      },
      {
        icon: "UserPlus",
        title: "Better-Qualified Leads",
        body: "Ranking for the searches that match real buying intent, not just any keyword with volume attached.",
      },
      {
        icon: "Gauge",
        title: "A Healthier, Faster Website",
        body: "Cleaner site structure, faster load times, and fewer indexing errors — improvements that help both visitors and search engines.",
      },
      {
        icon: "Wallet",
        title: "Less Reliance on Paid Traffic Over Time",
        body: "As organic visibility grows, many clients are able to scale back ad spend without losing overall lead flow.",
      },
    ],
  },
  industries: {
    title: "SEO for Baltimore & Maryland Industries",
    intro:
      "Different industries search and buy differently. Here's how we approach SEO for the industries we work with most across Baltimore and Maryland.",
    items: [
      {
        icon: "Building2",
        title: "Small Business SEO in Baltimore",
        body: "Budget-conscious SEO services for small businesses in Baltimore are built for companies competing against larger regional and national players for the same searches.",
      },
      {
        icon: "Scale",
        title: "Law Firm SEO in Baltimore",
        body: "SEO for law firms in Baltimore leans on trust signals — practice-area pages, verified citations, and reviews — since people research a firm carefully before ever calling.",
      },
      {
        icon: "Wrench",
        title: "Contractor & Home Services SEO",
        body: "When something breaks at home, people search and call within minutes. Contractor SEO in Baltimore is built to capture that exact moment and connect local customers with the services they need.",
      },
      {
        icon: "Stethoscope",
        title: "Healthcare & Medical SEO",
        body: "Medical and healthcare providers need SEO that builds credibility and accurate visibility while respecting the industry's compliance standards. Our healthcare SEO approach focuses on useful information, trust, and relevant local searches.",
      },
      {
        icon: "Bug",
        title: "Pest Control & Field Service SEO",
        body: "Field service businesses across Maryland rely heavily on local map visibility, since most customers search and book on the same day. Our Baltimore pest control SEO services focus on helping these businesses appear when local demand is highest.",
      },
      {
        icon: "ShoppingCart",
        title: "Ecommerce & Retail SEO",
        body: "Online and multi-location retail brands need optimized product pages and consistent local listings that support both national and neighborhood-level searches. Our ecommerce SEO strategies help build sustainable organic visibility and qualified traffic.",
      },
    ],
  },
  tools: {
    title: "The Tools Supporting Our Baltimore SEO Strategy",
    intro:
      "Tools give us the data. Experience is what turns that data into a strategy that actually fits your business.",
    items: [
      {
        icon: "KeySquare",
        title: "Keyword & Search Volume Research",
        body: "We rely on professional keyword research platforms to understand real search demand across Baltimore and the wider Maryland market.",
      },
      {
        icon: "Bug",
        title: "Technical Auditing & Site Crawling",
        body: "Crawling tools help us catch broken links, duplicate content, and indexing issues across sites of any size, from a five-page local business site to a multi-location retailer.",
      },
      {
        icon: "LineChart",
        title: "Rank Tracking",
        body: "We track keyword positions across desktop and mobile over time, so progress is backed by consistent data rather than a single snapshot.",
      },
      {
        icon: "Search",
        title: "Google Search Console & Analytics",
        body: "These tools show us exactly how Google interacts with your site and how real visitors behave once they arrive — essential for prioritizing what to fix next.",
      },
      {
        icon: "MapPin",
        title: "Local Citation Management",
        body: "For local and Maryland-wide SEO, citation tools keep your business information consistent everywhere it appears, which directly affects map pack visibility.",
      },
      {
        icon: "Eye",
        title: "AI & Generative Search Monitoring",
        body: "As more people search through AI tools and generative engines, we monitor how your business appears there too, so visibility isn't limited to traditional search results alone.",
      },
    ],
  },
  faqs: [
    {
      question: "How Much Do SEO Services Cost in Baltimore?",
      answer:
        "The cost depends on your industry, website size, competition, target keywords, and the level of optimization required. We first review your website and business goals, then recommend a practical SEO strategy based on your specific needs.",
    },
    {
      question: "How Do You Optimize for Google Maps and Local Pack Rankings in Baltimore?",
      answer:
        "We improve your local search presence through Google Business Profile optimization, accurate business information, location-focused content, local citations, reviews, and relevant on-page signals. The goal is to help your business appear for searches from customers in Baltimore and nearby areas.",
    },
    {
      question: "How Long Does SEO Take to Show Results for a Baltimore Business?",
      answer:
        "SEO results vary depending on your website's current authority, competition, technical condition, and target search terms. Initial improvements can take a few months, while stronger rankings and consistent organic traffic usually require ongoing work.",
    },
    {
      question: "Do You Optimize for Google AI Overviews, ChatGPT, and Other AI Search Platforms?",
      answer:
        "Yes. Modern search optimization goes beyond traditional rankings. We create clear, useful, well-structured content and strengthen your website's authority so your business has a better opportunity to be understood and surfaced across traditional search and emerging AI-powered search experiences.",
    },
    {
      question: "Which Baltimore Neighborhoods and Areas Can You Target With SEO?",
      answer:
        "We can build location-focused strategies around the areas your business serves, including specific Baltimore neighborhoods and nearby communities. Targeting is based on your services, customer locations, competition, and local search demand rather than using the same locations for every business.",
    },
    {
      question: "What Other Digital Marketing Services Do You Provide in Baltimore?",
      answer:
        "Along with SEO, we can support businesses with services such as local SEO, PPC, social media marketing, content marketing, web design, and other digital marketing solutions. Services can be combined based on your marketing goals and customer acquisition strategy.",
    },
  ],
  ctaBottom: {
    title: "Ready to Turn Baltimore & Maryland Searches Into Customers?",
    description:
      "Somewhere in Baltimore, someone is searching for exactly what you offer right now. Let's make sure they find you first.",
    cta: "Request Your Free SEO Review",
  },
};
