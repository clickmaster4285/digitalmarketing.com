import { NextRequest, NextResponse } from "next/server";
import { normalizeEditPath } from "@/lib/pageEdits";
import { getPageEditsStatus } from "@/lib/pageEdits.server";

// Same-origin proxy for one page's ERP edit instructions. Always 200;
// `edits: null` means "leave the page untouched".
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const path = normalizeEditPath(request.nextUrl.searchParams.get("path"));
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
    { headers: { "Cache-Control": "no-store" } },
  );
}
