import type { PropsInfo, PropsDescriptionArgs } from '@/types';
import { resolveProp } from '@/utils';
import { PropsDescription as P } from '../descriptions/latest';

/** Props reference rows for `MUISwitch`. */
const switchRows = (args: PropsDescriptionArgs): PropsInfo[] => [
  P.fieldName,
  P.value_Cbx_Switch,
  P.onValueChange_Cbx_Switch,
  P.label,
  resolveProp(P.formControlLabelProps, args),
  P.hideLabel,
  P.errorMessage,
  P.renderError,
  P.hideErrorMessage,
  resolveProp(P.helperText, args),
  resolveProp(P.formHelperTextProps, args),
  P.customIds
];

export default switchRows;
