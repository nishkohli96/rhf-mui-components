import { type MuiVersion } from '@site/src/types';

const ExternalLinks = Object.freeze({
  mui: 'https://mui.com/material-ui/getting-started/',
  rhf: 'https://react-hook-form.com/',
  muiComponents: {
    checkbox: 'https://mui.com/material-ui/react-checkbox/',
    checkboxGroup: 'https://mui.com/material-ui/react-checkbox/#formgroup',
    nativeSelect: 'https://mui.com/material-ui/react-select/#native-select',
    radioGroup: 'https://mui.com/material-ui/react-radio-button/',
    select: 'https://mui.com/material-ui/react-select/',
    switch: 'https://mui.com/material-ui/react-switch/',
    textField: 'https://mui.com/material-ui/react-text-field/'
  },
  muiComponentApi: {
    checkbox: (muiVersion?: MuiVersion) =>
      `https://${muiVersion ? `v${muiVersion}.` : ''}mui.com/material-ui/api/checkbox/`,
    formLabel: (muiVersion?: MuiVersion) =>
      `https://${muiVersion ? `v${muiVersion}.` : ''}mui.com/material-ui/api/form-label/`,
    formControlLabel: (muiVersion?: MuiVersion) =>
      `https://${muiVersion ? `v${muiVersion}.` : ''}mui.com/material-ui/api/form-control-label/`,
    formHelperText: (muiVersion?: MuiVersion) =>
      `https://${muiVersion ? `v${muiVersion}.` : ''}mui.com/material-ui/api/form-helper-text/`,
    nativeSelect: 'https://mui.com/material-ui/api/native-select/',
    radio: (muiVersion?: MuiVersion) =>
      `https://${muiVersion ? `v${muiVersion}.` : ''}mui.com/material-ui/api/radio/`,
    chip: (muiVersion?: MuiVersion) =>
      `https://${muiVersion ? `v${muiVersion}.` : ''}mui.com/material-ui/api/chip/`,
    radioGroup: 'https://mui.com/material-ui/api/radio-group/',
    select: 'https://mui.com/material-ui/api/select/',
    switch: 'https://mui.com/material-ui/api/switch/',
    textField: 'https://mui.com/material-ui/api/text-field/'
  },
  rhfLinks: {
    control: 'https://react-hook-form.com/docs/useform/control',
    register: 'https://react-hook-form.com/docs/useform/register',
    resolvers: 'https://www.npmjs.com/package/@hookform/resolvers',
    setValue: 'https://react-hook-form.com/docs/useform/setvalue'
  },
  validationLibs: {
    joi: 'https://www.npmjs.com/package/joi',
    superstruct: 'https://www.npmjs.com/package/superstruct',
    yup: 'https://www.npmjs.com/package/yup',
    zod: 'https://www.npmjs.com/package/zod'
  }
});

export default ExternalLinks;
