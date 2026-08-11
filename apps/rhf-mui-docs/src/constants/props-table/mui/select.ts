import type { PropsInfo, VersionProps } from '@/types';
import { resolveProp } from '@/utils';
import PropsDescription from '../descriptions/props';
import LegacyPropsDescription from '../descriptions/legacy-props';

/** Props reference rows for `RHFSelect`. */
const selectRows = ({
  docsVersion,
  muiVersion,
  v1,
  v3AndAbove,
  v4AndAbove
}: VersionProps): PropsInfo[] => {
  const args = { docsVersion, muiVersion };
  const binding = !v1 ? PropsDescription.control : LegacyPropsDescription.register;

  let onValueChange;
  if (v4AndAbove) {
    onValueChange = PropsDescription.onValueChange_Select;
  } else if (v1) {
    onValueChange = LegacyPropsDescription.onValueChange_Select_v1;
  } else {
    onValueChange = LegacyPropsDescription.onValueChange_Select_v2_v3;
  }

  let menuItemPropsRow: PropsInfo[] = [];
  if (v4AndAbove) {
    menuItemPropsRow = [resolveProp(PropsDescription.menuItemProps_Select, args)];
  } else if (v3AndAbove) {
    menuItemPropsRow = [resolveProp(LegacyPropsDescription.menuItemProps_Select_v3, args)];
  }

  let inputLabelPropsRow: PropsInfo[] = [];
  if (v4AndAbove) {
    inputLabelPropsRow = [resolveProp(PropsDescription.inputLabelProps_Select, args)];
  } else if (v3AndAbove) {
    inputLabelPropsRow = [resolveProp(LegacyPropsDescription.inputLabelProps_Select_v3, args)];
  }

  return [
    resolveProp(PropsDescription.fieldName, args),
    resolveProp(binding, args),
    resolveProp(PropsDescription.registerOptions, args),
    resolveProp(PropsDescription.options, args),
    resolveProp(PropsDescription.labelKey, args),
    resolveProp(PropsDescription.valueKey, args),
    resolveProp(PropsDescription.multiple, args),
    ...(v4AndAbove
      ? [
        resolveProp(PropsDescription.customOnChange_Select, args)
      ]
      : []),
    resolveProp(onValueChange, args),
    ...(v4AndAbove
      ? [
        resolveProp(PropsDescription.renderOptionLabel, args),
        resolveProp(PropsDescription.getOptionDisabled, args)
      ]
      : []),
    ...(v1 ? [resolveProp(LegacyPropsDescription.defaultValue, args)] : []),
    ...menuItemPropsRow,
    resolveProp(PropsDescription.showDefaultOption, args),
    resolveProp(PropsDescription.defaultOptionText, args),
    resolveProp(PropsDescription.label, args),
    ...inputLabelPropsRow,
    resolveProp(PropsDescription.showLabelAboveFormField, args),
    resolveProp(PropsDescription.formLabelProps, args),
    ...(v4AndAbove ? [resolveProp(PropsDescription.hideLabel, args)] : []),
    ...(v3AndAbove ? [resolveProp(PropsDescription.placeholder_Select, args)] : []),
    ...(v4AndAbove
      ? [resolveProp(PropsDescription.renderError, args)]
      : [resolveProp(LegacyPropsDescription.errorMessage, args)]),
    resolveProp(PropsDescription.hideErrorMessage, args),
    resolveProp(PropsDescription.helperText, args),
    resolveProp(PropsDescription.formHelperTextProps, args),
    ...(v4AndAbove ? [resolveProp(PropsDescription.customIds, args)] : [])
  ];
};

export default selectRows;
