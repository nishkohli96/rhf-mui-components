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
  onValueChange_Default_v1: {
    name: 'onValueChange',
    description:
      'An optional callback function when the value of a field changes. The changed value can be obtained from `e.target.value`.',
    type: '(e: ChangeEvent) => void'
  },
  onValueChange_Inputs_v2_v3: {
    name: 'onValueChange',
    description:
      'An optional callback function when the value of a field changes.',
    type: '(value: string, event: ChangeEvent) => void'
  },
});

export default LegacyPropsDescription;