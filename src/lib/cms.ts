import type { Metadata } from "next";
import { normalizeMetadataText } from "./serviceMetadata";

export interface CmsSection {
  id?: string;
  type: string;
  order?: number;
  content: Record<string, unknown>;
  settings?: Record<string, unknown>;
}

export interface CmsPage {
  title: string;
  slug: string;
  pageType?: string;
  featuredImage?: string;
  publishedAt?: string;
  sections: CmsSection[];
  seo?: Record<string, unknown>;
  design?: { sectionDefaults?: Record<string, unknown> };
  context?: { posts?: Record<string, unknown>[] };
}

export interface CmsPageSummary {
  title: string;
  slug: string;
  pageType?: string;
  publishedAt?: string;
  noindex: boolean;
}

type JsonRecord = Record<string, unknown>;

const REVALIDATE_SECONDS = 300;
const CMS_TIMEOUT_MS = 5000;

/**
 * Next.js data-cache tag on every published created-page request. The ERP
 * webhook (POST /api/erp-revalidate) expires it right after a publish.
 */
export const CMS_PAGE_CACHE_TAG = "cms-page";

const PREVIEW_TOKEN_PATTERN = /^[a-f0-9]{48}$/;

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizePath(value: string | string[]): string | null {
  const rawSegments = Array.isArray(value)
    ? value
    : value.replace(/^\/|\/$/g, "").split("/");

  if (
    rawSegments.length === 0 ||
    rawSegments.some((segment) => !segment) ||
    rawSegments.length > 20 ||
    rawSegments.some(
      (segment) =>
        segment.length > 128 ||
        segment === "." ||
        segment === ".." ||
        !/^[A-Za-z0-9_-]+$/.test(segment),
    )
  ) {
    return null;
  }

  return rawSegments.join("/");
}

export function validateCmsSlug(value: string | string[]): string | null {
  return normalizePath(value);
}

export function isValidPreviewToken(value: unknown): value is string {
  return typeof value === "string" && PREVIEW_TOKEN_PATTERN.test(value);
}

/**
 * Parses an ERP page payload (`{ data: { page } }`) into a CmsPage. Used for
 * published pages and for editor previews, so both render identically.
 * `expectedSlug` (published pages) must match the page's own slug.
 */
export function parseCmsPage(payload: unknown, expectedSlug?: string): CmsPage {
  if (!isRecord(payload) || !isRecord(payload.data) || !isRecord(payload.data.page)) {
    throw new Error("CMS response must contain data.page");
  }

  const rawPage = payload.data.page;
  const rawSlug = typeof rawPage.slug === "string" ? rawPage.slug.trim() : "";
  // Home is "/" in the ERP; it is "" here (rendered at "/").
  const responseSlug = rawSlug === "/" ? "" : rawSlug ? normalizePath(rawSlug) : null;

  if (responseSlug === null) {
    throw new Error("CMS page has an invalid slug");
  }
  if (expectedSlug !== undefined && responseSlug !== expectedSlug) {
    throw new Error("CMS response page slug does not match the requested URL");
  }

  if (typeof rawPage.title !== "string" || !Array.isArray(rawPage.sections)) {
    throw new Error("CMS page must contain a title and sections array");
  }

  const sections = rawPage.sections.flatMap((section): CmsSection[] => {
    if (
      !isRecord(section) ||
      typeof section.type !== "string" ||
      !isRecord(section.content) ||
      section.hidden === true
    ) {
      return [];
    }

    return [
      {
        id: typeof section.id === "string" ? section.id : undefined,
        type: section.type,
        order: typeof section.order === "number" ? section.order : undefined,
        content: section.content,
        settings: isRecord(section.settings) ? section.settings : undefined,
      },
    ];
  });

  const designSource = isRecord(rawPage.design)
    ? rawPage.design
    : isRecord(payload.data.design)
      ? payload.data.design
      : undefined;
  const contextSource = isRecord(rawPage.context)
    ? rawPage.context
    : isRecord(payload.data.context)
      ? payload.data.context
      : undefined;

  return {
    title: rawPage.title,
    slug: responseSlug,
    pageType: typeof rawPage.pageType === "string" ? rawPage.pageType : undefined,
    featuredImage:
      typeof rawPage.featuredImage === "string" && rawPage.featuredImage.trim()
        ? rawPage.featuredImage.trim()
        : undefined,
    publishedAt: typeof rawPage.publishedAt === "string" ? rawPage.publishedAt : undefined,
    sections: sections.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    seo: isRecord(rawPage.seo) ? rawPage.seo : undefined,
    design:
      designSource && isRecord(designSource.sectionDefaults)
        ? { sectionDefaults: designSource.sectionDefaults }
        : undefined,
    context:
      contextSource && Array.isArray(contextSource.posts)
        ? {
            posts: contextSource.posts.filter(
              (post): post is Record<string, unknown> => isRecord(post),
            ),
          }
        : undefined,
  };
}

