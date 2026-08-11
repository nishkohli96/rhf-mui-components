import type { PropsInfo, VersionProps } from '@/types';
import { resolveProp } from '@/utils';
import PropsDescription from '../descriptions/props';
import LegacyPropsDescription from '../descriptions/legacy-props';

/** Props reference rows for `RHFPhoneInput`. Added in v2. */
const phoneInputRows = ({
  docsVersion,
  muiVersion,
  v2,
  v3AndAbove,
  v4AndAbove
}: VersionProps): PropsInfo[] => {
  const args = { docsVersion, muiVersion };
  const valueChangeProps = v4AndAbove
    ? [
      resolveProp(PropsDescription.customOnChange_PhoneInput, args),
      resolveProp(PropsDescription.onValueChange_PhoneInput, args),
    ]
    : [resolveProp(LegacyPropsDescription.onValueChange_PhoneInput_v2_v3, args)];

  let countrySelectPropsRow: PropsInfo[] = [];
  if (v4AndAbove) {
    countrySelectPropsRow = [resolveProp(PropsDescription.countrySelectProps, args)];
  } else if (v3AndAbove) {
    countrySelectPropsRow = [resolveProp(LegacyPropsDescription.countrySelectProps_v3, args)];
  }

  return [
    resolveProp(PropsDescription.fieldName, args),
    resolveProp(PropsDescription.control, args),
    resolveProp(PropsDescription.registerOptions, args),
    ...(!v4AndAbove
      ? [resolveProp(LegacyPropsDescription.value_PhoneInput_v2_v3, args)]
      : []
    ),
    ...(!v2
      ? [...valueChangeProps]
      : []
    ),
    ...countrySelectPropsRow,
    ...(v4AndAbove
      ? [resolveProp(PropsDescription.searchCountryProps, args)]
      : []
    ),
    ...(!v2
      ? [resolveProp(PropsDescription.label, args)]
      : [resolveProp(LegacyPropsDescription.label_v1, args)]),
    resolveProp(PropsDescription.showLabelAboveFormField, args),
    resolveProp(PropsDescription.formLabelProps, args),
    ...(v4AndAbove ? [resolveProp(PropsDescription.hideLabel, args)] : []),
    ...(!v2 ? [resolveProp(PropsDescription.required, args)] : []),
    ...(v4AndAbove
      ? [resolveProp(PropsDescription.renderError, args)]
      : [resolveProp(LegacyPropsDescription.errorMessage, args)]),
    resolveProp(PropsDescription.hideErrorMessage, args),
    resolveProp(PropsDescription.helperText, args),
    resolveProp(PropsDescription.formHelperTextProps, args),
    ...(v4AndAbove
      ? [
        resolveProp(PropsDescription.phoneInputProps, args),
        resolveProp(PropsDescription.customIds, args)
      ]
      : [resolveProp(LegacyPropsDescription.phoneInputProps_v2_v3, args)])
  ];
};

export default phoneInputRows;
