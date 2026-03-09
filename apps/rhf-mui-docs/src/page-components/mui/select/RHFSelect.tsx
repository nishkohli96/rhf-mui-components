import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';
import { type PropsInfo, type VersionProps } from '@site/src/types';
import { getPropDetailsByVersion } from '@site/src/utils';

const RHFSelectPropsTable = ({
  docsVersion,
  v1,
  v3_1AndAbove,
  v4AndAbove
}: VersionProps) => {
  const tableRows = [
    PropsDescription.fieldName,
    ...(!v1 ? [PropsDescription.control] : [PropsDescription.register]),
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
    PropsDescription.showLabelAboveFormField,
    getPropDetailsByVersion(PropsDescription.formLabelProps, docsVersion),
    ...(v3_1AndAbove ? [PropsDescription.placeholder_Select] : []),
    PropsDescription.helperText,
    PropsDescription.errorMessage,
    PropsDescription.hideErrorMessage,
    getPropDetailsByVersion(PropsDescription.formHelperTextProps, docsVersion)
  ];

  return (
    <MarkdownTable
      rows={tableRows as PropsInfo[]}
      showType
    />
  );
};

export default RHFSelectPropsTable;
