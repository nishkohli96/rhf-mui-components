import { MarkdownTable } from '@site/src/components';
import { PropsDescription } from '@site/src/constants';

export function RHFCheckboxPropsTable() {
	const tableRows = [
		PropsDescription.fieldName,
		PropsDescription.control,
		PropsDescription.onValueChange_Checkbox,
		PropsDescription.label,
		PropsDescription.formControlLabelProps,
		PropsDescription.helperText,
		PropsDescription.errorMessage,
		PropsDescription.hideErrorMessage,
		PropsDescription.formHelperTextProps
	];
	
	return (
		<MarkdownTable rows={tableRows} showType/>
	);
}