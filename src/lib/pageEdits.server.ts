import type { Metadata } from "next";
import { metadataRobots, safeMetadataUrl } from "./cms";
import { normalizeMetadataText } from "./serviceMetadata";
import {
  normalizeEditPath,
  parseEditedPagesList,
  parsePageEdits,
  type EditedPageEntry,
  type PageEdits,
} from "./pageEdits";

/**
 * Server-side access to ERP edited pages. Every failure (unset env, dead
 * host, non-JSON body, timeout) resolves to "no edits" so the site renders
 * exactly as it would without the ERP.
 */

// Short TTL so CRM edits reach the site within seconds even without the
// revalidate webhook; POST /api/cms/revalidate makes them instant.
const REVALIDATE_SECONDS = 5;
const TIMEOUT_MS = 3000;
const FAILURE_TTL_MS = 15_000;

/** Next.js data-cache tag on every ERP request; see /api/cms/revalidate. */
export const PAGE_EDITS_CACHE_TAG = "erp-page-edits";

function erpBase(): { base: string; domain: string } | null {
  const apiUrl = process.env.CMS_API_URL?.trim();
  const domain = process.env.CMS_SITE_DOMAIN?.trim();
  if (!apiUrl || !domain) return null;
  try {
    const url = new URL(apiUrl);
    if (!["http:", "https:"].includes(url.protocol) || url.username || url.password) {
      return null;
    }
    return {
      base: `${url.origin}${url.pathname}`.replace(/\/+$/, ""),
      domain: encodeURIComponent(domain),
    };
  } catch {
    return null;
  }
}

function devWarn(message: string, error?: unknown) {
  if (process.env.NODE_ENV !== "production") {
    console.warn(`[erp-page-edits] ${message}`, error instanceof Error ? error.message : (error ?? ""));
  }
}

// Remembers failed endpoints briefly so a dead ERP costs one timeout per
// FAILURE_TTL_MS, not one per page render. Successful responses are cached by
// the Next.js data cache (revalidate: REVALIDATE_SECONDS, tag above).
const failedUntil = new Map<string, number>();

/** Forget remembered failures (called after an on-demand revalidation). */
export function clearPageEditFailures() {
  failedUntil.clear();
}

async function fetchErpJson(url: string): Promise<{ status: number; body: unknown } | null> {
  const until = failedUntil.get(url);
  if (until && until > Date.now()) return null;

  try {
    const response = await fetch(url, {
      next: { revalidate: REVALIDATE_SECONDS, tags: [PAGE_EDITS_CACHE_TAG] },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (response.status === 404) return { status: 404, body: null };
    if (!response.ok) throw new Error(`status ${response.status}`);
    const body: unknown = JSON.parse(await response.text());
    failedUntil.delete(url);
    return { status: response.status, body };
  } catch (error) {
    failedUntil.set(url, Date.now() + FAILURE_TTL_MS);
    devWarn(`request failed: ${url}`, error);
    return null;
  }
}

export async function getEditedPages(): Promise<EditedPageEntry[]> {
  const erp = erpBase();
  if (!erp) return [];
  const result = await fetchErpJson(`${erp.base}/public/${erp.domain}/edited-pages`);
  return result ? parseEditedPagesList(result.body) : [];
}

export async function findEditedPage(path: string): Promise<EditedPageEntry | null> {
  const normalized = normalizeEditPath(path);
  if (!normalized) return null;
  const pages = await getEditedPages();
  return pages.find((page) => page.path === normalized) ?? null;
}

/** Edits for one path, or null. Checks the edited-pages list first. */
export async function getPageEdits(path: string): Promise<PageEdits | null> {
  const entry = await findEditedPage(path);
  const erp = erpBase();
  if (!entry || !erp) return null;
  const result = await fetchErpJson(
    `${erp.base}/public/${erp.domain}/page-edits?path=${encodeURIComponent(entry.path)}`,
  );
  if (!result || result.status === 404) return null;
  return parsePageEdits(result.body);
}

/**
 * Overlays edited-page SEO onto a route's own metadata. Returns `base`
 * unchanged when the path has no published edits or the ERP is unreachable.
 */
export async function applyEditedPageSeo(path: string, base: Metadata): Promise<Metadata> {
  const entry = await findEditedPage(path).catch(() => null);
  if (!entry) return base;
  const edits = await getPageEdits(entry.path).catch(() => null);
  const seo = edits?.seo ?? {};

  const title = seo.title ? normalizeMetadataText(seo.title, 60) : undefined;
  const description = seo.description ? normalizeMetadataText(seo.description, 155) : undefined;
  const ogTitle = seo.ogTitle ? normalizeMetadataText(seo.ogTitle, 60) : title;
  const ogDescription = seo.ogDescription
    ? normalizeMetadataText(seo.ogDescription, 155)
    : description;
  const ogImage = safeMetadataUrl(seo.ogImage);
  const canonical = safeMetadataUrl(seo.canonicalUrl);
  const robots = entry.noindex
    ? { index: false, follow: true }
    : seo.robots
      ? metadataRobots(seo.robots)
      : undefined;

  const metadata: Metadata = { ...base };
  if (title) metadata.title = title;
  if (description) metadata.description = description;
  if (seo.keywords) {
    metadata.keywords = seo.keywords.split(",").map((k) => k.trim()).filter(Boolean);
  }
  if (canonical) metadata.alternates = { ...base.alternates, canonical };
  if (robots) metadata.robots = robots;
  if (ogTitle || ogDescription || ogImage || canonical) {
    metadata.openGraph = {
      ...base.openGraph,
      ...(ogTitle ? { title: ogTitle } : {}),
      ...(ogDescription ? { description: ogDescription } : {}),
      ...(ogImage ? { images: [ogImage] } : {}),
      ...(canonical ? { url: canonical } : {}),
    };
  }
  if (base.twitter && (ogTitle || ogDescription || ogImage)) {
    metadata.twitter = {
      ...base.twitter,
      ...(ogTitle ? { title: ogTitle } : {}),
      ...(ogDescription ? { description: ogDescription } : {}),
      ...(ogImage ? { images: [ogImage] } : {}),
    };
  }
  return metadata;
}
