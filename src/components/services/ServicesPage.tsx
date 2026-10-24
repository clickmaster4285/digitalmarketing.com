"use client";

import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

import {
  Code2, Gauge, ShieldCheck, Plug, Search, Server, ShoppingBag, Layers,
  Rocket, ArrowUpRight, Check, Cpu, Database, Globe, Sparkles,
  Beaker, Network, TrendingUp, Zap, RefreshCw, MessageSquare,
  Camera, FileText, GitBranch, Target, BarChart3, Shuffle, Eye,
  TrendingDown, PieChart, FileEdit, Mail, ShoppingCart, Megaphone, Smartphone,
} from "lucide-react";

// Import all content files
import { AiMlDevContent } from "@/content/services/AiMlDev";
import { AiPersonalizationContent } from "@/content/services/AiPersonalization";
import { DataAnalyticsReportingContent } from "@/content/services/DataAnalyticsReporting";
import { MarketingAttributionContent } from "@/content/services/MarketingAttribution";
import { MarketingAutomationContent } from "@/content/services/MarketingAutomation";
import { AiAutomationContent } from "@/content/services/AiAutomation";
import { WebDesignContent } from "@/content/services/WebDesign";
import { InfographicDesignContent } from "@/content/services/InfographicDesign";
import { LandingPageDesignContent } from "@/content/services/LandingPageDesign";
import { UIUXDesignContent } from "@/content/services/UIUXDesign";
import { GraphicDesignContent } from "@/content/services/GraphicDesign";
import { LogoDesignContent } from "@/content/services/LogoDesign";
import { CitationBuildingServicesContent  } from "@/content/services/CitationBuildingServices";
import { VoiceSearchOptimizationContent } from "@/content/services/VoiceSearchOptimization";
import { SchemaMarkupContent } from "@/content/services/SchemaMarkup";
import { WhiteLabelSeoContent } from "@/content/services/WhiteLabelSeo";

import { OnPageSeoContent } from "@/content/services/OnPageSeo";
import { OffPageSeoContent } from "@/content/services/OffPageSeo";



import { SeoServicesUsaContent } from "@/content/services/SeoServicesUsa";
import { EcommerceSeoContent } from "@/content/services/EcommerceSeo";
import { YoutubeSeoContent } from "@/content/services/YoutubeSeo";
import { SeoAutomationContent } from "@/content/services/SeoAutomation";
import { SeoGlossaryContent } from "@/content/services/SeoGlossary";
import { SocialMediaStrategyContent } from "@/content/services/SocialMediaStrategy";

