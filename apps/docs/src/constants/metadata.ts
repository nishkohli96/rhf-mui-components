import type { Metadata } from 'next';

export const defaultPageTitle = 'RHF-MUI Components';
export const defaultPageDescription
  = '25+ form-library-independent Material UI components for forms or standalone use — docs, live demos and full props reference.';

export const defaultPageKeywords = [
  'material-ui form components',
  'mui form components',
  'mui components',
  '@nish1896/mui-components',
  'form-library-independent',
  'controlled form components',
  'react-hook-form',
  'tanstack form',
  'formik',
  'mui',
  '@mui/material',
  'react form validation',
  'mui autocomplete',
  'mui select',
  'mui date picker',
  'mui file upload'
];

export const pageMetadata: Record<string, Metadata> = {
  home: {
    title: 'MUI Components',
    description:
      'Production-ready, form-library-independent Material UI components for forms or standalone use, with consistent labels, helper text and validation UI.'
  },
  notFound: {
    title: 'Page Not Found',
    description: 'The page you\'re looking for doesn\'t exist or may have moved.'
  },
  introduction: {
    title: 'Introduction',
    description:
      '25+ form-library-agnostic Material UI form components — installation, quick start, live demos and full component API reference.'
  },
  gettingStarted: {
    title: 'Getting Started',
    description:
      'Install @nish1896/mui-components, explore the package structure and build your first controlled Material UI form field.'
  },
  customization: {
    title: 'Customization',
    description:
      'Configure ConfigProvider once to apply global default styles for FormLabel, FormControlLabel and FormHelperText, set a shared dateAdapter, and enable allLabelsAboveFields — no per-component overrides needed.'
  },
  /* ----- Form Examples ----- */
  inputsExample: {
    title: 'Inputs',
    description:
      'Form utilizing MUITextField, MUIPasswordInput, MUINumberInput, MUITagsInput and MUIFileUploader, controlled with plain React state.'
  },
  selectExample: {
    title: 'Select with Class-Validator',
    description:
      'Form utilizing MUISelect and MUINativeSelect with validation managed using class-validator.'
  },
  autocompleteExample: {
    title: 'Autocomplete',
    description:
      'A React Hook Form example using RHFAutocomplete, RHFAutocompleteObject, RHFMultiAutocomplete, RHFMultiAutocompleteObject and RHFCountrySelect, backed by a live API-driven option list.'
  },
  checkboxAndRadioExample: {
    title: 'Checkbox & Radio Group',
    description:
      'A React Hook Form example using RHFCheckbox, RHFCheckboxGroup and RHFRadioGroup, with field-level validation rules.'
  },
  switchSliderRatingExample: {
    title: 'Switch, Slider & Rating',
    description:
      'A React Hook Form example using RHFSwitch, RHFSlider and RHFRating to bind toggle, range and rating inputs to form state.'
  },
  dateTimePickersExample: {
    title: 'Date & Time Pickers',
    description:
      'A form using MUIDatePicker, MUITimePicker & MUIDateTimePicker components.'
  },
  miscComponentsExample: {
    title: 'Miscellaneous Components',
    description:
      'Form demonstrating usage of external components like MUIColorPicker, MUIPhoneInput & MUIRichTextEditor.'
  },
  customizationExample: {
    title: 'Styled form with reusable components',
    description:
      'A form built from reusable Styled* wrappers — TextField, Select, Autocomplete, a customized DatePicker and an iOS-style Switch — controlled with plain React state, each with required validation, and a ConfigProvider supplying shared label/helper styles and the date adapter.'
  },
  completeFormExample: {
    title: 'Complete Form — React Hook Form',
    description:
      'Every component in this package wired into a single React Hook Form, validated with plain registerOptions rules and a live values-and-errors readout.'
  },
  completeFormJoiExample: {
    title: 'Complete Form — React Hook Form + Joi',
    description:
      'Every component in this package wired into a single React Hook Form, validated by a Joi schema via @hookform/resolvers, with a live values-and-errors readout.'
  },
  /* ----- Migration Guide ----- */
  migrationGuide_v1v2: {
    title: 'Migration Guide — v1 to v2',
    description:
      'Step-by-step guide for upgrading @nish1896/rhf-mui-components from v1 to v2 — the control prop migration, enhanced validation, disabled-field support and per-component breaking changes.'
  },
  migrationGuide_v2v3: {
    title: 'Migration Guide — v2 to v3',
    description:
      'Migration guide for upgrading @nish1896/rhf-mui-components from v2 to v3, with Material UI v7 and MUI X Date Pickers v8 compatibility.'
  },
  migrationGuide_v3v4: {
    title: 'Migration Guide — v3 to v4',
    description:
      'Step-by-step guide for upgrading @nish1896/rhf-mui-components from v3 to v4 — the onValueChange signature change, RHF disabled-state support, and breaking changes to RHFFileUploader, RHFCountrySelect, RHFColorPicker and RHFPhoneInput.'
  },
  migrationGuide_v4v5: {
    title: 'Migration Guide — v4 to v5',
    description:
      'Step-by-step guide for upgrading @nish1896/rhf-mui-components from v4 to v5 for Material UI v9 and MUI X Date Pickers v9 compatibility, covering the slotProps rename and other pass-through prop changes.'
  }
};

/**
 * SEO metadata for every component documentation page, keyed by component
 * name (the picker families use their base component as the page key).
 * Kept separate from the demo-page `pageMetadata` above and version-agnostic,
 * so the same record can back the v2 docs — each `page.mdx` just does
 * `export const metadata = componentMetadata.MUIXxx;`.
 */
