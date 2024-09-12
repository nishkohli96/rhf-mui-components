import type { Metadata } from 'next';
import { componentPageDescription } from '@/utils';

export const metadata: Metadata = {
  title: 'xer',
  description: componentPageDescription('RHFDateTimePicker')
};

export default function RHFDateTimePickerPage() {
  return <p>RHFDateTimePicker</p>;
}
