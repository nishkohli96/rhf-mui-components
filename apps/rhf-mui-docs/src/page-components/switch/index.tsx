import { MarkdownTable } from '@site/src/components';
import { PropsDescription } from '@site/src/constants';

export function RHFSwitchPropsTable() {
	const tableRows = [
		PropsDescription.fieldName,
		PropsDescription.register,
		PropsDescription.registerOptions,
		PropsDescription.onValueChange_Default,
		PropsDescription.label,
		PropsDescription.showLabelAboveFormField,
		PropsDescription.errorMsg,
		PropsDescription.formControlLabelProps
	];
	
	return (
		<MarkdownTable rows={tableRows} showType/>
	);
}