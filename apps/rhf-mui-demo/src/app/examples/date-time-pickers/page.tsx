import type { Metadata } from 'next';
import { ContentContainer, LinksList, PageHeading, SubHeading } from '@/components';
import { DocsLinks, SourceCodeLinks, CodeSandboxLinks } from '@/constants';
import { DateTimePickersForm } from '@/forms';

const title = 'Date & Time Pickers';
const description = 'A form using RHFDatePicker, RHFTimePicker & RHFDateTimePicker components.';

export const metadata: Metadata = {
  title,
  description
};

export default function DateTimePickerFormPage() {
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
      <DateTimePickersForm />
      <LinksList links={codeLinks} areCodeLinks />
      <LinksList links={links} />
    </ContentContainer>
  );
}
