import {
  ContentContainer,
  PageHeading,
  SubHeading
} from '@/components';
import { pageMetadata } from '@/constants';
import MiscellaneousComponentsForm from '@/forms/miscellaneous-components/Client';

export const metadata = pageMetadata.miscComponents;

const MiscellaneousComponentsFormPage = () => {
  return (
    <ContentContainer>
      <PageHeading title={metadata.title as string} />
      <SubHeading title={metadata.description as string} />
      <MiscellaneousComponentsForm />
    </ContentContainer>
  );
};

export default MiscellaneousComponentsFormPage;
