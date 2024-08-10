import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PropsDesc } from '@site/src/constants';
import { PropDescV2 } from '@site/src/types';

/* Generate Markdown table string */
// export const generateMarkdownTable = (rows: showType?: boolean): string => {
//   // const header = '| Name | Required | Description |\n| - | :-: | - |\n';

// 	const header = `
// 		| Name | Required | ${showType? 'Type': 'Description'} |\n
// 		| - | :-: | - |\n'
// 	`;
// 	const rows = Object.keys(propsDesc)
//     .map((key) => {
//       const { name, description, isRequired } = propsDesc[key];
//       return `| ${name} | ${isRequired ? '✅' : ''} | ${description} |`;
//     })
//     .join('\n');
//   return `${header}${rows}`;
// };

type MarkdownTableProps = {
  rows: PropDescV2[];
  showType?: boolean;
};

export const MarkdownTable = ({ rows, showType }: MarkdownTableProps) => {
  // const header = '| Name | Required | Description |\n| - | :-: | - |\n';

  const tableHeader = `
			| Name | Required | ${showType ? 'Type' : 'Description'} |\n
			| - | :-: | - |\n'
		`;
  const tableRows = rows
    .map((row) => {
      const { name, isRequired, description, type } = row;
      return `| ${name} | ${isRequired ? '✅' : ''} | ${
        showType ? type : description
      } |`;
    })
    .join('\n');
  const tableContent = `${tableHeader}${tableRows}`;
  return <Markdown remarkPlugins={[remarkGfm]}>{tableContent}</Markdown>;
};
