import React, { ComponentType, useContext } from 'react';
import { RHFMuiConfigContext } from './ConfigProvider';
import { RHFMuiConfig } from '../types';

/**
 * TODO: somehow this hoc implementation is causing ts
 * err with register, need to investigate
 */

const withConfigHOC = <P extends object>(
  WrappedComponent: ComponentType<P>
): ComponentType<Omit<P, keyof RHFMuiConfig>> => {
  const WithConfigComponent = (props: Omit<P, keyof RHFMuiConfig>) => {
    const context = useContext(RHFMuiConfigContext);
    return <WrappedComponent {...(props as P)} {...context} />;
  };

  const wrappedComponentName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithConfigComponent.displayName = `withConfig(${wrappedComponentName})`;

  return WithConfigComponent;
};

export default withConfigHOC;
