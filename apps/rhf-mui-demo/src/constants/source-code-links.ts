import { type Page } from '@/types';

const commonRoute = 'https://github.com/nishkohli96/rhf-mui-components/tree/main/apps/rhf-mui-demo/src/forms';

export const SourceCodeLinks: Record<string, Page> = {
  inputs: {
    title: 'Inputs with Register Options',
    href: `${commonRoute}/inputs-with-register-options/index.tsx`
  },
  select: {
    title: 'Select',
    href: `${commonRoute}/select-with-class-validator/index.tsx`
  },
  countrySelect: {
    title: 'Country Select',
    href: `${commonRoute}/autocomplete/index.tsx`
  },
  checkboxRadio: {
    title: 'Checkbox & Radio with Zod',
    href: `${commonRoute}/checkbox-and-radiogroup-with-zod/index.tsx`
  },
  switchSliderRating: {
    title: 'Switch, Slider & Rating with Superstruct',
    href: `${commonRoute}/switch-slider-rating-with-superstruct/index.tsx`
  },
  dateTimePickers: {
    title: 'Date & Time Pickers',
    href: `${commonRoute}/date-time-pickers/index.tsx`
  },
  miscellaneous: {
    title: 'Miscellaneous Components',
    href: `${commonRoute}/miscellaneous-components/index.tsx`
  },
  customization: {
    title: 'Styled Form with Reusable TextField',
    href: `${commonRoute}/styled-form-with-reusable-component/index.tsx`
  },
  styledTextField: {
    title: 'Reusable TextField',
    href: `${commonRoute}/styled-form-with-reusable-component/StyledTextField.tsx`
  },
  completeForm: {
    title: 'Complete Form with RegisterOptions',
    href: `${commonRoute}/complete-form/index.tsx`
  },
  completeFormJoi: {
    title: 'Complete Form with Joi',
    href: `${commonRoute}/complete-form-with-joi/index.tsx`
  }
};
