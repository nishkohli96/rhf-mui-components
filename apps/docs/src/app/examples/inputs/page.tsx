import {
  ContentContainer,
  PageHeading,
  SubHeading
} from '@/components';
import { pageMetadata } from '@/constants';
import InputsForm from '@/forms/inputs/Client';

export const metadata = pageMetadata.inputs;

export default function InputsFormPage() {
  return (
    <ContentContainer>
      <PageHeading title={metadata.title as string} />
      <SubHeading title={metadata.description as string} />
      <InputsForm />
    </ContentContainer>
  );
}
