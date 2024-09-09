import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import TableContent from './TableContent';

export function DefaultConfigValuesTable() {
	return (
    <Markdown remarkPlugins={[remarkGfm]}>
      {TableContent}
    </Markdown>
  );
}