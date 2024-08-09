import type { Metadata } from 'next';
import Grid from '@mui/material/Grid';
import { GridContainer, PageHeading, SubHeading, Table } from '@/components';
import { TypesDesc } from '@/constants';
import { pageDescriptionMsg } from '@/utils';

const componentName = 'RHFTextField';

export const metadata: Metadata = {
  title: componentName,
  description: pageDescriptionMsg(componentName)
};

export default function RHFTextFieldPage() {
  const rhfTextFieldProps = [
    TypesDesc.fieldName,
    TypesDesc.register,
    TypesDesc.registerOptions,
    TypesDesc.onValueChange_Input,
    TypesDesc.errorMsg,
    TypesDesc.hideErrorMsg,
    TypesDesc.showLabelAboveFormField,
    TypesDesc.formLabelProps,
    TypesDesc.formHelperTextProps
  ]; 

  return (
    <GridContainer>
      <Grid item xs={12}>
        <PageHeading title={componentName} />
      </Grid>
      <Grid item xs={12}>
        <SubHeading title='The "essential" component of every form!' />
      </Grid>
      <Table rows={rhfTextFieldProps} />
    </GridContainer>
  );
}
