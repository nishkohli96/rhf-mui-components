import { OptionType, KeyValueOption } from '../types';
import { generateLabelValueErrMsg } from '../utils';

function isStrNumArray(arr: OptionType[]): boolean {
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

