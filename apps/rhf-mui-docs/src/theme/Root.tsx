import type { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/react';

type RootProps = {
  children: ReactNode;
};

const Root = ({ children }: RootProps) => (
  <>
    {children}
    <Analytics />
  </>
);

export default Root;
