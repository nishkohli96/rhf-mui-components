import dynamic from 'next/dynamic';
import { ContentContainer, LinksList, PageHeading, SubHeading } from '@/components';
import {
  DocsLinks,
  pageMetadata,
  ValidationLibLinks
} from '@/constants';

const ClientForm = dynamic(() => import('@/forms/complete-form-with-joi'), { ssr: false });

export const metadata = pageMetadata.completeFormJoi;

const CompleteFormWithJoiPage = () => {
  const links = Object.keys(DocsLinks).map(k => DocsLinks[k]);

  return (
    <ContentContainer>
      <PageHeading title={metadata.title as string} />
      <SubHeading title={metadata.description as string}/>
      <ClientForm />
      <LinksList links={[...links, ValidationLibLinks.joi]} />
    </ContentContainer>
  );
};

export default CompleteFormWithJoiPage;
