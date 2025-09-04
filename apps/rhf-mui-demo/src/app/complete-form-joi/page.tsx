import { ContentContainer, PageHeading, LinksList, SubHeading } from '@/components';
import {
  pageMetadata,
  DocsLinks,
  SourceCodeLinks,
  CodeSandboxLinks,
  ValidationLibLinks
} from '@/constants';
import CompleteFormWithJoi from '@/forms/complete-form-with-joi';

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
      <CompleteFormWithJoi />
      <LinksList links={[...links, ValidationLibLinks.joi]} />
      <LinksList links={codeLinks} areCodeLinks />
    </ContentContainer>
  );
};

export default CompleteFormWithJoiPage;
