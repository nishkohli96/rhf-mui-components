import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';

const RHFSwitchPropsTable = () => {
  const tableRows = [
    PropsDescription.fieldName,
    PropsDescription.control,
    PropsDescription.onValueChange_Default,
    PropsDescription.label,
    PropsDescription.formControlLabelProps
  ];

  return (
    <MarkdownTable rows={tableRows} showType/>
  );
}

export default RHFSwitchPropsTable;
