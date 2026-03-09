import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';
import { type PropsInfo, type VersionProps } from '@site/src/types';
import { getPropDetailsByVersion } from '@site/src/utils';

const RHFDatePickerPropsTable = ({ docsVersion, v1 }: VersionProps) => {
  const tableRows = [
    PropsDescription.fieldName,
    ...(!v1 ? [PropsDescription.control] : [PropsDescription.register]),
    PropsDescription.registerOptions,
    ...(!v1
      ? [
        PropsDescription.required,
        PropsDescription.onValueChange_DatePicker,
        PropsDescription.label
      ]
      : [
        PropsDescription.setValue,
        PropsDescription.onValueChange_Pickers_v1,
        PropsDescription.label_v1
      ]),
    PropsDescription.showLabelAboveFormField,
    getPropDetailsByVersion(PropsDescription.formLabelProps, docsVersion),
    PropsDescription.helperText,
    PropsDescription.errorMessage,
    PropsDescription.hideErrorMessage,
    getPropDetailsByVersion(PropsDescription.formHelperTextProps, docsVersion)
  ];

  return <MarkdownTable rows={tableRows as PropsInfo[]} showType />;
};

export default RHFDatePickerPropsTable;
