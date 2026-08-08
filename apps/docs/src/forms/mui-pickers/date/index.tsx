'use client';

/**
 * Date Pickers example — plain React `useState`. Demonstrates all four
 * variants sharing the same controlled `value` / `onValueChange` contract:
 * responsive, desktop, mobile and static.
 */

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { type Dayjs } from 'dayjs';
import { ConfigProvider } from '@nish1896/mui-components/config';
import {
  MUIDatePicker,
  MUIDesktopDatePicker,
  MUIMobileDatePicker,
  MUIStaticDatePicker
} from '@nish1896/mui-components/mui-pickers/date';
import {
  FormContainer,
  GridContainer,
  FieldVariantInfo,
  FormState,
  SubmitButton,
  ResetButton
} from '@/components';
import { formSubmitEventName } from '@/constants';
import { logFirebaseEvent, showToastMessage } from '@/utils';

type DatePickerValues = {
  dob: Dayjs | null;
  desktopDate: Dayjs | null;
  mobileDate: Dayjs | null;
  staticDate: Dayjs | null;
};

const initialValues: DatePickerValues = {
  dob: null,
  desktopDate: null,
  mobileDate: null,
  staticDate: null
};

export default function DatePickersForm() {
  const pathName = usePathname();
  const [values, setValues] = useState<DatePickerValues>(initialValues);
  const [dobError, setDobError] = useState<string>();
  const [disableAllFields, setDisableAllFields] = useState(false);

  function setField<K extends keyof DatePickerValues>(name: K, value: DatePickerValues[K]) {
    setValues(prev => ({ ...prev, [name]: value }));
  }

  function resetForm() {
    setValues(initialValues);
    setDobError(undefined);
  }

  /** Converts Dayjs values to JSON-friendly strings for the toast/state readout. */
  function toDisplayValues(formValues: DatePickerValues) {
    return {
      dob: formValues.dob?.format('YYYY-MM-DD') ?? null,
      desktopDate: formValues.desktopDate?.format('YYYY-MM-DD') ?? null,
      mobileDate: formValues.mobileDate?.format('YYYY-MM-DD') ?? null,
      staticDate: formValues.staticDate?.format('YYYY-MM-DD') ?? null
    };
  }

  async function onFormSubmit() {
    if (!values.dob) {
      setDobError('Date of Birth is required');
      return;
    }
    setDobError(undefined);
    await logFirebaseEvent(formSubmitEventName, { pathName });
    showToastMessage(toDisplayValues(values));
  }

  return (
    <FormContainer title="Date Pickers">
      <ConfigProvider dateAdapter={AdapterDayjs}>
        <form
          onSubmit={event => {
            event.preventDefault();
            onFormSubmit();
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
              <FieldVariantInfo title="MUIDatePicker — responsive, disableFuture" />
              <MUIDatePicker
                fieldName="dob"
                value={values.dob}
                onValueChange={({ newValue }) => {
                  setField('dob', newValue);
                  setDobError(undefined);
                }}
                label="Date of Birth"
                disableFuture
                showLabelAboveFormField
                required
                errorMessage={dobError}
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="MUIDesktopDatePicker — always the keyboard-first UI" />
              <MUIDesktopDatePicker
                fieldName="desktopDate"
                value={values.desktopDate}
                onValueChange={({ newValue }) => setField('desktopDate', newValue)}
                label="Desktop Date"
                format="DD MMM YYYY"
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="MUIMobileDatePicker — always the modal UI" />
              <MUIMobileDatePicker
                fieldName="mobileDate"
                value={values.mobileDate}
                onValueChange={({ newValue }) => setField('mobileDate', newValue)}
                label="Mobile Date"
                minDate={dayjs().subtract(1, 'year')}
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="MUIStaticDatePicker — always-visible inline, no text field" />
              <MUIStaticDatePicker
                fieldName="staticDate"
                value={values.staticDate}
                onValueChange={({ newValue }) => setField('staticDate', newValue)}
                label="Static Date"
                showLabelAboveFormField
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={12}>
              <SubmitButton disabled={disableAllFields} />
              <ResetButton onClick={resetForm} />
            </Grid>
            <Grid size={12}>
              <FormState
                formValues={toDisplayValues(values)}
                errors={{ dob: dobError }}
              />
            </Grid>
          </GridContainer>
        </form>
      </ConfigProvider>
    </FormContainer>
  );
}
