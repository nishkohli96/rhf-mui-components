import dynamic from 'next/dynamic';
import { ContentContainer, LinksList, PageHeading, SubHeading } from '@/components';
import { pageMetadata, DocsLinks, SourceCodeLinks, CodeSandboxLinks } from '@/constants';

// const ClientForm = dynamic(() => import('@/forms/miscellaneous-components'), { ssr: false });

export const metadata = pageMetadata.miscComponents;

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
      <PageHeading title={metadata.title as string} />
      <SubHeading title={metadata.description as string}/>
      {/* <ClientForm /> */}
      <LinksList links={links} />
      <LinksList links={codeLinks} areCodeLinks />
    </ContentContainer>
  );
};

export default MiscellaneousComponentsFormPage;
