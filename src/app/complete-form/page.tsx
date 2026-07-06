import {
  ContentContainer,
  PageHeading,
  SubHeading
} from '@/components';
import { pageMetadata } from '@/constants';
import CompleteForm from '@/forms/complete-form/Client';

export const metadata = pageMetadata.completeForm;

const CompleteFormPage = () => {
  return (
    <ContentContainer>
      <PageHeading title={metadata.title as string} />
      <SubHeading title={metadata.description as string} />
      <CompleteForm />
    </ContentContainer>
  );
};

export default CompleteFormPage;