import { ConversionRateOptimizationContent, SocialMediaMarketingContent } from "@/content/services/main-services";
import { EmailMarketingServicesContent } from "@/content/services/EmailMarketing";
import { EcommerceMarketingServicesContent } from "@/content/services/EcommerceMarketing";
import { AmazonMarketingServicesContent } from "@/content/services/AmazonMarketing";
import { OnlineReputationManagementContent } from "@/content/services/OnlineReputation";
import { PodcastMarketingServicesContent } from "@/content/services/PodcastMarketingServices";
import { PpcManagementContent } from "@/content/services/PpcManagement";
import { LinkedInAdsContent } from "@/content/services/LinkedInAds";
import { ContentMarketingContent } from "@/content/services/ContentMarketing";
import { AmazonFbaMarketingContent } from "@/content/services/AmazonFbaMarketing";
import { RemarketingRetargetingContent } from "@/content/services/RemarketingRetargeting";
import { PrMediaOutreachContent } from "@/content/services/PrMediaOutreach";
import { SocialMediaContentCreationContent } from "@/content/services/SocialMediaContentCreation";
import { NewsletterContent } from "@/content/services/Newsletter";
import { ClickPOSContent } from "@/content/services/ClickPOSContent";
import { ClickCareHMSContent } from "@/content/services/ClickCareHMS";
import { TestimonialsContent } from "@/content/services/TestimonialsContent";
import { WhitePaperWritingServicesContent } from "@/content/services/WhitePaper";
import { CareersContent } from "@/content/services/CareersContent";
import { OurTeamContent } from "@/content/services/OurTeam";
import { CaseStudyWritingContent } from "@/content/services/CaseStudyWriting";
import { AboutUsContent } from "@/content/services/AboutUs";
import { BlogContent } from "@/content/services/BlogContent";
import { DigitalMarketingGlossaryContent } from "@/content/services/DigitalMarketingGlossary";
import { ClickGrowthSystemContent } from "@/content/services/ClickGrowthSystem";
import { RealEstateMarketingContent } from "@/content/services/RealEstateMarketing";
import { SaasMarketingContent } from "@/content/services/SaasMarketing";
import { LocalSeoContent } from "@/content/services/LocalSeo";
import { GuestPostingContent } from "@/content/services/GuestPosting";
import { WebDevelopmentContent } from "@/content/services/WebDevelopment";
import { WebAppContent } from "@/content/services/WebAppContent";
import { TechnicalSeoContent } from "@/content/services/Technicalseocontent";
import { EnterpriseSeoContent } from "@/content/services/Enterpriseseocontent";
import { AiSeoContent } from "@/content/services/Aiseocontent";
import { SeoAuditContent } from "@/content/services/SeoAuditContent";
import { KeywordResearchContent } from "@/content/services/KeywordResearchContent";
import { GooglePenaltyRecoveryContent } from "@/content/services/GooglePenaltyRecoveryContent";
import { GoogleAdsManagementContent } from "@/content/services/GoogleAdsManagementContent";
import { FacebookInstagramAdsContent } from "@/content/services/FacebookInstagramAdsContent";
import { YoutubeAdsManagementContent } from "@/content/services/YoutubeAdsManagementContent";
import { PodcastProductionContent } from "@/content/services/PodcastProductionContent";
import { InfluencerMarketingContent } from "@/content/services/InfluencerMarketingContent";
import { TikTokShopManagementContent } from "@/content/services/TikTokShopManagementContent";
import { IosAppDevelopmentContent } from "@/content/services/IosAppDevelopmentContent";
import { AndroidAppDevelopmentContent } from "@/content/services/AndroidAppDevelopmentContent";
import { ReactNativeDevelopmentContent } from "@/content/services/ReactNativeDevelopmentContent";
import { FlutterAppDevelopmentContent } from "@/content/services/FlutterAppDevelopmentContent";
import { BrandingIdentityContent } from "@/content/services/BrandingIdentityContent";
import { RoiCalculatorContent } from "@/content/services/RoiCalculatorContent";
import { VideoMarketingContent } from "@/content/services/VideoMarketingContent";
import { EcommerceDevContent } from "@/content/services/EcommerceDevelopment";
import { ShopifyDevelopmentContent } from "@/content/services/ShopifyDevelopment";
import { WooCommerceDevelopmentContent } from "@/content/services/WooCommerceDevelopment";
import { ShopifyMarketingContent } from "@/content/services/Shopifymarketingcontent";
import { WoocommerceMarketingContent } from "@/content/services/Woocommercemarketingcontent";
import { EcommerceAnalyticsContent } from "@/content/services/Ecommerceanalyticscontent";
import { MagentoDevContent } from "@/content/services/Magentodevcontent";
import { BigCommerceMarketingContent } from "@/content/services/BigcommerceMarketingContent";
import { AiContentGenerationContent } from "@/content/services/AiContentGenerationContent";
import { AiMarketingServicesContent } from "@/content/services/AiMarketingServicesContent";
import { ChatbotDevelopmentContent } from "@/content/services/ChatbotDevelopmentContent";
import { PredictiveAnalyticsContent } from "@/content/services/PredictiveAnalyticsContent";
import { ApiDevelopmentContent } from "@/content/services/ApiDevelopmentContent";
import { CrmIntegrationContent } from "@/content/services/CrmIntegrationContent";
import { DevopsServicesContent } from "@/content/services/DevopsServicesContent";
import { CloudSolutionsContent } from "@/content/services/CloudSolutionsContent";
import { IotDevelopmentContent } from "@/content/services/IotDevelopmentContent";
import { ArVrDevelopmentContent } from "@/content/services/ArVrDevelopmentContent";
import { BlockchainDevelopmentContent } from "@/content/services/BlockchainDevelopmentContent";
import { WebsiteSpeedOptimisationContent } from "@/content/services/WebsiteSpeedOptimisationContent";
import { PwaDevelopmentContent } from "@/content/services/PwaDevelopmentContent";
import { HeadlessCommerceContent } from "@/content/services/HeadlessCommerceContent";
import { WebsiteMaintenanceContent } from "@/content/services/WebsiteMaintenanceContent";
import { CustomSoftwareContent } from "@/content/services/CustomSoftwareContent";
import { AdaComplianceContent } from "@/content/services/AdaComplianceContent";
import SchemaMarkup from "@/components/landingPage/SchemaMarkup";

