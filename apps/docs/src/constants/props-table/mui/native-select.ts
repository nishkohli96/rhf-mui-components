import type { PropsInfo, PropsDescriptionArgs } from '@/types';
import { resolveProp } from '@/utils';
import { PropsDescription as P } from '../descriptions/latest';

/** Props reference rows for `MUINativeSelect`. */
const nativeSelectRows = (args: PropsDescriptionArgs): PropsInfo[] => [
  P.fieldName,
  P.options,
  P.labelKey,
  P.valueKey,
  P.value_NativeSelect,
  P.onValueChange_NativeSelect,
  P.getOptionDisabled,
  P.label,
  P.showLabelAboveFormField_Default,
  resolveProp(P.formLabelProps, args),
  P.hideLabel,
  P.required,
  P.errorMessage,
  P.renderError,
  P.hideErrorMessage,
  resolveProp(P.helperText, args),
  resolveProp(P.formHelperTextProps, args),
  P.customIds
];

export default nativeSelectRows;
