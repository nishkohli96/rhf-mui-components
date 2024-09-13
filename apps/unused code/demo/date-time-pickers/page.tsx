import type { Metadata } from 'next';
import { PageHeading, SubHeading } from '@/components';
import { DateTimePickersForm } from '@/forms';

const title = 'Date & Time Pickers';
const description = 'DatePicker, TimePicker & DateTimePicker';

export const metadata: Metadata = {
  title,
  description
};

export default function DateTimePickerFormPage() {
  return (
    <main>
      <PageHeading title={title} />
      <SubHeading title={description}/>
      <DateTimePickersForm />
    </main>
  );
}
