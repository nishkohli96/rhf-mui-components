import type { PropsInfo, VersionProps } from '@/types';
import { resolveProp } from '@/utils';
import PropsDescription from '../descriptions/props';
import LegacyPropsDescription from '../descriptions/legacy-props';

/** Props reference rows for `RHFPasswordInput`. */
const passwordInputRows = ({
  docsVersion,
  muiVersion,
  v1,
  v3AndAbove,
  v4AndAbove
}: VersionProps): PropsInfo[] => {
  const args = { docsVersion, muiVersion };
  const binding = !v1 ? PropsDescription.control : LegacyPropsDescription.register;

  let valueChange;
  if (v4AndAbove) {
    valueChange = PropsDescription.onValueChange_Inputs;
  } else if (v1) {
    valueChange = LegacyPropsDescription.onValueChange_Default_v1;
  } else {
    valueChange = LegacyPropsDescription.onValueChange_Inputs_v2_v3;
  }

  let readOnlyAndIconButtonPropsRows: PropsInfo[] = [];
  if (v4AndAbove) {
    readOnlyAndIconButtonPropsRows = [
      resolveProp(PropsDescription.readOnly_PasswordInput, args),
      resolveProp(PropsDescription.iconButtonProps_PasswordInput, args)
    ];
  } else if (v3AndAbove) {
    readOnlyAndIconButtonPropsRows = [
      resolveProp(LegacyPropsDescription.iconButtonProps_PasswordInput_v3, args),
      resolveProp(LegacyPropsDescription.readOnly_PasswordInput_v3, args)
    ];
  }

  return [
    resolveProp(PropsDescription.fieldName, args),
    resolveProp(binding, args),
    resolveProp(PropsDescription.registerOptions, args),
    ...(v4AndAbove ? [resolveProp(PropsDescription.customOnChange_Inputs, args)] : []),
    resolveProp(valueChange, args),
    resolveProp(PropsDescription.showPasswordIcon, args),
    resolveProp(PropsDescription.hidePasswordIcon, args),
    ...readOnlyAndIconButtonPropsRows,
    resolveProp(PropsDescription.label, args),
    resolveProp(PropsDescription.showLabelAboveFormField, args),
    resolveProp(PropsDescription.formLabelProps, args),
    ...(v4AndAbove
      ? [resolveProp(PropsDescription.hideLabel, args)]
      : []),
    ...(v4AndAbove
      ? [resolveProp(PropsDescription.renderError, args)]
      : [resolveProp(LegacyPropsDescription.errorMessage, args)]),
    resolveProp(PropsDescription.hideErrorMessage, args),
    resolveProp(PropsDescription.helperText, args),
    resolveProp(PropsDescription.formHelperTextProps, args),
    ...(v4AndAbove ? [resolveProp(PropsDescription.customIds, args)] : [])
  ];
};

export default passwordInputRows;
