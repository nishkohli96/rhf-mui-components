'use client';

import dynamic from 'next/dynamic';
import { type FieldErrors, type FieldValues } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { SubHeading } from '../page-heading';

/*
 * `@microlink/react-json-view` — the maintained React 19-compatible fork of
 * the abandoned `react-json-view` (which fails to instantiate under
 * React 19 + Turbopack). It still touches `document` at module load, so
 * keep it browser-only for SSG/SSR.
 */
const ReactJson = dynamic(
  () => import('@microlink/react-json-view').then(mod => mod.default),
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
  /*
   * RHF's `errors` entries carry a circular `ref` (the DOM node), which the
   * JSON viewer can't serialize — pull out just message + type.
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
