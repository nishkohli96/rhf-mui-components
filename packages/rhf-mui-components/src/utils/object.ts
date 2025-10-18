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
  return `Provide "labelKey" & "valueKey" props in ${formElement} if options are an array of objects.`;
}

export function generateDateAdapterErrMsg(formElement: string) {
  return `Missing "dateAdapter" for ${formElement}. Please wrap your component tree with "ConfigProvider dateAdapter={...}>" to use this component.`;
}
