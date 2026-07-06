import {
  ContentContainer,
  PageHeading,
  SubHeading,
} from '@/components';
import { pageMetadata } from '@/constants';
import AutocompleteForm from '@/forms/autocomplete/Client';

export const metadata = pageMetadata.autocomplete;

const MultiSelectDropdownFormPage = () => {
  return (
    <ContentContainer>
      <PageHeading title={metadata.title as string} />
      <SubHeading title={metadata.description as string}/>
      <AutocompleteForm />
    </ContentContainer>
  );
};

export default MultiSelectDropdownFormPage;
