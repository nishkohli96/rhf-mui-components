import type { Metadata } from 'next';

type Props = { children: React.ReactNode };

/*
 * Older docs version — keep out of the search index so it can't cannibalise
 * the current-version pages, but let crawlers follow links back into them.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: true }
};

const Version4Layout = ({ children }: Props) => (
  <>
    {children}
  </>
);

export default Version4Layout;
