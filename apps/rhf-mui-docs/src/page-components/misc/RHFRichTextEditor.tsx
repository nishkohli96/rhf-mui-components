import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';
import { type PropsInfo, type VersionProps } from '@site/src/types';
import {
  getPropByDocsAndMuiVersion,
  getPropDetailsByVersion
} from '@site/src/utils';

const RHFRichTextEditorPropsTable = ({
  docsVersion,
  muiVersion,
  v1
}: VersionProps) => {
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
        getPropByDocsAndMuiVersion(
          PropsDescription.label,
          docsVersion,
          muiVersion
        ),
        PropsDescription.showLabelAboveFormField_Default,
        PropsDescription.hideLabel
      ]
      : [PropsDescription.label_v1]),
    getPropByDocsAndMuiVersion(
      PropsDescription.formLabelProps,
      docsVersion,
      muiVersion
    ),
    getPropDetailsByVersion(
      PropsDescription.helperText,
      muiVersion
    ),
    PropsDescription.onError_Rte,
    getPropDetailsByVersion(PropsDescription.errorMessage, muiVersion),
    PropsDescription.hideErrorMessage,
    getPropByDocsAndMuiVersion(
      PropsDescription.formHelperTextProps,
      docsVersion,
      muiVersion
    )
  ];

  return <MarkdownTable rows={tableRows as PropsInfo[]} showType />;
};

export default RHFRichTextEditorPropsTable;
