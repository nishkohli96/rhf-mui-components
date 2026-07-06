'use client';

import { Fragment, useState } from 'react';
import dynamic from 'next/dynamic';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const DrawerContentClient = dynamic(() => import('@/components/drawer'), { ssr: false });

const DrawerMenu = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setDrawerOpen(newOpen);
  };

  /**
   * Add icons for github repo and docs link
   */
  return (
    <Fragment>
      <IconButton
        aria-label="Menu"
        onClick={toggleDrawer(true)}
        sx={{ display: { xs: 'inline-flex', md: 'none' } }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        slotProps={{
          paper: { sx: { width: '70vw' } }
        }}
      >
        <DrawerContentClient />
      </Drawer>
    </Fragment>
  );
};

export default DrawerMenu;
