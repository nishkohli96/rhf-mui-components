import { MarkdownTable } from '@site/src/components';
import { PropsDescription } from '@site/src/constants';

export function RHFRichTextEditorPropsTable() {
	const tableRows = [
		PropsDescription.fieldName,
		PropsDescription.setValue,
		PropsDescription.editorConfig,
		PropsDescription.value_RichTextEditor,
		PropsDescription.onValueChange_RichTextEditor,
		PropsDescription.disabled,
		PropsDescription.label,
		PropsDescription.formLabelProps,
		PropsDescription.helperText,
		PropsDescription.errorMessage,
		PropsDescription.hideErrorMessage,
		PropsDescription.formHelperTextProps
	];
	
	return (
		<MarkdownTable rows={tableRows} showType/>
	);
}