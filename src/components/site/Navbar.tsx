"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  ShoppingBag, Youtube, Code2, Wrench, Palette, Search, Smartphone,
  LayoutGrid, PenTool, Megaphone, TrendingUp, Globe, ChevronDown,
  FileText, Mail, MapPin, Star, Link2, Mic, Radio, Building2,
  UtensilsCrossed, Hotel, Stethoscope, Scale, Sparkles, Users,
  BarChart3, Bot, Image as ImageIcon, Cpu, Tag, Store, Briefcase,
  Linkedin, Repeat, ScrollText, BookOpen, Brain, Headset, GraduationCap,
  DollarSign, Landmark, Car, Plug, ShieldCheck, Database, Boxes, Network,
  Rss, Info, Briefcase as BriefcaseIcon, Plane, Quote, Trophy, Heart,
  Package, Layers, Map, ExternalLink, Menu, X, ChevronRight,
  Link,
  Settings,
  Share2,
  ShoppingCart,
  Languages,
  Workflow,
  MapPinned,
  KeyRound,
  ShieldAlert,
  Braces,
  Flag,
  BadgeCheck,
  Layers3, Calculator, Video, LineChart, Cloud, GitBranch, MessageSquare, Gauge,
  Compass, Navigation, Target, Pin, Zap, Award, Map as MapIcon,
  Dumbbell, Pill, PawPrint, ScanLine, Home, Stethoscope as StethoscopeIcon,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";

import logoWhite from "@/assets/logo-white.webp";
import logoBlack from "@/assets/logo-black.webp";

