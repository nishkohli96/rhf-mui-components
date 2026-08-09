import type { PropsInfo, VersionProps } from '@/types';
import { resolveProp } from '@/utils';
import PropsDescription from './descriptions/props';
import LegacyPropsDescription from './descriptions/legacy-props';

/** Props reference rows shown on the introduction page. */
const introductionPageRows = ({ docsVersion, muiVersion, v1, v4AndAbove }: VersionProps): PropsInfo[] => {
  const args = { docsVersion, muiVersion };

  return [
    resolveProp(PropsDescription.fieldName, args),
    ...(!v1 ? [] : [resolveProp(LegacyPropsDescription.register, args)]),
    resolveProp(PropsDescription.control, args),
    resolveProp(PropsDescription.registerOptions, args),
    ...(!v1
      ? [
        resolveProp(PropsDescription.required, args),
      ]
      : [resolveProp(LegacyPropsDescription.setValue, args)]
    ),
    ...(v4AndAbove ? [resolveProp(PropsDescription.customOnChange, args)] : []),
    resolveProp(PropsDescription.onValueChange, args),
    ...(!v1
      ? [
        resolveProp(PropsDescription.disabled, args),
        resolveProp(PropsDescription.label, args)
      ]
      : [resolveProp(LegacyPropsDescription.label_v1, args)]
    ),
    resolveProp(PropsDescription.showLabelAboveFormField, args),
    resolveProp(PropsDescription.formLabelProps, args),
    resolveProp(PropsDescription.formControlLabelProps, args),
    ...(v4AndAbove ? [resolveProp(PropsDescription.hideLabel, args)] : []),
    resolveProp(PropsDescription.helperText, args),
    ...(v4AndAbove ? [] : [resolveProp(LegacyPropsDescription.errorMessage, args)]),
    ...(v4AndAbove ? [resolveProp(PropsDescription.renderError, args)] : []),
    resolveProp(PropsDescription.hideErrorMessage, args),
    resolveProp(PropsDescription.formHelperTextProps, args),
    ...(v4AndAbove ? [resolveProp(PropsDescription.customIds, args)] : [])
  ];
};

export default introductionPageRows;
