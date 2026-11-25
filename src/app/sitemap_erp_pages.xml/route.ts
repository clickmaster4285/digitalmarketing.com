import { cmsUrlset, indexableCmsPages } from '@/lib/cmsSitemap';

// Non-blog pages published in the ERP (Page Creation). Blog posts are in
// sitemap_blogs.xml. Refreshed with the ERP page cache (tag "cms-page").
export const revalidate = 300;

export async function GET() {
  return cmsUrlset(await indexableCmsPages((page) => page.pageType !== 'blog' && page.slug !== ''));
}
