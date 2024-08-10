import { MarkdownTable } from '@site/src/components';
import { PropsDescription } from '@site/src/constants';

export function RHFRadioGroupPropsTable() {
	const tableRows = [
		PropsDescription.fieldName,
		PropsDescription.control,
		PropsDescription.options,
		PropsDescription.labelKey,
		PropsDescription.valueKey,
		PropsDescription.radioProps,
		PropsDescription.onValueChange_CheckboxGroup,
		PropsDescription.label,
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