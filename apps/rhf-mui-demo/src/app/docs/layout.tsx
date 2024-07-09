import type { Metadata } from 'next';
import Drawer from '@mui/material/Drawer';

type LayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: 'Docs',
  description: 'Index of docs page'
};

export default function DocsLayout({ children }: LayoutProps) {
  return (
    <>
      {children}
    </>
  );
}
