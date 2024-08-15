import type { Metadata } from 'next';
import { componentPageDescription } from '@/utils';

export const metadata: Metadata = {
  title: 'RHFSwitch',
  description: componentPageDescription('RHFSwitch')
};

export default function RHFSwitchPage() {
	return <p>RHFSwitch</p>
}