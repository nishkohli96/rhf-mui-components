'use client';

import ReactJson from 'react-json-view';
import { UseFormWatch, FieldErrors, FieldValues } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { SubHeading } from '../page-heading';

type RenderFormStateProps<T extends FieldValues> = {
  formValues: T;
  errors: FieldErrors<T>;
};

export function RenderFormState<T extends FieldValues>({
  formValues,
  errors
}: RenderFormStateProps<T>) {
	console.log('errors: ', errors);
	return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <SubHeading title="Form values & errors in real-time" />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{ border: (theme) => theme.palette.success.main }}
      >
        <Paper>
          <ReactJson
            src={formValues}
            name="formValues"
            quotesOnKeys={false}
            theme="pop"
          />
        </Paper>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{ border: (theme) => theme.palette.error.main }}
      >
        <Paper>
          <ReactJson
            src={errors}
            name="errors"
            quotesOnKeys={false}
            theme="pop"
          />
        </Paper>
      </Grid>
    </Grid>
  );
}
