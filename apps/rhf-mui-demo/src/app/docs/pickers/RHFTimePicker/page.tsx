import type { Metadata } from 'next';
import { componentPageDescription } from '@/utils';

export const metadata: Metadata = {
  title: 'RHFTimePicker',
  description: componentPageDescription('RHFTimePicker')
};

export default function RHFTimePickerPage() {
	return <p>RHFTimePicker</p>
}