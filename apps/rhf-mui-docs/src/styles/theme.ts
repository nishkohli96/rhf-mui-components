'use client';

import { PaletteMode } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { LightThemePalette, DarkThemePalette } from './palette';

const AppTheme = (mode: PaletteMode) => ({
  palette: {
    mode,
    common: {
      black: '#000',
      white: '#fff',
    },
    ...(mode === 'light' ? LightThemePalette : DarkThemePalette),
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 350,
      md: 768,
      lg: 1024,
      xl: 1400,
    },
  },
});

let themeMode = 'dark';

if (typeof window !== 'undefined') {
  themeMode =
    localStorage.getItem('theme') ??
    (window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light');
  localStorage.setItem('theme', themeMode);
}

const theme = createTheme(AppTheme(themeMode as PaletteMode));

export default theme;
