import type { OptionPrimitive } from '@/types';
import { generateLabelValueErrMsg } from '@/utils';

function isPrimitiveArray(
  options: readonly unknown[]
): options is OptionPrimitive[] {
  return options.every(
    opt => typeof opt === 'string' || typeof opt === 'number'
  );
}

export function validateArray<
  Option,
  LabelKey extends string | undefined,
  ValueKey extends string | undefined
>(
  formElementName: string,
  options: Option[],
  labelKey?: LabelKey,
  valueKey?: ValueKey
): void {
  if (!Array.isArray(options)) {
    throw new Error(
      `The "options" prop of ${formElementName} must be an array.`
    );
  }
  const isPrimitive = isPrimitiveArray(options as unknown[]);
  if (!isPrimitive && (!labelKey || !valueKey)) {
    throw new Error(generateLabelValueErrMsg(formElementName));
  }
}
