import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/assets/styles/theme';
import { AppBar, Footer } from '@/components';
import { AppThemeContext } from '@/context/theme';
import './globals.css';

type RootLayoutProps = {
  children: React.ReactNode;
};

const inter = Inter({ subsets: ['latin'] });
const defaultTitle = 'RHF-Mui Components';

export const metadata: Metadata = {
  title: {
    template: `%s | ${defaultTitle}`,
    default: defaultTitle,
  },
  description: 'Docs & Demo for RHF-Mui Components',
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider options={{ key: 'mui' }}>
          <ThemeProvider theme={theme}>
            <AppBar />
            <div className="content">
              {children}
            </div>
            <Footer />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
