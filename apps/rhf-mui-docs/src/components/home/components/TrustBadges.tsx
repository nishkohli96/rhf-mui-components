import LocalOfferRoundedIcon from '@mui/icons-material/LocalOfferRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import GavelRoundedIcon from '@mui/icons-material/GavelRounded';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Skeleton from '@mui/material/Skeleton';
import { githubRepoLink, npmLink } from '@/constants';

const npmPackage = '@nish1896/rhf-mui-components';
const githubRepo = 'nishkohli96/rhf-mui-components';

const compactNumber = new Intl.NumberFormat('en', { notation: 'compact' });

/**
 * Fetched at request time with an hour-long cache (`next.revalidate`) —
 * frequent enough to stay honest, rare enough not to hammer the npm/GitHub
 * APIs on every homepage hit.
 */
const getNpmPackageInfo = async () => {
  try {
    const res = await fetch(
      `https://registry.npmjs.org/${npmPackage}/latest`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) {
      return null;
    }
    const data = await res.json() as { version?: string; license?: string };
    return data;
  } catch {
    return null;
  }
};

const getNpmMonthlyDownloads = async () => {
  try {
    const res = await fetch(
      `https://api.npmjs.org/downloads/point/last-month/${npmPackage}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) {
      return null;
    }
    const data = await res.json() as { downloads?: number };
    return data.downloads ?? null;
  } catch {
    return null;
  }
};

const getGithubStars = async () => {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${githubRepo}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) {
      return null;
    }
    const data = await res.json() as { stargazers_count?: number };
    return data.stargazers_count ?? null;
  } catch {
    return null;
  }
};

/**
 * Live npm/GitHub trust signals (version, downloads, stars, license) — the
 * same data an npm/GitHub registry page leads with, styled as chips instead
 * of shields.io badges so it reads as part of this page, not a pasted README.
 */
const TrustBadges = async () => {
  const [npmInfo, downloads] = await Promise.all([
    getNpmPackageInfo(),
    getNpmMonthlyDownloads(),
    // getGithubStars()
  ]);

  const badges = [
    npmInfo?.version && {
      key: 'version',
      label: `v${npmInfo.version}`,
      href: npmLink,
      icon: <LocalOfferRoundedIcon fontSize="small" />
    },
    downloads !== null && {
      key: 'downloads',
      label: `${compactNumber.format(downloads)} downloads/mo`,
      href: npmLink,
      icon: <DownloadRoundedIcon />
    },
    // stars !== null && {
    //   key: 'stars',
    //   label: `${compactNumber.format(stars)} stars`,
    //   href: githubRepoLink,
    //   icon: <StarRoundedIcon />
    // },
    npmInfo?.license && {
      key: 'license',
      label: npmInfo.license,
      href: githubRepoLink,
      icon: <GavelRoundedIcon />
    }
  ].filter(Boolean) as { key: string; label: string; href: string; icon: React.ReactElement }[];

  if (badges.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 1,
        mt: 4
      }}
    >
      {badges.map(badge => (
        <Chip
          key={badge.key}
          component="a"
          href={badge.href}
          target="_blank"
          rel="noopener noreferrer"
          clickable
          icon={badge.icon}
          label={badge.label}
          size="small"
          variant="outlined"
          sx={{
            fontWeight: 600,
            padding: '4px',
            '& .MuiChip-icon': { color: 'text.secondary' },
            '&:hover': { borderColor: 'primary.main', color: 'primary.main' },
            '&:hover .MuiChip-icon': { color: 'primary.main' }
          }}
        />
      ))}
    </Box>
  );
};

/**
 * Same footprint as the loaded chips (row of four ~24px pills), so swapping
 * it out for the real content inside the `<Suspense>` boundary in
 * `home/index.tsx` doesn't shift anything below it.
 */
export const TrustBadgesSkeleton = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      gap: 1,
      mt: 4
    }}
  >
    {[70, 130, 60].map((width, i) => (
      <Skeleton
        key={i}
        variant="rounded"
        width={width}
        height={24}
        sx={{ borderRadius: 4 }}
      />
    ))}
  </Box>
);

export default TrustBadges;
