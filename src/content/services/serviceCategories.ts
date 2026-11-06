import {
  BarChart3,
  BadgeCheck,
  BookOpen,
  Bot,
  Boxes,
  Brain,
  Braces,
  Building2,
  Calculator,
  Cloud,
  Code2,
  Cpu,
  Database,
  FileText,
  Flag,
  Gauge,
  GitBranch,
  Image as ImageIcon,
  KeyRound,
  Layers,
  Layers3,
  Link,
  Link2,
  Linkedin,
  Mail,
  MapPin,
  Megaphone,
  MessageSquare,
  Mic,
  Network,
  Package,
  Palette,
  PenTool,
  Plug,
  Radio,
  Repeat,
  Search,
  Settings,
  ShieldAlert,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Star,
  Store,
  TrendingUp,
  Users,
  Video,
  Workflow,
  Wrench,
  Youtube,
  type LucideIcon,
} from "lucide-react";

export interface ServiceCategoryItem {
  name: string;
  desc: string;
  icon: LucideIcon;
  href: string;
}

export interface ServiceCategory {
  title: string;
  href: string;
  items: ServiceCategoryItem[];
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    title: "Seo Services",
    href: "/search-engine-optimization",
    items: [
      { name: "On-Page SEO", desc: "Optimize content & structure", icon: FileText, href: "/search-engine-optimization/on-page-seo" },
      { name: "Off-Page SEO & Link Building", desc: "Authority-building backlinks", icon: Link, href: "/search-engine-optimization/off-page-seo-link-building" },
      { name: "Technical SEO", desc: "Improve crawlability & speed", icon: Settings, href: "/search-engine-optimization/technical-seo" },
      { name: "Local SEO", desc: "Rank higher locally", icon: MapPin, href: "/search-engine-optimization/local-seo" },
      { name: "Enterprise SEO", desc: "SEO for large websites", icon: Building2, href: "/search-engine-optimization/enterprise-seo" },
      { name: "Ecommerce SEO", desc: "Drive online store sales", icon: ShoppingCart, href: "/search-engine-optimization/ecommerce-seo" },
      { name: "AI SEO", desc: "AI-powered optimization", icon: Bot, href: "/search-engine-optimization/ai-seo" },
      { name: "YouTube SEO", desc: "Grow video rankings", icon: Youtube, href: "/search-engine-optimization/youtube-seo" },
      { name: "SEO Audit", desc: "Comprehensive SEO analysis", icon: Search, href: "/search-engine-optimization/seo-audit" },
      { name: "SEO Automation", desc: "Automate SEO workflows", icon: Cpu, href: "/search-engine-optimization/seo-automation" },
      { name: "Keyword Research", desc: "Find profitable keywords", icon: KeyRound, href: "/search-engine-optimization/keyword-research" },
      { name: "Google Penalty Recovery", desc: "Recover lost rankings", icon: ShieldAlert, href: "/search-engine-optimization/google-penalty-recovery" },
      { name: "Schema Markup", desc: "Structured data implementation", icon: Braces, href: "/search-engine-optimization/schema-markup" },
      { name: "Voice Search Optimization", desc: "Optimize for voice queries", icon: Mic, href: "/search-engine-optimization/voice-search-optimization" },
      { name: "White Label SEO", desc: "SEO services for agencies", icon: BadgeCheck, href: "/search-engine-optimization/white-label-seo" },
      { name: "SEO Glossary", desc: "SEO terms & definitions", icon: BookOpen, href: "/search-engine-optimization/seo-glossary" },
      { name: "SEO Services USA", desc: "SEO solutions across the USA", icon: Flag, href: "/search-engine-optimization/locations/seo-services-usa" },
    ],
  },
  {
    title: "Pay Per Click",
    href: "/pay-per-click",
    items: [
      { name: "PPC Management", desc: "Full PPC campaigns", icon: TrendingUp, href: "/pay-per-click/ppc-management" },
      { name: "Google Ads Management", desc: "Google Ads experts", icon: Search, href: "/pay-per-click/google-ads-management" },
      { name: "Facebook & Instagram Ads", desc: "Meta advertising", icon: Megaphone, href: "/pay-per-click/facebook-instagram-ads" },
      { name: "LinkedIn Ads Management", desc: "B2B lead generation", icon: Linkedin, href: "/pay-per-click/linkedin-ads-management" },
      { name: "YouTube Ads Management", desc: "Video advertising", icon: Youtube, href: "/pay-per-click/youtube-ads-management" },
      { name: "Remarketing & Retargeting", desc: "Re-engage visitors", icon: Repeat, href: "/pay-per-click/remarketing-retargeting" },
      { name: "Marketing Attribution", desc: "Track conversions", icon: BarChart3, href: "/pay-per-click/marketing-attribution" },
    ],
  },
  {
    title: "Social Media Marketing",
    href: "/social-media-marketing",
    items: [
      { name: "Social Media Content", desc: "Content creation", icon: PenTool, href: "/social-media-marketing/social-media-content-creation" },
      { name: "Social Media Strategy", desc: "Growth planning", icon: BarChart3, href: "/social-media-marketing/social-media-strategy-consulting" },
      { name: "TikTok Shop Management", desc: "TikTok commerce", icon: ShoppingBag, href: "/social-media-marketing/tiktok-shop-management" },
      { name: "YouTube SEO", desc: "Video optimization", icon: Youtube, href: "/search-engine-optimization/youtube-seo" },
      { name: "Influencer Marketing", desc: "Creator partnerships", icon: Users, href: "/social-media-marketing/influencer-marketing" },
      { name: "Podcast Marketing", desc: "Podcast growth", icon: Mic, href: "/social-media-marketing/podcast-marketing" },
      { name: "Podcast Production", desc: "Podcast creation", icon: Radio, href: "/social-media-marketing/podcast-production" },
    ],
  },
  {
    title: "Mobile App Development",
    href: "/mobile-app-development",
    items: [
      { name: "iOS App Development", desc: "Native iPhone apps", icon: Smartphone, href: "/mobile-app-development/ios-app-development" },
      { name: "Android App Development", desc: "Native Android apps", icon: Smartphone, href: "/mobile-app-development/android-app-development" },
      { name: "React Native Development", desc: "Cross-platform apps", icon: Layers, href: "/mobile-app-development/react-native-development" },
      { name: "Flutter App Development", desc: "Flutter applications", icon: Smartphone, href: "/mobile-app-development/flutter-app-development" },
    ],
  },
  {
    title: "CRO",
    href: "/conversion-rate-optimization",
    items: [
      { name: "Online Reputation Management", desc: "Protect your brand", icon: Star, href: "/conversion-rate-optimization/online-reputation-management" },
      { name: "Branding & Identity", desc: "Build your brand", icon: Sparkles, href: "/conversion-rate-optimization/branding-identity" },
      { name: "Data Analytics & Reporting", desc: "Actionable insights", icon: Database, href: "/conversion-rate-optimization/data-analytics-reporting" },
      { name: "ROI Calculator", desc: "Measure returns", icon: Calculator, href: "/conversion-rate-optimization/roi-calculator" },
    ],
  },
  {
    title: "Content Marketing",
    href: "/content-marketing",
    items: [
      { name: "Email Marketing", desc: "Convert subscribers", icon: Mail, href: "/content-marketing/email-marketing" },
      { name: "Video Marketing", desc: "Engaging video campaigns", icon: Video, href: "/content-marketing/video-marketing" },
      { name: "Infographic Design", desc: "Visual storytelling", icon: ImageIcon, href: "/content-marketing/infographic-design" },
      { name: "White Paper Writing", desc: "Authority content", icon: FileText, href: "/content-marketing/white-paper-writing" },
      { name: "Case Study Writing", desc: "Showcase results", icon: BookOpen, href: "/content-marketing/case-study-writing" },
      { name: "Guest Posting", desc: "Build authority", icon: Link2, href: "/content-marketing/guest-posting" },
      { name: "Newsletter", desc: "Audience engagement", icon: Mail, href: "/content-marketing/newsletter" },
      { name: "PR & Media Outreach", desc: "Earn media coverage", icon: Radio, href: "/content-marketing/pr-media-outreach" },
      { name: "Citation Building", desc: "Local citations", icon: MapPin, href: "/content-marketing/citation-building" },
    ],
  },
  {
    title: "Ecommerce",
    href: "/ecommerce-services",
    items: [
      { name: "Ecommerce Marketing", desc: "Drive sales", icon: Megaphone, href: "/ecommerce-services/ecommerce-marketing" },
      { name: "Ecommerce Analytics", desc: "Track performance", icon: BarChart3, href: "/ecommerce-services/ecommerce-analytics" },
      { name: "Shopify Development", desc: "Custom Shopify stores", icon: Store, href: "/ecommerce-services/shopify-development" },
      { name: "Shopify Marketing", desc: "Grow Shopify revenue", icon: TrendingUp, href: "/ecommerce-services/shopify-marketing" },
      { name: "Magento Development", desc: "Enterprise ecommerce", icon: Package, href: "/ecommerce-services/magento-development" },
      { name: "WooCommerce Development", desc: "WordPress ecommerce", icon: ShoppingBag, href: "/ecommerce-services/woocommerce-development" },
      { name: "WooCommerce Marketing", desc: "WooCommerce growth", icon: TrendingUp, href: "/ecommerce-services/woocommerce-marketing" },
      { name: "BigCommerce Marketing", desc: "Scale BigCommerce stores", icon: Store, href: "/ecommerce-services/bigcommerce-marketing" },
      { name: "Amazon FBA Marketing", desc: "FBA growth", icon: Package, href: "/ecommerce-services/amazon-fba-marketing" },
      { name: "Amazon Marketing", desc: "Marketplace growth", icon: Package, href: "/ecommerce-services/amazon-marketing" },
    ],
  },
  {
    title: "AI Automation",
    href: "/ai-automation",
    items: [
      { name: "AI Content Generation", desc: "Generate content with AI", icon: Bot, href: "/ai-automation/ai-content-generation" },
      { name: "AI Marketing", desc: "AI-powered marketing", icon: Sparkles, href: "/ai-automation/ai-marketing" },
      { name: "AI / ML Development", desc: "Custom AI solutions", icon: Brain, href: "/ai-automation/ai-ml-development" },
      { name: "AI Personalization", desc: "Personalized experiences", icon: Users, href: "/ai-automation/ai-personalization" },
      { name: "Chatbot Development", desc: "AI assistants", icon: MessageSquare, href: "/ai-automation/chatbot-development" },
      { name: "Marketing Automation", desc: "Automated campaigns", icon: Workflow, href: "/ai-automation/marketing-automation" },
      { name: "Predictive Analytics", desc: "Forecast customer behavior", icon: BarChart3, href: "/ai-automation/predictive-analytics" },
      { name: "Data Analytics & Reporting", desc: "Business intelligence", icon: Database, href: "/conversion-rate-optimization/data-analytics-reporting" },
      { name: "API Development & Integration", desc: "Connect systems", icon: Plug, href: "/ai-automation/api-development-integration" },
      { name: "CRM Integration", desc: "Customer data integration", icon: Network, href: "/ai-automation/crm-integration" },
      { name: "Custom Software Development", desc: "Tailored applications", icon: Boxes, href: "/ai-automation/custom-software-development" },
      { name: "DevOps", desc: "CI/CD & automation", icon: GitBranch, href: "/ai-automation/devops" },
      { name: "Cloud Solutions", desc: "Scalable infrastructure", icon: Cloud, href: "/ai-automation/cloud-solutions" },
      { name: "IoT Development", desc: "Connected devices", icon: Cpu, href: "/ai-automation/iot-development" },
      { name: "AR / VR Development", desc: "Immersive experiences", icon: Layers, href: "/ai-automation/ar-vr-development" },
      { name: "Blockchain Development", desc: "Decentralized solutions", icon: ShieldCheck, href: "/ai-automation/blockchain-development" },
    ],
  },
  {
    title: "Web Design & Development",
    href: "/web-design-development",
    items: [
      { name: "Web Design", desc: "Modern websites", icon: Palette, href: "/web-design-development/web-design" },
      { name: "Web Development", desc: "Custom websites", icon: Code2, href: "/web-design-development/web-development" },
      { name: "Web Application Development", desc: "Custom web apps", icon: Layers3, href: "/web-design-development/web-application-development" },
      { name: "Landing Page Design", desc: "Conversion-focused pages", icon: PenTool, href: "/web-design-development/landing-page-design" },
      { name: "UI / UX Design", desc: "User-centered design", icon: Layers3, href: "/web-design-development/ui-ux-design" },
      { name: "Logo Design", desc: "Brand identity", icon: Sparkles, href: "/web-design-development/logo-design" },
      { name: "Graphic Design", desc: "Creative assets", icon: ImageIcon, href: "/web-design-development/graphic-design" },
      { name: "PWA Development", desc: "Progressive web apps", icon: Smartphone, href: "/web-design-development/pwa-development" },
      { name: "Headless Commerce", desc: "Modern ecommerce architecture", icon: Store, href: "/web-design-development/headless-commerce-development" },
      { name: "Website Speed Optimization", desc: "Improve performance", icon: Gauge, href: "/web-design-development/website-speed-optimization" },
      { name: "Website Maintenance", desc: "Ongoing support", icon: Wrench, href: "/web-design-development/website-maintenance" },
      { name: "ADA Compliance", desc: "Accessibility compliance", icon: ShieldCheck, href: "/web-design-development/ada-compliance-web-accessibility" },
    ],
  },
];

/**
 * Canonical path for each service slug: the first category that lists it.
 * A service reachable under several parents is served only at this path.
 */
const canonicalServicePaths = new Map<string, string>();
for (const category of SERVICE_CATEGORIES) {
  for (const item of category.items) {
    const slug = item.href.split("/").filter(Boolean).pop();
    if (slug && !canonicalServicePaths.has(slug)) {
      canonicalServicePaths.set(slug, item.href);
    }
  }
}

export const getCanonicalServicePath = (slug: string): string | undefined =>
  canonicalServicePaths.get(slug);

/** Every published service URL: category hubs plus each listed service. */
export const getAllServicePaths = (): string[] =>
  Array.from(
    new Set(
      SERVICE_CATEGORIES.flatMap((category) => [
        category.href,
        ...category.items.map((item) => item.href),
      ]),
    ),
  );
