import type { PropsInfo, VersionProps } from '@/types';
import { resolveProp } from '@/utils';
import PropsDescription from '../descriptions/props';
import LegacyPropsDescription from '../descriptions/legacy-props';

/** Props reference rows for `RHFAutocompleteObject`. Added in v3.3 — no v1/v2 rows. */
const autocompleteObjectRows = ({
  docsVersion,
  muiVersion,
  v3AndAbove,
  v4AndAbove
}: VersionProps): PropsInfo[] => {
  const args = { docsVersion, muiVersion };
  const onValueChange = v4AndAbove
    ? [
      resolveProp(PropsDescription.onValueChange_AutocompleteObject, args),
      resolveProp(PropsDescription.customOnChange_AutocompleteObject, args)
    ]
    : [resolveProp(LegacyPropsDescription.onValueChange_AutocompleteObject_v3, args)];

  return [
    resolveProp(PropsDescription.fieldName, args),
    resolveProp(PropsDescription.control, args),
    resolveProp(PropsDescription.registerOptions, args),
    resolveProp(PropsDescription.options_Obj, args),
    resolveProp(PropsDescription.labelKey_Obj, args),
    resolveProp(PropsDescription.valueKey_Obj, args),
    resolveProp(PropsDescription.required, args),
    resolveProp(PropsDescription.multiple, args),
    ...onValueChange,
    resolveProp(PropsDescription.label, args),
    resolveProp(PropsDescription.showLabelAboveFormField, args),
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
    resolveProp(PropsDescription.textFieldProps, args),
    resolveProp(PropsDescription.ChipProps_Autocomplete, args),
    ...(v4AndAbove
      ? [resolveProp(PropsDescription.circularProgressProps_Autocompletes, args)]
      : v3AndAbove
        ? [resolveProp(LegacyPropsDescription.circularProgressProps_Autocompletes_v3, args)]
        : []),
    ...(v4AndAbove ? [resolveProp(PropsDescription.customIds, args)] : [])
  ];
};

export default autocompleteObjectRows;
