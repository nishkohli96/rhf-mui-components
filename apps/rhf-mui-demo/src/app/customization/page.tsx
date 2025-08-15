import dynamic from 'next/dynamic';
import { ContentContainer, LinksList, PageHeading, SubHeading } from '@/components';
import {
  pageMetadata,
  DocsLinks,
  SourceCodeLinks,
  CodeSandboxLinks,
  ValidationLibLinks
} from '@/constants';

// const ClientForm = dynamic(() => import('@/forms/styled-form-with-reusable-component'), { ssr: false });

export const metadata = pageMetadata.customization;

const CustomizationPage = () => {
  const links = [
    DocsLinks.rhfTextField,
    DocsLinks.rhfDatePicker,
    ValidationLibLinks.luxon
  ];
  const codeLinks = [
    SourceCodeLinks.customization,
    SourceCodeLinks.styledTextField,
    CodeSandboxLinks.customization
  ];
  return (
    <ContentContainer>
      <PageHeading title={metadata.title as string} />
      <SubHeading title={metadata.description as string} />
      {/* <ClientForm /> */}
      <LinksList links={links} />
      <LinksList links={codeLinks} areCodeLinks />
    </ContentContainer>
  );
};

export default CustomizationPage;
