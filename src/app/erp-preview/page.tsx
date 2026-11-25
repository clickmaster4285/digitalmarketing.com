import type { Metadata } from "next";
import { cache } from "react";
import { CmsPageRenderer } from "@/components/cms/CmsPageRenderer";
import { ErpPreviewRefresher } from "@/components/cms/ErpPreviewRefresher";
import { cmsPageMetadata, getCmsPreviewPage, isValidPreviewToken } from "@/lib/cms";
import { erpAdminOrigins } from "@/lib/erpAdminOrigins";

/**
 * Live preview for the ERP page editor: /erp-preview?token=<48 hex chars>.
 *
 * Renders the editor's unsaved draft with the same parser, layout (root
 * layout header/footer) and section renderer as a published ERP page, so it
 * looks exactly like the page will after publishing. Never cached, never
 * indexed, not in the sitemap, and only frameable by the ERP admin origins
 * (see next.config.js headers).
 */
export const dynamic = "force-dynamic";
export const revalidate = 0;

type Props = { searchParams: Promise<{ token?: string | string[] }> };

const NOINDEX: Metadata["robots"] = { index: false, follow: false, nocache: true };

// One ERP request per render for both generateMetadata and the page.
const loadPreview = cache((token: string) => getCmsPreviewPage(token));

async function previewPage(searchParams: Props["searchParams"]) {
  const { token } = await searchParams;
  return typeof token === "string" && isValidPreviewToken(token) ? loadPreview(token) : null;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const page = await previewPage(searchParams);
  if (!page) return { title: "Preview expired", robots: NOINDEX };
  const metadata = cmsPageMetadata(page);
  // Never expose the token: canonical/OG URL stay the page's real URL.
  return { ...metadata, robots: NOINDEX };
}

export default async function ErpPreviewPage({ searchParams }: Props) {
  const page = await previewPage(searchParams);
  const allowedOrigins = erpAdminOrigins();

  if (!page) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-6 py-32 text-center">
        <p className="text-lg opacity-70">Preview expired. Reopen it from the ERP editor.</p>
        <ErpPreviewRefresher allowedOrigins={allowedOrigins} />
      </main>
    );
  }

  return (
    <>
      <CmsPageRenderer page={page} />
      <ErpPreviewRefresher allowedOrigins={allowedOrigins} />
    </>
  );
}
