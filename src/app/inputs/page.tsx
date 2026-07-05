import dynamic from 'next/dynamic';
import { ContentContainer, LinksList, PageHeading, SubHeading } from '@/components';
import { pageMetadata, DocsLinks, SourceCodeLinks, CodeSandboxLinks } from '@/constants';

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
  const codeLinks = [
    SourceCodeLinks.inputs,
    CodeSandboxLinks.inputs
  ];

  return (
    <ContentContainer>
      <PageHeading title={metadata.title as string} />
      <SubHeading title={metadata.description as string}/>
      <ClientForm />
      <LinksList links={links} />
      <LinksList links={codeLinks} areCodeLinks />
    </ContentContainer>
  );
};

export default TextFieldPage;
