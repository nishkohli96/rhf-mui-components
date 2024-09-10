import type { Metadata } from 'next';
import { componentPageDescription } from '@/utils';

export const metadata: Metadata = {
  title: 'RHFSelect',
  description: componentPageDescription('RHFSelect')
};

export default function RHFSelectPage() {
  return <p>RHFSelect</p>;
}
