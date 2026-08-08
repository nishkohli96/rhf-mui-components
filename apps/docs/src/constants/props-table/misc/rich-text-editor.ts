import type { PropsInfo, PropsDescriptionArgs } from '@/types';
import { resolveProp } from '@/utils';
import { PropsDescription as P } from '../descriptions/latest';

/** Props reference rows for `MUIRichTextEditor`. */
const richTextEditorRows = (args: PropsDescriptionArgs): PropsInfo[] => [
  P.fieldName_NoName,
  P.value_RichTextEditor,
  P.onValueChange_RichTextEditor,
  P.editorConfig,
  P.onReady_RichTextEditor,
  P.onFocus_RichTextEditor,
  P.onBlur_RichTextEditor,
  P.onError_RichTextEditor,
  P.required,
  P.label,
  P.showLabelAboveFormField_Default,
  P.hideLabel,
  resolveProp(P.formLabelProps, args),
  P.errorMessage,
  P.renderError,
  P.hideErrorMessage,
  resolveProp(P.helperText, args),
  resolveProp(P.formHelperTextProps, args),
  P.customIds
];

export default richTextEditorRows;
