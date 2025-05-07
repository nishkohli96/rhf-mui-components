import dynamic from 'next/dynamic';
import { ContentContainer, LinksList, PageHeading, SubHeading } from '@/components';
import { pageMetadata, DocsLinks, SourceCodeLinks, CodeSandboxLinks } from '@/constants';

const ClientForm = dynamic(() => import('@/forms/date-time-pickers'), { ssr: false });

export const metadata = pageMetadata.dateTimePickers;

const DateTimePickerFormPage = () => {
  const links = [
    DocsLinks.rhfDatePicker,
    DocsLinks.rhfTimePicker,
    DocsLinks.rhfDateTimePicker
  ];
  const codeLinks = [
    SourceCodeLinks.dateTimePickers,
    CodeSandboxLinks.dateTimePickers
  ];

  return (
    <ContentContainer>
      <PageHeading title={metadata.title as string} />
      <SubHeading title={metadata.description as string}/>
      <ClientForm />
      <LinksList links={links} />
      <LinksList links={codeLinks} areCodeLinks />
    </ContentContainer>
  );
};

export default DateTimePickerFormPage;

