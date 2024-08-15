import Link from 'next/link';
import Image from 'next/image';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import NkLogo from '../../../public/nk-logo.png';
import { DrawerMenu } from './DrawerMenu';

export function AppBar() {
  return (
    <Box>
      <MuiAppBar position="static">
        <Toolbar>
          <DrawerMenu />
          <Link href="/">
            <Image
              src={NkLogo}
              alt="Logo"
              width={50}
              height={50}
              style={{
                borderRadius: '50%',
                objectFit: 'cover'
              }}
            />
          </Link>
          <Box
            sx={{
              flexGrow: 1,
              textAlign: 'center'
            }}
          >
            <Typography variant="h6">RHF-Mui Components</Typography>
          </Box>
          <Tooltip title="Toggle Theme">
            <IconButton aria-label="Toggle Theme">
              <DarkModeIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
}
