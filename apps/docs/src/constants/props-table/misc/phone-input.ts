import type { PropsInfo, VersionProps } from '@/types';
import { resolveProp } from '@/utils';
import { PropsDescription as P } from '../descriptions/latest';
import { PropsDescription_v1 as Pv1 } from '../descriptions/v1';

/** Props reference rows for `MUIPhoneInput`. */
const phoneInputRows = ({
  muiVersion,
  docsVersion
}: VersionProps): PropsInfo[] => {
  const args = { docsVersion, muiVersion };
  const v1 = docsVersion === 1;
  return [
    P.fieldName,
    P.value_PhoneInput,
    P.onValueChange_PhoneInput,
    P.phoneInputProps,
    ...(!v1
      ? [
        resolveProp(P.searchCountryProps, args),
        resolveProp(P.countrySelectProps, args)
      ]
      : [
        resolveProp(Pv1.searchCountryProps, args),
        resolveProp(Pv1.countrySelectProps, args)
      ]
    ),
    P.required,
    P.errorMessage,
    P.renderError,
    P.hideErrorMessage,
    resolveProp(P.helperText, args),
    resolveProp(P.showLabelAboveFormField, args),
    P.hideLabel,
    resolveProp(P.formLabelProps, args),
    resolveProp(P.formHelperTextProps, args),
    P.customIds
  ];
};

export default phoneInputRows;
