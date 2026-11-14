"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import p4 from "@/assets/project-4.jpg";
import { ExternalLink } from "lucide-react";
import { IllustrativeBadge, IllustrativeResultsNotice } from "@/components/site/IllustrativeResults";

const projects = [
  {
    img: p1,
    title: "Home Services Dallas, Texas",
    tag: "Local Plumbing Company",
    year: "312% More Leads",
    problem:
      "This Dallas-based plumbing company was spending $3,000 per month on Google Ads with almost no measurable return. They had no organic search presence and were losing market share to competitors who dominated local search results.",
    solution:
      "We performed a full audit of their Google Ads account, eliminated wasted spend, rebuilt their campaigns around high-intent local keywords, and launched a local SEO strategy that targeted the most valuable service searches in their area. We also fully optimized their Google Business Profile to improve local map visibility.",
    stats: [
      "312% increase in qualified inbound leads within 90 days",
      "Cost per lead dropped from $185 to $42",
      "Google organic ranking moved from page 4 to #2 position",
      "Monthly call volume increased by over 200%",
    ],
  },
  {
    img: p2,
    title: "E-Commerce New York",
    tag: "Online Fashion Retail Brand",
    year: "5.4x ROAS",
    problem:
      "This New York-based online retailer had strong website traffic but poor conversion rates. Their social media ad campaigns were producing high spend and low returns, making profitability difficult.",
    solution:
      "We rebuilt their Facebook and Instagram ad funnels with improved audience targeting, creative messaging, retargeting strategies, and redesigned product landing pages to improve conversion rates and average order value.",
    stats: [
      "ROAS improved from 0.9x to 5.4x within 60 days",
      "Revenue increased by $180,000 in the first quarter",
      "Cart abandonment reduced by 38%",
      "Cost per acquisition dropped by 61%",
    ],
  },
  {
    img: p3,
    title: "Legal Services Miami, Florida",
    tag: "Personal Injury Law Firm",
    year: "430% Traffic Growth",
    problem:
      "Despite being a well-respected firm, this Miami-based law firm had virtually no online visibility and relied entirely on referrals.",
    solution:
      "We implemented a full SEO strategy including technical optimization, legal content creation, link building, and Google Ads campaigns to generate immediate leads while organic rankings grew.",
    stats: [
      "Page 1 rankings for 22 high-value keywords",
      "Organic traffic grew by 430% over 6 months",
      "Consultation requests increased 3x",
      "Case intake volume grew by 85%",
    ],
  },
  {
    img: p4,
    title: "Healthcare Los Angeles, California",
    tag: "Multi-Location Dermatology Clinic",
    year: "67% More Patients",
    problem:
      "A multi-location dermatology practice struggled with weak local visibility, low ratings, and no unified digital strategy.",
    solution:
      "We executed a local SEO strategy across all locations, improved Google Business Profiles, launched high-intent ad campaigns, and implemented reputation management and content marketing systems.",
    stats: [
      "New patient bookings increased by 67%",
      "Google rating improved from 3.9 to 4.8",
      "All locations ranked in Local 3-Pack",
      "Monthly revenue increased by $95,000",
    ],
  },
];

const ProjectCard = ({ p, i }: { p: (typeof projects)[0]; i: number }) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const offset = i % 2 === 0 ? "md:mt-0" : "md:mt-32";

  return (
    <div ref={ref} className={`relative ${offset}`}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="overflow-hidden rounded-2xl group cursor-pointer "
      >
      <motion.div
  style={{ y }}
  className="aspect-[4/3] overflow-hidden relative leading-none"
>
  <Image
    src={p.img}
    alt={p.title}
    className="block w-full h-full object-cover transform-gpu will-change-transform transition-transform duration-[1.2s] ease-out group-hover:scale-105"
  />
</motion.div>

      <div className="p-5 md:p-8">
          <div className="flex justify-between items-start gap-4 mb-5">
            <div>
              <IllustrativeBadge tone="light" className="mb-3" />
              <h3 className="font-display text-3xl leading-tight">
                {p.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-2">
                {p.tag}
              </p>
            </div>

            <span className="text-xs rounded-full bg-foreground text-background px-3 py-1 whitespace-nowrap">
              {p.year}
            </span>
          </div>

          <div className="mb-5">
            <p className="text-xs uppercase tracking-widest mb-2 font-bold">
              The Problem
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {p.problem}
            </p>
          </div>

          <div className="mb-6">
            <p className="text-xs uppercase tracking-widest font-bold mb-2">
              Our Solution
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {p.solution}
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest font-bold mb-2">
              Results
            </p>

            {p.stats.map((s) => (
              <div
                key={s}
                className="flex items-start gap-3 text-sm text-muted-foreground"
              >
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-foreground shrink-0" />
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const Projects = () => {
  const [showAll, setShowAll] = useState(false);

  return (
    <section id="solutions" className="py-24 md:py-32 container px-4 md:px-0">
      <div className="flex items-end justify-between mb-20 flex-wrap gap-6">
      <div className="text-center md:text-left">
          <p className="text-xs uppercase tracking-[0.25em] opacity-60 mb-4">
            Illustrative Case Studies
          </p>

          <h2 className="font-display text-5xl md:text-7xl leading-[1.05] max-w-5xl">
            Example Results From a <em>Digital Marketing Company</em>.
          </h2>

          <p className="mt-6 text-muted-foreground text-lg max-w-3xl leading-relaxed">
            Here are four examples of how our digital marketing approach can
            help US businesses work toward measurable growth.
          </p>
          <IllustrativeResultsNotice tone="light" className="mt-6" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-x-10 md:gap-y-24">
        {(showAll ? projects : projects.slice(0, 2)).map((p, i) => (
          <ProjectCard key={p.title} p={p} i={i} />
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <button
          onClick={() => setShowAll((prev) => !prev)}
          className="px-6 py-3 rounded-full bg-foreground text-background text-sm hover:opacity-80 transition"
        >
          {showAll ? "Show Less" : "See More"}
        </button>
      </div>




      {/* Bottom CTA Section */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7 }}
 className="mt-24 relative overflow-hidden rounded-[2rem] border border-border bg-background px-5 md:px-16 py-12 md:py-14 text-center"
>
  {/* Background Glow */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.06),transparent_60%)] pointer-events-none" />

  <div className="relative max-w-3xl mx-auto">
    <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
      Case Study Insights
    </p>

    <h3 className="font-display text-4xl md:text-6xl leading-[1.05] mb-6 text-balance">
      Ready to work toward results like <em>these?</em>
    </h3>

    <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto text-balance">
      We’ve helped companies increase leads, revenue, and visibility across SEO,
      ads, and conversion systems. Your business could be next.
    </p>

    <div className="flex items-center justify-center gap-4 flex-wrap">
      <a
        href="/contact"
        className="group inline-flex items-center gap-3 rounded-full bg-foreground text-background pl-7 pr-3 py-3.5 text-sm font-medium hover:opacity-90 transition-all"
      >
        Get a Free Growth Plan

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