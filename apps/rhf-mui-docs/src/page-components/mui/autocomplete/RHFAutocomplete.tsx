import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';

const RHFAutocompletePropsTable = () => {
  const tableRows = [
    PropsDescription.fieldName,
    PropsDescription.control,
    PropsDescription.registerOptions,
    PropsDescription.options_Autocomplete,
		PropsDescription.multiple,
    PropsDescription.labelKey,
    PropsDescription.valueKey,
    PropsDescription.onValueChange_Autocomplete,
    PropsDescription.label,
    PropsDescription.showLabelAboveFormField,
    PropsDescription.formLabelProps,
    PropsDescription.helperText,
    PropsDescription.errorMessage,
    PropsDescription.hideErrorMessage,
    PropsDescription.formHelperTextProps,
		PropsDescription.textFieldProps
  ];

  return (
    <MarkdownTable rows={tableRows} showType/>
  );
};

export default RHFAutocompletePropsTable;
