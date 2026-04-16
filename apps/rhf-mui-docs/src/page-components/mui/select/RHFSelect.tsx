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
  const tableRows = [
    PropsDescription.fieldName,
    ...(!v1 ? [PropsDescription.control] : [LegacyPropsDescription.register]),
    PropsDescription.registerOptions,
    PropsDescription.options,
    PropsDescription.labelKey,
    PropsDescription.valueKey,
    ...(v4AndAbove
      ? [PropsDescription.renderOption, PropsDescription.getOptionDisabled]
      : []),
    ...(!v1 ? [] : [PropsDescription.defaultValue]),
    PropsDescription.showDefaultOption,
    PropsDescription.defaultOptionText,
    ...(v4AndAbove ? [PropsDescription.customOnChange_Select] : []),
    ...(!v1
      ? [PropsDescription.onValueChange_Select]
      : [PropsDescription.onValueChange_Select_v1]),
    getPropDetailsByVersion(
      PropsDescription.showLabelAboveFormField,
      muiVersion
    ),
    getPropByDocsAndMuiVersion(
      PropsDescription.formLabelProps,
      docsVersion,
      muiVersion
    ),
    ...(v3_1AndAbove ? [PropsDescription.placeholder_Select] : []),
    getPropDetailsByVersion(
      PropsDescription.helperText,
      muiVersion
    ),
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

export default RHFSelectPropsTable;
