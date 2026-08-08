import { type DocsVersionInfo } from '@/types';

/**
 * Docs versions surfaced by the version switcher, newest first.
 *
 * Routing model (mirrors Docusaurus): the **current** version is served from
 * the URL root (`/components/mui/textfield`) and every older version lives
 * under its own segment (`/v1/components/mui/textfield`). Sidebar links,
 * prev/next nav and the switcher all operate on the *canonical* (unprefixed)
 * path and re-apply `basePath` for the active version, so a single
 * `sidebarLinks` tree drives every version.
 *
 * Latest version is served from the root, so it carries no prefix.
 */
export const docsVersions: DocsVersionInfo[] = [
  {
    slug: 'current',
    label: 'v5',
    basePath: '',
    fallbackPath: '/introduction'
  },
  {
    slug: 'v4',
    label: 'v4',
    basePath: '/v4',
    fallbackPath: '/v4/introduction'
  },
  {
    slug: 'v3',
    label: 'v3',
    basePath: '/v3',
    fallbackPath: '/v3/introduction'
  },
  {
    slug: 'v2',
    label: 'v2',
    basePath: '/v2',
    fallbackPath: '/v2/introduction'
  },
  {
    slug: 'v1',
    label: 'v1',
    basePath: '/v1',
    fallbackPath: '/v1/introduction',
    /*
     * Sections that were never copied into `app/v1`. Listing them here keeps
     * the v1 sidebar honest (no links to routes that 404) and makes the
     * switcher fall back to `fallbackPath` instead of stranding the user.
     * Delete an entry once the corresponding pages exist under `app/v1`.
     */
    unavailablePaths: ['/examples', '/migration-guide']
  }
];

/** The version served from the URL root — the one new visitors land on. */
export const currentDocsVersion = docsVersions[0];
