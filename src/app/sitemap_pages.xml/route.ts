import { promises as fs } from 'fs';
import path from 'path';
import { getAllProducts } from '@/content/product/productContent';

const siteUrl = 'https://clickmastersdigitalmarketing.com';

function buildUrlElement(url: string, lastMod: string) {
  return `  <url>\n    <loc>${url}</loc>\n    <lastmod>${lastMod}</lastmod>\n  </url>`;
}

function toRoutePath(relativePath: string) {
  // Remove the file extension and page/route suffix
  const route = relativePath
    .replace(/\\/g, '/')  // Normalize Windows paths
    .replace(/^\//, '')   // Remove leading slash
    .replace(/\/page\.(ts|tsx|js|jsx)$/, '')  // Remove /page.ext
    .replace(/\/route\.(ts|tsx|js|jsx)$/, ''); // Remove /route.ext
  
  // If the remaining path is just a filename (like "page.tsx" without a directory)
  // then return "/" for the root
  if (/^(page|route)\.(ts|tsx|js|jsx)$/.test(route)) {
    return '/';
  }
  
  // Handle root path
  if (!route || route === '') return '/';
  
  // If it's just a directory with a page file inside
  const parts = route.split('/').filter(Boolean);
  return `/${parts.join('/')}`;
}

async function collectPageRoutes() {
  const appDir = path.join(process.cwd(), 'src', 'app');
  const routes = new Set<string>();

  async function walk(currentDir: string) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.name.startsWith('.') || entry.name === 'api') continue;
      if (['layout.tsx', 'layout.jsx', 'layout.js', 'globals.css', 'not-found.tsx', 'not-found.jsx', 'providers.tsx', 'favicon.ico'].includes(entry.name)) {
        continue;
      }

      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        if (entry.name.startsWith('[') || entry.name.startsWith('(')) {
          continue;
        }
        await walk(fullPath);
        continue;
      }

      if (entry.isFile() && /^(page|route)\.(ts|tsx|js|jsx)$/.test(entry.name)) {
        const relativePath = path.relative(appDir, fullPath);
        const routePath = toRoutePath(relativePath);
        routes.add(routePath);
      }
    }
  }

  await walk(appDir);

  return Array.from(routes)
    .filter((route) => !route.includes('/api'))
    .filter((route) => !route.startsWith('/[') && !route.includes('[['))
    // Exclude sitemap routes - they should be in a separate API route
    .filter((route) => !route.includes('sitemap'))
    .sort();
}

export async function GET() {
  const routes = [
    ...(await collectPageRoutes()),
    // Dynamic product pages are skipped by the file walker.
    ...getAllProducts().map((product) => `/products/${product.slug}`),
  ];
  const lastMod = new Date().toISOString().split('T')[0];
  const urls = routes.map((route) => buildUrlElement(`${siteUrl}${route}`, lastMod));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}