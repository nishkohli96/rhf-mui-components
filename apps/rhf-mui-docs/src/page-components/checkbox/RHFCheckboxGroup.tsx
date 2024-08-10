import { MarkdownTable } from '@site/src/components';
import { PropsDescription } from '@site/src/constants';

export function RHFCheckboxGroupPropsTable() {
	const tableRows = [
		PropsDescription.fieldName,
		PropsDescription.control,
		PropsDescription.options,
		PropsDescription.labelKey,
		PropsDescription.valueKey,
		PropsDescription.checkboxProps,
		PropsDescription.onValueChange_CheckboxGroup,
		PropsDescription.showLabelAboveFormField,
		PropsDescription.helperText,
		PropsDescription.errorMsg,
		PropsDescription.hideErrorMsg,
		PropsDescription.formLabelProps,
		PropsDescription.formControlLabelProps,
		PropsDescription.formHelperTextProps
	];
	
	return (
		<MarkdownTable rows={tableRows} showType/>
	);
}