import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';

export default function IntroductionPageTable() {
	const tableRows = [
		PropsDescription.fieldName,
		PropsDescription.register,
		PropsDescription.registerOptions,
		PropsDescription.control,
		PropsDescription.setValue,
		PropsDescription.onValueChange,
		PropsDescription.label,
		PropsDescription.showLabelAboveFormField,
		PropsDescription.formLabelProps,
		PropsDescription.formControlLabelProps,
		PropsDescription.helperText,
		PropsDescription.errorMessage,
		PropsDescription.hideErrorMessage,
		PropsDescription.formHelperTextProps
	];
	
	return (
		<MarkdownTable rows={tableRows} />
	);
}