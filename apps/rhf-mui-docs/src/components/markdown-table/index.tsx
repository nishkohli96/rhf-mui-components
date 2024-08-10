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
  const tableHeader = `| Name | Required | ${
    showType ? 'Type' : 'Description'
  } |\n| --- | :-: | --- |`;

  const tableRows = rows
    .map((row) => {
      const { name, required, description, type, hasLinkInType } = row;
      const styledName = `<span style="color: ${primaryColor}; font-weight:500">${name}</span>`;

      return `| ${styledName} | ${required ? '✅' : ''} | ${
        showType ? (hasLinkInType ? type : `\`${type}\``) : description
      } |`;
    })
    .join('\n');
  const tableContent = `${tableHeader}\n${tableRows}`;

  return (
    <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
      {tableContent}
    </Markdown>
  );
};
