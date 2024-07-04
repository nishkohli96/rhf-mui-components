import Layout from '@theme/Layout';
import { PageHeading } from '@site/src/components';
import { TextAndPasswordInputForm } from '@site/src/forms';

export default function TextFieldPage() {
	const pageTitle = 'TextField & PasswordInput';
  return (
    <Layout
      title={pageTitle}
      description="Description will go into a meta tag in <head />"
    >
      <PageHeading title={pageTitle} />
      <TextAndPasswordInputForm />
    </Layout>
  );
}
