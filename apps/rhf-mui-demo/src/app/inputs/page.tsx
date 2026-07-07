import {
  ContentContainer,
  LinksList,
  PageHeading,
  SubHeading
} from '@/components';
import {
  pageMetadata,
  componentsDocsLink
} from '@/constants';
import InputsWithRegisterForm from '@/forms/inputs-with-register-options/Client';

export const metadata = pageMetadata.inputs;

const TextFieldPage = () => {
  const docsLinks = [
    componentsDocsLink.rhfTextField,
    componentsDocsLink.rhfNumberInput,
    componentsDocsLink.rhfPasswordInput,
    componentsDocsLink.rhfTagsInput,
    componentsDocsLink.rhfFileUploader
  ];

  return (
    <ContentContainer>
      <PageHeading title={metadata.title as string} />
      <SubHeading title={metadata.description as string} />
      <InputsWithRegisterForm />
      <LinksList links={docsLinks} />
    </ContentContainer>
  );
};

export default TextFieldPage;
