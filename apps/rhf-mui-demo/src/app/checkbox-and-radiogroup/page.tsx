import dynamic from 'next/dynamic';
import { ContentContainer, LinksList, PageHeading, SubHeading } from '@/components';
import {
  DocsLinks,
  pageMetadata,
  ValidationLibLinks
} from '@/constants';

const ClientForm = dynamic(() => import('@/forms/checkbox-and-radiogroup-with-zod'), { ssr: false });


export const metadata = pageMetadata.checkboxAndRadio;

const CheckboxRadioZodFormPage = () => {
  const links = [
    DocsLinks.rhfCheckbox,
    DocsLinks.rhfCheckboxGroup,
    DocsLinks.rhfRadioGroup,
    ValidationLibLinks.zod
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

export default CheckboxRadioZodFormPage;
