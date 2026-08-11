import type { PropsInfo, VersionProps } from '@/types';
import { resolveProp } from '@/utils';
import PropsDescription from '../descriptions/props';
import LegacyPropsDescription from '../descriptions/legacy-props';

/** Props reference rows for `RHFAutocomplete`. Added in v2 — no v1 rows. */
const autocompleteRows = ({
  docsVersion,
  muiVersion,
  v3AndAbove,
  v4AndAbove
}: VersionProps): PropsInfo[] => {
  const args = { docsVersion, muiVersion };
  const onValueChange = v4AndAbove
    ? [
      resolveProp(PropsDescription.customOnChange_Autocomplete, args),
      resolveProp(PropsDescription.onValueChange_Autocomplete, args)
    ]
    : [resolveProp(LegacyPropsDescription.onValueChange_Autocomplete_v2_v3, args)];

  let circularProgressPropsRow: PropsInfo[] = [];
  if (v4AndAbove) {
    circularProgressPropsRow = [resolveProp(PropsDescription.circularProgressProps_Autocompletes, args)];
  } else if (v3AndAbove) {
    circularProgressPropsRow = [resolveProp(LegacyPropsDescription.circularProgressProps_Autocompletes_v3, args)];
  }

  return [
    resolveProp(PropsDescription.fieldName, args),
    resolveProp(PropsDescription.control, args),
    resolveProp(PropsDescription.registerOptions, args),
    resolveProp(PropsDescription.options_StrOrObj, args),
    resolveProp(PropsDescription.labelKey, args),
    resolveProp(PropsDescription.valueKey, args),
    resolveProp(PropsDescription.multiple, args),
    ...(v4AndAbove ? [resolveProp(PropsDescription.freeSolo, args)] : []),
    ...onValueChange,
    resolveProp(PropsDescription.label, args),
    resolveProp(PropsDescription.showLabelAboveFormField, args),
    resolveProp(PropsDescription.formLabelProps, args),
    ...(v4AndAbove ? [resolveProp(PropsDescription.hideLabel, args)] : []),
    resolveProp(PropsDescription.required, args),
    ...(v4AndAbove
      ? [resolveProp(PropsDescription.renderError, args)]
      : [resolveProp(LegacyPropsDescription.errorMessage, args)]),
    resolveProp(PropsDescription.hideErrorMessage, args),
    resolveProp(PropsDescription.helperText, args),
    resolveProp(PropsDescription.formHelperTextProps, args),
    resolveProp(PropsDescription.textFieldProps, args),
    resolveProp(PropsDescription.ChipProps_Autocomplete, args),
    ...circularProgressPropsRow,
    ...(v4AndAbove ? [resolveProp(PropsDescription.customIds, args)] : [])
  ];
};

export default autocompleteRows;
