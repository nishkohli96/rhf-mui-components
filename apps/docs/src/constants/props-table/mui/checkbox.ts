import type { PropsInfo, VersionProps } from '@/types';
import { resolveProp } from '@/utils';
import PropsDescription from '../descriptions/props';
import LegacyPropsDescription from '../descriptions/legacy-props';

/** Props reference rows for `RHFCheckbox`. */
const checkboxRows = ({ docsVersion, muiVersion, v1, v4AndAbove }: VersionProps): PropsInfo[] => {
  const args = { docsVersion, muiVersion };
  const onValueChange = v4AndAbove
    ? PropsDescription.onValueChange_Checkbox
    : LegacyPropsDescription.onValueChange_Checkbox_v2_v3;

  return [
    resolveProp(PropsDescription.fieldName, args),
    resolveProp(PropsDescription.control, args),
    ...(!v1 ? [resolveProp(PropsDescription.registerOptions, args)] : []),
    ...(v4AndAbove ? [resolveProp(PropsDescription.customOnChange_Cbx_Switch, args)] : []),
    ...(!v1
      ? [
        resolveProp(onValueChange, args),
        resolveProp(PropsDescription.label, args)
      ]
      : [
        resolveProp(LegacyPropsDescription.onValueChange_Checkbox_v1, args),
        resolveProp(LegacyPropsDescription.label_v1, args)
      ]),
    resolveProp(PropsDescription.formControlLabelProps, args),
    ...(v4AndAbove ? [resolveProp(PropsDescription.hideLabel, args)] : []),
    ...(v4AndAbove
      ? [resolveProp(PropsDescription.renderError, args)]
      : [resolveProp(LegacyPropsDescription.errorMessage, args)]),
    resolveProp(PropsDescription.hideErrorMessage, args),
    resolveProp(PropsDescription.helperText, args),
    resolveProp(PropsDescription.formHelperTextProps, args),
    ...(v4AndAbove ? [resolveProp(PropsDescription.customIds, args)] : [])
  ];
};

export default checkboxRows;
