import { NextRequest, NextResponse } from "next/server";
import { normalizeEditPath } from "@/lib/pageEdits";
import { getEditedPages, getPageEditsStatus } from "@/lib/pageEdits.server";

/**
 * Same-origin proxy for ERP page edits (the browser never calls the ERP):
 *   GET /api/erp-edits            -> { paths: string[] }
 *   GET /api/erp-edits?path=/a/b  -> { edits: { instructions, schema, version } | null }
 * Always 200 and never cached; an unreachable ERP yields empty results.
 */
export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store" };

export async function GET(request: NextRequest) {
  const rawPath = request.nextUrl.searchParams.get("path");
  if (rawPath === null) {
    const pages = await getEditedPages({ live: true }).catch(() => []);
    return NextResponse.json({ paths: pages.map((page) => page.path) }, { headers: NO_STORE });
  }

  const path = normalizeEditPath(rawPath);
  const { edits, failed } = path
    ? await getPageEditsStatus(path, { live: true }).catch(() => ({ edits: null, failed: true }))
    : { edits: null, failed: false };
  return NextResponse.json(
    {
      edits: edits
        ? { instructions: edits.instructions, schema: edits.schema, version: edits.version }
        : null,
      // ERP unreachable: the browser keeps the edits it already applied.
      ...(failed ? { failed: true } : {}),
    },
    { headers: NO_STORE },
  );
}
