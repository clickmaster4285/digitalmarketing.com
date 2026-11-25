import { getEditedPages } from "./pageEdits.server";

/**
 * Drops URLs whose page is set to noindex in ERP Page Editing. Those pages
 * render `<meta name="robots" content="noindex">` (applyEditedPageSeo), and a
 * sitemap must only list indexable URLs. Uses the same cached edited-pages
 * list as the pages themselves; if the ERP is unreachable nothing is dropped
 * (and the pages don't get noindex either).
 */
export async function withoutErpNoindex(urls: string[]): Promise<string[]> {
  const noindex = new Set(
    (await getEditedPages().catch(() => [])).filter((page) => page.noindex).map((page) => page.path),
  );
  if (noindex.size === 0) return urls;
  return urls.filter((url) => {
    let path: string;
    try {
      path = new URL(url, "https://clickmastersdigitalmarketing.com").pathname;
    } catch {
      return true;
    }
    return !noindex.has(path.replace(/\/+$/, "") || "/");
  });
}
