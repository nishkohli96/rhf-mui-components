import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';

const RHFRichTextEditorPropsTable = () => {
  const tableRows = [
    PropsDescription.fieldName,
    PropsDescription.setValue,
    PropsDescription.id_Rte,
    PropsDescription.editorConfig,
    PropsDescription.onReady_Rte,
    PropsDescription.onFocus_Rte,
    PropsDescription.value_RichTextEditor,
    PropsDescription.onValueChange_RichTextEditor,
    PropsDescription.onBlur_Rte,
    PropsDescription.disabled,
    PropsDescription.label,
    PropsDescription.formLabelProps,
    PropsDescription.helperText,
    PropsDescription.onError_Rte,
    PropsDescription.errorMessage,
    PropsDescription.hideErrorMessage,
    PropsDescription.formHelperTextProps
  ];

  return (
    <MarkdownTable rows={tableRows} showType/>
  );
}

export default RHFRichTextEditorPropsTable;
