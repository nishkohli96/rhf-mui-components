import { type MuiVersion } from '@site/src/types';

const githubProfile = 'https://github.com/nishkohli96/'; 
const pkgRepoLink = `${githubProfile}rhf-mui-components/blob/main/packages/rhf-mui-components/`;
const cslRepo = `${githubProfile}client-server-libs/blob/main/`;

const ExternalLinks = Object.freeze({
  mui: 'https://mui.com/material-ui/getting-started/',
  rhf: 'https://react-hook-form.com/',
  examplesRepo: `${githubProfile}rhf-mui-examples`,
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
  },
  rhfApi: {
    control: 'https://react-hook-form.com/docs/useform/control',
    register: 'https://react-hook-form.com/docs/useform/register',
    setValue: 'https://react-hook-form.com/docs/useform/setvalue',
    useForm: 'https://react-hook-form.com/docs/useform',
  },
  rhfResolvers: 'https://www.npmjs.com/package/@hookform/resolvers',
  githubRepo: {
    countriesList: `${pkgRepoLink}src/mui/country-select/countries.ts`,
    rteConfig: `${pkgRepoLink}src/misc/rich-text-editor/config.ts`
  },
  githubExamples: {
    multerFileUpload: `${cslRepo}apps/express-server/src/routes/file/controller.ts`,
    fileUploadMiddleware: `${cslRepo}apps/express-server/src/middleware/file-uploader.ts`,
    ckEditorAdvanced: `${githubProfile}react-libs/blob/main/src/pages/rte/CkEditorAdvanced.tsx`,
    ckEditorCssGist: 'https://gist.github.com/nishkohli96/cc26a1b6e8e372dad1be7c5cfa42d9c5',
  },
  validationLibs: {
    joi: 'https://www.npmjs.com/package/joi',
    superstruct: 'https://www.npmjs.com/package/superstruct',
    yup: 'https://www.npmjs.com/package/yup',
    zod: 'https://www.npmjs.com/package/zod'
  }
});

export default ExternalLinks;
