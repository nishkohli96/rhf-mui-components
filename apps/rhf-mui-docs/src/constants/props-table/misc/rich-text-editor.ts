import type { PropsInfo, VersionProps } from '@/types';
import { resolveProp } from '@/utils';
import PropsDescription from '../descriptions/props';
import LegacyPropsDescription from '../descriptions/legacy-props';

/** Props reference rows for `RHFRichTextEditor`. */
const richTextEditorRows = ({
  docsVersion,
  muiVersion,
  v1,
  v4AndAbove
}: VersionProps): PropsInfo[] => {
  const args = { docsVersion, muiVersion };
  const valueChangeProps = v4AndAbove
    ? [
      resolveProp(PropsDescription.customOnChange_RichTextEditor, args),
      resolveProp(PropsDescription.onValueChange_RichTextEditor, args)
    ]
    : [resolveProp(LegacyPropsDescription.onValueChange_RichTextEditor_v2_v3, args)];

  return [
    resolveProp(PropsDescription.fieldName, args),
    ...(!v1
      ? [
        resolveProp(PropsDescription.control, args),
        resolveProp(PropsDescription.registerOptions, args),
        resolveProp(PropsDescription.required, args)
      ]
      : [resolveProp(LegacyPropsDescription.setValue, args)]),
    resolveProp(PropsDescription.id_Rte, args),
    resolveProp(PropsDescription.editorConfig, args),
    resolveProp(PropsDescription.onReady_Rte, args),
    resolveProp(PropsDescription.onFocus_Rte, args),
    resolveProp(PropsDescription.onBlur_Rte, args),
    ...(!v1
      ? valueChangeProps
      : [
        resolveProp(LegacyPropsDescription.value_RichTextEditor_v1, args),
        resolveProp(LegacyPropsDescription.onValueChange_RichTextEditor_v1, args)
      ]),
    resolveProp(PropsDescription.disabled, args),
    ...(!v1
      ? [
        resolveProp(PropsDescription.label, args),
        resolveProp(PropsDescription.showLabelAboveFormField_Default, args)
      ]
      : [resolveProp(LegacyPropsDescription.label_v1, args)]),
    resolveProp(PropsDescription.formLabelProps, args),
    ...(v4AndAbove ? [resolveProp(PropsDescription.hideLabel, args)] : []),
    resolveProp(PropsDescription.onError_Rte, args),
    ...(v4AndAbove
      ? [resolveProp(PropsDescription.renderError, args)]
      : [resolveProp(LegacyPropsDescription.errorMessage, args)]),
    resolveProp(PropsDescription.hideErrorMessage, args),
    resolveProp(PropsDescription.helperText, args),
    resolveProp(PropsDescription.formHelperTextProps, args),
    ...(v4AndAbove ? [resolveProp(PropsDescription.customIds, args)] : [])
  ];
};

export default richTextEditorRows;
