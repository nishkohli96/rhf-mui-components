'use client';

import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import { sidebarLinks } from '@/constants';
import { type Page } from '@/types';
import { buildVersionedSidebar, getDocsVersion } from '@/utils';
import {
  GithubButton,
  NpmButton,
  // PlaygroundButton
} from '../buttons';

const drawerLogoSize = '40px';

const containsPath = (page: Page, pathname: string): boolean => {
  return (
    page.href === pathname
    || page.pages?.some(child => containsPath(child, pathname)) === true
  );
};

type SidebarItemProps = DrawerProps & {
  page: Page;
  pathname: string;
  depth?: number;
};

const SidebarItem = ({ page, pathname, onNavigate, depth = 0 }: SidebarItemProps) => {
  const hasChildren = Boolean(page.pages?.length);
  const containsActivePage = containsPath(page, pathname);
  const isActive = page.href === pathname;
  const [open, setOpen] = useState(containsActivePage);

  /**
   * Auto-expand when this branch newly contains the active page (e.g.
   * client-side nav into a collapsed section). Adjusting state during
   * render — tracking the previous value — is React's recommended
   * alternative to a setState-in-effect and avoids an extra paint.
   */
  const [wasActive, setWasActive] = useState(containsActivePage);
  if (containsActivePage !== wasActive) {
    setWasActive(containsActivePage);
    if (containsActivePage) {
      setOpen(true);
    }
  }

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton
          {...(!hasChildren && page.href ? { href: page.href } : {})}
          onClick={hasChildren ? () => setOpen(value => !value) : onNavigate}
          selected={isActive}
          aria-expanded={hasChildren ? open : undefined}
          sx={{
            borderRadius: 2,
            my: 0.25,
            pl: 2 + depth * 2,
            '&.Mui-selected': { color: 'primary.main', bgcolor: 'action.selected' },
            '&.Mui-selected:hover': { bgcolor: 'action.selected' }
          }}
        >
          <ListItemText
            slotProps={{
              primary: {
                sx: {
                  fontSize: '0.9rem',
                  fontWeight: isActive || (hasChildren && containsActivePage) ? 600 : 400
                }
              }
            }}
          >
            {page.title}
          </ListItemText>
          {hasChildren && (open ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />)}
        </ListItemButton>
      </ListItem>
      {hasChildren && (
        <Collapse in={open} timeout="auto">
          <List component="div" dense disablePadding>
            {page.pages?.map(child => (
              <SidebarItem
                key={child.href ?? child.title}
                page={child}
                pathname={pathname}
                onNavigate={onNavigate}
                depth={depth + 1}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

type DrawerProps = {
  /** Called after a link is clicked, e.g. to close the mobile drawer. */
  onNavigate?: () => void;
};

/**
 * Side-navigation list shared by the desktop rail and the mobile drawer.
 * Highlights the current route and, on navigation, scrolls the active item
 * into view within the rail's own scroll area — otherwise landing on a deep
 * item (e.g. Rating) leaves the rail scrolled to the top with the highlight
 * off-screen.
 */
const Drawer = ({ onNavigate }: DrawerProps) => {
  const pathname = usePathname();
  const listRef = useRef<HTMLUListElement>(null);

  /*
   * Rebuild the tree for whichever version the reader is in, so every link
   * stays inside it (`/v1/...` keeps navigating within v1) and sections that
   * version doesn't have are hidden rather than linking to a 404.
   */
  const versionedLinks = useMemo(
    () => buildVersionedSidebar(sidebarLinks, getDocsVersion(pathname)),
    [pathname]
  );

  useLayoutEffect(() => {
    const list = listRef.current;
    const active = list?.querySelector<HTMLElement>('.Mui-selected');
    if (!list || !active) {
      return;
    }

    /**
     * Nearest scrollable ancestor — the desktop rail's overflow box or the
     * mobile drawer paper. Scroll only this element, never the window.
     */
    let container: HTMLElement | null = list.parentElement;
    while (container) {
      const { overflowY } = getComputedStyle(container);
      if (overflowY === 'auto' || overflowY === 'scroll') {
        break;
      }
      container = container.parentElement;
    }
    if (!container) {
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    const fullyVisible
      = activeRect.top >= containerRect.top
        && activeRect.bottom <= containerRect.bottom;
    if (fullyVisible) {
      return;
    }

    /* Center the active item in the rail's viewport. */
    container.scrollTop
      += (activeRect.top - containerRect.top)
        - (container.clientHeight - activeRect.height) / 2;
  }, [pathname]);

  return (
    <>
      <MuiAppBar
        position="sticky"
        elevation={0}
        color="inherit"
        sx={{
          bgcolor: 'background.default',
          color: 'text.primary',
          borderBottom: '1px solid',
          borderColor: 'divider',
          display: { md: 'none' }
        }}
      >
        <Toolbar sx={{ px: { xs: 1, sm: 2 }, gap: 0.5 }}>
          <Box
            sx={{
              position: 'relative',
              width: drawerLogoSize,
              height: drawerLogoSize,
              flexShrink: 0
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
                priority
                sizes={drawerLogoSize}
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
                priority
                sizes="40px"
                style={{ borderRadius: '50%', objectFit: 'cover' }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              alignItems: 'center',
              ml: 1,
              '@media (max-width: 479px)': {
                display: 'none'
              }
            }}
          >
            <Image
              src={'/wordmark.svg'}
              alt="RHF-MUI Components"
              priority
              width={149}
              height={28}
            />
          </Box>
          <Box
            sx={{
              display: { xs: 'flex', sm: 'none' },
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: 0.5,
              ml: 'auto',
            }}
          >
            {/* <PlaygroundButton /> */}
            <NpmButton />
            <GithubButton />
          </Box>
        </Toolbar>
      </MuiAppBar>
      <List dense sx={{ px: 1 }} ref={listRef}>
        {versionedLinks.map(link => (
          <SidebarItem
            key={link.href ?? link.title}
            page={link}
            pathname={pathname}
            onNavigate={onNavigate}
          />
        ))}
      </List>
    </>
  );
};

export default Drawer;
