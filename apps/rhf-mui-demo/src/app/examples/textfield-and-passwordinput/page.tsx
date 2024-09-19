import type { Metadata } from 'next';
import { ContentContainer, LinksList, PageHeading, SubHeading } from '@/components';
import { DocsLinks, SourceCodeLinks, CodeSandboxLinks } from '@/constants';
import { TextAndPasswordInputForm } from '@/forms';

const title = 'TextField & PasswordInput';
const description = 'Form utilizing RHFTextField and RHFPasswordInput with validation managed via react-hook-form\'s register options.';

export const metadata: Metadata = {
  title,
  description
};

export default function TextFieldPage() {
  const links = [
    DocsLinks.rhfTextField,
    DocsLinks.rhfPasswordField
  ];
  const codeLinks = [
    SourceCodeLinks.inputs,
    CodeSandboxLinks.inputs
  ]

  return (
    <ContentContainer>
      <PageHeading title={title} />
      <SubHeading title={description}/>
      <TextAndPasswordInputForm />
      <LinksList links={codeLinks} showCode />
      <LinksList links={links} />
    </ContentContainer>
  );
}
