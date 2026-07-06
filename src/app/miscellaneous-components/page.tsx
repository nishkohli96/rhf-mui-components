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
import MiscellaneousComponentsForm from '@/forms/miscellaneous-components/Client';

export const metadata = pageMetadata.miscComponents;

const MiscellaneousComponentsFormPage = () => {
  const links = [
    componentsDocsLink.rhfColorPicker,
    componentsDocsLink.rhfRichTextEditor,
    componentsDocsLink.rhfPhoneInput
  ];
  const codeLinks = [
    SourceCodeLinks.miscellaneous,
    CodeSandboxLinks.miscellaneous
  ];

  return (
    <ContentContainer>
      <PageHeading title={metadata.title as string} />
      <SubHeading title={metadata.description as string} />
      <MiscellaneousComponentsForm />
      <LinksList links={links} />
      <LinksList links={codeLinks} areCodeLinks />
    </ContentContainer>
  );
};

export default MiscellaneousComponentsFormPage;
