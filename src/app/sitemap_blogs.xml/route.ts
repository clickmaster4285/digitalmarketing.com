import { cmsUrlset, indexableCmsPages } from '@/lib/cmsSitemap';

// Blog posts published in the ERP (Page Creation, pageType "blog").
// Refreshed with the ERP page cache (tag "cms-page", see /api/erp-revalidate).
export const revalidate = 300;

export async function GET() {
  return cmsUrlset(await indexableCmsPages((page) => page.pageType === 'blog'));
}
