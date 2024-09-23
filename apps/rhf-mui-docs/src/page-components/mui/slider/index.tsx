import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';

export function RHFSliderPropsTable() {
  const tableRows = [
    PropsDescription.fieldName,
    PropsDescription.register,
    PropsDescription.registerOptions,
    PropsDescription.defaultValue_Slider,
    PropsDescription.onValueChange_Slider,
    PropsDescription.label,
    PropsDescription.showLabelAboveFormField,
    PropsDescription.formLabelProps,
    PropsDescription.helperText,
    PropsDescription.errorMessage,
    PropsDescription.hideErrorMessage,
    PropsDescription.formHelperTextProps
  ];

  return <MarkdownTable rows={tableRows} showType />;
}
