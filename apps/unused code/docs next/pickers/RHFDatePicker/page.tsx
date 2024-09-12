import type { Metadata } from 'next';
import { componentPageDescription } from '@/utils';

export const metadata: Metadata = {
  title: 'RHFDatePicker',
  description: componentPageDescription('RHFDatePicker')
};

export default function RHFDatePickerPage() {
  return <p>RHFDatePicker</p>;
}
