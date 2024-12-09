import type { Metadata } from 'next';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { ENV_VARS } from '@/constants';
import { ContentContainer, PageHeading } from '@/components';

export const metadata: Metadata = {
  title: 'Introduction',
  description: 'Overview of the Examples Website for RHF-MUI Components'
};

const HomePage = () => {
  return (
    <main>
      <ContentContainer>
        <PageHeading title="@nish1896/rhf-mui-components" />
        <Typography variant="h6" color="steelblue">
          &quot;A suite 20 of Material-UI and other form components to create and
          style forms effortlessly within minutes!&quot;
        </Typography>

        <Typography variant="body1" sx={{ mt: '20px' }}>
          This website demonstrates examples from the
          <Link
            href="https://www.npmjs.com/package/@nish1896/rhf-mui-components"
            target="_blank"
          >
            {' @nish1896/rhf-mui-components '}
          </Link>
          package by embedding forms for each component, showcasing various
          variations and validation approaches using different form libraries.
          For each form, you can view the form&apos;s field values and errors
          through the attached
          {' '}
          <b>formState component</b>
          . Each page also
          provides links to the relevant documentation and the source code for
          the components used.
        </Typography>
        <Typography variant="body1" sx={{ mt: '20px' }}>
          To view the documentation of this package, please visit
          {' '}
          <Link href={ENV_VARS.DOCS_URL} target="_blank">
            {` ${ENV_VARS.DOCS_URL}.`}
          </Link>
        </Typography>
      </ContentContainer>
    </main>
  );
};

export default HomePage;
