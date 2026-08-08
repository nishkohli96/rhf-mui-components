import type { PropsInfo, PropsDescriptionArgs } from '@/types';
import { resolveProp } from '@/utils';
import PropsDescription from '../descriptions/props';
import LegacyPropsDescription from '../descriptions/legacy-props';

type TextFieldRowsOptions = {
  v1?: boolean;
  v4AndAbove?: boolean;
};

/** Props reference rows for `RHFTextField`. */
const textFieldRows = (
  args: PropsDescriptionArgs,
  { v1, v4AndAbove }: TextFieldRowsOptions = {}
): PropsInfo[] => {
  const binding = !v1 ? PropsDescription.control : LegacyPropsDescription.register;

  let valueChange;
  if (v4AndAbove) {
    valueChange = PropsDescription.onValueChange_Inputs;
  } else if (v1) {
    valueChange = LegacyPropsDescription.onValueChange_Default_v1;
  } else {
    valueChange = LegacyPropsDescription.onValueChange_Inputs_v2_v3;
  }

  return [
    PropsDescription.fieldName,
    binding,
    PropsDescription.registerOptions,
    ...(v4AndAbove ? [PropsDescription.customOnChange_Inputs] : []),
    valueChange,
    resolveProp(PropsDescription.label, args),
    resolveProp(PropsDescription.showLabelAboveFormField, args),
    resolveProp(PropsDescription.formLabelProps, args),
    ...(v4AndAbove
      ? [
        resolveProp(PropsDescription.hideLabel, args),
        PropsDescription.renderError
      ]
      : [resolveProp(LegacyPropsDescription.errorMessage, args)]),
    PropsDescription.hideErrorMessage,
    resolveProp(PropsDescription.helperText, args),
    resolveProp(PropsDescription.formHelperTextProps, args),
    ...(v4AndAbove ? [PropsDescription.customIds] : [])
  ];
};

export default textFieldRows;
