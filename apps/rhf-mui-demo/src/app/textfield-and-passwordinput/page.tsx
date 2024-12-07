import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { ContentContainer, LinksList, PageHeading, SubHeading } from '@/components';
import { DocsLinks, SourceCodeLinks, CodeSandboxLinks } from '@/constants';

const title = 'TextField & PasswordInput';
const description = 'Form utilizing RHFTextField and RHFPasswordInput with validation managed via react-hook-form\'s register options.';

const ClientForm = dynamic(() => import('@/forms/inputs-with-register-options'), { ssr: false });

export const metadata: Metadata = {
  title,
  description
};

const TextFieldPage = () => {
  const links = [
    DocsLinks.rhfTextField,
    DocsLinks.rhfPasswordInput,
    DocsLinks.rhfTagsInput
  ];
  const codeLinks = [
    SourceCodeLinks.inputs,
    CodeSandboxLinks.inputs
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

export default TextFieldPage;
