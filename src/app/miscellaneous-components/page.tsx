import dynamic from 'next/dynamic';
import { ContentContainer, PageHeading, SubHeading } from '@/components';
import { pageMetadata } from '@/constants';

const ClientForm = dynamic(() => import('@/forms/miscellaneous-components'), { ssr: false });

export const metadata = pageMetadata.miscComponents;

const MiscellaneousComponentsFormPage = () => {
  return (
    <ContentContainer>
      <PageHeading title={metadata.title as string} />
      <SubHeading title={metadata.description as string}/>
      <ClientForm />
    </ContentContainer>
  );
};

export default MiscellaneousComponentsFormPage;
