import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';
import { type VersionProps } from '@site/src/types';

const RHFCheckboxPropsTable = ({ v1 }: VersionProps) => {
  const tableRows = [
    PropsDescription.fieldName,
    PropsDescription.control,
    ...(!v1
      ? [
        PropsDescription.registerOptions,
        PropsDescription.onValueChange_Checkbox,
        PropsDescription.label
      ]
      : [
        PropsDescription.onValueChange_Checkbox_v1,
        PropsDescription.label_v1
      ]),
    PropsDescription.formControlLabelProps,
    PropsDescription.helperText,
    PropsDescription.errorMessage,
    PropsDescription.hideErrorMessage,
    PropsDescription.formHelperTextProps
  ];

  return <MarkdownTable rows={tableRows} showType />;
};

export default RHFCheckboxPropsTable;
