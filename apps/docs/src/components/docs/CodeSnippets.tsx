/**
 * Server-side entry for `CodeSnippetsView`: resolves each snippet — either
 * already-computed `{ code, html }`, or a `{ src }` file path read and
 * syntax-highlighted here at render time with the same shiki config as the
 * MDX code fences (`themes: { light: 'light-plus', dark: 'dark-plus' }`,
 * `defaultColor: false`) — then hands the resolved list to the interactive
 * client view.
 *
 * Kept as a plain async Server Component (no `'use client'`) specifically so
 * it can be dropped straight into a `.mdx` page — MDX bodies can't `await`,
 * but React can render an async Server Component nested anywhere in the tree
 * without the caller needing to await it.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { type ReactNode } from 'react';
import { codeToHtml } from 'shiki';
import CodeSnippetsView, { type ResolvedSnippet } from './CodeSnippetsView';

/** Either a pre-resolved snippet, or a source file to read and highlight at render time. */
export type ComponentSnippet =
  | ResolvedSnippet
  | {
    /** File name shown as the accordion title. */
    title: string;
    /**
     * Path to the source file, relative to the docs app root (e.g.
     * `src/forms/styled-components/StyledTextField.tsx`).
     */
    src: string;
  };

/**
 * `process.cwd()` is the monorepo root when running `next dev` but the app dir
 * on a Vercel build, so resolve `src` from whichever base actually contains it.
 */
async function resolveSrcPath(src: string): Promise<string> {
  const candidates = [
    path.join(process.cwd(), 'apps/docs', src),
    path.join(process.cwd(), src)
  ];
  for (const candidate of candidates) {
    try {
      await fs.access(candidate);
      return candidate;
    } catch {
      /* not this base — try the next candidate */
    }
  }
  return candidates[candidates.length - 1];
}

const isResolvedSnippet = (
  snippet: ComponentSnippet
): snippet is ResolvedSnippet => 'code' in snippet && 'html' in snippet;

async function resolveSnippet(snippet: ComponentSnippet): Promise<ResolvedSnippet> {
  if (isResolvedSnippet(snippet)) {
    return snippet;
  }

  const filePath = await resolveSrcPath(snippet.src);
  const code = await fs.readFile(filePath, 'utf8');
  const html = await codeToHtml(code, {
    lang: 'tsx',
    themes: { light: 'light-plus', dark: 'dark-plus' },
    defaultColor: false
  });
  return { title: snippet.title, code, html };
}

type CodeSnippetsProps = {
  title?: ReactNode;
  description?: ReactNode;
  snippets: ComponentSnippet[];
};

const CodeSnippets = async ({
  title,
  description,
  snippets
}: CodeSnippetsProps) => {
  const resolvedSnippets = await Promise.all(snippets.map(resolveSnippet));
  return (
    <CodeSnippetsView
      title={title}
      description={description}
      snippets={resolvedSnippets}
    />
  );
};

export default CodeSnippets;
