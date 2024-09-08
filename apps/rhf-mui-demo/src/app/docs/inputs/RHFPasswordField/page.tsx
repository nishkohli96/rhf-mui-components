import type { Metadata } from 'next';
import Grid from '@mui/material/Grid';
import { GridContainer, PageHeading, SubHeading, Table } from '@/components';
import { pageDescriptionMsg } from '@/utils';

const componentName = 'RHFPasswordInput';

export const metadata: Metadata = {
  title: componentName,
  description: pageDescriptionMsg(componentName)
};

export default function RHFPasswordInputPage() {
  return (
    <GridContainer>
      <Grid item xs={12}>
        <PageHeading title={componentName} />
      </Grid>
      <Grid item xs={12}>
        <SubHeading title="Text fields allow users to enter text into a UI" />
      </Grid>
    </GridContainer>
  );
}
