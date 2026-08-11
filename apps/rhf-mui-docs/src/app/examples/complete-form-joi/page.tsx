import {
  ContentContainer,
  PageHeading,
  SubHeading
} from '@/components';
import { pageMetadata } from '@/constants';
import CompleteFormWithJoi from '@/forms/complete-form-joi/Client';

export const metadata = pageMetadata.completeFormJoiExample;

export default function CompleteFormWithJoiPage() {
  return (
    <ContentContainer>
      <PageHeading title={metadata.title as string} />
      <SubHeading title={metadata.description as string} />
      <CompleteFormWithJoi />
    </ContentContainer>
  );
}
