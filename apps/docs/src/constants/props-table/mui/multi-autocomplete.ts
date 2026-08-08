import type { PropsInfo, VersionProps } from '@/types';
import { resolveProp } from '@/utils';
import { PropsDescription as P } from '../descriptions/latest';
import { PropsDescription_v1 as Pv1 } from '../descriptions/v1';

/** Props reference rows for `MUIMultiAutocomplete`. */
const multiAutocompleteRows = ({
  muiVersion,
  docsVersion
}: VersionProps): PropsInfo[] => {
  const args = { docsVersion, muiVersion };
  const v1 = docsVersion === 1;

  return [
    P.fieldName,
    P.options_StrOrObj,
    P.labelKey,
    P.valueKey,
    P.ref_Autocomplete,
    P.value_MultiAutocomplete,
    P.onValueChange_MultiAutocomplete,
    P.freeSolo_MultiAutocomplete,
    P.disableClearable,
    P.selectAllText,
    P.hideSelectAllOption,
    P.renderOptionLabel_MultiAutocomplete,
    P.getOptionDisabled,
    P.limitTags,
    P.getLimitTagsText,
    resolveProp(P.textFieldProps, args),
    resolveProp(P.checkboxProps, args),
    resolveProp(P.formControlLabelProps, args),
    resolveProp(P.ChipProps, args),
    ...(!v1
      ? [resolveProp(P.circularProgressProps, args)]
      : [resolveProp(Pv1.circularProgressProps, args)]
    ),
    P.label,
    resolveProp(P.showLabelAboveFormField, args),
    resolveProp(P.formLabelProps, args),
    P.hideLabel,
    P.required,
    P.errorMessage,
    P.renderError,
    P.hideErrorMessage,
    resolveProp(P.helperText, args),
    resolveProp(P.formHelperTextProps, args),
    P.customIds
  ];
};

export default multiAutocompleteRows;
