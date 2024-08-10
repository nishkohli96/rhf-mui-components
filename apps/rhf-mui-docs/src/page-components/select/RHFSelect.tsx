import { MarkdownTable } from '@site/src/components';
import { PropsDescription } from '@site/src/constants';

export function RHFSelectPropsTable() {
	const tableRows = [
		PropsDescription.fieldName,
		PropsDescription.register,
		PropsDescription.registerOptions,
		PropsDescription.options,
		PropsDescription.labelKey,
		PropsDescription.valueKey,
		PropsDescription.defaultValue,
		PropsDescription.showDefaultOption,
		PropsDescription.defaultOptionText,
		PropsDescription.onValueChange_Select,
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