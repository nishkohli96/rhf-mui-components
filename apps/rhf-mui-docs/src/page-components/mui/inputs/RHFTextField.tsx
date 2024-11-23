import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';
import { VersionProps } from '@site/src/types';

const RHFTextFieldPropsTable = ({ isV1 }: VersionProps) => {
  const tableRows = [
    PropsDescription.fieldName,
    ...(!isV1 
      ? [PropsDescription.control]
      : [PropsDescription.register]
    ),
    PropsDescription.registerOptions,
    ...(!isV1
      ? [PropsDescription.onValueChange_Inputs]
      : [PropsDescription.onValueChange_Default]),
    PropsDescription.showLabelAboveFormField,
    PropsDescription.formLabelProps,
    PropsDescription.errorMessage,
    PropsDescription.hideErrorMessage,
    PropsDescription.formHelperTextProps
  ];

  return <MarkdownTable rows={tableRows} showType />;
};

export default RHFTextFieldPropsTable;
