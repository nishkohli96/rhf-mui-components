import type { PropsInfo, VersionProps } from '@/types';
import { resolveProp } from '@/utils';
import PropsDescription from '../descriptions/props';
import LegacyPropsDescription from '../descriptions/legacy-props';

/** Props reference rows for `RHFTextField`. */
const textFieldRows = ({
  docsVersion,
  muiVersion,
  v1,
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

  return [
    resolveProp(PropsDescription.fieldName, args),
    resolveProp(binding, args),
    resolveProp(PropsDescription.registerOptions, args),
    ...(v4AndAbove ? [resolveProp(PropsDescription.customOnChange_Inputs, args)] : []),
    resolveProp(valueChange, args),
    resolveProp(PropsDescription.label, args),
    resolveProp(PropsDescription.showLabelAboveFormField, args),
    resolveProp(PropsDescription.formLabelProps, args),
    ...(v4AndAbove
      ? [
        resolveProp(PropsDescription.hideLabel, args),
        resolveProp(PropsDescription.renderError, args)
      ]
      : [resolveProp(LegacyPropsDescription.errorMessage, args)]),
    resolveProp(PropsDescription.hideErrorMessage, args),
    resolveProp(PropsDescription.helperText, args),
    resolveProp(PropsDescription.formHelperTextProps, args),
    ...(v4AndAbove ? [resolveProp(PropsDescription.customIds, args)] : [])
  ];
};

export default textFieldRows;
