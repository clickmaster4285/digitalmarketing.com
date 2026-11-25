import { timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { CMS_PAGE_CACHE_TAG } from "@/lib/cms";
import { normalizeEditPath } from "@/lib/pageEdits";
import { clearPageEditFailures, PAGE_EDITS_CACHE_TAG } from "@/lib/pageEdits.server";

/**
 * Called by the ERP right after a created page or a page edit is published,
 * unpublished or deleted, so the next page load shows the change:
 *
 *   POST /api/erp-revalidate
 *   Authorization: Bearer <ERP_REVALIDATE_SECRET>
 *   Content-Type: application/json
 *   { "path": "/services/some-page" }
 *
 * The same secret must be set as ERP_REVALIDATE_SECRET in the ERP backend.
 * (CMS_REVALIDATE_SECRET, the older name, is accepted as a fallback.)
 */
export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store" };
const PATH_PATTERN = /^\/[A-Za-z0-9/_\-.~]*$/;

function expectedSecret(): string | undefined {
  return (
    process.env.ERP_REVALIDATE_SECRET?.trim() || process.env.CMS_REVALIDATE_SECRET?.trim() || undefined
  );
}

function providedSecret(request: NextRequest): string {
  const auth = request.headers.get("authorization") ?? "";
  if (auth.toLowerCase().startsWith("bearer ")) return auth.slice(7).trim();
  return (request.headers.get("x-revalidate-secret") ?? "").trim();
}

function secretMatches(given: string, expected: string): boolean {
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

async function requestedPath(request: NextRequest): Promise<string | null> {
  let raw: unknown = request.nextUrl.searchParams.get("path");
  if (!raw) {
    try {
      const body: unknown = await request.json();
      raw = typeof body === "object" && body !== null ? (body as { path?: unknown }).path : undefined;
    } catch {
      raw = undefined;
    }
  }
  if (typeof raw !== "string") return null;
  const path = normalizeEditPath(raw.toLowerCase());
  return path && PATH_PATTERN.test(path) && !path.includes("..") ? path : null;
}

export async function POST(request: NextRequest) {
  const expected = expectedSecret();
  if (!expected || !secretMatches(providedSecret(request), expected)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401, headers: NO_STORE });
  }

  const path = await requestedPath(request);

  // Next.js 15: revalidateTag expires the entries immediately (the next
  // request fetches fresh data; nothing stale is served).
  clearPageEditFailures();
  revalidateTag(PAGE_EDITS_CACHE_TAG);
  revalidateTag(CMS_PAGE_CACHE_TAG);
  if (path) revalidatePath(path);

  return NextResponse.json({ ok: true, path }, { headers: NO_STORE });
}
