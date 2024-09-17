import type { Metadata } from 'next';
import { ContentContainer, PageHeading, SubHeading } from '@/components';
import { MiscellaneousComponentsForm } from '@/forms';

const title = 'Miscellaneous Components';
const description = 'ColorPicker & RichTextEditor';

export const metadata: Metadata = {
  title,
  description
};

export default function MiscellaneousComponentsFormPage() {
  return (
    <ContentContainer>
      <PageHeading title={title} />
      <SubHeading title={description}/>
      <MiscellaneousComponentsForm />
    </ContentContainer>
  );
}
