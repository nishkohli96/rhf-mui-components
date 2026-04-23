import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';
import { type PropsInfo } from '@site/src/types';

const RHFMultiAutocompleteObjectPropsTable = () => {
  const tableRows = [
    PropsDescription.fieldName,
    PropsDescription.control,
    PropsDescription.registerOptions,
    PropsDescription.options_Obj,
    PropsDescription.labelKey_Obj,
    PropsDescription.valueKey_Obj,
    PropsDescription.selectAllText,
    PropsDescription.hideSelectAllOption_MultiAutocompleteObject,
    PropsDescription.required,
    PropsDescription.onValueChange_MultiAutocompleteObject,
    PropsDescription.label,
    PropsDescription.showLabelAboveFormField,
    PropsDescription.formLabelProps,
    PropsDescription.checkboxProps,
    PropsDescription.formControlLabelProps,
    PropsDescription.helperText,
    PropsDescription.errorMessage,
    PropsDescription.hideErrorMessage,
    PropsDescription.formHelperTextProps,
    PropsDescription.textFieldProps,
    PropsDescription.ChipProps
  ];

  return (
    <MarkdownTable rows={tableRows as PropsInfo[]} showType/>
  );
};

export default RHFMultiAutocompleteObjectPropsTable;
