import type { Metadata } from "next";

type ServiceContent = {
  metadata?: {
    seoTitle?: string;
    metaDescription?: string;
    secondaryKeywords?: string[];
    keyword?: string | string[];
    url?: string;
  };
  hero?: {
    title?: string;
    titleHighlight?: string;
    subtitle?: string;
    description?: string;
  };
  intro?: {
    solution?: string;
    promise?: string;
  };
};

const normalizeText = (value: unknown): string =>
  typeof value === "string" ? value.replace(/\s+/g, " ").trim() : "";

const TRAILING_FRAGMENT = /[\s|,;:&\-–—]+$|\s+(?:and|or|the|a|an|to|for|of|with|your|that|in)$/i;

const stripTrailingFragments = (value: string): string => {
  let result = value.trim();
  let previous = "";
  while (result !== previous) {
    previous = result;
    result = result.replace(TRAILING_FRAGMENT, "").trim();
  }
  return result;
};

const truncateText = (value: string, maxLength: number): string => {
  if (value.length <= maxLength) return value;
  const truncated = value.slice(0, maxLength + 1);
  const wordBoundary = truncated.lastIndexOf(" ");
  return stripTrailingFragments(
    truncated.slice(0, wordBoundary > 0 ? wordBoundary : maxLength),
  );
};

/** Truncate prose, preferring to end on a full sentence of at least minLength. */
const truncateProse = (
  value: string,
  maxLength: number,
  minLength: number,
): string => {
  if (value.length <= maxLength) return value;
  const window = value.slice(0, maxLength + 1);
  const sentenceEnd = Math.max(
    window.lastIndexOf(". "),
    window.lastIndexOf("! "),
    window.lastIndexOf("? "),
  );
  if (sentenceEnd + 1 >= minLength) return window.slice(0, sentenceEnd + 1);
  const cut = truncateText(value, maxLength - 1);
  return /[.!?]$/.test(cut) ? cut : `${cut}.`;
};

export const normalizeMetadataText = (
  value: string,
  maxLength: number,
): string => truncateText(normalizeText(value), maxLength);

const BRAND_SUFFIX = " | Clickmasters";

const titleFor = (slug: string, content: ServiceContent): string => {
  const seoTitle = normalizeText(content.metadata?.seoTitle);
  if (seoTitle && seoTitle.length <= 60) return seoTitle;

  // seoTitle is usually "<service name> <tagline> | Clickmasters"; when that is
  // too long, fall back to the service name itself rather than cutting mid-phrase.
  // titleHighlight is sometimes a short word ("Services") and sometimes a
  // tagline, so try the full name first and then hero.title on its own.
  // In the source copy a double space (a dropped em dash) or a spaced dash/pipe
  // separates the service name from its tagline.
  const rawHeroTitle =
    typeof content.hero?.title === "string" ? content.hero.title.trimStart() : "";
  const [heroName, ...heroTagline] = rawHeroTitle.split(/\s{2,}|\s[—–|]\s/);
  const heroTitle = stripTrailingFragments(normalizeText(heroName));
  // A highlight ending in punctuation ("Stop Guessing.") is a tagline, not part of the name.
  const highlightIsTagline = /[.,!?;:]$/.test(
    normalizeText(content.hero?.titleHighlight),
  );
  const serviceName = heroTagline.length || highlightIsTagline
    ? heroTitle
    : stripTrailingFragments(
        [normalizeText(rawHeroTitle), normalizeText(content.hero?.titleHighlight)]
          .filter(Boolean)
          .join(" "),
      );
  for (const name of [serviceName, heroTitle]) {
    if (name && name.length + BRAND_SUFFIX.length <= 60) {
      return `${name}${BRAND_SUFFIX}`;
    }
  }
  for (const name of [serviceName, heroTitle]) {
    if (name && name.length <= 60) return name;
  }
  return normalizeMetadataText(seoTitle || serviceName || slug.replace(/-/g, " "), 60);
};

const descriptionFor = (content: ServiceContent): string => {
  const description =
    normalizeText(content.metadata?.metaDescription) ||
    normalizeText(content.hero?.description);
  const fallback = normalizeText(
    [
      content.hero?.description,
      content.intro?.solution,
      content.intro?.promise,
    ]
      .filter(Boolean)
      .join(" "),
  );
  const completeDescription =
    description.length >= 70 ? description : fallback || description;
  return truncateProse(normalizeText(completeDescription), 155, 70);
};

const humanizeSlug = (slug: string): string =>
  slug
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

const withSuffix = (title: string, suffix: string): string => {
  const separator = " | ";
  const base = title.endsWith(BRAND_SUFFIX) ? title.slice(0, -BRAND_SUFFIX.length) : title;
  const availableLength = 60 - separator.length - suffix.length;
  return `${truncateText(base, availableLength)}${separator}${suffix}`;
};

export function createServiceMetadataRegistry(
  contentRegistry: Record<string, ServiceContent>,
): Record<string, Metadata> {
  const entries = Object.entries(contentRegistry).sort(([left], [right]) =>
    left.localeCompare(right),
  );
  const usedTitles = new Set<string>();
  const metadataRegistry: Record<string, Metadata> = {};

  for (const [slug, content] of entries) {
    const baseTitle = titleFor(slug, content);
    let title = baseTitle;
    let suffixNumber = 2;

    // The first route keeps the clean title; later duplicates get a qualifier.
    if (usedTitles.has(title)) title = withSuffix(baseTitle, humanizeSlug(slug));
    while (usedTitles.has(title)) {
      title = withSuffix(baseTitle, `${humanizeSlug(slug)} ${suffixNumber}`);
      suffixNumber += 1;
    }

    const description = descriptionFor(content);
    if (description.length < 70 || description.length > 155) {
      throw new Error(
        `Service meta description for "${slug}" must be 70-155 characters (got ${description.length})`,
      );
    }

    usedTitles.add(title);
    metadataRegistry[slug] = {
      title,
      description,
      keywords:
        content.metadata?.secondaryKeywords ??
        content.metadata?.keyword ??
        undefined,
    };
  }

  return metadataRegistry;
}
