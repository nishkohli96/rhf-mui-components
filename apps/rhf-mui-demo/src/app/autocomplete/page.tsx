import {
  ContentContainer,
  PageHeading,
  LinksList,
  SubHeading,
} from '@/components';
import { componentsDocsLink, pageMetadata } from '@/constants';
import AutocompleteForm from '@/forms/autocomplete/Client';

export const metadata = pageMetadata.autocomplete;

const MultiSelectDropdownFormPage = () => {
  const docsLinks = [
    componentsDocsLink.rhfAutocomplete,
    componentsDocsLink.rhfMultiAutocomplete,
    componentsDocsLink.rhfCountrySelect
  ];

  return (
    <ContentContainer>
      <PageHeading title={metadata.title as string} />
      <SubHeading title={metadata.description as string}/>
      <AutocompleteForm />
      <LinksList links={docsLinks} />
    </ContentContainer>
  );
};

export default MultiSelectDropdownFormPage;
