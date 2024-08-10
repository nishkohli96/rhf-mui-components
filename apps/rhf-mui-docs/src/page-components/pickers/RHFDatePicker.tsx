import { MarkdownTable } from '@site/src/components';
import { PropsDescription } from '@site/src/constants';

export function RHFDatePickerPropsTable() {
	const tableRows = [
		PropsDescription.fieldName,
		PropsDescription.register,
		PropsDescription.registerOptions,
		PropsDescription.setValue,
		PropsDescription.onValueChange_Pickers,
		PropsDescription.errorMsg,
		PropsDescription.hideErrorMsg,
		PropsDescription.helperText,
		PropsDescription.showLabelAboveFormField,
		PropsDescription.formLabelProps,
		PropsDescription.formHelperTextProps
	];
	
	return (
		<MarkdownTable rows={tableRows} showType/>
	);
}