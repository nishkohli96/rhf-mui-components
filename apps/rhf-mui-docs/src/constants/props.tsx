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
    description: `The [control](${ExternalLinks.rhfLinks.control}) option yielded on calling the \`useForm\` hook.`,
    required: true,
    type: `[UseFormControl](${ExternalLinks.rhfLinks.control})`,
    hasLinkInType: true
  },
  setValue: {
    name: 'setValue',
    description: `The [setValue](${ExternalLinks.rhfLinks.setValue}) option yielded on calling the \`useForm\` hook.`,
    required: true,
    type: '(name: string, value: unknown, config?: Object) => void'
  },
  onValueChange: {
    name: 'onValueChange',
    description: `An optional callback function when the value of a field changes. Method signature can be viewed for each component in its documentation page.`,
    type: 'Function'
  },
  errorMessage: {
    name: 'errorMessage',
    description: `Error message to be shown for a field in [FormHelperText](${ExternalLinks.muiComponentApi.formHelperText}) component.`,
    type: 'ReactNode'
  },
  hideErrorMessage: {
    name: 'hideErrorMessage',
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
    description: `[FormLabel Props](${ExternalLinks.muiComponentApi.formLabel}) to customise FormLabel component for a field. Multiple fields can be configured using the [UseConfig](/customization) HOC.`,
    type: `[FormLabelProps](${ExternalLinks.muiComponentApi.formLabel})`,
    hasLinkInType: true
  },
  formControlLabelProps: {
    name: 'formControlLabelProps',
    description: `[FormControlLabel Props](${ExternalLinks.muiComponentApi.formControlLabel}) to customise FormControlLabel component for a field. Multiple fields can be configured using the [UseConfig](/customization) HOC.`,
    type: `[FormControlLabelProps](${ExternalLinks.muiComponentApi.formControlLabel})`,
    hasLinkInType: true
  },
  formHelperTextProps: {
    name: 'formHelperTextProps',
    description: `[FormHelperText Props](${ExternalLinks.muiComponentApi.formHelperText}) to customise FormHelperText component for a field. Multiple fields can be configured using the [UseConfig](/customization) HOC.`,
    type: `[FormHelperTextProps](${ExternalLinks.muiComponentApi.formHelperText})`,
    hasLinkInType: true
  },
  onValueChange_Default: {
    name: 'onValueChange',
    description: `An optional callback function when the value of a field changes. The changed value can be obtained from \`e.target.value\` `,
    type: `(e: ChangeEvent) => void`
  },
  onValueChange_Checkbox: {
    name: 'onValueChange',
    description: `An optional callback function which returns the state of the checkbox from \`e.target.checked\` value `,
    type: `(e: ChangeEvent) => void`
  },
  onValueChange_CheckboxGroup: {
    name: 'onValueChange',
    description: `An optional callback function returning the value of the selected control.`,
    type: `(e: ChangeEvent<HTMLInputElement>, newValue: string) => void`
  },
  onValueChange_Pickers: {
    name: 'onValueChange',
    description: `An optional callback function when the value of a field changes. The changed value can be obtained from \`e.target.value\` `,
    type: `(newValue: unknown) => void`
  },
  onValueChange_Rating: {
    name: 'onValueChange',
    description: `An optional callback function that returns the changed value of rating component`,
    type: `(e: SyntheticEvent, newValue: number OR null) => void`
  },
  onValueChange_Select: {
    name: 'onValueChange',
    description: `An optional callback function when the value of a field changes. The changed value can be obtained from \`e.target.value\` `,
    type: `(e: SelectChangeEvent) => void`
  },
  onValueChange_Slider: {
    name: '',
    description: ``,
    type: `(event: Event, value: number | number[], activeThumb: number) => void`
  },
  showPasswordIcon: {
    name: 'showPasswordIcon',
    description: 'Icon component to show password, such as `VisibilityIcon` from `@mui/icons-material/Visibility`.',
    type: 'ReactNode'
  },
  hidePasswordIcon: {
    name: 'hidePasswordIcon',
    description: 'Icon component to hide password text, such as `VisibilityOffIcon` from `@mui/icons-material/VisibilityOff`.',
    type: 'ReactNode',
  },
  options: {
    name: 'options',
    description: 'Icon component to hide password text, such as `VisibilityOffIcon` from `@mui/icons-material/VisibilityOff`.',
    type: `\`string[]\` or \`number[]\` or \`object[]\``,
    required: true
  },
  labelKey: {
    name: 'labelKey',
    description: `The key of object in your array, whose value would be shown as the label in \`RHFSelect\` or \`RHFCheckboxGroup\`. Only required when options prop is an array of objects.`,
    type: 'string',
    required: true
  },
  valueKey: {
    name: 'valueKey',
    description: `The key of object in your array, whose value would be actual value of the option selected in \`RHFSelect\` or \`RHFCheckboxGroup\`. Only required when options prop is an array of objects.`,
    type: 'string',
    required: true
  },
  defaultValue: {
    name: 'defaultValue',
    description: `When rendering \`RHFSelect\` or \`RHFNativeSelect\` with some initial value, pass the value in this prop, so that this value is selected. The value would be an array if \`multiple=true\``,
    type: `string OR string[] OR number OR number[]`,
  },
  helperText: {
    name: 'helperText',
    description: `Optional helperText to render under \`RHFSelect\` or \`RHFNativeSelect\` field.`,
    type: 'ReactNode',
  },
  showDefaultOption: {
    name: 'showDefaultOption',
    description: `Show default Label of the disabled option when value of \`RHFSelect\` or \`RHFNativeSelect\` is \`''\`. This text cane be changed using the \`defaultOptionText\` prop.`,
    type: 'boolean'
  },
  defaultOptionText: {
    name: 'defaultOptionText',
    description: `Custom text to replace the default text when \`showDefaultOption\` is \`true\` for \`RHFSelect\` or \`RHFNativeSelect\`.`,
    type: 'string'
  },
  label: {
    name: 'label',
    description: `The text to render in \`FormLabel\` component.`,
    type: 'ReactNode'
  },
  checkboxProps: {
    name: 'checkboxProps',
    description:  `[Checkbox Props](${ExternalLinks.muiComponentApi.checkbox}) to customise each checkbox in checkbox group.`,
    type: `[CheckboxProps](${ExternalLinks.muiComponentApi.checkbox})`,
    hasLinkInType: true
  },
  radioProps: {
    name: 'radioProps',
    description:  `[Radio Props](${ExternalLinks.muiComponentApi.radio}) to customise each radio button in radiobutton group.`,
    type: `[RadioProps](${ExternalLinks.muiComponentApi.radio})`,
    hasLinkInType: true
  }
});
