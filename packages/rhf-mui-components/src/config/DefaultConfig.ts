import type { RHFMuiConfig } from '@/types';

const DefaultStyles = Object.freeze({
  margin: {
    top: '0.25rem',
    bottom: '0.75rem',
    left: 0
  },
});

/**
 * Baseline `RHFMuiConfig` every `RHF*` component falls back to when
 * no `ConfigProvider` is mounted, or a given config key is left unset.
 *
 * Only supplies default `sx` overrides for `FormLabel`/`FormControlLabel`/
 * `FormHelperText` spacing — `dateAdapter` and `allLabelsAboveFields` have
 * no default and stay `undefined` until a `ConfigProvider` sets them.
 *
 * Docs: [Customization](https://rhf-mui-components.vercel.app/v4/customization)
 */
export const DefaultRHFMuiConfig: RHFMuiConfig = {
  defaultFormLabelSx: { mb: DefaultStyles.margin.bottom },
  defaultFormControlLabelSx: {},
  defaultFormHelperTextSx: {
    mt: DefaultStyles.margin.top,
    ml: DefaultStyles.margin.left
  },
};
