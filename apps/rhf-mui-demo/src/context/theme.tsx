'use client';

import { createContext, useState, ReactNode, useMemo } from 'react';
import { PaletteMode } from '@mui/material';

function getTheme() {
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
  return themeMode as PaletteMode;
}

interface ThemeContextProps {
  mode: PaletteMode;
  setMode: (mode: PaletteMode) => void;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<PaletteMode>(getTheme());
  const value = useMemo(() => ({ mode, setMode }), [mode]);
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
