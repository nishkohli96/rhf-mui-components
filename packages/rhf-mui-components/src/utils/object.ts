import type { StringOrNumber, KeyValueOption } from '@/types';

export function isKeyValueOption(
  option: StringOrNumber | KeyValueOption,
  labelKey?: string,
  valueKey?: string
): option is KeyValueOption {
  if (typeof option !== 'object' || option === null) {
    return false;
  }
  if (!labelKey || !valueKey) {
    return false;
  }
  return labelKey in option && valueKey in option;
}

export function generateLabelValueErrMsg(formElement: string) {
  return `Missing "labelKey" and "valueKey" for ${formElement}. These props are required when options are arrays of objects.`;
}

export function generateDateAdapterErrMsg(formElement: string) {
  return `Missing "dateAdapter" for ${formElement}. Wrap your component tree with <ConfigProvider dateAdapter={...}> to enable date and time picker functionality.`;
}

