import {
  ContentContainer,
  PageHeading,
  SubHeading
} from '@/components';
import { pageMetadata } from '@/constants';
import MiscellaneousComponentsForm from '@/forms/miscellaneous-components';

export const metadata = pageMetadata.miscComponentsExample;

export default function MiscellaneousComponentsFormPage() {
  return (
    <ContentContainer>
      <PageHeading title={metadata.title as string} />
      <SubHeading title={metadata.description as string} />
      <MiscellaneousComponentsForm />
    </ContentContainer>
  );
}
