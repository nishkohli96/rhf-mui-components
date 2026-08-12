import Image from 'next/image';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { NotFoundActions } from '@/components';
import { pageMetadata } from '@/constants';

export const metadata = pageMetadata.notFound;

export default function NotFound() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 65px)',
        overflowY: 'auto',
        mt: { xs: '-20px', md: '-28px' },
        mb: { xs: '-36px', md: '-48px' }
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}
      >
        <Image
          src="/404.png"
          alt="404"
          width={1254}
          height={1254}
          priority
          style={{ width: '100%', maxWidth: 320, height: 'auto' }}
        />
        <Typography
          variant="h4"
          sx={{ fontWeight: 800 }}
        >
          Page not found
        </Typography>
        <Typography
          sx={{
            mt: 1.5,
            color: 'text.secondary',
            maxWidth: 420
          }}
        >
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
          Check the URL, or head back to where you came from.
        </Typography>
        <NotFoundActions />
      </Container>
    </Box>
  );
}
