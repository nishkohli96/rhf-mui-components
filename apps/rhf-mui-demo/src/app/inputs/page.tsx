import {
  ContentContainer,
  LinksList,
  PageHeading,
  SubHeading
} from '@/components';
import {
  pageMetadata,
  componentsDocsLink,
  SourceCodeLinks,
  CodeSandboxLinks
} from '@/constants';
import InputsWithRegisterForm from '@/forms/inputs-with-register-options/Client';

export const metadata = pageMetadata.inputs;

const TextFieldPage = () => {
  const links = [
    componentsDocsLink.rhfTextField,
    componentsDocsLink.rhfNumberInput,
    componentsDocsLink.rhfPasswordInput,
    componentsDocsLink.rhfTagsInput,
    componentsDocsLink.rhfFileUploader
  ];
  const codeLinks = [SourceCodeLinks.inputs, CodeSandboxLinks.inputs];

  return (
    <ContentContainer>
      <PageHeading title={metadata.title as string} />
      <SubHeading title={metadata.description as string} />
      <InputsWithRegisterForm />
      <LinksList links={links} />
      <LinksList links={codeLinks} areCodeLinks />
    </ContentContainer>
  );
};

export default TextFieldPage;