let misconfigurationLogged = false;

/** `{ base, domain }` from CMS_API_URL / CMS_SITE_DOMAIN, or null. */
function cmsEndpointBase(): { base: string; domain: string } | null {
  const apiBase = process.env.CMS_API_URL?.trim();
  const siteDomain = process.env.CMS_SITE_DOMAIN?.trim();
  if (!apiBase && !siteDomain) return null;

  try {
    if (!apiBase || !siteDomain) throw new Error("CMS_API_URL and CMS_SITE_DOMAIN must both be configured");
    const baseUrl = new URL(apiBase);
    if (
      !["http:", "https:"].includes(baseUrl.protocol) ||
      baseUrl.username ||
      baseUrl.password ||
      baseUrl.search ||
      baseUrl.hash
    ) {
      throw new Error(
        "CMS_API_URL must be an HTTP(S) base URL without credentials, query, or fragment",
      );
    }
    return {
      base: baseUrl.toString().replace(/\/+$/, ""),
      domain: encodeURIComponent(siteDomain),
    };
  } catch (error) {
    if (!misconfigurationLogged) {
      misconfigurationLogged = true;
      console.error(`[cms] ${error instanceof Error ? error.message : String(error)}`);
    }
    return null;
  }
}

type CmsFetchInit = { next: { revalidate: number; tags: string[] } } | { cache: "no-store" };

/**
 * GET a CMS endpoint and return its JSON body, `null` for a 404, or throw on
 * anything else. `label` is what gets logged (never a preview token).
 */
async function fetchCmsJson(url: string, init: CmsFetchInit, label: string): Promise<unknown> {
  const response = await fetch(url, {
    ...init,
    // Without a timeout a hanging CMS holds the page request open until the
    // reverse proxy gives up (502/504).
    signal: AbortSignal.timeout(CMS_TIMEOUT_MS),
  });

  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error(`CMS request ${label} failed with status ${response.status}`);
  }

  const responseText = await response.text();
  const contentType = response.headers.get("content-type") ?? "unknown";
  try {
    return JSON.parse(responseText);
  } catch {
    const looksLikeHtml =
      contentType.includes("text/html") ||
      /^\s*<!doctype\s+html|^\s*<html[\s>]/i.test(responseText);
    // A non-JSON body means CMS_API_URL is not pointing at the CMS API (e.g. an
    // SPA that answers every path with index.html), not that this page exists.
    throw new Error(
      looksLikeHtml
        ? `CMS endpoint returned HTML instead of JSON (content-type: ${contentType}). Check that CMS_API_URL points to the ERP API server and that the public pages endpoint is available at ${label}.`
        : `CMS endpoint returned invalid JSON (content-type: ${contentType}). Check the ERP public pages API response.`,
    );
  }
}

const publishedCache = (): CmsFetchInit =>
  process.env.NODE_ENV === "development"
    ? { cache: "no-store" }
    : { next: { revalidate: REVALIDATE_SECONDS, tags: [CMS_PAGE_CACHE_TAG] } };

/**
 * A published ERP-created page, or null (not published, invalid slug, ERP not
 * configured or unreachable). Never throws: an ERP outage shows the normal
 * 404 and never breaks a page render or the build.
 */
