import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { ContentContainer, LinksList, PageHeading, SubHeading } from '@/components';
import { DocsLinks, SourceCodeLinks, CodeSandboxLinks, ValidationLibLinks } from '@/constants';

const ClientForm = dynamic(() => import('@/forms/select-with-class-validator'), { ssr: false });

const title = 'Select with Class-Validator';
const description = 'Form utilizing RHFSelect and RHFNativeSelect with validation managed using class-validator.';

export const metadata: Metadata = {
  title,
  description
};

const SelectWithClassValidatorPage = () => {
  const links = [
    DocsLinks.rhfSelect,
    DocsLinks.rhfNativeSelect,
    ValidationLibLinks.classValidator
  ];
  const codeLinks = [
    SourceCodeLinks.select,
    CodeSandboxLinks.select
  ];

  return (
    <ContentContainer>
      <PageHeading title={title} />
      <SubHeading title={description}/>
      <ClientForm />
      <LinksList links={links} />
      <LinksList links={codeLinks} areCodeLinks />
    </ContentContainer>
  );
};

export default SelectWithClassValidatorPage;
