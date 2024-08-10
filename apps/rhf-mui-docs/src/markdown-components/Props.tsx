import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PropsDescription } from '@site/src/constants';
import '@site/src/css/styles.css';

/* Generate Markdown table string */
export const generateMarkdownTable = () => {
  const propsDesc = PropsDescription;
  const header = '| Name | Required | Description |\n| - | :-: | - |\n';
  const rows = Object.keys(propsDesc)
    .map((key) => {
      const { name, description, isRequired } = propsDesc[key];
      return `| ${name} | ${isRequired ? '✅' : ''} | ${description} |`;
    })
    .join('\n');
  return `${header}${rows}`;
};

export const PropsTable = () => {
  const markdownTable = generateMarkdownTable();
  return <Markdown remarkPlugins={[remarkGfm]}>{markdownTable}</Markdown>;
};
