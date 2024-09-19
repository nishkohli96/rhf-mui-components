import type { Metadata } from 'next';
import { ContentContainer, PageHeading, LinksList, SubHeading } from '@/components';
import { DocsLinks, SourceCodeLinks, CodeSandboxLinks, ValidationLibLinks } from '@/constants';
import { CompleteFormWithJoi } from '@/forms';

const title = 'Complete Form with Joi';
const description = 'A complete form showcasing all components from this package';

export const metadata: Metadata = {
  title,
  description
};

export default function CompleteFormWithJoiPage() {
  const links = Object.keys(DocsLinks).map(k => DocsLinks[k]);
  const codeLinks = [
    SourceCodeLinks.completeForm,
    CodeSandboxLinks.completeForm
  ];
  return (
    <ContentContainer>
      <PageHeading title={title} />
      <SubHeading title={description}/>
      <CompleteFormWithJoi />
      <LinksList links={codeLinks} areCodeLinks />
      <LinksList links={[...links, ValidationLibLinks.joi]} />
    </ContentContainer>
  );
}
