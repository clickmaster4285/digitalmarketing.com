import { serializeJsonLd } from "@/lib/cms";
import { findEditedPage, getPageEdits } from "@/lib/pageEdits.server";

/**
 * Embeds a route's published ERP edits in its own server HTML as
 * <script type="application/json" id="erp-edits-data" data-path="...">, so
 * ErpPageEdits can apply them on first load with no network request (the ERP
 * API can take several seconds). Cached like the page (edited-pages tag, see
 * /api/erp-revalidate). The browser still checks /api/erp-edits uncached and
 * reapplies only if the result differs.
 *
 * Renders nothing for unedited paths (the list check is the same cached
 * request the root layout already makes). JSON only: never executed.
 */
export async function ErpEditsData({ path }: { path: string }) {
  const entry = await findEditedPage(path).catch(() => null);
  if (!entry) return null;
  const edits = await getPageEdits(entry.path).catch(() => null);
  if (!edits) return null;
  const data = {
    edits: { instructions: edits.instructions, schema: edits.schema, version: edits.version },
  };
  return (
    <script
      type="application/json"
      id="erp-edits-data"
      data-path={entry.path}
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
