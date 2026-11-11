import { NextRequest, NextResponse } from "next/server";
import { normalizeEditPath } from "@/lib/pageEdits";
import { getPageEdits } from "@/lib/pageEdits.server";

// Same-origin proxy for one page's ERP edit instructions. Always 200;
// `edits: null` means "leave the page untouched".
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const path = normalizeEditPath(request.nextUrl.searchParams.get("path"));
  const edits = path ? await getPageEdits(path).catch(() => null) : null;
  return NextResponse.json(
    { edits: edits ? { instructions: edits.instructions, version: edits.version } : null },
    { headers: { "Cache-Control": "public, max-age=60" } },
  );
}
