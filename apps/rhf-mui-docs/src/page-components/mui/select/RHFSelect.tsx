import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription, LegacyPropsDescription } from '@site/src/constants';
import { type PropsInfo, type VersionProps } from '@site/src/types';
import {
  getPropByDocsAndMuiVersion,
  getPropDetailsByVersion
} from '@site/src/utils';

const RHFSelectPropsTable = ({
  docsVersion,
  muiVersion,
  v1,
  v3_1AndAbove,
  v4AndAbove
}: VersionProps) => {
  const onValueChangeProp = v4AndAbove
    ? PropsDescription.onValueChange_Select
    : v1
      ? LegacyPropsDescription.onValueChange_Select_v1
      : LegacyPropsDescription.onValueChange_Select_v2_v3;

  const tableRows = [
    PropsDescription.fieldName,
    ...(!v1 ? [PropsDescription.control] : [LegacyPropsDescription.register]),
    PropsDescription.registerOptions,
    PropsDescription.options,
    PropsDescription.labelKey,
    PropsDescription.valueKey,
    ...(v4AndAbove
      ? [
        PropsDescription.renderOption,
        PropsDescription.getOptionDisabled,
        PropsDescription.customOnChange_Select
      ]
      : []),
    onValueChangeProp,
    ...(!v1 ? [] : [LegacyPropsDescription.defaultValue]),
    PropsDescription.showDefaultOption,
    PropsDescription.defaultOptionText,
    getPropByDocsAndMuiVersion(
      PropsDescription.label,
      docsVersion,
      muiVersion
    ),
    getPropDetailsByVersion(
      PropsDescription.showLabelAboveFormField,
      muiVersion
    ),
    getPropByDocsAndMuiVersion(
      PropsDescription.formLabelProps,
      docsVersion,
      muiVersion
    ),
    ...(v4AndAbove
      ? [getPropDetailsByVersion(PropsDescription.hideLabel, muiVersion)]
      : []),
    ...(v3_1AndAbove ? [PropsDescription.placeholder_Select] : []),
    getPropDetailsByVersion(
      PropsDescription.helperText,
      muiVersion
    ),
    ...(!v4AndAbove
      ? [getPropDetailsByVersion(PropsDescription.errorMessage, muiVersion)]
      : []),
    PropsDescription.hideErrorMessage,
    getPropByDocsAndMuiVersion(
      PropsDescription.formHelperTextProps,
      docsVersion,
      muiVersion
    ),
    ...(v4AndAbove ? [PropsDescription.customIds] : [])
  ];

  return <MarkdownTable rows={tableRows as PropsInfo[]} showType />;
};

export default RHFSelectPropsTable;
