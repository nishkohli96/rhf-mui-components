import { ContentContainer, PageHeading, LinksList, SubHeading } from '@/components';
import { pageMetadata, componentsDocsLink, SourceCodeLinks, CodeSandboxLinks } from '@/constants';
import CompleteForm from '@/forms/complete-form';

export const metadata = pageMetadata.completeForm;

const CompleteFormPage = () => {
  const links = Object.keys(componentsDocsLink).map(k => componentsDocsLink[k]);
  const codeLinks = [
    SourceCodeLinks.completeForm,
    CodeSandboxLinks.completeForm
  ];
  return (
    <ContentContainer>
      <PageHeading title={metadata.title as string} />
      <SubHeading title={metadata.description as string}/>
      <CompleteForm />
      <LinksList links={links} />
      <LinksList links={codeLinks} areCodeLinks />
    </ContentContainer>
  );
};

export default CompleteFormPage;
