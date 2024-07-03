import { ReactNode, createContext } from 'react';
import { DefaultRHFMuiConfig } from './DefaultConfig';
import { RHFMuiConfig, RHFMuiConfigInput } from '../types';
import { setDateAdapter } from '../utils';
;
type ConfigProviderProps = {
  children: ReactNode;
} & RHFMuiConfigInput;

export const RHFMuiConfigContext = createContext<RHFMuiConfig>(DefaultRHFMuiConfig);

export const RHFMuiConfigProvider = ({
  children,
  defaultFormHelperTextSx,
  defaultFormLabelSx,
  dateAdapter
}: ConfigProviderProps) => {
  const defaultSetting: RHFMuiConfig = {
    ...DefaultRHFMuiConfig,
    ...(defaultFormLabelSx && {
      defaultFormLabelSx
    }),
    ...(defaultFormHelperTextSx && {
      defaultFormHelperTextSx
    }),
    ...(dateAdapter && {
      dateAdapter: setDateAdapter(dateAdapter)
    })
  };
  return (
    <RHFMuiConfigContext.Provider value={defaultSetting}>
      {children}
    </RHFMuiConfigContext.Provider>
  );
};
