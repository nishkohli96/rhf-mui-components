import {
  ContentContainer,
  PageHeading,
  SubHeading
} from '@/components';
import { pageMetadata } from '@/constants';
import CompleteFormWithJoi from '@/forms/complete-form-with-joi/Client';

export const metadata = pageMetadata.completeFormJoi;

const CompleteFormWithJoiPage = () => {
  return (
    <ContentContainer>
      <PageHeading title={metadata.title as string} />
      <SubHeading title={metadata.description as string} />
      <CompleteFormWithJoi />
    </ContentContainer>
  );
};

export default CompleteFormWithJoiPage;
