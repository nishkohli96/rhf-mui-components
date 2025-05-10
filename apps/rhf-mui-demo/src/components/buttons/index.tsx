'use client';

import Link from 'next/link';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import GitHubIcon from '@mui/icons-material/GitHub';
import LightModeIcon from '@mui/icons-material/LightMode';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { docsLink, githubRepoLink } from '@/constants';
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
      <IconButton onClick={toggleTheme} aria-label={toolTip}>
        {isDarkTheme ? <BedtimeIcon /> : <LightModeIcon color="warning" />}
      </IconButton>
    </Tooltip>
  );
};

export const GithubButton = () => {
  return (
    <Tooltip title="Github">
      <IconButton
        component={Link}
        href={githubRepoLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Github"
        size="large"
      >
        <GitHubIcon />
      </IconButton>
    </Tooltip>
  );
};

export const DocsButton = () => {
  return (
    <Tooltip title="Docs">
      <IconButton
        component={Link}
        href={docsLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Docs"
        size="large"
      >
        <MenuBookIcon />
      </IconButton>
    </Tooltip>
  );
};
