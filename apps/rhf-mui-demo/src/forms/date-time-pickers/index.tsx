'use client';

import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import {
  RHFDatePicker,
  RHFTimePicker,
  RHFDateTimePicker,
  ConfigProvider
} from '@nish1896/rhf-mui-components';
import {
  FormContainer,
  RenderFormState,
  GridContainer,
  FieldVariantInfo,
  SubmitButton
} from '@/components';

export function DateTimePickersForm() {
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  function onFormSubmit(formValues) {
    alert(`Form Submitted with values: \n\n ${JSON.stringify(formValues)}`);
  }

  return (
    <FormContainer title="Radio & Checkbox Group">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <GridContainer>
          <Grid item xs={12} md={6}>
            <FieldVariantInfo title="DatePicker with disabled future" />
            <RHFDatePicker
              fieldName="dob"
              register={register}
              disableFuture
              setValue={setValue}
              label="Date of Birth"
              showLabelAboveFormField
              errorMessage={errors?.dob?.message}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FieldVariantInfo title="TimePicker with 24-Hour Format" />
            <RHFTimePicker
              fieldName="time"
              register={register}
              setValue={setValue}
              label="Time"
              ampm={false}
              errorMessage={errors?.time?.message}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <RHFDateTimePicker
              fieldName="dateTime"
              register={register}
              setValue={setValue}
              showLabelAboveFormField
              label="Date-Time Picker"
              ampm={false}
              errorMessage={errors?.dateTime?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <SubmitButton />
          </Grid>
          <Grid item xs={12}>
            <RenderFormState formValues={watch()} errors={errors} />
          </Grid>
        </GridContainer>
      </form>
    </FormContainer>
  );
}
