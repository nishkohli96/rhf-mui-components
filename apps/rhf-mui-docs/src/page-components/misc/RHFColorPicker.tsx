import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';
import { VersionProps } from '@site/src/types';

const RHFColorPickerPropsTable = ({ v1 }: VersionProps) => {
  const tableRows = [
    PropsDescription.fieldName,
    ...(!v1
      ? [
          PropsDescription.control,
          PropsDescription.registerOptions,
          PropsDescription.value_ColorPicker,
          PropsDescription.valueKey_ColorPicker,
          PropsDescription.defaultColor,
          PropsDescription.excludeAlpha,
          PropsDescription.required,
          PropsDescription.onValueChange_ColorPicker
        ]
      : [
          PropsDescription.value_ColorPicker_v1,
          PropsDescription.onValueChange_ColorPicker_v1
        ]),
    PropsDescription.disabled,
    ...(!v1
      ? [PropsDescription.label]
      : [PropsDescription.label_v1]
    ),
    PropsDescription.showLabelAboveFormField_Default,
    PropsDescription.formLabelProps,
    PropsDescription.helperText,
    PropsDescription.errorMessage,
    PropsDescription.hideErrorMessage,
    PropsDescription.formHelperTextProps
  ];

  return <MarkdownTable rows={tableRows} showType />;
};

export default RHFColorPickerPropsTable;
