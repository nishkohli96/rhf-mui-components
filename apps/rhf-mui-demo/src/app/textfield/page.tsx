import type { Metadata } from 'next';
import { PageHeading } from '@/components';
import { TextAndPasswordInputForm } from '@/forms';

const title = 'TextField & PasswordInput';

export const metadata: Metadata = {
	title
};

export default function TextFieldPage() {
  return (
    <main>
      <PageHeading title={title} />
      <TextAndPasswordInputForm />
    </main>
  );
}
