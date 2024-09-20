import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { AppThemeProvider } from '@/theme';
import { AppBar, Footer } from '@/components';
import './globals.css';
import Grid from '@mui/material/Grid';
import DrawerContent from '@/components/drawer';

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

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider options={{ key: 'mui' }}>
          <AppThemeProvider>
            <AppBar />
            <Grid container className="content">
              <Grid item md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
                <DrawerContent />
              </Grid>
              <Grid
                item
                xs={12}
                md={9}
              >
                {children}
              </Grid>
            </Grid>
            <Footer />
          </AppThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
