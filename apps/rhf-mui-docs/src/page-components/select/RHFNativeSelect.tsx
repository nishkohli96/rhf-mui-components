import { MarkdownTable } from '@site/src/components';
import { PropsDescription } from '@site/src/constants';

export function RHFNativeSelectPropsTable() {
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
		PropsDescription.onValueChange_Default,
		PropsDescription.label,
		PropsDescription.errorMessage,
		PropsDescription.hideErrorMessage,
		PropsDescription.formHelperTextProps
	];
	
	return (
		<MarkdownTable rows={tableRows} showType/>
	);
}