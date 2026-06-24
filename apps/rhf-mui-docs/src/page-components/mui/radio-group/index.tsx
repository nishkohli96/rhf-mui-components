import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription, LegacyPropsDescription } from '@site/src/constants';
import { type PropsInfo, type VersionProps } from '@site/src/types';
import { getPropDetailsByVersion } from '@site/src/utils';

const RHFRadioGroupPropsTable = ({
  docsVersion,
  muiVersion,
  v1,
  v4AndAbove
}: VersionProps) => {
  const versionContext = { docsVersion, muiVersion };

  const onValueChange = v4AndAbove
    ? PropsDescription.onValueChange_RadioGroup
    : LegacyPropsDescription.onValueChange_RadioGroup_v2_v3;

  const baseRows = [
    PropsDescription.fieldName,
    PropsDescription.control,
    ...(!v1 ? [PropsDescription.registerOptions] : []),
    PropsDescription.options_StrOrObj,
    PropsDescription.labelKey,
    PropsDescription.valueKey,
    ...(!v1 ? [PropsDescription.required] : [])
  ];

  const nonV1Rows = [
    ...(v4AndAbove ? [PropsDescription.customOnChange_RadioGroup] : []),
    onValueChange,
    PropsDescription.disabled,
    ...(v4AndAbove
      ? [
        PropsDescription.renderOptionLabel,
        PropsDescription.getOptionDisabled
      ]
      : []),
    getPropDetailsByVersion(PropsDescription.label, versionContext)
  ];

  const v1Rows = [
    LegacyPropsDescription.onValueChange_CheckboxGroup_v1,
    LegacyPropsDescription.label_v1
  ];

  const commonRows = [
    PropsDescription.showLabelAboveFormField_Default,
    getPropDetailsByVersion(PropsDescription.formLabelProps, versionContext),
    getPropDetailsByVersion(PropsDescription.radioProps, { muiVersion }),
    getPropDetailsByVersion(
      PropsDescription.formControlLabelProps,
      versionContext
    ),
    getPropDetailsByVersion(PropsDescription.helperText, { muiVersion }),
    ...(!v4AndAbove
      ? [getPropDetailsByVersion(LegacyPropsDescription.errorMessage, { muiVersion })]
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

export default RHFRadioGroupPropsTable;
