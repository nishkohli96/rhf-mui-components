import type { Metadata } from 'next';
import Grid from '@mui/material/Grid';
import { DrawerContent } from '@/components';

type LayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: 'Docs',
  description: 'Index of docs page',
};

export default function DocsLayout({ children }: LayoutProps) {
  return (
    <Grid container sx={{ height: '100%' }}>
      <Grid item md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
        <DrawerContent />
      </Grid>
      <Grid
        item
        xs={12}
        md={9}
        sx={{ padding: { xs: '30px', md: '30px 40px' } }}
      >
        {children}
      </Grid>
    </Grid>
  );
}
