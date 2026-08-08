import { type Page } from '@/types';

export const sidebarLinks: Page[] = [
  {
    title: 'Introduction',
    href: '/introduction'
  },
  {
    title: 'Installation',
    href: '/installation'
  },
  {
    title: 'Components',
    pages: [
      {
        title: 'MUI',
        pages: [
          { title: 'Text Field', href: '/components/mui/textfield' },
          { title: 'Password Input', href: '/components/mui/password-input' },
          { title: 'Number Input', href: '/components/mui/number-input' },
          { title: 'Tags Input', href: '/components/mui/tags-input' },
          { title: 'File Uploader', href: '/components/mui/file-uploader' },
          { title: 'Select', href: '/components/mui/select' },
          { title: 'Native Select', href: '/components/mui/native-select' },
          { title: 'Autocomplete', href: '/components/mui/autocomplete' },
          { title: 'Autocomplete Object', href: '/components/mui/autocomplete-object' },
          { title: 'Country Select', href: '/components/mui/country-select' },
          { title: 'Multi Autocomplete', href: '/components/mui/multi-autocomplete' },
          { title: 'Multi Autocomplete Object', href: '/components/mui/multi-autocomplete-object' },
          { title: 'Checkbox', href: '/components/mui/checkbox' },
          { title: 'Checkbox Group', href: '/components/mui/checkbox-group' },
          { title: 'Radio Group', href: '/components/mui/radio-group' },
          { title: 'Slider', href: '/components/mui/slider' },
          { title: 'Switch', href: '/components/mui/switch' },
          { title: 'Rating', href: '/components/mui/rating' }
        ]
      },
      {
        title: 'MUI Pickers',
        pages: [
          { title: 'Date Picker', href: '/components/mui-pickers/date' },
          { title: 'Time Picker', href: '/components/mui-pickers/time' },
          { title: 'Date Time Picker', href: '/components/mui-pickers/date-time' }
        ]
      },
      {
        title: 'Misc',
        pages: [
          { title: 'Color Picker', href: '/components/misc/color-picker' },
          { title: 'Rich Text Editor', href: '/components/misc/rich-text-editor' },
          { title: 'Phone Input', href: '/components/misc/phone-input' }
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
