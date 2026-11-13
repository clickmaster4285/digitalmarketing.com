import { NextResponse } from "next/server";
import { getEditedPages } from "@/lib/pageEdits.server";

// Same-origin proxy for the ERP edited-pages list. The browser cannot call
// CMS_API_URL directly (server-only env, CSP connect-src). Always 200; an
// unreachable ERP yields an empty list.
export const dynamic = "force-dynamic";

export async function GET() {
  const pages = await getEditedPages().catch(() => []);
  return NextResponse.json(
    { paths: pages.map((page) => page.path) },
    { headers: { "Cache-Control": "no-store" } },
  );
}
