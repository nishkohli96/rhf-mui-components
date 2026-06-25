'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid2';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ConfigProvider } from '@nish1896/rhf-mui-components/config';
import RHFDatePicker from '@nish1896/rhf-mui-components/mui-pickers/date';
import RHFTimePicker from '@nish1896/rhf-mui-components/mui-pickers/time';
import RHFDateTimePicker from '@nish1896/rhf-mui-components/mui-pickers/date-time';
import {
  FormContainer,
  FormState,
  GridContainer,
  FieldVariantInfo,
  SubmitButton,
  ResetButton,
} from '@/components';
import { formSubmitEventName } from '@/constants';
import { logFirebaseEvent, showToastMessage } from '@/utils';
import { dateTimeSchema, type DateTimeFormData } from './schema';

const DateTimePickersForm = () => {
  const pathName = usePathname();
  const [disableAllFields, setDisableAllFields] = useState(false);
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(dateTimeSchema),
    disabled: disableAllFields
  });

  async function onFormSubmit(formValues: DateTimeFormData) {
    await logFirebaseEvent(formSubmitEventName, { pathName });
    showToastMessage(formValues);
  }

  return (
    <FormContainer title="Radio & Checkbox Group">
      <ConfigProvider dateAdapter={AdapterDayjs}>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <GridContainer>
            <Grid size={12}>
              <FormControlLabel
                control={(
                  <Checkbox
                    checked={disableAllFields}
                    onChange={event => {
                      setDisableAllFields(event.target.checked);
                    }}
                  />
                )}
                label="Disable all fields"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="DatePicker with disabled future" />
              <RHFDatePicker
                fieldName="dob"
                control={control}
                disableFuture
                label="Date of Birth"
                showLabelAboveFormField
                required
                errorMessage={errors?.dob?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="TimePicker with 24-Hour Format" />
              <RHFTimePicker
                fieldName="time"
                control={control}
                label="Arrival Time"
                ampm={false}
                required
                errorMessage={errors?.time?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <RHFDateTimePicker
                fieldName="dateOfJourney"
                control={control}
                showLabelAboveFormField
                label="Date-Time Picker"
                ampm={false}
                required
                helperText="Select a future date"
                errorMessage={errors?.dateOfJourney?.message}
              />
            </Grid>
            <Grid size={12}>
              <SubmitButton />
              <ResetButton onClick={() => reset()} />
            </Grid>
            <Grid size={12}>
              <FormState formValues={watch()} errors={errors} />
            </Grid>
          </GridContainer>
        </form>
      </ConfigProvider>
    </FormContainer>
  );
};

export default DateTimePickersForm;
