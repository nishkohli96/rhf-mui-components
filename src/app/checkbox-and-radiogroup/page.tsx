import { ContentContainer, PageHeading, SubHeading } from '@/components';
import { pageMetadata } from '@/constants';
import CheckboxRadioClient from '@/forms/checkbox-and-radiogroup-with-zod/Client';

export const metadata = pageMetadata.checkboxAndRadio;

const CheckboxRadioZodFormPage = () => {
  return (
    <ContentContainer>
      <PageHeading title={metadata.title as string} />
      <SubHeading title={metadata.description as string}/>
      <CheckboxRadioClient />
    </ContentContainer>
  );
};

export default CheckboxRadioZodFormPage;