const routedPageRegistry: Record<string, any> = {};

// Content registry - add new pages here
const contentRegistry: Record<string, any> = {
  "web-development": WebDevelopmentContent,
  "web-application-development": WebAppContent,
  "ai-ml-development": AiMlDevContent,
  "ai-personalization": AiPersonalizationContent,
  "data-analytics-reporting": DataAnalyticsReportingContent, 
  "marketing-attribution": MarketingAttributionContent,
    "marketing-automation": MarketingAutomationContent,
  "ai-automation": AiAutomationContent,

  "web-design": WebDesignContent, 
    "ui-ux-design": UIUXDesignContent,
  "graphic-design": GraphicDesignContent,
  "logo-design": LogoDesignContent,
  "landing-page-design": LandingPageDesignContent,
  "infographic-design": InfographicDesignContent, 



  "seo-services-usa": SeoServicesUsaContent,
  "ecommerce-seo": EcommerceSeoContent,
  "youtube-seo": YoutubeSeoContent,
      "seo-audit": SeoAuditContent,

  "on-page-seo": OnPageSeoContent,
  "off-page-seo-link-building": OffPageSeoContent,
  "technical-seo": TechnicalSeoContent,

"keyword-research": KeywordResearchContent,
"enterprise-seo": EnterpriseSeoContent,
  "ai-seo": AiSeoContent,

   "white-label-seo": WhiteLabelSeoContent, 
"schema-markup": SchemaMarkupContent,  
  "voice-search-optimization": VoiceSearchOptimizationContent, 
  "seo-automation": SeoAutomationContent,
  "citation-building": CitationBuildingServicesContent ,
  "local-seo": LocalSeoContent,
  "guest-posting": GuestPostingContent,
    "seo-glossary": SeoGlossaryContent,
  
"google-penalty-recovery": GooglePenaltyRecoveryContent,
    "social-media-marketing": SocialMediaMarketingContent,
    "social-media-strategy-consulting": SocialMediaStrategyContent,

  "social-media-content-creation": SocialMediaContentCreationContent,
     
    "email-marketing": EmailMarketingServicesContent,
  "ecommerce-marketing": EcommerceMarketingServicesContent,
  "amazon-marketing": AmazonMarketingServicesContent,
  "online-reputation-management": OnlineReputationManagementContent,
  "podcast-marketing": PodcastMarketingServicesContent,
 "ppc-management": PpcManagementContent,
  "linkedin-ads-management": LinkedInAdsContent,
  "content-marketing": ContentMarketingContent,
  "amazon-fba-marketing": AmazonFbaMarketingContent,
  "remarketing-retargeting": RemarketingRetargetingContent,
    "pr-media-outreach": PrMediaOutreachContent,
   "newsletter": NewsletterContent,
    
 "about-us": AboutUsContent,
     "our-team": OurTeamContent,
  "careers": CareersContent,
  "case-study-writing": CaseStudyWritingContent,
     "blog": BlogContent,
  "white-paper-writing": WhitePaperWritingServicesContent,
  "testimonials": TestimonialsContent,
     "digital-marketing-glossary": DigitalMarketingGlossaryContent,
 "clickcare-hms": ClickCareHMSContent,
  "click-growth-system": ClickGrowthSystemContent,
  "clickpos": ClickPOSContent,


  "industries-saas": SaasMarketingContent, 
  "real-estate-marketing": RealEstateMarketingContent,



  "google-ads-management": GoogleAdsManagementContent,
  "facebook-instagram-ads": FacebookInstagramAdsContent,
  "youtube-ads-management": YoutubeAdsManagementContent, 

  "podcast-production": PodcastProductionContent,
  "influencer-marketing": InfluencerMarketingContent,
  "tiktok-shop-management": TikTokShopManagementContent,
  "ios-app-development": IosAppDevelopmentContent,
  "android-app-development": AndroidAppDevelopmentContent,
  "react-native-development": ReactNativeDevelopmentContent,
  "flutter-app-development": FlutterAppDevelopmentContent,

  "cro-services": ConversionRateOptimizationContent,
  "branding-identity": BrandingIdentityContent,
  "roi-calculator": RoiCalculatorContent,

  "video-marketing": VideoMarketingContent,
  "ecommerce-development": EcommerceDevContent,
  "shopify-development": ShopifyDevelopmentContent,
  "woocommerce-development": WooCommerceDevelopmentContent,
  "shopify-marketing": ShopifyMarketingContent,
  "woocommerce-marketing": WoocommerceMarketingContent,
  "ecommerce-analytics": EcommerceAnalyticsContent,

  "magento-development": MagentoDevContent,
  "bigcommerce-marketing": BigCommerceMarketingContent,
  "ai-content-generation": AiContentGenerationContent,
  "ai-marketing": AiMarketingServicesContent,
  "chatbot-development": ChatbotDevelopmentContent,
  "predictive-analytics": PredictiveAnalyticsContent,
  "api-development-integration": ApiDevelopmentContent,
  "crm-integration": CrmIntegrationContent,
  "devops": DevopsServicesContent,
  "cloud-solutions": CloudSolutionsContent,
  "iot-development": IotDevelopmentContent,
  "ar-vr-development": ArVrDevelopmentContent,
  "blockchain-development": BlockchainDevelopmentContent,
  "website-speed-optimization": WebsiteSpeedOptimisationContent,
  "pwa-development": PwaDevelopmentContent,
  "headless-commerce-development": HeadlessCommerceContent,
  "website-maintenance": WebsiteMaintenanceContent,
  "website-maintenance-services": WebsiteMaintenanceContent,
  "custom-software-development": CustomSoftwareContent,
  "ada-compliance-web-accessibility":AdaComplianceContent,
};

