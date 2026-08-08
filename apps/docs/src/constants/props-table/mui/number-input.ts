import type { PropsInfo, PropsDescriptionArgs } from '@/types';
import { resolveProp } from '@/utils';
import PropsDescription from '../descriptions/props';
import LegacyPropsDescription from '../descriptions/legacy-props';

type NumberInputRowsOptions = {
  v4AndAbove?: boolean;
};

/** Props reference rows for `RHFNumberInput`. Added in v2.1 — no v1 rows. */
const numberInputRows = (
  args: PropsDescriptionArgs,
  { v4AndAbove }: NumberInputRowsOptions = {}
): PropsInfo[] => {
  const valueChange = resolveProp(
    v4AndAbove
      ? PropsDescription.onValueChange_Inputs
      : LegacyPropsDescription.onValueChange_Inputs_v2_v3,
    args
  );

  return [
    resolveProp(PropsDescription.fieldName, args),
    resolveProp(PropsDescription.control, args),
    resolveProp(PropsDescription.registerOptions, args),
    ...(v4AndAbove ? [resolveProp(PropsDescription.customOnChange_Inputs, args)] : []),
    valueChange,
    resolveProp(PropsDescription.label, args),
    resolveProp(PropsDescription.showLabelAboveFormField, args),
    resolveProp(PropsDescription.formLabelProps, args),
    ...(v4AndAbove
      ? [
        resolveProp(PropsDescription.hideLabel, args),
        resolveProp(PropsDescription.onlyIntegers, args),
        resolveProp(PropsDescription.nonNegative, args),
        resolveProp(PropsDescription.maxDecimalPlaces, args),
        resolveProp(PropsDescription.stepAmount, args)
      ]
      : []),
    resolveProp(PropsDescription.showMarkers, args),
    ...(v4AndAbove
      ? [resolveProp(PropsDescription.renderError, args)]
      : [resolveProp(LegacyPropsDescription.errorMessage, args)]),
    resolveProp(PropsDescription.hideErrorMessage, args),
    resolveProp(PropsDescription.helperText, args),
    resolveProp(PropsDescription.formHelperTextProps, args),
    ...(v4AndAbove ? [resolveProp(PropsDescription.customIds, args)] : [])
  ];
};

export default numberInputRows;
