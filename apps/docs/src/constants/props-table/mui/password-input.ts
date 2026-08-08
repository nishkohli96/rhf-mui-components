import type { PropsInfo, PropsDescriptionArgs } from '@/types';
import { resolveProp } from '@/utils';
import PropsDescription from '../descriptions/props';
import LegacyPropsDescription from '../descriptions/legacy-props';

type PasswordInputRowsOptions = {
  v1?: boolean;
  v3AndAbove?: boolean;
  v4AndAbove?: boolean;
};

/** Props reference rows for `RHFPasswordInput`. */
const passwordInputRows = (
  args: PropsDescriptionArgs,
  { v1, v3AndAbove, v4AndAbove }: PasswordInputRowsOptions = {}
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
    resolveProp(PropsDescription.showLabelAboveFormField, args),
    resolveProp(PropsDescription.formLabelProps, args),
    ...(v4AndAbove
      ? [
        resolveProp(PropsDescription.hideLabel, args),
        PropsDescription.readOnly_PasswordInput
      ]
      : []),
    ...(v3AndAbove ? [LegacyPropsDescription.readOnly_PasswordInput_v3] : []),
    PropsDescription.showPasswordIcon,
    PropsDescription.hidePasswordIcon,
    ...(v4AndAbove
      ? [resolveProp(PropsDescription.iconButtonProps_PasswordInput, args)]
      : v3AndAbove
        ? [resolveProp(LegacyPropsDescription.iconButtonProps_PasswordInput_v3, args)]
        : []),
    ...(v4AndAbove
      ? [PropsDescription.renderError]
      : [resolveProp(LegacyPropsDescription.errorMessage, args)]),
    PropsDescription.hideErrorMessage,
    resolveProp(PropsDescription.helperText, args),
    resolveProp(PropsDescription.formHelperTextProps, args),
    ...(v4AndAbove ? [PropsDescription.customIds] : [])
  ];
};

export default passwordInputRows;
