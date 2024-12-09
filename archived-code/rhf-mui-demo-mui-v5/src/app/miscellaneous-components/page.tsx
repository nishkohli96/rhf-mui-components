import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { ContentContainer, LinksList, PageHeading, SubHeading } from '@/components';
import { DocsLinks, SourceCodeLinks, CodeSandboxLinks } from '@/constants';

const ClientForm = dynamic(() => import('@/forms/miscellaneous-components'), { ssr: false });

const title = 'Miscellaneous Components';
const description = 'Form demonstrating usage of external components like ColorPicker & RichTextEditor with react-hook-form.';

export const metadata: Metadata = {
  title,
  description
};

const MiscellaneousComponentsFormPage = () => {
  const links = [
    DocsLinks.rhfColorPicker,
    DocsLinks.rhfRichTextEditor,
    DocsLinks.rhfPhoneInput
  ];
  const codeLinks = [
    SourceCodeLinks.miscellaneous,
    CodeSandboxLinks.miscellaneous
  ];

  return (
    <ContentContainer>
      <PageHeading title={title} />
      <SubHeading title={description}/>
      <ClientForm />
      <LinksList links={links} />
      <LinksList links={codeLinks} areCodeLinks />
    </ContentContainer>
  );
};

export default MiscellaneousComponentsFormPage;
