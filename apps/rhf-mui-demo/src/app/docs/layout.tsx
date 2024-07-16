import type { Metadata } from 'next';
import Grid from '@mui/material/Grid';
import { Drawer } from '@/components';

type LayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: 'Docs',
  description: 'Index of docs page'
};

export default function DocsLayout({ children }: LayoutProps) {
  return (
    <Grid container sx={{ height: '100%' }}>
      <Grid item xs={0} md={3}>
        <Drawer />
      </Grid>
      <Grid item xs={12} md={9}>
        {children}
      </Grid>
    </Grid>
  );
}
