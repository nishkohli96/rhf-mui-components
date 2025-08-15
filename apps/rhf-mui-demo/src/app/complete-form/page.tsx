import dynamic from 'next/dynamic';
import { ContentContainer, PageHeading, LinksList, SubHeading } from '@/components';
import { pageMetadata, DocsLinks, SourceCodeLinks, CodeSandboxLinks } from '@/constants';

// const ClientForm = dynamic(() => import('@/forms/complete-form'), { ssr: false });

export const metadata = pageMetadata.completeForm;

const CompleteFormPage = () => {
  const links = Object.keys(DocsLinks).map(k => DocsLinks[k]);
  const codeLinks = [
    SourceCodeLinks.completeForm,
    CodeSandboxLinks.completeForm
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

export default CompleteFormPage;
