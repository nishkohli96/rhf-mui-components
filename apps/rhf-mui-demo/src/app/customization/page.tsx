import {
  ContentContainer,
  LinksList,
  PageHeading,
  SubHeading
} from '@/components';
import {
  pageMetadata,
  componentsDocsLink,
  ValidationLibLinks
} from '@/constants';
import StyledReusableComponentForm from '@/forms/styled-form-with-reusable-component/Client';

export const metadata = pageMetadata.customization;

const CustomizationPage = () => {
  const docsLinks = [
    componentsDocsLink.rhfTextField,
    componentsDocsLink.rhfDatePicker,
    ValidationLibLinks.luxon
  ];

  return (
    <ContentContainer>
      <PageHeading title={metadata.title as string} />
      <SubHeading title={metadata.description as string} />
      <StyledReusableComponentForm />
      <LinksList links={docsLinks} />
    </ContentContainer>
  );
};

export default CustomizationPage;
