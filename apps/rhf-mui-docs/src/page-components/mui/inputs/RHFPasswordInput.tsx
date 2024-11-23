import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';
import { VersionProps } from '@site/src/types';

const RHFPasswordInputPropsTable = ({ v1}: VersionProps) => {
  const tableRows = [
    PropsDescription.fieldName,
    ...(!v1 
      ? [PropsDescription.control]
      : [PropsDescription.register]
    ),
    PropsDescription.registerOptions,
    ...(!v1
      ? [PropsDescription.onValueChange_Inputs]
      : [PropsDescription.onValueChange_Default_v1]),
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
