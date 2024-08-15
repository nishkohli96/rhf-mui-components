import { MarkdownTable } from '@site/src/components';
import { PropsDescription } from '@site/src/constants';

export function RHFTextFieldPropsTable() {
	const tableRows = [
		PropsDescription.fieldName,
		PropsDescription.register,
		PropsDescription.registerOptions,
		PropsDescription.onValueChange_Default,
		PropsDescription.errorMessage,
		PropsDescription.hideErrorMessage,
		PropsDescription.showLabelAboveFormField,
		PropsDescription.formLabelProps,
		PropsDescription.formHelperTextProps
	];
	
	return (
		<MarkdownTable rows={tableRows} showType/>
	);
}