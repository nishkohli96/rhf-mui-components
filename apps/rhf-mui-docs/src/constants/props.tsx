import { ExternalLinks } from '@site/src/constants';
import { PropDescV2 } from '@site/src/types';

const PropsDescription: Record<string, PropDescV2> = Object.freeze({
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
    description: 'An optional callback function when the value of a field changes. Method signature can be viewed for each component in its documentation page.',
    type: 'Function'
  },
  errorMessage: {
    name: 'errorMessage',
    description: `Error message to be shown for a field in [FormHelperText](${ExternalLinks.muiComponentApi.formHelperText}) component.`,
    type: 'ReactNode'
  },
  hideErrorMessage: {
    name: 'hideErrorMessage',
    description: 'Prevent replacing of form HelperText by error message during validation trigger.',
    type: 'boolean',
  },
  showLabelAboveFormField: {
    name: 'showLabelAboveFormField',
    description: `Render form label above the form field in [FormLabel](${ExternalLinks.muiComponentApi.formLabel}) component.`,
    type: 'boolean'
  },
  formLabelProps: {
    name: 'formLabelProps',
    description: `[FormLabelProps](${ExternalLinks.muiComponentApi.formLabel}) to customise FormLabel component for a field. Multiple fields can be configured using the [ConfigProvider](/customization) component.`,
    type: `[FormLabelProps](${ExternalLinks.muiComponentApi.formLabel})`,
    hasLinkInType: true
  },
  formControlLabelProps: {
    name: 'formControlLabelProps',
    description: `[FormControlLabelProps](${ExternalLinks.muiComponentApi.formControlLabel}) to customise FormControlLabel component for a field. Multiple fields can be configured using the [ConfigProvider](/customization) component.`,
    type: `[FormControlLabelProps](${ExternalLinks.muiComponentApi.formControlLabel})`,
    hasLinkInType: true
  },
  formHelperTextProps: {
    name: 'formHelperTextProps',
    description: `[FormHelperTextProps](${ExternalLinks.muiComponentApi.formHelperText}) to customise FormHelperText component for a field. Multiple fields can be configured using the [ConfigProvider](/customization) component.`,
    type: `[FormHelperTextProps](${ExternalLinks.muiComponentApi.formHelperText})`,
    hasLinkInType: true
  },
  onValueChange_Default: {
    name: 'onValueChange',
    description: 'An optional callback function when the value of a field changes. The changed value can be obtained from `e.target.value`.',
    type: '(e: ChangeEvent) => void'
  },
  onValueChange_Checkbox: {
    name: 'onValueChange',
    description: 'An optional callback function which returns the state of the checkbox from `e.target.checked` value ',
    type: '(e: ChangeEvent) => void'
  },
  onValueChange_CheckboxGroup: {
    name: 'onValueChange',
    description: 'An optional callback function returning the value of the selected control.',
    type: '(e: ChangeEvent<HTMLInputElement>, newValue: string) => void'
  },
  onValueChange_Pickers: {
    name: 'onValueChange',
    description: 'An optional callback function which returns the selected date or time value.',
    type: '(newValue: unknown) => void'
  },
  onValueChange_Rating: {
    name: 'onValueChange',
    description: 'An optional callback function that returns the changed value of rating component',
    type: '(e: SyntheticEvent, newValue: number OR null) => void'
  },
  onValueChange_Select: {
    name: 'onValueChange',
    description: 'An optional callback function when the value of a field changes. The changed value can be obtained from `e.target.value` ',
    type: '(e: SelectChangeEvent) => void'
  },
  onValueChange_Slider: {
    name: 'onValueChange',
    description: 'Optional callback function returning the selected value of `RHFSlider`.',
    type: '(event: Event, value: number OR number[], activeThumb: number) => void'
  },
  onValueChange_ColorPicker: {
    name: 'onValueChange',
    description: 'Callback function to get the selected color. Update form state by calling the `setValue` function, and passing the color value in preffered format.',
    type: '(color: IColor) => void',
    required: true
  },
  onValueChange_RichTextEditor: {
    name: 'onValueChange',
    description: 'Callback function returning the `event` object, editor value and editor details.',
    type: '(event: EventInfo, newValue: string, editor: ClassicEditor) => void',
  },
  value_ColorPicker: {
    name: 'value',
    description: 'Selected color in `RHFColorPicker` component. Default is `#000000` (black).',
    type: 'string'
  },
  value_RichTextEditor: {
    name: 'value',
    description: 'The content to render in the Rich Text Editor. It can be a plain text string or an HTML string.',
    type: 'string',
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
    type: '`string[]` or `number[]` or `object[]`',
    required: true
  },
  labelKey: {
    name: 'labelKey',
    description: 'The key of object in your array, whose value would be shown as the label in `RHFSelect` or `RHFCheckboxGroup`. Only required when options prop is an array of objects.',
    type: 'string',
    required: true
  },
  valueKey: {
    name: 'valueKey',
    description: 'The key of object in your array, whose value would be actual value of the option selected in `RHFSelect` or `RHFCheckboxGroup`. Only required when options prop is an array of objects.',
    type: 'string',
    required: true
  },
  defaultValue: {
    name: 'defaultValue',
    description: 'When rendering `RHFSelect` or `RHFNativeSelect` with some initial value, pass the value in this prop, so that this value is selected. The value would be an array if `multiple=true`',
    type: 'string OR string[] OR number OR number[]',
  },
  defaultValue_Slider: {
    name: 'defaultValue',
    description: 'Initial value set for `RHFSlider` component on render.',
    type: 'number OR number[]',
    required: true
  },
  helperText: {
    name: 'helperText',
    description: 'Optional helperText to render under `RHFSelect` or `RHFNativeSelect` field.',
    type: 'ReactNode',
  },
  showDefaultOption: {
    name: 'showDefaultOption',
    description: 'Show default Label of the disabled option when value of `RHFSelect` or `RHFNativeSelect` is `\'\'`. This text cane be changed using the `defaultOptionText` prop.',
    type: 'boolean'
  },
  defaultOptionText: {
    name: 'defaultOptionText',
    description: 'Custom text to replace the default text when `showDefaultOption` is `true` for `RHFSelect` or `RHFNativeSelect`.',
    type: 'string'
  },
  label: {
    name: 'label',
    description: 'The text to render in `FormLabel` component. By default, the value of `fieldName` such as firstName will be transformed to display "First Name".',
    type: 'ReactNode'
  },
  checkboxProps: {
    name: 'checkboxProps',
    description: `[Checkbox Props](${ExternalLinks.muiComponentApi.checkbox}) to customise each checkbox in checkbox group.`,
    type: `[CheckboxProps](${ExternalLinks.muiComponentApi.checkbox})`,
    hasLinkInType: true
  },
  radioProps: {
    name: 'radioProps',
    description: `[Radio Props](${ExternalLinks.muiComponentApi.radio}) to customise each radio button in radiobutton group.`,
    type: `[RadioProps](${ExternalLinks.muiComponentApi.radio})`,
    hasLinkInType: true
  },
  disabled: {
    name: 'disabled',
    description: 'A `boolean` value to enable or disable editing of the form field.',
    type: 'boolean'
  },
  editorConfig: {
    name: 'editorConfig',
    description: 'A Configuration object for CkEditor to customize formatting controls and toolbar positioning, as per requirement. Refer to the [toolbar positioning guide](https://ckeditor.com/docs/ckeditor5/latest/getting-started/setup/toolbar.html) for more details.',
    type: '[EditorConfig](https://ckeditor.com/docs/ckeditor5/latest/getting-started/setup/configuration.html)',
    hasLinkInType: true
  },
  id_Rte: {
    name: 'id',
    description: 'The context ID. When this property changes, the component restarts the context with its editor and reinitializes it based on the current configuration.',
    type: 'string'
  },
  onReady_Rte: {
    name: 'onReady',
    description: 'A function called when the context is ready and all editors inside were (re)initialized with the context instance.',
    type: '(editor: ClassicEditor) => void'
  },
  onFocus_Rte: {
    name: 'onFocus',
    description: 'Callback function triggered when the editor gains focus.',
    type: '(event: EventInfo<string, unknown>, editor: ClassicEditor) => void'
  },
  onBlur_Rte: {
    name: 'onBlur',
    description: 'Callback function triggered when the editor gains loses focus.',
    type: '(event: EventInfo<string, unknown>, editor: ClassicEditor) => void'
  },
  onError_Rte: {
    name: 'onError',
    description: 'A function called when the editor has crashed during the initialization or runtime. It receives two arguments: the error instance and the error details.',
    type: '(error: Error, details: ErrorDetails) => void'
  }
});

export default PropsDescription;
