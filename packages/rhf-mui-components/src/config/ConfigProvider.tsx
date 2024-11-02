import { ReactNode, createContext, useMemo } from 'react';
import { RHFMuiConfig, RHFMuiConfigInput } from '@/types';
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
  allLabelsAboveFormField
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
      allLabelsAboveFormField
    }),
    [
      defaultFormHelperTextSx,
      defaultFormControlLabelSx,
      defaultFormLabelSx,
      dateAdapter,
      allLabelsAboveFormField
    ],
  );

  return (
    <RHFMuiConfigContext.Provider value={defaultSetting}>
      {children}
    </RHFMuiConfigContext.Provider>
  );
};
