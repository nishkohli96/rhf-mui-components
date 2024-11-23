import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { ContentContainer, PageHeading, LinksList, SubHeading } from '@/components';
import { DocsLinks, SourceCodeLinks, CodeSandboxLinks } from '@/constants';

const ClientForm = dynamic(() => import('@/forms/complete-form'), { ssr: false });

const title = 'Complete Form with Register Options';
const description = 'A complete form showcasing all components from this package with appropriate validations.';

export const metadata: Metadata = {
  title,
  description
};

const CompleteFormPage = () => {
  const links = Object.keys(DocsLinks).map(k => DocsLinks[k]);
  const codeLinks = [
    SourceCodeLinks.completeForm,
    CodeSandboxLinks.completeForm
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

export default CompleteFormPage;
