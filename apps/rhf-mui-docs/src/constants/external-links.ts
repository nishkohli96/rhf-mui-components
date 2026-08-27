import { type MuiVersion } from '@/types';

export const githubProfile = 'https://github.com/nishkohli96';
const pkgRepoLink = `${githubProfile}/rhf-mui-components/blob/main/`;
const cslRepo = `${githubProfile}/client-server-libs/blob/main/`;

export const githubRepoLink = `${githubProfile}/rhf-mui-components`;
export const docsLink = 'https://rhf-mui-components.vercel.app/';
export const npmLink = 'https://www.npmjs.com/package/@nish1896/rhf-mui-components';

export const externalLinks = Object.freeze({
  mui: 'https://mui.com/material-ui/getting-started/',
  rhf: 'https://react-hook-form.com/',
  muiComponents: {
    textField: (muiVersion?: MuiVersion) =>
      `https://${muiVersion ? `v${muiVersion}.` : ''}mui.com/material-ui/react-text-field/`,
    select: (muiVersion?: MuiVersion) =>
      `https://${muiVersion ? `v${muiVersion}.` : ''}mui.com/material-ui/react-select/`,
    nativeSelect: (muiVersion?: MuiVersion) =>
      `https://${muiVersion ? `v${muiVersion}.` : ''}mui.com/material-ui/react-select/#native-select`,
    checkbox: (muiVersion?: MuiVersion) =>
      `https://${muiVersion ? `v${muiVersion}.` : ''}mui.com/material-ui/react-checkbox/`,
    checkboxGroup: (muiVersion?: MuiVersion) =>
      `https://${muiVersion ? `v${muiVersion}.` : ''}mui.com/material-ui/react-checkbox/#formgroup`,
    radioGroup: (muiVersion?: MuiVersion) =>
      `https://${muiVersion ? `v${muiVersion}.` : ''}mui.com/material-ui/react-radio-button/`,
    switch: (muiVersion?: MuiVersion) =>
      `https://${muiVersion ? `v${muiVersion}.` : ''}mui.com/material-ui/react-switch/`,
    chip: (muiVersion?: MuiVersion) =>
      `https://${muiVersion ? `v${muiVersion}.` : ''}mui.com/material-ui/react-chip/`,
    iconButton: (muiVersion?: MuiVersion) =>
      `https://${muiVersion ? `v${muiVersion}.` : ''}mui.com/material-ui/react-button/#icon-button`,
    circularProgress: (muiVersion?: MuiVersion) =>
      `https://${muiVersion ? `v${muiVersion}.` : ''}mui.com/material-ui/react-progress/#circular`
  },
  muiComponentApi: {
    textField: (muiVersion?: MuiVersion) =>
      `https://${muiVersion ? `v${muiVersion}.` : ''}mui.com/material-ui/api/text-field/`,
    select: (muiVersion?: MuiVersion) =>
      `https://${muiVersion ? `v${muiVersion}.` : ''}mui.com/material-ui/api/select/`,
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
    radioGroup: (muiVersion?: MuiVersion) =>
      `https://${muiVersion ? `v${muiVersion}.` : ''}mui.com/material-ui/api/radio-group/`,
    switch: (muiVersion?: MuiVersion) =>
      `https://${muiVersion ? `v${muiVersion}.` : ''}mui.com/material-ui/api/switch/`,
    chip: (muiVersion?: MuiVersion) =>
      `https://${muiVersion ? `v${muiVersion}.` : ''}mui.com/material-ui/api/chip/`,
    box: (muiVersion?: MuiVersion) =>
      `https://${muiVersion ? `v${muiVersion}.` : ''}mui.com/material-ui/api/box/`,
    menuItem: (muiVersion?: MuiVersion) =>
      `https://${muiVersion ? `v${muiVersion}.` : ''}mui.com/material-ui/api/menu-item/`,
    inputLabel: (muiVersion?: MuiVersion) =>
      `https://${muiVersion ? `v${muiVersion}.` : ''}mui.com/material-ui/api/input-label/`,
    iconButton: (muiVersion?: MuiVersion) =>
      `https://${muiVersion ? `v${muiVersion}.` : ''}mui.com/material-ui/api/icon-button/`,
    circularProgress: (muiVersion?: MuiVersion) =>
      `https://${muiVersion ? `v${muiVersion}.` : ''}mui.com/material-ui/api/circular-progress/`,
  },
  rhfApi: {
    control: 'https://react-hook-form.com/docs/useform/control',
    register: 'https://react-hook-form.com/docs/useform/register',
    setValue: 'https://react-hook-form.com/docs/useform/setvalue',
    useForm: 'https://react-hook-form.com/docs/useform',
  },
  rhfResolvers: 'https://www.npmjs.com/package/@hookform/resolvers',
  githubRepo: {
    countriesList: `${pkgRepoLink}packages/rhf-mui-components/src/mui/country-select/countries.ts`,
    rteConfig: `${pkgRepoLink}packages/rhf-mui-components/src/misc/rich-text-editor/config.ts`
  },
  githubExamples: {
    multerFileUpload: `${cslRepo}apps/express-server/src/routes/file/controller.ts`,
    fileUploadMiddleware: `${cslRepo}apps/express-server/src/middleware/file-uploader.ts`,
    ckEditorAdvanced: `${githubProfile}/react-libs/blob/main/src/pages/rte/CkEditorAdvanced.tsx`,
    ckEditorCssGist: 'https://gist.github.com/nishkohli96/cc26a1b6e8e372dad1be7c5cfa42d9c5',
    styledTextField: `${pkgRepoLink}apps/rhf-mui-demo/src/forms/styled-form-with-reusable-component/StyledTextField.tsx`,
    styledSelect: `${pkgRepoLink}apps/rhf-mui-demo/src/forms/styled-form-with-reusable-component/StyledSelect.tsx`,
    styledAutocomplete: `${pkgRepoLink}apps/rhf-mui-demo/src/forms/styled-form-with-reusable-component/StyledAutocomplete.tsx`,
  },
  validationLibs: {
    joi: 'https://www.npmjs.com/package/joi',
    superstruct: 'https://www.npmjs.com/package/superstruct',
    yup: 'https://www.npmjs.com/package/yup',
    zod: 'https://www.npmjs.com/package/zod'
  }
});
