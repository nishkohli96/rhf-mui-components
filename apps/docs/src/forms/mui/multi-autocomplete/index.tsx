'use client';

/**
 * MUIMultiAutocomplete example — integrated with Formik. A checkbox
 * multi-select that stores a `string[]` and offers a "Select All" option.
 * Shows string options with `selectAllText`, `limitTags` and `checkboxProps`,
 * and object options (`labelKey` / `valueKey`) with `getOptionDisabled`.
 */

import { useState } from 'react';
import { useFormik } from 'formik';
import { usePathname } from 'next/navigation';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import MUIMultiAutocomplete from '@nish1896/mui-components/mui/multi-autocomplete';
import {
  FormContainer,
  GridContainer,
  FieldVariantInfo,
  FormState,
  SubmitButton,
  ResetButton
} from '@/components';
import { formSubmitEventName } from '@/constants';
import { showToastMessage, logFirebaseEvent, formikError } from '@/utils';

const skills = ['React', 'Node', 'GraphQL', 'Docker', 'AWS', 'Kubernetes'];

type TeamOption = { code: string; name: string; archived?: boolean };

const teams: TeamOption[] = [
  { code: 'eng', name: 'Engineering' },
  { code: 'design', name: 'Design' },
  { code: 'sales', name: 'Sales' },
  { code: 'legacy', name: 'Legacy (archived)', archived: true }
];

type MultiFormValues = {
  skills: string[];
  teams: string[];
};

const initialValues: MultiFormValues = {
  skills: ['React'],
  teams: ['eng']
};

export default function MultiAutocompleteForm() {
  const pathName = usePathname();
  const [disableAllFields, setDisableAllFields] = useState(false);

  const formik = useFormik<MultiFormValues>({
    initialValues,
    validate: values => {
      const errors: Partial<Record<keyof MultiFormValues, string>> = {};
      if (values.skills.length === 0) {
        errors.skills = 'Select at least one skill';
      }
      return errors;
    },
    onSubmit: async values => {
      await logFirebaseEvent(formSubmitEventName, { pathName });
      showToastMessage(values);
    }
  });

  return (
    <FormContainer>
      <form onSubmit={formik.handleSubmit}>
        <GridContainer>
          <Grid size={12}>
            <FormControlLabel
              control={(
                <Checkbox
                  checked={disableAllFields}
                  onChange={event => setDisableAllFields(event.target.checked)}
                />
              )}
              label="Disable all fields"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="String options with Select All & limitTags" />
            <MUIMultiAutocomplete
              fieldName="skills"
              options={skills}
              value={formik.values.skills}
              onValueChange={({ newValue }) => formik.setFieldValue('skills', newValue)}
              selectAllText="Select all skills"
              limitTags={3}
              checkboxProps={{ color: 'secondary' }}
              disabled={disableAllFields}
              required
              errorMessage={formikError(formik.submitCount > 0 && formik.errors.skills)}
              helperText="Pick your tech skills"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Object options with a disabled item" />
            <MUIMultiAutocomplete
              fieldName="teams"
              label="Teams"
              options={teams}
              labelKey="name"
              valueKey="code"
              value={formik.values.teams}
              onValueChange={({ newValue }) => formik.setFieldValue('teams', newValue)}
              getOptionDisabled={option => Boolean(option.archived)}
              disabled={disableAllFields}
              showLabelAboveFormField
              helperText="Archived teams can't be selected"
            />
          </Grid>

          <Grid size={12}>
            <SubmitButton />
            <ResetButton onClick={() => formik.resetForm()} />
          </Grid>
          <Grid size={12}>
            <FormState
              formValues={formik.values}
              errors={{
                skills: formik.submitCount > 0 && typeof formik.errors.skills === 'string'
                  ? formik.errors.skills
                  : undefined
              }}
            />
          </Grid>
        </GridContainer>
      </form>
    </FormContainer>
  );
}
