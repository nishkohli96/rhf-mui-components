import { MarkdownTable } from '@site/src/components';
import { PropsDescription } from '@site/src/constants';

export function RHFCheckboxGroupPropsTable() {
	const tableRows = [
		PropsDescription.fieldName,
		PropsDescription.control,
		PropsDescription.options,
		PropsDescription.labelKey,
		PropsDescription.valueKey,
		PropsDescription.onValueChange_CheckboxGroup,
		PropsDescription.label,
		PropsDescription.showLabelAboveFormField,
		PropsDescription.helperText,
		PropsDescription.errorMessage,
		PropsDescription.hideErrorMessage,
		PropsDescription.formLabelProps,
		PropsDescription.formControlLabelProps,
		PropsDescription.formHelperTextProps,
		PropsDescription.checkboxProps
	];
	
	return (
		<MarkdownTable rows={tableRows} showType/>
	);
}