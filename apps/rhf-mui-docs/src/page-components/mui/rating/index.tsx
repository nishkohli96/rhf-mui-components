import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription, LegacyPropsDescription } from '@site/src/constants';
import { type PropsInfo, type VersionProps } from '@site/src/types';
import { getPropDetailsByVersion } from '@site/src/utils';

const RHFRatingPropsTable = ({
  docsVersion,
  muiVersion,
  v1,
  v4AndAbove
}: VersionProps) => {
  const versionContext = { docsVersion, muiVersion };

  const baseRows = [
    PropsDescription.fieldName,
    PropsDescription.control,
    ...(!v1
      ? [PropsDescription.registerOptions, PropsDescription.required]
      : [])
  ];

  const nonV1Rows = [
    ...(v4AndAbove ? [PropsDescription.customOnChange_Rating] : []),
    v4AndAbove
      ? PropsDescription.onValueChange_Rating
      : LegacyPropsDescription.onValueChange_Rating_v2_v3,
    getPropDetailsByVersion(PropsDescription.label, versionContext),
    PropsDescription.showLabelAboveFormField_Default
  ];

  const v1Rows = [
    LegacyPropsDescription.onValueChange_Rating_v1,
    LegacyPropsDescription.label_v1,
    PropsDescription.showLabelAboveFormField
  ];

  const commonRows = [
    getPropDetailsByVersion(PropsDescription.formLabelProps, versionContext),
    ...(v4AndAbove
      ? [getPropDetailsByVersion(PropsDescription.hideLabel, { muiVersion })]
      : []),
    getPropDetailsByVersion(PropsDescription.helperText, { muiVersion }),
    ...(!v4AndAbove
      ? [getPropDetailsByVersion(PropsDescription.errorMessage, { muiVersion })]
      : []),
    PropsDescription.hideErrorMessage,
    getPropDetailsByVersion(
      PropsDescription.formHelperTextProps,
      versionContext
    ),
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

export default RHFRatingPropsTable;
