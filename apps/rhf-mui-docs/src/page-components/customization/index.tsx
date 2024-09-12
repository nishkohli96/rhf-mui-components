import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
// import TableContent from './TableContent';

export default function DefaultConfigValuesTable() {
  const header = '| Prop Name | Default Value |\n|-|-|\n';
  const row1 = '| defaultFormLabelSx | { marginBottom: "0.75rem" } |\n';
  const row2 = '| defaultFormControlLabelSx | {} |\n';
  const row3 = '| defaultFormHelperTextSx | { marginTop: "0.25rem", marginLeft: 0 } |\n';
  const row4 = '| dateAdapter | AdapterDayjs |\n';
  const content = header + row1 + row2 + row3 + row4;
  return (
    <Markdown remarkPlugins={[remarkGfm]}>
      {content}
    </Markdown>
  );
}
