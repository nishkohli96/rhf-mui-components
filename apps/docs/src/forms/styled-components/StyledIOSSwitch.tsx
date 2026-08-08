/**
 * The below snippet illustrates how to reproduce MUI's "iOS style" Switch
 * customization (https://mui.com/material-ui/react-switch/#customization)
 * on top of `MUISwitch`, so it can be reused across the application while
 * keeping `MUISwitch`'s label / helper-text / error handling.
 *
 * MUI's own example wraps the raw `Switch` with `styled(Switch)(...)`. We don't
 * need `styled()` here: `MUISwitch` forwards `sx`, `disableRipple` and
 * `focusVisibleClassName` straight to the underlying MUI `Switch`, so the same
 * overrides can be supplied through `sx`. The style object is identical to the
 * upstream `IOSSwitch` example (`theme.applyStyles('dark', …)` keeps it
 * theme-aware in both light and dark mode).
 *
 * A caller-provided `sx` is merged after the iOS overrides so per-instance
 * tweaks still win.
 */

import type { Theme } from '@mui/material/styles';
import MUISwitch, {
  type MUISwitchProps
} from '@nish1896/mui-components/mui/switch';

const iosSwitchSx = (theme: Theme) => ({
  width: 42,
  height: 26,
  padding: '0px',
  '& .MuiSwitch-switchBase': {
    padding: '0px',
    margin: '2px',
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#65C466',
        opacity: 1,
        border: 0,
        ...theme.applyStyles('dark', {
          backgroundColor: '#2ECA45'
        })
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5
      }
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff'
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.grey[100],
      ...theme.applyStyles('dark', {
        color: theme.palette.grey[600]
      })
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.7,
      ...theme.applyStyles('dark', {
        opacity: 0.3
      })
    }
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22
  },
  '& .MuiSwitch-track': {
    borderRadius: `${26 / 2}px`,
    backgroundColor: '#E9E9EA',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500
    }),
    ...theme.applyStyles('dark', {
      backgroundColor: '#39393D'
    })
  }
});

const toSxArray = (sx: MUISwitchProps['sx']) =>
  /* eslint-disable-next-line no-nested-ternary */
  (Array.isArray(sx) ? sx : sx ? [sx] : []);

const StyledIOSSwitch = ({
  sx,
  formControlLabelProps,
  ...rest
}: MUISwitchProps) => {
  const { sx: labelSx, ...otherLabelProps } = formControlLabelProps ?? {};
  return (
    <MUISwitch
      disableRipple
      focusVisibleClassName=".Mui-focusVisible"
      {...rest}
      formControlLabelProps={{
        ...otherLabelProps,
        /*
         * `gap` puts 12px between the switch and its label. `ml: 0` clears
         * MUI's default `FormControlLabel` `-11px` left margin (meant to align a
         * checkbox/switch ripple) so the switch lines up with the other fields.
         * Composed as an `sx` array so array/callback `labelSx` values survive.
         */
        sx: [{ gap: '12px', ml: 0 }, ...toSxArray(labelSx)]
      }}
      sx={[iosSwitchSx, ...toSxArray(sx)]}
    />
  );
};

export default StyledIOSSwitch;
