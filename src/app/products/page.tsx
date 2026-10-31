// app/products/page.tsx
import Link from "next/link";
import { ArrowUpRight, Home, Car, Store, ShoppingCart, PawPrint, Pill, ScanLine, Stethoscope, Dumbbell, UtensilsCrossed, Package as FallbackIcon, type LucideIcon } from "lucide-react";
import { getAllProducts } from "@/content/product/productContent";

// Same icon mapping used in your detail page
const PRODUCT_ICONS: Record<string, LucideIcon> = {
  Home, Car, Store, ShoppingCart, PawPrint,
  Pill, ScanLine, Stethoscope, Dumbbell, UtensilsCrossed,
};

export default function ProductsIndexPage() {
  const products = getAllProducts();

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#FF2E86] selection:text-white pb-32">
      {/* ── HERO SECTION ── */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden border-b border-white/10">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, rgba(255,46,134,0.15), transparent 70%)",
          }}
        />
        <div className="container relative max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[10px] uppercase tracking-[0.4em] opacity-60">[ All Products ]</span>
            <span className="h-px w-10 bg-white/30" />
            <span className="text-[10px] uppercase tracking-[0.4em] opacity-60">UI Kits & Systems</span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-6">
            Explore our <span className="text-[#FF2E86]">collection.</span>
          </h1>
          
          <p className="text-lg md:text-2xl opacity-60 max-w-2xl leading-relaxed">
            Production-ready UI kits and management systems designed to help you ship faster. 
            From healthcare to retail, pick the perfect foundation for your next project.
          </p>
        </div>
      </section>

      {/* ── PRODUCT GRID ── */}
      <section className="container max-w-7xl mx-auto px-6 pt-24">
        
        {/* HEADER ABOVE CARDS */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/50">[ 01 ]</span>
              <span className="h-px w-8 bg-white/30" />
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/50">Directory</span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
              Available <span className="text-[#FF2E86]">systems.</span>
            </h2>
          </div>
          <p className="text-sm md:text-base text-white/50 max-w-sm leading-relaxed">
            Browse our catalog of fully designed, ready-to-code systems. 
            Click any card to view the complete breakdown and screens.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            const Icon = PRODUCT_ICONS[product.icon] ?? FallbackIcon;
            
            return (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group relative flex flex-col rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors overflow-hidden"
              >
                {/* Top Cover Image Area */}
                <div className="relative w-full aspect-[4/3] bg-[#0a0a0a] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.images[0]?.src || "/placeholder.png"}
                    alt={product.images[0]?.alt || product.name}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent opacity-80" />
                  
                  {/* Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] uppercase tracking-[0.2em]">
                    {product.badge}
                  </div>
                </div>

                {/* Content Area */}
                <div className="relative p-6 md:p-8 flex flex-col flex-1">
                  {/* Floating Icon */}
                  <div className={`absolute -top-8 left-6 md:left-8 w-14 h-14 rounded-2xl bg-gradient-to-br ${product.accent} grid place-items-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <div className="mt-4 mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/50">
                    {product.category}
                  </div>
                  
                  <h3 className="font-display text-2xl font-bold leading-[1.1] mb-3 group-hover:text-[#FF2E86] transition-colors">
                    {product.shortName}
                  </h3>
                  
                  <p className="text-sm text-white/50 leading-relaxed mb-6 line-clamp-2">
                    {product.tagline}
                  </p>

                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/10">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                      View details
                    </span>
                    <div className="w-8 h-8 rounded-full border border-white/10 grid place-items-center group-hover:bg-[#FF2E86] group-hover:border-[#FF2E86] transition-colors">
                      <ArrowUpRight className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── BOTTOM CTA (WHITE CARD) ── */}
      <section className="container max-w-7xl mx-auto px-6 mt-32">
        <div className="relative bg-white text-black rounded-[2.5rem] p-10 md:p-20 overflow-hidden shadow-2xl flex flex-col items-center text-center">
          
          {/* Subtle pink accent for the white card */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              background:
                "radial-gradient(50% 50% at 50% 0%, rgba(255,46,134,0.3), transparent 70%)",
            }}
          />

          <h2 className="relative font-display text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Can't find what <span className="text-[#FF2E86]">you need?</span>
          </h2>
          <p className="relative text-lg md:text-xl text-black/60 max-w-xl mx-auto mb-10 leading-relaxed">
            We build custom design systems too. Let's talk about your next big project 
            and ship it faster together.
          </p>
          <Link
            href="/contact"
            className="relative group inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:bg-[#FF2E86] transition-colors"
          >
            Contact Us
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </section>
    </main>
  );
}