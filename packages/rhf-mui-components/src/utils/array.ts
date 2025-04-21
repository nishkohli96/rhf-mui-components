import type { StrNumObjOption } from '@/types';
import { generateLabelValueErrMsg } from '@/utils';

function isStrNumArray(arr: StrNumObjOption[]): boolean {
  return arr.every(el => typeof el === 'number' || typeof el === 'string');
}

export function validateArray(
  formElementName: string,
  options: StrNumObjOption[],
  labelKey?: string,
  valueKey?: string,
) {
  if (!Array.isArray(options)) {
    throw new Error(`The "options" prop of ${formElementName} must be an array.`);
  }
  const isScalarArr = isStrNumArray(options);
  if (!isScalarArr && (!labelKey || !valueKey)) {
    throw new Error(generateLabelValueErrMsg(formElementName));
  }
}
