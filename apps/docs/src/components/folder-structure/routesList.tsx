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
 * folders under `src/app/components`. Routes stay lowercase kebab-case
 * (readable, keyword-bearing, no case-sensitivity issues) while the tree
 * labels keep the component names.
 */
const componentRoutes: Record<
  MuiComponents | MuiPickersComponents | MiscComponents,
  string
> = {
  [MuiComponents.TextField]: 'textfield',
  [MuiComponents.PasswordInput]: 'password-input',
  [MuiComponents.NumberInput]: 'number-input',
  [MuiComponents.TagsInput]: 'tags-input',
  [MuiComponents.FileUploader]: 'file-uploader',
  [MuiComponents.Select]: 'select',
  [MuiComponents.NativeSelect]: 'native-select',
  [MuiComponents.Autocomplete]: 'autocomplete',
  [MuiComponents.AutocompleteObject]: 'autocomplete-object',
  [MuiComponents.MultiAutocomplete]: 'multi-autocomplete',
  [MuiComponents.MultiAutocompleteObject]: 'multi-autocomplete-object',
  [MuiComponents.CountrySelect]: 'country-select',
  [MuiComponents.Checkbox]: 'checkbox',
  [MuiComponents.CheckboxGroup]: 'checkbox-group',
  [MuiComponents.RadioGroup]: 'radio-group',
  [MuiComponents.Slider]: 'slider',
  [MuiComponents.Switch]: 'switch',
  [MuiComponents.Rating]: 'rating',
  /* Picker variations share one page per family. */
  [MuiPickersComponents.DatePicker]: 'date',
  [MuiPickersComponents.TimePicker]: 'time',
  [MuiPickersComponents.DateTimePicker]: 'date-time',
  [MiscComponents.ColorPicker]: 'color-picker',
  [MiscComponents.RichTextEditor]: 'rich-text-editor',
  [MiscComponents.PhoneInput]: 'phone-input'
};

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
