/**
 * Legacy props that are no longer supported from v4 onwards or their usage or
 * description has been changed.
 */

import { ExternalLinks } from '@site/src/constants';
import {
  type PropsInfo,
  type PropsDescriptionArgs
} from '@site/src/types';

const LegacyPropsDescription: Record<
  string,
  | PropsInfo
  | (({ docsVersion, muiVersion }: PropsDescriptionArgs) => PropsInfo)
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
  defaultValue: {
    name: 'defaultValue',
    description: 'When rendering `RHFSelect` or `RHFNativeSelect` with some initial value, pass the value in this prop, so that this value is selected. The value would be an array if `multiple=true`',
    type: 'string / string[] / number / number[]',
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
  onValueChange_tagsInput_v2_v3: {
    name: 'onValueChange',
    description: 'An optional callback function that returns all tags present in the input.',
    type: '(tags: string[]) => void'
  },
  onValueChange_Select_v1: {
    name: 'onValueChange',
    description:
      'An optional callback function when the value of a field changes. The changed value can be obtained from `e.target.value` ',
    type: '(e: SelectChangeEvent) => void'
  },
  onValueChange_Select_v2_v3: {
    name: 'onValueChange',
    description:
      'An optional callback function when an option is selected. The latest value can be obtained from `newValue` argument.',
    type: '(newValue, event, child) => void'
  },
  onValueChange_NativeSelect_v2_v3: {
    name: 'onValueChange',
    description:
      'An optional callback function when an option is selected. The latest value can be obtained from `newValue` argument.',
    type: '(newValue, event) => void'
  },
  onValueChange_Autocomplete_v2_v3: {
    name: 'onValueChange',
    description:
      'Returns the latest value of the field in `newValue` parameter. The last selected option can be obtained from `details`.',
    type: '(newValue, event, reason, details) => void'
  },
  onValueChange_AutocompleteObject_v3: {
    name: 'onValueChange',
    description: 'Returns the entire object option(s) selected by the user in `newValue` parameter. The last selected option can be obtained from `details`.',
    type: '(newValue, event, reason, details ) => void'
  },
});

export default LegacyPropsDescription;
