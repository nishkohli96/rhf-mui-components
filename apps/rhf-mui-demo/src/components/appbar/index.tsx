import Link from 'next/link';
import Image from 'next/image';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import RHFMuiLogo from '../../../public/rhf-mui.png';
import DrawerMenu from './DrawerMenu';
import {
  DocsButton,
  GithubButton,
  ThemeChangeButton
} from '../buttons';

const AppBar = () => {
  return (
    <Box>
      <MuiAppBar position="static">
        <Toolbar sx={{ px: { xs: 1, sm: 2 } }}>
          <DrawerMenu />
          <Link href="/" style={{ display: 'flex' }}>
            <Image
              src={RHFMuiLogo}
              alt="Logo"
              width={45}
              height={45}
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
            <Typography
              variant="h6"
              sx={{ lineHeight: { xs: 1, md: 1.6 } }}
            >
              RHF-Mui Components
            </Typography>
          </Box>
          <DocsButton />
          <GithubButton />
          <ThemeChangeButton />
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
};

export default AppBar;
