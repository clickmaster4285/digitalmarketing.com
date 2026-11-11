import { Metadata, ResolvingMetadata } from "next";
import { SERVICE_PAGE_SLUGS } from "@/content/services/servicePageSlugs";
import { cmsPageMetadata, getCmsPage } from "@/lib/cms";
import { isMainServiceSlug } from "@/content/locations/serviceLocations";
import { createServiceMetadataRegistry } from "@/lib/serviceMetadata";
import { getCanonicalServicePath } from "@/content/services/serviceCategories";

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
import { CitationBuildingServicesContent } from "@/content/services/CitationBuildingServices";
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
import { AdaComplianceContent } from "@/content/services/AdaComplianceContent";
import { CustomSoftwareContent } from "@/content/services/CustomSoftwareContent";
import { applyEditedPageSeo } from "@/lib/pageEdits.server";

// Content registry - must match page.tsx
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
  "citation-building": CitationBuildingServicesContent,
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
  "custom-software-development": CustomSoftwareContent,
  "ada-compliance-web-accessibility": AdaComplianceContent,
};

const serviceMetadataRegistry = createServiceMetadataRegistry(contentRegistry);

async function baseMetadata(
  { params }: { params: Promise<{ services: string; cmsSlug: string[] }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { services, cmsSlug } = await params;
  const slug = cmsSlug.length === 1 ? cmsSlug[0] : null;
  const isCodeDefinedService = isMainServiceSlug(services);
  const content =
    isCodeDefinedService && slug ? contentRegistry[slug] : undefined;

  if (content && slug) {
    const BASE_URL = "https://clickmastersdigitalmarketing.com";
    const canonicalUrl = `${BASE_URL}${getCanonicalServicePath(slug) ?? `/${services}/${slug}`}`;
    return {
      ...serviceMetadataRegistry[slug],
      alternates: { canonical: canonicalUrl },
    };
  }

  if (
    !isCodeDefinedService ||
    !slug ||
    !SERVICE_PAGE_SLUGS.has(slug)
  ) {
    const page = await getCmsPage([services, ...cmsSlug]);
    if (page) return cmsPageMetadata(page);
  }

  if (!content || !content.metadata) {
    return {
      title: "Clickmasters Digital Marketing",
      description:
        "Digital marketing services and growth solutions from Clickmasters Digital Marketing.",
    };
  }

  return {};
}

export async function generateMetadata(
  props: { params: Promise<{ services: string; cmsSlug: string[] }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { services, cmsSlug } = await props.params;
  return applyEditedPageSeo(
    `/${[services, ...cmsSlug].join("/")}`,
    await baseMetadata(props, parent),
  );
}

export default function SubServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
