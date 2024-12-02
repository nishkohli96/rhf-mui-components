import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';
import { VersionProps } from '@site/src/types';

const RHFSwitchPropsTable = ({ v1 }: VersionProps) => {
  const tableRows = [
    PropsDescription.fieldName,
    PropsDescription.control,
    ...(!v1
      ? [
        PropsDescription.registerOptions,
        PropsDescription.onValueChange_Switch
      ]
      : [PropsDescription.onValueChange_Default_v1]
    ),
    PropsDescription.label,
    PropsDescription.formControlLabelProps,
    ...(!v1
      ? [
        PropsDescription.helperText,
        PropsDescription.errorMessage,
        PropsDescription.hideErrorMessage,
        PropsDescription.formHelperTextProps
      ]
      : []
    ),
  ];

  return (
    <MarkdownTable rows={tableRows} showType/>
  );
};

export default RHFSwitchPropsTable;
