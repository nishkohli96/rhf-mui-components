import type { Metadata } from 'next';
import { componentPageDescription } from '@/utils';

export const metadata: Metadata = {
  title: 'RHFRating',
  description: componentPageDescription('RHFRating')
};

export default function RHFRatingPage() {
  return <p>RHFRating</p>;
}
