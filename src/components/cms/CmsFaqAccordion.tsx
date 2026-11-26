"use client";

import React, { useId, useState } from "react";

export type CmsFaqItem = {
  key: string;
  question: string;
  answer: React.ReactNode;
};

export function CmsFaqAccordion({ items }: { items: CmsFaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  if (items.length === 0) return null;

  return (
    <div className="mt-10 divide-y divide-foreground/10 border-y border-foreground/10">
      {items.map((item, index) => {
        const isOpen = open === index;
        const buttonId = `${baseId}-q-${index}`;
        const panelId = `${baseId}-a-${index}`;
        return (
          <div key={item.key}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left transition-colors"
              >
                <span
                  className={`font-display text-xl leading-snug md:text-2xl transition-opacity ${
                    isOpen ? "opacity-100" : "opacity-90 group-hover:opacity-100"
                  }`}
                >
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                    isOpen
                      ? "border-foreground bg-foreground text-background"
                      : "border-foreground/20 group-hover:border-foreground/50"
                  }`}
                >
                  <span className="absolute h-[1.5px] w-3.5 bg-current" />
                  <span
                    className={`absolute h-3.5 w-[1.5px] bg-current transition-transform duration-300 ${
                      isOpen ? "rotate-90 scale-0" : ""
                    }`}
                  />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="max-w-3xl pb-6 pr-12 leading-7 opacity-80">{item.answer}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
