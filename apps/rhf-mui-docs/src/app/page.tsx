import type { Metadata } from 'next';
import HomeLanding from '@/components/home';
import {
  pageMetadata,
  defaultPageDescription,
  githubProfile,
  githubRepoLink,
  npmLink,
  websiteUrl
} from '@/constants';

export const metadata: Metadata = pageMetadata.home;

/* Describes the library the docs cover — the primary entity for rich results. */
const softwareJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareSourceCode',
  name: '@nish1896/rhf-mui-components',
  description: defaultPageDescription,
  url: websiteUrl,
  codeRepository: githubRepoLink,
  programmingLanguage: 'TypeScript',
  runtimePlatform: 'React',
  license: 'https://opensource.org/licenses/MIT',
  author: {
    '@type': 'Person',
    name: 'Nishant Kohli',
    url: githubProfile
  },
  sameAs: [npmLink]
};

const HomePage = () => (
  <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
    />
    <HomeLanding />
  </>
);

export default HomePage;