export const componentMetadata: Record<string, Metadata> = {
  RHFTextField: {
    title: 'TextField',
    description:
      'MUITextField — a controlled Material UI text field with built-in label, error and helper-text handling. Usage, live examples and full props reference.'
  },
  RHFPasswordInput: {
    title: 'MUIPasswordInput',
    description:
      'Controlled Material UI password field with a show/hide toggle, label, error and helper-text handling.'
  },
  RHFNumberInput: {
    title: 'MUINumberInput',
    description:
      'Controlled numeric Material UI input with decimal, integer, non-negative and step constraints.'
  },
  RHFTagsInput: {
    title: 'MUITagsInput',
    description:
      'Controlled Material UI tags input — type or paste to add chips, with add/delete/paste interception.'
  },
  RHFFileUploader: {
    title: 'MUIFileUploader',
    description:
      'Controlled Material UI file uploader with drag-and-drop, type/size/count validation and custom renderers.'
  },
  RHFSelect: {
    title: 'MUISelect',
    description:
      'Controlled Material UI Select supporting single/multiple selection and primitive or object options.'
  },
  RHFNativeSelect: {
    title: 'MUINativeSelect',
    description:
      'Controlled Material UI native <select> for lightweight dropdowns, especially on mobile.'
  },
  RHFAutocomplete: {
    title: 'MUIAutocomplete',
    description:
      'Controlled Material UI Autocomplete storing primitive values, with single/multiple and freeSolo support.'
  },
  RHFAutocompleteObject: {
    title: 'MUIAutocompleteObject',
    description:
      'Controlled Material UI Autocomplete that stores the complete option object as its value.'
  },
  RHFCountrySelect: {
    title: 'MUICountrySelect',
    description:
      'Controlled country picker built on Material UI Autocomplete with flags and preferred countries.'
  },
  RHFMultiAutocomplete: {
    title: 'MUIMultiAutocomplete',
    description:
      'Controlled multi-select Material UI Autocomplete with checkboxes and a Select-All option.'
  },
  RHFMultiAutocompleteObject: {
    title: 'MUIMultiAutocompleteObject',
    description:
      'Controlled multi-select Material UI Autocomplete storing an array of complete option objects.'
  },
  RHFCheckbox: {
    title: 'MUICheckbox',
    description:
      'Controlled single Material UI Checkbox with label and helper-text handling.'
  },
  RHFCheckboxGroup: {
    title: 'MUICheckboxGroup',
    description:
      'Controlled group of Material UI checkboxes storing an array of selected option values.'
  },
  RHFRadioGroup: {
    title: 'MUIRadioGroup',
    description:
      'Controlled Material UI RadioGroup for single choice among primitive or object options.'
  },
  RHFSwitch: {
    title: 'MUISwitch',
    description:
      'Controlled Material UI Switch (on/off toggle) with label and helper-text handling.'
  },
  RHFSlider: {
    title: 'MUISlider',
    description: 'Controlled Material UI Slider for single or range numeric values.'
  },
  RHFRating: {
    title: 'MUIRating',
    description:
      'Controlled Material UI Rating (star) input with label and helper-text handling.'
  },
  RHFDatePicker: {
    title: 'Date Pickers',
    description:
      'Controlled Material UI X date pickers — responsive, desktop, mobile and static variants with label, error and helper-text handling.'
  },
  RHFTimePicker: {
    title: 'Time Pickers',
    description:
      'Controlled Material UI X time pickers — responsive, desktop, mobile and static variants with label, error and helper-text handling.'
  },
  RHFDateTimePicker: {
    title: 'Date-Time Pickers',
    description:
      'Controlled Material UI X date-time pickers — responsive, desktop, mobile and static variants with label, error and helper-text handling.'
  },
  RHFColorPicker: {
    title: 'MUIColorPicker',
    description:
      'Controlled color picker built on react-color-palette with label, error and helper-text handling.'
  },
  RHFPhoneInput: {
    title: 'MUIPhoneInput',
    description:
      'Controlled international phone input with country dropdown, search and structured value output.'
  },
  RHFRichTextEditor: {
    title: 'MUIRichTextEditor',
    description:
      'Controlled CKEditor 5 rich text editor with label, error and helper-text handling.'
  },
  /* ----- Form Helpers ----- */
  fieldNameToId: {
    title: 'fieldNameToId',
    description: 'Converts a nested or array-indexed form field name (e.g. `phones[0].number`) into a sanitized, stable HTML id — safe for pairing form controls with `<label htmlFor>`.'
  },
  fieldNameToLabel: {
    title: 'fieldNameToLabel',
    description: 'Generates a human-readable field label from a camelCase or snake_case fieldName, so you don\'t have to hand-write a label for every field.'
  },
  getFileSize: {
    title: 'getFileSize',
    description: 'Formats a byte count into a human-readable file size — bytes, KB, MB or GB — rounded to a whole number or a given precision.'
  },
  validateFileList: {
    title: 'validateFileList',
    description: 'Validates a FileList against a max size, accepted file types and a file-count limit, splitting it into accepted and rejected files with per-file error reasons.'
  },
  colorToString: {
    title: 'colorToString',
    description: 'Converts an RGB or HSV color object into a valid CSS color string, with an option to omit a fully-opaque alpha channel.'
  },
};

export const formSubmitEventName = 'form_submit';
