import type { PropsInfo, VersionProps } from '@/types';
import { resolveProp } from '@/utils';
import PropsDescription from './descriptions/props';
import LegacyPropsDescription from './descriptions/legacy-props';

/** Props reference rows for `RHFTextField`. */
const introductionPageRows = ({ docsVersion, muiVersion, v1, v4AndAbove }: VersionProps): PropsInfo[] => {
  const args = { docsVersion, muiVersion };

  return [
    PropsDescription.fieldName,
    PropsDescription.control,
    ...(v1 ? [LegacyPropsDescription.register] : []),
    PropsDescription.registerOptions,
    ...(!v1
      ? [PropsDescription.required, PropsDescription.disabled]
      : [LegacyPropsDescription.setValue]
    ),
    ...(v4AndAbove ? [PropsDescription.customOnChange] : []),
    PropsDescription.onValueChange,
    ...(!v1 ? [resolveProp(PropsDescription.label, args)] : [LegacyPropsDescription.label_v1]),
    resolveProp(PropsDescription.showLabelAboveFormField, args),
    resolveProp(PropsDescription.formLabelProps, args),
    ...(v4AndAbove ? [resolveProp(PropsDescription.hideLabel, args)] : []),
    resolveProp(PropsDescription.helperText, args),
    ...(v4AndAbove ? [] : [resolveProp(LegacyPropsDescription.errorMessage, args)]),
    ...(v4AndAbove ? [PropsDescription.renderError] : []),
    PropsDescription.hideErrorMessage,
    resolveProp(PropsDescription.formHelperTextProps, args),
    ...(v4AndAbove ? [PropsDescription.customIds] : [])
  ];
};

export default introductionPageRows;
