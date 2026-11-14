// Shared labelling for "client results" / case-study sections whose figures
// are illustrative scenarios rather than verified, client-attributed outcomes.
// Every results section renders <IllustrativeResultsNotice /> under its
// heading and <IllustrativeBadge /> on each card, so the label is visible
// wherever a figure appears. Replace with real attribution only once a
// result is backed by a named client's documented, consented case study.

import { Info } from "lucide-react";

type Tone = "dark" | "light";

const ILLUSTRATIVE_RESULTS_TEXT =
  "These are not verified client outcomes. They show the kinds of results our services are designed to work toward; they are not attributed to named clients, and actual results vary by industry, competition, and starting point.";

const toneClasses: Record<Tone, { box: string; badge: string }> = {
  dark: {
    box: "border-white/15 bg-white/[0.04] text-white/80",
    badge: "border-white/25 text-white/75",
  },
  light: {
    box: "border-foreground/15 bg-foreground/[0.03] text-foreground/80",
    badge: "border-foreground/25 text-foreground/75",
  },
};

export function IllustrativeResultsNotice({
  tone = "dark",
  className = "",
}: {
  tone?: Tone;
  className?: string;
}) {
  return (
    <p
      role="note"
      className={`flex items-start gap-3 max-w-3xl rounded-2xl border px-5 py-4 text-left text-sm leading-relaxed ${toneClasses[tone].box} ${className}`}
    >
      <Info aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
      <span>
        <strong className="font-semibold">Illustrative examples.</strong>{" "}
        {ILLUSTRATIVE_RESULTS_TEXT}
      </span>
    </p>
  );
}

/** One-line caption for hero stat rows that mix result figures with industry data. */
export function IllustrativeStatsCaption({ className = "" }: { className?: string }) {
  return (
    <p role="note" className={`text-[11px] leading-relaxed opacity-50 ${className}`}>
      Result figures are illustrative examples, not verified client outcomes; industry
      figures are published third-party estimates.
    </p>
  );
}

export function IllustrativeBadge({
  tone = "dark",
  className = "",
}: {
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={`inline-block rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] whitespace-nowrap ${toneClasses[tone].badge} ${className}`}
    >
      Illustrative example
    </span>
  );
}
