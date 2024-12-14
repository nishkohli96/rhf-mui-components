import muiPackage from '@mui/material/package.json';

/**
 * After migrating from MUI v5 to v6, some of the props like "InputProps"
 * for Textfield have been marked as deprecated and will likely be removed
 * in future versions. This flag is ensures that no deprecated props are
 * being passed to any of the components in v6 or above.
 */
export const isAboveMuiV5 = !(muiPackage.version.startsWith('5.'));
