import { MarkdownTable } from '@site/src/components';
import { PropsDescription } from '@site/src/constants';

export function RHFRadioGroupPropsTable() {
	const tableRows = [
		PropsDescription.fieldName,
		PropsDescription.control,
		PropsDescription.onValueChange_CheckboxGroup,
		PropsDescription.label,
		PropsDescription.showLabelAboveFormField,
		PropsDescription.errorMessage,
		PropsDescription.hideErrorMessage,
		PropsDescription.helperText,
		PropsDescription.formLabelProps,
		PropsDescription.formHelperTextProps
	];
	
	return (
		<MarkdownTable rows={tableRows} showType/>
	);
}