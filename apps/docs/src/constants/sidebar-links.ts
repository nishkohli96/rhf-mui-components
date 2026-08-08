import { type Page } from '@/types';

export const sidebarLinks: Page[] = [
  {
    title: 'Introduction',
    href: '/introduction'
  },
  {
    title: 'Getting Started',
    href: '/getting-started'
  },
  {
    title: 'Components',
    pages: [
      {
        title: 'MUI',
        pages: [
          { title: 'Text Field', href: '/components/mui/RHFTextfield' },
          { title: 'Password Input', href: '/components/mui/RHFPasswordInput' },
          { title: 'Number Input', href: '/components/mui/RHFNumberInput' },
          { title: 'Tags Input', href: '/components/mui/RHFTagsInput' },
          { title: 'File Uploader', href: '/components/mui/RHFFileUploader' },
          { title: 'Select', href: '/components/mui/RHFSelect' },
          { title: 'Native Select', href: '/components/mui/RHFNativeSelect' },
          { title: 'Autocomplete', href: '/components/mui/RHFAutocomplete' },
          { title: 'Autocomplete Object', href: '/components/mui/RHFAutocompleteObject' },
          { title: 'Country Select', href: '/components/mui/RHFCountrySelect' },
          { title: 'Multi Autocomplete', href: '/components/mui/RHFMultiAutocomplete' },
          { title: 'Multi Autocomplete Object', href: '/components/mui/RHFMultiAutocompleteObject' },
          { title: 'Checkbox', href: '/components/mui/RHFCheckbox' },
          { title: 'Checkbox Group', href: '/components/mui/RHFCheckboxGroup' },
          { title: 'Radio Group', href: '/components/mui/RHFRadioGroup' },
          { title: 'Slider', href: '/components/mui/RHFSlider' },
          { title: 'Switch', href: '/components/mui/RHFSwitch' },
          { title: 'Rating', href: '/components/mui/RHFRating' }
        ]
      },
      {
        title: 'MUI Pickers',
        pages: [
          { title: 'Date Picker', href: '/components/mui-pickers/RHFDatePicker' },
          { title: 'Time Picker', href: '/components/mui-pickers/RHFTimePicker' },
          { title: 'Date Time Picker', href: '/components/mui-pickers/RHFDate-TimePicker' }
        ]
      },
      {
        title: 'Misc',
        pages: [
          { title: 'Color Picker', href: '/components/misc/RHFColorPicker' },
          { title: 'Rich Text Editor', href: '/components/misc/RHFRichTextEditor' },
          { title: 'Phone Input', href: '/components/misc/RHFPhoneInput' }
        ]
      }
    ]
  },
  {
    title: 'Customization',
    href: '/customization'
  },
  {
    title: 'Form Helpers',
    pages: [
      {
        title: 'fieldNameToId',
        href: '/form-helpers/fieldNameToId',
      },
      {
        title: 'fieldNameToLabel',
        href: '/form-helpers/fieldNameToLabel',
      },
      {
        title: 'getFileSize',
        href: '/form-helpers/getFileSize'
      },
      {
        title: 'validateFileList',
        href: '/form-helpers/validateFileList'
      },
      {
        title: 'colorToString',
        href: '/form-helpers/colorToString'
      },
    ]
  },
  {
    title: 'Examples',
    pages: [
      { title: 'Customization', href: '/examples/customization' },
      { title: 'Complete Form — State', href: '/examples/state' },
      { title: 'Complete Form - RHF', href: '/examples/react-hook-form' },
      { title: 'Complete Form — Formik', href: '/examples/formik' },
      { title: 'Complete Form — TanStack', href: '/examples/tanstack' }
    ]
  },
  {
    title: 'Migration Guide',
    pages: [
      { title: 'v1 to v2', href: '/migration-guide/v1-to-v2' }
    ]
  }
];
