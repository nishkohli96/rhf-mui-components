import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { ContentContainer, PageHeading, LinksList, SubHeading } from '@/components';
import { DocsLinks, SourceCodeLinks, CodeSandboxLinks, ValidationLibLinks } from '@/constants';

const ClientForm = dynamic(() => import('@/forms/complete-form-with-joi'), { ssr: false });

const title = 'Complete Form with Joi';
const description = 'A complete form showcasing all components from this package, with validation handled by Joi.';

export const metadata: Metadata = {
  title,
  description
};

const CompleteFormWithJoiPage = () => {
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
      <LinksList links={codeLinks} areCodeLinks />
      <LinksList links={[...links, ValidationLibLinks.joi]} />
    </ContentContainer>
  );
};

export default CompleteFormWithJoiPage;
