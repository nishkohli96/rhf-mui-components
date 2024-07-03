import { OptionType, KeyValueOption } from '../types';
import { generateLabelValueErrMsg } from '../utils';

export function isStrNumArray(arr: OptionType[]): boolean {
  return arr.every((el) => typeof el === 'number' || typeof el === 'string');
}

export function validateArray(
  formElementName: string,
  options: OptionType[],
  labelKey?: string,
  valueKey?: string,
) {
  const isScalarArr = isStrNumArray(options);
  if (!isScalarArr && (!labelKey || !valueKey)) {
    throw new Error(generateLabelValueErrMsg(formElementName));
  }
}

export function isKeyValueOption(
  option: string | number | KeyValueOption,
  labelKey?: string,
  valueKey?: string,
): option is KeyValueOption {
  return (
    typeof option === 'object' &&
    `${labelKey}` in option &&
    `${valueKey}` in option
  );
}

export function areAllKeyValueOptions(
  options: OptionType[],
  labelKey?: string,
  valueKey?: string,
): options is KeyValueOption[] {
  return options.every((option) =>
    isKeyValueOption(option, labelKey, valueKey),
  );
}

/* Validation to check if labelKey and valueKey exist in options */
export function isLabelValueKeyDefined(
  options: KeyValueOption[],
  labelKey?: string,
  valueKey?: string,
) {
  const errMsg =
    'Provide appropriate "labelKey" & "valueKey" keys if providing an array of objects as options';
  if (!labelKey || !valueKey) {
    throw new Error(errMsg);
  }

  options.forEach((option, idx) => {
    if (!(labelKey in option)) {
      throw new Error(
        `Invalid labelKey "${String(labelKey)}" at option index ${idx}`,
      );
    }
    if (!(valueKey in option)) {
      throw new Error(
        `Invalid valueKey "${String(valueKey)}" at option index ${idx}`,
      );
    }
  });
}
