import Image from 'next/image';
import Box from '@mui/material/Box';
import MuiLink from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { sponsorLink } from '@/constants';

type Sponsor = {
  name: string;
  href: string;
  avatar: string;
};

const currentSponsors: Sponsor[] = [];

const pastSponsors: Sponsor[] = [
  {
    name: 'Ramakanth Evani',
    href: 'https://www.linkedin.com/in/eramakanth/',
    avatar: '/sponsors/ramakant.jpeg'
  }
];

const SponsorAvatars = ({ sponsors }: { sponsors: Sponsor[] }) => (
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
);

/**
 * Sponsor avatars, linking out to each sponsor's own profile, split into
 * current and past sponsors.
 */
const Sponsors = () => (
  <Box sx={{ mt: 4 }}>
    <Typography
      variant="h6"
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
    {currentSponsors.length > 0
      ? (
        <SponsorAvatars sponsors={currentSponsors} />
      )
      : (
        <Typography
          variant="body1"
          sx={{ color: 'text.secondary' }}
        >
          No active sponsors right now.
          {' '}
          <MuiLink
            href={sponsorLink}
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
          >
            Become a sponsor
          </MuiLink>
          {' '}
          to help keep this project going.
        </Typography>
      )}
    <Typography
      variant="subtitle2"
      sx={{
        mt: 3,
        mb: 1.5,
        color: 'text.secondary',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }}
    >
      Past sponsors
    </Typography>
    <SponsorAvatars sponsors={pastSponsors} />
  </Box>
);

export default Sponsors;
