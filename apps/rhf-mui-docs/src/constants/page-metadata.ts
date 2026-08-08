export type PageMetadataEntry = {
  title: string;
  description: string;
};

/**
 * Single source of truth for each non-component doc page's `title` /
 * `description` frontmatter. Kept version-agnostic — copy the same entry
 * into a versioned doc's frontmatter when cutting a new docs version, so
 * wording stays consistent across v1-v5 instead of drifting per version.
 */
export const pageMetadata: Record<string, PageMetadataEntry> = {
  introduction: {
    title: 'Introduction',
    description:
      '25+ production-ready Material UI form components for react-hook-form — installation, quick start, live demos and full component API reference.'
  },
  gettingStarted: {
    title: 'Getting Started',
    description:
      'Install @nish1896/rhf-mui-components, explore the package structure and build your first react-hook-form-bound Material UI form field.'
  },
  customization: {
    title: 'Customization',
    description:
      'Configure ConfigProvider once to apply global default styles for FormLabel, FormHelperText and FormControlLabel, set a shared dateAdapter, and enable allLabelsAboveFields — no per-component overrides needed.'
  },
  componentsIndex: {
    title: 'Components',
    description:
      'Browse every react-hook-form Material UI component in this package, organized by module, with links to full usage and API docs.'
  },
  formHelpers: {
    title: 'Form Helpers',
    description:
      'Internal utility functions exported from @nish1896/rhf-mui-components for manipulating field values, saving time when building and validating forms.'
  },
  fieldNameToId: {
    title: 'fieldNameToId',
    description:
      'Converts a nested or array-indexed form field name (e.g. `phones[0].number`) into a sanitized, stable HTML id — safe for pairing form controls with `<label htmlFor>`.'
  },
  migrationGuide: {
    title: 'Migration Guide',
    description:
      'Step-by-step migration guides for upgrading @nish1896/rhf-mui-components across major versions, covering breaking changes and required code updates.'
  }
};

/**
 * Single source of truth for each component doc page's `title` / `description`
 * frontmatter. Kept version-agnostic — copy the same entry into a versioned
 * doc's frontmatter when cutting a new docs version, so wording stays
 * consistent across v1-v5 instead of drifting per version.
 */
const componentMetadata: Record<string, PageMetadataEntry> = {
  RHFTextField: {
    title: 'RHFTextField',
    description:
      'RHFTextField binds a Material UI text field to react-hook-form, with built-in label, error and helper-text handling.'
  },
  RHFPasswordInput: {
    title: 'RHFPasswordInput',
    description:
      'RHFPasswordInput binds a Material UI password field to react-hook-form, with a show/hide toggle, label, error and helper-text handling.'
  },
  RHFNumberInput: {
    title: 'RHFNumberInput',
    description:
      'RHFNumberInput binds a numeric Material UI input to react-hook-form, with decimal, integer, non-negative and step constraints.'
  },
  RHFTagsInput: {
    title: 'RHFTagsInput',
    description:
      'RHFTagsInput binds a Material UI tags input to react-hook-form — type or paste to add chips, with add/delete/paste interception.'
  },
  RHFFileUploader: {
    title: 'RHFFileUploader',
    description:
      'RHFFileUploader binds a Material UI drag-and-drop file uploader to react-hook-form, with type/size/count validation and custom renderers for single and multiple uploads.'
  },
  RHFSelect: {
    title: 'RHFSelect',
    description:
      'RHFSelect binds a Material UI Select to react-hook-form, supporting single/multiple selection and primitive or object options.'
  },
  RHFNativeSelect: {
    title: 'RHFNativeSelect',
    description:
      'RHFNativeSelect binds a Material UI native <select> to react-hook-form, for lightweight dropdowns, especially on mobile.'
  },
  RHFAutocomplete: {
    title: 'RHFAutocomplete',
    description:
      'RHFAutocomplete binds a Material UI Autocomplete to react-hook-form, storing primitive values, with single/multiple and freeSolo support.'
  },
  RHFAutocompleteObject: {
    title: 'RHFAutocompleteObject',
    description:
      'RHFAutocompleteObject binds a Material UI Autocomplete to react-hook-form, storing the complete option object as its value.'
  },
  RHFCountrySelect: {
    title: 'RHFCountrySelect',
    description:
      'RHFCountrySelect binds a country picker built on Material UI Autocomplete to react-hook-form, with flags and preferred countries.'
  },
  RHFMultiAutocomplete: {
    title: 'RHFMultiAutocomplete',
    description:
      'RHFMultiAutocomplete binds a multi-select Material UI Autocomplete to react-hook-form, with checkboxes and a Select-All option.'
  },
  RHFMultiAutocompleteObject: {
    title: 'RHFMultiAutocompleteObject',
    description:
      'RHFMultiAutocompleteObject binds a multi-select Material UI Autocomplete to react-hook-form, storing an array of complete option objects.'
  },
  RHFCheckbox: {
    title: 'RHFCheckbox',
    description:
      'RHFCheckbox binds a Material UI Checkbox to react-hook-form, with label and helper-text handling.'
  },
  RHFCheckboxGroup: {
    title: 'RHFCheckboxGroup',
    description:
      'RHFCheckboxGroup binds a group of Material UI checkboxes to react-hook-form, storing an array of selected option values.'
  },
  RHFRadioGroup: {
    title: 'RHFRadioGroup',
    description:
      'RHFRadioGroup binds a Material UI RadioGroup to react-hook-form, for single choice among primitive or object options.'
  },
  RHFSwitch: {
    title: 'RHFSwitch',
    description:
      'RHFSwitch binds a Material UI Switch (on/off toggle) to react-hook-form, with label and helper-text handling.'
  },
  RHFSlider: {
    title: 'RHFSlider',
    description:
      'RHFSlider binds a Material UI Slider to react-hook-form, for single or range numeric values.'
  },
  RHFRating: {
    title: 'RHFRating',
    description:
      'RHFRating binds a Material UI Rating (star) input to react-hook-form, with label and helper-text handling.'
  },
  RHFDatePicker: {
    title: 'RHFDatePicker',
    description:
      'RHFDatePicker binds Material UI X date pickers to react-hook-form — responsive, desktop, mobile and static variants with label, error and helper-text handling.'
  },
  RHFTimePicker: {
    title: 'RHFTimePicker',
    description:
      'RHFTimePicker binds Material UI X time pickers to react-hook-form — responsive, desktop, mobile and static variants with label, error and helper-text handling.'
  },
  RHFDateTimePicker: {
    title: 'RHFDateTimePicker',
    description:
      'RHFDateTimePicker binds Material UI X date-time pickers to react-hook-form — responsive, desktop, mobile and static variants with label, error and helper-text handling.'
  },
  RHFColorPicker: {
    title: 'RHFColorPicker',
    description:
      'RHFColorPicker binds a color picker built on react-color-palette to react-hook-form, with label, error and helper-text handling.'
  },
  RHFPhoneInput: {
    title: 'RHFPhoneInput',
    description:
      'RHFPhoneInput binds an international phone input to react-hook-form, with country dropdown, search and structured value output.'
  },
  RHFRichTextEditor: {
    title: 'RHFRichTextEditor',
    description:
      'RHFRichTextEditor binds a CKEditor 5 rich text editor to react-hook-form, with label, error and helper-text handling.'
  }
};

export default componentMetadata;
