"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle, ArrowRight, Sparkles, Zap, Target, DollarSign } from "lucide-react";
import { SectionTag } from "@/components/site/SectionTag";

const features = [
  {
    icon: <DollarSign className="w-5 h-5" />,
    title: "Budget-Friendly Pricing",
    description: "Get enterprise-grade marketing without the premium price tag. Transparent pricing with no hidden fees."
  },
  {
    icon: <Target className="w-5 h-5" />,
    title: "High-ROI Channels",
    description: "We focus on SEO, PPC, and social channels that generate the highest return for your specific business."
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Quality & Strategy First",
    description: "Affordable doesn't mean low quality. Every campaign is data-driven and built to deliver measurable results."
  },
  {
    icon: <Sparkles className="w-5 h-5" />,
    title: "Tailored for Small Business",
    description: "Strategies designed specifically for small business budgets while delivering results large brands expect."
  }
];

export const AffordableServices = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="relative py-28 overflow-hidden border-t border-border bg-background/50">
      {/* Background accent */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-foreground/5 blur-3xl" />
      </div>

      <div className="container px-4 md:px-0">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="mb-6"
            >
              <SectionTag>Affordable Marketing Solutions</SectionTag>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-display text-[clamp(2.2rem,6vw,4.5rem)] leading-[1.05] tracking-tight text-balance"
            >
              Affordable Digital Marketing Services That Deliver
              <span className="italic font-display text-muted-foreground"> ROI</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed"
            >
              Great marketing shouldn't come with a premium price tag. Clickmasters offers affordable digital marketing services built to maximize every dollar you spend, without cutting corners on quality or strategy.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed"
            >
              Our data-driven digital marketing services focus on channels that generate the highest return, whether that's SEO, PPC, or social media advertising. From startups to growing businesses, we tailor our digital marketing services for small business budgets while still delivering the results larger brands expect.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.9, duration: 0.7 }}
              className="mt-10 flex items-center gap-6 flex-wrap"
            >
              <a href="/contact" className="group inline-flex items-center gap-3 rounded-full bg-foreground text-background pl-6 pr-3 py-3 text-sm font-medium hover:opacity-90 transition">
                Contact Us
                <span className="grid place-items-center w-9 h-9 rounded-full bg-background text-foreground transition-transform group-hover:rotate-45">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </a>
              <a href="#pricing" className="text-sm underline underline-offset-4">View pricing</a>
            </motion.div>
          </div>

          {/* Right Feature Cards */}
          <div className="lg:col-span-5">
            <div className="grid gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                  className="group relative p-6 rounded-2xl border border-border bg-background/60 backdrop-blur hover:bg-background/80 transition-all duration-300 hover:shadow-lg hover:border-foreground/20"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1 p-2 rounded-full bg-foreground/10 text-foreground group-hover:bg-foreground group-hover:text-background transition-colors duration-300">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-base">{feature.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mt-6 p-4 rounded-2xl bg-green-500/5 border border-green-500/20 flex items-center gap-4"
            >
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-sm text-muted-foreground">
                <strong className="text-foreground">100% satisfaction guaranteed</strong>  we earn your business every month
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};