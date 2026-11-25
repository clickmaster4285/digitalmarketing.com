import { NextResponse } from "next/server";

// Support check for the ERP page editor's live preview (see /erp-preview).
export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({ erpPreview: true }, { headers: { "Cache-Control": "no-store" } });
}
