import muiPackage from '@mui/material/package.json';
import type { SxProps, Theme } from '@mui/material/styles';

/**
 * After migrating from MUI v5 to v6, some of the props like "InputProps"
 * for Textfield have been marked as deprecated and will likely be removed
 * in future versions. This flag is ensures that no deprecated props are
 * being passed to any of the components in v6 or above.
 */
export const isAboveMuiV5 = !(muiPackage.version.startsWith('5.'));

type SxInput = SxProps<Theme> | undefined;

/**
 * Combine several `sx` values into a single `sx` array.
 *
 * MUI's `sx` accepts an object, a theme-callback function, or an array of those.
 * Object-spreading two `sx` values (`{ ...a, ...b }`) silently breaks the last
 * two forms — an array collapses into numeric keys and a callback loses its
 * behaviour. Flattening into an array preserves every form. Later sources still
 * win, matching object-spread precedence.
 */
export function mergeSx(...sources: SxInput[]): SxProps<Theme> {
  return sources.flatMap(sx => {
    if (Array.isArray(sx)) {
      return sx;
    }
    return sx ? [sx] : [];
  });
}
