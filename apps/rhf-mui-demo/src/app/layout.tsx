import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import Grid from '@mui/material/Grid2';
import { ToastContainer } from 'react-toastify';
import { AppThemeProvider } from '@/theme';
import { AppBar, Drawer, Footer } from '@/components';
import './globals.css';

type RootLayoutProps = {
  children: React.ReactNode;
};

const inter = Inter({ subsets: ['latin'] });
const defaultTitle = 'RHF-Mui Components';

export const metadata: Metadata = {
  title: {
    template: `%s | ${defaultTitle}`,
    default: defaultTitle
  },
  description: 'Examples for RHF-Mui Components'
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
            <ToastContainer
              autoClose={10000}
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
