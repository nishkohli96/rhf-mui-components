import { type DocsVersion } from '@site/src/types';

const rootDir = '/components';
const muiPrefix = '/mui';
const muiPickersPrefix = '/mui-pickers';
const miscPrefix = '/misc';

const muiComponents = [
  'RHFTextField',
  'RHFNumberInput',
  'RHFPasswordInput',
  'RHFTagsInput',
  'RHFFileUploader',
  'RHFSelect',
  'RHFNativeSelect',
  'RHFAutocomplete',
  'RHFMultiAutocomplete',
  'RHFCountrySelect',
  'RHFCheckbox',
  'RHFCheckboxGroup',
  'RHFRadioGroup',
  'RHFSlider',
  'RHFSwitch',
  'RHFRating'
];

const muiPickersComponents = [
  'RHFDatePicker',
  'RHFTimePicker',
  'RHFDateTimePicker'
];

const miscComponents = [
  'RHFColorPicker',
  'RHFRichTextEditor',
  'RHFPhoneInput'
];

export const newlyAddedComponents = [
  'RHFAutocomplete',
  'RHFMultiAutocomplete',
  'RHFCountrySelect',
  'RHFTagsInput',
  'RHFPhoneInput',
  'RHFNumberInput',
  'RHFFileUploader',
];

export function getMuiFoldersList(docsVersion?: DocsVersion) {
  return muiComponents.map(component => ({
    name: component,
    path: `${docsVersion ? `/v${docsVersion}` : ''}${rootDir}${muiPrefix}/${component}`
  }));
}

export function getMuiPickersFoldersList(docsVersion?: DocsVersion) {
  return muiPickersComponents.map(component => ({
    name: component,
    path: `${docsVersion ? `/v${docsVersion}` : ''}${rootDir}${muiPickersPrefix}/${component}`
  }));
}

export function getMiscFoldersList(docsVersion?: DocsVersion) {
  return miscComponents.map(component => ({
    name: component,
    path: `${docsVersion ? `/v${docsVersion}` : ''}${rootDir}${miscPrefix}/${component}`
  }));
}
