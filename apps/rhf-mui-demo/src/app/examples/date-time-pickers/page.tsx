import type { Metadata } from 'next';
import { ContentContainer, PageHeading, SubHeading } from '@/components';
import { DateTimePickersForm } from '@/forms';

const title = 'Date & Time Pickers';
const description = 'DatePicker, TimePicker & DateTimePicker';

export const metadata: Metadata = {
  title,
  description
};

export default function DateTimePickerFormPage() {
  return (
    <ContentContainer>
      <PageHeading title={title} />
      <SubHeading title={description}/>
      <DateTimePickersForm />
    </ContentContainer>
  );
}
