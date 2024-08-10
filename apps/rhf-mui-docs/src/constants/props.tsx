import { ExternalLinks } from '@site/src/constants';
import { PropDescV2 } from '@site/src/types';

export const PropsDescription: Record<string, PropDescV2> = Object.freeze({
  fieldName: {
    name: 'fieldName',
    description: 'React Hook Form requires `name` as a key for the registration process.',
    required: true,
    type: 'string'
  },
  register: {
    name: 'register',
    description: `The [register](${ExternalLinks.rhfLinks.register}) option yielded on calling the \`useForm\` hook.`,
    required: true,
    type: `[UseFormRegister](${ExternalLinks.rhfLinks.register})`,
    hasLinkInType: true
  },
  registerOptions: {
    name: 'registerOptions',
    description: `[Register](${ExternalLinks.rhfLinks.register}) options if using react-hook-form without any validation libraries like [yup](${ExternalLinks.validationLibs.yup}) or [Joi](${ExternalLinks.validationLibs.joi}).`,
    type: 'RegisterOptions'
  },
  control: {
    name: 'control',
    description: `The [control](${ExternalLinks.rhfLinks.control}) option yielded on calling the \`useForm\` hook.  Required when using \`RHFDatePicker\`, \`RHFTimePicker\` and \`RHFDateTimeGroup\` components.`,
    required: true,
    type: `[UseFormControl](${ExternalLinks.rhfLinks.control})`
  },
  setValue: {
    name: 'setValue',
    description: `The [setValue](${ExternalLinks.rhfLinks.setValue}) option yielded on calling the \`useForm\` hook. Required when using \`RHFDatePicker\`, \`RHFTimePicker\` and \`RHFDateTimePicker\` components.`,
    required: true,
    type: '(name: string, value: unknown, config?: Object) => void'
  },
  onValueChange: {
    name: 'onValueChange',
    description: `An optional callback function when the value of a field changes. Method signature can be viewed for each component in its documentation page.`,
    type: 'Function'
  },
  errorMsg: {
    name: 'errorMsg',
    description: `Show error message for a field in [FormHelperText](${ExternalLinks.muiComponentApi.formHelperText}) component.`,
    type: 'ReactNode'
  },
  hideErrorMsg: {
    name: 'hideErrorMsg',
    description: `Prevent replacing of form HelperText by error message during validation trigger.`,
    type: 'boolean',
  },
  showLabelAboveFormField: {
    name: 'showLabelAboveFormField',
    description: `Render form label above the form field in [FormLabel](${ExternalLinks.muiComponentApi.formLabel}) component.`,
    type: 'boolean'
  },
  formLabelProps: {
    name: 'formLabelProps',
    description: `[FormLabel Props](${ExternalLinks.muiComponentApi.formLabel}) to customise FormLabel component for a field. Multiple fields can be configured using the [UseConfig]() HO.`,
    type: `Omit<[FormLabelProps](${ExternalLinks.muiComponentApi.formLabel}), 'error'>`
  },
  formHelperTextProps: {
    name: 'formHelperTextProps',
    description: `[FormHelperText Props](${ExternalLinks.muiComponentApi.formHelperText}) to customise FormHelperText component for a field. Multiple fields can be configured using the [UseConfig]() HOC.`,
    type: `Omit<[FormHelperTextProps](${ExternalLinks.muiComponentApi.formHelperText}), 'children' | 'error'>`
  },
  onValueChange_Input: {
    name: 'onValueChange',
    description: `An optional callback function when the value of a field changes. The changed value can be obtained from \`e.target.value\` `,
    type: `(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void`
  }
});
