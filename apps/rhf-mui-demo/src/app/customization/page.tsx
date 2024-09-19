import type { Metadata } from 'next';
import { ContentContainer, LinksList, PageHeading, SubHeading } from '@/components';
import { DocsLinks, SourceCodeLinks, CodeSandboxLinks } from '@/constants';
import { StyledReusableComponentForm } from '@/forms';

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
    CodeSandboxLinks.customization
  ];
  return (
    <ContentContainer>
      <PageHeading title={title} />
      <SubHeading title={description} />
      <StyledReusableComponentForm />
      <LinksList links={codeLinks} areCodeLinks />
      <LinksList links={links} />
    </ContentContainer>
  );
}
