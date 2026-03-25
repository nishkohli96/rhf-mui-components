import { MuiComponents, MuiPickersComponents, MiscComponents } from '@site/src/types/component-names';

const rootDir = '/components';
const muiPrefix = '/mui';
const muiPickersPrefix = '/mui-pickers';
const miscPrefix = '/misc';

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
  MuiComponents.MultiAutocomplete,
  MuiComponents.MultiAutocompleteObject,
  MuiComponents.CountrySelect,
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

/** Components added in v2 and before v3.3 */
export const newlyAddedComponents = [
  MuiComponents.Autocomplete,
  MuiComponents.MultiAutocomplete,
  MuiComponents.CountrySelect,
  MuiComponents.TagsInput,
  MiscComponents.PhoneInput,
  MuiComponents.NumberInput,
  MuiComponents.FileUploader,
];

export const newlyAddedV3_3Components = [
  MuiComponents.AutocompleteObject,
  MuiComponents.MultiAutocompleteObject,
];

export const muiFoldersList = muiComponents.map(component => ({
  name: component,
  path: `${rootDir}${muiPrefix}/${component}`
}));

export const muiPickersFoldersList = muiPickersComponents.map(component => ({
  name: component,
  path: `${rootDir}${muiPickersPrefix}/${component}`
}));

export const miscFoldersList = miscComponents.map(component => ({
  name: component,
  path: `${rootDir}${miscPrefix}/${component}`
}));
