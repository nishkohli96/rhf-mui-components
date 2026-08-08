'use client';

import { useRouter, usePathname } from 'next/navigation';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import { docsVersions } from '@/constants';
import { getDocsVersion, resolveVersionSwitchHref } from '@/utils';

/**
 * Docusaurus-style docs version switcher.
 *
 * Selecting a version keeps the reader on the same page across the switch —
 * `/components/mui/textfield` ⇄ `/v1/components/mui/textfield` — falling back
 * to that version's landing page when the current page doesn't exist there.
 */
const VersionSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const activeVersion = getDocsVersion(pathname);

  const handleChange = (event: SelectChangeEvent) => {
    const target = docsVersions.find(
      version => version.slug === event.target.value
    );
    if (target && target.slug !== activeVersion.slug) {
      router.push(resolveVersionSwitchHref(target, pathname));
    }
  };

  return (
    <Select
      value={activeVersion.slug}
      onChange={handleChange}
      size="small"
      aria-label="Select documentation version"
      /* Menu is anchored to the control so it lines up under the trigger. */
      MenuProps={{
        anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
        transformOrigin: { vertical: 'top', horizontal: 'right' },
        slotProps: { paper: { sx: { mt: 0.5, minWidth: 120 } } }
      }}
      sx={{
        ml: 0.5,
        color: 'inherit',
        fontSize: '0.875rem',
        '.MuiSelect-select': { py: 0.5, pl: 1.25 },
        '.MuiOutlinedInput-notchedOutline': { borderColor: 'divider' },
        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'text.secondary' },
        '.MuiSelect-icon': { color: 'inherit' },
      }}
    >
      {docsVersions.map(version => (
        <MenuItem key={version.slug} value={version.slug} dense>
          {version.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default VersionSwitcher;
