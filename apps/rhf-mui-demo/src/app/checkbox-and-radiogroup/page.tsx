import dynamic from 'next/dynamic';
import { ContentContainer, LinksList, PageHeading, SubHeading } from '@/components';
import {
  pageMetadata,
  DocsLinks,
  SourceCodeLinks,
  CodeSandboxLinks,
  ValidationLibLinks
} from '@/constants';

// const ClientForm = dynamic(() => import('@/forms/checkbox-and-radiogroup-with-zod'), { ssr: false });

export const metadata = pageMetadata.checkboxAndRadio;

const CheckboxRadioZodFormPage = () => {
  const links = [
    DocsLinks.rhfCheckbox,
    DocsLinks.rhfCheckboxGroup,
    DocsLinks.rhfRadioGroup,
    ValidationLibLinks.zod
  ];
  const codeLinks = [
    SourceCodeLinks.checkboxRadio,
    CodeSandboxLinks.checkboxRadio
  ];

  return (
    <ContentContainer>
      <PageHeading title={metadata.title as string} />
      <SubHeading title={metadata.description as string}/>
      {/* <ClientForm /> */}
      <LinksList links={links} />
      <LinksList links={codeLinks} areCodeLinks />
    </ContentContainer>
  );
};

export default CheckboxRadioZodFormPage;
