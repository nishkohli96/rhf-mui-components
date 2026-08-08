import fs from 'node:fs/promises';
import path from 'node:path';
import { Fragment } from 'react';
import { codeToHtml } from 'shiki';
import {
  ContentContainer,
  PageHeading,
  SubHeading,
  CodeSnippets,
  type ComponentSnippet
} from '@/components';
import { pageMetadata } from '@/constants';
import StyledReusableComponentForm from '@/forms/styled-components/Client';

export const metadata = pageMetadata.customizationExample;

const styledFiles = [
  'StyledTextField.tsx',
  'StyledSelect.tsx',
  'StyledAutocomplete.tsx',
  'StyledIOSSwitch.tsx',
  'StyledDatePicker.tsx'
];

/**
 * `process.cwd()` is the monorepo root when running `next dev` but the app dir
 * on a Vercel build, so resolve the styled-components folder from whichever base
 * actually contains it.
 */
async function resolveStyledDir(): Promise<string> {
  const relative = 'src/forms/styled-components';
  const candidates = [
    path.join(process.cwd(), 'apps/docs', relative),
    path.join(process.cwd(), relative)
  ];
  for (const dir of candidates) {
    try {
      await fs.access(dir);
      return dir;
    } catch {
      /* not this base — try the next candidate */
    }
  }
  return candidates[candidates.length - 1];
}

/**
 * Read each reusable `Styled*` component and syntax-highlight it at build time
 * with the same shiki config as the MDX code fences
 * (`themes: { light: 'light-plus', dark: 'dark-plus' }`, `defaultColor: false`),
 * so the rendered blocks match the rest of the docs and follow the app theme.
 */
async function loadStyledSnippets(): Promise<ComponentSnippet[]> {
  const styledDir = await resolveStyledDir();
  return Promise.all(
    styledFiles.map(async file => {
      const code = await fs.readFile(path.join(styledDir, file), 'utf8');
      const html = await codeToHtml(code, {
        lang: 'tsx',
        themes: { light: 'light-plus', dark: 'dark-plus' },
        defaultColor: false
      });
      return { title: file, code, html };
    })
  );
}

const CodeSnippetDescription = (
  <Fragment>
    Source of each reusable
    {' '}
    <code>Styled*</code>
    {' '}
    wrapper used above — expand to
    view or copy.
  </Fragment>
);

const CustomizationPage = async () => {
  const snippets = await loadStyledSnippets();
  return (
    <ContentContainer>
      <PageHeading title={metadata.title as string} />
      <SubHeading title={metadata.description as string} />
      <StyledReusableComponentForm />
      <CodeSnippets
        snippets={snippets}
        title="Component Source Code"
        description={CodeSnippetDescription}
      />
    </ContentContainer>
  );
};

export default CustomizationPage;
