import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import TableContent from './TableContent';

export default function DefaultConfigValuesTable() {
  const str = TableContent();
	return (
    <Markdown remarkPlugins={[remarkGfm]}>
      {str}
    </Markdown>
    // <p>Helo</p>
  );
}