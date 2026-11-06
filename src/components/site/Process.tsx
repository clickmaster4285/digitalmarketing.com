import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const steps = [
  {
    n: "01",
    t: "Discovery Call",
    d: "We learn about your business, goals, and challenges.",
  },
  {
    n: "02",
    t: "Audit & Strategy",
    d: "We analyze your current digital presence and build a custom plan.",
  },
  {
    n: "03",
    t: "Onboarding",
    d: "We set up tracking, accounts, and creative assets.",
  },
  {
    n: "04",
    t: "Launch",
    d: "Campaigns go live across chosen channels.",
  },
  {
    n: "05",
    t: "Optimize",
    d: "We test, refine, and improve performance weekly.",
  },
  {
    n: "06",
    t: "Report & Scale",
    d: "Monthly reporting with clear next steps to scale what's working.",
  },
];

export const Process = ({
  headingLevel = "h2",
}: {
  headingLevel?: "h1" | "h2";
} = {}) => {
  // h1 when this section is the whole page (/process), h2 on the homepage.
  const Heading = headingLevel;
  const SubHeading = headingLevel === "h1" ? "h2" : "h3";

  return (
  <section id="process" className="py-32 container">
    <div className="grid md:grid-cols-12 gap-12 mb-20">
      <div className="md:col-span-4">
        <p className="text-xs uppercase tracking-[0.25em] mb-4"> Process</p>
      </div>
      <div className="md:col-span-8">
        <Heading className="font-display text-5xl md:text-7xl leading-[1.05] text-balance">
          Our <em className="font-display italic">Process</em>
        </Heading>
        <p className="mt-6 text-muted-foreground text-lg md:text-xl max-w-2xl text-balance">
          From discovery call to strategy, launch, optimization, and monthly reporting  our six-step process keeps you informed at every stage. We continuously test and refine campaigns to improve results over time.
        </p>
      </div>
    </div>

    <div className="space-y-px bg-border">
      {steps.map((s, i) => (
        <motion.div
          key={s.n}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: i * 0.08 }}
          className="grid md:grid-cols-12 gap-6 bg-background py-10 group"
        >
          <div className="md:col-span-2 font-display text-3xl opacity-50 group-hover:opacity-100 transition">{s.n}</div>
          <div className="md:col-span-4 font-display text-4xl">{s.t}</div>
          <div className="md:col-span-5 text-muted-foreground">{s.d}</div>
          <div className="md:col-span-1 text-right text-2xl opacity-0 group-hover:opacity-100 transition">↗</div>
        </motion.div>
      ))}
    </div>

    {/* Bottom CTA Section */}
    <motion.div
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
          Let's Build Your Custom Digital <em>Marketing Strategy</em> Starting Today.
        </SubHeading>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          {/* Primary CTA */}
          <a
            href="/contact"
            className="group inline-flex items-center gap-3 rounded-full bg-foreground text-background pl-7 pr-3 py-3.5 text-sm font-medium hover:opacity-90 transition-all"
          >
            Get My Free Marketing Audit
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