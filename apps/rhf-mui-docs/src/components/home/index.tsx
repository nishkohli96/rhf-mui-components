'use client';

import Image from 'next/image';
import Link from 'next/link';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import MuiLink from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { AppBar, Footer, GradientButton, Wordmark } from '@/components';
import CopyInstallCommand from './CopyInstallCommand';
import HomePageLinks from './HomePageLinks';

const installCommand = 'npm install @nish1896/rhf-mui-components';

const features = [
  {
    icon: '/icons/rhf.svg',
    title: 'Built for React Hook Form',
    description:
      'Every field plugs straight into control and registerOptions. No manual value/onChange wiring or error state to manage.'
  },
  {
    icon: '/icons/ts.svg',
    title: 'Fully typed',
    description:
      'Written in TypeScript from the ground up, with precise prop types for every component.'
  },
  {
    icon: '/icons/tree.svg',
    title: 'Tree-shakable',
    description:
      'Import only what you use, with subpath exports for mui, mui-pickers and misc components.'
  },
  {
    icon: '/icons/form.svg',
    title: 'Consistent form UX',
    description:
      'One label, error and helper-text system across all fields, with accessible names preserved.'
  }
];

const HomeLanding = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <AppBar />
      <Container
        component="main"
        maxWidth="lg"
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          py: { xs: 6, md: 10 }
        }}
      >
        <Box
          sx={{
            mx: 'auto',
            maxWidth: 720,
            textAlign: 'center'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Wordmark
              sx={{ fontSize: { xs: 34, sm: 44, md: 52, lg: 60 } }}
            />
          </Box>
          <Typography
            variant="h1"
            sx={{
              mt: 3,
              fontSize: { xs: 30, sm: 34, md: 42, lg: 46 },
              lineHeight: 1.15,
              fontWeight: 800,
              letterSpacing: 0
            }}
          >
            Production-ready form components for
            {' '}
            <MuiLink
              href="https://mui.com/"
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              sx={{ color: '#007FFF', textDecorationColor: '#007FFF' }}
            >
              Material UI
            </MuiLink>
          </Typography>
          <Typography
            sx={{
              mt: 3,
              mx: 'auto',
              maxWidth: 560,
              color: 'text.secondary',
              fontSize: { xs: 15, md: 17 },
              lineHeight: 1.7,
              fontWeight: 500
            }}
          >
            A suite of 25+ fully-typed, tree-shakable components built for React Hook
            Form. Production-ready with built-in validation, error handling, and a
            consistent API designed to minimize boilerplate.
          </Typography>
          <Paper
            variant="outlined"
            sx={{
              mt: 4,
              mx: 'auto',
              width: 'fit-content',
              maxWidth: '100%',
              display: 'flex',
              alignItems: 'center',
              borderRadius: 2,
              overflow: 'hidden',
              bgcolor: 'action.hover'
            }}
          >
            <Box
              component="code"
              sx={{
                px: { xs: 1.5, sm: 2 },
                py: 1.1,
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
                fontSize: { xs: 11, sm: 13 },
                color: 'text.primary',
                whiteSpace: 'nowrap',
                overflowX: 'auto'
              }}
            >
              {installCommand}
            </Box>
            <CopyInstallCommand command={installCommand} />
          </Paper>
          <GradientButton
            component={Link}
            href="/introduction"
            endIcon={<ArrowForwardRoundedIcon />}
            sx={{ mt: 3 }}
          >
            Get Started
          </GradientButton>
        </Box>
        <Box
          sx={{
            mt: { xs: 7, md: 9 },
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, minmax(0, 1fr))',
              lg: 'repeat(4, minmax(0, 1fr))'
            },
            gap: 2.5
          }}
        >
          {features.map(feature => {
            return (
              <Paper
                key={feature.title}
                variant="outlined"
                sx={{
                  height: '100%',
                  p: 3,
                  borderRadius: 2,
                  bgcolor: 'background.paper'
                }}
              >
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={60}
                  height={60}
                />
                <Typography sx={{ mt: 1, fontWeight: 800 }}>
                  {feature.title}
                </Typography>
                <Typography
                  sx={{
                    mt: 1,
                    color: 'text.secondary',
                    fontSize: 14,
                    lineHeight: 1.55
                  }}
                >
                  {feature.description}
                </Typography>
              </Paper>
            );
          })}
        </Box>
        <HomePageLinks />
      </Container>
      <Footer />
    </Box>
  );
};

export default HomeLanding;
