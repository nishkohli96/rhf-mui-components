'use client';

import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
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
} from '@/components';
import { Dayjs } from 'dayjs';

type FormSchema = {
  dob: Dayjs;
  time: Dayjs;
  dateOfJourney: Dayjs;
};

const DateTimePickersForm = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormSchema>();

  function onFormSubmit(formValues) {
    alert(`Form Submitted with values: \n\n ${JSON.stringify(formValues)}`);
  }

  return (
    <FormContainer title="Radio & Checkbox Group">
      <ConfigProvider dateAdapter={AdapterDayjs}>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <GridContainer>
            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
              <RHFDateTimePicker
                fieldName="dateOfJourney"
                control={control}
                showLabelAboveFormField
                label="Date-Time Picker"
                ampm={false}
                required
                errorMessage={errors?.dateOfJourney?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <SubmitButton />
            </Grid>
            <Grid item xs={12}>
              <FormState formValues={watch()} errors={errors} />
            </Grid>
          </GridContainer>
        </form>
      </ConfigProvider>
    </FormContainer>
  );
};

export default DateTimePickersForm;
