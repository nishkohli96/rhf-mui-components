import type { Metadata } from 'next';
import { ContentContainer, PageHeading, SubHeading } from '@/components';
import { StyledReusableComponentForm } from '@/forms';

const title = 'Styled form with a reusable component';
const description
  = 'A reusable component made from RHFTextField and use of ConfigProvider to provide default styles and date adapter';

export const metadata: Metadata = {
  title,
  description,
};

export default function StyledReusableComponentFormPage() {
  return (
    <ContentContainer>
      <PageHeading title={title} />
      <SubHeading title={description} />
      <StyledReusableComponentForm />
    </ContentContainer>
  );
}
