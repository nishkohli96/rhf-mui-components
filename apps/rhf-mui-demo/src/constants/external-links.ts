import { PageInfo } from '@/types';

export const ExternalLinks = Object.freeze({
  mui: 'https://mui.com/material-ui/getting-started/',
  muiComponents: {
    formLabel: 'https://mui.com/material-ui/api/form-label/',
    formHelperText: 'https://mui.com/material-ui/api/form-helper-text/'
  },
  rhf: {
    home: 'https://react-hook-form.com/',
    register: 'https://react-hook-form.com/docs/useform/register',
    control: 'https://react-hook-form.com/docs/useform/control',
  }
});

export const ValidationLibLinks: Record<string, PageInfo> = {
  classValidator: {
    title: 'Class Validator',
    href: 'https://www.npmjs.com/package/class-validator'
  },
  joi: {
    title: 'Joi',
    href: 'https://www.npmjs.com/package/joi'
  },
  superstruct: {
    title: 'Superstruct',
    href: 'https://www.npmjs.com/package/superstruct'
  },
  zod: {
    title: 'Zod',
    href: 'https://www.npmjs.com/package/zod'
  }
};
