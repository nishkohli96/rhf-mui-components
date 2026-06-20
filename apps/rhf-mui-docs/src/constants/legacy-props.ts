/**
 * Legacy props that are no longer supported from v4 onwards in their respective
 * components, but are still documented for older versions.
 *
 * The keys follow the format of [propName]_[componentName]_[versionInfo], where
 * versionInfo indicates the applicable versions (e.g., v2_v3 for versions 2 and 3,
 * v1 for version 1).
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
    description: `The [register](${ExternalLinks.rhfApi.register}) function returned by the \`useForm\` hook.`,
    required: true,
    type: `[UseFormRegister](${ExternalLinks.rhfApi.register})`,
    hasLinkInType: true
  },
  errorMessage: ({ muiVersion }: PropsDescriptionArgs) => ({
    name: 'errorMessage',
    description: `Error message to be shown for a field in [FormHelperText](${ExternalLinks.muiComponentApi.formHelperText(muiVersion)}) component.`,
    type: 'ReactNode'
  }),
  setValue: {
    name: 'setValue',
    description: `The [setValue](${ExternalLinks.rhfApi.setValue}) function returned by the \`useForm\` hook.`,
    required: true,
    type: '(name: string, value: unknown, config?: Object) => void'
  },
  label_v1: {
    name: 'label',
    description:
      'Text rendered in the `FormLabel` component. By default, `fieldName` is converted into a readable label, such as `firstName` to **First Name**.',
    type: 'ReactNode'
  },
  defaultValue: {
    name: 'defaultValue',
    description:
      'Initial selected value for `RHFSelect` or `RHFNativeSelect`. Use an array when `multiple` is `true`.',
    type: 'string / string[] / number / number[]'
  },
  onValueChange_Default_v1: {
    name: 'onValueChange',
    description:
      'Callback function triggered when the field value changes. The updated value is available from `e.target.value`.',
    type: '(e: ChangeEvent) => void'
  },
  onValueChange_Inputs_v2_v3: {
    name: 'onValueChange',
    description: 'Callback function triggered when the field value changes.',
    type: '(value: string, event: ChangeEvent) => void'
  },
  onValueChange_tagsInput_v2_v3: {
    name: 'onValueChange',
    description: 'Callback function that returns the updated list of tags.',
    type: '(tags: string[]) => void'
  },
  onValueChange_FileUploader_v2_v3: {
    name: 'onValueChange',
    description: 'An optional callback function that returns the file(s) uploaded in the file uploader component.',
    type: '(files: File / File[] / null) => void'
  },
  onValueChange_Select_v1: {
    name: 'onValueChange',
    description:
      'Callback function triggered when the selected value changes. The updated value is available from `e.target.value`.',
    type: '(e: SelectChangeEvent) => void'
  },
  onValueChange_Select_v2_v3: {
    name: 'onValueChange',
    description:
      'Callback function triggered when an option is selected. The updated value is available from the `newValue` argument.',
    type: '(newValue, event, child) => void'
  },
  onValueChange_NativeSelect_v2_v3: {
    name: 'onValueChange',
    description:
      'Callback function triggered when an option is selected. The updated value is available from the `newValue` argument.',
    type: '(newValue, event) => void'
  },
  onValueChange_Autocomplete_v2_v3: {
    name: 'onValueChange',
    description:
      'Callback function triggered when the autocomplete value changes. The updated value is available from `newValue`, and the selected option details are available from `details`.',
    type: '(newValue, event, reason, details) => void'
  },
  onValueChange_AutocompleteObject_v3: {
    name: 'onValueChange',
    description:
      'Callback function that returns the selected object option(s) in `newValue`. The selected option details are available from `details`.',
    type: '(newValue, event, reason, details) => void'
  },
  onValueChange_MultiAutocomplete_v2_v3: {
    name: 'onValueChange',
    description:
      'Callback function that returns the updated field value and the value of the selected item.',
    type: '(fieldValue: string[], targetValue?: string) => void'
  },
  onValueChange_MultiAutocompleteObject_v3: {
    name: 'onValueChange',
    description:
      'Callback function that returns the selected object options in `newValue`. The **Select All** option is not included in the final form value.',
    type: '(newValue, event, reason, details?) => void'
  },
  onValueChange_CountrySelect_v2_v3: {
    name: 'onValueChange',
    description:
      'Returns **newValue** as `CountryDetails` or `CountryDetails[]` based on the `multiple` prop. Returns `null` if no selection has been made.',
    type: '(newValue, event, reason, details?) => void '
  },
  onValueChange_Checkbox_v1: {
    name: 'onValueChange',
    description:
      'Callback function triggered when the checkbox state changes. The checked state is available from `e.target.checked`.',
    type: '(e: ChangeEvent) => void'
  },
  onValueChange_Checkbox_v2_v3: {
    name: 'onValueChange',
    description:
      'Callback function triggered when the checkbox state changes.',
    type: '(isChecked: boolean, e: ChangeEvent) => void'
  },
  onValueChange_Switch_v2_v3: {
    name: 'onValueChange',
    description:
      'Callback function triggered when the switch is toggled. Returns whether the switch is on or off.',
    type: '(isChecked: boolean, e: ChangeEvent) => void'
  },
  onValueChange_CheckboxGroup_v1: {
    name: 'onValueChange',
    description:
      'Callback function triggered when a checkbox option is selected.',
    type: '(e: ChangeEvent<HTMLInputElement>, newValue: string) => void'
  },
  onValueChange_CheckboxGroup_v2_v3: {
    name: 'onValueChange',
    description:
      'Callback function triggered when a checkbox option changes. `selectedItemValue` is the toggled option value, and `value` is the updated field value.',
    type: '(selectedItemValue, value, event) => void'
  },
  onValueChange_RadioGroup_v2_v3: {
    name: 'onValueChange',
    description:
      'Callback function triggered when a radio option is selected.',
    type: '(selectedItemValue, event) => void'
  },
  onValueChange_Slider_v2_v3: {
    name: 'onValueChange',
    description:
      'Callback function triggered when the slider value changes.',
    type: '(value: number / number[], activeThumb: number, event) => void'
  },
  onValueChange_Slider_v1: {
    name: 'onValueChange',
    description:
      'Callback function triggered when the slider value changes.',
    type: '(event: Event, value: number / number[], activeThumb: number) => void'
  },
  onValueChange_Rating_v1: {
    name: 'onValueChange',
    description:
      'Callback function triggered when the rating value changes.',
    type: '(e: SyntheticEvent, newValue: number / null) => void'
  },
  onValueChange_Rating_v2_v3: {
    name: 'onValueChange',
    description:
      'Callback function triggered when the rating value changes.',
    type: '(newValue: number / null, event) => void'
  },
  onValueChange_Pickers_v1: {
    name: 'onValueChange',
    description:
      'Callback function triggered when the selected date or time value changes.',
    type: '(newValue: unknown) => void'
  },
  onValueChange_DatePicker_v2_v3: {
    name: 'onValueChange',
    description: 'An optional callback function that returns the selected date as per the specified `dateAdapter`.',
    type: '(newValue: PickerValidDate / null, dateContext) => void'
  },
  onValueChange_TimePicker_v2_v3: {
    name: 'onValueChange',
    description: 'An optional callback function that returns the selected time as per the specified `dateAdapter`.',
    type: '(newValue: PickerValidDate / null, timeContext) => void'
  },
  onValueChange_DateTimePicker_v2_v3: {
    name: 'onValueChange',
    description: 'An optional callback function that returns the selected dateTime as per the specified `dateAdapter`.',
    type: '(newValue: PickerValidDate / null, dateTimeContext) => void'
  },
  onValueChange_ColorPicker_v1: {
    name: 'onValueChange',
    description:
      'Callback function that returns the selected color. Call `setValue` with the preferred color format to update the form state.',
    type: '(color: IColor) => void',
    required: true
  },
  onValueChange_RichTextEditor_v1: {
    name: 'onValueChange',
    description:
      'Callback function that returns the editor event, updated editor value, and editor instance.',
    type: '(event: EventInfo, newValue: string, editor: ClassicEditor) => void'
  },
  onValueChange_RichTextEditor_v2_v3: {
    name: 'onValueChange',
    description:
      'Callback function returning the editor value, `event` object and editor details.',
    type: '(newValue: string, event: EventInfo, editor: ClassicEditor) => void'
  },
  onValueChange_PhoneInput_v2_v3: {
    name: 'onValueChange',
    description:
      'Callback function to get details of input phone number, including the country details.',
    type: '({ phone: string, inputValue: string, country: ParsedCountry }) => void'
  },
  value_ColorPicker_v2_v3: {
    name: 'value',
    description:
      'Selected color value for `RHFColorPicker`. Use `getValues("fieldName")` to sync it with the form value. If not provided, `defaultColor` is used.',
    type: 'string',
    required: true
  },
  value_ColorPicker_v1: {
    name: 'value',
    description:
      'Selected color value for `RHFColorPicker`. Use `getValues("fieldName")` to sync it with the form value. Defaults to black (`#000000`).',
    type: 'string'
  },
  value_RichTextEditor: {
    name: 'value',
    description:
      'Content rendered in the Rich Text Editor. It can be plain text or an HTML string.',
    type: 'string'
  },
  value_PhoneInput: {
    name: 'value',
    description: 'Pass `getValues(fieldName)` to synchronize the value argument in the `usePhoneInput` hook with the form field\'s actual value.',
    type: 'string / undefined',
    required: true
  },
  defaultValue_Slider: {
    name: 'defaultValue',
    description: 'Initial value for `RHFSlider`.',
    type: 'number / number[]',
    required: true
  },
  accept_v2: {
    name: 'accept',
    description:
      'The file types to accept in the file uploader component.  Eg: `image/*` or `.pdf,.docx`.',
    required: true,
    type: 'string'
  },
  maxFiles_v2_v3: {
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
  hideFileList: {
    name: 'hideFileList',
    description: 'Hide the list of files uploaded in the file uploader component.',
    type: 'boolean'
  },
  renderUploadButton_v2_v3: ({ docsVersion }: PropsDescriptionArgs) => ({
    name: 'renderUploadButton',
    description:
      `Custom render function to replace the default upload button in the file uploader component. Refer to the [example](/${docsVersion ? `v${docsVersion}/` : ''}components/mui/RHFFileUploader#advanced-usage) for more details.`,
    type: '(fileInput: ReactNode) => ReactNode'
  }),
  renderFileItem_v2_v3: ({ docsVersion }: PropsDescriptionArgs) => ({
    name: 'renderFileItem',
    description:
      `Custom render function to replace the default file item in the file uploader component. Refer to the [example](/${docsVersion ? `v${docsVersion}/` : ''}components/mui/RHFFileUploader#advanced-usage) for more details.`,
    type: '(file: File, index: number) => ReactNode'
  }),
  onUploadError_v2_v3: {
    name: 'onUploadError',
    description: 'Callback function that returns the error message and rejected files when uploaded files fail the validation during upload.',
    type: '(errors: FileUploadError[], rejectedFiles: File[]) => void'
  },
  valueKey_CountrySelect_v2_v3: {
    name: 'valueKey',
    description: 'The key to select from each option when returning the value(s) from the selected option. Country `iso` is the returned by default.',
    type: '`name` / `iso` / `iso3`',
  },
});

export default LegacyPropsDescription;
