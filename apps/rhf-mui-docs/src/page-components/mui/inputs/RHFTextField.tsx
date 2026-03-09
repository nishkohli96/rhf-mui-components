import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';
import { type PropsInfo, type VersionProps } from '@site/src/types';
import { getPropDetailsByVersion } from '@site/src/utils';

const RHFTextFieldPropsTable = ({
  docsVersion,
  v1,
  v4AndAbove
}: VersionProps) => {
  const tableRows = [
    PropsDescription.fieldName,
    ...(!v1 ? [PropsDescription.control] : [PropsDescription.register]),
    PropsDescription.registerOptions,
    ...(v4AndAbove ? [PropsDescription.customOnChange_Inputs] : []),
    ...(!v1
      ? [PropsDescription.onValueChange_Inputs]
      : [PropsDescription.onValueChange_Default_v1]),
    PropsDescription.showLabelAboveFormField,
    ...(v4AndAbove ? [PropsDescription.hideLabel] : []),
    getPropDetailsByVersion(PropsDescription.formLabelProps, docsVersion),
    PropsDescription.errorMessage,
    PropsDescription.hideErrorMessage,
    getPropDetailsByVersion(PropsDescription.formHelperTextProps, docsVersion)
  ];

  return <MarkdownTable rows={tableRows as PropsInfo[]} showType />;
};

export default RHFTextFieldPropsTable;
