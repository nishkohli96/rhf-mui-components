'use client';

/**
 * MUICheckboxGroup example — integrated with Formik. Stores an array of
 * selected values. Shows string options with a "minimum selected" rule,
 * object options (`labelKey` / `valueKey`) with `getOptionDisabled` and
 * pass-through `checkboxProps`, plus a label above the group.
 */

import { useState } from 'react';
import { useFormik } from 'formik';
import { usePathname } from 'next/navigation';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import MUICheckboxGroup from '@nish1896/mui-components/mui/checkbox-group';
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

const hobbyOptions = ['Reading', 'Gaming', 'Cooking', 'Travel', 'Music'];

const scoreOptions = [10, 20, 30, 40, 50];

type PermissionOption = { id: string; label: string; locked?: boolean };

const permissionOptions: PermissionOption[] = [
  { id: 'read', label: 'Read', locked: true },
  { id: 'write', label: 'Write' },
  { id: 'delete', label: 'Delete' },
  { id: 'admin', label: 'Admin' }
];

type CheckboxFormValues = {
  hobbies: string[];
  permissions: string[];
  scores: number[];
};

const initialValues: CheckboxFormValues = {
  hobbies: ['Reading'],
  permissions: ['read'],
  scores: [20]
};

export default function CheckboxGroupForm() {
  const pathName = usePathname();
  const [disableAllFields, setDisableAllFields] = useState(false);

  const formik = useFormik<CheckboxFormValues>({
    initialValues,
    validate: values => {
      const errors: Partial<Record<keyof CheckboxFormValues, string>> = {};
      if (values.hobbies.length < 2) {
        errors.hobbies = 'Select at least two hobbies';
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
            <FieldVariantInfo title="String options — minimum two required" />
            <MUICheckboxGroup
              fieldName="hobbies"
              label="Hobbies"
              options={hobbyOptions}
              value={formik.values.hobbies}
              onValueChange={({ newValue }) => formik.setFieldValue('hobbies', newValue)}
              helperText="Pick at least two"
              disabled={disableAllFields}
              required
              errorMessage={formikError(formik.submitCount > 0 && formik.errors.hobbies)}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Object options, getOptionDisabled & custom checkbox colour and icons" />
            <MUICheckboxGroup
              fieldName="permissions"
              label="Permissions"
              options={permissionOptions}
              labelKey="label"
              valueKey="id"
              value={formik.values.permissions}
              onValueChange={({ newValue }) => formik.setFieldValue('permissions', newValue)}
              getOptionDisabled={option => Boolean(option.locked)}
              checkboxProps={{
                color: 'success',
                icon: <CancelOutlinedIcon color="error" />,
                checkedIcon: <CheckCircleOutlinedIcon />
              }}
              showLabelAboveFormField
              helperText="'Read' is always granted"
              disabled={disableAllFields}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Numeric options — value stored as number[]" />
            <MUICheckboxGroup
              fieldName="scores"
              label="Scores"
              options={scoreOptions}
              value={formik.values.scores}
              onValueChange={({ newValue }) => formik.setFieldValue('scores', newValue)}
              renderOptionLabel={score => `${score} pts`}
              helperText="Each checked value is stored as a number"
              disabled={disableAllFields}
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
                hobbies: formik.submitCount > 0 && typeof formik.errors.hobbies === 'string'
                  ? formik.errors.hobbies
                  : undefined
              }}
            />
          </Grid>
        </GridContainer>
      </form>
    </FormContainer>
  );
}
