import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';
import { type VersionProps } from '@site/src/types';

const RHFPasswordInputPropsTable = ({ v1, v4AndAbove }: VersionProps) => {
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
    ...(v4AndAbove ? [PropsDescription.hideLabel]: []),
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
