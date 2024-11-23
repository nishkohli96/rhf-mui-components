import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { ContentContainer, PageHeading, LinksList, SubHeading } from '@/components';
import { DocsLinks, SourceCodeLinks, CodeSandboxLinks, ValidationLibLinks } from '@/constants';

const ClientForm = dynamic(() => import('@/forms/country-select'), { ssr: false });

const title = 'Country Select Examples';
const description = 'Form showcasing the RHFCountrySelect component to select single or multiple countries';

export const metadata: Metadata = {
  title,
  description
};

const CountrySelectFormPage = () => {
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

export default CountrySelectFormPage;
