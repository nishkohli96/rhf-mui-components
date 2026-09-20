export type Page = {
  title: string;
  href?: string;
  pages?: Page[];
  /**
   * Shows a decorative "New" badge next to the sidebar entry. Rendered
   * `aria-hidden` via CSS pseudo-content, so it stays out of the link's
   * accessible name and anchor text (no SEO impact).
   */
  isNew?: boolean;
};

export type PageInfo = {
  title: string;
  href: string;
};

export type DocsVersionInfo = {
  /** Stable id for the version, used as the switcher's select value. */
  slug: string;
  /** Text shown in the version switcher. */
  label: string;
  /** URL prefix for this version — `''` for the current version, `/v1` for v1. */
  basePath: string;
  /** Where to land when the active page has no equivalent in this version. */
  fallbackPath: string;
  /**
   * Canonical (unprefixed) path prefixes absent from this version, e.g.
   * `['/examples']`. Used to filter the sidebar and to decide whether a
   * version switch can preserve the current page.
   */
  unavailablePaths?: string[];
};
