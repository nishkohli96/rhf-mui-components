import {
  ContentContainer,
  PageHeading,
  LinksList,
  SubHeading
} from '@/components';
import {
  pageMetadata,
  componentsDocsLink
} from '@/constants';
import CompleteForm from '@/forms/complete-form/Client';

export const metadata = pageMetadata.completeForm;

const CompleteFormPage = () => {
  const docsLinks = Object.keys(componentsDocsLink).map(
    k => componentsDocsLink[k]
  );

  return (
    <ContentContainer>
      <PageHeading title={metadata.title as string} />
      <SubHeading title={metadata.description as string} />
      <CompleteForm />
      <LinksList links={docsLinks} />
    </ContentContainer>
  );
};

export default CompleteFormPage;
