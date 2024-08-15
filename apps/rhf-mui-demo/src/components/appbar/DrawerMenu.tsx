'use client';

import { Fragment, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { DrawerContent } from '@/components';

export function DrawerMenu() {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const theme = useTheme();
  const isPhone = useMediaQuery(theme.breakpoints.down('md'));

  const toggleDrawer = (newOpen: boolean) => () => {
    setDrawerOpen(newOpen);
  };

  return (
    <Fragment>
      {isPhone && (
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
      )}
    </Fragment>
  );
}
