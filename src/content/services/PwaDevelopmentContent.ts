export const PwaDevelopmentContent = {
  slug: "pwa-development-services",
  metadata: {
    url: "/pwa-development-services/",
    keyword: "pwa development company",
    volume: "3,600/mo",
    cpc: "$28.40",
    formula: "FAB",
    author: "Amjad Khan",
  },
  hero: {
    tag: "[ Service ] PWA Development",
    title: "PWA Development Services",
    titleHighlight: "App-Like Experience. Web-Like Reach. No App Store Required.",
    subtitle: "",
    description:
      "Expert PWA development  Service Workers, Web Push, offline capability, e-commerce & media PWAs. USA, UK & UAE. Free PWA consultation.",
    stats: [
      { k: "65%", v: "Mobile revenue increase" },
      { k: "38%", v: "Bounce rate reduction" },
      { k: "41%", v: "Order completion increase" },
      { k: "10+ yrs", v: "PWA development depth" },
    ],
  },
  intro: {
    problem: [
      { text: "Feature  What PWA Technology Delivers", type: "normal" }
    ],
    solution:
      "FEATURE 1: OFFLINE CAPABILITY AND SERVICE WORKERS\nThe most technically distinctive capability of a PWA is offline functionality  the ability to work without a network connection. Service Workers  a type of JavaScript file that runs independently of the main browser thread and intercepts network requests  are the technical foundation of PWA offline capability. They implement caching strategies: pre-caching critical resources (HTML, CSS, JavaScript, key images) during installation so they are available immediately even without connectivity, and runtime caching strategies (Cache First for static assets, Network First for dynamic content, Stale While Revalidate for content that benefits from both freshness and speed) that determine how each type of content is served.\n\nOffline capability is not a novelty feature  it is a conversion mechanism. For e-commerce sites in markets with variable connectivity (UAE, Pakistan, Southeast Asia), the ability to browse a cached product catalogue and complete a purchase when connectivity is restored is the difference between a completed transaction and an abandoned session. For media companies, offline article reading is a retention feature that increases session depth among users who commute in low-connectivity environments.\n\nFEATURE 2: PUSH NOTIFICATIONS WITHOUT APP STORE\nWeb Push Notifications  delivered through the browser's push API  give PWAs the direct communication channel to installed users that native apps have had exclusively for years. A user who installs the PWA to their home screen and accepts push notification permissions receives notifications that appear on their lock screen and notification centre, identical in presentation to native app notifications, without requiring App Store installation.\n\nThe commercial value: a PWA push subscriber costs zero to acquire (no paid App Store install campaign required) and engages at push notification open rates that approach native app rates for well-targeted, well-timed messages. For e-commerce brands with large mobile web audiences, the PWA push subscriber list is a direct revenue channel  the flash sale notification, the cart abandonment recovery message, the back-in-stock alert  at a fraction of the cost of building and maintaining a native app.\n\nFEATURE 3: INSTALLABILITY AND HOME SCREEN PRESENCE\nA PWA that meets the installability criteria (HTTPS, a qualifying web app manifest, a registered Service Worker) triggers the browser's native install prompt  asking the user to add the app to their home screen. Once installed, the PWA launches in standalone mode (full screen, without browser chrome), appears in the app switcher alongside native apps, and is accessible from the home screen with a tap.\n\nThe install conversion rate from mobile web to PWA is typically 3-5x higher than to native App Store for equivalent audiences  because the friction of installing from the home screen prompt is significantly lower than the friction of leaving the browser, finding the app in the App Store, authenticating, and downloading.\n\nFEATURE 4: PERFORMANCE  FASTER THAN MOBILE WEB\nService Worker pre-caching means that on second and subsequent visits, the PWA loads critical resources from the local cache rather than from the network  producing sub-second load times for repeat visitors regardless of network conditions. For first visits, PWAs implement the performance optimisation stack (lazy loading, code splitting, critical CSS, optimised images) that produces the fast first load that makes installation worth the user's consideration.\n\nThe performance characteristics of a well-built PWA consistently outperform the same website without PWA enhancements by 50-80% on repeat visit load time, and match or exceed the first-load performance of mobile web with the addition of offline capability and push notification access.",
    promise: "",
  },
  problem: {
    title: "Advantage  Why PWA Is the Right Approach for Specific Use Cases",
    titleHighlight: "",
    items: [
      {
        icon: "Smartphone",
        title: "WHEN PWA BEATS NATIVE APP INVESTMENT",
        body: "PWA is the right investment over native app when: the business has a large existing mobile web audience with high intent but low native app adoption, the app's functional requirements do not depend on deep platform API integration (camera, biometrics, HealthKit, in-app purchases at scale), the target market has variable network connectivity where offline capability adds commercial value, the business needs to avoid App Store review dependency for rapid content and feature updates, or the total cost of native app development and maintenance is disproportionate to the incremental revenue it would generate over a well-optimised PWA.\n\nA fashion e-commerce brand with 400,000 monthly mobile web visitors and a 0% native app adoption rate will generate more incremental revenue from a well-built PWA  with its lower installation friction and push notification capability  than from a native iOS app that 2% of those visitors will ever install.",
      },
      {
        icon: "Cpu",
        title: "WHEN NATIVE APP IS STILL THE RIGHT CHOICE",
        body: "PWA does not replace native apps for requirements that depend on native platform capabilities: Face ID and biometric authentication at the OS level, Apple Pay and Google Pay integration, background location tracking, complex Bluetooth and NFC device communication, App Store and Google Play Store discovery, and the categories (healthcare, fintech, gaming) where native platform expectations are set by established native app competitors. We advise on the right approach for each client's specific requirements  including honest assessments of when PWA cannot adequately serve the use case.",
      },
    ],
    afterTitle: "Our PWA Development Services",
    afterHighlight: "",
    afterItems: [],
  },
  services: [
    {
      n: "01",
      icon: "Code",
      tag: "Architecture",
      title: "PWA Architecture and Service Worker Strategy",
      intro: "",
      blocks: [
        {
          h: "SERVICE WORKER DESIGN",
          p: "The Service Worker strategy is the most consequential technical decision in PWA development  the caching approach determines the offline behaviour, the performance characteristics, and the data freshness that users experience. We design Service Worker strategies matched to each application's specific content types: aggressive pre-caching for static assets (CSS, JavaScript, images that change only with new deployments), network-first with cache fallback for dynamic content (product catalogues, news feeds, user-specific data that must be current when connectivity is available), and background sync for transactional content (form submissions, order placements that queue for processing when connectivity is restored).",
        },
        {
          h: "WEB APP MANIFEST CONFIGURATION",
          p: "The web app manifest is the JSON file that defines the PWA's installed experience: the name and short name that appear on the home screen and in the app switcher, the icons in all required sizes (48px through 512px, with maskable icon variants for Android adaptive icons), the theme colour (the colour used in the browser address bar and Android task switcher for branded consistency), the display mode (standalone for full-screen app experience, minimal-ui for apps that benefit from minimal browser controls), and the start URL that determines which page loads when the installed PWA is launched.",
        },
      ],
    },
    {
      n: "02",
      icon: "ShoppingCart",
      tag: "E-Commerce",
      title: "PWA for E-Commerce",
      intro: "",
      blocks: [
        {
          h: "SHOP PWA ARCHITECTURE",
          p: "E-commerce PWAs present specific technical requirements: the product catalogue is too large to pre-cache fully (requiring selective caching of browsed products), cart and checkout state must persist across sessions and be recoverable from cache on network failure, payment processing requires network connectivity but the checkout experience should be initiatable offline, and the product imagery  the primary bandwidth consumer on e-commerce sites  must be optimised and progressively loaded.\n\nWe build e-commerce PWAs that address these requirements: IndexedDB storage for cart persistence across sessions, product page caching for recently viewed and wished products, background sync for cart modifications made without connectivity, optimised image loading with progressive enhancement, and the checkout flow that gracefully handles the transition from offline browsing to online payment.",
        },
        {
          h: "SHOPIFY HEADLESS WITH PWA",
          p: "For Shopify stores seeking PWA capabilities, we build Shopify headless storefronts  Next.js frontends connected to Shopify's Storefront API  with full Service Worker and offline capability layers. This architecture provides the PWA performance and offline characteristics without sacrificing Shopify's checkout conversion optimisation and payment infrastructure. The Shopify Storefront API's React query caching integrates naturally with Service Worker pre-caching for an optimal offline product browsing experience.",
        },
      ],
    },
    {
      n: "03",
      icon: "Newspaper",
      tag: "Media",
      title: "PWA for Media and Publishing",
      intro: "",
      blocks: [
        {
          h: "CONTENT PRE-CACHING FOR OFFLINE READING",
          p: "Media and publishing PWAs have a specific high-value offline use case: the user who arrives at an article during their commute with connectivity, and wants to continue reading other content after entering a tunnel. We implement article and content pre-caching: automatically caching the articles and pages most likely to be of interest to each user (based on their reading history and preferences) in the background, so that offline content consumption is available without requiring explicit user action.",
        },
        {
          h: "THE MEDIA PWA CONTENT DELIVERY ARCHITECTURE",
          p: "Media PWAs must balance freshness (news readers need current content) with performance (every millisecond of load time reduces content consumption). We implement Stale While Revalidate caching  serving cached content immediately while simultaneously fetching updated content in the background  for the specific content types that benefit from both speed and freshness. Breaking news and time-sensitive content uses Network First (prioritising freshness). Evergreen content uses Cache First (prioritising performance). The content delivery strategy is matched to each content type's freshness requirements.",
        },
      ],
    },
    {
      n: "04",
      icon: "Bell",
      tag: "Push",
      title: "PWA Push Notification Infrastructure",
      intro: "",
      blocks: [
        {
          h: "WEB PUSH IMPLEMENTATION",
          p: "Web Push Notifications require a specific technical infrastructure: a VAPID (Voluntary Application Server Identification) key pair for authenticating push messages, a subscription management system (storing and managing the push subscription objects for each user), a push notification service worker handler (receiving and displaying notifications when the browser processes them), and the backend push delivery service (sending messages to the Web Push protocol endpoint with the appropriate payload and TTL).\n\nWe implement the complete Web Push infrastructure: VAPID key generation and management, subscription storage (PostgreSQL or a dedicated push service), the push delivery backend (using Pywebpush, web-push npm library, or a managed push service like Firebase Cloud Messaging's Web SDK), and the Service Worker notification handler with rich notification support (notification icons, badge icons, action buttons, and notification click handling that opens the correct PWA page when the notification is tapped).",
        },
        {
          h: "PERMISSION REQUEST OPTIMISATION",
          p: "The push notification permission prompt is one of the most consequential UX moments in PWA deployment  granted too early (on first page load), most users will dismiss it; granted at the right moment (after the user has experienced enough of the product to understand its value), opt-in rates can reach 40-60%. We design permission request strategies matched to each product's user journey: triggered by specific user actions (adding a first item to cart, completing a first article, reaching a usage milestone), with a custom pre-permission prompt that explains what the notifications will deliver before the browser's native prompt appears.",
        },
      ],
    },
    {
      n: "05",
      icon: "Gauge",
      tag: "Performance",
      title: "PWA Performance Optimisation",
      intro: "",
      blocks: [
        {
          h: "LIGHTHOUSE AUDIT AND CORE WEB VITALS",
          p: "We build PWAs to the Lighthouse PWA audit criteria  the audit that Google uses to assess whether a site meets PWA quality standards  and simultaneously to Core Web Vitals compliance. The two standards reinforce each other: the caching strategies that produce PWA offline capability also produce the fast repeat visit performance that Core Web Vitals reward; the HTTPS requirement for PWAs aligns with the security standards that search ranking and browser trust indicators require.\n\nWe target: Lighthouse PWA audit score of 100, Core Web Vitals Good ratings (LCP under 2.5s, INP under 200ms, CLS under 0.1), and Google PageSpeed scores of 90+ on mobile for both first and repeat visits. Repeat visit performance  dramatically faster for PWAs due to Service Worker caching  is a specific performance advantage we document as a baseline metric for every PWA engagement.",
        },
      ],
    },
    {
      n: "06",
      icon: "ChartBar",
      tag: "Analytics",
      title: "PWA Analytics and Engagement Measurement",
      intro: "",
      blocks: [
        {
          h: "MEASURING PWA ENGAGEMENT",
          p: "PWA installations, push notification opt-ins, and offline usage are not measured by standard web analytics without specific implementation. We configure the analytics tracking that makes PWA engagement measurable: Google Analytics 4 PWA installation events (tracking the install prompt display, the user's response, and successful home screen addition), push notification subscription and conversion tracking (measuring the subscriber acquisition rate and the revenue impact of push notification campaigns), and offline usage reporting (measuring how much of the PWA's usage occurs without network connectivity  a key metric for justifying the offline capability investment).",
        },
        {
          h: "A/B TESTING INSTALL PROMPTS",
          p: "The timing, copy, and design of the install prompt significantly affects the PWA installation rate. We implement A/B testing for install prompt variations: testing different trigger moments (after first product view vs. after second page vs. after add-to-cart), different custom pre-prompt copy (explaining the push notification value, the offline capability, or the home screen convenience), and different design treatments (banner vs. modal vs. inline card). Installation rate improvements from optimised prompts range from 30-150% over the default browser install prompt without custom treatment.",
        },
      ],
    },
  ],
  cases: [
    {
      tag: "E-Commerce · PWA",
      metric: "65%",
      sub: "mobile revenue growth · 8.2% install rate",
      title: "E-commerce brand  PWA increases mobile revenue by 65% without native app development.",
      body: "A fashion accessories e-commerce brand had 280,000 monthly mobile web visitors and a 0.4% native iOS app adoption rate despite running App Store install campaigns for 18 months. The native app investment had generated 1,120 active app users  too few to justify the ongoing development cost. The brand's marketing team wanted the push notification capability of a native app without the continued investment in an underadopted native product.\n\nOur PWA engagement: Next.js PWA built on the existing Shopify store via the Shopify Storefront API (maintaining Shopify's checkout conversion capabilities while adding PWA offline and notification features), Service Worker with selective product caching (caching viewed product pages, collection pages, and recently browsed products), Web Push implementation with a custom pre-prompt triggered after the user's third product view, and offline cart persistence using IndexedDB.",
      result: "PWA installation rate of 8.2% of returning mobile visitors within 60 days of launch  82x the existing native app adoption rate. Push notification subscriber list grew to 18,400 within 90 days. The first push notification campaign (a 48-hour flash sale) generated $47,000 in revenue from 18,400 push subscribers  the push channel's first commercial deployment. Mobile revenue grew by 65% year-over-year in the 12 months following the PWA launch, attributed to the combination of push notification re-engagement and repeat visit performance improvements.",
    },
    {
      tag: "Media Publisher · PWA",
      metric: "38%",
      sub: "bounce rate reduction · 1.4 → 2.9 pages/session",
      title: "Media publisher  PWA reduces bounce rate by 38% and increases pages per session by 2.1x.",
      body: "A digital news publisher with 1.2 million monthly mobile sessions was experiencing a 74% mobile bounce rate  the majority of users reading one article and leaving without exploring further. Load time analysis identified 5.8-second average mobile page loads on first visit and 4.2 seconds on repeat visits as the primary cause of the high bounce rate, alongside the absence of any re-engagement mechanism once a user had left.\n\nOur PWA engagement: Service Worker with Stale While Revalidate caching for articles (sub-second load on repeat visits), article pre-caching based on reading history (automatically caching the three articles most likely to be of interest to each user based on category reading patterns), Web Push notifications for breaking news alerts and daily briefing delivery, and offline reading capability for pre-cached articles.",
      result: "Mobile bounce rate decreased from 74% to 46%  a 38% reduction  within 60 days of PWA launch. Average pages per session increased from 1.4 to 2.9  a 2.1x improvement. Repeat visit load time improved from 4.2 seconds to 0.8 seconds (Service Worker cache serving cached article HTML immediately). Push notification subscriber list reached 42,000 within 90 days, with the daily briefing notification achieving a 14% click-through rate  significantly above the publisher's email newsletter click-through rate of 4.2%.",
    },
    {
      tag: "Food Delivery · Connectivity",
      metric: "41%",
      sub: "order completion increase · 22% installation rate",
      title: "Food delivery service  PWA in connectivity-challenged market increases order completion by 41%.",
      body: "A food delivery service operating across UAE and Pakistan was experiencing significant order abandonment during the checkout process  analytics identified that 34% of checkout abandonments were preceded by network timeout errors, indicating that variable mobile connectivity in the markets served was causing checkout failures mid-flow rather than purchase hesitation.\n\nOur PWA engagement: Service Worker with restaurant menu caching (enabling offline browsing of restaurant menus and adding items to cart without connectivity), IndexedDB cart persistence (preserving cart state through connectivity interruptions), background sync for order submission (queuing the order for submission and completing it automatically when connectivity was restored), and the specific low-bandwidth image optimisation that reduced average page weight from 1.8MB to 320KB  critical for users on 3G connections.",
      result: "Order completion rate increased by 41% within 3 months of PWA deployment, attributed primarily to the background sync mechanism that prevented connectivity interruptions from abandoning in-progress orders. The low-bandwidth image optimisation reduced median page load time from 6.4 seconds to 2.1 seconds on 3G connections. PWA installation rate of 22% of returning users  the higher-than-average installation rate attributed to the tangible offline value the PWA delivered in the connectivity-variable environment.",
    },
  ],
  why: [
    {
      icon: "Globe",
      h: "Browser-Native First, Framework-Agnostic",
      p: "We build PWAs using the browser's native APIs  Service Workers, Web App Manifest, Push API, Background Sync  rather than PWA wrapper frameworks that abstract away the underlying technology and limit the customisation of each capability. Browser-native PWA implementations are more performant, more controllable, and less dependent on third-party framework maintenance schedules than wrapper-based approaches.",
    },
    {
      icon: "Target",
      h: "Service Worker Strategy as a Commercial Decision",
      p: "The caching strategy is not a technical default  it is a commercial decision with measurable conversion implications. We design caching strategies from the business objective: what content needs to be available offline for the offline capability to be commercially valuable, what content needs to be fresh to prevent stale data from causing conversion friction, and how the transition between online and offline states is experienced by the user. Service Worker strategy is UX design with conversion implications.",
    },
    {
      icon: "Link2",
      h: "Platform Integration Without Compromise",
      p: "PWAs complement native apps rather than replacing them for businesses that need both. We build PWAs that co-exist with native app programmes: the same backend API serving both the PWA and native apps, push notification infrastructure that manages subscriptions across web push and native push channels, and the analytics framework that measures engagement across both channels. The PWA captures the mobile web audience that the native app cannot; the native app serves the users who need platform-depth features that PWA cannot deliver.",
    },
  ],
  faqs: [
    {
      q: "What exactly is a Progressive Web App?",
      a: "A Progressive Web App is a website that uses modern browser APIs to gain capabilities previously exclusive to native mobile apps: offline functionality (via Service Workers), installability to the home screen (via the Web App Manifest), push notifications (via the Web Push API), and background sync (via the Background Sync API). PWAs run in a browser engine and are installed from the browser rather than from an app store. On Android, PWAs integrate deeply with the operating system  appearing in the app drawer, receiving notifications, and behaving like native apps. On iOS, PWA capabilities have historically been more limited due to WebKit restrictions, but Apple has progressively expanded PWA support in recent iOS versions, including Web Push support since iOS 16.4.",
    },
    {
      q: "Are PWAs supported on iOS?",
      a: "PWA support on iOS has expanded significantly. As of iOS 16.4 and later, iOS Safari supports Web Push Notifications (allowing PWAs added to the home screen to send push notifications), Service Workers (for offline capability and caching), and the Web App Manifest (for home screen installation). Some advanced PWA capabilities remain limited on iOS compared to Android: background sync is partially supported, and the install prompt is not automatic (users must manually use the 'Add to Home Screen' option in Safari's share menu rather than seeing a browser install prompt). For most PWA use cases  offline browsing, push notifications, home screen presence  iOS support is now sufficient for commercial deployment.",
    },
    {
      q: "How does a PWA differ from a native app?",
      a: "PWAs differ from native apps in three primary ways: distribution (PWAs install from the browser, not from the App Store or Play Store), platform integration depth (native apps can access more device hardware APIs and platform services than PWAs), and discovery (App Store and Play Store organic discovery is not available to PWAs). The advantages of PWA over native: lower installation friction, no App Store review process, immediate update deployment without store review, single codebase for all platforms, and Google Search indexability. The advantages of native over PWA: deeper platform integration, App Store and Play Store discovery, richer access to device hardware, and better performance for graphics-intensive or hardware-intensive applications.",
    },
    {
      q: "Can a PWA send push notifications?",
      a: "Yes  Web Push Notifications work on Android (all modern versions) and iOS (iOS 16.4+, for PWAs added to the home screen). The push notification capability requires the user to add the PWA to their home screen and grant notification permission. Web Push Notifications appear on the lock screen and notification centre identically to native app notifications. The primary limitation is that Web Push does not work for users who access the site through the browser without installing it  the notification subscription is associated with the installed PWA, not with the browser session.",
    },
    {
      q: "How much does PWA development cost?",
      a: "A PWA enhancement of an existing website (Service Worker implementation, Web App Manifest, push notification infrastructure, and performance optimisation) typically costs $8,000 to $25,000. A ground-up PWA for a new product (full application development with PWA capabilities built in from the start) typically costs $25,000 to $80,000. A complex PWA with sophisticated offline capability (e-commerce with IndexedDB cart persistence, background sync for order submission) or media publishing with aggressive content pre-caching typically costs $40,000 to $120,000. We provide fixed-price quotes after understanding the specific requirements.",
    },
    {
      q: "How long does PWA development take?",
      a: "Adding PWA capabilities to an existing website (Service Worker, manifest, push notifications) typically takes 3-6 weeks. Building a new product as a PWA from scratch typically takes 12-20 weeks. The timeline depends significantly on the complexity of the Service Worker strategy, the sophistication of the offline capability required, and the push notification infrastructure implementation. Performance optimisation to achieve 90+ Lighthouse PWA scores and Core Web Vitals compliance typically adds 2-3 weeks to any PWA engagement.",
    },
    {
      q: "Can a PWA appear in the App Store or Google Play?",
      a: "Not directly  PWAs are not distributed through app stores in the traditional sense. However, there is a technology called TWA (Trusted Web Activity) that wraps a PWA in a native Android shell for Google Play Store distribution. TWA enables a PWA to be listed in the Play Store as a native app (it passes Google Play Store review as long as it meets PWA quality criteria) and downloaded from the Play Store like a native app. This approach provides Play Store discoverability without duplicating the PWA codebase. Apple does not have an equivalent mechanism for App Store distribution of PWAs. We implement TWA as part of PWA deployments where Play Store presence is commercially valuable.",
    },
    {
      q: "How do I get started?",
      a: "Book a free PWA consultation. We review your current website's technical stack, your mobile web audience data, the specific PWA capabilities that would generate the most commercial value for your business, and your timeline and budget. We provide a scope estimate and a specific recommendation for the PWA approach most appropriate for your requirements. No commitment required at the consultation stage.",
    },
  ],
  cta: {
    title: "Ready to Give Your Web Audience an App-Like Experience?",
    description:
      "Your mobile web audience is larger than your native app audience. It always will be  because the installation friction of a native app filters out the majority of users who would otherwise engage more deeply with your product.\n\nA well-built PWA captures that engagement gap: lower friction than a native app, higher engagement than mobile web, and the push notification channel that mobile web has never had.",
    contactLink: "https://clickmastersdigitalmarketing.com/contact",
    whatsappLink: "https://wa.me/",
    softwareLink: "https://clickmastersdigitalmarketing.com/mobile-app-development/",
  },
  footer: {
    company: "Clickmasters Digital Marketing",
    url: "https://clickmastersdigitalmarketing.com",
    email: "marketing@clickmastersdigitalmarketing.com",
    regions: "USA, UK, UAE, Pakistan, Canada, Australia",
    author: "Amjad Khan  CEO, Clickmasters Digital Marketing | PWA development specialist | 10+ years",
  },schema: {
  Service: {
    serviceType: "PWA Development",
    provider: {
      name: "Clickmasters Digital Marketing",
      url: "https://clickmastersdigitalmarketing.com",
      logo: "https://clickmastersdigitalmarketing.com/logo.png"
    },
    areaServed: ["US", "UK", "UAE", "PK"]
  },

  FAQPage: {
    items: [
      "What exactly is a Progressive Web App?",
      "Are PWAs supported on iOS?",
      "How does a PWA differ from a native app?",
      "Can a PWA send push notifications?",
      "How much does PWA development cost?",
      "How long does PWA development take?",
      "Can a PWA appear in the App Store or Google Play?",
      "How do I get started?"
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
        name: "App & Software Development",
        url: "https://clickmastersdigitalmarketing.com/app-software-development/"
      },
      {
        position: 3,
        name: "PWA Development",
        url: "https://clickmastersdigitalmarketing.com/pwa-development-services/"
      }
    ]
  }
}
};