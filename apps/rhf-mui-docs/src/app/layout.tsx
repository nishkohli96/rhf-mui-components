import type { Metadata, Viewport } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { ToastContainer } from 'react-toastify';
import { Analytics } from '@vercel/analytics/next';
import {
  appName,
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

/* Site-wide structured data: the site itself + its author entity. */
const siteJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${websiteUrl}/#website`,
      url: `${websiteUrl}/`,
      name: appName,
      description: defaultPageDescription,
      inLanguage: 'en'
    },
    {
      '@type': 'Person',
      name: 'Nishant Kohli',
      url: githubProfile,
      sameAs: [githubRepoLink, npmLink]
    }
  ]
};

/*
 * DocSearch's own CSS reads a separate `data-theme` attribute (its
 * `[data-theme=dark]` selector), not MUI's `data-mui-color-scheme` — mirror
 * one into the other, synchronously, right after InitColorSchemeScript sets
 * it, so DocSearch never renders one frame behind on first paint.
 */
const syncDocSearchTheme = `document.documentElement.setAttribute('data-theme',document.documentElement.getAttribute('${colorSchemeAttribute}'));`;

export const metadata: Metadata = {
  metadataBase: new URL(websiteUrl),
  title: {
    template: `%s | ${appName}`,
    default: appName
  },
  description: defaultPageDescription,
  applicationName: appName,
  authors: [{ name: 'Nishant Kohli', url: githubProfile }],
  creator: 'Nishant Kohli',
  /**
   * Self-referencing canonical per route — Next resolves './' against
   * the current path. Legacy /v1–v4 pages get their own noindex via
   * those route-group layouts, so a self-canonical there is harmless.
   */
  alternates: { canonical: './' },
  openGraph: {
    type: 'website',
    siteName: appName,
    /* Resolved per-route against metadataBase, same as alternates.canonical. */
    url: './',
  },
  twitter: {
    card: 'summary_large_image',
  }
};

/*
 * `theme-color` per scheme — matches `background.default` in `theme/palette.ts`
 * (light `#ffffff`, dark `#0b0e14`) so the mobile browser chrome blends with
 * the page instead of defaulting to white in dark mode.
 */
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0b0e14' }
  ]
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={roboto.className}>
        {/* Must be the first body child — see colorSchemeInit above. */}
        <InitColorSchemeScript
          attribute={colorSchemeAttribute}
          modeStorageKey={modeStorageKey}
          defaultMode="system"
        />
        <script
          dangerouslySetInnerHTML={{ __html: syncDocSearchTheme }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
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
