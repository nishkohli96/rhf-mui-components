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
  completeFormState: {
    title: 'Complete Form — React state',
    description:
      'Every component in one form, controlled with plain React state and manual validation, with a live values-and-errors readout.'
  },
  completeFormRHF: {
    title: 'Complete Form with React Hook Form + Zod',
    description:
      'A complete form showcasing all components from this package, with validation handled by Zod and a checkbox to disable all fields.'
  },
  completeFormFormik: {
    title: 'Complete Form — Formik',
    description:
      'Every component in one form, integrated with Formik using a direct validate function, with a live values-and-errors readout.'
  },
  completeFormTanStack: {
    title: 'Complete Form — TanStack + Joi',
    description:
      'Every component in one form, integrated with TanStack Form and validated by a Joi schema, with a live values-and-errors readout.'
  },
  customization: {
    title: 'Customization',
    description:
      'Configure ConfigProvider once to apply global default styles for FormLabel, FormControlLabel and FormHelperText, set a shared dateAdapter, and enable allLabelsAboveFields — no per-component overrides needed.'
  },
  customizationExample: {
    title: 'Styled form with reusable components',
    description:
      'A form built from reusable Styled* wrappers — TextField, Select, Autocomplete, a customized DatePicker and an iOS-style Switch — controlled with plain React state, each with required validation, and a ConfigProvider supplying shared label/helper styles and the date adapter.'
  },
  dateTimePickers: {
    title: 'Date & Time Pickers',
    description:
      'A form using MUIDatePicker, MUITimePicker & MUIDateTimePicker components.'
  },
  inputs: {
    title: 'Inputs',
    description:
      'Form utilizing MUITextField, MUIPasswordInput, MUINumberInput, MUITagsInput and MUIFileUploader, controlled with plain React state.'
  },
  miscComponents: {
    title: 'Miscellaneous Components',
    description:
      'Form demonstrating usage of external components like MUIColorPicker, MUIPhoneInput & MUIRichTextEditor.'
  },
  select: {
    title: 'Select with Class-Validator',
    description:
      'Form utilizing MUISelect and MUINativeSelect with validation managed using class-validator.'
  },
  migrationGuide_v2: {
    title: 'Migration Guide - v1 to v2',
    description:
      'Step-by-step migration guide for @nish1896/mui-components v2 with Material UI v9, covering breaking changes, updated APIs, and required code changes.'
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
  MUITextField: {
    title: 'TextField',
    description:
      'MUITextField — a controlled Material UI text field with built-in label, error and helper-text handling. Usage, live examples and full props reference.'
  },
  MUIPasswordInput: {
    title: 'MUIPasswordInput',
    description:
      'Controlled Material UI password field with a show/hide toggle, label, error and helper-text handling.'
  },
  MUINumberInput: {
    title: 'MUINumberInput',
    description:
      'Controlled numeric Material UI input with decimal, integer, non-negative and step constraints.'
  },
  MUITagsInput: {
    title: 'MUITagsInput',
    description:
      'Controlled Material UI tags input — type or paste to add chips, with add/delete/paste interception.'
  },
  MUIFileUploader: {
    title: 'MUIFileUploader',
    description:
      'Controlled Material UI file uploader with drag-and-drop, type/size/count validation and custom renderers.'
  },
  MUISelect: {
    title: 'MUISelect',
    description:
      'Controlled Material UI Select supporting single/multiple selection and primitive or object options.'
  },
  MUINativeSelect: {
    title: 'MUINativeSelect',
    description:
      'Controlled Material UI native <select> for lightweight dropdowns, especially on mobile.'
  },
  MUIAutocomplete: {
    title: 'MUIAutocomplete',
    description:
      'Controlled Material UI Autocomplete storing primitive values, with single/multiple and freeSolo support.'
  },
  MUIAutocompleteObject: {
    title: 'MUIAutocompleteObject',
    description:
      'Controlled Material UI Autocomplete that stores the complete option object as its value.'
  },
  MUICountrySelect: {
    title: 'MUICountrySelect',
    description:
      'Controlled country picker built on Material UI Autocomplete with flags and preferred countries.'
  },
  MUIMultiAutocomplete: {
    title: 'MUIMultiAutocomplete',
    description:
      'Controlled multi-select Material UI Autocomplete with checkboxes and a Select-All option.'
  },
  MUIMultiAutocompleteObject: {
    title: 'MUIMultiAutocompleteObject',
    description:
      'Controlled multi-select Material UI Autocomplete storing an array of complete option objects.'
  },
  MUICheckbox: {
    title: 'MUICheckbox',
    description:
      'Controlled single Material UI Checkbox with label and helper-text handling.'
  },
  MUICheckboxGroup: {
    title: 'MUICheckboxGroup',
    description:
      'Controlled group of Material UI checkboxes storing an array of selected option values.'
  },
  MUIRadioGroup: {
    title: 'MUIRadioGroup',
    description:
      'Controlled Material UI RadioGroup for single choice among primitive or object options.'
  },
  MUISwitch: {
    title: 'MUISwitch',
    description:
      'Controlled Material UI Switch (on/off toggle) with label and helper-text handling.'
  },
  MUISlider: {
    title: 'MUISlider',
    description: 'Controlled Material UI Slider for single or range numeric values.'
  },
  MUIRating: {
    title: 'MUIRating',
    description:
      'Controlled Material UI Rating (star) input with label and helper-text handling.'
  },
  MUIDatePicker: {
    title: 'Date Pickers',
    description:
      'Controlled Material UI X date pickers — responsive, desktop, mobile and static variants with label, error and helper-text handling.'
  },
  MUITimePicker: {
    title: 'Time Pickers',
    description:
      'Controlled Material UI X time pickers — responsive, desktop, mobile and static variants with label, error and helper-text handling.'
  },
  MUIDateTimePicker: {
    title: 'Date-Time Pickers',
    description:
      'Controlled Material UI X date-time pickers — responsive, desktop, mobile and static variants with label, error and helper-text handling.'
  },
  MUIColorPicker: {
    title: 'MUIColorPicker',
    description:
      'Controlled color picker built on react-color-palette with label, error and helper-text handling.'
  },
  MUIPhoneInput: {
    title: 'MUIPhoneInput',
    description:
      'Controlled international phone input with country dropdown, search and structured value output.'
  },
  MUIRichTextEditor: {
    title: 'MUIRichTextEditor',
    description:
      'Controlled CKEditor 5 rich text editor with label, error and helper-text handling.'
  },
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
