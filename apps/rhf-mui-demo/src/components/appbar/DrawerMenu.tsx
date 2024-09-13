'use client';

import { Fragment, useState, useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { DrawerContent } from '@/components';
import { useClient } from '@/hooks';

export function DrawerMenu() {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);

  const theme = useTheme();
  const isPhone = useMediaQuery(theme.breakpoints.down('md'));
  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleDrawer = (newOpen: boolean) => () => {
    setDrawerOpen(newOpen);
  };

  return (
    <Fragment>
      {isClient && isPhone && (
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
