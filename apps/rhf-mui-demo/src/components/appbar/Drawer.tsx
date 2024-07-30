'use client';

import { Fragment, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { DrawerContent } from '@/components';

export function DrawerMenu() {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setDrawerOpen(newOpen);
  };

  return (
    <Fragment>
      <IconButton aria-label="Menu" onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{ sx: { width: '70vw' } }}
      >
        <DrawerContent />
      </Drawer>
    </Fragment>
  );
}
