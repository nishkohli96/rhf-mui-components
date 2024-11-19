import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { ContentContainer, PageHeading, LinksList, SubHeading } from '@/components';
import { DocsLinks, SourceCodeLinks, CodeSandboxLinks, ValidationLibLinks } from '@/constants';

const ClientForm = dynamic(() => import('@/forms/country-select'), { ssr: false });

const title = 'Country Select Examples';
const description = 'Form showcasing the field to select single or multiple countries';

export const metadata: Metadata = {
  title,
  description
};

const CountrySelectFormPage = () => {
  const links = Object.keys(DocsLinks).map(k => DocsLinks[k]);
  const codeLinks = [
    SourceCodeLinks.completeForm,
    CodeSandboxLinks.completeForm
  ];

  return (
    <ContentContainer>
      <PageHeading title={title} />
      <SubHeading title={description}/>
      <ClientForm />
      <LinksList links={codeLinks} areCodeLinks />
      <LinksList links={[...links, ValidationLibLinks.joi]} />
    </ContentContainer>
  );
}

export default CountrySelectFormPage;