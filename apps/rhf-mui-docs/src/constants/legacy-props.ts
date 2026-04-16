/**
 * Legacy props that are no longer supported from v4 onwards or their usage or
 * description has been changed.
 */

import { ExternalLinks } from '@site/src/constants';
import {
  type DocsVersion,
  type MuiVersion,
  type PropsInfo
} from '@site/src/types';

const LegacyPropsDescription: Record<
  string,
  | PropsInfo
  | ((version?: DocsVersion | MuiVersion) => PropsInfo)
  | ((
      docsVersion?: DocsVersion | MuiVersion,
      muiVersion?: MuiVersion
    ) => PropsInfo)
> = Object.freeze({
  register: {
    name: 'register',
    description: `The [register](${ExternalLinks.rhfApi.register}) option yielded on calling the \`useForm\` hook.`,
    required: true,
    type: `[UseFormRegister](${ExternalLinks.rhfApi.register})`,
    hasLinkInType: true
  },
  setValue: {
    name: 'setValue',
    description: `The [setValue](${ExternalLinks.rhfApi.setValue}) option yielded on calling the \`useForm\` hook.`,
    required: true,
    type: '(name: string, value: unknown, config?: Object) => void'
  },
  label_v1: {
    name: 'label',
    description:
      'The text to render in `FormLabel` component. By default, the value of `fieldName` such as _firstName_ will be transformed to display "**First Name**".',
    type: 'ReactNode'
  },
});

export default LegacyPropsDescription;