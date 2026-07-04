import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription, LegacyPropsDescription } from '@site/src/constants';
import { type PropsInfo, type VersionProps } from '@site/src/types';
import { getPropDetailsByVersion } from '@site/src/utils';

const RHFSliderPropsTable = ({
  docsVersion,
  muiVersion,
  v1,
  v4AndAbove
}: VersionProps) => {
  const versionContext = { docsVersion, muiVersion };

  const baseRows = [
    PropsDescription.fieldName,
    v1 ? LegacyPropsDescription.register : PropsDescription.control,
    PropsDescription.registerOptions,
    ...(!v1 ? [PropsDescription.required] : [])
  ];

  const nonV1Rows = [
    ...(v4AndAbove ? [PropsDescription.customOnChange_Slider] : []),
    v4AndAbove
      ? PropsDescription.onValueChange_Slider
      : LegacyPropsDescription.onValueChange_Slider_v2_v3,
    getPropDetailsByVersion(PropsDescription.label, versionContext)
  ];

  const v1Rows = [
    LegacyPropsDescription.defaultValue_Slider,
    LegacyPropsDescription.onValueChange_Slider_v1,
    LegacyPropsDescription.label_v1
  ];

  const commonRows = [
    PropsDescription.showLabelAboveFormField_Default,
    getPropDetailsByVersion(PropsDescription.formLabelProps, versionContext),
    ...(v4AndAbove
      ? [getPropDetailsByVersion(PropsDescription.hideLabel, { muiVersion })]
      : []
    ),
    ...(v4AndAbove
      ? [PropsDescription.renderError]
      : [getPropDetailsByVersion(LegacyPropsDescription.errorMessage, { muiVersion })]
    ),
    PropsDescription.hideErrorMessage,
    getPropDetailsByVersion(PropsDescription.helperText, { muiVersion }),
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

export default RHFSliderPropsTable;
