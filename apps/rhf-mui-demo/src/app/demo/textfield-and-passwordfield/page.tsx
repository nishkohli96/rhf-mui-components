import type { Metadata } from 'next';
import { PageHeading, SubHeading } from '@/components';
import { TextAndPasswordInputForm } from '@/forms';

const title = 'TextField & PasswordInput';
const description = 'Form with RHFTextField & RHFPasswordField with register options'

export const metadata: Metadata = {
	title,
  description
};

export default function TextFieldPage() {
  return (
    <main>
      <PageHeading title={title} />
      <SubHeading title={description}/>
      <TextAndPasswordInputForm />
    </main>
  );
}
