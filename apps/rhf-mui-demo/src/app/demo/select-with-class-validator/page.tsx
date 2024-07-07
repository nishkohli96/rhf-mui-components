import type { Metadata } from 'next';
import { PageHeading, SubHeading } from '@/components';
import { SelectFormWithClassValidator } from '@/forms';

const title = 'Select with Class-Validator';
const description = 'RHFSelect & RHFNativeSelect form fields with class-validator resolver from @hookform/resolvers'

export const metadata: Metadata = {
	title,
  description
};

export default function SelectWithClassValidatorPage() {
  return (
    <main>
      <PageHeading title={title} />
      <SubHeading title={description}/>
      <SelectFormWithClassValidator />
    </main>
  );
}
