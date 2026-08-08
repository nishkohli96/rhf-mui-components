import { ContentContainer, PageHeading, SubHeading } from '@/components';
import { pageMetadata } from '@/constants';
import CompleteStateForm from '@/forms/complete-forms/state/Client';

export const metadata = pageMetadata.completeFormState;

export default function CompleteStateFormPage () {
  return (
    <ContentContainer>
      <PageHeading title={metadata.title as string} />
      <SubHeading title={metadata.description as string} />
      <CompleteStateForm />
    </ContentContainer>
  );
}
