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

/**
 * From version 7, renderTags prop of Autocomplete has been deprecated, in
 * favour of renderValue. Using this flag, I can conditionally use the
 * correct prop based on the MUI version.
 */
export const isMuiV7AndAbove = !isMuiV6 && !isAboveMuiV5;
