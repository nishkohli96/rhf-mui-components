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

export function normalizeSelectValue<
  Option,
  ValueKey extends string | undefined
>(
  raw: string | string[],
  options: Option[],
  labelKey?: string,
  valueKey?: ValueKey
): OptionValue<Option, ValueKey> | OptionValue<Option, ValueKey>[] {
  const normalizeOne = (val: string) => {
    const match = options.find(op =>
      isKeyValueOption(op, labelKey, valueKey)
        ? `${(op as Record<string, StringOrNumber>)[valueKey!]}` === val
        : `${op}` === val);

    if (!match) {
      return val as OptionValue<Option, ValueKey>;
    }

    if (isKeyValueOption(match, labelKey, valueKey)) {
      return (match as Record<string, StringOrNumber>)[
        valueKey!
      ] as OptionValue<Option, ValueKey>;
    }

    return match as OptionValue<Option, ValueKey>;
  };

  return Array.isArray(raw)
    ? raw.map(normalizeOne)
    : normalizeOne(raw);
}
