import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';
import { type VersionProps } from '@site/src/types';

const RHFTagsInputPropsTable = ({ v4AndAbove }: VersionProps) => {
  const tableRows = [
    PropsDescription.fieldName,
    PropsDescription.control,
    PropsDescription.registerOptions,
    ...(v4AndAbove
      ? [
          PropsDescription.onTagAdd,
          PropsDescription.onTagDelete,
          PropsDescription.onTagPaste,
          PropsDescription.delimiter,
          PropsDescription.maxTags
        ]
      : []),
    PropsDescription.onValueChange_tagsInput,
    PropsDescription.label,
    PropsDescription.showLabelAboveFormField,
    ...(v4AndAbove ? [PropsDescription.hideLabel] : []),
    PropsDescription.formLabelProps,
    PropsDescription.ChipProps,
    PropsDescription.limitTags,
    PropsDescription.getLimitTagsText,
    PropsDescription.errorMessage,
    PropsDescription.hideErrorMessage,
    PropsDescription.formHelperTextProps
  ];

  return <MarkdownTable rows={tableRows} showType />;
};

export default RHFTagsInputPropsTable;