export async function getCmsPage(
  inputSlug: string | string[],
): Promise<CmsPage | null> {
  const slug = normalizePath(inputSlug);
  if (!slug) return null;
  const erp = cmsEndpointBase();
  if (!erp) return null;

  const encodedSlug = slug.split("/").map(encodeURIComponent).join("/");
  const endpoint = `${erp.base}/public/${erp.domain}/pages/${encodedSlug}`;
  try {
    const payload = await fetchCmsJson(endpoint, publishedCache(), endpoint);
    return payload === null ? null : parseCmsPage(payload, slug);
  } catch (error) {
    console.error(`[cms] ${error instanceof Error ? error.message : String(error)}`);
    return null;
  }
}

/**
 * The ERP page editor's unsaved draft for a preview token. Never cached.
 * Returns null for an invalid/expired token or an unreachable ERP.
 */
export async function getCmsPreviewPage(token: string): Promise<CmsPage | null> {
  if (!isValidPreviewToken(token)) return null;
  const erp = cmsEndpointBase();
  if (!erp) return null;

  try {
    const payload = await fetchCmsJson(
      `${erp.base}/public/${erp.domain}/preview/${token}`,
      { cache: "no-store" },
      "preview",
    );
    return payload === null ? null : parseCmsPage(payload);
  } catch (error) {
    console.error(`[cms] preview: ${error instanceof Error ? error.message : String(error)}`);
    return null;
  }
}

/** Published created pages (for sitemaps). Empty when the ERP is unreachable. */
export async function getCmsPageList(): Promise<CmsPageSummary[]> {
  const erp = cmsEndpointBase();
  if (!erp) return [];
  const endpoint = `${erp.base}/public/${erp.domain}/pages`;
  try {
    const payload = await fetchCmsJson(endpoint, publishedCache(), endpoint);
    if (!isRecord(payload) || !isRecord(payload.data) || !Array.isArray(payload.data.pages)) {
      return [];
    }
    return payload.data.pages.filter(isRecord).flatMap((page): CmsPageSummary[] => {
      const rawSlug = typeof page.slug === "string" ? page.slug.trim() : "";
      const slug = rawSlug === "/" ? "" : normalizePath(rawSlug);
      if (slug === null || typeof page.title !== "string") return [];
      return [
        {
          title: page.title,
          slug,
          pageType: typeof page.pageType === "string" ? page.pageType : undefined,
          publishedAt: typeof page.publishedAt === "string" ? page.publishedAt : undefined,
          noindex: page.noindex === true,
        },
      ];
    });
  } catch (error) {
    console.error(`[cms] ${error instanceof Error ? error.message : String(error)}`);
    return [];
  }
}

export function safeMetadataUrl(value: unknown): string | undefined {
  if (typeof value !== "string" || !value.trim()) return undefined;

  try {
    const url = new URL(value, "https://clickmastersdigitalmarketing.com");
    if (
      !["http:", "https:"].includes(url.protocol) ||
      url.username ||
      url.password
    ) {
      return undefined;
    }
    return url.href;
  } catch {
    return undefined;
  }
}

/**
 * Accepts `"noindex, nofollow"`, a pasted `<meta name="robots" content="...">`
 * tag, a boolean or `{ index, follow }`.
 */
export function metadataRobots(value: unknown): Metadata["robots"] {
  if (typeof value === "boolean") {
    return { index: value, follow: value };
  }

  if (typeof value === "string") {
    if (!value.trim()) return undefined;
    const contentMatch = /content\s*=\s*["']([^"']*)["']/i.exec(value);
    const directives = (contentMatch ? contentMatch[1] : value).toLowerCase();
    return {
      index: !/\bnoindex\b|\bnone\b/.test(directives),
      follow: !/\bnofollow\b|\bnone\b/.test(directives),
    };
  }

  if (isRecord(value)) {
    return {
      index: typeof value.index === "boolean" ? value.index : true,
      follow: typeof value.follow === "boolean" ? value.follow : true,
    };
  }

  return undefined;
}

