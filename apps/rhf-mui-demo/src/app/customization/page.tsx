import { ContentContainer, LinksList, PageHeading, SubHeading } from '@/components';
import {
  pageMetadata,
  componentsDocsLink,
  SourceCodeLinks,
  CodeSandboxLinks,
  ValidationLibLinks
} from '@/constants';
import StyledReusableComponentForm from '@/forms/styled-form-with-reusable-component';

export const metadata = pageMetadata.customization;

const CustomizationPage = () => {
  const links = [
    componentsDocsLink.rhfTextField,
    componentsDocsLink.rhfDatePicker,
    ValidationLibLinks.luxon
  ];
  const codeLinks = [
    SourceCodeLinks.customization,
    SourceCodeLinks.styledTextField,
    CodeSandboxLinks.customization
  ];
  return (
    <ContentContainer>
      <PageHeading title={metadata.title as string} />
      <SubHeading title={metadata.description as string} />
      <StyledReusableComponentForm />
      <LinksList links={links} />
      <LinksList links={codeLinks} areCodeLinks />
    </ContentContainer>
  );
};

export default CustomizationPage;
