'use client';

import { DocSearch } from '@docsearch/react';
import { envVariables, appName } from '@/constants';
import '@docsearch/css/dist/style.css';

/**
 * The Algolia crawler indexes each page's real `<title>` (e.g.
 * "MUITextField | MUI Components") as `hierarchy.lvl1` (`lvl0` is always the
 * fixed "Documentation" nav-section label, not the page title) — correct for
 * SEO, but redundant in the search dropdown where every single result and
 * every "Recently viewed" entry repeats the same site name. This strips just
 * the display suffix client-side; the indexed record and the page's actual
 * `<title>` are untouched.
 *
 * Only trims already-fetched search results — a "Recently viewed" entry
 * saved to localStorage *before* this shipped keeps its old, un-stripped
 * title until the user searches again and re-selects it.
 */
const titleSuffix = ` | ${appName}`;
const stripTitleSuffix = (value?: string) => value?.endsWith(titleSuffix)
  ? value.slice(0, -titleSuffix.length)
  : value;

type DocSearchHit = Parameters<NonNullable<Parameters<typeof DocSearch>[0]['transformItems']>>[0][number];

/**
 * The dropdown's top ("best match") row renders from `_highlightResult`
 * (highlighted HTML, e.g. `<mark>TextField</mark> | MUI Components`), while
 * every other row renders from the plain `hierarchy` field — both need the
 * suffix stripped, or only some rows lose it.
 */
const normalize = (value?: string | null) => (value ?? '').trim().toLowerCase();

/**
 * The crawl has left two record shapes for the same page (one an older
 * hit whose title still carries the " | MUI Components" suffix, the other a
 * newer hit anchored on the page's own H1 — same destination, same heading
 * text as the page title) — both surface as separate rows for the same
 * `url_without_anchor`. Stripping the suffix alone doesn't collapse these
 * since they're distinct Algolia records.
 *
 * For each `url_without_anchor`, the first hit is always kept (Algolia
 * already ranks by relevance); a later hit on the same page is dropped only
 * when its own heading just repeats that first hit's title — a real
 * sub-section hit (e.g. "Usage") has a different heading and stays.
 */
const urlWithoutAnchor = (url: string) => url.split('#')[0]!;

const dedupeSelfTitleHits = (items: DocSearchHit[]) => {
  const firstTitleByUrl = new Map<string, string>();
  return items.filter(item => {
    const urlKey = item.url_without_anchor ?? urlWithoutAnchor(item.url);
    const heading = normalize(stripTitleSuffix(item.hierarchy?.lvl1));
    const firstTitle = firstTitleByUrl.get(urlKey);
    if (firstTitle === undefined) {
      firstTitleByUrl.set(urlKey, heading);
      return true;
    }
    return heading !== firstTitle;
  });
};

/**
 * DocSearch's own result renderer picks `lvl1` for a page-level hit but
 * `lvl2` for a "content" hit anchored on a subsection — only `lvl1` carries
 * the " | MUI Components" suffix, but stripping just `lvl1` left a `lvl2`
 * hit's top-row title (rendered from `_highlightResult.hierarchy.lvl2`)
 * unstripped, since `lvl2` is a *different* string that doesn't itself end
 * in the suffix but is displayed alongside the un-stripped `lvl1` breadcrumb.
 */
const transformItems = (items: DocSearchHit[]) => dedupeSelfTitleHits(items).map(item => ({
  ...item,
  hierarchy: {
    ...item.hierarchy,
    lvl1: stripTitleSuffix(item.hierarchy?.lvl1) ?? item.hierarchy?.lvl1
  },
  _highlightResult: item._highlightResult && {
    ...item._highlightResult,
    hierarchy: item._highlightResult.hierarchy && {
      ...item._highlightResult.hierarchy,
      lvl1: item._highlightResult.hierarchy.lvl1 && {
        ...item._highlightResult.hierarchy.lvl1,
        value: stripTitleSuffix(item._highlightResult.hierarchy.lvl1.value)
          ?? item._highlightResult.hierarchy.lvl1.value
      }
    }
  }
}));

/**
 * Algolia DocSearch trigger + modal. Renders nothing when the env vars
 * aren't configured (e.g. a local checkout without `.env` filled in) instead
 * of throwing — DocSearch requires all three to be non-empty strings.
 */
const SearchBar = () => {
  const { appId, apiKey, indexName } = envVariables.algoliaConfig;
  if (!appId || !apiKey || !indexName) {
    return null;
  }

  return (
    <DocSearch
      appId={appId}
      apiKey={apiKey}
      indices={[indexName]}
      transformItems={transformItems}
    />
  );
};

export default SearchBar;
