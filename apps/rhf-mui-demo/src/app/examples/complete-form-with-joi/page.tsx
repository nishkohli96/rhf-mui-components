import type { Metadata } from 'next';
import { ContentContainer, PageHeading, SubHeading } from '@/components';
import { CompleteFormWithJoi } from '@/forms';

const title = 'Complete Form with Joi';
const description = 'A complete form showcasing all components from this package';

export const metadata: Metadata = {
  title,
  description
};

export default function CompleteFormWithJoiPage() {
  return (
    <ContentContainer>
      <PageHeading title={title} />
      <SubHeading title={description}/>
      <CompleteFormWithJoi />
    </ContentContainer>
  );
}
