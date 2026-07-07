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
import MiscellaneousComponentsForm from '@/forms/miscellaneous-components/Client';

export const metadata = pageMetadata.miscComponents;

const MiscellaneousComponentsFormPage = () => {
  const docsLinks = [
    componentsDocsLink.rhfColorPicker,
    componentsDocsLink.rhfRichTextEditor,
    componentsDocsLink.rhfPhoneInput
  ];

  return (
    <ContentContainer>
      <PageHeading title={metadata.title as string} />
      <SubHeading title={metadata.description as string} />
      <MiscellaneousComponentsForm />
      <LinksList links={docsLinks} />
    </ContentContainer>
  );
};

export default MiscellaneousComponentsFormPage;
