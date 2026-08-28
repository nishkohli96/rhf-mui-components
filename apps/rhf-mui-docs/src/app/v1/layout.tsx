import type { Metadata } from 'next';

type Props = { children: React.ReactNode };

/*
 * Older docs version — keep out of the search index so it can't cannibalise
 * the current-version pages, but let crawlers follow links back into them.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: true }
};

const Version1Layout = ({ children }: Props) => (
  <>
    {children}
  </>
);

export default Version1Layout;
