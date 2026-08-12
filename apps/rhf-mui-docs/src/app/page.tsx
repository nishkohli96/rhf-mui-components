import type { Metadata } from 'next';
import HomeLanding from '@/components/home';
import { pageMetadata } from '@/constants';

export const metadata: Metadata = pageMetadata.home;

const HomePage = () => <HomeLanding />;

export default HomePage;
