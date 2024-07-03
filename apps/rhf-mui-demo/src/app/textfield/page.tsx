import type { Metadata } from 'next';
import { PageHeading } from '@/components';
import { JoiForm } from './components';

const title = 'TextField';

export const metadata: Metadata = {
	title
};

export default function TextFieldPage() {

  return (
    <main>
      <PageHeading title={title} />
      <JoiForm />
    </main>
  );
}
