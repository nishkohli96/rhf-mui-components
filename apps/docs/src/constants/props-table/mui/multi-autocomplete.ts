import type { PropsInfo, VersionProps } from '@/types';
import { resolveProp } from '@/utils';
import PropsDescription from '../descriptions/props';
import LegacyPropsDescription from '../descriptions/legacy-props';

/** Props reference rows for `RHFMultiAutocomplete`. Added in v2 — no v1 rows. */
const multiAutocompleteRows = ({
  docsVersion,
  muiVersion,
  v3AndAbove,
  v4AndAbove
}: VersionProps): PropsInfo[] => {
  const args = { docsVersion, muiVersion };
  const onValueChange = v4AndAbove
    ? [
      resolveProp(PropsDescription.customOnChange_MultiAutocomplete, args),
      resolveProp(PropsDescription.onValueChange_MultiAutocomplete, args)
    ]
    : [resolveProp(LegacyPropsDescription.onValueChange_MultiAutocomplete_v2_v3, args)];

  return [
    resolveProp(PropsDescription.fieldName, args),
    resolveProp(PropsDescription.control, args),
    resolveProp(PropsDescription.registerOptions, args),
    resolveProp(PropsDescription.options_StrOrObj, args),
    resolveProp(PropsDescription.labelKey, args),
    resolveProp(PropsDescription.valueKey, args),
    resolveProp(PropsDescription.freeSolo, args),
    ...onValueChange,
    resolveProp(PropsDescription.selectAllText, args),
    ...(v3AndAbove ? [resolveProp(PropsDescription.hideSelectAllOption_MultiAutocomplete, args)] : []),
    resolveProp(PropsDescription.label, args),
    resolveProp(PropsDescription.showLabelAboveFormField, args),
    resolveProp(PropsDescription.formLabelProps, args),
    ...(v4AndAbove
      ? [
        resolveProp(PropsDescription.hideLabel, args),
        resolveProp(PropsDescription.renderOptionLabel_MultiAutocomplete, args)
      ]
      : []),
    resolveProp(PropsDescription.checkboxProps_MultiAutocomplete, args),
    resolveProp(PropsDescription.formControlLabelProps, args),
    ...(v4AndAbove
      ? [resolveProp(PropsDescription.circularProgressProps_Autocompletes, args)]
      : v3AndAbove
        ? [resolveProp(LegacyPropsDescription.circularProgressProps_Autocompletes_v3, args)]
        : []),
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

export default multiAutocompleteRows;
