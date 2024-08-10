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
		PropsDescription.label,
		PropsDescription.onValueChange_NativeSelect,
		PropsDescription.errorMsg,
		PropsDescription.hideErrorMsg,
		PropsDescription.showDefaultOption,
		PropsDescription.defaultOptionText,
		PropsDescription.formHelperTextProps
	];
	
	return (
		<MarkdownTable rows={tableRows} showType/>
	);
}