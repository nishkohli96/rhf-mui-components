import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import Grid from '@mui/material/Grid';
import { ToastContainer } from 'react-toastify';
import {
  defaultPageTitle,
  defaultPageDescription,
  defaultPageKeywords
} from '@/constants';
import { AppBar, Drawer, FirebaseAnalytics, Footer } from '@/components';
import { AppThemeProvider } from '@/theme';
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
    <html lang="en">
      <body className={inter.className}>
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
                {children}
              </Grid>
            </Grid>
            <Footer />
            <FirebaseAnalytics />
            <ToastContainer
              autoClose={3000}
              limit={1}
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
