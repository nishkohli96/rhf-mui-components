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
  const binding = v1 ? LegacyPropsDescription.register : PropsDescription.control;
  const valueChange = v1
    ? LegacyPropsDescription.label_v1
    : v4AndAbove
      ? PropsDescription.onValueChange_Inputs
      : LegacyPropsDescription.onValueChange_Inputs_v2_v3;

  const tableRows = [
    PropsDescription.fieldName,
    binding,
    PropsDescription.registerOptions,
    ...(v4AndAbove ? [PropsDescription.customOnChange_Inputs] : []),
    valueChange,
    getPropDetailsByVersion(
      PropsDescription.showLabelAboveFormField,
      muiVersion
    ),
    ...(v4AndAbove
      ? [getPropDetailsByVersion(PropsDescription.hideLabel, muiVersion)]
      : []),
    getPropByDocsAndMuiVersion(
      PropsDescription.formLabelProps,
      docsVersion,
      muiVersion
    ),
    getPropDetailsByVersion(PropsDescription.errorMessage, muiVersion),
    ...(!v4AndAbove ? [PropsDescription.hideErrorMessage] : []),
    getPropByDocsAndMuiVersion(
      PropsDescription.formHelperTextProps,
      docsVersion,
      muiVersion
    ),
    ...(v4AndAbove ? [PropsDescription.customIds] : []),
  ];

  return <MarkdownTable rows={tableRows as PropsInfo[]} showType />;
};

export default RHFTextFieldPropsTable;
