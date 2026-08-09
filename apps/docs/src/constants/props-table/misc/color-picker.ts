import type { PropsInfo, VersionProps } from '@/types';
import { resolveProp } from '@/utils';
import PropsDescription from '../descriptions/props';
import LegacyPropsDescription from '../descriptions/legacy-props';

/** Props reference rows for `RHFColorPicker`. */
const colorPickerRows = ({ docsVersion, muiVersion, v1, v4AndAbove }: VersionProps): PropsInfo[] => {
  const args = { docsVersion, muiVersion };

  const valueProps = !v1
    ? [
      resolveProp(PropsDescription.control, args),
      resolveProp(PropsDescription.registerOptions, args),
      ...(v4AndAbove ? [] : [resolveProp(LegacyPropsDescription.value_ColorPicker_v2_v3, args)]),
      resolveProp(PropsDescription.valueKey_ColorPicker, args),
      resolveProp(PropsDescription.defaultColor, args),
      resolveProp(PropsDescription.excludeAlpha, args),
      resolveProp(PropsDescription.required, args),
      resolveProp(PropsDescription.onValueChange_ColorPicker, args),
      ...(v4AndAbove ? [resolveProp(PropsDescription.customOnChange_ColorPicker, args)] : [])
    ]
    : [
      resolveProp(LegacyPropsDescription.value_ColorPicker_v1, args),
      resolveProp(LegacyPropsDescription.onValueChange_ColorPicker_v1, args)
    ];

  const labelProp = !v1
    ? resolveProp(PropsDescription.label, args)
    : resolveProp(LegacyPropsDescription.label_v1, args);

  return [
    resolveProp(PropsDescription.fieldName, args),
    ...valueProps,
    resolveProp(PropsDescription.disabled, args),
    labelProp,
    resolveProp(PropsDescription.showLabelAboveFormField_Default, args),
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

export default colorPickerRows;
