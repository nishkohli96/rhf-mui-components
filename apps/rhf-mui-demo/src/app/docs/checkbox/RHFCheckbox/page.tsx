import type { Metadata } from 'next';
import { componentPageDescription } from '@/utils';

export const metadata: Metadata = {
  title: 'RHFCheckbox',
  description: componentPageDescription('RHFCheckbox')
};

export default function RHFCheckboxPage() {
	return <p>RHFCheckbox</p>
}