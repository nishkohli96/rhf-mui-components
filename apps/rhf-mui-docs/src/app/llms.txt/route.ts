import {
  sidebarLinks,
  currentDocsVersion,
  websiteUrl,
  defaultPageTitle,
  defaultPageDescription,
  githubRepoLink,
  npmLink
} from '@/constants';
import { buildVersionedSidebar } from '@/utils';
import type { Page } from '@/types';

export const dynamic = 'force-static';

/** Flatten a sidebar subtree to `- [Title](absoluteUrl)` lines, in reading order. */
function toLines(pages: Page[]): string[] {
  return pages.flatMap(page => {
    if (page.pages?.length) {
      return toLines(page.pages);
    }
    return page.href ? [`- [${page.title}](${websiteUrl}${page.href})`] : [];
  });
}

/**
 * https://llmstxt.org/ — a plain-text map of the docs for AI engines.
 * Built from the same `sidebarLinks` tree the site nav uses, so it can't
 * drift out of sync. Current version only; legacy /v1–/v4 are noindex.
 */
export function GET() {
  /* Same filtering the site nav applies: drop pages the current version lacks. */
  const links = buildVersionedSidebar(sidebarLinks, currentDocsVersion);

  const sections = links.map(entry => {
    const heading = `## ${entry.title}`;
    const body = entry.href
      ? `- [${entry.title}](${websiteUrl}${entry.href})`
      : toLines(entry.pages ?? []).join('\n');
    return `${heading}\n${body}`;
  });

  const body = [
    `# ${defaultPageTitle}`,
    '',
    `> ${defaultPageDescription}`,
    '',
    `- [GitHub repository](${githubRepoLink})`,
    `- [npm package](${npmLink})`,
    '',
    sections.join('\n\n'),
    ''
  ].join('\n');

  return new Response(body, {
    headers: { 'content-type': 'text/plain; charset=utf-8' }
  });
}
