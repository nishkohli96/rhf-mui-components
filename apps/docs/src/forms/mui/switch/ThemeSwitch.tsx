'use client';

/**
 * ThemeSwitch — a self-contained light/dark theme toggle built on `MUISwitch`,
 * styled with MUI's "MaterialUISwitch" day/night design
 * (https://mui.com/material-ui/react-switch/#customization).
 *
 * It reads and flips the app theme through `useThemeContext`, so `value` and
 * `onValueChange` are wired internally — callers only pass presentational props
 * (e.g. `disabled`). The sun / moon icons are embedded as SVG data-URIs on the
 * thumb's `::before`, and `theme.applyStyles('dark', …)` keeps the track colour
 * correct in both modes.
 *
 * MUISwitch forwards `sx` straight to the underlying MUI `Switch`, so MUI's
 * `styled(Switch)(…)` overrides can be supplied here as an `sx` callback — no
 * `styled()` wrapper needed.
 *
 * NOTE (same `sx` gotcha as StyledIOSSwitch): a bare number on `padding` /
 * `margin` / `borderRadius` is theme-multiplied by `sx` (spacing unit /
 * `theme.shape.borderRadius`), whereas MUI's `styled()` example treats it as
 * raw pixels. Those are written as `'px'` strings to stay faithful; `width` /
 * `height` numbers are already pixels in `sx`, so they stay numeric.
 */

import type { Theme } from '@mui/material/styles';
import MUISwitch, { type MUISwitchProps } from '@nish1896/mui-components/mui/switch';
import { useThemeContext } from '@/theme';

const materialUISwitchSx = (theme: Theme) => ({
  width: 62,
  height: 34,
  padding: '7px',
  '& .MuiSwitch-switchBase': {
    margin: '1px',
    padding: '0px',
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff'
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#aab4be',
        ...theme.applyStyles('dark', {
          backgroundColor: '#8796A5'
        })
      }
    }
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#001e3c',
    width: 32,
    height: 32,
    '&::before': {
      content: '\'\'',
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff'
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`
    },
    ...theme.applyStyles('dark', {
      backgroundColor: '#003892'
    })
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#aab4be',
    borderRadius: '10px',
    ...theme.applyStyles('dark', {
      backgroundColor: '#8796A5'
    })
  }
});

type ThemeSwitchProps = Omit<
  MUISwitchProps,
  'fieldName' | 'value' | 'onValueChange'
> & {
  fieldName?: string;
};

const ThemeSwitch = ({
  fieldName = 'themeMode',
  label = 'Toggle light / dark theme',
  hideLabel = true,
  sx,
  ...rest
}: ThemeSwitchProps) => {
  const { currentTheme, toggleTheme } = useThemeContext();
  /* eslint-disable-next-line no-nested-ternary */
  const callerSx = Array.isArray(sx) ? sx : sx ? [sx] : [];
  return (
    <MUISwitch
      label={label}
      {...rest}
      fieldName={fieldName}
      hideLabel={hideLabel}
      value={currentTheme === 'dark'}
      onValueChange={() => toggleTheme()}
      sx={[materialUISwitchSx, ...callerSx]}
    />
  );
};

export default ThemeSwitch;
