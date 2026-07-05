import dynamic from 'next/dynamic';
import { ContentContainer, PageHeading, SubHeading } from '@/components';
import { pageMetadata } from '@/constants';

const ClientForm = dynamic(() => import('@/forms/date-time-pickers'), { ssr: false });

export const metadata = pageMetadata.dateTimePickers;

const DateTimePickerFormPage = () => {
  return (
    <ContentContainer>
      <PageHeading title={metadata.title as string} />
      <SubHeading title={metadata.description as string}/>
      <ClientForm />
    </ContentContainer>
  );
};

export default DateTimePickerFormPage;
