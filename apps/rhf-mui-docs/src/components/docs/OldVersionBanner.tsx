'use client';

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import Alert from '@mui/material/Alert';
import MuiLink from '@mui/material/Link';
import { currentDocsVersion } from '@/constants';
import { getDocsVersion, resolveVersionSwitchHref } from '@/utils';

/**
 * Shown on every legacy-version doc page (/v1–/v4). Tells readers — and, via
 * the plain in-DOM link, crawlers — that a newer version exists, pointing at
 * the same page in the current version (or its introduction if it's gone).
 * Current-version pages render nothing.
 */
const OldVersionBanner = () => {
  const pathname = usePathname();
  const version = getDocsVersion(pathname);

  if (version.slug === currentDocsVersion.slug) {
    return null;
  }

  const latestHref = resolveVersionSwitchHref(currentDocsVersion, pathname);

  return (
    <Alert severity="warning" sx={{ mb: '20px' }}>
      {`You're viewing the ${version.label} docs. `}
      <MuiLink component={NextLink} href={latestHref} underline="hover">
        {`Switch to the latest version (${currentDocsVersion.label}).`}
      </MuiLink>
    </Alert>
  );
};

export default OldVersionBanner;
