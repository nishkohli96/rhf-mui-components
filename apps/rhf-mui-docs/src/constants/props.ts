import { ExternalLinks } from '@site/src/constants';
import { type PropsInfo } from '@site/src/types';

const PropsDescription: Record<string, PropsInfo> = Object.freeze({
  fieldName: {
    name: 'fieldName',
    description: 'React Hook Form requires `name` as a key for the registration process. This is a required prop for all components.',
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
  control: {
    name: 'control',
    description: `The [control](${ExternalLinks.rhfLinks.control}) option yielded on calling the \`useForm\` hook.`,
    required: true,
    type: `[UseFormControl](${ExternalLinks.rhfLinks.control})`,
    hasLinkInType: true
  },
  registerOptions: {
    name: 'registerOptions',
    description: `[Register](${ExternalLinks.rhfLinks.register}) options for validation if using react-hook-form without any validation libraries like [yup](${ExternalLinks.validationLibs.yup}) or [Joi](${ExternalLinks.validationLibs.joi}).`,
    type: 'RegisterOptions'
  },
  required: {
    name: 'required',
    description: 'Indicates that the field is mandatory by adding an asterisk symbol (*) to the `formLabel`. This visual cue helps users quickly identify required fields in the form.',
    type: 'boolean'
  },
  options: {
    name: 'options',
    description: 'An array with string, numeric or object values. Make sure to pass `labelKey` and `valueKey` when options is an array of objects.',
    type: 'string[] or number[] or object[]',
    required: true
  },
  options_StrOrObj: {
    name: 'options',
    description: 'An array with string or object values. Make sure to pass `labelKey` and `valueKey` when options is an array of objects.',
    type: 'string[] or object[]',
    required: true
  },
  labelKey: {
    name: 'labelKey',
    description: 'The key of object in options array, whose value would be shown as the label in the formfield. Only required when input options is an array of objects.',
    type: 'string',
    required: true
  },
  valueKey: {
    name: 'valueKey',
    description: 'The key of object in options array, whose value would be actual value of the option selected in the formfield. Only required when input options is an array of objects.',
    type: 'string',
    required: true
  },
  setValue: {
    name: 'setValue',
    description: `The [setValue](${ExternalLinks.rhfLinks.setValue}) option yielded on calling the \`useForm\` hook.`,
    required: true,
    type: '(name: string, value: unknown, config?: Object) => void'
  },
  customOnChange: {
    name: 'customOnChange',
    description: 'An optional callback function to **override** the default `onChange` behavior of the form field. This invalidates the usage of `onValueChange` function. **rhfOnChange(newValue)** must be called to update the field value in form state.',
    type: '(rhfOnChange, event, ...args) => void'
  },
  onValueChange: {
    name: 'onValueChange',
    description: 'An optional callback function when the value of a field changes. Method signature can be viewed for each component in its documentation page.',
    type: 'Function'
  },
  label: {
    name: 'label',
    description: 'The text to render in `FormLabel` component. By default, the value of `fieldName` such as _firstName_ will be transformed to display "**First Name**" using the [fieldNameToLabel](/form-helpers/fieldNameToLabel) function.',
    type: 'ReactNode'
  },
  label_v1: {
    name: 'label',
    description: 'The text to render in `FormLabel` component. By default, the value of `fieldName` such as _firstName_ will be transformed to display "**First Name**".',
    type: 'ReactNode'
  },
  renderOptionLabel: {
    name: 'renderOptionLabel',
    description: 'Render the option label content corresponding to each checkbox. The `selectAllText` parameter can be used to ensure that your option logic does not affect the "Select All" option.',
    type: '(option, selectAllText, state) => ReactNode'
  },
  placeholder_Select: {
    name: 'placeholder',
    description: 'The placeholder text to be shown when no option is selected in the select field. Available from version **3.1.0** and above.',
    type: 'string'
  },
  formLabelProps: {
    name: 'formLabelProps',
    description: `[FormLabelProps](${ExternalLinks.muiComponentApi.formLabel}) to customise \`FormLabel\` component for a field. Multiple fields can be configured using the [ConfigProvider](/customization) component.`,
    type: `[FormLabelProps](${ExternalLinks.muiComponentApi.formLabel})`,
    hasLinkInType: true
  },
  formControlLabelProps: {
    name: 'formControlLabelProps',
    description: `[FormControlLabelProps](${ExternalLinks.muiComponentApi.formControlLabel}) to customise \`FormControlLabel\` component for a field. Multiple fields can be configured using the [ConfigProvider](/customization) component.`,
    type: `[FormControlLabelProps](${ExternalLinks.muiComponentApi.formControlLabel})`,
    hasLinkInType: true
  },
  showLabelAboveFormField: {
    name: 'showLabelAboveFormField',
    description: `Render form label above the form field in [FormLabel](${ExternalLinks.muiComponentApi.formLabel}) component.`,
    type: 'boolean'
  },
  showLabelAboveFormField_Default: {
    name: 'showLabelAboveFormField',
    description: 'Renders the form label above the field by default.',
    type: 'boolean'
  },
  hideLabel: {
    name: 'hideLabel',
    description: 'Hides both the `FormLabel` text and the component’s default label, enabling you to render a fully custom form label component instead.',
    type: 'boolean'
  },
  helperText: {
    name: 'helperText',
    description: 'The content to display within the `FormHelperText` component below the field. If the field validation fails, this content will be overridden by the corresponding error message.',
    type: 'ReactNode',
  },
  errorMessage: {
    name: 'errorMessage',
    description: `Error message to be shown for a field in [FormHelperText](${ExternalLinks.muiComponentApi.formHelperText}) component.`,
    type: 'ReactNode'
  },
  hideErrorMessage: {
    name: 'hideErrorMessage',
    description: 'A flag to prevent replacement of *helper text* of a field by the *error message* when the validation is triggered.',
    type: 'boolean',
  },
  formHelperTextProps: {
    name: 'formHelperTextProps',
    description: `[FormHelperTextProps](${ExternalLinks.muiComponentApi.formHelperText}) to customise FormHelperText component for a field. Multiple fields can be configured using the [ConfigProvider](/customization) component.`,
    type: `[FormHelperTextProps](${ExternalLinks.muiComponentApi.formHelperText})`,
    hasLinkInType: true
  },
  renderOption: {
    name: 'renderOption',
    description: 'Render the option content',
    type: 'function (option) => ReactNode'
  },
  customOnChange_Inputs: {
    name: 'customOnChange',
    description: 'Override the default `onChange` behavior of the input. You must pass the updated `event.target.value` to the **rhfOnChange** function to update the field value.',
    type: '(rhfOnChange, event) => void'
  },
  customOnChange_Select: {
    name: 'customOnChange',
    description: 'Override the default `onChange` behavior of the select component. You must pass the updated `event.target.value` to the **rhfOnChange** function to update the field value.',
    type: '(rhfOnChange, event) => void'
  },
  customOnChange_Cbx_Switch: {
    name: 'customOnChange',
    description: 'Override the default `onChange` behavior of the component. You can also prevent the toggle behaviour using `event.preventDefault()` based on your business logic, but must pass the updated `event.target.checked` value to the **rhfOnChange** function to toggle the field.',
    type: '(rhfOnChange, event) => void'
  },
  customOnChange_CheckboxGroup: {
    name: 'customOnChange',
    description: 'Callback function that allows custom logic to be executed whenever a checkbox value changes. You can use this to implement conditional selection, logging, or side effects before or after updating the form value.',
    type: '(rhfOnChange: newValues => void, event, checked, currentValues) => void'
  },
  customOnChange_Slider: {
    name: 'customOnChange',
    description: 'Override the default `onChange` behavior of the slider, which can enable you to prevent the slider from going below a certain threshold.',
    type: '(rhfOnChange, value: number OR number[], activeThumb: number, event) => void'
  },
  customOnChange_Rating: {
    name: 'customOnChange',
    description: 'Overrides the default `onChange` behavior of the **Rating** component, allowing you to enforce a minimum rating value and prevent users from selecting a value below the defined threshold.',
    type: '(rhfOnChange, newValue: number OR null, event) => void'
  },
  customOnChange_RadioGroup: {
    name: 'customOnChange',
    description: 'Override the default `onChange` behavior of the radio group. You must pass the selected value to the **rhfOnChange** function to update the field value.',
    type: '(rhfOnChange, event, selectedValue) => void'
  },
  onTagAdd: {
    name: 'onTagAdd',
    description: 'Callback function triggered whenever a new tag is added by pressing **Enter**. If the result is `false`, the tag addition is prevented. If a string is returned, that value is added as the new tag instead of the original input.',
    type: '(newTag: string, currentTags: string[]) => boolean OR string OR void'
  },
  onTagDelete: {
    name: 'onTagDelete',
    description: 'Callback function triggered when a tag is removed from the input. If the result is `false`, the tag deletion is prevented.',
    type: '(deletedTag: string, currentTags: string[]) => boolean OR string OR void'
  },
  onTagPaste: {
    name: 'onTagPaste',
    description: 'Callback function called when a string or comma-separated values are pasted into the input field. You can modify the pasted tags or prevent the paste action by returning `false`.',
    type: '(pastedTags: string, currentTags: string[]) => boolean OR string OR void'
  },
  delimiter: {
    name: 'delimiter',
    description: 'Specifies the character used to split multiple tags entered or pasted at once (e.g., `\',\'` or `\';\'`).',
    type: 'string'
  },
  maxTags: {
    name: 'maxTags',
    description: 'Specifies the maximum number of tags that can be added to the input. Once the limit is reached, no further tags can be added.',
    type: 'number'
  },
  onValueChange_Default_v1: {
    name: 'onValueChange',
    description: 'An optional callback function when the value of a field changes. The changed value can be obtained from `e.target.value`.',
    type: '(e: ChangeEvent) => void'
  },
  onValueChange_Inputs: {
    name: 'onValueChange',
    description: 'An optional callback function when the value of a field changes.',
    type: '(value: string, event: ChangeEvent) => void'
  },
  onValueChange_numberInput: {
    name: 'onValueChange',
    description: 'An optional callback function that returns the parsed numeric value, which can be an **integer**, **float**, or **null** if the input is empty.',
    type: '(value: number OR null) => void'
  },
  onValueChange_tagsInput: {
    name: 'onValueChange',
    description: 'An optional callback function that returns an array of strings.',
    type: '(tags: string[]) => void'
  },
  onValueChange_FileUploader: {
    name: 'onValueChange',
    description: 'An optional callback function that returns the file(s) uploaded in the file uploader component.',
    type: '(files: File OR File[] OR null) => void'
  },
  onValueChange_Select: {
    name: 'onValueChange',
    description: 'An optional callback function when an option is selected. The latest value can be obtained from `newValue` argument.',
    type: '(newValue, event, child) => void'
  },
  onValueChange_Select_v1: {
    name: 'onValueChange',
    description: 'An optional callback function when the value of a field changes. The changed value can be obtained from `e.target.value` ',
    type: '(e: SelectChangeEvent) => void'
  },
  onValueChange_NativeSelect: {
    name: 'onValueChange',
    description: 'An optional callback function when an option is selected. The latest value can be obtained from `newValue` argument.',
    type: '(newValue, event) => void'
  },
  onValueChange_Autocomplete: {
    name: 'onValueChange',
    description: 'Returns the latest value of the field in `newValue` parameter. The last selected option can be obtained from `details`.',
    type: '(newValue, event, reason, details?) => void'
  },
  onValueChange_MultiAutocomplete: {
    name: 'onValueChange',
    description: 'Callback function that returns the latest fieldValue and value of the item selected.',
    type: '(fieldValue: string[], targetValue?: string) => void'
  },
  onValueChange_CountrySelect: {
    name: 'onValueChange',
    description: 'Returns **newValue** as `CountryDetails` or `CountryDetails[]` based on the `multiple` prop. Returns `null` if no selection has been made.',
    type: '(newValue, event, reason, details?) => void '
  },
  onValueChange_Checkbox: {
    name: 'onValueChange',
    description: 'An optional callback function which returns the state of the checkbox.',
    type: '(isChecked: boolean, e: ChangeEvent) => void'
  },
  onValueChange_Checkbox_v1: {
    name: 'onValueChange',
    description: 'An optional callback function which returns the state of the checkbox from `e.target.checked` value.',
    type: '(e: ChangeEvent) => void'
  },
  onValueChange_CheckboxGroup: {
    name: 'onValueChange',
    description: 'An optional callback function triggered upon selection. The `selectedItemValue` parameter provides the value of the item being checked, while the `value` parameter returns the updated complete value of the form field.',
    type: '(selectedItemValue, value, event) => void'
  },
  onValueChange_CheckboxGroup_v1: {
    name: 'onValueChange',
    description: 'An optional callback function returning the value of the selected control.',
    type: '(e: ChangeEvent<HTMLInputElement>, newValue: string) => void'
  },
  onValueChange_RadioGroup: {
    name: 'onValueChange',
    description: 'An optional callback function returning the value of the radio button being selected.',
    type: '(selectedItemValue, event) =>  void'
  },
  onValueChange_Slider: {
    name: 'onValueChange',
    description: 'Optional callback function returning the selected value of `RHFSlider`.',
    type: '(value: number OR number[], activeThumb: number, event) => void'
  },
  onValueChange_Slider_v1: {
    name: 'onValueChange',
    description: 'Optional callback function returning the selected value of `RHFSlider`.',
    type: '(event: Event, value: number OR number[], activeThumb: number) => void'
  },
  onValueChange_Switch: {
    name: 'onValueChange',
    description: 'A callback function that triggers when the switch is toggled, providing a boolean indicating whether the switch is on or off.',
    type: '(isChecked: boolean, e: ChangeEvent) => void'
  },
  onValueChange_Rating: {
    name: 'onValueChange',
    description: 'An optional callback function that returns the changed value of rating component',
    type: '(newValue: number OR null, event) => void'
  },
  onValueChange_Rating_v1: {
    name: 'onValueChange',
    description: 'An optional callback function that returns the changed value of rating component',
    type: '(e: SyntheticEvent, newValue: number OR null) => void'
  },
  onValueChange_DatePicker: {
    name: 'onValueChange',
    description: 'An optional callback function that returns the selected date as per the specified `dateAdapter`.',
    type: '(newValue: PickerValidDate OR null, dateContext) => void'
  },
  onValueChange_TimePicker: {
    name: 'onValueChange',
    description: 'An optional callback function that returns the selected time as per the specified `dateAdapter`.',
    type: '(newValue: PickerValidDate OR null, timeContext) => void'
  },
  onValueChange_DateTimePicker: {
    name: 'onValueChange',
    description: 'An optional callback function that returns the selected dateTime as per the specified `dateAdapter`.',
    type: '(newValue: PickerValidDate OR null, dateTimeContext) => void'
  },
  onValueChange_Pickers_v1: {
    name: 'onValueChange',
    description: 'An optional callback function which returns the selected date or time value.',
    type: '(newValue: unknown) => void'
  },
  valueKey_ColorPicker: {
    name: 'valueKey',
    description: 'Returns the `hex`, `rgba` or `hsva` string for the selected color. Returns **hex code** by default.',
    type: 'hex or rgb or hsv'
  },
  onValueChange_ColorPicker: {
    name: 'onValueChange',
    description: 'Callback function to get the selected color in `hex`, `rgb` or `hsv` format. The color format being set in field value can be configured by the `valueKey` prop.',
    type: '(color: IColor) => void'
  },
  onValueChange_ColorPicker_v1: {
    name: 'onValueChange',
    description: 'Callback function to get the selected color. Update form state by calling the `setValue` function, and passing the color value in preffered format.',
    type: '(color: IColor) => void',
    required: true
  },
  onValueChange_RichTextEditor: {
    name: 'onValueChange',
    description: 'Callback function returning the editor value, `event` object and editor details.',
    type: '(newValue: string, event: EventInfo, editor: ClassicEditor) => void',
  },
  onValueChange_RichTextEditor_v1: {
    name: 'onValueChange',
    description: 'Callback function returning the `event` object, editor value and editor details.',
    type: '(event: EventInfo, newValue: string, editor: ClassicEditor) => void',
  },
  onValueChange_PhoneInput: {
    name: 'onValueChange',
    description: 'Callback function to get details of input phone number, including the country details.',
    type: '({ phone: string, inputValue: string, country: ParsedCountry }) => void',
  },
  value_ColorPicker: {
    name: 'value',
    description: 'Defines the selected color in the RHFColorPicker component. Use `getValues(\'fieldName\')` to set the value dynamically, else `defaultColor` is selected as the current color.',
    type: 'string',
    required: true
  },
  value_ColorPicker_v1: {
    name: 'value',
    description: 'Defines the selected color in the RHFColorPicker component. Use `getValues(\'fieldName\')` to set the value dynamically. Defaults to **Black**(`#000000`).',
    type: 'string'
  },
  defaultColor: {
    name: 'defaultColor',
    description: 'The default color to select when the field is not initialized. The default value **Black**(`#000000`) can be overridden by providing a valid color string, hex, rgb or hsv value.',
    type: 'string'
  },
  excludeAlpha: {
    name: 'excludeAlpha',
    description: 'Specifies whether to exclude **alpha** from the color string when the `valueKey` is **rgb** or **hsv**. Alpha will only be excluded if its value is `1` or is `undefined` in the input color.',
    type: 'boolean'
  },
  value_RichTextEditor: {
    name: 'value',
    description: 'The content to render in the Rich Text Editor. It can be a plain text string or an HTML string.',
    type: 'string',
  },
  value_PhoneInput: {
    name: 'value',
    description: 'Pass `getValues(fieldName)` to synchronize the value argument in the `usePhoneInput` hook with the form field\'s actual value.',
    type: 'string OR undefined',
    required: true
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
  hideFileList: {
    name: 'hideFileList',
    description: 'Hide the list of files uploaded in the file uploader component.',
    type: 'boolean'
  },
  accept_FileUploader: {
    name: 'accept',
    description: 'The file types to accept in the file uploader component. Eg: `image/*` or `.pdf,.docx`.',
    type: 'string'
  },
  accept_FileUploader_v2: {
    name: 'accept',
    description: 'The file types to accept in the file uploader component.  Eg: `image/*` or `.pdf,.docx`.',
    required: true,
    type: 'string'
  },
  multiple_FileUploader: {
    name: 'multiple',
    description: 'Allow selection of single or multiple values for a formfield.',
    type: 'boolean'
  },
  maxSize_FileUploader: {
    name: 'maxSize',
    description: 'The maximum file size in bytes allowed for each uploaded file.',
    type: 'number'
  },
  maxFiles: {
    name: 'maxFiles',
    description: 'The maximum number of files allowed to be uploaded in the file uploader component. Extra files will be rejected.',
    type: 'number'
  },
  showFileSize: {
    name: 'showFileSize',
    description: 'Show the file size of the uploaded file(s) in the file uploader component.',
    type: 'boolean'
  },
  renderUploadButton: {
    name: 'renderUploadButton',
    description: 'Custom render function to replace the default upload button in the file uploader component. Refer to the [example](/components/mui/RHFFileUploader#advanced-usage) for more details.',
    type: '(fileInput: ReactNode) => ReactNode'
  },
  renderFileItem: {
    name: 'renderFileItem',
    description: 'Custom render function to replace the default file item in the file uploader component. Refer to the [example](/components/mui/RHFFileUploader#advanced-usage) for more details.',
    type: '(file: File, index: number) => ReactNode'
  },
  onUploadError: {
    name: 'onUploadError',
    description: 'Callback function that returns the error message and rejected files when uploaded files fail the validation during upload.',
    type: '(errors: FileUploadError[], rejectedFiles: File[]) => void'
  },
  fullWidth_FileUploader: {
    name: 'fullWidth',
    description: 'Set the width of the file uploader component to 100%.',
    type: 'boolean'
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
  showMarkers: {
    name: 'showMarkers',
    description: 'Show the increment and decrement markers on number input.  Hidden by default.',
    type: 'boolean'
  },
  maxDecimalPlaces: {
    name: 'maxDecimalPlaces',
    description: 'Limits how many digits a user can enter after the decimal point',
    type: 'number'
  },
  stepAmount: {
    name: 'stepAmount',
    description: 'The amount to increase/decrease value when using arrow keys or input steppers',
    type: 'number'
  },
  showDefaultOption: {
    name: 'showDefaultOption',
    description: 'Show default Label of the disabled option when value of `RHFSelect` or `RHFNativeSelect` is `\'\'`. This text can be changed using the `defaultOptionText` prop.',
    type: 'boolean'
  },
  defaultOptionText: {
    name: 'defaultOptionText',
    description: 'Custom text to replace the default text when `showDefaultOption` is `true` for `RHFSelect` or `RHFNativeSelect`.',
    type: 'string'
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
  getOptionDisabled: {
    name: 'getOptionDisabled',
    description: 'Function to dynamically disable specific option(s) based on custom logic.',
    type: 'function(option: Value) => boolean'
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
  },
  phoneInputProps: {
    name: 'phoneInputProps',
    description: 'Props to pass in the `usePhoneInput` hook for customization.',
    type: '[UsePhoneInputConfig](https://react-international-phone.vercel.app/docs/Usage/PhoneInput) & { hideDropdown?: boolean}',
    hasLinkInType: true
  },
  countries: {
    name: 'countries',
    description: 'The list of countries to render for selection in the Autocomplete. By default all countries will be listed.',
    type: 'CountryDetails[]',
  },
  preferredCountries: {
    name: 'preferredCountries',
    description: 'The countries to show at the top of the list. The array requires the `iso` values of the countries.',
    type: 'CountryISO[]',
  },
  valueKey_CountrySelect: {
    name: 'valueKey',
    description: 'The key to select from each option when returning the value(s) from the selected option. Country `iso` is the returned by default.',
    type: '`name` OR `iso` OR `iso3`',
  },
  textFieldProps: {
    name: 'textFieldProps',
    description: 'Props to customise the Autocomplete Textfield.',
    type: '[TextFieldProps](https://mui.com/material-ui/api/text-field/)',
    hasLinkInType: true
  },
  multiple: {
    name: 'multiple',
    description: 'Allow selection of single or multiple values for a formfield.',
    type: 'boolean'
  },
  selectAllText: {
    name: 'selectAllText',
    description: 'Custom text to render in place of the "Select All" option that enables user to select all available options in the Autocomplete.',
    type: 'string'
  },
  ChipProps: {
    name: 'ChipProps',
    description: 'Props to customise the `Chip` component for each input tag.',
    type: '[ChipProps](https://mui.com/material-ui/api/chip/)',
    hasLinkInType: true
  },
  limitTags: {
    name: 'limitTags',
    description: 'Maximum number of tags to show when the input is not focused. The default value is `2`. Provide value as `-1` to show all tags.',
    type: 'number'
  },
  getLimitTagsText: {
    name: 'getLimitTagsText',
    description: 'The label to display when the tags are truncated',
    type: '(hiddenTags: number) => ReactNode'
  },
  displayFlagOnSelect: {
    name: 'displayFlagOnSelect',
    description: 'Show the flag of the selected country alongside its name in the tag. Works only when `multiple` is **true**.',
    type: 'boolean'
  }
});

export default PropsDescription;
