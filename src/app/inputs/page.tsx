import {
  ContentContainer,
  PageHeading,
  SubHeading
} from '@/components';
import { pageMetadata } from '@/constants';
import InputsWithRegisterForm from '@/forms/inputs-with-register-options/Client';

export const metadata = pageMetadata.inputs;

const TextFieldPage = () => {
  return (
    <ContentContainer>
      <PageHeading title={metadata.title as string} />
      <SubHeading title={metadata.description as string} />
      <InputsWithRegisterForm />
    </ContentContainer>
  );
};

export default TextFieldPage;
