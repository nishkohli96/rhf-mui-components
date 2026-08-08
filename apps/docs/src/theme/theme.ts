/**
 * https://v7.mui.com/material-ui/customization/css-theme-variables/configuration/
 */

'use client';

import { createTheme, type Theme } from '@mui/material/styles';
import {
  LightThemePalette,
  DarkThemePalette,
  CommonColorPalette
} from './palette';
import { colorSchemeAttribute } from './constants';
import { roboto } from './fonts';

export const theme: Theme = createTheme({
  cssVariables: {
    colorSchemeSelector: colorSchemeAttribute,
  },
  colorSchemes: {
    light: {
      palette: {
        ...CommonColorPalette,
        ...LightThemePalette,
      },
    },
    dark: {
      palette: {
        ...CommonColorPalette,
        ...DarkThemePalette,
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 480,
      md: 768,
      lg: 1024,
      xl: 1440,
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    /**
     * Links show no underline at rest, only on hover — MUI's default is
     * `underline="always"`. Set app-wide so every MuiLink (folder tree,
     * links list, future ones) is consistent without a per-usage prop.
     */
    MuiLink: {
      defaultProps: {
        underline: 'hover',
      },
    },
    /**
     * The default dark-mode `standard` Alert background/border sit only a
     * few RGB points off `background.default` for every severity (info,
     * success, warning, error alike), so alerts read as flat, indistinguishable
     * boxes. Tint them from each severity's own `main` color instead.
     *
     * Built from the `*Channel` CSS-var tokens (space-separated RGB, e.g.
     * "128 216 255"), not `theme.palette.X.main` — with CSS variables enabled,
     * `theme.palette.X.main` bakes in a single static value (the light scheme's),
     * so wrapping it in `applyStyles('dark', ...)` would still use the light
     * color. The `*Channel` var resolves through `--mui-palette-*` at runtime,
     * so it correctly picks up each scheme's own color.
     */
    MuiAlert: {
      styleOverrides: {
        /*
         * MUI v9 collapsed the per-severity `standard{Info,Success,Warning,Error}`
         * style-override slots into a single `standard` slot (severity now rides
         * on separate `colorInfo`/`colorSuccess`/... classes), so the previous
         * four overrides become one callback reading `ownerState.severity`.
         */
        standard: ({ theme: t, ownerState }) => {
          const severity = ownerState.severity ?? 'success';
          const paletteColor = t.vars.palette[
            severity as keyof typeof t.vars.palette
          ] as { mainChannel?: string } | undefined;

          if (!paletteColor?.mainChannel) {
            return {};
          }

          return t.applyStyles('dark', {
            backgroundColor: `rgba(${paletteColor.mainChannel} / 0.14)`,
            border: `1px solid rgba(${paletteColor.mainChannel} / 0.3)`,
          });
        },
      },
    },
  },
});
