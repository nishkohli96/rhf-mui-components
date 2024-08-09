import { PropsDesc } from '@site/src/constants';
import Markdown from 'react-markdown';

/* Generate Markdown table string */
export const generateMarkdownTable = (propsDesc) => {
  const header = '| Name | Required | Description |\n| - | - | - |';
  const rows = Object.keys(propsDesc)
	.map((key) => {
		const { name, description, isRequired } = propsDesc[key];
		return `| ${name} | ${isRequired ? '✅' : ''} | ${description} |`;
	})
	.join('\n');
	console.log('rows: ', rows);
  return `${header}\n${rows}`;
};

export const PropsTable = () => {
  const markdownTable = generateMarkdownTable(PropsDesc);
  return (
    <div>
      <Markdown>{markdownTable}</Markdown>
    </div>
  );
};
