"use client";

import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { GlobeHandle } from "@/components/contact/StippleGlobe";
import {
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
  Mail,
  Loader2,
  Clock,
  Sparkles,
  Users,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const StippleGlobe = lazy(() => import("@/components/contact/StippleGlobe"));

const PORTRAITS = [
  { x: "20%", y: "22%", flag: "https://flagcdn.com/w80/pk.png", country: "Pakistan" },
  { x: "75%", y: "18%", flag: "https://flagcdn.com/w80/us.png", country: "USA" },
  { x: "15%", y: "65%", flag: "https://flagcdn.com/w80/gb.png", country: "United Kingdom" },
  { x: "82%", y: "62%", flag: "https://flagcdn.com/w80/ae.png", country: "UAE" },
  { x: "48%", y: "12%", flag: "https://flagcdn.com/w80/ca.png", country: "Canada" },
  { x: "45%", y: "28%", flag: "https://flagcdn.com/w80/de.png", country: "Germany" },
  { x: "55%", y: "35%", flag: "https://flagcdn.com/w80/fr.png", country: "France" },
  { x: "40%", y: "45%", flag: "https://flagcdn.com/w80/it.png", country: "Italy" },
  { x: "60%", y: "22%", flag: "https://flagcdn.com/w80/es.png", country: "Spain" },
  { x: "35%", y: "18%", flag: "https://flagcdn.com/w80/nl.png", country: "Netherlands" },
  { x: "65%", y: "48%", flag: "https://flagcdn.com/w80/ch.png", country: "Switzerland" },
  { x: "28%", y: "72%", flag: "https://flagcdn.com/w80/au.png", country: "Australia" },
  { x: "72%", y: "75%", flag: "https://flagcdn.com/w80/br.png", country: "Brazil" },
  { x: "80%", y: "40%", flag: "https://flagcdn.com/w80/sa.png", country: "Saudi Arabia" },
  { x: "25%", y: "38%", flag: "https://flagcdn.com/w80/jp.png", country: "Japan" },
  { x: "52%", y: "25%", flag: "https://flagcdn.com/w80/mx.png", country: "Mexico" },
  { x: "38%", y: "32%", flag: "https://flagcdn.com/w80/kr.png", country: "South Korea" },
  { x: "62%", y: "30%", flag: "https://flagcdn.com/w80/sg.png", country: "Singapore" },
  { x: "42%", y: "55%", flag: "https://flagcdn.com/w80/ru.png", country: "Russia" },
  { x: "58%", y: "52%", flag: "https://flagcdn.com/w80/tr.png", country: "Turkey" },
  { x: "48%", y: "65%", flag: "https://flagcdn.com/w80/eg.png", country: "Egypt" },
  { x: "30%", y: "25%", flag: "https://flagcdn.com/w80/se.png", country: "Sweden" },
  { x: "70%", y: "28%", flag: "https://flagcdn.com/w80/my.png", country: "Malaysia" },
  { x: "33%", y: "58%", flag: "https://flagcdn.com/w80/ng.png", country: "Nigeria" },
  { x: "67%", y: "60%", flag: "https://flagcdn.com/w80/ar.png", country: "Argentina" },
  { x: "50%", y: "42%", flag: "https://flagcdn.com/w80/id.png", country: "Indonesia" },
  { x: "42%", y: "22%", flag: "https://flagcdn.com/w80/th.png", country: "Thailand" },
  { x: "58%", y: "18%", flag: "https://flagcdn.com/w80/pl.png", country: "Poland" },
  { x: "35%", y: "48%", flag: "https://flagcdn.com/w80/ma.png", country: "Morocco" },
  { x: "65%", y: "38%", flag: "https://flagcdn.com/w80/ph.png", country: "Philippines" },
  { x: "48%", y: "72%", flag: "https://flagcdn.com/w80/cl.png", country: "Chile" },
  { x: "55%", y: "55%", flag: "https://flagcdn.com/w80/ke.png", country: "Kenya" },
];

const reasons = [
  "Free initial consultation to understand your goals",
  "A dedicated team that responds quickly",
  "Custom strategies — no generic packages",
  "10+ years of experience helping 100+ businesses grow online",
];

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactClient() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [isReady, setIsReady] = useState(false);

  // Refs for GSAP animations
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const globeWrapRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<HTMLDivElement>(null);
  const portraitsRef = useRef<Array<HTMLDivElement | null>>([]);
  const globeApi = useRef<GlobeHandle>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    // Send lead to ClickMasters CRM
    const leadData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      message: formData.message,
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

    let crmSuccess = false;
    try {
      const crmRes = await fetch("https://crm.clickmasters.pk/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData),
      });
      crmSuccess = crmRes.ok;
    } catch (err) {
      console.error("Lead submission failed:", err);
    }

    let emailSuccess = false;
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      emailSuccess = Boolean(data.success);
    } catch (err) {
      console.error("Contact email failed:", err);
    }

    if (crmSuccess || emailSuccess) {
      setSubmitStatus({
        type: "success",
        message: "Thank you! Your message has been sent successfully.",
      });
      setFormData({ name: "", email: "", company: "", phone: "", message: "" });
    } else {
      setSubmitStatus({
        type: "error",
        message: "Sorry, there was an error sending your message. Please try again.",
      });
    }

    setIsSubmitting(false);
    setTimeout(() => setSubmitStatus({ type: null, message: "" }), 5000);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup
      gsap.set(sectionRef.current, { opacity: 0 });
      gsap.set(globeWrapRef.current, { scale: 1.2, yPercent: 30, xPercent: 15 });
      gsap.set(heroContentRef.current, { opacity: 1, pointerEvents: "auto" });
      
      gsap.set(networkRef.current, { opacity: 0, visibility: "hidden" });
      gsap.set(portraitsRef.current, { opacity: 0, scale: 0.6, visibility: "hidden" });

      // Initial reveal
      requestAnimationFrame(() => {
        gsap.set(networkRef.current, { visibility: "visible" });
        gsap.set(portraitsRef.current, { visibility: "visible" });

        gsap.to(sectionRef.current, {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          onComplete: () => setIsReady(true),
        });
      });

      // Main scroll timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=2800",
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      // Step 1: Hero content fades out, globe zooms in
      tl.to(heroContentRef.current, { opacity: 0, y: -60, duration: 0.4 }, 0)
        .to(globeWrapRef.current, { yPercent: 0, scale: 1.8, xPercent: 0, duration: 0.6 }, 0.1)
        // Background stays black - no transition needed

        // Step 2: Network and flags appear
        .to(networkRef.current, { opacity: 1, duration: 0.25 }, 0.5)
        .to(portraitsRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.22,
          stagger: 0.008,
          ease: "back.out(2.2)",
        }, 0.52)

        // Step 3: Network fades out only, background stays black
        .to(networkRef.current, { opacity: 0, duration: 0.2 }, 0.85)

        // Step 4: Globe adjusts position and changes color
        .to(globeWrapRef.current, {
          scale: 1.3,
          xPercent: 35,
          yPercent: 0,
          duration: 0.4,
          ease: "power2.inOut",
          onUpdate: () => globeApi.current?.setColor(0x000000),
          onReverseComplete: () => globeApi.current?.setColor(0xffffff),
        }, 0.85);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const fields: {
    name: keyof FormData;
    label: string;
    type: string;
    placeholder: string;
  }[] = [
    { name: "name", label: "Full Name *", type: "text", placeholder: "John Doe" },
    { name: "email", label: "Email Address *", type: "email", placeholder: "john@example.com" },
  ];

  return (
    <main className="w-full">
      <section
        ref={sectionRef}
        className={`relative h-screen w-full overflow-hidden transition-opacity duration-300 ${
          isReady ? "opacity-100" : "opacity-0"
        }`}
      >
        <div ref={bgRef} className="absolute inset-0 bg-black" />

        {/* Decorative dots - updated for dark background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[8%] top-[18%] h-3 w-3 rounded-full bg-white/20" />
          <div className="absolute right-[12%] top-[12%] h-5 w-5 rounded-full bg-white/20" />
          <div className="absolute left-[45%] top-[8%] h-2 w-2 rounded-full bg-white/20" />
          <div className="absolute right-[6%] bottom-[28%] h-4 w-4 rounded-full bg-white/20" />
          <div className="absolute left-[5%] bottom-[35%] h-2.5 w-2.5 rounded-full bg-white/20" />
        </div>

        {/* Globe */}
        <div ref={globeWrapRef} className="absolute inset-0 will-change-transform">
          <Suspense fallback={null}>
            <StippleGlobe ref={globeApi} />
          </Suspense>
        </div>

        {/* Flags Network */}
        <div ref={networkRef} className="pointer-events-none absolute inset-0">
          {PORTRAITS.map((p, i) => (
            <div
              key={i}
              ref={(el) => { portraitsRef.current[i] = el; }}
              className="absolute h-10 w-10 overflow-hidden rounded-full border-2 border-white/80 shadow-xl -translate-x-1/2 -translate-y-1/2"
              style={{ left: p.x, top: p.y }}
            >
              <img
                src={p.flag.replace("https://flagcdn.com/w80/", "/flags/")}
                alt={p.country}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Hero Content - Screen 1 - Updated for dark background */}
        <div
          ref={heroContentRef}
          className="relative z-10 mx-auto flex h-full max-w-[90rem] flex-col justify-center px-8 lg:px-16"
        >
          <div className="max-w-[90rem] lg:pr-[28rem]">
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.25em] text-white/60">
              Contact Us
            </p>
            <h1 className="text-5xl leading-[1.05] font-bold sm:text-6xl lg:text-7xl text-white" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
              {"Let's Grow Your Business "}
              <span className="text-[#FF2E86]">Together</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/70 leading-relaxed">
              Have questions or ready to get started? Reach out to Clickmasters Digital Marketing — we'd love to hear about your business and show you how we can help you grow online.
            </p>
            <a
              href="#contact-form"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black transition-all hover:opacity-90 hover:scale-105"
            >
              Get In Touch
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Rest of the page content below the pinned section */}
      <div className="relative z-20 bg-background">
        <div className="container py-16 md:py-24">
          {/* Main grid: reasons + form */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-20">
            {/* Left: why reach out */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-24 rounded-2xl border border-border bg-background/30 backdrop-blur-sm p-8 h-full flex flex-col">
                <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  Why Reach Out
                </span>
                <h2 className="font-display text-3xl md:text-4xl leading-[1.05] mt-4 mb-8">
                  Why Reach Out to <em className="font-display italic">Clickmasters?</em>
                </h2>

                <ul className="space-y-3">
                  {reasons.map((reason, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 rounded-xl p-3 -mx-3 transition-colors hover:bg-foreground/5"
                    >
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-foreground/10 mt-0.5">
                        <CheckCircle2 className="h-4 w-4 text-foreground" />
                      </span>
                      <span className="text-muted-foreground leading-relaxed">{reason}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8">
                  <div className="h-px bg-border mb-6" />
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Fill out the form and a member of our team will follow up within 24
                    hours to schedule your free consultation.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div id="contact-form" className="lg:col-span-7">
              <div className="rounded-2xl border border-border bg-background/30 backdrop-blur-sm p-8">
                <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  Get Started
                </span>
                <h2 className="font-display text-3xl md:text-4xl leading-[1.05] mt-4 mb-8">
                  Send Us a <em className="font-display italic">Message</em>
                </h2>

                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    {fields.map((f) => (
                      <div key={f.name}>
                        <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-muted-foreground">
                          {f.label}
                        </label>
                        <input
                          type={f.type}
                          name={f.name}
                          value={formData[f.name]}
                          onChange={handleChange}
                          placeholder={f.placeholder}
                          className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-foreground/40"
                        />
                        {errors[f.name as keyof FormErrors] && (
                          <p className="mt-1.5 text-xs text-red-400">
                            {errors[f.name as keyof FormErrors]}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-muted-foreground">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Company name"
                        className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-foreground/40"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-muted-foreground">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 234 567 890"
                        className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-foreground/40"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-muted-foreground">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell us about your project..."
                      className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-foreground/40"
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>
                    )}
                  </div>

                  {submitStatus.type && (
                    <div
                      className={`rounded-xl border px-4 py-3 text-sm ${
                        submitStatus.type === "success"
                          ? "border-green-500/30 bg-green-500/10 text-green-400"
                          : "border-red-500/30 bg-red-500/10 text-red-400"
                      }`}
                    >
                      {submitStatus.message}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-foreground text-background py-4 text-sm font-medium hover:opacity-90 transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-muted-foreground">
                    We respect your privacy. Your information is secure and we will get
                    back to you within 24 hours.
                  </p>
                </form>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center">
            <div className="relative overflow-hidden rounded-3xl border border-border bg-foreground text-background p-12 md:p-16">
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-background/10 blur-3xl"
              />
              <span className="text-xs uppercase tracking-[0.25em] opacity-60">
                Let's Talk
              </span>
              <h3 className="font-display text-4xl md:text-6xl leading-[1.02] text-balance mt-4">
                We look forward to <em className="font-display italic">connecting</em> with
                you.
              </h3>
              <p className="mt-4 text-lg opacity-70 max-w-2xl mx-auto">
                Whether you're looking to boost your search rankings, run high-performing
                ad campaigns, or build a stronger online presence, Clickmasters Digital
                Marketing is here to help. Reach out today and let's talk about your
                goals.
              </p>
              <div className="mt-8 flex justify-center">
                <a
                  href="#contact-form"
                  className="group inline-flex items-center gap-3 rounded-full bg-background text-foreground pl-7 pr-3 py-3.5 text-sm font-medium hover:opacity-90 transition-all"
                >
                  Schedule a Free Consultation
                  <span className="grid place-items-center w-9 h-9 rounded-full bg-foreground text-background transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}