// 404 content for unknown slugs
const notFoundContent = {
  hero: {
    tag: "[ Error 404 ]",
    title: "Service Not",
    titleHighlight: "Found",
    subtitle: " the page you're looking for doesn't exist.",
    description: "Please check the URL or contact us for more information about our services.",
    stats: [
      { k: "404", v: "Page not found" },
      { k: "0", v: "Results" },
    ],
  },
  // ... minimal structure to prevent errors
  intro: { problem: "", solution: "", promise: "" },
  problem: { title: "", titleHighlight: "", items: [], afterTitle: "", afterHighlight: "", afterItems: [] },
  services: [],
  cases: [],
  why: [],
  faqs: [],
  cta: { title: "", description: "", contactLink: "#", whatsappLink: "#" },
  footer: { company: "", url: "", email: "", regions: "", author: "" },
};

/* ---------- Reusable bits ---------- */

const Reveal = ({ children, delay = 0, y = 30 }: any) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const SectionLabel = ({ n, t }: { n: string; t: string }) => (
  <div className="flex items-center gap-3 mb-6">
    <span className="text-[10px] uppercase tracking-[0.4em] opacity-60">[ {n} ]</span>
    <span className="h-px w-10 bg-foreground/30" />
    <span className="text-[10px] uppercase tracking-[0.4em] opacity-60">{t}</span>
  </div>
);

