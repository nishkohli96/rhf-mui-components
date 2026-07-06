import {
  ContentContainer,
  PageHeading,
  SubHeading
} from '@/components';
import { pageMetadata } from '@/constants';
import DateTimePickersForm from '@/forms/date-time-pickers/Client';

export const metadata = pageMetadata.dateTimePickers;

const DateTimePickerFormPage = () => {
  return (
    <ContentContainer>
      <PageHeading title={metadata.title as string} />
      <SubHeading title={metadata.description as string} />
      <DateTimePickersForm />
    </ContentContainer>
  );
};

export default DateTimePickerFormPage;
