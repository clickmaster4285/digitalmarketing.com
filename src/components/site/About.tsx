import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { SectionTag } from "@/components/site/SectionTag";

// Each stat title is split into two lines so all four headings line up.
const stats = [
  { n: ["97% of", "consumers"], l: "search online before making a purchase decision" },
  { n: ["Mobile", "devices"], l: "drive more than 60% of all web traffic globally" },
  { n: ["Social media", "ads"], l: "helps businesses cut waste and multiply ROI like never before" },
  { n: ["2.8x", "faster"], l: "Businesses that invest in digital marketing grow 2.8x faster than those that don't" },
];

export const About = () => (
  <section id="about" className="py-32 container">
    <div className="grid md:grid-cols-12 gap-16 items-start">
      <div className="md:col-span-7">
        <SectionTag className="mb-4">Why This Matters</SectionTag>
        <h2 className="font-display text-5xl md:text-7xl leading-[1.02] text-balance">
          Why <em className="text-brand">Digital Marketing</em> Matters More Than Ever
        </h2>
      </div>
      <div className="md:col-span-5 space-y-6 text-lg text-muted-foreground md:pt-6">
        <p className="border-l-2 border-brand pl-4 font-display italic text-2xl md:text-3xl leading-snug text-foreground">
          The world has moved online and so have your customers.
        </p>
        <p>Today, over 5.4 billion people use the internet daily. Your competitors are already reaching them. Digital marketing spending in the U.S. alone has crossed $298 billion, with businesses investing nearly half of their entire marketing budget into digital channels. Mobile, social media, and AI-powered campaigns are leading this shift and the gap between businesses that adapt and those that don't is growing every single day.</p>
      </div>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 pt-12 border-t border-border">
      {stats.map((s, i) => (
        <motion.div
          key={s.l}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
        >
          <div className="font-display text-3xl lg:text-5xl xl:text-6xl leading-[1.05] text-foreground">
            {s.n[0]}
            <br />
            {s.n[1]}
          </div>
          <div className="text-sm text-muted-foreground mt-2">{s.l}</div>
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
      
          <h3 className="font-display text-4xl md:text-6xl leading-[1.05] mb-6 text-balance">
           Ready to Work With a Digital Marketing Company That Puts Results Before <em>Everything Else? </em>
          </h3>
      
        
      
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {/* Primary CTA */}
            <a
              href="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-foreground text-background pl-7 pr-3 py-3.5 text-sm font-medium hover:opacity-90 transition-all"
            >
             Book Your Free Strategy Consultation Today
      
              <span className="grid place-items-center w-10 h-10 rounded-full bg-background text-foreground transition-transform duration-300 group-hover:rotate-45">
                <ExternalLink className="w-4 h-4" />
              </span>
            </a>
      
      
          </div>
        </div>
      </motion.div>
  </section>
);
