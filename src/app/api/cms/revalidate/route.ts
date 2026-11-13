import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { clearPageEditFailures, PAGE_EDITS_CACHE_TAG } from "@/lib/pageEdits.server";

// On-demand revalidation webhook for the ERP/CRM. Call it right after a page
// edit is saved or published so the site serves the new edits immediately:
//
//   POST /api/cms/revalidate
//   Authorization: Bearer <CMS_REVALIDATE_SECRET>
//
// (`x-revalidate-secret: <secret>` or `?secret=<secret>` also work.)
// Open tabs pick the change up live via ErpPageEdits' polling.
export const dynamic = "force-dynamic";

function providedSecret(request: NextRequest): string {
  const auth = request.headers.get("authorization") ?? "";
  if (auth.toLowerCase().startsWith("bearer ")) return auth.slice(7).trim();
  return (
    request.headers.get("x-revalidate-secret") ??
    request.nextUrl.searchParams.get("secret") ??
    ""
  ).trim();
}

function secretMatches(given: string, expected: string): boolean {
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(request: NextRequest) {
  const expected = process.env.CMS_REVALIDATE_SECRET?.trim();
  if (!expected) {
    return NextResponse.json({ ok: false, error: "revalidation not configured" }, { status: 503 });
  }
  if (!secretMatches(providedSecret(request), expected)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  clearPageEditFailures();
  revalidateTag(PAGE_EDITS_CACHE_TAG);
  return NextResponse.json(
    { ok: true, revalidated: PAGE_EDITS_CACHE_TAG, at: Date.now() },
    { headers: { "Cache-Control": "no-store" } },
  );
}
