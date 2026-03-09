import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';
import { type PropsInfo, type VersionProps } from '@site/src/types';
import { getProp } from '@site/src/utils';

const RHFNativeSelectPropsTable = ({
  docsVersion,
  v1,
  v4AndAbove
}: VersionProps) => {
  const tableRows = [
    PropsDescription.fieldName,
    ...(!v1 ? [PropsDescription.control] : [PropsDescription.register]),
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
        PropsDescription.label,
        PropsDescription.showLabelAboveFormField_Default,
        getProp(PropsDescription.formLabelProps, docsVersion),
        PropsDescription.helperText
      ]
      : [PropsDescription.label_v1]),
    PropsDescription.errorMessage,
    PropsDescription.hideErrorMessage,
    getProp(PropsDescription.formHelperTextProps, docsVersion)
  ];

  return <MarkdownTable rows={tableRows as PropsInfo[]} showType />;
};

export default RHFNativeSelectPropsTable;
