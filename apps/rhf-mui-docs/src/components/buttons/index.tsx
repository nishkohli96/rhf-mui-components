'use client';

import Link from 'next/link';
import Image from 'next/image';
import Button, { type ButtonProps } from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import GitHubIcon from '@mui/icons-material/GitHub';
import LightModeIcon from '@mui/icons-material/LightMode';
import TerminalIcon from '@mui/icons-material/Terminal';
import { githubRepoLink, npmLink } from '@/constants';
import { useThemeContext } from '@/theme';

export const SubmitButton = ({ disabled, ...otherBtnProps }: ButtonProps) => {
  return (
    <Button
      variant="contained"
      color="primary"
      type="submit"
      sx={{ mr: '20px' }}
      disabled={disabled}
      {...otherBtnProps}
    >
      Submit
    </Button>
  );
};

export const ResetButton = (btnProps: ButtonProps) => {
  return (
    <Button variant="outlined" color="primary" {...btnProps}>
      Reset
    </Button>
  );
};

/**
 * Brand-gradient action button (logo blue → navy), used for the site's
 * primary calls to action — e.g. "Get Started" on the homepage, "Go Back"
 * on the 404 page. Accepts the full `ButtonProps` surface, including
 * `component` and `href` for use as a link.
 */
export const GradientButton = ({ sx, ...otherBtnProps }: ButtonProps) => {
  return (
    <Button
      variant="contained"
      sx={{
        px: 3,
        minWidth: 132,
        height: 42,
        borderRadius: 2,
        fontWeight: 800,
        textTransform: 'none',
        background: 'linear-gradient(90deg, #2683cc 0%, #014280 100%)',
        ...sx
      }}
      {...otherBtnProps}
    />
  );
};

export const ThemeChangeButton = () => {
  const { currentTheme, toggleTheme } = useThemeContext();
  const isDarkTheme = currentTheme === 'dark';
  const toolTip = `Switch to ${isDarkTheme ? 'light' : 'dark'} theme`;

  return (
    <Tooltip title={toolTip}>
      <IconButton
        onClick={toggleTheme}
        aria-label={toolTip}
        color="inherit"
        sx={{ padding: { xs: '6px 0px 6px 6px', md: '12px' } }}
      >
        {isDarkTheme ? <BedtimeIcon /> : <LightModeIcon color="warning" />}
      </IconButton>
    </Tooltip>
  );
};

const githubBtnTooltip = 'Github Repository';

export const GithubButton = () => {
  return (
    <Tooltip title={githubBtnTooltip}>
      <IconButton
        component={Link}
        href={githubRepoLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={githubBtnTooltip}
        size="large"
        color="inherit"
        sx={{ padding: '6px' }}
      >
        <GitHubIcon sx={{ fontSize: 26 }} />
      </IconButton>
    </Tooltip>
  );
};

const npmBtnTooltip = 'View package on NPM';

export const NpmButton = () => {
  return (
    <Tooltip title={npmBtnTooltip}>
      <IconButton
        component={Link}
        href={npmLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={npmBtnTooltip}
        size="large"
        color="inherit"
        sx={{ padding: '6px' }}
      >
        <Image
          src="/icons/npm.svg"
          alt="NPM"
          width={40}
          height={16}
        />
      </IconButton>
    </Tooltip>
  );
};

const playgroundTooltip = 'Open Stackblitz Playground';

export const PlaygroundButton = () => {
  return (
    <Tooltip title={playgroundTooltip}>
      <IconButton
        component={Link}
        href={'/'}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={playgroundTooltip}
        size="large"
        color="inherit"
        sx={{
          padding: '6px',
        }}
      >
        <TerminalIcon />
      </IconButton>
    </Tooltip>
  );
};
