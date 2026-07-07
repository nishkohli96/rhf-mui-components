import dynamic from 'next/dynamic';
import { ContentContainer, LinksList, PageHeading, SubHeading } from '@/components';
import { DocsLinks, pageMetadata } from '@/constants';

const ClientForm = dynamic(() => import('@/forms/inputs-with-register-options'), { ssr: false });

export const metadata = pageMetadata.inputs;

const TextFieldPage = () => {
  const links = [
    DocsLinks.rhfTextField,
    DocsLinks.rhfNumberInput,
    DocsLinks.rhfPasswordInput,
    DocsLinks.rhfTagsInput,
    DocsLinks.rhfFileUploader
  ];

  return (
    <ContentContainer>
      <PageHeading title={metadata.title as string} />
      <SubHeading title={metadata.description as string}/>
      <ClientForm />
      <LinksList links={links} />
    </ContentContainer>
  );
};

export default TextFieldPage;
