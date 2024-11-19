import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { ContentContainer, LinksList, PageHeading, SubHeading } from '@/components';
import { DocsLinks, SourceCodeLinks, CodeSandboxLinks, ValidationLibLinks } from '@/constants';

const ClientForm = dynamic(() => import('@/forms/checkbox-and-radiogroup-with-zod'), { ssr: false });

const title = 'CheckboxGroup & RadioGroup with Zod Validation';
const description = 'Form utilizing RHFCheckbox, RHFCheckboxGroup & RHFRadioGroup components with validation managed by Zod.';

export const metadata: Metadata = {
  title,
  description
};

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
      <PageHeading title={title} />
      <SubHeading title={description}/>
      <ClientForm />
      <LinksList links={codeLinks} areCodeLinks />
      <LinksList links={links} />
    </ContentContainer>
  );
}

export default CheckboxRadioZodFormPage;
