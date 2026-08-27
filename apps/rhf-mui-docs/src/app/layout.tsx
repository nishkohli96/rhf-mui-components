import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import { ToastContainer } from 'react-toastify';
import { Analytics } from '@vercel/analytics/next';
import {
  defaultPageTitle,
  defaultPageDescription,
  githubProfile,
  githubRepoLink,
  npmLink,
  websiteUrl,
} from '@/constants';
import AppShell from '@/components/app-shell';
import { AppThemeProvider } from '@/theme';
import { colorSchemeAttribute, modeStorageKey } from '@/theme/constants';
import { roboto } from '@/theme/fonts';
import './globals.css';

type RootLayoutProps = {
  children: React.ReactNode;
};

/* Person JSON-LD — identifies the site's author to AI/search crawlers. */
const authorJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Nishant Kohli',
  url: githubProfile,
  sameAs: [githubRepoLink, npmLink]
};

/*
 * Synchronous, no-flash color-scheme bootstrap. Runs as the first child of
 * <body>, so it executes during HTML parsing — before the browser paints
 * any body content — and stamps data-mui-color-scheme on <html> to match
 * the palette CSS already inlined in <head>.
 *
 * Why not `next/script strategy="beforeInteractive"`: that pushes the file
 * onto Next's async `__next_s` queue, which the runtime loads only AFTER the
 * first paint — so the page paints once in the default (light) scheme, then
 * repaints in the stored scheme. That one-frame repaint is the theme flash.
 * An inline <script dangerouslySetInnerHTML> has no such queue; it blocks and
 * runs in document order, guaranteeing the attribute is set before paint.
 * (Keep this logic in sync with src/theme/constants.ts.)
 */
const colorSchemeInit = `(function(){try{var m=localStorage.getItem('${modeStorageKey}')||'system';var s=m==='system'?(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):m;document.documentElement.setAttribute('${colorSchemeAttribute}',s);}catch(e){}})();`;

export const metadata: Metadata = {
  metadataBase: new URL(websiteUrl),
  title: {
    template: `%s | ${defaultPageTitle}`,
    default: defaultPageTitle
  },
  description: defaultPageDescription,
  applicationName: defaultPageTitle,
  authors: [{ name: 'Nishant Kohli', url: githubProfile }],
  creator: 'Nishant Kohli',
  openGraph: {
    type: 'website',
    siteName: defaultPageTitle,
  },
  twitter: {
    card: 'summary_large_image',
  }
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={roboto.className}>
        {/* Must be the first body child — see colorSchemeInit above. */}
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: colorSchemeInit }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(authorJsonLd) }}
        />
        <AppRouterCacheProvider options={{ key: 'mui' }}>
          <AppThemeProvider>
            <AppShell>
              {children}
            </AppShell>
            <Analytics />
            <ToastContainer
              autoClose={3000}
              limit={2}
              stacked
              closeButton
              style={{ fontSize: '1rem' }}
            />
          </AppThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
};

export default RootLayout;
