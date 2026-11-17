import { motion } from "framer-motion";
import { SectionTag } from "@/components/site/SectionTag";

const groups = [
  {
    t: "SEO & Keyword Research",
    items: [
      "Google Search Console",
      "Ahrefs",
      "SEMrush",
      "Moz Pro",
      "Screaming Frog",
    ],
  },
  {
    t: "Analytics & Reporting",
    items: [
      "Google Analytics 4",
      "Google Data Studio (Looker Studio)",
      "HubSpot Analytics",
      "Databox",
      "AgencyAnalytics",
    ],
  },
  {
    t: "Paid Advertising",
    items: [
      "Google Ads",
      "Meta Ads Manager",
      "Microsoft Bing Ads",
      "TikTok Ads Manager",
      "LinkedIn Campaign Manager",
    ],
  },
  {
    t: "Social Media Management",
    items: [
      "Hootsuite",
      "Buffer",
      "Sprout Social",
      "Later",
      "Meta Business Suite",
    ],
  },
  {
    t: "Email Marketing",
    items: [
      "Mailchimp",
      "Klaviyo",
      "ActiveCampaign",
      "HubSpot Email",
      "ConvertKit",
    ],
  },
  {
    t: "AI & Automation",
    items: [
      "ChatGPT & Claude AI",
      "Zapier",
      "HubSpot CRM Automation",
      "Jasper AI",
      "Make (Integromat)",
    ],
  },
  {
    t: "Creative & Design",
    items: [
      "Adobe Creative Suite",
      "Canva Pro",
      "Figma",
      "CapCut Pro",
      "Premiere Pro",
    ],
  },
  {
    t: "Ecommerce & Web",
    items: [
      "Shopify",
      "WordPress",
      "WooCommerce",
      "Webflow",
      "ClickFunnels",
    ],
  },
  {
    t: "CRM & Lead Management",
    items: [
      "HubSpot CRM",
      "Salesforce",
      "GoHighLevel",
      "Pipedrive",
      "Zoho CRM",
    ],
  },
];

export const TechStack = () => (
  <section id="stack" className="py-32 container">
    <div className="grid md:grid-cols-12 gap-12 mb-20">
      <div className="md:col-span-5">
        <SectionTag className="mb-4">Our Stack</SectionTag>
        <h2 className="font-display text-5xl md:text-7xl leading-[1.05]">
          Modern tools, <em>Technologies We Use</em>.
        </h2>
      </div>
      <p className="md:col-span-6 md:col-start-7 self-end text-lg text-muted-foreground max-w-md">
        We pick the right tool for the job fast to ship, easy to maintain, and ready to scale when your product takes off.
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-3xl overflow-hidden">
      {groups.map((g, i) => (
        <motion.div
          key={g.t}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: i * 0.08 }}
          className="bg-background p-8 min-h-[280px]"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2 h-2 rounded-full bg-foreground" />
            <span className="text-xs uppercase tracking-widest opacity-70">{g.t}</span>
          </div>
          <ul className="space-y-3">
            {g.items.map(it => (
              <li key={it} className="font-display text-2xl leading-tight">{it}</li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  </section>
);
