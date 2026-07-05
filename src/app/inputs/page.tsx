import dynamic from 'next/dynamic';
import { ContentContainer, PageHeading, SubHeading } from '@/components';
import { pageMetadata } from '@/constants';

const ClientForm = dynamic(() => import('@/forms/inputs-with-register-options'), { ssr: false });

export const metadata = pageMetadata.inputs;

const TextFieldPage = () => {
  return (
    <ContentContainer>
      <PageHeading title={metadata.title as string} />
      <SubHeading title={metadata.description as string}/>
      <ClientForm />
    </ContentContainer>
  );
};

export default TextFieldPage;
