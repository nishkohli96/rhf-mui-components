import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';
import { type PropsInfo, type VersionProps } from '@site/src/types';
import {
  getPropByDocsAndMuiVersion,
  getPropDetailsByVersion
} from '@site/src/utils';

const RHFPasswordInputPropsTable = ({
  docsVersion,
  muiVersion,
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
    getPropDetailsByVersion(
      PropsDescription.showLabelAboveFormField,
      muiVersion
    ),
    ...(v4AndAbove ? [PropsDescription.hideLabel] : []),
    getPropByDocsAndMuiVersion(
      PropsDescription.formLabelProps,
      docsVersion,
      muiVersion
    ),
    PropsDescription.showPasswordIcon,
    PropsDescription.hidePasswordIcon,
    getPropDetailsByVersion(PropsDescription.errorMessage, muiVersion),
    PropsDescription.hideErrorMessage,
    getPropByDocsAndMuiVersion(
      PropsDescription.formHelperTextProps,
      docsVersion,
      muiVersion
    )
  ];

  return <MarkdownTable rows={tableRows as PropsInfo[]} showType />;
};

export default RHFPasswordInputPropsTable;
