import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import servicesImg from "@/assets/services.webp";
import Image from "next/image";

const services = [
  {
    n: "01",
    t: "Search Engine Optimization (SEO)",
    d: "We help you rank higher on Google with technical SEO, on-page optimization, and local SEO strategies. Our digital marketing and SEO services are built to drive consistent, long-term organic traffic and qualified leads to your website."
  },
  {
    n: "02",
    t: "Pay-Per-Click (PPC) Advertising",
    d: "We create and manage high-converting Google Ads, Bing Ads, and paid social campaigns that put your business in front of ready-to-buy customers. Every campaign is optimized continuously to lower your cost per lead and maximize ROI."
  },
  {
    n: "03",
    t: "Social Media Marketing",
    d: "We build your brand presence across Facebook, Instagram, LinkedIn, and TikTok with engaging content and community management. Our social strategies increase awareness, engagement, and drive real business inquiries."
  },
  {
    n: "04",
    t: "Content Marketing",
    d: "We create blog posts, landing pages, and guides that educate your audience and build trust in your brand. Great content also strengthens your SEO strategy and supports long-term organic growth."
  },
  {
    n: "05",
    t: "Email Marketing",
    d: "We design automated email sequences and campaigns that nurture leads and turn them into loyal, repeat customers. Our email strategies keep your audience engaged at every stage of the buyer journey."
  },
  {
    n: "06",
    t: "Web Design & Development",
    d: "We build fast, mobile-friendly, and conversion-optimized websites that turn visitors into leads. Your website becomes the foundation for every other digital marketing service we provide."
  },
  {
    n: "07",
    t: "Online Reputation Management",
    d: "We help you build and protect your brand's online reputation through review generation and management. A strong reputation increases trust and directly impacts your local search rankings."
  },
  {
    n: "08",
    t: "Local SEO & Google Business Profile Optimization",
    d: "We optimize your Google Business Profile and local listings to help you rank in the map pack and local searches. This service is essential for businesses wanting to attract customers near me."
  },
  {
    n: "09",
    t: "Digital Marketing Consulting Services",
    d: "For businesses wanting expert guidance without full management, we offer digital marketing consulting services. We help you build strategy, choose the right channels, and execute an in-house plan with confidence."
  },
];

export const Services = () => (
  <section id="services" className="py-32 container">
    <div className="grid md:grid-cols-12 gap-12 mb-20 items-center">
      {/* LEFT SIDE IMAGE */}
      <div className="md:col-span-4 flex justify-center md:justify-start">
        <Image
          src={servicesImg}
          alt="Clickmasters Services"
          width={500}
          height={500}
          className="w-full max-w-sm h-auto object-contain"
          priority
        />
      </div>

      {/* RIGHT SIDE TEXT */}
      <div className="md:col-span-8">
        <p className="text-xs uppercase tracking-[0.25em] opacity-60 mb-4">
          Services
        </p>

        <h2 className="font-display text-5xl md:text-7xl leading-[1.05] text-balance">
          Our <em>Digital Marketing</em> Services
        </h2>

        <p className="mt-6 text-muted-foreground text-lg md:text-xl max-w-2xl text-balance">
          At Clickmasters, we provide complete digital marketing services designed to help your business get found, get leads, and get results. Here's what we offer:
        </p>
      </div>
    </div>

    <div className="grid md:grid-cols-3 gap-px bg-border">
      {services.map((s, i) => (
        <motion.div
          key={s.n}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: i * 0.1 }}
          className="group bg-background p-10 hover:bg-secondary transition-colors duration-500 relative overflow-hidden"
        >
          <div className="flex items-start justify-between mb-12">
            <span className="text-sm text-muted-foreground">{s.n}</span>
            <span className="text-2xl opacity-60 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 transition-all duration-500">↗</span>
          </div>
          <h3 className="font-display text-3xl md:text-4xl mb-4">{s.t}</h3>
          <p className="text-muted-foreground max-w-md">{s.d}</p>
        </motion.div>
      ))}
    </div>

  {/* Bottom CTA Section */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7 }}
  className="mt-20 relative overflow-hidden rounded-[2rem] border border-border bg-background px-8 py-14 md:px-16 text-center"
>
  {/* Background Glow */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.06),transparent_60%)] pointer-events-none" />

  <div className="relative max-w-3xl mx-auto">
    <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
      Get Started
    </p>

    <h3 className="font-display text-4xl md:text-6xl leading-[1.05] mb-6 text-balance">
      Get Started With <em>Clickmasters</em> Today
    </h3>

    <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto text-balance">
      You don't need to figure out digital marketing alone. Our team is ready to build a custom strategy that fits your business, your industry, and your goals.
    </p>

    <div className="flex items-center justify-center gap-4 flex-wrap">
      {/* Primary CTA */}
      <a
        href="/contact"
        className="group inline-flex items-center gap-3 rounded-full bg-foreground text-background pl-7 pr-3 py-3.5 text-sm font-medium hover:opacity-90 transition-all"
      >
        Book Your Free Consultation

        <span className="grid place-items-center w-10 h-10 rounded-full bg-background text-foreground transition-transform duration-300 group-hover:rotate-45">
          <ExternalLink className="w-4 h-4" />
        </span>
      </a>
    </div>
  </div>
</motion.div>
  </section>
);