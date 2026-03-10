import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';
import { type PropsInfo, type VersionProps } from '@site/src/types';
import {
  getPropByDocsAndMuiVersion,
  getPropDetailsByVersion
} from '@site/src/utils';

const RHFSwitchPropsTable = ({
  docsVersion,
  muiVersion,
  v1,
  v4AndAbove
}: VersionProps) => {
  const tableRows = [
    PropsDescription.fieldName,
    PropsDescription.control,
    ...(!v1 ? [PropsDescription.registerOptions] : []),
    ...(v4AndAbove ? [PropsDescription.customOnChange_Cbx_Switch] : []),
    ...(!v1
      ? [
        PropsDescription.onValueChange_Switch,
        getPropDetailsByVersion(PropsDescription.label, docsVersion)
      ]
      : [PropsDescription.onValueChange_Default_v1, PropsDescription.label_v1]),
    getPropByDocsAndMuiVersion(
      PropsDescription.formControlLabelProps,
      docsVersion,
      muiVersion
    ),
    ...(!v1
      ? [
        PropsDescription.helperText,
        getPropDetailsByVersion(PropsDescription.errorMessage, muiVersion),
        PropsDescription.hideErrorMessage,
        getPropByDocsAndMuiVersion(
          PropsDescription.formHelperTextProps,
          docsVersion,
          muiVersion
        )
      ]
      : [])
  ];

  return <MarkdownTable rows={tableRows as PropsInfo[]} showType />;
};

export default RHFSwitchPropsTable;
