export const WebsiteSpeedOptimisationContent = {
  slug: "website-speed-optimization",
  metadata: {
    url: "/website-speed-optimization/",
    keyword: "website speed optimization service",
    volume: "5,400/mo",
    cpc: "$28.80",
    formula: "PAS",
    author: "Amjad Khan",
  },
  hero: {
    tag: "[ Service ] Website Speed Optimisation",
    title: "Website Speed Optimisation Service",
    titleHighlight: "Because Every Second Costs You",
    subtitle: "",
    description:
      "Expert website speed optimisation  PageSpeed 90+, Core Web Vitals, image optimisation, caching, CDN & WordPress performance. USA, UK & UAE. Free speed audit.",
    stats: [
      { k: "53%", v: "Abandon at 3 seconds" },
      { k: "80%", v: "Abandon at 4 seconds" },
      { k: "250%", v: "Conversion rate improvement" },
      { k: "10+ yrs", v: "Performance engineering depth" },
    ],
  },
  intro: {
    problem: [
      { text: "The Problem  What Slow Websites Cost", type: "normal" }
    ],
    solution:
      "THE CONVERSION COST\nEvery additional second of mobile load time reduces conversion rate. The research is consistent across studies: Walmart reported a 2% increase in conversion for every 1 second of improvement in load time. Amazon estimated that 100 milliseconds of additional latency costs 1% in sales. Vodafone reported a 31% increase in sales after a 31% improvement in Largest Contentful Paint. These are not edge cases  they are the expected business outcomes of the expected relationship between load time and conversion rate.\n\nOn a website generating £50,000 per month with a 4-second mobile load time, a 2-second improvement (to 2 seconds) may conservatively produce a 15-25% conversion rate improvement  translating directly into £7,500 to £12,500 per month in additional revenue from identical traffic.\n\nTHE SEO COST\nGoogle incorporated Core Web Vitals as a ranking factor in its Page Experience update. The three metrics  Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS)  are measured and assessed for every page Google indexes, and pages that achieve Good ratings in all three metrics receive a ranking advantage over equivalent pages with Poor ratings.\n\nFor a website spending £5,000 per month on SEO, a significant portion of that investment is being undermined if the website's Core Web Vitals are in the Poor or Needs Improvement ranges  because the content and link-building investments that drive organic rankings are competing at a structural disadvantage against competitors with faster, better-performing pages.\n\nTHE PAID ADVERTISING COST\nGoogle Ads' Quality Score  the metric that determines cost per click and ad rank in Google's search auction  is partly determined by the landing page experience score, which includes page load speed and Core Web Vitals performance. A website with poor page speed pays more per click for the same position, gets worse ad placement for the same bid, and converts the traffic it does receive at a lower rate.\n\nThe double penalty of higher CPCs and lower conversion rates on slow landing pages makes slow websites dramatically less efficient paid advertising platforms. Businesses with slow websites are systematically overpaying for the leads and customers their advertising generates.",
    promise: "",
  },
  problem: {
    title: "Our Website Speed Optimisation Service  The Complete Performance Engineering System",
    titleHighlight: "",
    items: [],
    afterTitle: "",
    afterHighlight: "",
    afterItems: [],
  },
  services: [
    {
      n: "01",
      icon: "Search",
      tag: "Audit",
      title: "Performance Audit and Diagnosis",
      intro: "",
      blocks: [
        {
          h: "SPECIFIC DIAGNOSIS BEFORE ANY INTERVENTION",
          p: "We do not implement speed improvements without first understanding specifically why the website is slow. A speed audit without diagnosis produces generic interventions that may or may not address the actual bottlenecks  and the most significant performance gains come from addressing the specific, highest-impact issues rather than applying a checklist of general optimisations.",
        },
        {
          h: "COMPREHENSIVE PERFORMANCE PROFILING",
          p: "We conduct performance profiling using Google PageSpeed Insights, GTmetrix, WebPageTest, and Chrome DevTools performance traces  measuring the website's actual load experience from multiple geographic locations, on multiple connection types, and on both mobile and desktop. The profiling identifies the specific contributing factors to the current performance score: server response time, render-blocking resources, image payload, JavaScript bundle size, unused CSS, third-party script overhead, and the specific Core Web Vitals failures (LCP, INP, CLS) that are limiting the website's performance and search ranking.",
        },
        {
          h: "BASELINE MEASUREMENT AND TARGET-SETTING",
          p: "Before any optimisation work begins, we establish the baseline performance metrics: current PageSpeed Insights scores (mobile and desktop), current Core Web Vitals measurements (LCP, INP, CLS), current page weight by resource type, and the current conversion rate and bounce rate data that will be used to measure the business impact of the performance improvements. We set specific, measurable performance targets for each engagement  not \"improve performance\" but \"achieve LCP under 2.5 seconds and PageSpeed score above 90 on mobile.\"",
        },
      ],
    },
    {
      n: "02",
      icon: "Image",
      tag: "Images",
      title: "Image Optimisation",
      intro: "",
      blocks: [
        {
          h: "WHY IMAGES ARE THE SINGLE LARGEST PERFORMANCE OPPORTUNITY FOR MOST WEBSITES",
          p: "Images typically account for 50-70% of a typical web page's total byte weight. Most websites serve images at significantly more bytes than necessary  because images are uploaded at original file sizes (often 3-10MB for camera photographs), served in legacy formats (JPEG and PNG rather than WebP or AVIF, which achieve 25-35% better compression at equivalent visual quality), and displayed at the same large dimensions regardless of the device requesting them (a 2400px wide image served to a 375px wide mobile screen is serving 6x more pixels than the screen can display).",
        },
        {
          h: "WEBP AND AVIF CONVERSION",
          p: "We convert all existing images to next-generation formats: WebP (with JPEG/PNG fallback for browsers that do not support WebP), and AVIF where browser support justifies the additional compression benefit. WebP images are typically 25-35% smaller than equivalent JPEG images at the same visual quality, and AVIF images are typically 50% smaller. For a website serving 800KB of JPEG images per page, WebP conversion alone reduces image payload to approximately 520-600KB  without any visible quality degradation.",
        },
        {
          h: "RESPONSIVE IMAGES AND LAZY LOADING",
          p: "We implement responsive image infrastructure: the HTML srcset and sizes attributes that instruct the browser to download only the image resolution appropriate for the actual display size of the device requesting the page (eliminating the unnecessary pixel download of serving desktop-resolution images to mobile screens). We implement lazy loading for below-fold images  deferring the download of images that are not immediately visible until the user scrolls toward them, reducing the initial page payload to only the above-fold content required for the first visible render.",
        },
      ],
    },
    {
      n: "03",
      icon: "Code",
      tag: "JS/CSS",
      title: "JavaScript and CSS Optimisation",
      intro: "",
      blocks: [
        {
          h: "THE RENDER-BLOCKING RESOURCE PROBLEM",
          p: "Render-blocking resources  JavaScript and CSS files that must be fully downloaded and processed before the browser can display any page content  are one of the primary causes of high Largest Contentful Paint (LCP) times. Every render-blocking resource adds to the delay between the user navigating to the page and the user seeing any page content.\n\nWe eliminate render-blocking resources through: critical CSS inlining (identifying the CSS required to render the above-fold content and inlining it directly in the HTML head, eliminating the additional round-trip required to fetch an external stylesheet before first paint), JavaScript deferral (loading non-critical JavaScript after the page has finished rendering, preventing JavaScript execution from blocking the page display), and unused code elimination (removing CSS and JavaScript code that is loaded on every page but used on no page, or loaded on pages where it has no effect).",
        },
        {
          h: "JAVASCRIPT BUNDLE OPTIMISATION",
          p: "For websites using JavaScript frameworks (React, Vue, Angular) or large JavaScript libraries, bundle size is a significant performance variable. We optimise JavaScript bundles through: tree shaking (removing unused code from third-party libraries before they are bundled), code splitting (dividing the JavaScript bundle into smaller chunks that are loaded on demand rather than all at once on initial page load), and minification (removing whitespace, comments, and other non-functional characters from JavaScript and CSS files).",
        },
        {
          h: "THIRD-PARTY SCRIPT MANAGEMENT",
          p: "Third-party scripts  analytics tools, chat widgets, advertising pixels, social sharing buttons, marketing automation tags  are a major source of website performance overhead. Each third-party script introduces additional DNS lookups, additional connection establishment, and additional JavaScript execution. We audit the third-party script load for all maintained websites: identifying scripts that are loaded but not actively used, scripts that can be deferred without loss of functionality, and scripts that can be replaced with lighter-weight alternatives.",
        },
      ],
    },
    {
      n: "04",
      icon: "Server",
      tag: "Hosting",
      title: "Server and Hosting Optimisation",
      intro: "",
      blocks: [
        {
          h: "SERVER RESPONSE TIME (TTFB)",
          p: "Time to First Byte (TTFB)  the time between a user's browser requesting a page and receiving the first byte of the server's response  is the foundational performance variable that all other optimisations build on. A server with a TTFB of 800 milliseconds cannot achieve an LCP under 2.5 seconds regardless of other optimisations  the first byte has not even arrived until 800ms into the loading process.\n\nWe optimise TTFB through: server-side caching (reducing database query time by caching the HTML output of dynamic pages for serving without rebuilding from the database), object caching (reducing PHP execution time by caching the results of expensive operations in Redis or Memcached), database query optimisation (profiling and optimising the specific database queries that are consuming the most server execution time), PHP version optimisation (ensuring the website runs on a current PHP version, which typically improves execution speed 20-40% compared to legacy versions), and hosting migration recommendations (for websites on shared hosting infrastructure where the hosting environment itself is the primary bottleneck).",
        },
        {
          h: "CDN IMPLEMENTATION",
          p: "A Content Delivery Network (CDN) serves static assets (images, CSS, JavaScript, fonts) from edge nodes geographically proximate to the visitor  eliminating the latency of serving assets from a single origin server that may be physically distant from a significant portion of the website's audience. For websites serving international audiences, CDN implementation is typically one of the highest-impact, lowest-complexity performance improvements available.\n\nWe configure and manage CDN implementation using Cloudflare (which also provides additional security benefits), BunnyCDN (a cost-effective option for straightforward CDN use cases), and AWS CloudFront (for websites already using AWS infrastructure). CDN implementation consistently produces 30-60% improvements in asset delivery time for visitors geographically distant from the origin server.",
        },
      ],
    },
    {
      n: "05",
      icon: "Activity",
      tag: "Core Web Vitals",
      title: "Core Web Vitals Remediation",
      intro: "",
      blocks: [
        {
          h: "LARGEST CONTENTFUL PAINT (LCP) OPTIMISATION",
          p: "LCP measures the time until the main content of the page is visible  specifically, the largest image or text block in the viewport. Google's threshold for a Good LCP score is under 2.5 seconds. We optimise LCP by: identifying the specific element that Google measures as the LCP element (the image, video, or text block that triggers the LCP measurement), prioritising the loading of that specific element (using rel=preload for the LCP image, ensuring it is not lazy-loaded, and ensuring it is served at the optimal size), and reducing the total load time upstream of the LCP element through server response time optimisation, render-blocking resource elimination, and image optimisation.",
        },
        {
          h: "INTERACTION TO NEXT PAINT (INP) OPTIMISATION",
          p: "INP measures the responsiveness of the page to user interactions  specifically, the time from user input (click, tap, keyboard press) to the next visual update of the page. Google's threshold for a Good INP score is under 200 milliseconds. Poor INP is typically caused by long JavaScript tasks that block the browser's main thread  preventing it from responding to user input quickly. We optimise INP by: profiling the JavaScript execution to identify the long tasks causing main thread blocking, breaking long tasks into smaller chunks using scheduling APIs, and deferring non-critical JavaScript execution until after the user interaction has been handled.",
        },
        {
          h: "CUMULATIVE LAYOUT SHIFT (CLS) REMEDIATION",
          p: "CLS measures visual stability  the degree to which page content moves unexpectedly as the page loads. A page with high CLS produces a jarring user experience where content shifts position after the user has already begun reading or interacting with it. Google's threshold for a Good CLS score is under 0.1. We eliminate CLS by: adding explicit width and height attributes to all images (preventing layout shift when images load), reserving space for late-loading elements (ads, embeds, and dynamic content that appears after initial page render), and removing CSS animations that cause layout recalculation during page load.",
        },
      ],
    },
    {
      n: "06",
      icon: "Wordpress",
      tag: "WordPress",
      title: "WordPress-Specific Speed Optimisation",
      intro: "",
      blocks: [
        {
          h: "WORDPRESS PERFORMANCE ENGINEERING",
          p: "WordPress presents specific performance challenges  the PHP rendering pipeline, the plugin execution overhead, and the database query architecture  that require WordPress-specific performance engineering rather than general web performance techniques. We address the WordPress-specific performance factors that generic speed audits frequently miss.",
        },
        {
          h: "CACHING ARCHITECTURE",
          p: "We implement and configure the multi-layer caching architecture that WordPress performance requires: page caching (generating and storing the HTML output of dynamic WordPress pages for serving without PHP execution on subsequent requests), object caching (storing the results of expensive WordPress database queries in Redis or Memcached for reuse without repeating the database operation), and browser caching (configuring appropriate cache-control headers to instruct the visitor's browser to retain static assets locally for subsequent page visits). We select and configure the appropriate caching plugin for each hosting environment  the optimal caching configuration for WP Engine differs from that for a self-hosted Nginx stack.",
        },
        {
          h: "PLUGIN PERFORMANCE AUDIT",
          p: "WordPress plugins are the most common source of WordPress performance degradation. We conduct plugin performance audits using Query Monitor: profiling the database queries, PHP execution time, and HTTP requests that each plugin contributes to every page load, identifying the plugins with performance overhead disproportionate to their function, and recommending replacement or removal of plugins whose performance cost exceeds their contribution. Plugin consolidation  replacing multiple single-purpose plugins with a single well-engineered alternative, or replacing plugins with custom code implementations  is frequently the highest-impact WordPress performance intervention available.",
        },
      ],
    },
  ],
  cases: [
    {
      tag: "E-Commerce · WooCommerce",
      metric: "£180K",
      sub: "monthly revenue increase · 0.6% → 2.1% conversion",
      title: "E-commerce brand  page speed improvement increases monthly revenue by £180K.",
      body: "A fashion e-commerce brand on WooCommerce was experiencing a mobile PageSpeed score of 28 and a mobile page load time of 7.8 seconds. Their mobile conversion rate was 0.6%  significantly below the e-commerce category average of approximately 1.8%  and analytics showed that 74% of mobile sessions were single-page sessions (visitors leaving after viewing only one page).\n\nOur speed optimisation: migration from shared hosting to managed WooCommerce hosting (Kinsta), WebP image conversion and responsive image implementation (reducing average page image payload from 1.8MB to 240KB), critical CSS extraction and render-blocking JavaScript deferral, Redis object cache implementation, CDN configuration via Cloudflare, and WooCommerce-specific cart fragment and session optimisation.",
      result: "Mobile PageSpeed score improved from 28 to 92. Mobile LCP improved from 8.2 seconds to 1.6 seconds. Mobile conversion rate improved from 0.6% to 2.1%  a 250% improvement. Monthly revenue from the same traffic grew by approximately £180,000. The single-page session rate for mobile decreased from 74% to 38%, indicating that significantly more mobile visitors were engaging with multiple pages  a direct indicator of the improved user experience.",
    },
    {
      tag: "B2B Services · Core Web Vitals",
      metric: "34%",
      sub: "organic traffic increase · Poor → Good across all CWV",
      title: "B2B services website  Core Web Vitals improvement increases organic traffic by 34%.",
      body: "A B2B professional services firm had been investing in SEO for 18 months with consistent content production and link-building activity  but organic traffic growth had plateaued. A technical audit identified that the website had Poor Core Web Vitals ratings across all three metrics: LCP of 5.8 seconds, INP failure (excessive long tasks), and CLS of 0.42. The Core Web Vitals failures were acting as a structural SEO disadvantage against competitors with equivalent content and link profiles.\n\nOur speed optimisation: critical CSS inlining, JavaScript bundle optimisation and deferral (reducing total blocking time from 4.2 seconds to 180 milliseconds), image optimisation, explicit image dimensions across all pages eliminating CLS from image loading, and WordPress caching implementation reducing TTFB from 1.8 seconds to 180 milliseconds.",
      result: "Core Web Vitals improved from Poor across all three metrics to Good across all three metrics. Over the 6 months following the Core Web Vitals improvement, organic search impressions grew 34% and organic click-through traffic grew 41%  growth that the SEO team attributed to the removal of the Core Web Vitals ranking disadvantage unlocking the organic authority that 18 months of SEO investment had built but that the technical penalty had been suppressing.",
    },
    {
      tag: "SaaS · Quality Score",
      metric: "22%",
      sub: "CPC reduction · 4.8 → 7.2 Quality Score",
      title: "SaaS marketing website  speed improvement reduces paid advertising CPC by 22%.",
      body: "A B2B SaaS company was running Google Ads campaigns to landing pages with a Quality Score averaging 4.8  below the account-average Quality Score of 7 that their bidding strategy assumed. Investigation revealed that the landing pages' speed scores were the primary contributor to the below-average Quality Score: the landing pages loaded in 5.2 seconds on mobile, significantly below Google's threshold for a Good landing page experience.\n\nOur landing page speed optimisation: critical CSS inlining, image optimisation and WebP conversion, JavaScript deferral (particularly the chat widget and marketing automation scripts loading synchronously at page head), font loading optimisation, and CDN configuration for static asset delivery. Landing page load time improved from 5.2 seconds to 1.8 seconds on mobile.",
      result: "Landing page Quality Scores improved from an average of 4.8 to 7.2  above the target average. The Quality Score improvement produced a 22% reduction in average CPC across all campaigns (from £3.40 to £2.65), reducing the monthly paid advertising cost by approximately £8,400 for the same ad volume. The improved landing page speed simultaneously improved conversion rates by approximately 18%  a double improvement from a single technical change.",
    },
  ],
  why: [
    {
      icon: "Search",
      h: "Diagnosis-First Approach",
      p: "We do not apply generic speed improvement checklists. We diagnose the specific, highest-impact bottlenecks in each website's specific performance profile  and implement the specific interventions that address those specific bottlenecks. A website whose primary performance problem is an oversized JavaScript bundle requires different interventions from one whose primary problem is server response time  and applying the wrong interventions to the wrong problem produces disappointing results. We diagnose first.",
    },
    {
      icon: "Target",
      h: "Measurable Targets and Verified Results",
      p: "Every speed optimisation engagement begins with specific, measurable performance targets (PageSpeed score, Core Web Vitals ratings, specific LCP/INP/CLS values) and concludes with verified measurement of whether those targets were achieved. We do not report PageSpeed improvements as standalone wins  we connect them to the conversion rate and organic traffic changes that are the business-level outcomes the performance improvements should produce.",
    },
    {
      icon: "Cpu",
      h: "Platform-Specific Expertise",
      p: "WordPress performance engineering is different from Next.js performance engineering, which is different from Shopify performance engineering. Each platform has platform-specific performance characteristics that require platform-specific technical expertise. We bring the platform-specific knowledge to performance optimisation rather than applying platform-agnostic recommendations that miss the platform-specific issues.",
    },
    {
      icon: "Shield",
      h: "Regression Prevention",
      p: "A speed optimisation engagement that produces a 92 PageSpeed score is only valuable if that score is maintained over time. We document the specific optimisations implemented, provide guidelines for content team practices (image upload specifications, video embed approaches) that prevent performance regression, and include performance monitoring in our ongoing maintenance retainers to identify and address performance regression before it affects business outcomes.",
    },
  ],
  faqs: [
    {
      q: "What is a good PageSpeed score?",
      a: "Google's PageSpeed Insights scores websites from 0 to 100 across both mobile and desktop. The ranges: 0-49 is Poor (significant performance problems requiring immediate attention), 50-89 is Needs Improvement (meaningful performance issues that should be addressed), 90-100 is Good (the target range for websites that want to maximise search ranking and conversion performance). For most business websites in 2026, a score above 90 on mobile (the more challenging and more important target) is the appropriate performance goal. Desktop scores are typically 15-25 points higher than mobile scores for the same website, and mobile is the metric that matters most given that 65%+ of website traffic is mobile.",
    },
    {
      q: "What are Core Web Vitals and why do they affect my Google rankings?",
      a: "Core Web Vitals are three metrics Google uses to measure real-world user experience on web pages. LCP (Largest Contentful Paint) measures how quickly the main content appears  Good is under 2.5 seconds. INP (Interaction to Next Paint) measures how quickly the page responds to user interactions  Good is under 200 milliseconds. CLS (Cumulative Layout Shift) measures visual stability  Good is under 0.1. Google incorporated Core Web Vitals as a ranking signal in its Page Experience update  pages that achieve Good ratings across all three metrics receive a ranking advantage over equivalent pages with Poor or Needs Improvement ratings. This means that a slow website is competing at a structural disadvantage in Google search, regardless of the quality of its content and the strength of its backlink profile.",
    },
    {
      q: "How long does a speed optimisation engagement take?",
      a: "A focused speed optimisation engagement for an existing website typically takes 2-4 weeks: 3-5 days for performance audit and diagnosis, 5-10 days for implementation of the optimisations, and 2-3 days for testing and verification of results. More complex engagements  involving hosting migration, significant codebase changes, or custom caching infrastructure  take 4-6 weeks. The implementation timeline depends significantly on the website's platform (WordPress optimisation is well-understood and fast to implement; custom framework optimisation may require more investigation time) and the depth of the performance problems identified.",
    },
    {
      q: "How much does website speed optimisation cost?",
      a: "A focused speed optimisation engagement (audit, diagnosis, implementation of the primary performance interventions, and verified result measurement) typically costs $1,500 to $5,000 depending on the platform, the scale of the website, and the depth of the performance problems. WordPress speed optimisation for a standard business website typically costs $2,000 to $4,000. E-commerce speed optimisation (with the additional WooCommerce or Shopify-specific optimisations) typically costs $3,000 to $6,000. For websites requiring hosting migration as part of the optimisation, the hosting migration adds scope and cost. We provide fixed-price proposals after the initial audit.",
    },
    {
      q: "Will speed optimisation break my website?",
      a: "When optimisations are applied correctly, they should not break website functionality. We implement all optimisations in a staging environment before applying them to the live website, specifically to catch any conflicts between optimisations and existing functionality. The staging-first approach is the standard practice that protects the live website from the rare cases where an optimisation conflicts with specific existing functionality. We document all changes and maintain the ability to roll back any specific optimisation if it produces an unexpected issue on the live website.",
    },
    {
      q: "How do I know if my website is slow?",
      a: "The quickest way to check: enter your website URL in Google PageSpeed Insights (pagespeed.web.dev) and run the mobile test. A score below 50 indicates serious performance problems. A score of 50-89 indicates meaningful improvement opportunity. For a more detailed analysis, GTmetrix provides waterfall charts that show the loading sequence of all page resources  identifying the specific files and requests that are contributing most to load time. We conduct a free initial performance check as part of our consultation process.",
    },
    {
      q: "Does website speed affect mobile more than desktop?",
      a: "Yes  mobile performance is significantly more challenging than desktop performance and significantly more important given that 65%+ of web traffic is mobile. Mobile devices have less processing power than desktop computers (limiting JavaScript execution speed), mobile network connections are less reliable and lower-bandwidth than desktop broadband (amplifying the cost of large page payloads), and mobile users are more likely to be in fragmented attention environments where slow pages are abandoned rather than waited for. Google's PageSpeed score is calculated separately for mobile and desktop, and mobile scores are typically 15-25 points lower than desktop scores for the same website. Mobile performance is the correct primary target for speed optimisation.",
    },
    {
      q: "Can you improve the speed of any website, or only WordPress?",
      a: "We optimise the performance of websites on all major platforms: WordPress and WooCommerce, Shopify, Webflow, Next.js, Squarespace, Wix, and custom-built websites. Each platform has different performance characteristics and different performance optimisation approaches  the techniques that produce the most improvement for a WordPress website are different from those most effective for a Shopify store or a Next.js application. We diagnose the specific platform's specific performance issues and apply the platform-appropriate optimisations. For websites on platforms with limited optimisation capability (Wix, for example, restricts what performance optimisations can be applied), we provide an honest assessment of the improvements achievable within the platform's constraints.",
    },
  ],
  cta: {
    title: "Ready to Make Your Website as Fast as It Needs to Be?",
    description:
      "Your website's speed is not a technical detail. It is a conversion variable, a search ranking factor, and a paid advertising efficiency multiplier  and it is currently set at whatever level your developer left it at when the website was built, whether that was 1 year ago or 6 years ago.\n\nFaster websites earn more from the same traffic. More organic search impressions for the same SEO investment. Lower CPCs for the same advertising budget. More conversions for the same visitor volume.\n\nWe make websites fast. Specifically. Measurably. Permanently.",
    contactLink: "https://clickmastersdigitalmarketing.com/contact",
    whatsappLink: "https://wa.me/",
    softwareLink: "https://clickmastersdigitalmarketing.com/technical-seo/",
  },
  footer: {
    company: "Clickmasters Digital Marketing",
    url: "https://clickmastersdigitalmarketing.com",
    email: "marketing@clickmastersdigitalmarketing.com",
    regions: "USA, UK, UAE, Pakistan, Canada, Australia",
    author: "Amjad Khan  CEO, Clickmasters Digital Marketing | Website speed optimisation specialist | 10+ years",
  },schema: {
  Service: {
    serviceType: "Website Speed Optimisation",
    provider: {
      name: "Clickmasters Digital Marketing",
      url: "https://clickmastersdigitalmarketing.com",
      logo: "https://clickmastersdigitalmarketing.com/logo.png"
    },
    areaServed: ["US", "UK", "UAE", "PK"]
  },

  FAQPage: {
    items: [
      "What is a good PageSpeed score?",
      "What are Core Web Vitals and why do they affect my Google rankings?",
      "How long does a speed optimisation engagement take?",
      "How much does website speed optimisation cost?",
      "Will speed optimisation break my website?",
      "How do I know if my website is slow?",
      "Does website speed affect mobile more than desktop?",
      "Can you improve the speed of any website, or only WordPress?"
    ]
  },

  Organization: {
    name: "Clickmasters Digital Marketing",
    url: "https://clickmastersdigitalmarketing.com",
    logo: "https://clickmastersdigitalmarketing.com/logo.png",
    sameAs: [
      "https://www.facebook.com/clickmasters",
      "https://www.instagram.com/clickmasters",
      "https://www.linkedin.com/company/clickmasters"
    ]
  },

  BreadcrumbList: {
    items: [
      {
        position: 1,
        name: "Home",
        url: "https://clickmastersdigitalmarketing.com"
      },
      {
        position: 2,
        name: "Web Design & Development",
        url: "https://clickmastersdigitalmarketing.com/web-design-development/"
      },
      {
        position: 3,
        name: "Website Speed Optimisation",
        url: "https://clickmastersdigitalmarketing.com/website-speed-optimization/"
      }
    ]
  }
}
};