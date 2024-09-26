import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { ContentContainer, LinksList, PageHeading, SubHeading } from '@/components';
import { DocsLinks, SourceCodeLinks, CodeSandboxLinks } from '@/constants';

const ClientForm = dynamic(() => import('@/forms/styled-form-with-reusable-component'), { ssr: false });

const title = 'Styled form with a reusable component';
const description
  = 'A reusable component made from RHFTextField and use of ConfigProvider to provide default styles and date adapter';

export const metadata: Metadata = {
  title,
  description,
};

export default function CustomizationPage() {
  const links = [
    DocsLinks.rhfTextField,
    DocsLinks.rhfDatePicker
  ];
  const codeLinks = [
    SourceCodeLinks.customization,
    SourceCodeLinks.styledTextField,
    CodeSandboxLinks.customization
  ];
  return (
    <ContentContainer>
      <PageHeading title={title} />
      <SubHeading title={description} />
      <ClientForm />
      <LinksList links={codeLinks} areCodeLinks />
      <LinksList links={links} />
    </ContentContainer>
  );
}
