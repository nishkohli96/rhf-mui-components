import { DefaultRHFMuiConfig } from '@nish1896/rhf-mui-components';

export default function TableContent(): string {
	const header = '| Prop Name | Default Value |\n|-|-|\n';
	
	const row1 = `| defaultFormLabelSx | ${JSON.stringify(DefaultRHFMuiConfig.defaultFormLabelSx)} |\n`;
	const row2 = `| defaultFormHelperTextSx | ${JSON.stringify(DefaultRHFMuiConfig.defaultFormHelperTextSx)} |\n `;
	const row3 = `| dateAdapter | AdapterDayjs |`
	
	const tableContent = header + row1 + row2 + row3;
	return tableContent;
}