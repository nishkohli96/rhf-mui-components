import { MarkdownTable } from '@site/src/components';
import { PropsDescription } from '@site/src/constants';

export default function IntroductionPage() {
	const tableRows = [
		PropsDescription.fieldName,
		PropsDescription.register
	]
	return (
		<MarkdownTable rows={tableRows} />
	);
}