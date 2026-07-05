'use client';

import dynamic from 'next/dynamic';
import { type FieldErrors, type FieldValues } from 'react-hook-form';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import { SubHeading } from '../page-heading';

/** react-json-view touches `document` at module load; load only in the browser for SSG/SSR. */
const ReactJson = dynamic(
  () => import('react-json-view').then(mod => mod.default),
  { ssr: false }
);

type RenderFormStateProps<T extends FieldValues> = {
  formValues: T;
  errors: FieldErrors<T>;
};

const FormState = <T extends FieldValues>({
  formValues,
  errors
}: RenderFormStateProps<T>) => {
  /**
   * "errors" object from RHF also has ref, besides type & message.
   * Unfortunately, "react-json-view" has a hard time parsing that
   * ref key, which gives "Converting circular structure to JSON"
   * error, so I had to create a new object to yield form errors.
   */
  let errObj = {};
  Object.keys(errors).forEach(err => {
    errObj = {
      ...errObj,
      [err]: {
        message: errors?.[err]?.message,
        type: errors?.[err]?.type
      }
    };
  });

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <SubHeading title="Form State - Values & Errors" />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper>
          <ReactJson
            src={formValues}
            name="formValues"
            quotesOnKeys={false}
            theme="pop"
          />
        </Paper>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper>
          <ReactJson
            src={errObj}
            name="errors"
            quotesOnKeys={false}
            theme="pop"
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default FormState;
