'use client';

import { Roboto } from 'next/font/google';
import { PaletteMode } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { LightThemePalette, DarkThemePalette } from './palette';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

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
  typography: { fontFamily: roboto.style.fontFamily },
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
