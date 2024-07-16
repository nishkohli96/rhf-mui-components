import type { Metadata } from 'next';
import { componentPageDescription } from '@/utils';

export const metadata: Metadata = {
  title: 'RHFPasswordField',
  description: componentPageDescription('RHFPasswordField')
};

export default function IntroductionPage() {
	return <p>Intro</p>
}