import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import Grid from '@mui/material/Grid';
import { ToastContainer } from 'react-toastify';
import { Analytics } from '@vercel/analytics/next';
import {
  defaultPageTitle,
  defaultPageDescription,
  defaultPageKeywords
} from '@/constants';
import {
  AppBar,
  ConfigProviderWrapper,
  Drawer,
  FirebaseAnalytics,
  Footer
} from '@/components';
import { AppThemeProvider } from '@/theme';
import {
  colorSchemeAttribute,
  modeStorageKey
} from '@/theme/constants';
import './globals.css';

type RootLayoutProps = {
  children: React.ReactNode;
};

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: `%s | ${defaultPageTitle}`,
    default: defaultPageTitle
  },
  description: defaultPageDescription,
  keywords: defaultPageKeywords
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/*
          Runs as a blocking script BEFORE React hydrates.
          Reads localStorage → applies data-color-scheme on <html>.
          Falls back to system preference if no stored value.
          Must come before the <main> element
        */}
        <InitColorSchemeScript
          attribute={colorSchemeAttribute}
          defaultMode="system"
          modeStorageKey={modeStorageKey}
        />
        <AppRouterCacheProvider options={{ key: 'mui' }}>
          <AppThemeProvider>
            <AppBar />
            <Grid container className="content">
              <Grid
                size={{ md: 3 }}
                sx={{ display: { xs: 'none', md: 'block' } }}
              >
                <Drawer />
              </Grid>
              <Grid size={{ xs: 12, md: 9 }}>
                <ConfigProviderWrapper>
                  {children}
                </ConfigProviderWrapper>
              </Grid>
            </Grid>
            <Footer />
            <FirebaseAnalytics />
            <Analytics />
            <ToastContainer
              autoClose={3000}
              limit={3}
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
