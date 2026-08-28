import { createContext, useMemo, type ReactNode } from 'react';
import type { RHFMuiConfig, RHFMuiConfigInput } from '@/types';
import { DefaultRHFMuiConfig } from './DefaultConfig';

type ConfigProviderProps = {
  children: ReactNode;
} & RHFMuiConfigInput;

export const RHFMuiConfigContext
  = createContext<RHFMuiConfig>(DefaultRHFMuiConfig);

/**
 * Context provider that sets shared defaults for all `RHF*` components
 * mounted beneath it, including default `sx` overrides for `FormLabel`,
 * `FormControlLabel`, and `FormHelperText`, a shared `dateAdapter` for
 * all pickers, and whether field labels render above their controls by default.
 *
 * Each config key is merged on top of `DefaultRHFMuiConfig`, so you
 * only need to pass the keys you want to override.
 *
 * Docs: [Customization](https://rhf-mui-components.vercel.app/customization)
 */
export const ConfigProvider = ({
  children,
  defaultFormHelperTextSx,
  defaultFormControlLabelSx,
  defaultFormLabelSx,
  dateAdapter,
  allLabelsAboveFields
}: ConfigProviderProps) => {
  const defaultSetting: RHFMuiConfig = useMemo(
    () => ({
      defaultFormLabelSx: {
        ...DefaultRHFMuiConfig.defaultFormLabelSx,
        ...defaultFormLabelSx
      },
      defaultFormControlLabelSx: {
        ...DefaultRHFMuiConfig.defaultFormControlLabelSx,
        ...defaultFormControlLabelSx
      },
      defaultFormHelperTextSx: {
        ...DefaultRHFMuiConfig.defaultFormHelperTextSx,
        ...defaultFormHelperTextSx
      },
      dateAdapter,
      allLabelsAboveFields,
    }),
    [
      defaultFormHelperTextSx,
      defaultFormControlLabelSx,
      defaultFormLabelSx,
      dateAdapter,
      allLabelsAboveFields,
    ],
  );

  return (
    <RHFMuiConfigContext.Provider value={defaultSetting}>
      {children}
    </RHFMuiConfigContext.Provider>
  );
};
