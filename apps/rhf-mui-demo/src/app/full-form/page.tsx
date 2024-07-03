import type { Metadata } from 'next';
import { PageHeading } from '@/components';
import { JoiForm } from './components';

const title = 'Joi Form';

export const metadata: Metadata = {
	title
};

export default function JoiFormPage() {

  return (
    <main>
      <PageHeading title={title} />
      <JoiForm />
    </main>
  );
}
