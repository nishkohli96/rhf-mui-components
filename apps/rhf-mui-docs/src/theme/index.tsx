'use client';

import { createContext, useContext, useLayoutEffect } from 'react';
import { ThemeProvider, useColorScheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { type PaletteMode } from '@mui/material';
import { theme } from './theme';
import { modeStorageKey, defaultTheme } from './constants';

interface ThemeContextProps {
  currentTheme: PaletteMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  currentTheme: defaultTheme,
  toggleTheme: () => { /* no-op */ },
});

export const useThemeContext = () => useContext(ThemeContext);

/**
 * Must be nested inside ThemeProvider to call useColorScheme
 */
const ThemeContextBridge = ({ children }: { children: React.ReactNode }) => {
  const { mode, systemMode, setMode } = useColorScheme();

  /*
   * `mode` mirrors whatever's in localStorage verbatim — MUI only sanitizes
   * it for its own `data-mui-color-scheme` attribute, not for the value this
   * hook returns. An unsupported stored value (manual edit, stale key from a
   * previous app version) would otherwise flow straight into `currentTheme`
   * and get written to `data-theme` as-is, which is why "dark" is spelled
   * out here instead of trusting `mode` beyond `'system'`.
   */
  const currentTheme: PaletteMode = (mode === 'dark' || mode === 'light')
    ? mode
    : systemMode ?? defaultTheme;

  const toggleTheme = () => {
    setMode(currentTheme === 'light' ? 'dark' : 'light');
  };

  /**
   * DocSearch's own CSS reads `data-theme` on `<html>` for its dark palette
   * (`:root[data-theme=dark]`) — a different attribute than MUI's own
   * `colorSchemeAttribute`. Mirror it here so DocSearch follows the app's
   * theme instead of always rendering light.
   *
   * `useLayoutEffect`, not `useEffect`: MUI's own `data-mui-color-scheme`
   * swap (inside `useColorScheme`) happens synchronously before paint, so a
   * post-paint `useEffect` here would let one frame render with the new MUI
   * colors but DocSearch still reading the stale `data-theme`.
   */
  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const AppThemeProvider = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider
    theme={theme}
    defaultMode="system"
    modeStorageKey={modeStorageKey}
    disableTransitionOnChange
  >
    <CssBaseline enableColorScheme />
    <ThemeContextBridge>
      {children}
    </ThemeContextBridge>
  </ThemeProvider>
);
