import type { Metadata } from 'next';
import HomeLanding from '@/components/home';
import {
  pageMetadata,
  appName,
  defaultPageDescription,
  githubProfile,
  githubRepoLink,
  npmLink,
  websiteUrl
} from '@/constants';

/*
 * `./` (the root layout's canonical / `og:url`) resolves to `/index` on the
 * root route, so the home page pins both to `/` explicitly. `openGraph` here
 * replaces the layout's whole object, hence `type`/`siteName` repeated.
 */
export const metadata: Metadata = {
  ...pageMetadata.home,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: appName,
    url: '/'
  }
};

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
