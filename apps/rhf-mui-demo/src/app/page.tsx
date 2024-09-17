import type { Metadata } from 'next';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { ENV_VARS } from '@/constants';
import { ContentContainer, PageHeading } from '@/components';

export const metadata: Metadata = {
  title: 'Introduction',
  description: 'Introduction to the examples website for RHF-Mui Components'
};

export default function Home() {
  return (
    <main>
      <ContentContainer>
        <PageHeading title="@nish1896/rhf-mui-components" />

        <Box sx={{ my: '20px' }}>
          <Image
            alt="NPM Version"
            src="https://img.shields.io/npm/v/@nish1896/rhf-mui-components"
            style={{ display: 'inline-block', marginRight: '10px' }}
            width={100}
            height={50}
          />
          <Image
            alt="NPM Version"
            src="https://img.shields.io/npm/dt/@nish1896/eslint-config"
            style={{ display: 'inline-block', marginRight: '10px' }}
            width={100}
            height={50}
          />
          {/* <img
            alt="NPM Downloads"
            src="https://img.shields.io/npm/dt/@nish1896/rhf-mui-components"
            style={{ display: 'inline-block', marginRight: '10px' }}
          />
          <img
            alt="GitHub Release Date"
            src="https://img.shields.io/github/release-date/nishkohli96/rhf-mui-components"
            style={{ display: 'inline-block', marginRight: '10px' }}
          /> */}
        </Box>

        <Typography variant="h6" color="steelblue">
          &quot;A suite of Material-UI and other form components to create and style
          forms effortlessly within minutes!&quot;
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
          Below each form, you can view the form&apos;s field values and errors
          through the attached formState component. Each page also provides
          links to the relevant documentation and the source code for the
          components used.
        </Typography>
        <Typography variant="body1" sx={{ mt: '20px' }}>
          To view the documentation of this package, please visit
          <Link href={ENV_VARS.DOCS_URL} target="_blank">
            {` ${ENV_VARS.DOCS_URL}.`}
          </Link>
        </Typography>
      </ContentContainer>
    </main>
  );
}
