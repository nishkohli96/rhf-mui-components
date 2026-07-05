import dynamic from 'next/dynamic';
import { ContentContainer, PageHeading, SubHeading } from '@/components';
import { pageMetadata } from '@/constants';

const ClientForm = dynamic(() => import('@/forms/styled-form-with-reusable-component'), { ssr: false });

export const metadata = pageMetadata.customization;

const CustomizationPage = () => {
  return (
    <ContentContainer>
      <PageHeading title={metadata.title as string} />
      <SubHeading title={metadata.description as string} />
      <ClientForm />
    </ContentContainer>
  );
};

export default CustomizationPage;
