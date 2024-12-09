'use client';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useThemeContext } from '@/theme';

export const SubmitButton = () => {
  return (
    <Button variant="contained" color="primary" type="submit">
      Submit
    </Button>
  );
};

export const ThemeChangeButton = () => {
  const { currentTheme, toggleTheme } = useThemeContext();
  const isDarkTheme = currentTheme === 'dark';
  const toolTip = `Switch to ${isDarkTheme ? 'light' : 'dark'} theme`;

  return (
    <Tooltip title={toolTip}>
      <IconButton onClick={toggleTheme}>
        {isDarkTheme ? <DarkModeIcon /> : <LightModeIcon color="warning" />}
      </IconButton>
    </Tooltip>
  );
};
