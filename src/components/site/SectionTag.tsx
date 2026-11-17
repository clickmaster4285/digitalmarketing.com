import type { ReactNode } from "react";

/**
 * Single, consistent eyebrow/tag style for every section heading on the site:
 * rounded pill, brand-orange dot, uppercase tracked label.
 *
 * `tone="dark"` is for sections that hard-code a dark background
 * (e.g. bg-[#0a0a0a]) instead of following the theme variables.
 */
export const SectionTag = ({
  children,
  className = "",
  tone = "auto",
}: {
  children: ReactNode;
  className?: string;
  tone?: "auto" | "dark";
}) => {
  const toneClasses =
    tone === "dark"
      ? "border-white/15 bg-white/5 text-white/80"
      : "border-border bg-background/70 text-foreground/80";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] backdrop-blur ${toneClasses} ${className}`}
    >
      <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
      {children}
    </span>
  );
};
