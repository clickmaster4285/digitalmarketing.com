import { motion } from "framer-motion";
import { useState } from "react";

const solutions = [
  { 
    i: "🔧", 
    t: "Home Services Digital Marketing", 
    d: "We provide digital marketing for home services businesses like HVAC, plumbing, electrical, and roofing companies. Our HVAC digital marketing services help you generate more calls, bookings, and local leads year-round.",
    c: "bg-[#FFF7E6]" 
  },
  { 
    i: "🏥", 
    t: "Healthcare & Dental Digital Marketing", 
    d: "Our healthcare digital marketing services help clinics, hospitals, and medical practices attract more patients through local SEO and reputation management. We also offer specialized dental digital marketing services to help practices fill their appointment calendars.",
    c: "bg-[#F0FFF4]" 
  },
  { 
    i: "🏠", 
    t: "Real Estate Digital Marketing", 
    d: "We help agents, brokers, and real estate firms generate quality buyer and seller leads. Our real estate digital marketing services combine local SEO, paid ads, and social media to keep your listings in front of the right audience.",
    c: "bg-[#F0F4FF]" 
  },
  { 
    i: "💰", 
    t: "Financial Services Digital Marketing", 
    d: "We provide digital marketing for financial services firms, including banks, advisors, and insurance agencies. As a trusted financial services digital marketing agency, we focus on building trust and compliance-friendly lead generation strategies.",
    c: "bg-[#F3EEFF]" 
  },
  { 
    i: "🚗", 
    t: "Automotive Digital Marketing", 
    d: "Our automotive digital marketing services help dealerships and auto service centers drive more showroom visits and service appointments. We combine local SEO, PPC, and social campaigns to keep your lot full.",
    c: "bg-[#EAF7FF]" 
  },
  { 
    i: "🛍️", 
    t: "Ecommerce & Retail Digital Marketing", 
    d: "We deliver digital marketing services for ecommerce brands looking to scale online sales. From Google Shopping to paid social, our ecommerce digital marketing services are built to increase conversions and average order value.",
    c: "bg-[#FFF0FA]" 
  },
  { 
    i: "🏭", 
    t: "Manufacturing Digital Marketing", 
    d: "We help industrial and manufacturing companies generate B2B leads through targeted digital campaigns. Our strategies are designed for long sales cycles and complex buyer journeys common in this industry.",
    c: "bg-[#F5F5F5]" 
  },
  { 
    i: "🏨", 
    t: "Hospitality & Hotel Digital Marketing", 
    d: "We provide digital marketing services for hotels and hospitality businesses to increase direct bookings and reduce dependency on third-party platforms. Our campaigns focus on visibility, reviews, and seasonal promotions.",
    c: "bg-[#FFF8F0]" 
  },
  { 
    i: "👨‍💼", 
    t: "Professional Services Digital Marketing", 
    d: "Our digital marketing for professional services covers law firms, accounting practices, and consulting businesses. We build authority-driven strategies that generate high-value client inquiries.",
    c: "bg-[#FFF1F1]" 
  },
  { 
    i: "💻", 
    t: "Technology & SaaS Digital Marketing", 
    d: "We help tech companies and SaaS brands generate qualified demos and trial sign-ups through content marketing, PPC, and LinkedIn campaigns tailored to B2B buyer journeys.",
    c: "bg-[#F5F0FF]" 
  },
];

export const Solutions = ({
  headingLevel = "h2",
}: {
  headingLevel?: "h1" | "h2";
}) => {
  const [showAll, setShowAll] = useState(false);
  const Heading = headingLevel;

  const visibleSolutions = showAll ? solutions : solutions.slice(0, 6);

  return (
    <section id="industries" className="py-32 container">
      <div className="grid md:grid-cols-12 gap-12 mb-20">
        <div className="md:col-span-4">
          <p className="text-xs uppercase tracking-[0.25em] opacity-60 mb-4">
            Industries We Serve
          </p>
        </div>

        <div className="md:col-span-8">
          <Heading className="font-display text-5xl md:text-7xl leading-[1.05] text-balance">
            Industries <em className="font-display italic">We Serve</em>
          </Heading>
          <p className="mt-6 text-muted-foreground text-lg md:text-xl max-w-2xl text-balance">
            Clickmasters provides specialized digital marketing services for small business and enterprise clients across a wide range of industries. Here's how we help each one grow:
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {visibleSolutions.map((s, i) => (
          <motion.div
            key={s.t}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            whileHover={{ y: -6 }}
            className="rounded-3xl p-8 text-zinc-900 border border-black/10 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.25)] relative overflow-hidden group"
          >
            <div className={`absolute inset-0 ${s.c}`} aria-hidden />
            <div className="relative">
              <div className="text-5xl mb-6">{s.i}</div>
              <h3 className="font-display text-2xl md:text-3xl mb-3">{s.t}</h3>
              <p className="text-sm opacity-80 max-w-xs leading-relaxed">{s.d}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* See More Button */}
      {solutions.length > 6 && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="px-6 py-3 rounded-full border border-black/20 text-sm font-medium hover:bg-black hover:text-white transition"
          >
            {showAll ? "Show Less" : "See More"}
          </button>
        </div>
      )}
    </section>
  );
};