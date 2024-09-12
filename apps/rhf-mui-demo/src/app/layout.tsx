import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/assets/styles/theme';
import { AppBar, DrawerContent, Footer } from '@/components';
import { AppThemeContext } from '@/context/theme';
import './globals.css';
import Grid from '@mui/material/Grid';

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
  description: 'Docs & Demo for RHF-Mui Components'
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider options={{ key: 'mui' }}>
          <ThemeProvider theme={theme}>
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
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
