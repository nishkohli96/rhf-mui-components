'use client';

/**
 * MUINumberInput example — integrated with TanStack Form
 * (`@tanstack/react-form`) to show the numeric constraints alongside a real
 * form library: `onlyIntegers`, `nonNegative`, `maxDecimalPlaces`,
 * `stepAmount`, `showMarkers`, plus `showLabelAboveFormField` /
 * `formLabelProps` and validation surfaced through `errorMessage`.
 *
 * `field.state.meta.errors` is passed to `errorMessage` as-is — the component
 * resolves the array internally.
 */

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useForm } from '@tanstack/react-form';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import MUINumberInput from '@nish1896/mui-components/mui/number-input';
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

type NumberFormValues = {
  age: number | null;
  price: number | null;
  randomInt: number | null;
};

const initialValues: NumberFormValues = {
  age: null,
  price: null,
  randomInt: 1
};

export default function NumberInputForm() {
  const pathName = usePathname();
  const [disableAllFields, setDisableAllFields] = useState(false);

  const form = useForm({
    defaultValues: initialValues,
    onSubmit: async ({ value }) => {
      await logFirebaseEvent(formSubmitEventName, { pathName });
      showToastMessage(value);
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
            <FieldVariantInfo title="Integer only, non-negative, with steppers" />
            <form.Field
              name="age"
              validators={{
                onChange: ({ value }) => {
                  if (value === null) {
                    return 'Age is required';
                  }
                  if (value < 18) {
                    return 'Must be 18 or older';
                  }
                  if (value > 120) {
                    return 'Enter a realistic age';
                  }
                  return undefined;
                }
              }}
            >
              {field => (
                <MUINumberInput
                  fieldName="age"
                  value={field.state.value}
                  onValueChange={({ newValue }) => field.handleChange(newValue)}
                  onFocus={e => e.target.select()}
                  onBlur={field.handleBlur}
                  errorMessage={tanstackErrors(field.state.meta.errors)}
                  onlyIntegers
                  nonNegative
                  showMarkers
                  stepAmount={1}
                  required
                  disabled={disableAllFields}
                  helperText="Whole numbers only, 18–120"
                />
              )}
            </form.Field>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Decimal (2 places), label above field" />
            <form.Field
              name="price"
              validators={{
                onChange: ({ value }) =>
                  (value !== null && value < 0 ? 'Price cannot be negative' : undefined)
              }}
            >
              {field => (
                <MUINumberInput
                  fieldName="price"
                  label="Unit price ($)"
                  value={field.state.value}
                  onValueChange={({ newValue }) => field.handleChange(newValue)}
                  onBlur={field.handleBlur}
                  errorMessage={tanstackErrors(field.state.meta.errors)}
                  maxDecimalPlaces={2}
                  nonNegative
                  showLabelAboveFormField
                  formLabelProps={{ sx: { fontWeight: 600 } }}
                  helperText="Up to two decimal places"
                  disabled={disableAllFields}
                />
              )}
            </form.Field>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Label and placeholder with custom step amount (±5)" />
            <form.Field name="randomInt">
              {field => (
                <MUINumberInput
                  fieldName="randomInt"
                  value={field.state.value}
                  onValueChange={({ newValue }) => field.handleChange(newValue)}
                  onlyIntegers
                  showMarkers
                  stepAmount={5}
                  label="Random Integer"
                  placeholder="Enter an integer"
                  helperText="Arrow keys / steppers change by 5"
                  disabled={disableAllFields}
                />
              )}
            </form.Field>
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
                Object.entries(fieldMeta).map(([name, meta]) => [
                  name,
                  meta?.errors?.[0]
                ])
              );
              return (
                <>
                  <Grid size={12}>
                    <SubmitButton disabled={!canSubmit} />
                    <ResetButton onClick={() => form.reset()} />
                  </Grid>
                  <Grid size={12}>
                    <FormState
                      formValues={values}
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
