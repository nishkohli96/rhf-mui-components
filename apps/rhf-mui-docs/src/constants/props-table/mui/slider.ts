import type { PropsInfo, VersionProps } from '@/types';
import { resolveProp } from '@/utils';
import PropsDescription from '../descriptions/props';
import LegacyPropsDescription from '../descriptions/legacy-props';

/** Props reference rows for `RHFSlider`. */
const sliderRows = ({
  docsVersion,
  muiVersion,
  v1,
  v4AndAbove
}: VersionProps): PropsInfo[] => {
  const args = { docsVersion, muiVersion };
  const binding = v1 ? LegacyPropsDescription.register : PropsDescription.control;

  return [
    resolveProp(PropsDescription.fieldName, args),
    resolveProp(binding, args),
    resolveProp(PropsDescription.registerOptions, args),
    ...(!v1
      ? [
        ...(v4AndAbove ? [resolveProp(PropsDescription.customOnChange_Slider, args)] : []),
        v4AndAbove
          ? resolveProp(PropsDescription.onValueChange_Slider, args)
          : resolveProp(LegacyPropsDescription.onValueChange_Slider_v2_v3, args),
        resolveProp(PropsDescription.label, args)
      ]
      : [
        resolveProp(LegacyPropsDescription.defaultValue_Slider, args),
        resolveProp(LegacyPropsDescription.onValueChange_Slider_v1, args),
        resolveProp(LegacyPropsDescription.label_v1, args)
      ]),
    resolveProp(PropsDescription.showLabelAboveFormField_Default, args),
    resolveProp(PropsDescription.formLabelProps, args),
    ...(v4AndAbove ? [resolveProp(PropsDescription.hideLabel, args)] : []),
    ...(!v1 ? [resolveProp(PropsDescription.required, args)] : []),
    ...(v4AndAbove
      ? [resolveProp(PropsDescription.renderError, args)]
      : [resolveProp(LegacyPropsDescription.errorMessage, args)]),
    resolveProp(PropsDescription.hideErrorMessage, args),
    resolveProp(PropsDescription.helperText, args),
    resolveProp(PropsDescription.formHelperTextProps, args),
    ...(v4AndAbove ? [resolveProp(PropsDescription.customIds, args)] : [])
  ];
};

export default sliderRows;
