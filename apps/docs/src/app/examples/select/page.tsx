import {
  ContentContainer,
  PageHeading,
  SubHeading
} from '@/components';
import { pageMetadata } from '@/constants';
import SelectForm from '@/forms/select/Client';

export const metadata = pageMetadata.select;

export default function SelectFormPage() {
  return (
    <ContentContainer>
      <PageHeading title={metadata.title as string} />
      <SubHeading title={metadata.description as string} />
      <SelectForm />
    </ContentContainer>
  );
}
