import type { Metadata } from 'next';
import Link from '@mui/material/Link';
import { ContentContainer, LinksList, PageHeading, SubHeading } from '@/components';
import { TextAndPasswordInputForm } from '@/forms';

const title = 'TextField & PasswordInput';
const description = 'Form with RHFTextField & RHFPasswordInput with register options';

export const metadata: Metadata = {
  title,
  description
};

export default function TextFieldPage() {
  const links = [
    {
      title: 'RHFTextField',
      href: 'https://rhf-mui-components.netlify.app/components/inputs/RHFTextField'
    },
    {
      title: 'RHFPasswordInput',
      href: 'https://rhf-mui-components.netlify.app/components/inputs/RHFPasswordInput'
    }
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
