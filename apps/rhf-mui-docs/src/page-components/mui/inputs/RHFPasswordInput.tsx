import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';

const RHFPasswordInputPropsTable = () => {
  const tableRows = [
    PropsDescription.fieldName,
    PropsDescription.register,
    PropsDescription.registerOptions,
    PropsDescription.onValueChange_Default,
    PropsDescription.showLabelAboveFormField,
    PropsDescription.formLabelProps,
    PropsDescription.showPasswordIcon,
    PropsDescription.hidePasswordIcon,
    PropsDescription.errorMessage,
    PropsDescription.hideErrorMessage,
    PropsDescription.formHelperTextProps
  ];

  return (
    <MarkdownTable rows={tableRows} showType/>
  );
};

export default RHFPasswordInputPropsTable;
