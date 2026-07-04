import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription, LegacyPropsDescription } from '@site/src/constants';
import { type PropsInfo, type VersionProps } from '@site/src/types';
import { getPropDetailsByVersion } from '@site/src/utils';

const RHFSwitchPropsTable = ({
  docsVersion,
  muiVersion,
  v1,
  v4AndAbove
}: VersionProps) => {
  const versionContext = { docsVersion, muiVersion };

  const baseRows = [
    PropsDescription.fieldName,
    PropsDescription.control,
    ...(!v1 ? [PropsDescription.registerOptions] : [])
  ];

  const nonV1Rows = [
    ...(v4AndAbove ? [PropsDescription.customOnChange_Cbx_Switch] : []),
    v4AndAbove
      ? PropsDescription.onValueChange_Switch
      : LegacyPropsDescription.onValueChange_Switch_v2_v3,
    getPropDetailsByVersion(PropsDescription.label, versionContext)
  ];

  const v1Rows = [
    LegacyPropsDescription.label_v1
  ];

  const helperTextRows = !v1
    ? [
      ...(v4AndAbove
        ? [PropsDescription.renderError]
        : [getPropDetailsByVersion(LegacyPropsDescription.errorMessage, { muiVersion })]
      ),
      PropsDescription.hideErrorMessage,
      getPropDetailsByVersion(PropsDescription.helperText, { muiVersion }),
      getPropDetailsByVersion(
        PropsDescription.formHelperTextProps,
        versionContext
      )
    ]
    : [];

  const commonRows = [
    getPropDetailsByVersion(
      PropsDescription.formControlLabelProps,
      versionContext
    ),
    ...(v4AndAbove
      ? [getPropDetailsByVersion(PropsDescription.hideLabel, { muiVersion })]
      : []),
    ...helperTextRows,
    ...(v4AndAbove ? [PropsDescription.customIds] : [])
  ];

  const tableRows = [
    ...baseRows,
    ...(v1 ? v1Rows : nonV1Rows),
    ...commonRows
  ];

  return (
    <MarkdownTable
      rows={tableRows as PropsInfo[]}
      showType
    />
  );
};

export default RHFSwitchPropsTable;
