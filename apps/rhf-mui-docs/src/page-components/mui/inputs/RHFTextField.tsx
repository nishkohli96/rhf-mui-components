import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';
import { type VersionProps } from '@site/src/types';

const RHFTextFieldPropsTable = ({ v1, v4AndAbove }: VersionProps) => {
  const tableRows = [
    PropsDescription.fieldName,
    ...(!v1
      ? [PropsDescription.control]
      : [PropsDescription.register]
    ),
    PropsDescription.registerOptions,
    ...(v4AndAbove
      ? [PropsDescription.customOnChange_Inputs]
      : []
    ),
    ...(!v1
      ? [PropsDescription.onValueChange_Inputs]
      : [PropsDescription.onValueChange_Default_v1]),
    PropsDescription.showLabelAboveFormField,
    ...(v4AndAbove ? [PropsDescription.hideLabel]: []),
    PropsDescription.formLabelProps,
    PropsDescription.errorMessage,
    PropsDescription.hideErrorMessage,
    PropsDescription.formHelperTextProps
  ];

  return <MarkdownTable rows={tableRows} showType />;
};

export default RHFTextFieldPropsTable;