const getIcon = (iconName: string) => {
  const icons: Record<string, any> = {
    Beaker, Database, Network, TrendingUp, Zap, RefreshCw,
    Cpu, MessageSquare, Camera, FileText, GitBranch, Target,
    BarChart3, Shuffle, Eye, Rocket, TrendingDown, PieChart, 
    FileEdit, Mail, ShoppingCart, Megaphone, Smartphone, Globe,
  };
  const Icon = icons[iconName] || Cpu;
  return Icon;
};

/* ---------- HERO with parallax ---------- */

const Hero = ({ content }: { content: any }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const heroContent = content.hero;

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-[#0a0a0a] text-white pt-32 pb-20">
      <motion.div
        aria-hidden
        style={{ y: y1, scale }}
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </motion.div>

      <motion.div
        aria-hidden
        style={{ y: y2 }}
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full blur-[180px] opacity-30"
      >
        <div className="w-full h-full rounded-full bg-[#FF2E86]" />
      </motion.div>

      <motion.div style={{ opacity }} className="container relative">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.4em] opacity-60 mb-6">
            {heroContent.tag}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="font-display text-5xl md:text-8xl font-bold leading-[0.95] tracking-tight">
            {heroContent.title} <br />
            <span className="text-[#FF2E86]">{heroContent.titleHighlight}</span>
            <br className="hidden md:block" /> {heroContent.subtitle}
          </h1>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-10 max-w-2xl text-lg md:text-xl opacity-70 leading-relaxed">
            {heroContent.description}
          </p>
        </Reveal>

        <Reveal delay={0.35}>
          <div className="mt-12 flex flex-wrap gap-4">
            <a
              href="/contact"
              className="group inline-flex items-center gap-3 bg-white text-black px-7 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:bg-[#FF2E86] hover:text-white transition-colors"
            >
              Free consultation
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#stack"
              className="inline-flex items-center gap-3 border border-white/20 px-7 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:border-white/60 transition-colors"
            >
              See our stack
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.5}>
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 pt-10">
            {heroContent.stats.map((s: any) => (
              <div key={s.v}>
                <p className="font-display text-3xl md:text-5xl">{s.k}</p>
                <p className="text-[10px] uppercase tracking-[0.3em] opacity-60 mt-2">{s.v}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </motion.div>
    </section>
  );
};

/* ---------- Intro / promise ---------- */

const Intro = ({ content }: { content: any }) => {
  const introContent = content.intro;

  // Helper for problem text (pink color)
  const renderProblemText = (text: any) => {
    if (!text) return null;
    if (Array.isArray(text)) {
      return text.map((part: any, idx: number) => (
        <span
          key={idx}
          className={part.type === "highlight" ? "text-[#FF2E86]" : ""}
        >
          {part.text}
        </span>
      ));
    }
    return text;
  };

  // Helper for solution & promise text (bold only)
  const renderBoldText = (text: any) => {
    if (!text) return null;
    if (Array.isArray(text)) {
      return text.map((part: any, idx: number) => (
        <span
          key={idx}
          className={part.type === "highlight" ? "font-bold" : ""}
        >
          {part.text}
        </span>
      ));
    }
    return text;
  };

  return (
    <section className="relative bg-background text-foreground py-10">
      <div className="container max-w-5xl">
        <SectionLabel n="02" t="The gap" />
        <Reveal>
          <p className="font-display text-3xl md:text-5xl leading-[1.15] tracking-tight">
            {renderProblemText(introContent.problem)}
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-10 text-lg opacity-70 max-w-3xl leading-relaxed">
            {renderBoldText(introContent.solution)}
          </p>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-6 text-lg opacity-70 max-w-3xl leading-relaxed">
            {renderBoldText(introContent.promise)}
          </p>
        </Reveal>
      </div>
    </section>
  );
};

/* ---------- Problem (parallax dark) ---------- */

const Problem = ({ content }: { content: any }) => {
  const problemContent = content.problem;

  // If no problem section OR no items, don't render a scroll-tracked section.
  if (!problemContent || !problemContent.items || problemContent.items.length === 0) {
    return null;
  }

  return <ProblemSection problemContent={problemContent} />;
};

const ProblemSection = ({ problemContent }: { problemContent: any }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const headlineX = useTransform(scrollYProgress, [0, 1],   [-30, 30]);

  return (
    <section ref={ref} className="relative bg-[#0a0a0a] text-white py-32 overflow-hidden">
      <motion.div
        aria-hidden
        style={{ y }}
        className="absolute inset-0 grid place-items-center pointer-events-none"
      >
        <span className="font-display text-[24vw] leading-none opacity-[0.04] tracking-tighter select-none">
          PROBLEM
        </span>
      </motion.div>

      <div className="container relative">
        <SectionLabel n="03" t="The problem" />
        <motion.h2
          style={{ x: headlineX }}
          className="font-display text-4xl md:text-7xl font-bold leading-[0.95] mb-20"
        >
          {problemContent.title}<br />
          <span className="text-[#FF2E86]">{problemContent.titleHighlight}</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6 mb-28">
          {problemContent.items.map((it: any, i: number) => {
            const Icon = getIcon(it.icon);
            return (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-8 hover:border-[#FF2E86]/40 transition-colors"
              >
                <Icon className="w-8 h-8 text-[#FF2E86] mb-6" />
                <h3 className="font-display text-2xl mb-4 leading-tight">{it.title}</h3>
                <p className="text-sm opacity-70 leading-relaxed">{it.body}</p>
              </motion.div>
            );
          })}
        </div>

        {/* After section - only if it exists */}
        {problemContent.afterItems && problemContent.afterItems.length > 0 && (
          <>
            <SectionLabel n="03.5" t="The after" />
            <motion.h2
              style={{ x: headlineX }}
              className="font-display text-4xl md:text-7xl font-bold leading-[0.95] mb-20"
            >
              {problemContent.afterTitle}<br />
              <span className="text-[#FF2E86]">{problemContent.afterHighlight}</span>
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-6">
              {problemContent.afterItems.map((it: any, i: number) => {
                const Icon = getIcon(it.icon);
                return (
                  <motion.div
                    key={it.title}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -6 }}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-8 hover:border-[#FF2E86]/40 transition-colors"
                  >
                    <Icon className="w-8 h-8 text-[#FF2E86] mb-6" />
                    <h3 className="font-display text-2xl mb-4 leading-tight">{it.title}</h3>
                    <p className="text-sm opacity-70 leading-relaxed">{it.body}</p>
                  </motion.div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

/* ---------- Services ---------- */

const ServicesGrid = ({ content }: { content: any }) => {
  const services = content.services;
  
  if (!services || services.length === 0) return null;

  return (
    <section id="stack" className="relative bg-background text-foreground py-32">
      <div className="container">
        <SectionLabel n="04" t="What we build" />
        <Reveal>
          <h2 className="font-display text-4xl md:text-7xl font-bold leading-[0.95] mb-20 tracking-tight">
            Our services<br />
            <span className="text-[#FF2E86]"> built to last.</span>
          </h2>
        </Reveal>

        <div className="space-y-24">
          {services.map((s: any, i: number) => {
            const Icon = getIcon(s.icon);
            const reverse = i % 2 === 1;
            return (
              <div
                key={s.n}
                className={`grid lg:grid-cols-12 gap-10 items-start ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}
              >
                <motion.div
                  initial={{ opacity: 0, x: reverse ? 60 : -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="lg:col-span-5 lg:sticky lg:top-32"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl border border-foreground/15 grid place-items-center bg-foreground/[0.03]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.4em] opacity-60">
                      [ {s.tag} · {s.n} ]
                    </span>
                  </div>
                  <h3 className="font-display text-3xl md:text-5xl leading-[1.05] tracking-tight mb-6">
                    {s.title}
                  </h3>
                  <p className="text-base md:text-lg opacity-70 leading-relaxed">{s.intro}</p>
                </motion.div>

                <div className="lg:col-span-7 space-y-4">
                  {s.blocks.map((b: any, j: number) => (
                    <motion.div
                      key={b.h}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ delay: j * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ y: -4 }}
                      className="group relative rounded-2xl border border-foreground/10 p-7 md:p-9 bg-foreground/[0.02] hover:border-[#FF2E86]/40 hover:bg-foreground/[0.04] transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <Check className="w-5 h-5 mt-1 text-[#FF2E86] shrink-0" />
                        <div>
                          <h4 className="font-display text-xl md:text-2xl mb-3">{b.h}</h4>
                          <p className="text-sm md:text-base opacity-70 leading-relaxed">{b.p}</p>
                        </div>
                      </div>
                      <ArrowUpRight className="absolute top-6 right-6 w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0 transition-all" />
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ---------- Case studies ---------- */

const Cases = ({ content }: { content: any }) => {
  const cases = content.cases;
  
  if (!cases || cases.length === 0) return null;

  return <CasesSection cases={cases} />;
};

const CasesSection = ({ cases }: { cases: any[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={ref} className="relative bg-[#0a0a0a] text-white py-32 overflow-hidden">
      <motion.div
        aria-hidden
        style={{ y }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[160px] opacity-25 bg-[#FF2E86] pointer-events-none"
      />
      <div className="container relative">
        <SectionLabel n="05" t="Client results" />
        <Reveal>
          <h2 className="font-display text-4xl md:text-7xl font-bold leading-[0.95] mb-20 tracking-tight">
            Client results<br /><span className="text-[#FF2E86]">in practice.</span>
          </h2>
        </Reveal>

        <div className="space-y-8">
          {cases.map((c: any, i: number) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="grid md:grid-cols-12 gap-8 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur p-8 md:p-12 hover:border-[#FF2E86]/40 transition-colors"
            >
              <div className="md:col-span-4">
                <p className="text-[10px] uppercase tracking-[0.4em] opacity-60 mb-4">[ {c.tag} ]</p>
                <p className="font-display text-5xl md:text-6xl text-[#FF2E86] leading-none">
                  {c.metric}
                </p>
                <p className="mt-3 text-sm opacity-70">{c.sub}</p>
              </div>
              <div className="md:col-span-8">
                <h3 className="font-display text-2xl md:text-4xl leading-[1.1] mb-5">{c.title}</h3>
                <p className="text-sm md:text-base opacity-70 leading-relaxed">{c.body}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- Why Clickmasters ---------- */

const Why = ({ content }: { content: any }) => {
  const why = content.why;

  if (!why || why.length === 0) return null;

  return (
    <section className="relative bg-background text-foreground py-32">
      <div className="container">
        <SectionLabel n="06" t="Why Clickmasters" />
        <Reveal>
          <h2 className="font-display text-4xl md:text-7xl font-bold leading-[0.95] mb-20 tracking-tight">
            Why teams choose us<br />
            <span className="text-[#FF2E86]">for their projects.</span>
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-6">
          {why?.map((w: any, i: number) => {
            const Icon = w.icon ? getIcon(w.icon) : null;
            return (
              <motion.div
                key={w.h}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-foreground/10 p-8 bg-foreground/[0.02] hover:border-[#FF2E86]/40 transition-colors"
              >
                {Icon && <Icon className="w-8 h-8 mb-5 text-[#FF2E86]" />}
                <h3 className="font-display text-2xl mb-3">{w.h}</h3>
                <p className="text-sm opacity-70 leading-relaxed">{w.p}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ---------- FAQs ---------- */

const Faqs = ({ content }: { content: any }) => {
  const faqs = content.faqs;
  
  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="relative bg-[#0a0a0a] text-white py-32">
      <div className="container max-w-4xl">
        <SectionLabel n="07" t="FAQs" />
        <Reveal>
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-[0.95] mb-16 tracking-tight">
            Frequently asked <span className="text-[#FF2E86]">questions.</span>
          </h2>
        </Reveal>
        <div className="space-y-3">
          {faqs.map((f: any, i: number) => (
            <motion.details
              key={f.q}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.5 }}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] open:border-[#FF2E86]/40 transition-colors"
            >
              <summary className="cursor-pointer list-none flex items-center justify-between gap-6 p-6 md:p-7">
                <span className="font-display text-lg md:text-xl pr-4">{f.q}</span>
                <span className="shrink-0 w-8 h-8 rounded-full border border-white/20 grid place-items-center text-base group-open:rotate-45 group-open:border-[#FF2E86] group-open:text-[#FF2E86] transition-all">
                  +
                </span>
              </summary>
              <div className="px-6 md:px-7 pb-7 -mt-1 text-sm md:text-base opacity-75 leading-relaxed max-w-3xl">
                {f.a}
              </div>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- Final CTA ---------- */

const CTA = ({ content }: { content: any }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1.05]), {
    stiffness: 60,
    damping: 22,
  });

  const ctaContent = content.cta;
  const footer = content.footer;

  return (
    <section
      id="contact"
      ref={ref}
      className="relative bg-background text-foreground py-32 overflow-hidden"
    >
      <motion.div
        aria-hidden
        style={{ y }}
        className="absolute inset-0 grid place-items-center pointer-events-none"
      >
        <span className="font-display text-[22vw] leading-none opacity-[0.04] tracking-tighter select-none">
          READY
        </span>
      </motion.div>

      <motion.div style={{ scale }} className="container relative max-w-5xl text-center">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.4em] opacity-60 mb-8">
            [ 08 ] Ready when you are
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl md:text-8xl font-bold leading-[0.95] tracking-tight">
            {ctaContent.title}
          </h2>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-10 text-lg md:text-xl opacity-70 max-w-2xl mx-auto leading-relaxed">
            {ctaContent.description}
          </p>
        </Reveal>
        <Reveal delay={0.35}>
          <div className="mt-12 flex flex-wrap gap-4 justify-center">
            <a
              href='/contact'
              className="group inline-flex items-center gap-3 bg-foreground text-background px-7 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:bg-[#FF2E86] hover:text-white transition-colors"
            >
              Get started
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            {/* <a
              href='/contact'
              className="inline-flex items-center gap-3 border border-foreground/20 px-7 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:border-foreground/60 transition-colors"
            >
              Talk to an expert
            </a> */}
          </div>
        </Reveal>
        <Reveal delay={0.5}>
          <p className="mt-16 text-xs uppercase tracking-[0.3em] opacity-50">
            {footer.company} · Serving {footer.regions}
          </p>
          <p className="mt-3 text-xs opacity-50">
            {footer.author}
          </p>
        </Reveal>
      </motion.div>
    </section>
  );
};

/* ---------- Main Page Component ---------- */

export default function ServicesPage() {
  const params = useParams();
  const slug = params?.slug as string;
  useSmoothScroll();

  const RoutedPage = routedPageRegistry[slug || ""];

  // Get content based on slug, fallback to 404
  const content = contentRegistry[slug || ""] || notFoundContent;
  const is404 = !contentRegistry[slug || ""];

  useEffect(() => {
    if (RoutedPage) return;

    if (!is404) {
      document.title = `${content.hero.title} ${content.hero.titleHighlight} | Clickmasters Digital Marketing`;
      const desc = content.hero.description.slice(0, 160);
      let m = document.querySelector('meta[name="description"]');
      if (!m) {
        m = document.createElement("meta");
        m.setAttribute("name", "description");
        document.head.appendChild(m);
      }
      m.setAttribute("content", desc);
    } else {
      document.title = "Service Not Found | Clickmasters Digital Marketing";
    }
  }, [slug, content, is404, RoutedPage]);

  if (RoutedPage) return <RoutedPage />;

  return (
    <div className="theme-light w-full overflow-x-clip bg-background text-foreground">
          <SchemaMarkup schema={content.schema} slug={slug} />
      <main>
        <Hero content={content} />
        <Intro content={content} />
        <Problem content={content} />
        <ServicesGrid content={content} />
        <Cases content={content} />
        <Why content={content} />
        <Faqs content={content} />
        <CTA content={content} />
          </main>
         
    </div>
  );
}
