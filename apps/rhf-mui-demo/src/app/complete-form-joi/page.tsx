import {
  ContentContainer,
  PageHeading,
  LinksList,
  SubHeading
} from '@/components';
import {
  pageMetadata,
  componentsDocsLink,
  ValidationLibLinks
} from '@/constants';
import CompleteFormWithJoi from '@/forms/complete-form-with-joi/Client';

export const metadata = pageMetadata.completeFormJoi;

const CompleteFormWithJoiPage = () => {
  const docsLinks = Object.keys(componentsDocsLink).map(
    k => componentsDocsLink[k]
  );
  return (
    <ContentContainer>
      <PageHeading title={metadata.title as string} />
      <SubHeading title={metadata.description as string} />
      <CompleteFormWithJoi />
      <LinksList links={[...docsLinks, ValidationLibLinks.joi]} />
    </ContentContainer>
  );
};

export default CompleteFormWithJoiPage;
