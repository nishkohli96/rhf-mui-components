import { currentDocsVersion, docsVersions } from '@/constants';
import type { DocsVersionInfo, Page } from '@/types';

/**
 * Versions that live under a URL prefix (everything except the current one),
 * longest `basePath` first so `/v10/x` can never be matched by `/v1`.
 */
const prefixedVersions = docsVersions
  .filter(version => version.basePath !== '')
  .sort((a, b) => b.basePath.length - a.basePath.length);

/** True when `pathname` is inside `basePath` — an exact hit or a `/`-delimited child. */
function isUnder(pathname: string, basePath: string): boolean {
  return pathname === basePath || pathname.startsWith(`${basePath}/`);
}

/** The version owning `pathname`, defaulting to the current (unprefixed) one. */
export function getDocsVersion(pathname: string): DocsVersionInfo {
  return (
    prefixedVersions.find(version => isUnder(pathname, version.basePath))
    ?? currentDocsVersion
  );
}

/**
 * Strips the version prefix off `pathname`, yielding the canonical path shared
 * across versions — `/v1/components/mui/textfield` → `/components/mui/textfield`.
 */
export function toCanonicalPath(pathname: string): string {
  const { basePath } = getDocsVersion(pathname);
  if (!basePath) {
    return pathname;
  }
  return pathname.slice(basePath.length) || '/';
}

/** Re-applies a version prefix to a canonical path. */
export function toVersionedPath(
  version: DocsVersionInfo,
  canonicalPath: string
): string {
  return `${version.basePath}${canonicalPath}`;
}

/** Whether `canonicalPath` exists in `version`. */
export function isPathInVersion(
  version: DocsVersionInfo,
  canonicalPath: string
): boolean {
  return !version.unavailablePaths?.some(unavailable =>
    isUnder(canonicalPath, unavailable));
}

/**
 * Where the version switcher should navigate when moving `pathname` into
 * `targetVersion`.
 *
 * Keeps the reader on the same page whenever that page exists in the target
 * version, and otherwise lands on the target's `fallbackPath` rather than a
 * 404 — the behaviour Docusaurus's switcher has. The marketing homepage (`/`)
 * has no per-version equivalent, so it also falls back.
 */
export function resolveVersionSwitchHref(
  targetVersion: DocsVersionInfo,
  pathname: string
): string {
  const canonicalPath = toCanonicalPath(pathname);
  if (canonicalPath === '/' || !isPathInVersion(targetVersion, canonicalPath)) {
    return targetVersion.fallbackPath;
  }
  return toVersionedPath(targetVersion, canonicalPath);
}

/**
 * Rewrites the shared sidebar tree for `version`: drops pages the version
 * doesn't have (along with any group left empty as a result) and prefixes the
 * surviving links, so navigating the sidebar never leaves the active version.
 */
export function buildVersionedSidebar(
  pages: Page[],
  version: DocsVersionInfo
): Page[] {
  return pages.flatMap((page): Page[] => {
    if (page.pages?.length) {
      const children = buildVersionedSidebar(page.pages, version);
      return children.length ? [{ ...page, pages: children }] : [];
    }
    if (!page.href) {
      return [];
    }
    return isPathInVersion(version, page.href)
      ? [{ ...page, href: toVersionedPath(version, page.href) }]
      : [];
  });
}
