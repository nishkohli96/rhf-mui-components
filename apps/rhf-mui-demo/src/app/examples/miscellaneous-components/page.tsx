import type { Metadata } from 'next';
import { ContentContainer, LinksList, PageHeading, SubHeading } from '@/components';
import { DocsLinks } from '@/constants';
import { MiscellaneousComponentsForm } from '@/forms';

const title = 'Miscellaneous Components';
const description = 'ColorPicker & RichTextEditor';

export const metadata: Metadata = {
  title,
  description
};

export default function MiscellaneousComponentsFormPage() {
  const links = [
    DocsLinks.rhfColorPicker,
    DocsLinks.rhfRichTextEditor
  ];
  return (
    <ContentContainer>
      <PageHeading title={title} />
      <SubHeading title={description}/>
      <MiscellaneousComponentsForm />
      <LinksList links={links} />
    </ContentContainer>
  );
}
