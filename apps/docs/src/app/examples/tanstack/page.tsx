import { ContentContainer, PageHeading, SubHeading } from '@/components';
import { pageMetadata } from '@/constants';
import CompleteTanStackForm from '@/forms/complete-forms/tanstack/Client';

export const metadata = pageMetadata.completeFormTanStack;

export default function CompleteTanStackFormPage() {
  return (
    <ContentContainer>
      <PageHeading title={metadata.title as string} />
      <SubHeading title={metadata.description as string} />
      <CompleteTanStackForm />
    </ContentContainer>
  );
}
