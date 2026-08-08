import { ContentContainer, PageHeading, SubHeading } from '@/components';
import { pageMetadata } from '@/constants';
import CompleteFormikForm from '@/forms/complete-forms/formik/Client';

export const metadata = pageMetadata.completeFormFormik;

export default function CompleteFormikFormPage() {
  return (
    <ContentContainer>
      <PageHeading title={metadata.title as string} />
      <SubHeading title={metadata.description as string} />
      <CompleteFormikForm />
    </ContentContainer>
  );
}
