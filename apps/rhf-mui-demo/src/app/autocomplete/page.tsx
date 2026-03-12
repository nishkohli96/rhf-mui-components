import { ContentContainer, PageHeading, LinksList, SubHeading } from '@/components';
import { componentsDocsLink, SourceCodeLinks, pageMetadata } from '@/constants';
import AutocompleteForm from '@/forms/autocomplete';

export const metadata = pageMetadata.autocomplete;

const MultiSelectDropdownFormPage = () => {
  const codeLinks = [
    SourceCodeLinks.countrySelect,
  ];
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
      <LinksList links={codeLinks} areCodeLinks />
    </ContentContainer>
  );
};

export default MultiSelectDropdownFormPage;
