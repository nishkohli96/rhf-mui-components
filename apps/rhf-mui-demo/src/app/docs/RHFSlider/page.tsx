import type { Metadata } from 'next';
import { componentPageDescription } from '@/utils';

export const metadata: Metadata = {
  title: 'RHFSlider',
  description: componentPageDescription('RHFSlider')
};

export default function RHFSliderPage() {
  return <p>RHFSlider</p>;
}