type Service = { name: string; desc: string; icon: any; href?: string };

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const getServiceHref = (groupTitle: string, serviceHref?: string) => {
  if (!serviceHref || serviceHref.startsWith("#")) {
    return serviceHref ?? "#services";
  }

  // Full paths (e.g. /search-engine-optimization/on-page-seo) are already correct
  if (serviceHref.startsWith("/")) {
    return serviceHref;
  }

  const slug = serviceHref.replace(/^\/+|\/+$/g, "");

  const groupSlug = groupTitle.includes("&")
    ? groupTitle
        .toLowerCase()
        .replace(/&/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
    : slugify(groupTitle);

  return `/${groupSlug}/${slug}`;
};

// ─── Products Data ──────────────────────────────────────────────────────────
// 10 UI Kit products shown in the Products dropdown
const products: { name: string; desc: string; icon: any; href: string; badge?: string }[] = [
  {
    name: "Real-Estate Management System",
    desc: "UI Kit for property listings & agents",
    icon: Home,
    href: "/products/real-estate-management-system",
    badge: "UI Kit",
  },
  {
    name: "Car Services Website & Management System",
    desc: "UI Kit for auto service bookings",
    icon: Car,
    href: "/products/car-services-management-system",
    badge: "UI Kit",
  },
  {
    name: "POS Supermarket",
    desc: "UI Kit for retail point-of-sale",
    icon: Store,
    href: "/products/pos-supermarket",
    badge: "UI Kit",
  },
  {
    name: "POS Pet Super Store",
    desc: "UI Kit for pet store POS",
    icon: ShoppingCart,
    href: "/products/pos-pet-super-store",
    badge: "UI Kit",
  },
  {
    name: "Pet Shop",
    desc: "UI Kit for pet retail & products",
    icon: PawPrint,
    href: "/products/pet-shop",
    badge: "UI Kit",
  },
  {
    name: "Pet Pharmacy",
    desc: "UI Kit for pet medication stores",
    icon: Pill,
    href: "/products/pet-pharmacy",
    badge: "UI Kit",
  },
  {
    name: "Pet Diagnostics",
    desc: "UI Kit for lab & diagnostic services",
    icon: ScanLine,
    href: "/products/pet-diagnostics",
    badge: "UI Kit",
  },
  {
    name: "Pet Hospital",
    desc: "UI Kit for veterinary clinics",
    icon: StethoscopeIcon,
    href: "/products/pet-hospital",
    badge: "UI Kit",
  },
  {
    name: "GYM Management System",
    desc: "UI Kit for fitness studios & members",
    icon: Dumbbell,
    href: "/products/gym-management-system",
    badge: "UI Kit",
  },
  {
    name: "Restaurant Management Website & System",
    desc: "UI Kit for restaurants & orders",
    icon: UtensilsCrossed,
    href: "/products/restaurant-management-system",
    badge: "UI Kit",
  },
];

// ─── Location Data ──────────────────────────────────────────────────────────
const locations: { name: string; desc: string; icon: any; href: string }[] = [
  // Original 13
  { name: "Atlanta", desc: "Digital marketing in Atlanta, GA", icon: MapPin, href: "/locations/digital-marketing-agency-atlanta" },
  { name: "Austin", desc: "Digital marketing in Austin, TX", icon: MapPin, href: "/locations/digital-marketing-agency-austin" },
  { name: "Boston", desc: "Digital marketing in Boston, MA", icon: MapPin, href: "/locations/digital-marketing-agency-boston" },
  { name: "Chicago", desc: "Digital marketing in Chicago, IL", icon: MapPin, href: "/locations/digital-marketing-agency-chicago" },
  { name: "Cleveland", desc: "Digital marketing in Cleveland, OH", icon: MapPin, href: "/locations/digital-marketing-agency-cleveland" },
  { name: "Dallas", desc: "Digital marketing in Dallas, TX", icon: MapPin, href: "/locations/digital-marketing-agency-dallas" },
  { name: "Denver", desc: "Digital marketing in Denver, OH", icon: MapPin, href: "/locations/digital-marketing-agency-denver" },
  { name: "Houston", desc: "Digital marketing in Houston, TX", icon: MapPin, href: "/locations/digital-marketing-agency-houston" },
  { name: "Huntsville", desc: "Digital marketing in Huntsville, AL", icon: MapPin, href: "/locations/digital-marketing-agency-huntsville" },
  { name: "Indianapolis", desc: "Digital marketing in Indianapolis, IN", icon: MapPin, href: "/locations/digital-marketing-agency-indianapolis" },
  { name: "Jacksonville", desc: "Digital marketing in Jacksonville, FL", icon: MapPin, href: "/locations/digital-marketing-agency-jacksonville" },
  { name: "Kansas City", desc: "Digital marketing in Kansas City, MO", icon: MapPin, href: "/locations/digital-marketing-agency-kansas-city" },
  { name: "New York", desc: "Digital marketing in New York, NY", icon: MapPin, href: "/locations/digital-marketing-agency-new-york" },

  // New 33 locations
  { name: "Albuquerque", desc: "Digital marketing in Albuquerque, NM", icon: MapPin, href: "/locations/digital-marketing-agency-albuquerque" },
  { name: "Baltimore", desc: "Digital marketing in Baltimore, MD", icon: MapPin, href: "/locations/digital-marketing-agency-baltimore" },
  { name: "Birmingham", desc: "Digital marketing in Birmingham, AL", icon: MapPin, href: "/locations/digital-marketing-agency-birmingham" },
  { name: "Boise", desc: "Digital marketing in Boise, ID", icon: MapPin, href: "/locations/digital-marketing-agency-boise" },
  { name: "Charlotte", desc: "Digital marketing in Charlotte, NC", icon: MapPin, href: "/locations/digital-marketing-agency-charlotte" },
  { name: "Cincinnati", desc: "Digital marketing in Cincinnati, OH", icon: MapPin, href: "/locations/digital-marketing-agency-cincinnati" },
  { name: "Des Moines", desc: "Digital marketing in Des Moines, IA", icon: MapPin, href: "/locations/digital-marketing-agency-des-moines" },
  { name: "Knoxville", desc: "Digital marketing in Knoxville, TN", icon: MapPin, href: "/locations/digital-marketing-agency-knoxville" },
  { name: "Las Vegas", desc: "Digital marketing in Las Vegas, NV", icon: MapPin, href: "/locations/digital-marketing-agency-las-vegas" },
  { name: "Los Angeles", desc: "Digital marketing in Los Angeles, CA", icon: MapPin, href: "/locations/digital-marketing-agency-los-angeles" },
  { name: "Louisville", desc: "Digital marketing in Louisville, KY", icon: MapPin, href: "/locations/digital-marketing-agency-louisville" },
  { name: "Memphis", desc: "Digital marketing in Memphis, TN", icon: MapPin, href: "/locations/digital-marketing-agency-memphis" },
  { name: "Miami", desc: "Digital marketing in Miami, FL", icon: MapPin, href: "/locations/digital-marketing-agency-miami" },
  { name: "Minneapolis", desc: "Digital marketing in Minneapolis, MN", icon: MapPin, href: "/locations/digital-marketing-agency-minneapolis" },
  { name: "Nashville", desc: "Digital marketing in Nashville, TN", icon: MapPin, href: "/locations/digital-marketing-agency-nashville" },
  { name: "New Orleans", desc: "Digital marketing in New Orleans, LA", icon: MapPin, href: "/locations/digital-marketing-agency-new-orleans" },
  { name: "Oklahoma City", desc: "Digital marketing in Oklahoma City, OK", icon: MapPin, href: "/locations/digital-marketing-agency-oklahoma-city" },
  { name: "Omaha", desc: "Digital marketing in Omaha, NE", icon: MapPin, href: "/locations/digital-marketing-agency-omaha" },
  { name: "Orlando", desc: "Digital marketing in Orlando, FL", icon: MapPin, href: "/locations/digital-marketing-agency-orlando" },
  { name: "Philadelphia", desc: "Digital marketing in Philadelphia, PA", icon: MapPin, href: "/locations/digital-marketing-agency-philadelphia" },
  { name: "Phoenix", desc: "Digital marketing in Phoenix, AZ", icon: MapPin, href: "/locations/seo-services-phoenix" },
  { name: "Pittsburgh", desc: "Digital marketing in Pittsburgh, PA", icon: MapPin, href: "/locations/digital-marketing-agency-pittsburgh" },
  { name: "Portland", desc: "Digital marketing in Portland, OR", icon: MapPin, href: "/locations/digital-marketing-agency-portland" },
  { name: "Richmond", desc: "Digital marketing in Richmond, VA", icon: MapPin, href: "/locations/seo-services-richmond" },
  { name: "Sacramento", desc: "Digital marketing in Sacramento, CA", icon: MapPin, href: "/locations/digital-marketing-agency-sacramento" },
  { name: "Salt Lake City", desc: "Digital marketing in Salt Lake City, UT", icon: MapPin, href: "/locations/digital-marketing-agency-salt-lake-city" },
  { name: "San Antonio", desc: "Digital marketing in San Antonio, TX", icon: MapPin, href: "/locations/digital-marketing-agency-san-antonio" },
  { name: "San Diego", desc: "Digital marketing in San Diego, CA", icon: MapPin, href: "/locations/digital-marketing-agency-san-diego" },
  { name: "San Francisco", desc: "Digital marketing in San Francisco, CA", icon: MapPin, href: "/locations/digital-marketing-agency-san-francisco" },
  { name: "Seattle", desc: "Digital marketing in Seattle, WA", icon: MapPin, href: "/locations/seo-services-seattle" },
  { name: "St. Louis", desc: "Digital marketing in St. Louis, MO", icon: MapPin, href: "/locations/digital-marketing-agency-st-louis" },
  { name: "Tampa", desc: "Digital marketing in Tampa, FL", icon: MapPin, href: "/locations/seo-services-tampa" },
  { name: "Tulsa", desc: "Digital marketing in Tulsa, OK", icon: MapPin, href: "/locations/digital-marketing-agency-tulsa" },
  { name: "Wichita", desc: "Digital marketing in Wichita, KS", icon: MapPin, href: "/locations/digital-marketing-agency-wichita" },
];

// ─── Service Groups ──────────────────────────────────────────────────────────
const groups: { title: string; href?: string; items: Service[] }[] = [
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
    { name: "SEO Services USA", desc: "SEO solutions across the USA", icon: Flag, href: "/search-engine-optimization/seo-services-usa" },
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
    { name: "YouTube SEO", desc: "Video optimization", icon: Youtube, href: "/social-media-marketing/youtube-seo" },
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
    { name: "CRO Services", desc: "Increase conversions", icon: TrendingUp, href: "/conversion-rate-optimization/cro-services" },
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
    { name: "Ecommerce Development", desc: "Online stores", icon: ShoppingCart, href: "/ecommerce-services/ecommerce-development" },
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
    { name: "Predictive Analytics", desc: "Forecast customer behavior", icon: LineChart, href: "/ai-automation/predictive-analytics" },
    { name: "Data Analytics & Reporting", desc: "Business intelligence", icon: Database, href: "/ai-automation/data-analytics-reporting" },
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
    { name: "Web Application Development", desc: "Custom web apps", icon: LayoutGrid, href: "/web-design-development/web-application-development" },
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

// ─── Navbar Links ──────────────────────────────────────────────────────────
// Added "Products" with hasMenu: true and menuType: "products"
const links: {
  label: string;
  hasMenu: boolean;
  menuType?: "services" | "locations" | "products";
  href?: string;
}[] = [
  { label: "Services", hasMenu: true, menuType: "services" },
  { label: "Products", hasMenu: true, menuType: "products" },
  { label: "Locations", hasMenu: true, menuType: "locations" },
  { label: "Solutions", hasMenu: false, href: "/solutions" },
  { label: "About", hasMenu: false, href: "/about" },
  { label: "Pricing", hasMenu: false, href: "/pricing" },
  // { label: "Process", hasMenu: false, href: "/process" },
  // { label: "Testimonials", hasMenu: false, href: "/testimonials" },
  { label: "Contact", hasMenu: false, href: "/contact" },
];

// ─── Desktop Mega Menu ───────────────────────────────────────────────────────
const MegaMenu = ({
  open,
  onOpen,
  onClose,
  menuType = "services",
}: {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  menuType?: "services" | "locations" | "products";
}) => {
  const [activeGroup, setActiveGroup] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const router = useRouter();

  const isLocations = menuType === "locations";
  const isProducts = menuType === "products";
  const menuData = isLocations ? locations : isProducts ? products : groups;

  // Filter locations based on search
  const filteredLocations = isLocations
    ? locations
        .filter(loc =>
          loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          loc.desc.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => a.name.localeCompare(b.name))
    : [];

  // Filter products based on search (for products menu)
  const filteredProducts = isProducts
    ? products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.desc.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Prevent scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const menuContent = (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, x: "-50%", y: -10, scale: 0.98 }}
          animate={{ opacity: 1, x: "-50%", y: 0, scale: 1 }}
          exit={{ opacity: 0, x: "-50%", y: -10, scale: 0.98 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onMouseEnter={onOpen}
          onMouseLeave={onClose}
          className="fixed left-1/2 top-[5.15rem] z-50 hidden w-[min(96vw,56rem)] pt-3 lg:block"
        >
          <div className="relative overflow-hidden rounded-3xl border border-border bg-background/95 backdrop-blur-2xl shadow-2xl max-w-6xl mx-auto">
            {/* Animated background graphics for locations */}
            {isLocations && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.svg
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.06 }}
                  transition={{ delay: 0.3, duration: 1 }}
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 800 400"
                >
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.line
                      key={`h-${i}`}
                      x1="0"
                      y1={50 + i * 43}
                      x2="800"
                      y2={50 + i * 43}
                      stroke="currentColor"
                      strokeWidth="0.5"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ delay: 0.5 + i * 0.05, duration: 1 }}
                    />
                  ))}
                  {Array.from({ length: 10 }).map((_, i) => (
                    <motion.line
                      key={`v-${i}`}
                      x1={80 + i * 72}
                      y1="0"
                      x2={80 + i * 72}
                      y2="400"
                      stroke="currentColor"
                      strokeWidth="0.5"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ delay: 0.5 + i * 0.05, duration: 1 }}
                    />
                  ))}
                  <motion.path
                    d="M100 200 Q250 120 400 200 T700 200"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                    strokeDasharray="6 6"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.4 }}
                    transition={{ delay: 0.8, duration: 2, ease: "easeInOut" }}
                  />
                </motion.svg>

                {[
                  { Icon: Compass, x: 15, y: 15, size: 24, delay: 0 },
                  { Icon: Navigation, x: 85, y: 5, size: 20, delay: 0.3 },
                  { Icon: Target, x: 92, y: 85, size: 28, delay: 0.6 },
                  { Icon: MapIcon, x: 5, y: 80, size: 22, delay: 0.9 },
                  { Icon: Pin, x: 50, y: 92, size: 18, delay: 1.2 },
                ].map((item, idx) => {
                  const IconComponent = item.Icon;
                  return (
                    <motion.div
                      key={`shape-${idx}`}
                      className="absolute opacity-[0.04]"
                      style={{ left: `${item.x}%`, top: `${item.y}%` }}
                      initial={{ opacity: 0, scale: 0, rotate: -30 }}
                      animate={{ opacity: 0.06, scale: 1, rotate: 0, y: [0, -8, 0] }}
                      transition={{
                        delay: 0.8 + item.delay,
                        duration: 0.8,
                        y: { duration: 4 + item.delay, repeat: Infinity, ease: "easeInOut" },
                      }}
                    >
                      <IconComponent size={item.size} strokeWidth={1} />
                    </motion.div>
                  );
                })}
              </div>
            )}

            <div className="relative z-10 p-4">
              {/* === PRODUCTS MENU === */}
              {isProducts ? (
                <div className="space-y-2 p-1">
                  {/* Header */}
                  <div className="flex items-center justify-between px-2 py-1">
                    <div>
                      <span className="text-sm font-semibold">UI Kits & Products</span>
                      <p className="text-[11px] opacity-50 mt-0.5">
                        Ready-to-use UI kits for modern businesses
                      </p>
                    </div>
                    <span className="text-[10px] font-medium opacity-40 uppercase tracking-wider flex items-center gap-1">
                      <Package className="w-3 h-3" />
                      {products.length} Products
                    </span>
                  </div>

                  {/* Products grid - 2 columns */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((p, index) => {
                        const Icon = p.icon;
                        const isHovered = hoveredProduct === p.name;
                        return (
                          <motion.a
                            key={p.name}
                            href={p.href}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.03, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            whileHover={{ y: -2 }}
                            onMouseEnter={() => setHoveredProduct(p.name)}
                            onMouseLeave={() => setHoveredProduct(null)}
                            className="group relative rounded-xl p-3 bg-muted/10 hover:bg-muted/30 transition-all duration-300 border border-transparent hover:border-border/60 hover:shadow-md cursor-pointer overflow-hidden flex items-start gap-3"
                          >
                            {/* Hover glow ring */}
                            {isHovered && (
                              <motion.div
                                layoutId="product-ring"
                                className="absolute inset-0 rounded-xl ring-1 ring-foreground/20 ring-offset-1 ring-offset-background pointer-events-none"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.15 }}
                              />
                            )}

                            {/* Icon */}
                            <motion.div
                              className="relative shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-foreground/15 to-foreground/5 flex items-center justify-center group-hover:from-foreground group-hover:to-foreground/80 group-hover:text-background transition-all duration-400 overflow-hidden"
                              whileHover={{ scale: 1.08, rotate: [0, -3, 3, 0] }}
                              transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            >
                              <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                              <motion.div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                            </motion.div>

                            {/* Product info */}
                            <div className="relative z-10 min-w-0 flex-1">
                              <div className="flex items-start justify-between gap-2">
                                <span className="text-sm font-semibold truncate group-hover:text-foreground">
                                  {p.name}
                                </span>
                                {p.badge && (
                                  <span className="shrink-0 text-[9px] font-medium px-1.5 py-0.5 rounded-full bg-foreground/10 text-foreground/60 group-hover:bg-foreground group-hover:text-background transition-colors">
                                    {p.badge}
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] opacity-50 truncate mt-0.5">
                                {p.desc}
                              </div>
                            </div>

                            {/* Arrow on hover */}
                            <motion.div
                              className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300"
                              initial={{ x: -5, opacity: 0 }}
                              animate={isHovered ? { x: 0, opacity: 1 } : { x: -5, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                            </motion.div>
                          </motion.a>
                        );
                      })
                    ) : (
                      <div className="col-span-2 py-8 text-center">
                        <div className="w-12 h-12 mx-auto rounded-full bg-muted/30 flex items-center justify-center mb-2">
                          <Package className="w-5 h-5 opacity-30" />
                        </div>
                        <p className="text-xs font-medium opacity-60">No products found</p>
                      </div>
                    )}
                  </div>

                  {/* Footer CTA */}
                  <div className="flex items-center justify-between pt-2 border-t border-border/60 mt-1">
                    <a
                      href="/products"
                      className="text-xs font-medium opacity-60 hover:opacity-100 transition-opacity flex items-center gap-1"
                    >
                      View all products <ChevronRight className="w-3 h-3" />
                    </a>
                    <a
                      href="/contact"
                      className="text-xs font-medium px-3 py-1.5 rounded-full bg-foreground text-background hover:opacity-90 transition-opacity flex items-center gap-1"
                    >
                      Request demo <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ) : (
                /* === SERVICES / LOCATIONS MENU (existing layout) === */
                <div className="grid grid-cols-12 gap-4">
                  {/* Category rail for services only */}
                  {!isLocations && (
                    <div className="col-span-3 rounded-2xl bg-foreground/10 p-3 flex flex-col gap-1">
                      {(menuData as typeof groups).map((g, i) => (
                        <button
                          key={g.title}
                          onMouseEnter={() => setActiveGroup(i)}
                          onClick={() => {
                            setActiveGroup(i);
                            if (g.href) router.push(g.href);
                          }}
                          className={`relative text-left text-sm px-3 py-2.5 rounded-xl transition-colors ${
                            activeGroup === i ? "bg-foreground text-background" : "hover:bg-background"
                          }`}
                        >
                          {activeGroup === i && (
                            <motion.span
                              layoutId="menu-pill"
                              className="absolute inset-0 rounded-xl bg-foreground -z-10"
                              transition={{ type: "spring", stiffness: 400, damping: 32 }}
                            />
                          )}
                          <span className="relative flex items-center justify-between">
                            {g.title}
                            <span className="text-[10px] opacity-60">{g.items.length}</span>
                          </span>
                        </button>
                      ))}
                      <a
                        href="/contact"
                        className="mt-auto inline-flex items-center justify-between gap-2 text-sm font-medium px-3 py-3 rounded-xl bg-foreground text-background group"
                      >
                        Get a quote
                        <span className="transition-transform group-hover:translate-x-1">
                          <ExternalLink className="w-4 h-4" />
                        </span>
                      </a>
                    </div>
                  )}

                  {/* Content grid */}
                  <div className={`${isLocations ? "col-span-12" : "col-span-9"} max-h-[68vh] overflow-y-auto pr-1`}>
                    {isLocations ? (
                      <div className="space-y-2 p-1">
                        {/* Search bar */}
                        <div className="relative px-1">
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="relative"
                          >
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 opacity-40" />
                            <input
                              type="text"
                              placeholder="Find your city..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-full pl-9 pr-8 py-2 rounded-xl border border-border bg-muted/20 focus:bg-background focus:border-foreground/30 focus:outline-none focus:ring-2 focus:ring-foreground/10 transition-all duration-300 text-sm"
                            />
                            {searchQuery && (
                              <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted transition-colors"
                              >
                                <X className="w-3 h-3 opacity-50" />
                              </button>
                            )}
                          </motion.div>
                        </div>

                        {/* Stats header */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.1 }}
                          className="flex items-center justify-between px-2 py-1"
                        >
                          <span className="text-[10px] font-medium opacity-40 uppercase tracking-wider">
                            {filteredLocations.length} {filteredLocations.length === 1 ? "Location" : "Locations"}
                          </span>
                          <span className="text-[10px] opacity-30 flex items-center gap-1">
                            <Globe className="w-3 h-3" />
                            Nationwide
                          </span>
                        </motion.div>

                        {/* Locations grid - 4 columns */}
                        <div className="grid grid-cols-4 gap-1.5 p-0.5">
                          {filteredLocations.length > 0 ? (
                            filteredLocations.map((loc, index) => {
                              const Icon = loc.icon;
                              const isHovered = hoveredLocation === loc.name;
                              return (
                                <motion.a
                                  key={loc.name}
                                  href={loc.href}
                                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  transition={{ duration: 0.3, delay: index * 0.02, ease: [0.22, 1, 0.36, 1] }}
                                  whileHover={{ y: -2, scale: 1.03, transition: { duration: 0.15, ease: "easeOut" } }}
                                  onMouseEnter={() => setHoveredLocation(loc.name)}
                                  onMouseLeave={() => setHoveredLocation(null)}
                                  className="group relative rounded-xl p-2.5 bg-muted/10 hover:bg-muted/30 transition-all duration-300 border border-transparent hover:border-border/50 hover:shadow-md cursor-pointer overflow-hidden"
                                >
                                  {isHovered && (
                                    <motion.div
                                      layoutId="location-ring-small"
                                      className="absolute inset-0 rounded-xl ring-1 ring-foreground/20 ring-offset-1 ring-offset-background"
                                      initial={{ opacity: 0, scale: 0.9 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      exit={{ opacity: 0, scale: 0.9 }}
                                      transition={{ duration: 0.15 }}
                                    />
                                  )}
                                  <motion.div
                                    className="relative shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-foreground/15 to-foreground/5 flex items-center justify-center group-hover:from-foreground group-hover:to-foreground/80 group-hover:text-background transition-all duration-400 overflow-hidden mb-1.5"
                                    whileHover={{ scale: 1.1, rotate: [0, -3, 3, 0] }}
                                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                  >
                                    <Icon className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" />
                                    <motion.div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                                  </motion.div>
                                  <div className="relative z-10">
                                    <motion.div
                                      className="text-xs font-semibold truncate transition-colors duration-300 group-hover:text-foreground"
                                      animate={isHovered ? { color: "var(--foreground)" } : {}}
                                    >
                                      {loc.name}
                                    </motion.div>
                                    <motion.div
                                      className="text-[9px] opacity-40 truncate transition-all duration-300 group-hover:opacity-60"
                                      animate={isHovered ? { opacity: 0.6 } : { opacity: 0.4 }}
                                    >
                                      {loc.desc.replace("Digital marketing in ", "")}
                                    </motion.div>
                                  </div>
                                  <motion.div
                                    className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300"
                                    initial={{ x: -5, opacity: 0 }}
                                    animate={isHovered ? { x: 0, opacity: 1 } : { x: -5, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <ChevronRight className="w-3 h-3 opacity-60" />
                                  </motion.div>
                                  <motion.div
                                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-foreground/40 via-foreground/20 to-transparent rounded-full"
                                    initial={{ scaleX: 0, opacity: 0 }}
                                    animate={isHovered ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                                    transition={{ duration: 0.25, ease: "easeOut" }}
                                  />
                                  <motion.div
                                    className="absolute top-1.5 right-1.5 text-[7px] font-mono font-bold uppercase opacity-0 group-hover:opacity-25 transition-opacity duration-300"
                                    animate={isHovered ? { opacity: 0.25 } : { opacity: 0 }}
                                  >
                                    {loc.desc.split(",").pop()?.trim() || "US"}
                                  </motion.div>
                                </motion.a>
                              );
                            })
                          ) : (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="col-span-4 py-8 text-center"
                            >
                              <div className="w-12 h-12 mx-auto rounded-full bg-muted/30 flex items-center justify-center mb-2">
                                <MapPin className="w-5 h-5 opacity-30" />
                              </div>
                              <p className="text-xs font-medium opacity-60">No locations found</p>
                              <p className="text-[10px] opacity-40 mt-0.5">Try adjusting your search</p>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    ) : (
                      // Services grid
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeGroup}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.25 }}
                          className="grid grid-cols-2 xl:grid-cols-3 gap-2"
                        >
                          {(menuData as typeof groups)[activeGroup]?.items.map((s, i) => {
                            const Icon = s.icon;
                            return (
                              <motion.a
                                key={s.name}
                                href={getServiceHref((menuData as typeof groups)[activeGroup].title, s.href)}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.03 + i * 0.025, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                whileHover={{ y: -2 }}
                                className="group relative rounded-xl p-3 hover:bg-muted/60 transition-colors flex items-start gap-3 border border-transparent hover:border-border"
                              >
                                <div className="shrink-0 w-9 h-9 rounded-lg bg-white text-black flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors">
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div className="min-w-0">
                                  <div className="text-sm font-medium truncate">{s.name}</div>
                                  <div className="text-xs opacity-60 truncate">{s.desc}</div>
                                </div>
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-sm">
                                  <ExternalLink className="w-4 h-4" />
                                </span>
                              </motion.a>
                            );
                          })}
                        </motion.div>
                      </AnimatePresence>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (!mounted) return null;
  return createPortal(menuContent, document.body);
};

// ─── Mobile Drawer ──────────────────────────────────────────────────────────
const MobileDrawer = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [expandedGroup, setExpandedGroup] = useState<number | null>(null);
  const [expandedLocations, setExpandedLocations] = useState(false);
  const [expandedProducts, setExpandedProducts] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const router = useRouter();

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
      }
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
    };
  }, [open]);

  const toggleGroup = (i: number) => {
    setExpandedGroup(prev => (prev === i ? null : i));
  };

  const toggleLocations = () => {
    setExpandedLocations(prev => !prev);
  };

  const toggleProducts = () => {
    setExpandedProducts(prev => !prev);
  };

  const drawerContent = (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer panel */}
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 z-[10000] w-[85vw] max-w-[400px] bg-background border-l border-border flex flex-col shadow-2xl"
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
              <a href="/" className="flex items-center gap-2 font-display text-lg" onClick={onClose}>
                <div className="w-6 h-6 rounded-full overflow-hidden">
                  <Image src="/favicon.ico" alt="icon" width={24} height={24} className="object-cover" />
                </div>
                ClickMasters
              </a>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer body scrollable */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              {/* Top-level links */}
              <div className="px-4 pt-4 pb-2 flex flex-col gap-1">
                {links.filter(l => !l.hasMenu).map(l => (
                  <a
                    key={l.label}
                    href={l.href ?? `/#${l.label.toLowerCase()}`}
                    onClick={onClose}
                    className="flex items-center justify-between text-sm font-medium px-3 py-3 rounded-xl hover:bg-muted/70 transition-colors"
                  >
                    {l.label}
                    <ChevronRight className="w-4 h-4 opacity-40" />
                  </a>
                ))}
              </div>

              {/* Divider */}
              <div className="mx-4 my-2 border-t border-border" />

              {/* Products accordion */}
              <div className="px-4 pb-2">
                <button
                  onClick={toggleProducts}
                  className="w-full flex items-center justify-between text-sm font-medium px-3 py-3 rounded-xl hover:bg-muted/70 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    Products
                    <span className="text-[10px] opacity-50 bg-foreground/10 rounded-full px-1.5 py-0.5">{products.length}</span>
                  </span>
                  <motion.span
                    animate={{ rotate: expandedProducts ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ChevronDown className="w-4 h-4 opacity-50" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {expandedProducts && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-0.5 pl-3 pr-1 pb-2">
                        {products.map(p => {
                          const Icon = p.icon;
                          return (
                            <a
                              key={p.name}
                              href={p.href}
                              onClick={onClose}
                              className="group flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted/60 transition-colors"
                            >
                              <div className="shrink-0 w-8 h-8 rounded-lg bg-foreground/10 flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors">
                                <Icon className="w-3.5 h-3.5" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="text-sm font-medium truncate">{p.name}</div>
                                <div className="text-xs opacity-50 truncate">{p.desc}</div>
                              </div>
                            </a>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Divider */}
              <div className="mx-4 my-2 border-t border-border" />

              {/* Locations accordion */}
              <div className="px-4 pb-2">
                <button
                  onClick={toggleLocations}
                  className="w-full flex items-center justify-between text-sm font-medium px-3 py-3 rounded-xl hover:bg-muted/70 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    Locations
                    <span className="text-[10px] opacity-50 bg-foreground/10 rounded-full px-1.5 py-0.5">{locations.length}</span>
                  </span>
                  <motion.span
                    animate={{ rotate: expandedLocations ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ChevronDown className="w-4 h-4 opacity-50" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {expandedLocations && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-0.5 pl-3 pr-1 pb-2">
                        {locations.sort((a, b) => a.name.localeCompare(b.name)).map(loc => {
                          const Icon = loc.icon;
                          return (
                            <a
                              key={loc.name}
                              href={loc.href}
                              onClick={onClose}
                              className="group flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted/60 transition-colors"
                            >
                              <div className="shrink-0 w-8 h-8 rounded-lg bg-foreground/10 flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors">
                                <Icon className="w-3.5 h-3.5" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="text-sm font-medium truncate">{loc.name}</div>
                                <div className="text-xs opacity-50 truncate">{loc.desc}</div>
                              </div>
                            </a>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Divider */}
              <div className="mx-4 my-2 border-t border-border" />

              {/* Services accordion */}
              <div className="px-4 pb-4 flex flex-col gap-1">
                <p className="text-[11px] font-semibold uppercase tracking-widest opacity-40 px-3 py-1">Services</p>
                {groups.map((g, i) => (
                  <div key={g.title}>
                    <button
                      onClick={() => toggleGroup(i)}
                      className="w-full flex items-center justify-between text-sm font-medium px-3 py-3 rounded-xl hover:bg-muted/70 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <a
                          href={g.href ?? '#'}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (g.href) {
                              router.push(g.href);
                              onClose();
                            }
                          }}
                          className="block"
                        >
                          {g.title}
                        </a>
                        <span className="text-[10px] opacity-50 bg-foreground/10 rounded-full px-1.5 py-0.5">{g.items.length}</span>
                      </span>
                      <motion.span
                        animate={{ rotate: expandedGroup === i ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <ChevronDown className="w-4 h-4 opacity-50" />
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {expandedGroup === i && (
                        <motion.div
                          key="items"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-0.5 pl-3 pr-1 pb-2">
                            {g.items.map(s => {
                              const Icon = s.icon;
                              return (
                                <a
                                  key={s.name}
                                  href={getServiceHref(g.title, s.href)}
                                  onClick={onClose}
                                  className="group flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted/60 transition-colors"
                                >
                                  <div className="shrink-0 w-8 h-8 rounded-lg bg-foreground/10 flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors">
                                    <Icon className="w-3.5 h-3.5" />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <div className="text-sm font-medium truncate">{s.name}</div>
                                    <div className="text-xs opacity-50 truncate">{s.desc}</div>
                                  </div>
                                </a>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* Drawer footer CTA */}
            <div className="px-4 py-4 border-t border-border shrink-0">
              <a
                href="/contact"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full rounded-full bg-foreground text-background px-4 py-3 text-sm font-medium hover:opacity-90 transition"
              >
                Start a project <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  if (!mounted) return null;
  return createPortal(drawerContent, document.body);
};

// ─── Main Navbar ──────────────────────────────────────────────────────────────
export const Navbar = () => {
  const [megaOpen, setMegaOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeMenuType, setActiveMenuType] = useState<"services" | "locations" | "products">("services");
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isDark, setIsDark] = useState(false);

  const pathname = usePathname();

  const isLocationPage = pathname?.startsWith("/locations/") || false;

  useEffect(() => {
    const updateTheme = () => {
      const theme =
        document.documentElement.getAttribute("data-section-theme") ?? "dark";
      setIsDark(theme === "dark");
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-section-theme"],
    });

    return () => observer.disconnect();
  }, []);

  const openMega = (type: "services" | "locations" | "products" = "services") => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenuType(type);
    setMegaOpen(true);
  };

  const closeMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 120);
  };

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const logoSrc = isLocationPage ? logoBlack : (isDark ? logoWhite : logoBlack);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
        className="fixed inset-x-0 top-4 z-50 px-3 sm:px-4"
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-2 sm:gap-4 rounded-full bg-background/80 backdrop-blur-xl border border-border px-3 sm:px-4 py-3 shadow-sm">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 font-display text-base sm:text-xl shrink-0">
            <Image
              src={logoSrc}
              alt="ClickMasters"
              className="w-24 sm:w-28 h-auto"
              priority
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm">
            {links.map(l =>
              l.hasMenu ? (
                <div
                  key={l.label}
                  className="relative"
                  onMouseEnter={() => openMega(l.menuType as "services" | "locations" | "products")}
                  onMouseLeave={closeMega}
                >
                  <button
                    className="flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity"
                    onClick={() => {
                      const type = l.menuType as "services" | "locations" | "products";
                      if (megaOpen && activeMenuType === type) {
                        setMegaOpen(false);
                      } else {
                        setActiveMenuType(type);
                        setMegaOpen(true);
                      }
                    }}
                  >
                    {l.label}
                    <motion.span animate={{ rotate: megaOpen && activeMenuType === l.menuType ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </motion.span>
                  </button>
                </div>
              ) : (
                <a
                  key={l.label}
                  href={l.href ?? `/#${l.label.toLowerCase()}`}
                  onMouseEnter={() => setMegaOpen(false)}
                  className="opacity-70 hover:opacity-100 transition-opacity whitespace-nowrap"
                >
                  {l.label}
                </a>
              ),
            )}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="/contact"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90 transition"
            >
              Start a project <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Desktop mega menu - rendered through a portal so it aligns to the viewport */}
      <div className="hidden lg:block">
        <MegaMenu
          open={megaOpen}
          onOpen={() => openMega(activeMenuType)}
          onClose={closeMega}
          menuType={activeMenuType}
        />
      </div>

      {/* Mobile / tablet drawer - rendered via portal to body */}
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
};