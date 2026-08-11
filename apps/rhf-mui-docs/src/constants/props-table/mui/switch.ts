import type { PropsInfo, VersionProps } from '@/types';
import { resolveProp } from '@/utils';
import PropsDescription from '../descriptions/props';
import LegacyPropsDescription from '../descriptions/legacy-props';

/** Props reference rows for `RHFSwitch`. */
const switchRows = ({
  docsVersion,
  muiVersion,
  v1,
  v4AndAbove
}: VersionProps): PropsInfo[] => {
  const args = { docsVersion, muiVersion };

  return [
    resolveProp(PropsDescription.fieldName, args),
    resolveProp(PropsDescription.control, args),
    ...(!v1 ? [resolveProp(PropsDescription.registerOptions, args)] : []),
    ...(!v1
      ? [
        ...(v4AndAbove ? [resolveProp(PropsDescription.customOnChange_Cbx_Switch, args)] : []),
        v4AndAbove
          ? resolveProp(PropsDescription.onValueChange_Switch, args)
          : resolveProp(LegacyPropsDescription.onValueChange_Switch_v2_v3, args),
        resolveProp(PropsDescription.label, args)
      ]
      : [resolveProp(LegacyPropsDescription.label_v1, args)]),
    resolveProp(PropsDescription.formControlLabelProps, args),
    ...(v4AndAbove ? [resolveProp(PropsDescription.hideLabel, args)] : []),
    ...(!v1
      ? [
        ...(v4AndAbove
          ? [resolveProp(PropsDescription.renderError, args)]
          : [resolveProp(LegacyPropsDescription.errorMessage, args)]),
        resolveProp(PropsDescription.hideErrorMessage, args),
        resolveProp(PropsDescription.helperText, args),
        resolveProp(PropsDescription.formHelperTextProps, args)
      ]
      : []),
    ...(v4AndAbove ? [resolveProp(PropsDescription.customIds, args)] : [])
  ];
};

export default switchRows;
