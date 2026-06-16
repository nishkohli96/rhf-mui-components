import { ExternalLinks } from '@site/src/constants';
import { type PropsInfo, type PropsDescriptionArgs } from '@site/src/types';

const PropsDescription: Record<
  string,
  | PropsInfo
  | (({ docsVersion, muiVersion }: PropsDescriptionArgs) => PropsInfo)
> = Object.freeze({
  fieldName: {
    name: 'fieldName',
    description: 'Name of the field registered with React Hook Form. This prop is required for all components.',
    required: true,
    type: 'string'
  },
  control: {
    name: 'control',
    description: `The [control](${ExternalLinks.rhfApi.control}) option yielded on calling the [useForm](${ExternalLinks.rhfApi.useForm}) hook.`,
    required: true,
    type: `[UseFormControl](${ExternalLinks.rhfApi.control})`,
    hasLinkInType: true
  },
  registerOptions: {
    name: 'registerOptions',
    description: `React Hook Form [validation rules](${ExternalLinks.rhfApi.register}). Useful when not using a schema validation library such as [Yup](${ExternalLinks.validationLibs.yup}) or [Joi](${ExternalLinks.validationLibs.joi}).`,
    type: 'RegisterOptions'
  },
  required: {
    name: 'required',
    description:
      'Indicates that the field is mandatory by adding an asterisk symbol (*) to the `formLabel`. This visual cue helps users quickly identify required fields in the form.',
    type: 'boolean'
  },
  options: {
    name: 'options',
    description: 'An array with string, numeric or object values. Make sure to pass `labelKey` and `valueKey` when options is an array of objects.',
    type: 'string[] / number[] / object[]',
    required: true
  },
  options_StrOrObj: {
    name: 'options',
    description: 'An array with string or object values. Make sure to pass `labelKey` and `valueKey` when options is an array of objects.',
    type: 'string[] / object[]',
    required: true
  },
  options_Obj: {
    name: 'options',
    description: 'An array of objects. `labelKey` and `valueKey` are required so the component knows which properties to use for the visible label and the stored value.',
    type: 'object[]',
    required: true
  },
  labelKey: {
    name: 'labelKey',
    description: 'Property name used as the visible label for each option. Required when `options` is an array of objects.',
    type: 'string',
    required: true
  },
  labelKey_Obj: {
    name: 'labelKey',
    description: 'Property name used as the visible label for each option.',
    type: 'string',
    required: true
  },
  valueKey: {
    name: 'valueKey',
    description: 'Property name used as the stored value for each option. Required when `options` is an array of objects.',
    type: 'string',
    required: true
  },
  valueKey_Obj: {
    name: 'valueKey',
    description: 'Property name used as the stored value for each option.',
    type: 'string',
    required: true
  },
  customOnChange: {
    name: 'customOnChange',
    description: 'Overrides the default `onChange` behavior. When provided, `onValueChange` is not called. You must call `rhfOnChange(newValue)` to update the form state.',
    type: '(rhfOnChange, event, ...args) => void'
  },
  onValueChange: {
    name: 'onValueChange',
    description:
      'Callback function triggered when the field value changes. Method signature can be viewed for each component in its documentation page.',
    type: 'Function'
  },
  label: ({ docsVersion, muiVersion }: PropsDescriptionArgs) => ({
    name: 'label',
    description: `The text to render in the [FormLabel](${ExternalLinks.muiComponentApi.formLabel(muiVersion)}) component. By default, the value of \`fieldName\` (e.g., _firstName_) is transformed to "**First Name**" using the [fieldNameToLabel](/${docsVersion ? `v${docsVersion}/` : ''}form-helpers/fieldNameToLabel) function.`,
    type: 'ReactNode'
  }),
  hideLabel: ({ muiVersion }: PropsDescriptionArgs) => ({
    name: 'hideLabel',
    description:
      `Hides the [FormLabel](${ExternalLinks.muiComponentApi.formLabel(muiVersion)}) component if you don’t want to display the default form label component or prefer to render a fully custom label instead.`,
    type: 'boolean'
  }),
  // renderOptionLabel: {
  //   name: 'renderOptionLabel',
  //   description:
  //     'Render the option label content corresponding to each checkbox. The `selectAllText` parameter can be used to ensure that your option logic does not affect the "Select All" option.',
  //   type: '(option, selectAllText, state) => ReactNode'
  // },
  placeholder_Select: {
    name: 'placeholder',
    description:
      'The placeholder text to be shown when no option is selected in the select field. Available from version **3.1.0** and above.',
    type: 'string'
  },
  formLabelProps: ({ docsVersion, muiVersion }: PropsDescriptionArgs) => ({
    name: 'formLabelProps',
    description: `[FormLabelProps](${ExternalLinks.muiComponentApi.formLabel(muiVersion)}) to customise [FormLabel](${ExternalLinks.muiComponentApi.formLabel(muiVersion)}) component for a field. Multiple fields can be configured using the [ConfigProvider](${!docsVersion ? '/customization' : `/v${docsVersion}/customization`}) component.`,
    type: `[FormLabelProps](${ExternalLinks.muiComponentApi.formLabel(muiVersion)})`,
    hasLinkInType: true
  }),
  formControlLabelProps: ({ docsVersion, muiVersion }: PropsDescriptionArgs) => ({
    name: 'formControlLabelProps',
    description: `[FormControlLabelProps](${ExternalLinks.muiComponentApi.formControlLabel(muiVersion)}) to customise \`FormControlLabel\` component for a field. Multiple fields can be configured using the [ConfigProvider](${!docsVersion ? '/customization' : `/v${docsVersion}/customization`}) component.`,
    type: `[FormControlLabelProps](${ExternalLinks.muiComponentApi.formControlLabel(muiVersion)})`,
    hasLinkInType: true
  }),
  showLabelAboveFormField: ({ muiVersion }: PropsDescriptionArgs) => ({
    name: 'showLabelAboveFormField',
    description: `Render form label above the form field in [FormLabel](${ExternalLinks.muiComponentApi.formLabel(muiVersion)}) component.`,
    type: 'boolean'
  }),
  showLabelAboveFormField_Default: {
    name: 'showLabelAboveFormField',
    description: 'Renders the form label above the field.',
    type: 'boolean'
  },
  helperText: ({ muiVersion }: PropsDescriptionArgs) => ({
    name: 'helperText',
    description:
      `The content to display within the [FormHelperText](${ExternalLinks.muiComponentApi.formHelperText(muiVersion)}) component below the field. If the field validation fails, this content will be overridden by the corresponding error message.`,
    type: 'ReactNode'
  }),
  errorMessage: ({ muiVersion }: PropsDescriptionArgs) => ({
    name: 'errorMessage',
    description: `Error message to be shown for a field in [FormHelperText](${ExternalLinks.muiComponentApi.formHelperText(muiVersion)}) component.`,
    type: 'ReactNode'
  }),
  hideErrorMessage: {
    name: 'hideErrorMessage',
    description:
      'A flag to prevent replacement of *helper text* of a field by the *error message* when the validation is triggered.',
    type: 'boolean'
  },
  formHelperTextProps: ({ docsVersion, muiVersion }: PropsDescriptionArgs) => ({
    name: 'formHelperTextProps',
    description: `[FormHelperTextProps](${ExternalLinks.muiComponentApi.formHelperText(muiVersion)}) to customise FormHelperText component for a field. Multiple fields can be configured using the [ConfigProvider](${!docsVersion ? '/customization' : `/v${docsVersion}/customization`}) component.`,
    type: `[FormHelperTextProps](${ExternalLinks.muiComponentApi.formHelperText(muiVersion)})`,
    hasLinkInType: true
  }),
  renderOptionLabel: {
    name: 'renderOptionLabel',
    description: 'Custom renderer for option labels. When not provided, the label is derived from the option value or the property specified by `labelKey`.',
    type: '(option) => ReactNode'
  },
  getOptionDisabled: {
    name: 'getOptionDisabled',
    description: 'Function used to determine whether an option should be disabled. Return `true` to disable the option and prevent it from being selected.',
    type: '(option) => boolean'
  },
  customIds: {
    name: 'customIds',
    description: 'Overrides the values of default `id`, `labelId`, `helperTextId`, and `errorId` for each form field component to improve accessibility.',
    type: '{ field, label, helperText, error }'
  },
  customOnChange_Inputs: {
    name: 'customOnChange',
    description:
      'Override the default `onChange` behavior of the input. You must pass the updated `newValue` to the **rhfOnChange** function to update the field value.',
    type: '({ rhfOnChange, newValue, event }) => void'
  },
  customOnChange_Select: {
    name: 'customOnChange',
    description:
      'Override the default `onChange` behavior of the select component. You must pass the updated `newValue` to the **rhfOnChange** function to update the field value.',
    type: '({ rhfOnChange, newValue, event, child }) => void'
  },
  customOnChange_NativeSelect: {
    name: 'customOnChange',
    description:
      'Override the default `onChange` behavior of the native select component. You must pass the updated `newValue` to the **rhfOnChange** function to update the field value.',
    type: '({ rhfOnChange, newValue, event }) => void'
  },
  customOnChange_Autocomplete: {
    name: 'customOnChange',
    description:
      'Override the default `onChange` behavior of the autocomplete.',
    type: '({ rhfOnChange, newValue, selectedOption, event, reason, details }) => void'
  },
  customOnChange_AutocompleteObject: {
    name: 'customOnChange',
    description:
      'Override the default `onChange` behavior of the autocomplete.',
    type: '({ rhfOnChange, newValue, event, reason, details }) => void'
  },
  customOnChange_MultiAutocompleteObject: {
    name: 'customOnChange',
    description:
      'Override the default `onChange` behavior of the autocomplete.',
    type: '({ rhfOnChange, newValue, selectedOption }) => void'
  },
  customOnChange_Cbx_Switch: {
    name: 'customOnChange',
    description:
      'Override the default `onChange` behavior of the component. You can also prevent the toggle behaviour using `event.preventDefault()` based on your business logic, but must pass the updated `newValue` value to the **rhfOnChange** function to toggle the field.',
    type: '({ rhfOnChange, newValue, event }) => void'
  },
  customOnChange_CheckboxGroup: {
    name: 'customOnChange',
    description:
      'Callback function that allows custom logic to be executed whenever a checkbox value changes. You can use this to implement conditional selection, logging, or side effects before or after updating the form value.',
    type: '({ rhfOnChange, event, currentValue, toggledValue, checked }) => void'
  },
  customOnChange_Slider: {
    name: 'customOnChange',
    description:
      'Override the default `onChange` behavior of the slider, which can enable you to prevent the slider from going below a certain threshold.',
    type: '({ rhfOnChange, newValue, activeThumb, event }) => void'
  },
  customOnChange_Rating: {
    name: 'customOnChange',
    description:
      'Overrides the default `onChange` behavior of the **Rating** component, allowing you to enforce a minimum rating value and prevent users from selecting a value below the defined threshold.',
    type: '({ rhfOnChange, newValue, event }) => void'
  },
  customOnChange_RadioGroup: {
    name: 'customOnChange',
    description:
      'Override the default `onChange` behavior of the radio group. You must pass the selected `newValue` to the **rhfOnChange** function to update the field value.',
    type: '({ rhfOnChange, newValue, event }) => void'
  },
  onTagAdd: {
    name: 'onTagAdd',
    description:
    'Callback function triggered before a tag is added by pressing Enter or the configured delimiter key. Return `false` to prevent the tag from being added. Return a string to replace the original tag value before it is added.',
    type: '(newTag: string, currentTags: string[]) => boolean / string / void'
  },
  onTagDelete: {
    name: 'onTagDelete',
    description:
    'Callback function triggered before a tag is removed. Return `false` to prevent the tag from being deleted.',
    type: '(deletedTag: string, currentTags: string[]) => boolean / void'
  },
  onTagPaste: {
    name: 'onTagPaste',
    description:
    'Callback function triggered when tags are pasted into the input. The pasted text is split using the configured delimiter, trimmed, and deduplicated before this callback is invoked. Return `false` to prevent all pasted tags from being added, or return a string array to replace the parsed tags.',
    type: '(pastedTags: string[], currentTags: string[]) => boolean / string[] / void'
  },
  delimiter: {
    name: 'delimiter',
    description:
    'Character used to separate tags when typing or pasting. Pressing the delimiter key commits the current input as one or more tags, and pasted values are split using the same delimiter.',
    type: 'string'
  },
  maxTags: {
    name: 'maxTags',
    description:
    'Maximum number of tags that can be added. Once the limit is reached, additional tags entered from the keyboard are ignored, and pasted tags are truncated to the remaining available slots.',
    type: 'number'
  },
  onValueChange_Inputs: {
    name: 'onValueChange',
    description:
      'Callback function triggered when the field value changes.',
    type: '({ newValue, event }) => void'
  },
  onValueChange_numberInput: {
    name: 'onValueChange',
    description: 'An optional callback function that returns the parsed numeric value, which can be an **integer**, **float**, or **null** if the input is empty.',
    type: '(value: number / null) => void'
  },
  onValueChange_tagsInput: {
    name: 'onValueChange',
    description: 'An optional callback function that returns all tags present in the input.',
    type: '({ newValue }) => void'
  },
  onValueChange_FileUploader: {
    name: 'onValueChange',
    description: 'An optional callback function that returns the file(s) uploaded in the file uploader component.',
    type: '(files: File / File[] / null) => void'
  },
  onValueChange_Select: {
    name: 'onValueChange',
    description:
      'An optional callback function when an option is selected. The latest value can be obtained from `newValue` argument.',
    type: '({ newValue, event, child }) => void'
  },
  onValueChange_NativeSelect: {
    name: 'onValueChange',
    description:
      'An optional callback function when an option is selected. The latest value can be obtained from `newValue` argument.',
    type: '({ newValue, event }) => void'
  },
  onValueChange_Autocomplete: {
    name: 'onValueChange',
    description:
      'Returns the latest value of the field in `newValue` parameter. The last selected option can be obtained from `selectedOption`.',
    type: '({ newValue, selectedOption, event, reason, details }) => void'
  },
  onValueChange_AutocompleteObject: {
    name: 'onValueChange',
    description: 'Returns the entire object option(s) selected by the user in `newValue` parameter. The last selected option can be obtained from `details`.',
    type: '({ newValue, event, reason, details }) => void'
  },
  onValueChange_MultiAutocomplete: {
    name: 'onValueChange',
    description:
      'Returns the latest value of the field in `newValue` parameter. The last selected option can be obtained from `selectedOption`.',
    type: '({ newValue, selectedOption }) => void'
  },
  onValueChange_MultiAutocompleteObject: {
    name: 'onValueChange',
    description: 'Returns the latest value of the field in `newValue` parameter. The last selected option can be obtained from `selectedOption`.',
    type: '({ newValue, selectedOption }) => void'
  },
  onValueChange_CountrySelect: {
    name: 'onValueChange',
    description:
      'Returns **newValue** as `CountryDetails` or `CountryDetails[]` based on the `multiple` prop. Returns `null` if no selection has been made.',
    type: '(newValue, event, reason, details?) => void '
  },
  onValueChange_Checkbox: {
    name: 'onValueChange',
    description:
      'An optional callback function which returns the state of the checkbox.',
    type: '({ newValue, event }) => void'
  },
  onValueChange_Switch: {
    name: 'onValueChange',
    description:
      'An optional callback function which returns whether the switch is turned on or not.',
    type: '({ newValue, event }) => void'
  },
  onValueChange_CheckboxGroup: {
    name: 'onValueChange',
    description:
      'An optional callback function triggered upon selection. The `toggledValue` parameter provides the value of the item being checked, while the `newValue` parameter returns the updated complete value of the form field.',
    type: '({ event, newValue, toggledValue, checked }) => void'
  },
  onValueChange_RadioGroup: {
    name: 'onValueChange',
    description:
      'An optional callback function returning the value of the radio button being selected.',
    type: '({ newValue, event }) =>  void'
  },
  onValueChange_Slider: {
    name: 'onValueChange',
    description: 'Optional callback function returning the selected value of `RHFSlider`.',
    type: '({ event, newValue, activeThumb }) => void'
  },
  onValueChange_Rating: {
    name: 'onValueChange',
    description: 'An optional callback function that returns the changed value of rating component',
    type: '({ newValue, event }) => void'
  },
  onValueChange_DatePicker: {
    name: 'onValueChange',
    description: 'An optional callback function that returns the selected date as per the specified `dateAdapter`.',
    type: '(newValue: PickerValidDate / null, dateContext) => void'
  },
  onValueChange_TimePicker: {
    name: 'onValueChange',
    description: 'An optional callback function that returns the selected time as per the specified `dateAdapter`.',
    type: '(newValue: PickerValidDate / null, timeContext) => void'
  },
  onValueChange_DateTimePicker: {
    name: 'onValueChange',
    description: 'An optional callback function that returns the selected dateTime as per the specified `dateAdapter`.',
    type: '(newValue: PickerValidDate / null, dateTimeContext) => void'
  },
  valueKey_ColorPicker: {
    name: 'valueKey',
    description: 'Returns the `hex`, `rgba` or `hsva` string for the selected color. Returns **hex code** by default.',
    type: 'hex / rgb / hsv'
  },
  onValueChange_ColorPicker: {
    name: 'onValueChange',
    description:
      'Callback function to get the selected color in `hex`, `rgb` or `hsv` format. The color format being set in field value can be configured by the `valueKey` prop.',
    type: '(color: IColor) => void'
  },
  customOnChange_ColorPicker: {
    name: 'customOnChange',
    description:
      'An optional callback function to override the default `onChange` behavior of the color picker component. This invalidates the usage of `onValueChange` function. You can get the selected color value and the `setColor` function from the parameters to implement your custom logic and update the form state.',
    type: '({ color, setColor }) => void'
  },
  onValueChange_RichTextEditor: {
    name: 'onValueChange',
    description:
      'Callback function returning the editor value, `event` object and editor details.',
    type: '(newValue: string, event: EventInfo, editor: ClassicEditor) => void'
  },
  onValueChange_PhoneInput: {
    name: 'onValueChange',
    description:
      'Callback function to get details of input phone number, including the country details.',
    type: '({ phone: string, inputValue: string, country: ParsedCountry }) => void'
  },
  defaultColor: {
    name: 'defaultColor',
    description:
      'The default color to select when the field is not initialized. The default value **Black**(`#000000`) can be overridden by providing a valid color string, hex, rgb or hsv value.',
    type: 'string'
  },
  excludeAlpha: {
    name: 'excludeAlpha',
    description:
      'Specifies whether to exclude **alpha** from the color string when the `valueKey` is **rgb** or **hsv**. Alpha will only be excluded if its value is `1` or is `undefined` in the input color.',
    type: 'boolean'
  },
  value_PhoneInput: {
    name: 'value',
    description: 'Pass `getValues(fieldName)` to synchronize the value argument in the `usePhoneInput` hook with the form field\'s actual value.',
    type: 'string / undefined',
    required: true
  },
  showPasswordIcon: {
    name: 'showPasswordIcon',
    description:
      'Icon component to show password, such as `VisibilityIcon` from `@mui/icons-material/Visibility`.',
    type: 'ReactNode'
  },
  hidePasswordIcon: {
    name: 'hidePasswordIcon',
    description:
      'Icon component to hide password text, such as `VisibilityOffIcon` from `@mui/icons-material/VisibilityOff`.',
    type: 'ReactNode'
  },
  hideFileList: {
    name: 'hideFileList',
    description:
      'Hide the list of files uploaded in the file uploader component.',
    type: 'boolean'
  },
  accept_FileUploader: {
    name: 'accept',
    description:
      'The file types to accept in the file uploader component. Eg: `image/*` or `.pdf,.docx`.',
    type: 'string'
  },
  accept_FileUploader_v2: {
    name: 'accept',
    description:
      'The file types to accept in the file uploader component.  Eg: `image/*` or `.pdf,.docx`.',
    required: true,
    type: 'string'
  },
  multiple_FileUploader: {
    name: 'multiple',
    description:
      'Allow selection of single or multiple values for a formfield.',
    type: 'boolean'
  },
  maxSize_FileUploader: {
    name: 'maxSize',
    description:
      'The maximum file size in bytes allowed for each uploaded file.',
    type: 'number'
  },
  maxFiles: {
    name: 'maxFiles',
    description:
      'The maximum number of files allowed to be uploaded in the file uploader component. Extra files will be rejected.',
    type: 'number'
  },
  showFileSize: {
    name: 'showFileSize',
    description:
      'Show the file size of the uploaded file(s) in the file uploader component.',
    type: 'boolean'
  },
  renderUploadButton: ({ docsVersion }: PropsDescriptionArgs) => ({
    name: 'renderUploadButton',
    description:
      `Custom render function to replace the default upload button in the file uploader component. Refer to the [example](/${docsVersion ? `v${docsVersion}/` : ''}components/mui/RHFFileUploader#advanced-usage) for more details.`,
    type: '(fileInput: ReactNode) => ReactNode'
  }),
  renderFileItem: ({ docsVersion }: PropsDescriptionArgs) => ({
    name: 'renderFileItem',
    description:
      `Custom render function to replace the default file item in the file uploader component. Refer to the [example](/${docsVersion ? `v${docsVersion}/` : ''}components/mui/RHFFileUploader#advanced-usage) for more details.`,
    type: '(file: File, index: number) => ReactNode'
  }),
  onUploadError: {
    name: 'onUploadError',
    description:
      'Callback function that returns the error message and rejected files when uploaded files fail the validation during upload.',
    type: '(errors: FileUploadError[], rejectedFiles: File[]) => void'
  },
  fullWidth_FileUploader: {
    name: 'fullWidth',
    description: 'Set the width of the file uploader component to 100%.',
    type: 'boolean'
  },
  showMarkers: {
    name: 'showMarkers',
    description:
      'Show the increment and decrement markers on number input.  Hidden by default.',
    type: 'boolean'
  },
  onlyIntegers: {
    name: 'onlyIntegers',
    description:
      'When `true`, restricts input to zero, positive and negative integers only.',
    type: 'boolean'
  },
  nonNegative: {
    name: 'nonNegative',
    description:
      'When `true`, restricts input to non-negative numbers (including zero) and sets `min` to `0` on the underlying input. When `false` or omitted, negative values and a leading `-` are allowed while typing.',
    type: 'boolean'
  },
  maxDecimalPlaces: {
    name: 'maxDecimalPlaces',
    description:
      'Limits how many digits a user can enter after the decimal point',
    type: 'number'
  },
  stepAmount: {
    name: 'stepAmount',
    description:
      'The amount to increase/decrease value when using arrow keys or input steppers',
    type: 'number'
  },
  showDefaultOption: {
    name: 'showDefaultOption',
    description: 'Displays the default label for the disabled option when the value is `\'\'`.This text can be customized using the `defaultOptionText` prop',
    type: 'boolean'
  },
  defaultOptionText: {
    name: 'defaultOptionText',
    description:
      'Custom text to replace the default text when `showDefaultOption` is `true` for `RHFSelect` or `RHFNativeSelect`.',
    type: 'string'
  },
  checkboxProps: ({ muiVersion }: PropsDescriptionArgs) => ({
    name: 'checkboxProps',
    description: `[Checkbox Props](${ExternalLinks.muiComponentApi.checkbox(muiVersion)}) to customise each checkbox in checkbox group.`,
    type: `[CheckboxProps](${ExternalLinks.muiComponentApi.checkbox(muiVersion)})`,
    hasLinkInType: true
  }),
  radioProps: ({ muiVersion }: PropsDescriptionArgs) => ({
    name: 'radioProps',
    description: `[Radio Props](${ExternalLinks.muiComponentApi.radio(muiVersion)}) to customise each radio button in radiobutton group.`,
    type: `[RadioProps](${ExternalLinks.muiComponentApi.radio(muiVersion)})`,
    hasLinkInType: true
  }),
  disabled: {
    name: 'disabled',
    description:
      'A `boolean` value to enable or disable editing of the form field.',
    type: 'boolean'
  },
  editorConfig: {
    name: 'editorConfig',
    description:
      'A Configuration object for CkEditor to customize formatting controls and toolbar positioning, as per requirement. Refer to the [toolbar positioning guide](https://ckeditor.com/docs/ckeditor5/latest/getting-started/setup/toolbar.html) for more details.',
    type: '[EditorConfig](https://ckeditor.com/docs/ckeditor5/latest/getting-started/setup/configuration.html)',
    hasLinkInType: true
  },
  id_Rte: {
    name: 'id',
    description:
      'The context ID. When this property changes, the component restarts the context with its editor and reinitializes it based on the current configuration.',
    type: 'string'
  },
  onReady_Rte: {
    name: 'onReady',
    description:
      'A function called when the context is ready and all editors inside were (re)initialized with the context instance.',
    type: '(editor: ClassicEditor) => void'
  },
  onFocus_Rte: {
    name: 'onFocus',
    description: 'Callback function triggered when the editor gains focus.',
    type: '(event: EventInfo<string, unknown>, editor: ClassicEditor) => void'
  },
  onBlur_Rte: {
    name: 'onBlur',
    description:
      'Callback function triggered when the editor gains loses focus.',
    type: '(event: EventInfo<string, unknown>, editor: ClassicEditor) => void'
  },
  onError_Rte: {
    name: 'onError',
    description:
      'A function called when the editor has crashed during the initialization or runtime. It receives two arguments: the error instance and the error details.',
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
    description:
      `The [list of countries](${ExternalLinks.githubRepo.countriesList}) to render for selection in the Autocomplete. By default all countries will be listed.`,
    type: 'CountryDetails[]'
  },
  preferredCountries: {
    name: 'preferredCountries',
    description:
      'The countries to show at the top of the list. The array requires the `iso` values of the countries.',
    type: 'CountryISO[]'
  },
  valueKey_CountrySelect: {
    name: 'valueKey',
    description: 'The key to select from each option when returning the value(s) from the selected option. Country `iso` is the returned by default.',
    type: '`name` / `iso` / `iso3`',
  },
  textFieldProps: ({ muiVersion }: PropsDescriptionArgs) => ({
    name: 'textFieldProps',
    description: `Props to customise the Autocomplete [Textfield](${ExternalLinks.muiComponents.textField(muiVersion)}).`,
    type: `[TextFieldProps](${ExternalLinks.muiComponentApi.textField(muiVersion)})`,
    hasLinkInType: true
  }),
  multiple: {
    name: 'multiple',
    description:
      'Allow selection of single or multiple values for a formfield.',
    type: 'boolean'
  },
  selectAllText: {
    name: 'selectAllText',
    description:
      'Custom text to render in place of the "Select All" option that enables user to select all available options in the Autocomplete.',
    type: 'string'
  },
  hideSelectAllOption: {
    name: 'hideSelectAllOption',
    description:
      'A flag to hide the "Select All" option that enables user to select all available options in RHFMultiAutocomplete. This option will be automatically hidden when there are less than 2 options to select from. Available from version `3.2` and above.',
    type: 'boolean'
  },
  hideSelectAllOption_MultiAutocompleteObject: {
    name: 'hideSelectAllOption',
    description: 'A flag to hide the "Select All" option that enables user to select all available options in RHFMultiAutocompleteObject. This option will be automatically hidden when there are less than 2 options to select from.',
    type: 'boolean'
  },
  ChipProps: ({ muiVersion }: PropsDescriptionArgs) => ({
    name: 'ChipProps',
    description: `Props to customise the [Chip](${ExternalLinks.muiComponents.chip(muiVersion)}) component for each input tag.`,
    type: `[ChipProps](${ExternalLinks.muiComponentApi.chip(muiVersion)})`,
    hasLinkInType: true
  }),
  renderTagLabel: {
    name: 'renderTagLabel',
    description: 'Function to render the label for each tag.',
    type: '(tag: string) => ReactNode'
  },
  limitTags: {
    name: 'limitTags',
    description:
      'Maximum number of tags to show when the input is not focused. The default value is `2`. Provide value as `-1` to show all tags.',
    type: 'number'
  },
  getLimitTagsText: {
    name: 'getLimitTagsText',
    description: 'The label to display when the tags are truncated',
    type: '(hiddenTags: number) => ReactNode'
  },
  displayFlagOnSelect: {
    name: 'displayFlagOnSelect',
    description:
      'Show the flag of the selected country alongside its name in the tag. Works only when `multiple` is **true**.',
    type: 'boolean'
  }
});

export default PropsDescription;
