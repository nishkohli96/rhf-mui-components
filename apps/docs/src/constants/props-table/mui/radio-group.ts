import type { PropsInfo, VersionProps } from '@/types';
import { resolveProp } from '@/utils';
import PropsDescription from '../descriptions/props';
import LegacyPropsDescription from '../descriptions/legacy-props';

/** Props reference rows for `RHFRadioGroup`. */
const radioGroupRows = ({ docsVersion, muiVersion, v1, v4AndAbove }: VersionProps): PropsInfo[] => {
  const args = { docsVersion, muiVersion };
  const onValueChange = v4AndAbove
    ? PropsDescription.onValueChange_RadioGroup
    : LegacyPropsDescription.onValueChange_RadioGroup_v2_v3;

  const onValueChange_v1: PropsInfo = {
    name: 'onValueChange',
    description: 'Callback function triggered when a radio option is selected.',
    type: '(e: ChangeEvent<HTMLInputElement>, newValue: string) => void'
  };

  return [
    resolveProp(PropsDescription.fieldName, args),
    resolveProp(PropsDescription.control, args),
    ...(!v1 ? [resolveProp(PropsDescription.registerOptions, args)] : []),
    resolveProp(PropsDescription.options_StrOrObj, args),
    resolveProp(PropsDescription.labelKey, args),
    resolveProp(PropsDescription.valueKey, args),
    ...(!v1 ? [resolveProp(PropsDescription.required, args)] : []),
    ...(!v1
      ? [
        ...(v4AndAbove ? [resolveProp(PropsDescription.customOnChange_RadioGroup, args)] : []),
        resolveProp(onValueChange, args),
        resolveProp(PropsDescription.disabled, args),
        ...(v4AndAbove
          ? [
            resolveProp(PropsDescription.renderOptionLabel, args),
            resolveProp(PropsDescription.getOptionDisabled, args)
          ]
          : []),
        resolveProp(PropsDescription.label, args)
      ]
      : [
        onValueChange_v1,
        resolveProp(LegacyPropsDescription.label_v1, args)
      ]),
    resolveProp(PropsDescription.showLabelAboveFormField_Default, args),
    resolveProp(PropsDescription.formLabelProps, args),
    resolveProp(PropsDescription.radioProps, args),
    resolveProp(PropsDescription.formControlLabelProps, args),
    ...(v4AndAbove
      ? [resolveProp(PropsDescription.renderError, args)]
      : [resolveProp(LegacyPropsDescription.errorMessage, args)]),
    resolveProp(PropsDescription.hideErrorMessage, args),
    resolveProp(PropsDescription.helperText, args),
    resolveProp(PropsDescription.formHelperTextProps, args),
    ...(v4AndAbove ? [resolveProp(PropsDescription.customIds, args)] : [])
  ];
};

export default radioGroupRows;
