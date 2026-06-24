import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription, LegacyPropsDescription } from '@site/src/constants';
import { type PropsInfo, type VersionProps } from '@site/src/types';
import { getPropDetailsByVersion } from '@site/src/utils';

const RHFRichTextEditorPropsTable = ({
  docsVersion,
  muiVersion,
  v1,
  v4AndAbove
}: VersionProps) => {
  const valueChangeProps = v4AndAbove
    ? [PropsDescription.customOnChange_RichTextEditor,
      PropsDescription.onValueChange_RichTextEditor]
    : [LegacyPropsDescription.onValueChange_RichTextEditor_v2_v3];

  const tableRows = [
    PropsDescription.fieldName,
    ...(!v1
      ? [
        PropsDescription.control,
        PropsDescription.registerOptions,
        PropsDescription.required
      ]
      : [LegacyPropsDescription.setValue]),
    PropsDescription.id_Rte,
    PropsDescription.editorConfig,
    PropsDescription.onReady_Rte,
    PropsDescription.onFocus_Rte,
    PropsDescription.onBlur_Rte,
    ...(!v1
      ? valueChangeProps
      : [
        LegacyPropsDescription.value_RichTextEditor,
        LegacyPropsDescription.onValueChange_RichTextEditor_v1
      ]),
    PropsDescription.disabled,
    ...(!v1
      ? [
        getPropDetailsByVersion(PropsDescription.label, {
          docsVersion,
          muiVersion
        }),
        PropsDescription.showLabelAboveFormField_Default,
      ]
      : [LegacyPropsDescription.label_v1]),
    getPropDetailsByVersion(PropsDescription.formLabelProps, {
      docsVersion,
      muiVersion
    }),
    ...(v4AndAbove
      ? [getPropDetailsByVersion(PropsDescription.hideLabel, { muiVersion })]
      : []
    ),
    getPropDetailsByVersion(PropsDescription.helperText, { muiVersion }),
    PropsDescription.onError_Rte,
    ...(v4AndAbove
      ? []
      : [getPropDetailsByVersion(LegacyPropsDescription.errorMessage, { muiVersion })]
    ),
    PropsDescription.hideErrorMessage,
    getPropDetailsByVersion(PropsDescription.formHelperTextProps, {
      docsVersion,
      muiVersion
    }),
    ...(v4AndAbove ? [PropsDescription.customIds] : [])
  ];

  return (
    <MarkdownTable
      rows={tableRows as PropsInfo[]}
      showType
    />
  );
};

export default RHFRichTextEditorPropsTable;
