import { createContext, useMemo, type ReactNode } from 'react';
import type { RHFMuiConfig, RHFMuiConfigInput } from '@/types';
import { DefaultRHFMuiConfig } from './DefaultConfig';

type ConfigProviderProps = {
  children: ReactNode;
} & RHFMuiConfigInput;

export const RHFMuiConfigContext
  = createContext<RHFMuiConfig>(DefaultRHFMuiConfig);

export const ConfigProvider = ({
  children,
  defaultFormHelperTextSx,
  defaultFormControlLabelSx,
  defaultFormLabelSx,
  dateAdapter,
  allLabelsAboveFields,
  skipValidationInEnvs,
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
      skipValidationInEnvs: Array.from(
        new Set(['production', ...(skipValidationInEnvs ?? [])])
      )
    }),
    [
      defaultFormHelperTextSx,
      defaultFormControlLabelSx,
      defaultFormLabelSx,
      dateAdapter,
      allLabelsAboveFields,
      skipValidationInEnvs
    ],
  );

  return (
    <RHFMuiConfigContext.Provider value={defaultSetting}>
      {children}
    </RHFMuiConfigContext.Provider>
  );
};
