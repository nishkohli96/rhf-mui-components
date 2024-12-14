import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { ContentContainer, LinksList, PageHeading, SubHeading } from '@/components';
import { DocsLinks, SourceCodeLinks, CodeSandboxLinks } from '@/constants';

const ClientForm = dynamic(() => import('@/forms/date-time-pickers'), { ssr: false });

const title = 'Date & Time Pickers';
const description = 'A form using RHFDatePicker, RHFTimePicker & RHFDateTimePicker components.';

export const metadata: Metadata = {
  title,
  description
};

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
      <PageHeading title={title} />
      <SubHeading title={description}/>
      <ClientForm />
      <LinksList links={links} />
      <LinksList links={codeLinks} areCodeLinks />
    </ContentContainer>
  );
};

export default DateTimePickerFormPage;

