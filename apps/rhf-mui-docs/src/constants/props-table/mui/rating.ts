import type { PropsInfo, VersionProps } from '@/types';
import { resolveProp } from '@/utils';
import PropsDescription from '../descriptions/props';
import LegacyPropsDescription from '../descriptions/legacy-props';

/** Props reference rows for `RHFRating`. */
const ratingRows = ({
  docsVersion,
  muiVersion,
  v1,
  v4AndAbove
}: VersionProps): PropsInfo[] => {
  const args = { docsVersion, muiVersion };

  return [
    resolveProp(PropsDescription.fieldName, args),
    resolveProp(PropsDescription.control, args),
    ...(!v1
      ? [resolveProp(PropsDescription.registerOptions, args), resolveProp(PropsDescription.required, args)]
      : []),
    ...(!v1
      ? [
        ...(v4AndAbove ? [resolveProp(PropsDescription.customOnChange_Rating, args)] : []),
        v4AndAbove
          ? resolveProp(PropsDescription.onValueChange_Rating, args)
          : resolveProp(LegacyPropsDescription.onValueChange_Rating_v2_v3, args),
        resolveProp(PropsDescription.label, args),
        resolveProp(PropsDescription.showLabelAboveFormField_Default, args)
      ]
      : [
        resolveProp(LegacyPropsDescription.onValueChange_Rating_v1, args),
        resolveProp(LegacyPropsDescription.label_v1, args),
        resolveProp(PropsDescription.showLabelAboveFormField, args)
      ]),
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

export default ratingRows;
