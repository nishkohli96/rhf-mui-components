import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription, LegacyPropsDescription } from '@site/src/constants';
import { type PropsInfo, type VersionProps } from '@site/src/types';
import {
  getPropByDocsAndMuiVersion,
  getPropDetailsByVersion
} from '@site/src/utils';

const RHFNativeSelectPropsTable = ({
  docsVersion,
  muiVersion,
  v1,
  v4AndAbove
}: VersionProps) => {
  const tableRows = [
    PropsDescription.fieldName,
    ...(!v1 ? [PropsDescription.control] : [LegacyPropsDescription.register]),
    PropsDescription.registerOptions,
    PropsDescription.options,
    PropsDescription.labelKey,
    PropsDescription.valueKey,
    ...(v4AndAbove ? [PropsDescription.customOnChange_Select] : []),
    ...(!v1
      ? [PropsDescription.onValueChange_NativeSelect]
      : [
        PropsDescription.defaultValue,
        PropsDescription.showDefaultOption,
        PropsDescription.onValueChange_Default_v1
      ]),
    ...(v4AndAbove
      ? [PropsDescription.renderOption, PropsDescription.getOptionDisabled]
      : []),
    PropsDescription.defaultOptionText,
    ...(!v1
      ? [
        getPropByDocsAndMuiVersion(
          PropsDescription.label,
          docsVersion,
          muiVersion
        ),
        PropsDescription.showLabelAboveFormField_Default,
        getPropByDocsAndMuiVersion(
          PropsDescription.formLabelProps,
          docsVersion,
          muiVersion
        ),
        getPropDetailsByVersion(
          PropsDescription.helperText,
          muiVersion
        )
      ]
      : [LegacyPropsDescription.label_v1]),
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

export default RHFNativeSelectPropsTable;
