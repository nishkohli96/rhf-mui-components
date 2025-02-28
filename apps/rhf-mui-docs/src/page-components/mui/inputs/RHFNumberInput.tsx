import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';

const RHFNumberInputPropsTable = () => {
  const tableRows = [
    PropsDescription.fieldName,
    PropsDescription.control,
    PropsDescription.registerOptions,
    PropsDescription.onValueChange_tagsInput,
    PropsDescription.label,
    PropsDescription.showLabelAboveFormField,
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

export default RHFNumberInputPropsTable;
