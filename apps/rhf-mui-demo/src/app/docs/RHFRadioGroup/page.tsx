import type { Metadata } from 'next';
import { componentPageDescription } from '@/utils';

export const metadata: Metadata = {
  title: 'RHFRadioGroup',
  description: componentPageDescription('RHFRadioGroup')
};

export default function RHFRadioGroupPage() {
	return <p>RHFRadioGroup</p>
}