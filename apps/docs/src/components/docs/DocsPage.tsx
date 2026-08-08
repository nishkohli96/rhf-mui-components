import type { ReactNode } from 'react';
import PageToc from './PageToc';
import PageNav from './PageNav';

type DocsPageProps = {
  children: ReactNode;
};

/**
 * Layout for component documentation pages: article content on the left,
 * sticky "Contents" rail on the right (hidden on smaller screens) —
 * mirroring the MUI docs layout. Wrap an .mdx page's content with this.
 */
const DocsPage = ({ children }: DocsPageProps) => {
  return (
    <div className="doc-page">
      <article className="doc-article">
        {children}
        <PageNav />
      </article>
      <PageToc />
    </div>
  );
};

export default DocsPage;
