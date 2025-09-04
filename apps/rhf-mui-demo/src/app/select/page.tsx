import { ContentContainer, LinksList, PageHeading, SubHeading } from '@/components';
import {
  pageMetadata,
  DocsLinks,
  SourceCodeLinks,
  CodeSandboxLinks,
  ValidationLibLinks
} from '@/constants';
import SelectFormWithClassValidator from '@/forms/select-with-class-validator';

export const metadata = pageMetadata.select;

const SelectWithClassValidatorPage = () => {
  const links = [
    DocsLinks.rhfSelect,
    DocsLinks.rhfNativeSelect,
    ValidationLibLinks.classValidator
  ];
  const codeLinks = [
    SourceCodeLinks.select,
    CodeSandboxLinks.select
  ];

  return (
    <ContentContainer>
      <PageHeading title={metadata.title as string} />
      <SubHeading title={metadata.description as string}/>
      <SelectFormWithClassValidator />
      <LinksList links={links} />
      <LinksList links={codeLinks} areCodeLinks />
    </ContentContainer>
  );
};

export default SelectWithClassValidatorPage;
