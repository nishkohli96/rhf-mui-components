import muiPackage from '@mui/material/package.json';

/**
 * After migrating from MUI v5 to v6, some of the props like "InputProps"
 * for Textfield have been marked as deprecated and will likely be removed
 * in future versions. This flag is ensures that no deprecated props are
 * being passed to any of the components in v6 or above.
 */
const isMuiV5 = muiPackage.version.startsWith('5.');
export const isAboveMuiV5 = !isMuiV5;

export const isMuiV6 = muiPackage.version.startsWith('6.');

const muiMajorVersion = Number.parseInt(
  muiPackage.version.split('.')[0] ?? '0',
  10
);

/**
 * MUI v7+ (major version). Used for APIs that differ from v6 (e.g. future
 * Autocomplete changes). `!isMuiV6 && !isAboveMuiV5` was incorrect for v7.
 */
export const isMuiV7AndAbove = muiMajorVersion >= 7;
