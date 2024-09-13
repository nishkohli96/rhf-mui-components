import type { Metadata } from 'next';
import { PageHeading, SubHeading } from '@/components';
import { MiscellaneousComponentsForm } from '@/forms';

const title = 'Miscellaneous Components';
const description = 'ColorPicker & RichTextEditor';

export const metadata: Metadata = {
  title,
  description
};

export default function MiscellaneousComponentsFormPage() {
  return (
    <main>
      <PageHeading title={title} />
      <SubHeading title={description}/>
      <MiscellaneousComponentsForm />
    </main>
  );
}
