const rootDir = '/components';
const muiPrefix = '/mui';
const muiPickersPrefix = '/mui-pickers';
const miscPrefix = '/misc';

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

export const muiPickersFoldersList = muiPickersComponents.map((component) => ({
  name: component,
  path: `${rootDir}${muiPickersPrefix}/${component}`
}));

export const miscFoldersList = miscComponents.map((component) => ({
  name: component,
  path: `${rootDir}${miscPrefix}/${component}`
}));
