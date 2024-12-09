'use client';

import Link from 'next/link';
import Image from 'next/image';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid2';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { MySocials } from '@/constants';

const Footer = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container sx={{ padding: '10px' }}>
          <Grid
            size={12}
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            {MySocials.map(social => (
              <Link
                key={social.name}
                href={social.href}
                target="_blank"
                className="mx-1"
              >
                <Tooltip title={social.name}>
                  <Image
                    src={social.imgSrc}
                    alt={social.name}
                    width={30}
                    height={30}
                  />
                </Tooltip>
              </Link>
            ))}
          </Grid>
          <Grid size={12}>
            <Typography
              variant="body1"
              sx={{ mt: '10px', textAlign: 'center' }}
            >
              Made with ❤️ by Nish!!!!
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
