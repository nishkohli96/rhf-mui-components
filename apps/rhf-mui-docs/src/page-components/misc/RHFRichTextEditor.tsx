import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';
import { type VersionProps } from '@site/src/types';

const RHFRichTextEditorPropsTable = ({ v1 }: VersionProps) => {
  const tableRows = [
    PropsDescription.fieldName,
    ...(!v1
      ? [
        PropsDescription.control,
        PropsDescription.registerOptions,
        PropsDescription.required
      ]
      : [PropsDescription.setValue]),
    PropsDescription.id_Rte,
    PropsDescription.editorConfig,
    PropsDescription.onReady_Rte,
    PropsDescription.onFocus_Rte,
    ...(!v1
      ? [PropsDescription.onValueChange_RichTextEditor]
      : [
        PropsDescription.value_RichTextEditor,
        PropsDescription.onValueChange_RichTextEditor_v1
      ]),
    PropsDescription.onBlur_Rte,
    PropsDescription.disabled,
    ...(!v1
      ? [
        PropsDescription.label,
        PropsDescription.showLabelAboveFormField_Default
      ]
      : [PropsDescription.label_v1]),
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
};

export default RHFRichTextEditorPropsTable;
