import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';

const RHFColorPickerPropsTable = () => {
  const tableRows = [
    PropsDescription.fieldName,
    PropsDescription.value_ColorPicker,
    PropsDescription.onValueChange_ColorPicker,
    PropsDescription.disabled,
    PropsDescription.label,
    PropsDescription.showLabelAboveFormField,
    PropsDescription.formLabelProps,
    PropsDescription.helperText,
    PropsDescription.errorMessage,
    PropsDescription.hideErrorMessage,
    PropsDescription.formHelperTextProps
  ];

  return (
    <MarkdownTable rows={tableRows} showType/>
  );
};

export default RHFColorPickerPropsTable;
