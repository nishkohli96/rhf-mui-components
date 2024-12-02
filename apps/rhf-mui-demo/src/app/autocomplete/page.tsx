import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { ContentContainer, PageHeading, LinksList, SubHeading } from '@/components';
import { DocsLinks, SourceCodeLinks } from '@/constants';

const ClientForm = dynamic(() => import('@/forms/autocomplete'), { ssr: false });

const title = 'Autocomplete';
const description = 'Showcase of Autocomplete components - RHFAutocomplete, RHFMultiAutocomplete and RHFCountrySelect designed for selecting single or multiple values in form.';

export const metadata: Metadata = {
  title,
  description
};

const MultiSelectDropdownFormPage = () => {
  const codeLinks = [
    SourceCodeLinks.countrySelect,
  ];
  const docsLinks = [
    DocsLinks.rhfCountrySelect
  ];

  return (
    <ContentContainer>
      <PageHeading title={title} />
      <SubHeading title={description}/>
      <ClientForm />
      <LinksList links={docsLinks} />
      <LinksList links={codeLinks} areCodeLinks />
    </ContentContainer>
  );
};

export default MultiSelectDropdownFormPage;
