import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';
import { type VersionProps } from '@site/src/types';

const RHFDateTimePickerPropsTable = ({ v1 }: VersionProps) => {
  const tableRows = [
    PropsDescription.fieldName,
    ...(!v1 ? [PropsDescription.control] : [PropsDescription.register]),
    PropsDescription.registerOptions,
    ...(!v1
      ? [
        PropsDescription.required,
        PropsDescription.onValueChange_DateTimePicker,
        PropsDescription.label
      ]
      : [
        PropsDescription.setValue,
        PropsDescription.onValueChange_Pickers_v1,
        PropsDescription.label_v1
      ]),
    PropsDescription.showLabelAboveFormField,
    PropsDescription.formLabelProps,
    PropsDescription.helperText,
    PropsDescription.errorMessage,
    PropsDescription.hideErrorMessage,
    PropsDescription.formHelperTextProps
  ];

  return <MarkdownTable rows={tableRows} showType />;
};

export default RHFDateTimePickerPropsTable;
