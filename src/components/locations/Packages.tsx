// src/components/locations/LocationPackages.tsx
"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

interface PackageItem {
  name: string;
  description: string;
  includes?: string[];
}

interface LocationPackagesProps {
  title: string;
  items: PackageItem[];
}

export default function LocationPackages({
  title,
  items,
}: LocationPackagesProps) {
  return (
    <section className="py-16 md:py-20 bg-muted/20">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Packages
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-foreground">
            {title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {items.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1, ease: [0.65, 0, 0.35, 1] }}
              viewport={{ once: true }}
              className={`p-6 rounded-2xl border ${
                index === 1
                  ? "border-primary bg-primary/5 shadow-lg"
                  : "border-border bg-background"
              } hover:shadow-xl transition-all`}
            >
              {index === 1 && (
                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium mb-4">
                  <Sparkles className="w-3 h-3" />
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-display font-bold mb-2 text-foreground">
                {pkg.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {pkg.description}
              </p>
              <div className="space-y-2">
                {pkg.includes?.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}