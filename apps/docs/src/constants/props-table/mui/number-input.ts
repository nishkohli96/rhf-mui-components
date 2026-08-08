import type { PropsInfo, PropsDescriptionArgs } from '@/types';
import { resolveProp } from '@/utils';
import { PropsDescription as P } from '../descriptions/latest';

/** Props reference rows for `MUINumberInput`. */
const numberInputRows = (args: PropsDescriptionArgs): PropsInfo[] => [
  P.fieldName,
  P.value_NumberInput,
  P.onValueChange_NumberInput,
  P.nonNegative,
  P.onlyIntegers,
  P.maxDecimalPlaces,
  P.stepAmount,
  P.showMarkers,
  P.label,
  resolveProp(P.showLabelAboveFormField, args),
  resolveProp(P.formLabelProps, args),
  P.hideLabel,
  P.required,
  P.errorMessage,
  P.renderError,
  P.hideErrorMessage,
  resolveProp(P.formHelperTextProps, args),
  P.customIds
];

export default numberInputRows;
