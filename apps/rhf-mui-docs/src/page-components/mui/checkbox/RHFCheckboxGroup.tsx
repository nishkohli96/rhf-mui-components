import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';

export default function RHFCheckboxGroupPropsTable() {
  const tableRows = [
    PropsDescription.fieldName,
    PropsDescription.control,
    PropsDescription.options,
    PropsDescription.labelKey,
    PropsDescription.valueKey,
    PropsDescription.onValueChange_CheckboxGroup,
    PropsDescription.label,
    PropsDescription.showLabelAboveFormField,
    PropsDescription.formLabelProps,
    PropsDescription.checkboxProps,
    PropsDescription.formControlLabelProps,
    PropsDescription.helperText,
    PropsDescription.errorMessage,
    PropsDescription.hideErrorMessage,
    PropsDescription.formHelperTextProps
  ];

  return (
    <MarkdownTable rows={tableRows} showType/>
  );
}
