import Link from 'next/link';
import Image from 'next/image';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import DrawerMenu from './DrawerMenu';
import VersionSwitcher from '../version-switcher';
import {
  GithubButton,
  NpmButton,
  ThemeChangeButton,
  // PlaygroundButton
} from '../buttons';

/**
 * Sticky, flat docs-style header: brand on the left, actions on the right.
 * On small screens the side navigation collapses into the DrawerMenu button.
 */
const AppBar = () => {
  return (
    <MuiAppBar
      position="sticky"
      elevation={0}
      color="inherit"
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        borderBottom: '1px solid',
        borderColor: 'divider',
        '[data-mui-color-scheme="dark"] &': {
          /**
           * Blend with the canvas (background.default at 85%) instead
           * of sitting on it as a paper slab; the blur keeps scrolled
           * content legible underneath, like mui.com.
           */
          bgcolor: 'rgba(11, 14, 20, 0.85)',
          backdropFilter: 'blur(8px)',
          borderColor: 'divider'
        }
      }}
    >
      <Toolbar sx={{ px: { xs: 1, sm: 2 }, gap: 0.5 }}>
        <DrawerMenu />
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            textDecoration: 'none',
            color: 'inherit',
            minWidth: 0
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: 45,
              height: 45,
              flexShrink: 0,
              '@media (max-width: 400px)': {
                display: 'none'
              }
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                display: 'block',
                '[data-mui-color-scheme="dark"] &': { display: 'none' }
              }}
            >
              <Image
                src="/logo.png"
                alt=""
                fill
                style={{ borderRadius: '50%', objectFit: 'cover' }}
              />
            </Box>
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                display: 'none',
                '[data-mui-color-scheme="dark"] &': { display: 'block' }
              }}
            >
              <Image
                src="/logo-dark.png"
                alt=""
                fill
                style={{
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              '& img': {
                height: { xs: '40px', md: '50px' },
                width: 'auto'
              },
            }}
          >
            <Image
              src={'/wordmark.svg'}
              alt="RHF-MUI Components"
              priority
              width={320}
              height={60}
            />
          </Box>
        </Link>
        <Box sx={{ flexGrow: 1 }} />
        <VersionSwitcher />
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            alignItems: 'center',
            gap: 1,
            ml: 1,
          }}
        >
          {/* <PlaygroundButton /> */}
          <NpmButton />
          <GithubButton />
        </Box>
        <ThemeChangeButton />
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
