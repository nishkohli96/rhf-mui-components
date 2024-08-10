import { MarkdownTable } from '@site/src/components';
import { PropsDescription } from '@site/src/constants';

export function RHFPasswordFieldPropsTable() {
	const tableRows = [
		PropsDescription.fieldName,
		PropsDescription.register,
		PropsDescription.registerOptions,
		PropsDescription.onValueChange_Default,
		PropsDescription.showPasswordIcon,
		PropsDescription.hidePasswordIcon,
		PropsDescription.errorMsg,
		PropsDescription.hideErrorMsg,
		PropsDescription.showLabelAboveFormField,
		PropsDescription.formLabelProps,
		PropsDescription.formHelperTextProps
	];
	
	return (
		<MarkdownTable rows={tableRows} showType/>
	);
}