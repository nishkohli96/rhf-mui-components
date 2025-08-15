import dynamic from 'next/dynamic';
import { ContentContainer, PageHeading, LinksList, SubHeading } from '@/components';
import {
  pageMetadata,
  DocsLinks,
  SourceCodeLinks,
  CodeSandboxLinks,
  ValidationLibLinks
} from '@/constants';

// const ClientForm = dynamic(() => import('@/forms/complete-form-with-joi'), { ssr: false });

export const metadata = pageMetadata.completeFormJoi;

const CompleteFormWithJoiPage = () => {
  const links = Object.keys(DocsLinks).map(k => DocsLinks[k]);
  const codeLinks = [
    SourceCodeLinks.completeFormJoi,
    CodeSandboxLinks.completeForm
  ];
  return (
    <ContentContainer>
      <PageHeading title={metadata.title as string} />
      <SubHeading title={metadata.description as string}/>
      {/* <ClientForm /> */}
      <LinksList links={[...links, ValidationLibLinks.joi]} />
      <LinksList links={codeLinks} areCodeLinks />
    </ContentContainer>
  );
};

export default CompleteFormWithJoiPage;
