import { PageInfo } from '@/types';
import { ENV_VARS } from './env-vars';

export const DocsLinks: Record<string, PageInfo> = {
  rhfTextField: {
    title: 'RHFTextField',
    href: `${ENV_VARS.DOCS_URL}components/mui/RHFTextField`
  },
  rhfPasswordField: {
    title: 'RHFPasswordInput',
    href: `${ENV_VARS.DOCS_URL}components/mui/RHFPasswordInput`
  },
  rhfSelect: {
    title: 'RHFSelect',
    href: `${ENV_VARS.DOCS_URL}components/mui/RHFSelect`
  },
  rhfNativeSelect: {
    title: 'RHFNativeSelect',
    href: `${ENV_VARS.DOCS_URL}components/mui/RHFNativeSelect`
  },
  rhfCheckbox: {
    title: 'RHFCheckbox',
    href: `${ENV_VARS.DOCS_URL}components/mui/RHFCheckbox`
  },
  rhfCheckboxGroup: {
    title: 'RHFCheckboxGroup',
    href: `${ENV_VARS.DOCS_URL}components/mui/RHFCheckboxGroup`
  },
  rhfSlider: {
    title: 'RHFSlider',
    href: `${ENV_VARS.DOCS_URL}components/mui/RHFSlider`
  },
  rhfSwitch: {
    title: 'RHFSwitch',
    href: `${ENV_VARS.DOCS_URL}components/mui/RHFSwitch`
  },
  rhfRating: {
    title: 'RHFRating',
    href: `${ENV_VARS.DOCS_URL}components/mui/RHFRating`
  },
  rhfRadioGroup: {
    title: 'RHFRadioGroup',
    href: `${ENV_VARS.DOCS_URL}components/mui/RHFRadioGroup`
  },
  rhfDatePicker: {
    title: 'RHFDatePicker',
    href: `${ENV_VARS.DOCS_URL}components/mui-pickers/RHFDatePicker`
  },
  rhfTimePicker: {
    title: 'RHFTimePicker',
    href: `${ENV_VARS.DOCS_URL}components/mui-pickers/RHFTimePicker`
  },
  rhfDateTimePicker: {
    title: 'RHFDateTimePicker',
    href: `${ENV_VARS.DOCS_URL}components/mui-pickers/RHFDateTimePicker`
  },
  rhfColorPicker: {
    title: 'RHFColorPicker',
    href: `${ENV_VARS.DOCS_URL}components/misc/RHFColorPicker`
  },
  rhfRichTextEditor: {
    title: 'RHFRichTextEditor',
    href: `${ENV_VARS.DOCS_URL}components/misc/RHFRichTextEditor`
  }
};
