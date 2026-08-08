import type { PropsInfo, PropsDescriptionArgs } from '@/types';
import { resolveProp } from '@/utils';
import { PropsDescription as P } from '../descriptions/latest';

/** Props reference rows for `MUIColorPicker`. */
const colorPickerRows = (args: PropsDescriptionArgs): PropsInfo[] => [
  P.fieldName_NoName,
  P.valueKey_ColorPicker,
  P.value_ColorPicker,
  P.onValueChange_ColorPicker,
  P.defaultColor,
  P.excludeAlpha,
  P.hideAlpha,
  P.height_ColorPicker,
  P.hideInput_ColorPicker,
  P.required,
  P.label,
  P.showLabelAboveFormField_Default,
  P.hideLabel,
  resolveProp(P.formLabelProps, args),
  P.errorMessage,
  P.renderError,
  P.hideErrorMessage,
  resolveProp(P.helperText, args),
  resolveProp(P.formHelperTextProps, args),
  P.customIds
];

export default colorPickerRows;
