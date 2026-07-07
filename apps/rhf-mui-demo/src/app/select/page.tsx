import dynamic from 'next/dynamic';
import { ContentContainer, LinksList, PageHeading, SubHeading } from '@/components';
import {
  DocsLinks,
  pageMetadata,
  ValidationLibLinks
} from '@/constants';

const ClientForm = dynamic(() => import('@/forms/select-with-class-validator'), { ssr: false });

export const metadata = pageMetadata.select;

const SelectWithClassValidatorPage = () => {
  const links = [
    DocsLinks.rhfSelect,
    DocsLinks.rhfNativeSelect,
    ValidationLibLinks.classValidator
  ];

  return (
    <ContentContainer>
      <PageHeading title={metadata.title as string} />
      <SubHeading title={metadata.description as string}/>
      <ClientForm />
      <LinksList links={links} />
    </ContentContainer>
  );
};

export default SelectWithClassValidatorPage;
