/* eslint-disable no-useless-escape */

/**
 * Shared prop descriptions for every component's props table, ensuring
 * consistency and easier maintenance across releases (v1 → v2 / MUI 9).
 * These are the props description for the latest version.
 *
 * Conventions:
 * - Base keys hold descriptions shared verbatim across components.
 * - `_Suffix` variants (e.g. `onValueChange_Select`) hold per-component
 *   implementations when the signature or behavior differs.
 * - Props unique to a single component are declared inline in that
 *   component's file under `props-table/(mui|mui-pickers|misc)`.
 *
 * `description` / `type` strings support inline markdown: `` `code` `` spans
 * and `[label](url)` links, rendered by the docs `PropsTable` component.
 */

import type { PropsInfo, PropsDescriptionArgs } from '@/types';
import { getMuiDocsUrl, getMuiPickersDocsUrl } from '@/utils';

export const PropsDescription = Object.freeze({
  /* ------------------------------------------------------------------ */
  /* Identity & value contract                                          */
  /* ------------------------------------------------------------------ */
  fieldName: {
    name: 'fieldName',
    description:
      'Name/path of the field. Used to derive the `id`, the default label, and the `name` attribute. This prop is required for all components.',
    required: true,
    type: 'string'
  },
  fieldName_NoName: {
    name: 'fieldName',
    description:
      'Name/path of the field. Used to derive generated ids and the default label.',
    required: true,
    type: 'string'
  },
  value_Input: {
    name: 'value',
    description:
      'Current value of the field. This is a controlled component — `value` and `onValueChange` must be supplied together, typically backed by your own state or form library. `undefined`/`null` are treated as an empty string.',
    type: 'string | null'
  },
  value_NumberInput: {
    name: 'value',
    description:
      'Current numeric value of the field. `undefined`/`null` render an empty input.',
    type: 'number | null'
  },
  value_TagsInput: {
    name: 'value',
    description:
      'Current tags of the field. `undefined`/`null` are treated as an empty tag list.',
    type: 'string[] | null'
  },
  value_FileUploader: {
    name: 'value',
    description:
      'Currently selected file(s). `undefined`/`null` are treated as no files selected.',
    type: 'File | File[] | null'
  },
  value_Select: {
    name: 'value',
    description:
      'Current select value, normalized with `valueKey` for object options. Pass an array when `multiple` is true.',
    type: 'string | number | (string | number)[] | null'
  },
  value_NativeSelect: {
    name: 'value',
    description:
      'Current select value, normalized with `valueKey` for object options.',
    type: 'string | number | null'
  },
  value_Autocomplete: {
    name: 'value',
    description:
      'Currently selected value(s): `string[]` when `multiple` is true, otherwise a `string` (normalized with `valueKey` for object options). A cleared single selection emits `null` (unless `disableClearable`); a cleared multi-selection emits `[]`, never `null`.',
    type: 'string | string[] | null'
  },
  value_AutocompleteObject: {
    name: 'value',
    description:
      'Currently selected option object(s): `Option[]` when `multiple` is true, otherwise a single `Option`. A cleared single selection emits `null` (unless `disableClearable`); a cleared multi-selection emits `[]`, never `null`.',
    type: 'Option | Option[] | null'
  },
  value_MultiAutocomplete: {
    name: 'value',
    description:
      'Currently selected string values (normalized with `valueKey` for object options). Always an array — `undefined` or `[]` is an empty selection, and clearing emits `[]` rather than `null`.',
    type: 'string[]'
  },
  value_MultiAutocompleteObject: {
    name: 'value',
    description:
      'Currently selected option objects. Always an array — `undefined` or `[]` is an empty selection, and clearing emits `[]` rather than `null`.',
    type: 'Option[]'
  },
  value_CountrySelect: {
    name: 'value',
    description:
      'Currently selected country value(s): complete `CountryDetails` object(s), or the property named by `valueKey` when provided. Pass an array when `multiple` is true. A cleared single selection emits `null` (unless `disableClearable`); a cleared multi-selection emits `[]`, never `null`.',
    type: 'CountryDetails | CountryDetails[keyof CountryDetails] | array | null'
  },
  value_Cbx_Switch: {
    name: 'value',
    description:
      'Current checked state. `undefined`/`false` are treated as unchecked.',
    type: 'boolean'
  },
  value_CheckboxGroup: {
    name: 'value',
    description:
      'Currently checked option values. `undefined`/`[]` is treated as an empty selection.',
    type: 'string[] | number[]'
  },
  value_RadioGroup: {
    name: 'value',
    description:
      'Currently selected option value, normalized with `valueKey` for object options. `undefined`/`null` are treated as no selection.',
    type: 'string | number | null'
  },
  value_Rating: {
    name: 'value',
    description:
      'Current rating value. `undefined`/`null` are treated as no rating selected.',
    type: 'number | null'
  },
  value_Slider: {
    name: 'value',
    description:
      'Current slider value. Pass a number array for range sliders. `undefined`/`null` are treated as `0`.',
    type: 'number | number[] | null'
  },
  value_Picker: {
    name: 'value',
    description:
      'Current picker value in the configured date library format. Pass `null` or `undefined` to clear the picker.',
    type: 'PickerValidDate | null'
  },
  value_ColorPicker: {
    name: 'value',
    description:
      'Current color value. When empty, `defaultColor` is used as the initial picker state.',
    type: 'string | null'
  },
  value_RichTextEditor: {
    name: 'value',
    description: 'Current editor HTML string.',
    type: 'string | null'
  },
  value_PhoneInput: {
    name: 'value',
    description:
      'Current phone value. May be initialized with a phone string, but `onValueChange` always emits the structured `MUIPhoneInputValue` shape.',
    type: 'MUIPhoneInputValue | string | null'
  },

  /* ------------------------------------------------------------------ */
  /* onValueChange variants                                             */
  /* ------------------------------------------------------------------ */
  onValueChange_Inputs: {
    name: 'onValueChange',
    description:
      'Called on every input change with the next string value and the original change event. Call your state setter (or form library\'s setter) with `newValue` to update `value`.',
    required: true,
    type: '({ newValue, event }) => void'
  },
  onValueChange_NumberInput: {
    name: 'onValueChange',
    description:
      'Called on every accepted numeric change. `newValue` is `null` when the input is cleared.',
    required: true,
    type: '({ newValue, event }) => void'
  },
  onValueChange_TagsInput: {
    name: 'onValueChange',
    description:
      'Called with the next tag array after tags are added or removed.',
    required: true,
    type: '({ newValue }) => void'
  },
  onValueChange_FileUploader: {
    name: 'onValueChange',
    description:
      'Called with the accepted file value after every upload, removal, or clear action — `File`, `File[]`, or `null` when cleared.',
    required: true,
    type: '({ newValue, event }) => void'
  },
  onValueChange_Select: {
    name: 'onValueChange',
    description:
      'Called after the selected value is normalized using `valueKey` for object options. `child` is the selected option element provided by MUI Select.',
    required: true,
    type: '({ newValue, event, child }) => void'
  },
  onValueChange_NativeSelect: {
    name: 'onValueChange',
    description:
      'Called after the selected value is normalized using `valueKey` for object options.',
    required: true,
    type: '({ newValue, event }) => void'
  },
  onValueChange_Autocomplete: {
    name: 'onValueChange',
    description:
      'Called on every selection change with the normalized value and the raw MUI selection metadata. `newValue` is `string[]` when `multiple` is true, otherwise `string`, and includes `null` only when clearing is allowed.',
    required: true,
    type: '({ newValue, selectedOption, event, reason, details }) => void'
  },
  onValueChange_AutocompleteObject: {
    name: 'onValueChange',
    description:
      'Called on every selection change with the selected object value(s) from MUI, without reducing them to `valueKey`.',
    required: true,
    type: '({ newValue, event, reason, details }) => void'
  },
  onValueChange_MultiAutocomplete: {
    name: 'onValueChange',
    description:
      'Called on every selection change with the next string array and the option value that triggered the change (or the select-all sentinel).',
    required: true,
    type: '({ newValue, selectedOption }) => void'
  },
  onValueChange_MultiAutocompleteObject: {
    name: 'onValueChange',
    description:
      'Called on every selection change with the next selected object array and the option that triggered the change (or the select-all sentinel).',
    required: true,
    type: '({ newValue, selectedOption }) => void'
  },
  onValueChange_CountrySelect: {
    name: 'onValueChange',
    description:
      'Called on every selection change with the normalized country value and the raw MUI Autocomplete change metadata.',
    required: true,
    type: '({ newValue, event, reason, details }) => void'
  },
  onValueChange_Cbx_Switch: {
    name: 'onValueChange',
    description:
      'Called on every toggle with the next checked state and the original change event.',
    required: true,
    type: '({ newValue, event }) => void'
  },
  onValueChange_CheckboxGroup: {
    name: 'onValueChange',
    description:
      'Called on every toggle with the next array of checked option values, the toggled option, its next checked state, and the original change event.',
    required: true,
    type: '({ newValue, toggledValue, checked, event }) => void'
  },
  onValueChange_RadioGroup: {
    name: 'onValueChange',
    description:
      'Called on every selection with the normalized option value and the original change event.',
    required: true,
    type: '({ newValue, event }) => void'
  },
  onValueChange_Rating: {
    name: 'onValueChange',
    description:
      'Called on every rating change. `newValue` is `null` when the rating is cleared.',
    required: true,
    type: '({ newValue, event }) => void'
  },
  onValueChange_Slider: {
    name: 'onValueChange',
    description:
      'Called on every slide with the next value, the active thumb index (for range sliders), and the original change event.',
    required: true,
    type: '({ newValue, activeThumb, event }) => void'
  },
  onValueChange_DatePicker: {
    name: 'onValueChange',
    description:
      'Called after the picker accepts a valid date value. `context.validationError` reports the MUI X validation status.',
    required: true,
    type: '({ newValue, context }) => void'
  },
  onValueChange_TimePicker: {
    name: 'onValueChange',
    description:
      'Called after the picker accepts a valid time value. `context.validationError` reports the MUI X validation status.',
    required: true,
    type: '({ newValue, context }) => void'
  },
  onValueChange_DateTimePicker: {
    name: 'onValueChange',
    description:
      'Called after the picker accepts a valid date-time value. `context.validationError` reports the MUI X validation status.',
    required: true,
    type: '({ newValue, context }) => void'
  },
  onValueChange_ColorPicker: {
    name: 'onValueChange',
    description:
      'Called with the formatted color value and raw `IColor` object whenever the picker changes. Use `setColor` to update the internal picker state.',
    required: true,
    type: '({ color, colorValue, setColor }) => void'
  },
  onValueChange_RichTextEditor: {
    name: 'onValueChange',
    description:
      'Called when CKEditor content changes, with the updated HTML string, change event, and editor instance.',
    required: true,
    type: '({ newValue, event, editor }) => void'
  },
  onValueChange_PhoneInput: {
    name: 'onValueChange',
    description:
      'Called after the phone value is normalized to the structured `MUIPhoneInputValue` shape, along with the raw payload from `react-international-phone`.',
    required: true,
    type: '({ newValue, phoneData }) => void'
  },

  /* ------------------------------------------------------------------ */
  /* Labels                                                             */
  /* ------------------------------------------------------------------ */
  label: {
    name: 'label',
    description: 'Label displayed for the field. Defaults to a human-readable label derived from `fieldName`, e.g. `firstName` becomes "**First Name**".',
    type: 'ReactNode'
  },
  hideLabel: {
    name: 'hideLabel',
    description:
      'When true, hides the rendered field label while preserving accessible labeling where possible.',
    type: 'boolean'
  },
  showLabelAboveFormField: (args: PropsDescriptionArgs) => ({
    name: 'showLabelAboveFormField',
    description: `When true, renders the field label above the form field in the [FormLabel](${getMuiDocsUrl(args.muiVersion)}/api/form-label/) component, instead of inside or beside it.`,
    type: 'boolean'
  }),
  showLabelAboveFormField_Default: {
    name: 'showLabelAboveFormField',
    description:
      'Whether the field label renders above the control. This control has no built-in inline label, so it defaults to `true`; pass `false` to hide the visible label (the accessible name is still applied).\n\n**Default:** `true`',
    type: 'boolean'
  },
  formLabelProps: (args: PropsDescriptionArgs) => ({
    name: 'formLabelProps',
    description: `[FormLabelProps](${getMuiDocsUrl(args.muiVersion)}/api/form-label/) forwarded to the internal \`FormLabel\`. The \`id\` is managed by the component. Multiple fields can be configured using the \`ConfigProvider\` component.`,
    type: `[FormLabelProps](${getMuiDocsUrl(args.muiVersion)}/api/form-label/)`,
    hasLinkInType: true
  }),
  formControlLabelProps: (args: PropsDescriptionArgs) => ({
    name: 'formControlLabelProps',
    description: `[FormControlLabelProps](${getMuiDocsUrl(args.muiVersion)}/api/form-control-label/) forwarded to the internal \`FormControlLabel\`. Multiple fields can be configured using the \`ConfigProvider\` component.`,
    type: `[FormControlLabelProps](${getMuiDocsUrl(args.muiVersion)}/api/form-control-label/)`,
    hasLinkInType: true
  }),

  /* ------------------------------------------------------------------ */
  /* Errors & helper text                                               */
  /* ------------------------------------------------------------------ */
  errorMessage: {
    name: 'errorMessage',
    description:
      'Validation error for the field — pass a single message `string`, or a `string[]` when the field can fail multiple rules at once (every message is shown together). A non-empty string or array puts the field in an error state; `undefined`/`\'\'`/`[]` clear it. Normalize your form library\'s error shape to this at the call site (e.g. an RHF `FieldError` via its `.message`). Use `renderError` to customize how the message(s) are rendered.',
    type: 'string \| string[]'
  },
  renderError: {
    name: 'renderError',
    description:
      'Custom renderer for the resolved error message(s), called only when the field is in an error state. Always receives a `string[]` — use `errors[0]` for the common single-message case, or map over `errors` when a field fails several rules. By default a single message renders as text and multiple messages render on separate lines.',
    type: '(errors: string[]) => ReactNode'
  },
  hideErrorMessage: {
    name: 'hideErrorMessage',
    description:
      'If true, hides the error message text while keeping the field in an error state.',
    type: 'boolean'
  },
  helperText: (args: PropsDescriptionArgs) => ({
    name: 'helperText',
    description: `Content displayed in the [FormHelperText](${getMuiDocsUrl(args.muiVersion)}/api/form-helper-text/) component below the field when there is no visible validation error.`,
    type: 'ReactNode'
  }),
  formHelperTextProps: (args: PropsDescriptionArgs) => ({
    name: 'formHelperTextProps',
    description: `[FormHelperTextProps](${getMuiDocsUrl(args.muiVersion)}/api/form-helper-text/) forwarded to the internal \`FormHelperText\`. The \`id\` is managed by the component. Multiple fields can be configured using the \`ConfigProvider\` component.`,
    type: `[FormHelperTextProps](${getMuiDocsUrl(args.muiVersion)}/api/form-helper-text/)`,
    hasLinkInType: true
  }),

  /* ------------------------------------------------------------------ */
  /* Password, Number, Tags & File Input fields                         */
  /* ------------------------------------------------------------------ */
  showPasswordIcon: {
    name: 'showPasswordIcon',
    description:
      'Custom icon displayed when the password is currently hidden. Clicking it reveals the password value.\n\n**Default:** `<VisibilityIcon />`',
    type: 'ReactNode'
  },
  hidePasswordIcon: {
    name: 'hidePasswordIcon',
    description:
      'Custom icon displayed when the password is currently visible. Clicking it hides the password value.\n\n**Default:** `<VisibilityOffIcon />`',
    type: 'ReactNode'
  },
  readOnly_PasswordInput: {
    name: 'readOnly',
    description:
      'When true, the value is displayed but cannot be edited. Unlike `disabled`, the field stays focusable, and the show/hide toggle remains usable — a read-only value is meaningful, so the user can still reveal it to verify it.',
    type: 'boolean'
  },
  nonNegative: {
    name: 'nonNegative',
    description: 'When true, negative values cannot be entered.',
    type: 'boolean'
  },
  onlyIntegers: {
    name: 'onlyIntegers',
    description:
      'When true, decimal input is not allowed. Cannot be combined with `maxDecimalPlaces`.',
    type: 'boolean'
  },
  maxDecimalPlaces: {
    name: 'maxDecimalPlaces',
    description:
      'Maximum number of decimal places accepted while typing.',
    type: 'number'
  },
  stepAmount: {
    name: 'stepAmount',
    description:
      'Amount the value changes on Arrow Up/Down key presses.',
    type: 'number'
  },
  showMarkers: {
    name: 'showMarkers',
    description:
      'When true, shows increment/decrement markers on the input.',
    type: 'boolean'
  },
  onTagAdd: {
    name: 'onTagAdd',
    description:
      'Called before a tag is added. Return `false` to block the tag, a replacement string to transform it, or nothing to allow it unchanged.',
    type: '({ currentValue, newTag }) => boolean | string | void'
  },
  onTagDelete: {
    name: 'onTagDelete',
    description:
      'Called before a tag is removed. Return `false` to prevent deletion.',
    type: '({ currentValue, deletedTag }) => boolean | void'
  },
  onTagPaste: {
    name: 'onTagPaste',
    description:
      'Called when tags are pasted. Return `false` to reject all, a `string[]` to replace the parsed tags, or nothing to use them unchanged. Tags are split by `delimiter`, trimmed, and deduplicated before this callback.',
    type: '({ currentValue, pastedTags }) => string[] | boolean | void'
  },
  delimiter: {
    name: 'delimiter',
    description:
      'Character used to separate tags when typing or pasting. Pressing this key commits the current input as one or more tags.\n\n**Default:** `\',\'`',
    type: 'string'
  },
  maxTags_TagsInput: {
    name: 'maxTags',
    description:
      'Maximum number of tags that can be added. Keyboard entries beyond the limit are ignored; pasted tags are truncated to fit.',
    type: 'number'
  },
  limitTags_TagsInput: {
    name: 'limitTags',
    description:
      'Maximum number of tags shown when the input is not focused. Set to `-1` to always show all tags.\n\n**Default:** `2`',
    type: 'number'
  },
  renderTagLabel: {
    name: 'renderTagLabel',
    description:
      'Custom renderer for each visible tag label. Receives the tag value and returns the content displayed inside the chip.',
    type: '(tag: string) => ReactNode'
  },
  accept: {
    name: 'accept',
    description:
      'Comma-separated list of accepted file types, e.g. `image/*` or `.pdf,.doc,.docx`.',
    type: 'string'
  },
  multiple_FileUploader: {
    name: 'multiple',
    description: 'When true, allows selecting multiple files.',
    type: 'boolean'
  },
  maxSize: {
    name: 'maxSize',
    description:
      'Maximum file size (in bytes) eligible for upload. Larger files are rejected and reported through `onUploadError`.',
    type: 'number'
  },
  maxFiles: {
    name: 'maxFiles',
    description:
      'Maximum number of files that can be uploaded. Excess files are rejected and reported through `onUploadError`. Files in `existingFiles` count against the limit.',
    type: 'number'
  },
  onUploadError: {
    name: 'onUploadError',
    description:
      'Callback fired when uploaded files fail type, size, or count validation.',
    type: '(errors: FileUploadErrorDetails[]) => void'
  },
  dropZoneProps: {
    name: 'dropZoneProps',
    description:
      'Props applied to the drag-and-drop wrapper `Box`. Pass an object, or a callback receiving `{ isDragging, disabled, error }`. Ignored when `disableDragAndDrop` is true.',
    type: 'BoxProps | (state) => BoxProps'
  },
  disableDragAndDrop: {
    name: 'disableDragAndDrop',
    description:
      'Disable drag-and-drop and only allow file selection via the upload button.\n\n**Default:** `false`',
    type: 'boolean'
  },
  renderUploadButton: {
    name: 'renderUploadButton',
    description:
      'Custom upload button renderer. Receives the hidden file input as children/content.',
    type: '(fileInput: ReactNode) => ReactNode'
  },
  existingFiles: {
    name: 'existingFiles',
    description:
      'Pre-existing server-side files, displayed separately from new uploads via `renderExistingFileItem`.',
    type: 'ExistingUploadedFile[]'
  },
  renderExistingFileIte: {
    name: 'renderExistingFileItem',
    description:
      'Custom renderer for each file passed through `existingFiles`. These files are not part of `value` and are not removed automatically.',
    type: '({ file, index }) => ReactNode'
  },
  renderFileItem: {
    name: 'renderFileItem',
    description:
      'Custom renderer for each newly selected file. Call the provided `removeFile(event)` from your remove button to delete the file from the value.',
    type: '({ file, index, removeFile }) => ReactNode'
  },
  existingFileListProps: {
    name: 'existingFileListProps',
    description: 'Props applied to the wrapper Box containing existing files.',
    type: 'BoxProps'
  },
  uploadedFileListProps: {
    name: 'uploadedFileListProps',
    description: 'Props applied to the wrapper Box containing new uploads.',
    type: 'BoxProps'
  },
  inputRef_FileUploader: {
    name: 'inputRef',
    description: 'Ref for the hidden file `<input>` element.',
    type: 'Ref<HTMLInputElement>'
  },
  fullWidth_FileUploader: {
    name: 'fullWidth',
    description: 'When true, the component expands to fill its container width.\n\n**Default:** `false`',
    type: 'boolean'
  },

  /* ------------------------------------------------------------------ */
  /* Options-based fields                                               */
  /* ------------------------------------------------------------------ */
  options: {
    name: 'options',
    description:
      'An array with string, numeric or object values. Make sure to pass `labelKey` and `valueKey` when options is an array of objects.',
    type: 'string[] \| number[] \| object[]',
    required: true
  },
  options_StrOrObj: {
    name: 'options',
    description:
      'An array with string or object values. Make sure to pass `labelKey` and `valueKey` when options is an array of objects.',
    type: 'string[] \| object[]',
    required: true
  },
  options_Obj: {
    name: 'options',
    description:
      'An array of objects. `labelKey` and `valueKey` are required so the component knows which properties to use for the visible label and the stored value.',
    type: 'object[]',
    required: true
  },
  labelKey: {
    name: 'labelKey',
    description:
      'Property name used as the visible label for each option. Required when `options` is an array of objects.',
    type: 'string'
  },
  labelKey_Obj: {
    name: 'labelKey',
    description: 'Property name used as the visible label for each option.',
    type: 'string',
    required: true
  },
  valueKey: {
    name: 'valueKey',
    description:
      'Property name used to derive the exposed value for each option. Required when `options` is an array of objects.',
    type: 'string'
  },
  valueKey_Obj: {
    name: 'valueKey',
    description:
      'Property name used to compare options with the current value.',
    type: 'string',
    required: true
  },
  valueKey_CountrySelect: {
    name: 'valueKey',
    description:
      'When provided, selected value(s) are exposed using the specified country property; when omitted, complete country objects are used.',
    type: '`name` \| `iso` \| `iso3`'
  },
  valueKey_ColorPicker: {
    name: 'valueKey',
    description:
      'Color format emitted through `onValueChange`. `hex` emits the color hex string; other formats are converted to a CSS color string.\n\n**Default:** `\'hex\'`',
    type: 'hex \| rgb \| hsv'
  },
  renderOptionLabel: {
    name: 'renderOptionLabel',
    description:
      'Custom renderer for option labels. When not provided, the label is derived from the option value or the property specified by `labelKey`.',
    type: '(option) => ReactNode'
  },
  renderOptionLabel_MultiAutocomplete: {
    name: 'renderOptionLabel',
    description:
      'Render the option label content corresponding to each checkbox.',
    type: '(option, state) => ReactNode'
  },
  renderOptionLabel_CountrySelect: {
    name: 'renderOptionLabel',
    description:
      'Custom renderer for each country option in the dropdown. Receives the country object and should return the label/content to render.',
    type: '(option: CountryDetails) => ReactNode'
  },
  getOptionDisabled: {
    name: 'getOptionDisabled',
    description:
      'Function used to determine whether an option should be disabled. Return `true` to disable the option and prevent it from being selected.',
    type: '(option) => boolean'
  },

  /* ------------------------------------------------------------------ */
  /* Autocomplete family                                                */
  /* ------------------------------------------------------------------ */
  multiple: {
    name: 'multiple',
    description: 'When true, allows selecting multiple values.',
    type: 'boolean'
  },
  disableClearable: {
    name: 'disableClearable',
    description:
      'When true, the selected value cannot be cleared from the input.\n\n**Default:** `false`',
    type: 'boolean'
  },
  freeSolo: {
    name: 'freeSolo',
    description:
      'When true, the user may type any value not present in `options`. The typed string is passed to `onValueChange` as-is.',
    type: 'boolean'
  },
  freeSolo_MultiAutocomplete: {
    name: 'freeSolo',
    description:
      'When true, the user may type any value not present in `options`. Not compatible with `selectAllText` — enabling it hides the "**Select All**" option.',
    type: 'boolean'
  },
  countries: {
    name: 'countries',
    description:
      'List of countries to display in the country selector. Defaults to all countries from `countryList`.',
    type: 'CountryDetails[]'
  },
  preferredCountries: {
    name: 'preferredCountries',
    description:
      'Country ISO codes pinned at the top of the dropdown, in the provided order.',
    type: 'CountryISO[]'
  },
  selectAllText: {
    name: 'selectAllText',
    description: 'Text to display for the "**Select All**" option.\n\n**Default:** `\'Select All\'`',
    type: 'string'
  },
  hideSelectAllOption: {
    name: 'hideSelectAllOption',
    description: 'When true, hides the select-all option.',
    type: 'boolean'
  },
  limitTags: {
    name: 'limitTags',
    description:
      'Maximum number of selected values shown as chips when the input is not focused. Set `-1` to disable the limit.\n\n**Default:** `2`',
    type: 'number'
  },
  getLimitTagsText: {
    name: 'getLimitTagsText',
    description:
      'Custom label rendered for the hidden selections counter. Receives the number of hidden values.',
    type: '(more: number) => ReactNode'
  },
  textFieldProps: (args: PropsDescriptionArgs) => ({
    name: 'textFieldProps',
    description: `[TextFieldProps](${getMuiDocsUrl(args.muiVersion)}/api/text-field/) forwarded to the internal MUI \`TextField\`.`,
    type: `[TextFieldProps](${getMuiDocsUrl(args.muiVersion)}/api/text-field/)`,
    hasLinkInType: true
  }),
  ChipProps: (args: PropsDescriptionArgs) => ({
    name: 'ChipProps',
    description: `[ChipProps](${getMuiDocsUrl(args.muiVersion)}/api/chip/) forwarded to chips rendered for selected values.`,
    type: `[ChipProps](${getMuiDocsUrl(args.muiVersion)}/api/chip/)`,
    hasLinkInType: true
  }),
  ref_Autocomplete: {
    name: 'ref',
    description:
      'Forwarded ref for the underlying MUI `TextField`\'s input element — use it to imperatively focus the field or read its DOM node.',
    type: 'Ref<HTMLInputElement>'
  },
  checkboxProps: (args: PropsDescriptionArgs) => ({
    name: 'checkboxProps',
    description: `[CheckboxProps](${getMuiDocsUrl(args.muiVersion)}/api/checkbox/) passed down to each Checkbox component — custom color, size, etc.`,
    type: `[CheckboxProps](${getMuiDocsUrl(args.muiVersion)}/api/checkbox/)`,
    hasLinkInType: true
  }),
  radioProps: (args: PropsDescriptionArgs) => ({
    name: 'radioProps',
    description: `[RadioProps](${getMuiDocsUrl(args.muiVersion)}/api/radio/) passed down to each Radio component — custom color, size, etc.`,
    type: `[RadioProps](${getMuiDocsUrl(args.muiVersion)}/api/radio/)`,
    hasLinkInType: true
  }),
  menuItemProps: (args: PropsDescriptionArgs) => ({
    name: 'menuItemProps',
    description: `[MenuItemProps](${getMuiDocsUrl(args.muiVersion)}/api/menu-item/) forwarded to every rendered option's \`MenuItem\` — custom \`dense\`, \`divider\`, \`sx\`, etc. \`key\`, \`value\`, \`disabled\` and \`children\` are controlled by the component.\n\n**Added in** \`v2\`.`,
    type: `[MenuItemProps](${getMuiDocsUrl(args.muiVersion)}/api/menu-item/)`,
    hasLinkInType: true
  }),
  inputLabelProps: (args: PropsDescriptionArgs) => ({
    name: 'inputLabelProps',
    description: `[InputLabelProps](${getMuiDocsUrl(args.muiVersion)}/api/input-label/) forwarded to the internal \`InputLabel\` — the inline label shown inside the field's outline. \`id\`, \`htmlFor\`, \`shrink\`, \`disabled\` and \`children\` are controlled by the component.\n\n**Added in** \`v2\`.`,
    type: `[InputLabelProps](${getMuiDocsUrl(args.muiVersion)}/api/input-label/)`,
    hasLinkInType: true
  }),
  iconButtonProps: (args: PropsDescriptionArgs) => ({
    name: 'iconButtonProps',
    description: `[IconButtonProps](${getMuiDocsUrl(args.muiVersion)}/api/icon-button/) forwarded to the internal show/hide toggle \`IconButton\` — custom \`size\`, \`sx\`, etc. The interaction/accessibility essentials (\`type\`, \`onClick\`, \`onMouseDown\`, \`edge\`, \`disabled\`, \`aria-label\`) are controlled by the component.\n\n**Added in** \`v2\`.`,
    type: `[IconButtonProps](${getMuiDocsUrl(args.muiVersion)}/api/icon-button/)`,
    hasLinkInType: true
  }),
  circularProgressProps: (args: PropsDescriptionArgs) => ({
    name: 'circularProgressProps',
    description: `[CircularProgressProps](${getMuiDocsUrl(args.muiVersion)}/api/circular-progress/) forwarded to the loading spinner shown while \`loading\` is true — custom \`color\`, \`size\`, etc.\n\n**Added in** \`v2\`.`,
    type: `[CircularProgressProps](${getMuiDocsUrl(args.muiVersion)}/api/circular-progress/)`,
    hasLinkInType: true
  }),

  /* ------------------------------------------------------------------ */
  /* Misc shared                                                        */
  /* ------------------------------------------------------------------ */
  required: {
    name: 'required',
    description:
      'Indicates that the field is mandatory by adding an asterisk symbol (*) to the form label and setting the relevant accessibility attributes.',
    type: 'boolean'
  },
  disabled: {
    name: 'disabled',
    description: 'When true, disables the field and associated controls.',
    type: 'boolean'
  },
  customIds: {
    name: 'customIds',
    description:
      'Overrides the default **field**, **label**, **helper text**, and **error** IDs used for accessibility.',
    type: '{ field, label, helperText, error }'
  },
  placeholder_Select: {
    name: 'placeholder',
    description:
      'Placeholder text displayed in the select input itself when no option is selected (not rendered as a selectable menu item).',
    type: 'string'
  },
  showDefaultOption: {
    name: 'showDefaultOption',
    description:
      'When true, displays a default placeholder option at the top of the dropdown menu. The option uses an empty string as its value and is automatically disabled when the field is required.\n\n**Default:** `false`',
    type: 'boolean'
  },
  defaultOptionText: {
    name: 'defaultOptionText',
    description:
      'Custom text displayed for the default option when `showDefaultOption` is enabled.\n\n**Default:** `Select ${fieldLabel}`',
    type: 'string'
  },

  /* ------------------------------------------------------------------ */
  /* Pickers                                                            */
  /* ------------------------------------------------------------------ */
  pickerSlotProps: (args: PropsDescriptionArgs) => ({
    name: 'slotProps',
    description: `MUI X picker [slotProps](${getMuiPickersDocsUrl(args.muiXVersion)}/date-picker/). The \`textField\` slot is merged with the component's own id, error state, and aria attributes.`,
    type: 'object'
  }),

  /* ------------------------------------------------------------------ */
  /* Misc Components                                                    */
  /* ------------------------------------------------------------------ */
  defaultColor: {
    name: 'defaultColor',
    description: 'Initial color used by the picker when `value` is empty.\n\n**Default:** `\'#000000\'`',
    type: 'string'
  },
  excludeAlpha: {
    name: 'excludeAlpha',
    description: 'When true, omits alpha from emitted color values.',
    type: 'boolean'
  },
  height_ColorPicker: {
    name: 'height',
    description: 'Height, in pixels, of the color picker control.\n\n**Default:** `200`',
    type: 'number'
  },
  hideAlpha: {
    name: 'hideAlpha',
    description: 'When true, hides alpha controls in the color picker.',
    type: 'boolean'
  },
  hideInput_ColorPicker: {
    name: 'hideInput',
    description:
      'Hides picker input fields rendered by `react-color-palette`.',
    type: '(hex \| rgb \| hsv)[] | boolean'
  },
  editorConfig: {
    name: 'editorConfig',
    description:
      'CKEditor configuration passed to `ClassicEditor`. Defaults to this package\'s `DefaultEditorConfig`.',
    type: 'EditorConfig'
  },
  onReady_RichTextEditor: {
    name: 'onReady',
    description: 'Callback fired when the CKEditor instance is ready.',
    type: '(editor: ClassicEditor) => void'
  },
  onFocus_RichTextEditor: {
    name: 'onFocus',
    description: 'Callback fired when the CKEditor instance receives focus.',
    type: '(event, editor) => void'
  },
  onBlur_RichTextEditor: {
    name: 'onBlur',
    description: 'Callback fired when the CKEditor instance loses focus.',
    type: '(event, editor) => void'
  },
  onError_RichTextEditor: {
    name: 'onError',
    description:
      'Callback fired when CKEditor reports an initialization or runtime error.',
    type: '(error: Error, details) => void'
  },
  phoneInputProps: {
    name: 'phoneInputProps',
    description:
      'Configuration passed to `react-international-phone`\'s `usePhoneInput` hook — `defaultCountry`, `countries`, `preferredCountries`, `forceDialCode`, etc.',
    type: 'UsePhoneInputConfig'
  },
  searchCountryProps: {
    name: 'searchCountryProps',
    description:
        'Options for the inline country search field in the country dropdown — `allowCountrySearch`, `textFieldProps`, `renderCountryMenuItem`, `noCountryFoundText`, `menuItemProps` (forwarded to every country `MenuItem`, including the disabled "no results" item).\n\n`menuItemProps` **added in** `v2`. ',
    type: 'SearchCountryProps'
  },
  countrySelectProps: {
    name: 'countrySelectProps',
    description:
      'Props forwarded to the internal MUI `Select` that renders the flag/dial-code trigger and country dropdown — e.g. a custom `size` or `sx` (merged with the component\'s own). `value`, `defaultValue`, `onChange`, `onOpen`, `onClose`, `renderValue`, `MenuProps`, `disabled`, `children` and `ref` are controlled by the component.\n\n**Added in** `v2`.',
    type: 'CountrySelectProps'
  },
}) satisfies Record<string, PropsInfo | ((args: PropsDescriptionArgs) => PropsInfo)>;
