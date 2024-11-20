import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';

const RHFSelectPropsTable = () => {
  const tableRows = [
    PropsDescription.fieldName,
    PropsDescription.register,
    PropsDescription.registerOptions,
    PropsDescription.options,
    PropsDescription.labelKey,
    PropsDescription.valueKey,
    PropsDescription.defaultValue,
    PropsDescription.showDefaultOption,
    PropsDescription.defaultOptionText,
    PropsDescription.onValueChange_Select,
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

export default RHFSelectPropsTable;
