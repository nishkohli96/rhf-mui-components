'use client';

import { usePathname } from 'next/navigation';
import Box from '@mui/material/Box';
import {
  AppBar,
  Drawer,
  FirebaseAnalytics,
} from '@/components';

type AppShellProps = {
  children: React.ReactNode;
};

const AppShell = ({ children }: AppShellProps) => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  if (isHomePage) {
    return (
      <>
        {children}
        <FirebaseAnalytics />
      </>
    );
  }

  return (
    <>
      <AppBar />
      <Box className="content" sx={{ display: 'flex' }}>
        <Box
          component="nav"
          aria-label="Component pages"
          sx={{
            width: 260,
            flexShrink: 0,
            display: { xs: 'none', md: 'block' },
            position: 'sticky',
            top: 65,
            alignSelf: 'flex-start',
            height: 'calc(100vh - 65px)',
            overflowY: 'auto',
            borderRight: '1px solid',
            borderColor: 'divider',
            py: 1.5
          }}
        >
          <Drawer />
        </Box>
        <Box
          component="main"
          sx={{
            flex: 1,
            minWidth: 0,
            p: { xs: '20px 16px 36px', md: '28px 28px 48px' }
          }}
        >
          {children}
        </Box>
      </Box>
      <FirebaseAnalytics />
    </>
  );
};

export default AppShell;
