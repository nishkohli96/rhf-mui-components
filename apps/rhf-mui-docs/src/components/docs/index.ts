/**
 * Documentation building blocks for .mdx pages.
 *
 * - DocsPage: article + sticky right-rail table of contents.
 * - Callout: Docusaurus-style admonition (note/tip/info/warning/danger).
 * - MdxPre: code-block frame with a copy button (mapped in mdx-components).
 * - PackageManagerTabs: npm/yarn/pnpm install-command tabs (mapped in mdx-components).
 * - PageNav: Docusaurus-style prev/next footer nav, already included by DocsPage.
 * - PageToc: standalone TOC, already included by DocsPage.
 * - PropsTable: props reference table fed by `constants/props-table`.
 *
 * `CodeSnippets` is deliberately NOT re-exported here: it reads files off
 * disk (`node:fs`), and this barrel is reachable from many Client Components
 * via `@/components` (`export * from './docs'`) — bundling it in breaks the
 * client build. Import it directly: `@/components/docs/CodeSnippets`.
 */

export { default as AvailabilityBanner } from './AvailabilityBanner';
export { default as Callout } from './Callout';
export { default as DocsPage } from './DocsPage';
export { default as MdxPre } from './MdxPre';
export { default as PackageManagerTabs } from './PackageManagerTabs';
export { default as PageNav } from './PageNav';
export { default as PageToc } from './PageToc';
export { default as PropsTable } from './PropsTable';
