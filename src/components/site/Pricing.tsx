import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";


const plans = [
  {
    t: "Starter Package",
    p: "Start from $1000",
    d: "Perfect for local businesses & startups",
    bg: "#FFF8DC",
    emoji: "🥉",
    f: [
      "Website SEO Audit & Optimization",
      "Google My Business Setup & Optimization",
      "Local SEO Campaign",
      "Social Media Setup & Management (2 Platforms)",
      "Monthly Performance Report",
      "Dedicated Account Manager",
    ],
  },
  {
    t: "Growth Package",
    p: "Start from $2500",
    d: "Perfect for growing businesses ready to scale",
    bg: "#FFE0E6",
    emoji: "🥈",
    featured: true,
    f: [
      "Everything in Starter Plus",
      "Google & Meta Paid Ads Management",
      "Advanced SEO & Content Marketing",
      "Social Media Management (4 Platforms)",
      "Email Marketing Campaign",
      "Conversion Rate Optimization",
      "Bi-Weekly Performance Review Calls",
      "Competitor Analysis & Strategy Updates",
    ],
  },
  {
    t: "Enterprise Package",
    p: "Start from $5000",
    d: "Custom solutions for large-scale businesses",
    bg: "#DFF7F0",
    emoji: "🏆",
    f: [
      "Everything in Growth Plus",
      "Fully Custom Strategy & Execution Plan",
      "Dedicated Full-Time Marketing Team",
      "Multi-Location & Multi-Market Campaigns",
      "White-Glove Onboarding & Support",
      "Custom Reporting & Executive Dashboards",
      "Quarterly Business Growth Reviews",
    ],
  },
];


export const Pricing = ({
  headingLevel = "h2",
}: {
  headingLevel?: "h1" | "h2";
}) => {
  const Heading = headingLevel;
  // Sub-headings sit one level below the section heading (h2 on its own page, h3 on the homepage).
  const SubHeading = headingLevel === "h1" ? "h2" : "h3";

  return (
  <section id="pricing" className="py-32 container">
    <p className="text-xs uppercase tracking-[0.25em] mb-4"> Pricing</p>
    <Heading className="font-display text-5xl md:text-7xl leading-[1.05] mb-20 max-w-3xl">
      Our Digital Marketing Agency <em>Pricing </em> & Packages.
    </Heading>
    <div className="grid md:grid-cols-3 gap-6">
      {plans.map((p, i) => (
        <motion.div
          key={p.t}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: p.featured ? -16 : 0 }}
          whileHover={{ y: p.featured ? -28 : -10, rotate: i === 1 ? 0 : i === 0 ? -1 : 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: i * 0.1 }}
          style={{ backgroundColor: p.bg }}
          className="relative rounded-[2rem] p-8 text-zinc-900 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.4)] overflow-hidden"
        >
          <div className="absolute -top-6 -right-6 text-[8rem] leading-none opacity-20 select-none">
            {p.emoji}
          </div>
          {p.featured && (
            <div className="inline-block mb-4 rounded-full bg-zinc-900 text-white px-3 py-1 text-[10px] uppercase tracking-widest">
              Most loved
            </div>
          )}
          <div className="flex justify-between items-start mb-8 relative">
            <div className="font-display text-3xl">{p.t}</div>
            <span className="text-xs uppercase tracking-widest opacity-70">{p.d}</span>
          </div>
          <div className="font-display text-7xl mb-8 relative">{p.p}</div>
          <ul className="space-y-3 text-sm mb-8 relative">
            {p.f.map(f => (
              <li key={f} className="flex gap-2 items-start">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-zinc-900" />{f}
              </li>
            ))}
          </ul>
          <a
            href="/contact"
            className="relative block text-center rounded-full py-3.5 text-sm font-medium bg-zinc-900 text-white hover:bg-zinc-800 transition"
          >
            Get started  
          </a>
        </motion.div>
      ))}
    </div>



{/* Bottom CTA Section */}<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7 }}
  className="mt-20 relative overflow-hidden rounded-[2rem] border border-border bg-foreground/10 px-8 py-14 md:px-16 text-center"
>
  {/* Background Glow */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_60%)] pointer-events-none" />

  <div className="relative max-w-3xl mx-auto">
    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
      Free Consultation
    </p>

    <SubHeading className="font-display text-4xl md:text-6xl leading-[1.05] mb-6 text-balance">
      Not sure which package is <em>right for you?</em>
    </SubHeading>

    <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
      We’ll analyze your business for free and recommend exactly what you need.
      No pressure. No obligation. Just honest advice tailored to your goals.
    </p>

    <div className="flex items-center justify-center gap-4 flex-wrap">
      {/* Primary CTA */}
      <a
        href="/contact"
        className="group inline-flex items-center gap-3 rounded-full bg-foreground text-background pl-7 pr-3 py-3.5 text-sm font-medium hover:opacity-90 transition-all"
      >
        Get Your Free Consultation

        <span className="grid place-items-center w-10 h-10 rounded-full bg-background text-foreground transition-transform duration-300 group-hover:rotate-45">
          <ExternalLink className="w-4 h-4" />
        </span>
      </a>


    </div>
  </div>
</motion.div>
  </section>
);
};
