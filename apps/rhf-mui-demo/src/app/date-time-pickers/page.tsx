import {
  ContentContainer,
  LinksList,
  PageHeading,
  SubHeading
} from '@/components';
import {
  pageMetadata,
  componentsDocsLink
} from '@/constants';
import DateTimePickersForm from '@/forms/date-time-pickers/Client';

export const metadata = pageMetadata.dateTimePickers;

const DateTimePickerFormPage = () => {
  const docsLinks = [
    componentsDocsLink.rhfDatePicker,
    componentsDocsLink.rhfTimePicker,
    componentsDocsLink.rhfDateTimePicker
  ];

  return (
    <ContentContainer>
      <PageHeading title={metadata.title as string} />
      <SubHeading title={metadata.description as string} />
      <DateTimePickersForm />
      <LinksList links={docsLinks} />
    </ContentContainer>
  );
};

export default DateTimePickerFormPage;
