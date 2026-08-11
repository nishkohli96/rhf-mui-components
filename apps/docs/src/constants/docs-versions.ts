import { type DocsVersionInfo } from '@/types';
import {
  getComponentHref,
  newlyAddedComponents_v2,
  newlyAddedComponents_v3_3
} from '@/components/folder-structure/routesList';

/** Doc-page paths for components not yet added by a given version. */
const unavailableComponentPaths = {
  v2: newlyAddedComponents_v3_3.map(getComponentHref),
  v1: [...newlyAddedComponents_v2, ...newlyAddedComponents_v3_3].map(getComponentHref)
};

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
    fallbackPath: '/v4/introduction',
    unavailablePaths: ['/examples']
  },
  {
    slug: 'v3',
    label: 'v3',
    basePath: '/v3',
    fallbackPath: '/v3/introduction',
    unavailablePaths: ['/examples']
  },
  {
    slug: 'v2',
    label: 'v2',
    basePath: '/v2',
    fallbackPath: '/v2/introduction',
    /*
     * Components added in v3.3, so they don't exist under `app/v2`. Sourced
     * from `newlyAddedComponents_v3_3` (folder-structure's own version-gate
     * list) so the sidebar and the folder-structure tree never drift apart.
     */
    unavailablePaths: [
      ...unavailableComponentPaths.v2,
      '/form-helpers/fieldNameToId',
      '/examples',
    ]
  },
  {
    slug: 'v1',
    label: 'v1',
    basePath: '/v1',
    fallbackPath: '/v1/introduction',
    unavailablePaths: [
      ...unavailableComponentPaths.v1,
      '/form-helpers',
      '/examples',
      '/migration-guide',
    ]
  }
];

/** The version served from the URL root — the one new visitors land on. */
export const currentDocsVersion = docsVersions[0];
