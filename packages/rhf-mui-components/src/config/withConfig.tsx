import { ComponentType } from 'react';
import { RHFMuiConfigContext } from './ConfigProvider';
import { RHFMuiConfig } from '../types';

const withConfigHOC = <P extends object>(
  WrappedComponent: ComponentType<P>
): ComponentType<P & RHFMuiConfig> => {
  const WithConfigComponent = (props: P) => (
    <RHFMuiConfigContext.Consumer>
      {(context) => (
        <WrappedComponent {...props} {...context} />
      )}
    </RHFMuiConfigContext.Consumer>
  );

  const wrappedComponentName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithConfigComponent.displayName = `withTheme(${wrappedComponentName})`;

  return WithConfigComponent;
};

export default withConfigHOC;
