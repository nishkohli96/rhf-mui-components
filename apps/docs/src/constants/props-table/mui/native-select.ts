import type { PropsInfo, VersionProps } from '@/types';
import { resolveProp } from '@/utils';
import PropsDescription from '../descriptions/props';
import LegacyPropsDescription from '../descriptions/legacy-props';

/** Props reference rows for `RHFNativeSelect`. */
const nativeSelectRows = ({
  docsVersion,
  muiVersion,
  v1,
  v4AndAbove
}: VersionProps): PropsInfo[] => {
  const args = { docsVersion, muiVersion };
  const binding = !v1 ? PropsDescription.control : LegacyPropsDescription.register;

  let onValueChange;
  if (v4AndAbove) {
    onValueChange = PropsDescription.onValueChange_NativeSelect;
  } else if (v1) {
    onValueChange = LegacyPropsDescription.onValueChange_Default_v1;
  } else {
    onValueChange = LegacyPropsDescription.onValueChange_NativeSelect_v2_v3;
  }

  return [
    resolveProp(PropsDescription.fieldName, args),
    resolveProp(binding, args),
    resolveProp(PropsDescription.registerOptions, args),
    resolveProp(PropsDescription.options, args),
    resolveProp(PropsDescription.labelKey, args),
    resolveProp(PropsDescription.valueKey, args),
    ...(v4AndAbove
      ? [
        resolveProp(PropsDescription.customOnChange_NativeSelect, args)
      ]
      : []),
    resolveProp(onValueChange, args),
    ...(v4AndAbove
      ? [
        resolveProp(PropsDescription.renderOptionLabel, args),
        resolveProp(PropsDescription.getOptionDisabled, args)
      ]
      : []),
    ...(v1
      ? [
        resolveProp(PropsDescription.showDefaultOption, args),
        resolveProp(LegacyPropsDescription.defaultValue, args)
      ]
      : []),
    resolveProp(PropsDescription.defaultOptionText, args),
    ...(!v1
      ? [
        resolveProp(PropsDescription.label, args),
        resolveProp(PropsDescription.showLabelAboveFormField_Default, args),
        resolveProp(PropsDescription.formLabelProps, args),
        ...(v4AndAbove ? [resolveProp(PropsDescription.hideLabel, args)] : [])
      ]
      : [resolveProp(LegacyPropsDescription.label_v1, args)]),
    ...(v4AndAbove
      ? [resolveProp(PropsDescription.renderError, args)]
      : [resolveProp(LegacyPropsDescription.errorMessage, args)]),
    resolveProp(PropsDescription.hideErrorMessage, args),
    ...(!v1 ? [resolveProp(PropsDescription.helperText, args)] : []),
    resolveProp(PropsDescription.formHelperTextProps, args),
    ...(v4AndAbove ? [resolveProp(PropsDescription.customIds, args)] : [])
  ];
};

export default nativeSelectRows;
