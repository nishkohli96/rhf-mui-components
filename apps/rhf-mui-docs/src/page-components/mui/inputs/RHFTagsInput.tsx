import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';

const RHFTagsInputPropsTable = () => {
  const tableRows = [
    PropsDescription.fieldName,
    PropsDescription.control,
    PropsDescription.registerOptions,
    PropsDescription.onValueChange_tagsInput,
    PropsDescription.label,
    PropsDescription.showLabelAboveFormField,
    PropsDescription.formLabelProps,
    PropsDescription.errorMessage,
    PropsDescription.hideErrorMessage,
    PropsDescription.formHelperTextProps,
    PropsDescription.ChipProps,
    PropsDescription.limitTags,
    PropsDescription.getLimitTagsText
  ];

  return <MarkdownTable rows={tableRows} showType />;
};

export default RHFTagsInputPropsTable;
