'use client';

import { Fragment, useState } from 'react';
import dynamic from 'next/dynamic';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const DrawerContentClient = dynamic(() => import('@/components/drawer'), { ssr: false });

/**
 * Mobile-only menu button that opens the side navigation in a temporary
 * drawer. Closes automatically when a page link is selected.
 */
const DrawerMenu = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setDrawerOpen(newOpen);
  };

  return (
    <Fragment>
      <IconButton
        aria-label="Menu"
        onClick={toggleDrawer(true)}
        color="inherit"
        sx={{ display: { xs: 'inline-flex', md: 'none' }, mr: 0.5 }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              width: 'min(320px, 80vw)',
              overlay: 'none'
            },
          }
        }}
      >
        <DrawerContentClient onNavigate={toggleDrawer(false)} />
      </Drawer>
    </Fragment>
  );
};

export default DrawerMenu;
