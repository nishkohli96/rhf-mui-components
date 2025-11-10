import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';
import { type VersionProps } from '@site/src/types';

const RHFNativeSelectPropsTable = ({ v1, v4AndAbove }: VersionProps) => {
  const tableRows = [
    PropsDescription.fieldName,
    ...(!v1 ? [PropsDescription.control] : [PropsDescription.register]),
    PropsDescription.registerOptions,
    PropsDescription.options,
    PropsDescription.labelKey,
    PropsDescription.valueKey,
    ...(v4AndAbove
      ? [PropsDescription.customOnChange_Select]
      : []
    ),
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
          PropsDescription.formLabelProps,
          PropsDescription.helperText
        ]
      : [PropsDescription.label_v1]),
    PropsDescription.errorMessage,
    PropsDescription.hideErrorMessage,
    PropsDescription.formHelperTextProps
  ];

  return <MarkdownTable rows={tableRows} showType />;
};

export default RHFNativeSelectPropsTable;
