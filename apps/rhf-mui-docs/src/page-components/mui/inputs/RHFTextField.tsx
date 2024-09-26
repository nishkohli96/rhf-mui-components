import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';

export function RHFTextFieldPropsTable() {
  const tableRows = [
    PropsDescription.fieldName,
    PropsDescription.register,
    PropsDescription.registerOptions,
    PropsDescription.onValueChange_Default,
    PropsDescription.showLabelAboveFormField,
    PropsDescription.formLabelProps,
    PropsDescription.errorMessage,
    PropsDescription.hideErrorMessage,
    PropsDescription.formHelperTextProps
  ];

  return (
    <MarkdownTable rows={tableRows} showType/>
  );
}
