import type { SxProps, Theme } from '@mui/material/styles';

/**
 * Combine several `sx` values into a single `sx` array.
 *
 * MUI's `sx` accepts an object, a theme-callback function, or an array of those.
 * Object-spreading two `sx` values (`{ ...a, ...b }`) silently breaks the last
 * two forms — an array collapses into numeric keys and a callback loses its
 * behaviour. Flattening into an array preserves every form. Later sources still
 * win, matching object-spread precedence.
 */
export function mergeSx(
  ...sources: (SxProps<Theme> | undefined)[]
): SxProps<Theme> {
  return sources.flatMap(sx => (Array.isArray(sx) ? sx : sx ? [sx] : []));
}
