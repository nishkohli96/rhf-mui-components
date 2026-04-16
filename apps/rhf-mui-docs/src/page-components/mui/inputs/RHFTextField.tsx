import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription, LegacyPropsDescription } from '@site/src/constants';
import { type PropsInfo, type VersionProps } from '@site/src/types';
import {
  getPropByDocsAndMuiVersion,
  getPropDetailsByVersion
} from '@site/src/utils';

const RHFTextFieldPropsTable = ({
  docsVersion,
  muiVersion,
  v1,
  v4AndAbove
}: VersionProps) => {
  const tableRows = [
    PropsDescription.fieldName,
    ...(!v1 ? [PropsDescription.control] : [LegacyPropsDescription.register]),
    PropsDescription.registerOptions,
    ...(v4AndAbove ? [PropsDescription.customOnChange_Inputs] : []),
    ...(!v1
      ? v4AndAbove
        ? [PropsDescription.onValueChange_Inputs]
        : [LegacyPropsDescription.onValueChange_Inputs_v2_v3]
      : [LegacyPropsDescription.label_v1]),
    getPropDetailsByVersion(
      PropsDescription.showLabelAboveFormField,
      muiVersion
    ),
    ...(v4AndAbove ? [getPropDetailsByVersion(PropsDescription.hideLabel, muiVersion)] : []),
    getPropByDocsAndMuiVersion(
      PropsDescription.formLabelProps,
      docsVersion,
      muiVersion
    ),
    getPropDetailsByVersion(PropsDescription.errorMessage, muiVersion),
   ...(v4AndAbove ? [] : [PropsDescription.hideErrorMessage]),
    getPropByDocsAndMuiVersion(
      PropsDescription.formHelperTextProps,
      docsVersion,
      muiVersion
    ),
    PropsDescription.customIds
  ];

  return <MarkdownTable rows={tableRows as PropsInfo[]} showType />;
};

export default RHFTextFieldPropsTable;
