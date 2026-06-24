import {
  ContentContainer,
  LinksList,
  PageHeading,
  SubHeading
} from '@/components';
import {
  pageMetadata,
  componentsDocsLink,
  SourceCodeLinks,
  CodeSandboxLinks
} from '@/constants';
import DateTimePickersForm from '@/forms/date-time-pickers/Client';

export const metadata = pageMetadata.dateTimePickers;

const DateTimePickerFormPage = () => {
  const links = [
    componentsDocsLink.rhfDatePicker,
    componentsDocsLink.rhfTimePicker,
    componentsDocsLink.rhfDateTimePicker
  ];
  const codeLinks = [
    SourceCodeLinks.dateTimePickers,
    CodeSandboxLinks.dateTimePickers
  ];

  return (
    <ContentContainer>
      <PageHeading title={metadata.title as string} />
      <SubHeading title={metadata.description as string} />
      <DateTimePickersForm />
      <LinksList links={links} />
      <LinksList links={codeLinks} areCodeLinks />
    </ContentContainer>
  );
};

export default DateTimePickerFormPage;
