'use client';

import { type ReactNode } from 'react';
import { ConfigProvider } from '@nish1896/rhf-mui-components/config';

type ConfigProviderWrapperProps = {
  children: ReactNode;
};

export default function ConfigProviderWrapper({
  children
}: ConfigProviderWrapperProps) {
  return (
    <ConfigProvider
      defaultFormLabelSx={{
        my: '10px',
        color: 'orange',
        background: '#abcded'
      }}
      allLabelsAboveFields
    >
      {children}
    </ConfigProvider>
  );
}
