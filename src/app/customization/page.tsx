import {
  ContentContainer,
  PageHeading,
  SubHeading
} from '@/components';
import { pageMetadata } from '@/constants';
import StyledReusableComponentForm from '@/forms/styled-form-with-reusable-component/Client';

export const metadata = pageMetadata.customization;

const CustomizationPage = () => {
  return (
    <ContentContainer>
      <PageHeading title={metadata.title as string} />
      <SubHeading title={metadata.description as string} />
      <StyledReusableComponentForm />
    </ContentContainer>
  );
};

export default CustomizationPage;