function seoString(seo: JsonRecord, ...keys: string[]): string | undefined {
  for (const key of keys) {
    const value = seo[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return undefined;
}

/** `seo.keywords` (array or comma list) plus the focus keyword, de-duplicated. */
export function seoKeywords(seo: JsonRecord): string[] | undefined {
  const raw = Array.isArray(seo.keywords)
    ? seo.keywords
    : typeof seo.keywords === "string"
      ? seo.keywords.split(",")
      : [];
  const keywords = [...raw, seo.focusKeyword]
    .filter((keyword): keyword is string => typeof keyword === "string")
    .map((keyword) => keyword.trim())
    .filter((keyword) => keyword && keyword.length <= 100);
  const seen = new Set<string>();
  const unique = keywords.filter((keyword) => {
    const key = keyword.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  return unique.length ? unique.slice(0, 30) : undefined;
}

export function cmsPageMetadata(page: CmsPage): Metadata {
  const seo = page.seo ?? {};
  const rawTitle = seoString(seo, "title", "metaTitle") ?? page.title;
  const title =
    normalizeMetadataText(rawTitle, 60) || "Clickmasters Digital Marketing";
  const rawDescription = seoString(seo, "metaDescription", "description");
  const normalizedDescription = normalizeMetadataText(rawDescription ?? "", 155);
  const description =
    normalizedDescription.length >= 70
      ? normalizedDescription
      : normalizeMetadataText(
          `Learn about ${page.title} and how Clickmasters helps businesses grow with tailored digital marketing services.`,
          155,
        );
  const canonical =
    safeMetadataUrl(seo.canonicalUrl) ?? `/${page.slug.replace(/^\/+/, "")}`;
  const openGraph = isRecord(seo.openGraph) ? seo.openGraph : {};
  const openGraphTitle = normalizeMetadataText(
    seoString(openGraph, "title") ?? seoString(seo, "openGraphTitle", "ogTitle") ?? title,
    60,
  ) || title;
  const normalizedOpenGraphDescription = normalizeMetadataText(
    seoString(openGraph, "description") ??
      seoString(seo, "openGraphDescription", "ogDescription") ??
      description,
    155,
  );
  const openGraphDescription =
    normalizedOpenGraphDescription.length >= 70
      ? normalizedOpenGraphDescription
      : description;
  const openGraphImage = safeMetadataUrl(
    seoString(openGraph, "image") ??
      seoString(seo, "openGraphImage", "ogImage") ??
      page.featuredImage,
  );
  const openGraphUrl = safeMetadataUrl(openGraph.url ?? canonical);
  const isArticle = page.pageType === "blog";

  return {
    title,
    description,
    keywords: seoKeywords(seo),
    alternates: canonical ? { canonical } : undefined,
    robots: metadataRobots(seo.robots),
    openGraph: {
      title: openGraphTitle,
      description: openGraphDescription,
      url: openGraphUrl,
      images: openGraphImage ? [openGraphImage] : undefined,
      ...(isArticle
        ? {
            type: "article" as const,
            ...(page.publishedAt ? { publishedTime: page.publishedAt } : {}),
          }
        : { type: "website" as const }),
    },
  };
}

const MAX_SCHEMA_ENTRIES = 20;
const MAX_SCHEMA_BYTES = 100_000;

/** The page's own JSON-LD objects (`seo.schema`); non-objects are skipped. */
export function cmsPageSchema(page: Pick<CmsPage, "seo">): JsonRecord[] {
  const raw = page.seo?.schema;
  const list = Array.isArray(raw) ? raw : isRecord(raw) ? [raw] : [];
  return list
    .filter(isRecord)
    .filter((entry) => {
      try {
        return JSON.stringify(entry).length <= MAX_SCHEMA_BYTES;
      } catch {
        return false;
      }
    })
    .slice(0, MAX_SCHEMA_ENTRIES);
}

const UNSAFE_JSON_CHARS = new RegExp(`[<>&${String.fromCharCode(0x2028, 0x2029)}]`, "g");
const BACKSLASH = String.fromCharCode(92);

/**
 * JSON for an inline ld+json script: `<`, `>`, `&` and line separators are
 * written as unicode escapes so the content can't close the script tag.
 */
export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(
    UNSAFE_JSON_CHARS,
    (char) => `${BACKSLASH}u${char.charCodeAt(0).toString(16).padStart(4, "0")}`,
  );
}
