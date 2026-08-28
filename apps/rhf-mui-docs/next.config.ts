import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  /* .mdx pages compile to server components — docs ship as static HTML. */
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'mdx'],
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      }
    ],
  }
};

const withMDX = createMDX({
  options: {
    /**
     * Turbopack requires plugins as serializable strings, not imports.
     * - remark-gfm: GitHub-flavored markdown (props tables).
     * - rehype-slug: ids on headings for anchors + the page TOC.
     * - @shikijs/rehype: build-time highlighting of ```fences``` with
     *   VS Code's Light+/Dark+ themes; both palettes are emitted as CSS
     *   variables and switched in globals.css via data-mui-color-scheme.
     */
    remarkPlugins: [['remark-gfm']],
    rehypePlugins: [
      ['rehype-slug'],
      [
        '@shikijs/rehype',
        {
          themes: { light: 'light-plus', dark: 'dark-plus' },
          defaultColor: false
        }
      ]
    ]
  }
});

export default withMDX(nextConfig);
