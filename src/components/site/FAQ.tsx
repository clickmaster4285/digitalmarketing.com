"use client";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useState } from "react";
import { SectionTag } from "@/components/site/SectionTag";

const faqs = [
  {
    q: "What does a digital marketing agency do?",
    a: "A digital marketing agency helps businesses attract, engage, and convert customers through online channels such as SEO, PPC advertising, social media marketing, content marketing, email marketing, and website optimization.",
  },
  {
    q: "What services does a digital marketing agency provide?",
    a: "Digital marketing agencies typically provide SEO, local SEO, Google Ads management, social media marketing, content marketing, email marketing, web design, conversion rate optimization, analytics, and lead generation services.",
  },
  {
    q: "How do I choose the right digital marketing agency?",
    a: "Choose an agency that understands your business goals, has experience with the services you need, provides transparent reporting, explains its strategy clearly, and can demonstrate results through case studies, reviews, or client success stories.",
  },
  {
    q: "Is digital marketing effective for small businesses?",
    a: "Yes. Digital marketing can help small businesses increase online visibility, reach targeted customers, generate qualified leads, and compete with larger companies through SEO, local search, paid advertising, social media, and content marketing.",
  },
  {
    q: "How long does digital marketing take to produce results?",
    a: "Results depend on the marketing channel. PPC campaigns can generate traffic and leads quickly, whereas SEO and content marketing typically take several months to build sustainable organic visibility and authority.",
  },
];

export const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-32 container">
      <div className="grid md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <SectionTag className="mb-4">FAQ</SectionTag>
          <h2 className="font-display text-5xl md:text-6xl leading-[1.05]">
            Frequently Asked <em>Questions</em>
          </h2>
        </div>
        <div className="md:col-span-8 divide-y divide-border border-y border-border">
          {faqs.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex justify-between items-center py-6 text-left"
              >
                <span className="font-display text-2xl md:text-3xl">{f.q}</span>
                <span className={`text-2xl transition-transform ${open === i ? "rotate-45" : ""}`}>+</span>
              </button>
              <div className={`grid transition-all duration-500 ${open === i ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden text-muted-foreground max-w-xl">{f.a}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};