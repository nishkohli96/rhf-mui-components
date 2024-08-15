import { MarkdownTable } from '@site/src/components';
import { PropsDescription } from '@site/src/constants';

export function RHFCheckboxPropsTable() {
	const tableRows = [
		PropsDescription.fieldName,
		PropsDescription.control,
		PropsDescription.onValueChange_Default,
		PropsDescription.errorMessage,
		PropsDescription.hideErrorMessage,
		PropsDescription.label,
		PropsDescription.helperText,
		PropsDescription.formControlLabelProps,
		PropsDescription.formHelperTextProps
	];
	
	return (
		<MarkdownTable rows={tableRows} showType/>
	);
}