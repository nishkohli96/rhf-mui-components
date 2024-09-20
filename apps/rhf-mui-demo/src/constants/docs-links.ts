import { PageInfo } from '@/types';
import { ENV_VARS } from './env-vars';

export const DocsLinks: Record<string, PageInfo> = {
  rhfTextField: {
    title: 'RHFTextField',
    href: `${ENV_VARS.DOCS_URL}components/inputs/RHFTextField`
  },
  rhfPasswordField: {
    title: 'RHFPasswordInput',
    href: `${ENV_VARS.DOCS_URL}components/inputs/RHFPasswordInput`
  },
  rhfSelect: {
    title: 'RHFSelect',
    href: `${ENV_VARS.DOCS_URL}components/select/RHFSelect`
  },
  rhfNativeSelect: {
    title: 'RHFNativeSelect',
    href: `${ENV_VARS.DOCS_URL}components/select/RHFNativeSelect`
  },
  rhfCheckbox: {
    title: 'RHFCheckbox',
    href: `${ENV_VARS.DOCS_URL}components/checkbox/RHFCheckbox`
  },
  rhfCheckboxGroup: {
    title: 'RHFCheckboxGroup',
    href: `${ENV_VARS.DOCS_URL}components/checkbox/RHFCheckboxGroup`
  },
  rhfSlider: {
    title: 'RHFSlider',
    href: `${ENV_VARS.DOCS_URL}components/input-controls/RHFSlider`
  },
  rhfSwitch: {
    title: 'RHFSwitch',
    href: `${ENV_VARS.DOCS_URL}components/input-controls/RHFSwitch`
  },
  rhfRating: {
    title: 'RHFRating',
    href: `${ENV_VARS.DOCS_URL}components/input-controls/RHFRating`
  },
  rhfRadioGroup: {
    title: 'RHFRadioGroup',
    href: `${ENV_VARS.DOCS_URL}components/input-controls/RHFRadioGroup`
  },
  rhfDatePicker: {
    title: 'RHFDatePicker',
    href: `${ENV_VARS.DOCS_URL}components/pickers/RHFDatePicker`
  },
  rhfTimePicker: {
    title: 'RHFTimePicker',
    href: `${ENV_VARS.DOCS_URL}components/pickers/RHFTimePicker`
  },
  rhfDateTimePicker: {
    title: 'RHFDateTimePicker',
    href: `${ENV_VARS.DOCS_URL}components/pickers/RHFDateTimePicker`
  },
  rhfColorPicker: {
    title: 'RHFColorPicker',
    href: `${ENV_VARS.DOCS_URL}components/miscellaneous/RHFColorPicker`
  },
  rhfRichTextEditor: {
    title: 'RHFRichTextEditor',
    href: `${ENV_VARS.DOCS_URL}components/miscellaneous/RHFRichTextEditor`
  }
};
