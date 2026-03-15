import { ContentContainer, LinksList, PageHeading, SubHeading } from '@/components';
import {
  pageMetadata,
  componentsDocsLink,
  SourceCodeLinks,
  CodeSandboxLinks,
  ValidationLibLinks
} from '@/constants';
import CheckboxRadioClient from '@/forms/checkbox-and-radiogroup-with-zod/Client';

export const metadata = pageMetadata.checkboxAndRadio;

const CheckboxRadioZodFormPage = () => {
  const links = [
    componentsDocsLink.rhfCheckbox,
    componentsDocsLink.rhfCheckboxGroup,
    componentsDocsLink.rhfRadioGroup,
    ValidationLibLinks.zod
  ];
  const codeLinks = [
    SourceCodeLinks.checkboxRadio,
    CodeSandboxLinks.checkboxRadio
  ];

  return (
    <ContentContainer>
      <PageHeading title={metadata.title as string} />
      <SubHeading title={metadata.description as string}/>
      <CheckboxRadioClient />
      <LinksList links={links} />
      <LinksList links={codeLinks} areCodeLinks />
    </ContentContainer>
  );
};

export default CheckboxRadioZodFormPage;
