import dynamic from 'next/dynamic';
import { ContentContainer, LinksList, PageHeading, SubHeading } from '@/components';
import { DocsLinks, pageMetadata } from '@/constants';

const ClientForm = dynamic(() => import('@/forms/autocomplete'), { ssr: false });

export const metadata = pageMetadata.autocomplete;

const MultiSelectDropdownFormPage = () => {
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
    </ContentContainer>
  );
};

export default MultiSelectDropdownFormPage;
