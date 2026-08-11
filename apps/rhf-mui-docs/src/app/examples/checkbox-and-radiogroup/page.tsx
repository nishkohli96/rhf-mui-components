import { ContentContainer, PageHeading, SubHeading } from '@/components';
import { pageMetadata } from '@/constants';
import CheckboxRadioForm from '@/forms/checkbox-and-radiogroup/Client';

export const metadata = pageMetadata.checkboxAndRadioExample;

export default function CheckboxRadioGroupForm() {
  return (
    <ContentContainer>
      <PageHeading title={metadata.title as string} />
      <SubHeading title={metadata.description as string}/>
      <CheckboxRadioForm />
    </ContentContainer>
  );
}
