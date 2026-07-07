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
import SelectFormWithClassValidator from '@/forms/select-with-class-validator/Client';

export const metadata = pageMetadata.select;

const SelectWithClassValidatorPage = () => {
  const docsLinks = [
    componentsDocsLink.rhfSelect,
    componentsDocsLink.rhfNativeSelect,
    ValidationLibLinks.classValidator
  ];

  return (
    <ContentContainer>
      <PageHeading title={metadata.title as string} />
      <SubHeading title={metadata.description as string} />
      <SelectFormWithClassValidator />
      <LinksList links={docsLinks} />
    </ContentContainer>
  );
};

export default SelectWithClassValidatorPage;
