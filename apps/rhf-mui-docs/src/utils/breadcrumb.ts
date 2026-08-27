import { sidebarLinks, websiteUrl } from '@/constants';
import type { Page } from '@/types';
import { getDocsVersion, toCanonicalPath, toVersionedPath } from './docs-version';

export type Crumb = { name: string; url?: string };

/** Depth-first search for the chain of sidebar nodes leading to `target`. */
function findTrail(pages: Page[], target: string, acc: Page[]): Page[] | null {
  for (const page of pages) {
    const next = [...acc, page];
    if (page.href === target) {
      return next;
    }
    if (page.pages) {
      const found = findTrail(page.pages, target, next);
      if (found) {
        return found;
      }
    }
  }
  return null;
}

/**
 * Breadcrumb trail for `pathname`, sourced from the sidebar tree so labels are
 * human-readable ("Text Field", not "RHFTextfield"). Category nodes have no
 * `href`, so their `url` is left undefined and the JSON-LD emitter drops them.
 */
export function getBreadcrumbTrail(pathname: string): Crumb[] {
  const version = getDocsVersion(pathname);
  const canonical = toCanonicalPath(pathname);
  const trail = findTrail(sidebarLinks, canonical, []);
  const home: Crumb = { name: 'Home', url: `${websiteUrl}/` };

  if (!trail) {
    return [home];
  }

  return [
    home,
    ...trail.map(page => ({
      name: page.title,
      url: page.href
        ? `${websiteUrl}${toVersionedPath(version, page.href)}`
        : undefined
    }))
  ];
}
