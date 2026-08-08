'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { GradientButton } from '../buttons';

/**
 * Action buttons for the 404 page. Client-only because "Go Back" needs
 * `router.back()`, which isn't available on the server.
 */
const NotFoundActions = () => {
  const router = useRouter();
  return (
    <Box
      sx={{
        mt: 3,
        display: 'flex',
        gap: 1.5,
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}
    >
      <GradientButton onClick={() => router.back()}>
        Go Back
      </GradientButton>
      <Button
        component={Link}
        href="/introduction"
        variant="outlined"
        sx={{
          minWidth: 132,
          height: 42,
          borderRadius: 2,
          fontWeight: 800,
          textTransform: 'none'
        }}
      >
        Go to Docs
      </Button>
    </Box>
  );
};

export default NotFoundActions;
