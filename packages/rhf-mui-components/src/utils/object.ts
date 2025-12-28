import type { StringOrNumber, KeyValueOption, OptionPrimitive, OptionValue } from '@/types';

export function isKeyValueOption<LK extends string, VK extends string>(
  option: unknown,
  labelKey?: LK,
  valueKey?: VK
): option is Record<LK, string> & Record<VK, StringOrNumber> {
  if (typeof option !== 'object' || option === null || !labelKey || !valueKey) {
    return false;
  }

  const obj = option as Record<string, unknown>;

  return (
    typeof obj[labelKey] === 'string'
    && (typeof obj[valueKey] === 'string' || typeof obj[valueKey] === 'number')
  );
}


export function generateLabelValueErrMsg(formElement: string) {
  return `Provide "labelKey" & "valueKey" props in ${formElement} if options are an array of objects.`;
}

export function generateDateAdapterErrMsg(formElement: string) {
  return `Missing "dateAdapter" for ${formElement}. Please wrap your component tree with "ConfigProvider dateAdapter={...}>" to configure it.`;
}

/**
 * Utility to coerce string values from form elements to either string
 * or number based on the example value.
 */
export function coerceValue<V extends OptionPrimitive>(
  raw: string,
  example: V
): V {
  return typeof example === 'number'
    ? (Number(raw) as V)
    : (raw as V);
}


export function getOptionValue<
  Option,
  VK extends string | undefined
>(
  option: Option,
  valueKey?: VK
): OptionValue<Option, VK> {
  if (
    valueKey
    && typeof option === 'object'
    && option !== null
  ) {
    return (option as Record<string, unknown>)[valueKey] as OptionValue<Option, VK>;
  }

  return option as OptionValue<Option, VK>;
}
