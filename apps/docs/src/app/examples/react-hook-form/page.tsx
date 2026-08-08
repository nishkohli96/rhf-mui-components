import { ContentContainer, PageHeading, SubHeading } from '@/components';
import { pageMetadata } from '@/constants';
import CompleteRHFForm from '@/forms/complete-forms/react-hook-form/Client';

export const metadata = pageMetadata.completeFormRHF;

export default function CompleteRHFFormPage() {
  return (
    <ContentContainer>
      <PageHeading title={metadata.title as string} />
      <SubHeading title={metadata.description as string} />
      <CompleteRHFForm />
    </ContentContainer>
  );
}
