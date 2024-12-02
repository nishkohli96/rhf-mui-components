const rootDir = '/components';
const muiPrefix = '/mui';
const muiPickersPrefix = '/mui-pickers';
const miscPrefix = '/misc';

const muiComponents = [
  'RHFTextField',
  'RHFPasswordInput',
  'RHFSelect',
  'RHFCountrySelect',
  'RHFMultiAutocomplete',
  'RHFNativeSelect',
  'RHFCheckbox',
  'RHFCheckboxGroup',
  'RHFRadioGroup',
  'RHFSlider',
  'RHFSwitch',
  'RHFRating',
  'RHFTagsInput'
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
  'RHFCountrySelect',
  'RHFMultiAutocomplete',
  'RHFPhoneInput',
  'RHFTagsInput'
]

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
