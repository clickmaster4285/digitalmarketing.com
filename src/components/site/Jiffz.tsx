import { motion } from "framer-motion";
import Image from "next/image";
import g1 from "@/assets/gif-1.jpg";
import g2 from "@/assets/gif-2.jpg";
import g3 from "@/assets/gif-3.jpg";
import g4 from "@/assets/gif-4.jpg";
import { ExternalLink } from "lucide-react";
import { SectionTag } from "@/components/site/SectionTag";

const gifs = [
  {
    src: g1,
    t: "More Traffic, Better Leads & Higher ROI",
    d: "Clients see a massive increase in qualified website visitors, attract high-intent prospects ready to buy, and get maximum conversions from every dollar spent. No wasted budget. No wrong audience. Just real results that directly grow your bottom line.",
    bg: "#1a1a1a",
    fg: "#fff",
    rot: -3,
  },
  {
    src: g2,
    t: "Stronger Google Rankings & Dominant Local Presence",
    d: "We push your business to the top of Google search results and Google Maps putting you in front of customers at the exact moment they're searching. From local service businesses to national brands, we make you the most visible and most trusted option in your market.",
    bg: "#FFE27A",
    fg: "#1a1a1a",
    rot: 2,
  },
  {
    src: g3,
    t: "More Calls, Bookings, Inquiries & Ecommerce Sales",
    d: "Whether it's phone calls, form fills, appointment bookings, store visits, or direct online purchases every campaign we run is built to drive real actions. Retail and ecommerce clients see consistent monthly revenue growth through Google Shopping, Meta ads, and conversion-focused SEO.",
    bg: "#FFC2D1",
    fg: "#1a1a1a",
    rot: -2,
  },
  {
    src: g4,
    t: "Stronger Reputation, Transparent Reporting & Long-Term Growth",
    d: "Clients build a powerful, trusted brand through review management, consistent content, and professional messaging across every platform. And you'll always know exactly how your marketing is performing with clear monthly reports covering traffic, leads, conversions, and ROI, backed by a team fully committed to your long-term success.",
    bg: "#A8EFE0",
    fg: "#1a1a1a",
    rot: 3,
  },
];

export const Jiffz = () => (
  <section className="py-32 container">
    <div className="grid md:grid-cols-12 gap-10 items-end mb-16">
      <div className="md:col-span-7">
        <SectionTag className="mb-4">Results</SectionTag>
        <h2 className="font-display text-5xl md:text-7xl leading-[1.05] text-balance">
          Results <em>Our Clients </em>Actually Get
        </h2>
      </div>
      <p className="md:col-span-5 text-muted-foreground">
      We don't just run campaigns we deliver outcomes that directly impact your revenue, visibility, and growth.
      </p>
    </div>

    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {gifs.map((g, i) => (
        <motion.figure
          key={i}
          initial={{ opacity: 0, y: 50, rotate: 0 }}
          whileInView={{ opacity: 1, y: i % 2 ? 24 : 0, rotate: g.rot }}
          whileHover={{ rotate: 0, y: -10, scale: 1.04 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: i * 0.08 }}
          style={{ backgroundColor: g.bg, color: g.fg }}
          className="rounded-3xl overflow-hidden p-3 shadow-[0_25px_60px_-25px_rgba(0,0,0,0.4)]"
        >
          <div className="aspect-square overflow-hidden rounded-2xl bg-black/5">
            <motion.div
              className="w-full h-full relative"
              animate={{ scale: [1, 1.06, 1], rotate: [0, 3, 0] }}
              transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src={g.src} alt={g.t}
                fill
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
          <figcaption className=" px-3 pt-4 pb-2">
            <div className="font-display text-xl">{g.t}</div>
            <div className="text-xs opacity-70">{g.d}</div>
          </figcaption>
        </motion.figure>
      ))}
    </div>

     
  </section>
);
