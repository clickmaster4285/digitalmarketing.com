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
  sections: CmsSection[];
  seo?: Record<string, unknown>;
  design?: { sectionDefaults?: Record<string, unknown> };
  context?: { posts?: Record<string, unknown>[] };
}

type JsonRecord = Record<string, unknown>;

const REVALIDATE_SECONDS = 300;

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

function parsePage(payload: unknown, requestedSlug: string): CmsPage {
  if (!isRecord(payload) || !isRecord(payload.data) || !isRecord(payload.data.page)) {
    throw new Error("CMS response must contain data.page");
  }

  const rawPage = payload.data.page;
  const responseSlug =
    typeof rawPage.slug === "string" ? normalizePath(rawPage.slug) : null;

  if (!responseSlug || responseSlug !== requestedSlug) {
    throw new Error("CMS response page slug does not match the requested URL");
  }

  if (
    typeof rawPage.title !== "string" ||
    !Array.isArray(rawPage.sections)
  ) {
    throw new Error("CMS page must contain a title and sections array");
  }

  const sections = rawPage.sections.flatMap((section): CmsSection[] => {
    if (
      !isRecord(section) ||
      typeof section.type !== "string" ||
      !isRecord(section.content)
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

export async function getCmsPage(
  inputSlug: string | string[],
): Promise<CmsPage | null> {
  const slug = normalizePath(inputSlug);
  if (!slug) return null;

  const apiBase = process.env.CMS_API_URL?.trim();
  const siteDomain = process.env.CMS_SITE_DOMAIN?.trim();

  if (!apiBase && !siteDomain) return null;
  if (!apiBase || !siteDomain) {
    throw new Error("CMS_API_URL and CMS_SITE_DOMAIN must both be configured");
  }

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

  const encodedSlug = slug.split("/").map(encodeURIComponent).join("/");
  const endpoint = `${baseUrl.toString().replace(/\/+$/, "")}/public/${encodeURIComponent(siteDomain)}/pages/${encodedSlug}`;
  const response = await fetch(endpoint, {
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error(`CMS request failed with status ${response.status}`);
  }

  const responseText = await response.text();
  const contentType = response.headers.get("content-type") ?? "unknown";
  let payload: unknown;

  try {
    payload = JSON.parse(responseText);
  } catch {
    const looksLikeHtml =
      contentType.includes("text/html") ||
      /^\s*<!doctype\s+html|^\s*<html[\s>]/i.test(responseText);
    throw new Error(
      looksLikeHtml
        ? `CMS endpoint returned HTML instead of JSON (content-type: ${contentType}). Check that CMS_API_URL points to the ERP API server and that the public pages endpoint is available at ${endpoint}.`
        : `CMS endpoint returned invalid JSON (content-type: ${contentType}). Check the ERP public pages API response.`,
    );
  }

  return parsePage(payload, slug);
}

function safeMetadataUrl(value: unknown): string | undefined {
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

function metadataRobots(value: unknown): Metadata["robots"] {
  if (typeof value === "boolean") {
    return { index: value, follow: value };
  }

  if (typeof value === "string") {
    const directives = value.toLowerCase().split(/[,\s]+/);
    return {
      index: !directives.includes("noindex"),
      follow: !directives.includes("nofollow"),
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

export function cmsPageMetadata(page: CmsPage): Metadata {
  const seo = page.seo ?? {};
  const rawTitle = typeof seo.title === "string" ? seo.title : page.title;
  const title =
    normalizeMetadataText(rawTitle, 60) || "Clickmasters Digital Marketing";
  const rawDescription =
    typeof seo.description === "string" ? seo.description : undefined;
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
    typeof openGraph.title === "string"
      ? openGraph.title
      : typeof seo.openGraphTitle === "string"
        ? seo.openGraphTitle
        : typeof seo.ogTitle === "string"
          ? seo.ogTitle
        : title,
    60,
  ) || title;
  const normalizedOpenGraphDescription = normalizeMetadataText(
    typeof openGraph.description === "string"
      ? openGraph.description
      : typeof seo.openGraphDescription === "string"
        ? seo.openGraphDescription
        : typeof seo.ogDescription === "string"
          ? seo.ogDescription
        : description,
    155,
  );
  const openGraphDescription =
    normalizedOpenGraphDescription.length >= 70
      ? normalizedOpenGraphDescription
      : description;
  const openGraphImage = safeMetadataUrl(
    openGraph.image ?? seo.openGraphImage ?? seo.ogImage,
  );
  const openGraphUrl = safeMetadataUrl(openGraph.url ?? canonical);

  return {
    title,
    description,
    keywords:
      typeof seo.focusKeyword === "string" ? [seo.focusKeyword] : undefined,
    alternates: canonical ? { canonical } : undefined,
    robots: metadataRobots(seo.robots),
    openGraph: {
      title: openGraphTitle,
      description: openGraphDescription,
      url: openGraphUrl,
      images: openGraphImage ? [openGraphImage] : undefined,
      type: "website",
    },
  };
}
