import dynamic from 'next/dynamic';
import { ContentContainer, PageHeading, LinksList, SubHeading } from '@/components';
import { DocsLinks, SourceCodeLinks, pageMetadata } from '@/constants';

const ClientForm = dynamic(() => import('@/forms/autocomplete'), { ssr: false });

export const metadata = pageMetadata.autocomplete;

const MultiSelectDropdownFormPage = () => {
  const codeLinks = [
    SourceCodeLinks.countrySelect,
  ];
  const docsLinks = [
    DocsLinks.rhfAutocomplete,
    DocsLinks.rhfMultiAutocomplete,
    DocsLinks.rhfCountrySelect
  ];

  return (
    <ContentContainer>
      <PageHeading title={metadata.title as string} />
      <SubHeading title={metadata.description as string}/>
      <ClientForm />
      <LinksList links={docsLinks} />
      <LinksList links={codeLinks} areCodeLinks />
    </ContentContainer>
  );
};

export default MultiSelectDropdownFormPage;
