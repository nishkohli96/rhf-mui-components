import { MarkdownTable } from '@site/src/components';
import { PropsDescription } from '@site/src/constants';

export function RHFRatingPropsTable() {
  const tableRows = [
    PropsDescription.fieldName,
    PropsDescription.register,
    PropsDescription.registerOptions,
    PropsDescription.onValueChange_Rating,
    PropsDescription.label,
    PropsDescription.showLabelAboveFormField,
    PropsDescription.errorMsg,
    PropsDescription.hideErrorMsg,
    PropsDescription.helperText,
    PropsDescription.formLabelProps,
    PropsDescription.formHelperTextProps
  ];

  return <MarkdownTable rows={tableRows} showType />;
}
