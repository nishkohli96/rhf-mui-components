import type { Metadata } from 'next';
import { ContentContainer, LinksList, PageHeading, SubHeading } from '@/components';
import { DocsLinks } from '@/constants';
import { StyledReusableComponentForm } from '@/forms';

const title = 'Styled form with a reusable component';
const description
  = 'A reusable component made from RHFTextField and use of ConfigProvider to provide default styles and date adapter';

export const metadata: Metadata = {
  title,
  description,
};

export default function StyledReusableComponentFormPage() {
  const links = [
    DocsLinks.rhfTextField,
    DocsLinks.rhfDatePicker
  ];
  return (
    <ContentContainer>
      <PageHeading title={title} />
      <SubHeading title={description} />
      <StyledReusableComponentForm />
      <LinksList links={links} />
    </ContentContainer>
  );
}
