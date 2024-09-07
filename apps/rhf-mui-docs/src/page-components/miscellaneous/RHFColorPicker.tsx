import { MarkdownTable } from '@site/src/components';
import { PropsDescription } from '@site/src/constants';

export function RHFColorPickerPropsTable() {
	const tableRows = [
		PropsDescription.fieldName,
		PropsDescription.value_ColorPicker,
		PropsDescription.onValueChange_ColorPicker,
		PropsDescription.disabled,
		PropsDescription.label,
		PropsDescription.showLabelAboveFormField,
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