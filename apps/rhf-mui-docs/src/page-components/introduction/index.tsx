import { MarkdownTable } from '@site/src/components';
import { PropsDescription } from '@site/src/constants';

export function IntroductionPageTable() {
	const tableRows = [
		PropsDescription.fieldName,
		PropsDescription.register,
		PropsDescription.registerOptions,
		PropsDescription.control,
		PropsDescription.setValue,
		PropsDescription.onValueChange,
		PropsDescription.errorMessage,
		PropsDescription.hideErrorMessage,
		PropsDescription.showLabelAboveFormField,
		PropsDescription.formLabelProps,
		PropsDescription.formHelperTextProps
	];
	
	return (
		<MarkdownTable rows={tableRows} />
	);
}