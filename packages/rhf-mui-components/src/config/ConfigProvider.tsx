import { ReactNode, createContext, useMemo } from 'react';
import { DefaultRHFMuiConfig } from './DefaultConfig';
import { RHFMuiConfig, RHFMuiConfigInput } from '../types';

type ConfigProviderProps = {
  children: ReactNode;
} & RHFMuiConfigInput;

export const RHFMuiConfigContext =
  createContext<RHFMuiConfig>(DefaultRHFMuiConfig);

export const ConfigProvider = ({
  children,
  defaultFormHelperTextSx,
  defaultFormControlLabelSx,
  defaultFormLabelSx,
  dateAdapter,
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
        ...defaultFormLabelSx
      },
      ...(dateAdapter && {
        dateAdapter
      }),
    }),
    [defaultFormHelperTextSx, defaultFormControlLabelSx, defaultFormLabelSx, dateAdapter],
  );

  return (
    <RHFMuiConfigContext.Provider value={defaultSetting}>
      {children}
    </RHFMuiConfigContext.Provider>
  );
};
