// src/components/locations/LocationCTA.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Send, CheckCircle2, Phone, Mail, MapPin, Clock } from "lucide-react";

interface LocationCTAProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  locationName: string;
}

export default function LocationCTA({
  title,
  description,
  buttonText,
  buttonLink,
  locationName,
}: LocationCTAProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.4, 1, 1, 0.4]);

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Send lead to ClickMasters CRM
    const leadData = {
      name: formState.name,
      email: formState.email,
      phone: formState.phone,
      message: formState.message,
      website: "clickmastersdigitalmarketing.com",
      service: "Digital Marketing",
      landingPage: window.location.href,
      referrer: document.referrer,
      utm_source: new URLSearchParams(window.location.search).get("utm_source") || "",
      utm_medium: new URLSearchParams(window.location.search).get("utm_medium") || "",
      utm_campaign: new URLSearchParams(window.location.search).get("utm_campaign") || "",
      utm_term: new URLSearchParams(window.location.search).get("utm_term") || "",
      utm_content: new URLSearchParams(window.location.search).get("utm_content") || "",
    };

    try {
      await fetch("https://crm.clickmasters.pk/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData),
      });
    } catch (err) {
      console.error("Lead submission failed:", err);
    }

    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-black text-white relative overflow-hidden"
    >
      {/* Colorful Background Effects */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#FF3D77]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-[#6C5CE7]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FFB020]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Floating blobs */}
      <div className="absolute top-[10%] right-[5%] w-48 h-48 bg-[#FF3D77]/5 rounded-full blur-2xl pointer-events-none float-a" />
      <div className="absolute bottom-[20%] left-[3%] w-56 h-56 bg-[#6C5CE7]/5 rounded-full blur-2xl pointer-events-none float-b" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50 pointer-events-none" />

      {/* Grain overlay */}
      <div className="grain absolute inset-0 pointer-events-none opacity-20" />

      <motion.div style={{ opacity }} className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT: Content */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
              viewport={{ once: true }}
            >
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF3D77] animate-pulse" />
                <span className="text-xs font-medium uppercase tracking-wider text-white/70">
                  Get Started
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 text-white">
                {title}
              </h2>

              <div className="w-20 h-1 bg-gradient-to-r from-[#FF3D77] to-[#6C5CE7] rounded-full mb-6" />

              <p className="text-white/80 text-lg leading-relaxed mb-8">
                {description}
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-white/60">
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-[#FF3D77]" />
                  </div>
                  <a href="tel:+13252024074">+1 325 202 4074</a>
                </div>
                <div className="flex items-center gap-3 text-sm text-white/60">
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-[#6C5CE7]" />
                  </div>
                  <a href="mailto:sales@clickmastersdigitalmarketing.com">
                    sales@clickmastersdigitalmarketing.com
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm text-white/60">
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-[#FFB020]" />
                  </div>
                  <span>{locationName}, USA</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-white/60">
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-[#FF3D77]" />
                  </div>
                  <span>Mon-Fri: 9am - 6pm</span>
                </div>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center gap-6 mt-8 pt-6 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-display font-bold text-white">3,500+</span>
                  <span className="text-xs text-white/40">Clients</span>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-display font-bold text-white">10+</span>
                  <span className="text-xs text-white/40">Years</span>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="flex items-center gap-2">
                  <div className="flex text-[#FFB020]">{"★".repeat(5)}</div>
                  <span className="text-xs text-white/40">4.9/5</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Contact Form */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.65, 0, 0.35, 1] }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#FF3D77]/10 flex items-center justify-center">
                  <Send className="w-5 h-5 text-[#FF3D77]" />
                </div>
                <div>
                  <h3 className="text-lg font-display font-semibold text-white">Send us a message</h3>
                  <p className="text-xs text-white/40">We'll respond within 24 hours</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/30 focus:border-[#FF3D77]/50 focus:outline-none transition-all duration-300"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/30 focus:border-[#FF3D77]/50 focus:outline-none transition-all duration-300"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone number"
                    value={formState.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/30 focus:border-[#FF3D77]/50 focus:outline-none transition-all duration-300"
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="Tell us about your project..."
                    rows={3}
                    value={formState.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/30 focus:border-[#FF3D77]/50 focus:outline-none transition-all duration-300 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FF3D77] to-[#6C5CE7] text-white rounded-xl font-medium hover:opacity-90 transition-all hover:scale-[1.02] group"
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-white/30">
                  We'll never share your information. Privacy guaranteed.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}