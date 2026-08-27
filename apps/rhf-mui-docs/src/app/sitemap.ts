import { readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import type { MetadataRoute } from 'next';
import { websiteUrl } from '@/constants';

const APP_DIR = join(process.cwd(), 'src', 'app');
const PAGE_RE = /^page\.(mdx|tsx|jsx|ts|js)$/;

/* Older doc versions are intentionally kept out of the sitemap. */
const EXCLUDE_RE = /^v[1-9]\d*(\/|$)/;

/** Recursively collect [routePath, lastModified] for every page.* under src/app. */
function collectRoutes(dir: string): Array<{ route: string; mtime: Date }> {
  const out: Array<{ route: string; mtime: Date }> = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      /* skip route groups "(x)" and private "_x" folders */
      if (entry.name.startsWith('(') || entry.name.startsWith('_')) {
        continue;
      }
      out.push(...collectRoutes(full));
    } else if (PAGE_RE.test(entry.name)) {
      const rel = relative(APP_DIR, dir).split(sep).join('/');
      if (rel && EXCLUDE_RE.test(rel)) {
        continue;
      }
      out.push({ route: rel ? `/${rel}` : '/', mtime: statSync(full).mtime });
    }
  }
  return out;
}

function priorityFor(route: string): number {
  if (route === '/') {
    return 1;
  }
  return route.split('/').length === 2 ? 0.8 : 0.6;
}

const sitemap = (): MetadataRoute.Sitemap =>
  collectRoutes(APP_DIR).map(({ route, mtime }) => ({
    url: `${websiteUrl}${route}`,
    lastModified: mtime,
    changeFrequency: 'monthly',
    priority: priorityFor(route)
  }));

export default sitemap;
