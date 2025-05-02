import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';
import { type VersionProps } from '@site/src/types';

const RHFRatingPropsTable = ({ v1 }: VersionProps) => {
  const tableRows = [
    PropsDescription.fieldName,
    PropsDescription.control,
    ...(!v1
      ? [
        PropsDescription.registerOptions,
        PropsDescription.required,
        PropsDescription.onValueChange_Rating,
        PropsDescription.label,
        PropsDescription.showLabelAboveFormField_Default
      ]
      : [
        PropsDescription.onValueChange_Rating_v1,
        PropsDescription.label_v1,
        PropsDescription.showLabelAboveFormField
      ]),
    PropsDescription.formLabelProps,
    PropsDescription.helperText,
    PropsDescription.errorMessage,
    PropsDescription.hideErrorMessage,
    PropsDescription.formHelperTextProps
  ];

  return <MarkdownTable rows={tableRows} showType />;
};

export default RHFRatingPropsTable;
