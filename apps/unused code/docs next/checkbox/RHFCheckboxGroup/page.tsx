import type { Metadata } from 'next';
import { componentPageDescription } from '@/utils';

export const metadata: Metadata = {
  title: 'RHFCheckboxGroup',
  description: componentPageDescription('RHFCheckboxGroup')
};

export default function RHFCheckboxGroupPage() {
  return <p>RHFCheckboxGroup</p>;
}
