import type { Metadata } from 'next';
import { ContentContainer, LinksList, PageHeading, SubHeading } from '@/components';
import { DocsLinks } from '@/constants';
import { DateTimePickersForm } from '@/forms';

const title = 'Date & Time Pickers';
const description = 'DatePicker, TimePicker & DateTimePicker';

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
  return (
    <ContentContainer>
      <PageHeading title={title} />
      <SubHeading title={description}/>
      <DateTimePickersForm />
      <LinksList links={links} />
    </ContentContainer>
  );
}
