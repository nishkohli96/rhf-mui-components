import {
  MuiComponents,
  MuiPickersComponents,
  MiscComponents,
  type DocsVersion
} from '@/types';

const rootDir = '/components';
const muiPrefix = '/mui';
const muiPickersPrefix = '/mui-pickers';
const miscPrefix = '/misc';

/**
 * Doc-page route segment for each component — must match the app router
 * folder names under `src/app/components` exactly (each is `RHFXxx`,
 * mirroring the actual exported component name).
 */
const componentRoutes: Record<
  MuiComponents | MuiPickersComponents | MiscComponents,
  string
> = {
  [MuiComponents.TextField]: 'RHFTextfield',
  [MuiComponents.PasswordInput]: 'RHFPasswordInput',
  [MuiComponents.NumberInput]: 'RHFNumberInput',
  [MuiComponents.TagsInput]: 'RHFTagsInput',
  [MuiComponents.FileUploader]: 'RHFFileUploader',
  [MuiComponents.Select]: 'RHFSelect',
  [MuiComponents.NativeSelect]: 'RHFNativeSelect',
  [MuiComponents.Autocomplete]: 'RHFAutocomplete',
  [MuiComponents.AutocompleteObject]: 'RHFAutocompleteObject',
  [MuiComponents.MultiAutocomplete]: 'RHFMultiAutocomplete',
  [MuiComponents.MultiAutocompleteObject]: 'RHFMultiAutocompleteObject',
  [MuiComponents.CountrySelect]: 'RHFCountrySelect',
  [MuiComponents.Checkbox]: 'RHFCheckbox',
  [MuiComponents.CheckboxGroup]: 'RHFCheckboxGroup',
  [MuiComponents.RadioGroup]: 'RHFRadioGroup',
  [MuiComponents.Slider]: 'RHFSlider',
  [MuiComponents.Switch]: 'RHFSwitch',
  [MuiComponents.Rating]: 'RHFRating',
  [MuiPickersComponents.DatePicker]: 'RHFDatePicker',
  [MuiPickersComponents.TimePicker]: 'RHFTimePicker',
  [MuiPickersComponents.DateTimePicker]: 'RHFDateTimePicker',
  [MiscComponents.ColorPicker]: 'RHFColorPicker',
  [MiscComponents.RichTextEditor]: 'RHFRichTextEditor',
  [MiscComponents.PhoneInput]: 'RHFPhoneInput'
};

/** Components added in v2 and before v3.3 */
export const newlyAddedComponents_v2 = [
  MuiComponents.Autocomplete,
  MuiComponents.MultiAutocomplete,
  MuiComponents.CountrySelect,
  MuiComponents.TagsInput,
  MiscComponents.PhoneInput,
  MuiComponents.NumberInput,
  MuiComponents.FileUploader
];

export const newlyAddedComponents_v3_3 = [
  MuiComponents.AutocompleteObject,
  MuiComponents.MultiAutocompleteObject
];

const muiComponents = [
  MuiComponents.TextField,
  MuiComponents.NumberInput,
  MuiComponents.PasswordInput,
  MuiComponents.TagsInput,
  MuiComponents.FileUploader,
  MuiComponents.Select,
  MuiComponents.NativeSelect,
  MuiComponents.Autocomplete,
  MuiComponents.AutocompleteObject,
  MuiComponents.CountrySelect,
  MuiComponents.MultiAutocomplete,
  MuiComponents.MultiAutocompleteObject,
  MuiComponents.Checkbox,
  MuiComponents.CheckboxGroup,
  MuiComponents.RadioGroup,
  MuiComponents.Slider,
  MuiComponents.Switch,
  MuiComponents.Rating
];

const muiPickersComponents = [
  MuiPickersComponents.DatePicker,
  MuiPickersComponents.TimePicker,
  MuiPickersComponents.DateTimePicker
];

const miscComponents = [
  MiscComponents.ColorPicker,
  MiscComponents.RichTextEditor,
  MiscComponents.PhoneInput
];

export function getMuiFoldersList(docsVersion?: DocsVersion) {
  return muiComponents.map(component => ({
    name: component,
    path: `${docsVersion ? `/v${docsVersion}` : ''}${rootDir}${muiPrefix}/${componentRoutes[component]}`
  }));
}

export function getMuiPickersFoldersList(docsVersion?: DocsVersion) {
  return muiPickersComponents.map(component => ({
    name: component,
    path: `${docsVersion ? `/v${docsVersion}` : ''}${rootDir}${muiPickersPrefix}/${componentRoutes[component]}`
  }));
}

export function getMiscFoldersList(docsVersion?: DocsVersion) {
  return miscComponents.map(component => ({
    name: component,
    path: `${docsVersion ? `/v${docsVersion}` : ''}${rootDir}${miscPrefix}/${componentRoutes[component]}`
  }));
}
