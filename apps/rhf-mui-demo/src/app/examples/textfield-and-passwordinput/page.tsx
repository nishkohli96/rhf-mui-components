import type { Metadata } from 'next';
import { ContentContainer, LinksList, PageHeading, SubHeading } from '@/components';
import { DocsLinks } from '@/constants';
import { TextAndPasswordInputForm } from '@/forms';

const title = 'TextField & PasswordInput';
const description = 'Form with RHFTextField & RHFPasswordInput with register options';

export const metadata: Metadata = {
  title,
  description
};

export default function TextFieldPage() {
  const links = [
    DocsLinks.rhfTextField,
    DocsLinks.rhfPasswordField
  ];

  return (
    <ContentContainer>
      <PageHeading title={title} />
      <SubHeading title={description}/>
      <TextAndPasswordInputForm />
      <LinksList links={links} />
    </ContentContainer>
  );
}
