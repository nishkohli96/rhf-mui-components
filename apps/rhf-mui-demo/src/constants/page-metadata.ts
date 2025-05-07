import type { Metadata } from 'next';

export const defaultPageTitle = 'RHF-Mui Components';
export const defaultPageDescription = 'Examples for RHF-Mui Components';
export const defaultPageKeywords = [
  'react-hook-form',
  'material-ui',
  'mui',
  '@mui/material',
  'mui-rhf',
  'rhf-mui',
  'rhf-mui-components',
  '@nish1896/rhf-mui-components',
  '@nish1896',
  'react form components',
  'react forms'
];

export const pageMetadata: Record<string, Metadata> = {
  home: {
    title: 'Introduction',
    description: 'Overview of the Examples Website for RHF-MUI Components'
  },
  autocomplete: {
    title: 'Autocomplete',
    description:
      'Showcase of Autocomplete components - RHFAutocomplete, RHFMultiAutocomplete and RHFCountrySelect designed for selecting single or multiple values in form.'
  },
  checkboxAndRadio: {
    title: 'CheckboxGroup & RadioGroup with Zod Validation',
    description:
      'Form utilizing RHFCheckbox, RHFCheckboxGroup & RHFRadioGroup components with validation managed by Zod.'
  },
  completeForm: {
    title: 'Complete Form with Register Options',
    description:
      'A complete form showcasing all components from this package with appropriate validations.'
  },
  completeFormJoi: {
    title: 'Complete Form with Joi',
    description:
      'A complete form showcasing all components from this package, with validation handled by Joi.'
  },
  customization: {
    title: 'Styled form with a reusable component',
    description:
      'A reusable component made from RHFTextField and use of ConfigProvider to provide default styles and date adapter'
  },
  dateTimePickers: {
    title: 'Date & Time Pickers',
    description:
      'A form using RHFDatePicker, RHFTimePicker & RHFDateTimePicker components.'
  },
  inputs: {
    title: 'Inputs',
    description:
      'Form utilizing RHFTextField, RHFPasswordInput, RHFNumberInput, RHFTagsInput and RHFFileUploader with validation managed via react-hook-form\'s register options.'
  },
  miscComponents: {
    title: 'Miscellaneous Components',
    description:
      'Form demonstrating usage of external components like ColorPicker & RichTextEditor with react-hook-form.'
  },
  select: {
    title: 'Select with Class-Validator',
    description:
      'Form utilizing RHFSelect and RHFNativeSelect with validation managed using class-validator.'
  },
  switchSliderRating: {
    title: 'Switch, Slider & Rating with Superstruct validation',
    description:
      'Form utilizing RHFSwitch, RHFSlider & RHFRating components with validation managed by Superstruct.'
  }
};

export const forSubmittedEvent = 'form_submit';
