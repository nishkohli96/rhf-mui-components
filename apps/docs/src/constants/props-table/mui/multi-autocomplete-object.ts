import type { PropsInfo, PropsDescriptionArgs, DocsVersion } from '@/types';
import { resolveProp } from '@/utils';
import { PropsDescription as P } from '../descriptions/latest';
import { PropsDescription_v1 as Pv1 } from '../descriptions/v1';

/** Props reference rows for `MUIMultiAutocompleteObject`. */
const multiAutocompleteObjectRows = (
  args: PropsDescriptionArgs,
  docsVersion?: DocsVersion
): PropsInfo[] => {
  const v1 = docsVersion === 1;
  return [
    P.fieldName,
    P.options_Obj,
    P.labelKey_Obj,
    P.valueKey_Obj,
    P.ref_Autocomplete,
    P.value_MultiAutocompleteObject,
    P.onValueChange_MultiAutocompleteObject,
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

export default multiAutocompleteObjectRows;
