import type { PropsInfo, VersionProps } from '@/types';
import { resolveProp } from '@/utils';
import PropsDescription from '../descriptions/props';
import LegacyPropsDescription from '../descriptions/legacy-props';

/** Props reference rows for `RHFCheckboxGroup`. */
const checkboxGroupRows = ({ docsVersion, muiVersion, v1, v4AndAbove }: VersionProps): PropsInfo[] => {
  const args = { docsVersion, muiVersion };
  const base = [
    resolveProp(PropsDescription.fieldName, args),
    resolveProp(PropsDescription.control, args)
  ];

  if (v1) {
    return [
      ...base,
      resolveProp(PropsDescription.options_StrOrObj, args),
      resolveProp(PropsDescription.labelKey, args),
      resolveProp(PropsDescription.valueKey, args),
      resolveProp(LegacyPropsDescription.onValueChange_CheckboxGroup_v1, args),
      resolveProp(LegacyPropsDescription.label_v1, args),
      resolveProp(PropsDescription.showLabelAboveFormField, args),
      resolveProp(PropsDescription.formLabelProps, args),
      resolveProp(PropsDescription.checkboxProps, args),
      resolveProp(PropsDescription.formControlLabelProps, args),
      resolveProp(PropsDescription.helperText, args),
      resolveProp(LegacyPropsDescription.errorMessage, args),
      resolveProp(PropsDescription.hideErrorMessage, args),
      resolveProp(PropsDescription.formHelperTextProps, args)
    ];
  }

  return [
    ...base,
    resolveProp(PropsDescription.registerOptions, args),
    resolveProp(PropsDescription.options_StrOrObj, args),
    resolveProp(PropsDescription.labelKey, args),
    resolveProp(PropsDescription.valueKey, args),
    resolveProp(PropsDescription.required, args),
    ...(v4AndAbove ? [resolveProp(PropsDescription.customOnChange_CheckboxGroup, args)] : []),
    ...(v4AndAbove
      ? [resolveProp(PropsDescription.onValueChange_CheckboxGroup, args)]
      : [resolveProp(LegacyPropsDescription.onValueChange_CheckboxGroup_v2_v3, args)]),
    resolveProp(PropsDescription.disabled, args),
    ...(v4AndAbove
      ? [
        resolveProp(PropsDescription.renderOptionLabel, args),
        resolveProp(PropsDescription.getOptionDisabled, args)
      ]
      : []),
    resolveProp(PropsDescription.label, args),
    resolveProp(PropsDescription.showLabelAboveFormField_Default, args),
    resolveProp(PropsDescription.formLabelProps, args),
    resolveProp(PropsDescription.checkboxProps, args),
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

export default checkboxGroupRows;
