import Image from 'next/image';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

const sponsors = [
  {
    name: 'Ramakanth Evani',
    href: 'https://www.linkedin.com/in/eramakanth/',
    avatar: '/sponsors/ramakant.jpeg'
  }
];

/**
 * Sponsor avatars, linking out to each sponsor's own profile.
 */
const Sponsors = () => (
  <Box sx={{ mt: 4 }}>
    <Typography
      variant="body2"
      sx={{
        display: 'block',
        mb: 1.5,
        color: 'primary.main',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        fontWeight: 600
      }}
    >
      Sponsors
    </Typography>
    <Typography
      variant="body2"
      sx={{ mb: 2, color: 'text.secondary' }}
    >
      Supported by generous folks who help keep this project going.
    </Typography>
    <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 1.5 }}>
      {sponsors.map(sponsor => (
        <Tooltip key={sponsor.name} title={sponsor.name}>
          <Box
            component="a"
            href={sponsor.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={sponsor.name}
            sx={{
              display: 'block',
              width: { xs: 35, sm: 45 },
              height: { xs: 35, sm: 45 },
              lineHeight: 0,
              borderRadius: '50%',
              outlineOffset: 2,
              transition: 'transform 0.15s ease-in-out',
              '&:hover': { transform: 'scale(1.08)' }
            }}
          >
            <Image
              src={sponsor.avatar}
              alt={sponsor.name}
              width={45}
              height={45}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%'
              }}
            />
          </Box>
        </Tooltip>
      ))}
    </Box>
  </Box>
);

export default Sponsors;
