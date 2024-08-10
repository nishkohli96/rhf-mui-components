import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { PropDescV2 } from '@site/src/types';

type MarkdownTableProps = {
  rows: PropDescV2[];
  showType?: boolean;
};

export const MarkdownTable = ({ rows, showType }: MarkdownTableProps) => {
  const primaryColor = '#4FC3F7';
  let tableHeaderRow = `|Name`;
  let tableHeaderCol = '|-';

  if(showType) {
    tableHeaderRow += '|Type';
    tableHeaderCol += '|-';
  }
  tableHeaderRow += '|Required|Description|';
  tableHeaderCol += '|:-:|-|';

  const tableRows = rows
    .map((row) => {
      const { name, required, description, type, hasLinkInType } = row;
      const styledName = `<span style="color: ${primaryColor}; font-weight:500">${name}</span>`;

      let rowContent = `|${styledName}`;
      if(showType) {
        rowContent += `|${hasLinkInType ? type : `\`${type}\``}`
      }
      rowContent += `|${required ? '✅' : ''} | ${description}|`;
      return rowContent;
    })
    .join('\n');
  const tableContent = `${tableHeaderRow}\n${tableHeaderCol}\n${tableRows}`;

  return (
    <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
      {tableContent}
    </Markdown>
  );
};
