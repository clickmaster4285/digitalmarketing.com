import { motion } from "framer-motion";

const items = [
  {
    q: "Clickmasters completely changed how our business operates online. Within four months, our phone was ringing consistently with qualified leads. It's the best investment we've made in years. If you're looking for a digital marketing agency that actually delivers this is it.",
    a: "James R.",
    r: "Owner ProFix Plumbing, Dallas TX",
    bg: "#BBD3FF",
    rot: -2,
  },
  {
    q: "We'd been burned by two other digital marketing companies before we found Clickmasters. The difference was immediately obvious. They listened, set honest expectations, and started delivering results within the first 30 days. We've been with them ever since.",
    a: "Sarah M.",
    r: "Marketing Director BrightSkin Dermatology, Los Angeles, CA",
    bg: "#A8EFE0",
    rot: 1.5,
  },
  {
    q: "Our Google Ads were a complete disaster before Clickmasters stepped in. They rebuilt everything from scratch and took our ROAS from under 1x to over 6x in less than two months. This digital marketing company knows what they're doing at a level I haven't seen anywhere else.",
    a: "David L.",
    r: "Founder NovaTrend Fashion, New York, NY",
    bg: "#D9C2FF",
    rot: -1,
  },
  {
    q: "The transparency and communication at Clickmasters is unlike any other digital marketing agency I've worked with. I always know exactly what's happening and why. They feel like a genuine partner in our firm's growth not just a vendor collecting a check.",
    a: "Amanda K.",
    r: "Partner Carter & Webb Law Firm, Miami, FL",
    bg: "#FFD6A5",
    rot: 2,
  },
  {
    q: "In one year with Clickmasters, we grew our email list from 800 subscribers to over 14,000 and significantly increased our repeat customer rate. Their approach to digital marketing is strategic, data-driven, and actually creative. Highly recommend.",
    a: "Michael T.",
    r: "CEO FreshRoots Organics, Chicago, IL",
    bg: "#FFB4C6",
    rot: -1.5,
  },

  {
  q: "We saw immediate improvements in both lead quality and conversion rates after working with Clickmasters. They didn’t just increase traffic they brought in the right audience. Our sales team now spends time closing deals instead of chasing cold leads.",
  a: "Robert H.",
  r: "COO Apex Solar Solutions, Houston, TX",
  bg: "#CFF5A8",
  rot: 1,
},
];
export const Testimonials = ({
  headingLevel = "h2",
}: {
  headingLevel?: "h1" | "h2";
} = {}) => {
  // h1 when this section is the whole page (/testimonials), h2 on the homepage.
  const Heading = headingLevel;

  return (
  <section   id="testimonials" className="py-32 container">
    <div className="mb-20 max-w-3xl">
      <p className="text-xs uppercase tracking-[0.25em] opacity-60 mb-6"> What our clients says</p>
      <Heading className="font-display text-5xl md:text-7xl leading-[1.05] text-balance">
  What Business Owners Say About <em>Our Digital Marketing Agency</em>
      </Heading>
         <p className="text-md md:text-xl text-muted-foreground leading-relaxed max-w-4xl mt-4">
        Across industries and across the country, business owners trust Clickmasters as their preferred Digital Marketing Agency. Here's what a few of them have to say: 
          </p>
    </div>
    <div className="grid md:grid-cols-3 gap-8 md:gap-6">
      {items.map((t, i) => (
        <motion.figure
          key={i}
          initial={{ opacity: 0, y: 40, rotate: 0 }}
          whileInView={{ opacity: 1, y: i % 2 ? 24 : 0, rotate: t.rot }}
          whileHover={{ rotate: 0, y: -4, scale: 1.02 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: i * 0.12 }}
          style={{ backgroundColor: t.bg }}
          className="rounded-3xl p-8 md:p-10 text-zinc-900 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)]"
        >
          <div className="text-2xl mb-8 opacity-60">❝</div>
          <blockquote className="font-display text-2xl leading-snug mb-10">
            {t.q}
          </blockquote>
          <hr className="border-zinc-900/15 mb-5" />
          <figcaption className="flex items-center gap-3 text-sm">
            <span className="w-9 h-9 rounded-full bg-zinc-900/10" />
            <span>
              <div className="font-medium">{t.a}</div>
              <div className="opacity-60">{t.r}</div>
            </span>
          </figcaption>
        </motion.figure>
      ))}
    </div>
  </section>
  );
};
