import dynamic from 'next/dynamic';
import { ContentContainer, LinksList, PageHeading, SubHeading } from '@/components';
import { DocsLinks, pageMetadata } from '@/constants';

const ClientForm = dynamic(() => import('@/forms/complete-form'), { ssr: false });

export const metadata = pageMetadata.completeForm;

const CompleteFormPage = () => {
  const links = Object.keys(DocsLinks).map(k => DocsLinks[k]);

  return (
    <ContentContainer>
      <PageHeading title={metadata.title as string} />
      <SubHeading title={metadata.description as string}/>
      <ClientForm />
      <LinksList links={links} />
    </ContentContainer>
  );
};

export default CompleteFormPage;
