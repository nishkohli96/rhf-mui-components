'use client';

import ReactJson from 'react-json-view';
import { FieldErrors, FieldValues } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { SubHeading } from '../page-heading';

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
      <Grid item xs={12}>
        <SubHeading title="Form values & errors in real-time" />
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper>
          <ReactJson
            src={formValues}
            name="formValues"
            quotesOnKeys={false}
            theme="pop"
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
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
