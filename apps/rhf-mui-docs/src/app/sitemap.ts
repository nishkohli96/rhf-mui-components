import { readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import type { MetadataRoute } from 'next';
import { websiteUrl } from '@/constants';

const APP_DIR = join(process.cwd(), 'src', 'app');
const PAGE_RE = /^page\.(mdx|tsx|jsx|ts|js)$/;

/* Older doc versions are intentionally kept out of the sitemap. */
const EXCLUDE_RE = /^v[1-9]\d*(\/|$)/;

type SiteMapRecord = { route: string; mtime: Date };

/** Recursively collect [routePath, lastModified] for every page.* under src/app. */
function collectRoutes(dir: string): SiteMapRecord[] {
  const out: SiteMapRecord[] = [];

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    /* skip route groups "(x)" and private "_x" folders */
    const isSkippedDir = entry.name.startsWith('(') || entry.name.startsWith('_');
    if (entry.isDirectory() && !isSkippedDir) {
      out.push(...collectRoutes(full));
    } else if (!entry.isDirectory() && PAGE_RE.test(entry.name)) {
      const rel = relative(APP_DIR, dir).split(sep).join('/');
      if (!rel || !EXCLUDE_RE.test(rel)) {
        out.push({ route: rel ? `/${rel}` : '/', mtime: statSync(full).mtime });
      }
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
