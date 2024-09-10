import type { Metadata } from 'next';
import { componentPageDescription } from '@/utils';

export const metadata: Metadata = {
  title: 'RHFNativeSelect',
  description: componentPageDescription('RHFNativeSelect')
};

export default function RHFNativeSelectPage() {
  return <p>RHFNativeSelect</p>;
}
