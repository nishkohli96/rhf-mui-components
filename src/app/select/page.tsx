import {
  ContentContainer,
  PageHeading,
  SubHeading
} from '@/components';
import { pageMetadata } from '@/constants';
import SelectFormWithClassValidator from '@/forms/select-with-class-validator/Client';

export const metadata = pageMetadata.select;

const SelectWithClassValidatorPage = () => {
  return (
    <ContentContainer>
      <PageHeading title={metadata.title as string} />
      <SubHeading title={metadata.description as string} />
      <SelectFormWithClassValidator />
    </ContentContainer>
  );
};

export default SelectWithClassValidatorPage;
