'use client';

import { type ReactNode } from 'react';
import { useTheme } from '@mui/material/styles';
import { ConfigProvider } from '@nish1896/rhf-mui-components/config';

type ConfigProviderWrapperProps = {
  children: ReactNode;
};

export default function ConfigProviderWrapper({
  children
}: ConfigProviderWrapperProps) {
  const theme = useTheme();
  return (
    <ConfigProvider
      defaultFormLabelSx={{
        my: '10px',
        color:
          theme.palette.mode === 'dark'
            ? theme.palette.warning.main
            : '#FDF6E3',
        background: '#4d79bf',
        px: '10px',
        py: '5px',
        borderRadius: '5px'
      }}
      allLabelsAboveFields
    >
      {children}
    </ConfigProvider>
  );
}
