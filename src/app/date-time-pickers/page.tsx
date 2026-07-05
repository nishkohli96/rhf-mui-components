import dynamic from 'next/dynamic';
import { ContentContainer, LinksList, PageHeading, SubHeading } from '@/components';
import { pageMetadata, SourceCodeLinks, CodeSandboxLinks } from '@/constants';

const ClientForm = dynamic(() => import('@/forms/date-time-pickers'), { ssr: false });

export const metadata = pageMetadata.dateTimePickers;

const DateTimePickerFormPage = () => {
  const codeLinks = [
    SourceCodeLinks.dateTimePickers,
    CodeSandboxLinks.dateTimePickers
  ];

  return (
    <ContentContainer>
      <PageHeading title={metadata.title as string} />
      <SubHeading title={metadata.description as string}/>
      <ClientForm />
      <LinksList links={codeLinks} areCodeLinks />
    </ContentContainer>
  );
};

export default DateTimePickerFormPage;
