import type { PropsInfo, PropsDescriptionArgs } from '@/types';
import { resolveProp } from '@/utils';
import { PropsDescription as P } from '../descriptions/latest';

/**
 * Every picker family ships four variants — responsive, desktop, mobile and
 * static — that all share one props surface. Only the `onValueChange`
 * description differs between families. (The static variant differs slightly
 * in behavior for `fieldName` and `showLabelAboveFormField`; that's called
 * out inline on the doc page rather than with a separate row set.)
 */
export const pickerRows = (onValueChange: PropsInfo) => (args: PropsDescriptionArgs): PropsInfo[] => [
  P.fieldName,
  P.value_Picker,
  onValueChange,
  P.required,
  P.label,
  resolveProp(P.showLabelAboveFormField, args),
  resolveProp(P.formLabelProps, args),
  P.hideLabel,
  P.errorMessage,
  P.renderError,
  P.hideErrorMessage,
  resolveProp(P.helperText, args),
  resolveProp(P.formHelperTextProps, args),
  resolveProp(P.pickerSlotProps, args),
  P.customIds
];
