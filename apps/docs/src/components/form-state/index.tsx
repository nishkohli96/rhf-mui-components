'use client';

import dynamic from 'next/dynamic';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { type JsonObject } from '@/types';
import { SubHeading } from '../page-heading';

/** react-json-view touches `document` at module load; load only in the browser for SSG/SSR. */
const ReactJson = dynamic(
  () => import('react-json-view').then(mod => mod.default),
  { ssr: false }
);

type RenderFormStateProps = {
  formValues: JsonObject;
  errors: Record<string, string | undefined | null>;
};

const FormState = ({
  formValues,
  errors
}: RenderFormStateProps) => {
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
            src={errors}
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
