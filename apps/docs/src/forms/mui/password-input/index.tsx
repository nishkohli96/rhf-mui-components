'use client';

/**
 * MUIPasswordInput example — integrated with TanStack Form. The password field
 * runs several rules at once and returns a `string[]`; passing
 * `field.state.meta.errors` to `errorMessage` keeps every failure, and
 * `renderError` lists them. Also shows a confirm field, custom show/hide icons,
 * and `showLabelAboveFormField`.
 */

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useForm } from '@tanstack/react-form';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import KeyIcon from '@mui/icons-material/Key';
import KeyOffIcon from '@mui/icons-material/KeyOff';
import MUIPasswordInput from '@nish1896/mui-components/mui/password-input';
import {
  FormContainer,
  GridContainer,
  FieldVariantInfo,
  FormState,
  SubmitButton,
  ResetButton
} from '@/components';
import { formSubmitEventName } from '@/constants';
import { showToastMessage, logFirebaseEvent, tanstackErrors } from '@/utils';

function maskPassword(value: string): string {
  return '•'.repeat(value.length);
}

function passwordRuleFailures(value: string): string[] | undefined {
  const failures = [
    value.length < 8 && 'Use at least 8 characters',
    !(/[A-Z]/).test(value) && 'Add an uppercase letter',
    !(/[0-9]/).test(value) && 'Add a number',
    !(/[^A-Za-z0-9]/).test(value) && 'Add a special character'
  ].filter((rule): rule is string => typeof rule === 'string');
  return failures.length > 0 ? failures : undefined;
}

const initialValues = {
  password: '',
  confirmPassword: '',
  pin: ''
};

export default function PasswordInputForm() {
  const pathName = usePathname();
  const [disableAllFields, setDisableAllFields] = useState(false);

  const form = useForm({
    defaultValues: initialValues,
    onSubmit: async ({ value }) => {
      await logFirebaseEvent(formSubmitEventName, { pathName });
      showToastMessage({
        ...value,
        password: maskPassword(value.password),
        confirmPassword: maskPassword(value.confirmPassword)
      });
    }
  });

  return (
    <FormContainer>
      <form
        onSubmit={event => {
          event.preventDefault();
          form.handleSubmit();
        }}
      >
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
            <FieldVariantInfo title="Multiple rules shown together via renderError" />
            <form.Field
              name="password"
              validators={{ onChange: ({ value }) => passwordRuleFailures(value) }}
            >
              {field => (
                <MUIPasswordInput
                  fieldName="password"
                  value={field.state.value}
                  onValueChange={({ newValue }) => field.handleChange(newValue)}
                  onBlur={field.handleBlur}
                  errorMessage={tanstackErrors(field.state.meta.errors)}
                  renderError={errorList => (
                    <ul style={{ margin: 0, paddingLeft: 18 }}>
                      {errorList.map(error => (
                        <li key={error}>
                          {error}
                        </li>
                      ))}
                    </ul>
                  )}
                  required
                  disabled={disableAllFields}
                />
              )}
            </form.Field>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Confirm field validated against another field" />
            <form.Field
              name="confirmPassword"
              validators={{
                onChangeListenTo: ['password'],
                onChange: ({ value, fieldApi }) => {
                  if (!value) {
                    return 'Confirm your password';
                  }
                  if (value !== fieldApi.form.getFieldValue('password')) {
                    return 'Passwords do not match';
                  }
                  return undefined;
                }
              }}
            >
              {field => (
                <MUIPasswordInput
                  fieldName="confirmPassword"
                  label="Confirm password"
                  value={field.state.value}
                  onValueChange={({ newValue }) => field.handleChange(newValue)}
                  onBlur={field.handleBlur}
                  errorMessage={tanstackErrors(field.state.meta.errors)}
                  required
                  disabled={disableAllFields}
                />
              )}
            </form.Field>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Custom show/hide icons, label above field" />
            <form.Field
              name="pin"
              validators={{
                onChange: ({ value }) =>
                  (value && !(/^\d{4,6}$/).test(value) ? 'PIN must be 4–6 digits' : undefined)
              }}
            >
              {field => (
                <MUIPasswordInput
                  fieldName="pin"
                  label="Security PIN"
                  value={field.state.value}
                  onValueChange={({ newValue }) => field.handleChange(newValue)}
                  onBlur={field.handleBlur}
                  errorMessage={tanstackErrors(field.state.meta.errors)}
                  showPasswordIcon={<KeyIcon />}
                  hidePasswordIcon={<KeyOffIcon />}
                  showLabelAboveFormField
                  helperText="4–6 digit numeric PIN"
                  disabled={disableAllFields}
                  iconButtonProps={{ color: 'warning' }}
                />
              )}
            </form.Field>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Read-only — value can still be revealed, unlike disabled" />
            <MUIPasswordInput
              fieldName="recoveryKey"
              label="Recovery key"
              value="s3cr3t-recovery-key"
              onValueChange={() => { /* no-op */ }}
              readOnly
              showLabelAboveFormField
              helperText="Read-only: not editable, but the show/hide toggle still works"
              disabled={disableAllFields}
            />
          </Grid>

          <form.Subscribe
            selector={state => ({
              values: state.values,
              fieldMeta: state.fieldMeta,
              canSubmit: state.canSubmit
            })}
          >
            {({ values, fieldMeta, canSubmit }) => {
              const errors = Object.fromEntries(
                Object.entries(fieldMeta).map(([name, meta]) => [name, meta?.errors?.[0]])
              );
              return (
                <>
                  <Grid size={12}>
                    <SubmitButton disabled={!canSubmit} />
                    <ResetButton onClick={() => form.reset()} />
                  </Grid>
                  <Grid size={12}>
                    <FormState
                      formValues={{
                        password: maskPassword(values.password),
                        confirmPassword: maskPassword(values.confirmPassword),
                        pin: values.pin
                      }}
                      errors={errors}
                    />
                  </Grid>
                </>
              );
            }}
          </form.Subscribe>
        </GridContainer>
      </form>
    </FormContainer>
  );
}
