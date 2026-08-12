import type { PropsInfo, VersionProps } from '@/types';
import { resolveProp } from '@/utils';
import PropsDescription from '../descriptions/props';
import LegacyPropsDescription from '../descriptions/legacy-props';

/** Props reference rows for `RHFCountrySelect`. Added in v2 — no v1 rows. */
const countrySelectRows = ({
  docsVersion,
  muiVersion,
  v4AndAbove
}: VersionProps): PropsInfo[] => {
  const args = { docsVersion, muiVersion };
  const valueKey = v4AndAbove
    ? PropsDescription.valueKey_CountrySelect
    : LegacyPropsDescription.valueKey_CountrySelect_v2_v3;
  const onValueChange = v4AndAbove
    ? [
      resolveProp(PropsDescription.customOnChange_CountrySelect, args),
      resolveProp(PropsDescription.onValueChange_CountrySelect, args)
    ]
    : [resolveProp(LegacyPropsDescription.onValueChange_CountrySelect_v2_v3, args)];

  return [
    resolveProp(PropsDescription.fieldName, args),
    resolveProp(PropsDescription.control, args),
    resolveProp(PropsDescription.registerOptions, args),
    resolveProp(PropsDescription.countries, args),
    resolveProp(PropsDescription.preferredCountries, args),
    resolveProp(valueKey, args),
    resolveProp(PropsDescription.multiple_CountrySelect, args),
    ...onValueChange,
    resolveProp(PropsDescription.label, args),
    resolveProp(PropsDescription.showLabelAboveFormField, args),
    resolveProp(PropsDescription.formLabelProps, args),
    ...(v4AndAbove
      ? [
        resolveProp(PropsDescription.hideLabel, args),
        resolveProp(PropsDescription.renderOptionLabel_CountrySelect, args)
      ]
      : [resolveProp(PropsDescription.displayFlagOnSelect, args)]),
    resolveProp(PropsDescription.required, args),
    ...(v4AndAbove
      ? [resolveProp(PropsDescription.renderError, args)]
      : [resolveProp(LegacyPropsDescription.errorMessage, args)]),
    resolveProp(PropsDescription.hideErrorMessage, args),
    resolveProp(PropsDescription.helperText, args),
    resolveProp(PropsDescription.formHelperTextProps, args),
    resolveProp(PropsDescription.textFieldProps, args),
    resolveProp(PropsDescription.ChipProps_Autocomplete, args),
    ...(v4AndAbove ? [resolveProp(PropsDescription.customIds, args)] : [])
  ];
};

export default countrySelectRows;
