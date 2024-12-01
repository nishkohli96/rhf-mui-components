import { StringOrNumber, OptionType, KeyValueOption } from '@/types';
import { generateLabelValueErrMsg } from '@/utils';

function isStrNumArray(arr: OptionType[]): boolean {
  return arr.every(el => typeof el === 'number' || typeof el === 'string');
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


