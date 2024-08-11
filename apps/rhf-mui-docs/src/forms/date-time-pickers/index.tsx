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
} from '@site/src/components';

export function DateTimePickersForm() {
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  function onFormSubmit(formValues) {
    console.log('formValues: ', formValues);
  }

  return (
    <FormContainer title="Radio & Checkbox Group">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <ConfigProvider dateAdapter="luxon">
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
                errorMsg={errors?.dob?.message}
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
                errorMsg={errors?.time?.message}
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
                errorMsg={errors?.dateTime?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <SubmitButton />
            </Grid>
            <Grid item xs={12}>
              <RenderFormState formValues={watch()} errors={errors} />
            </Grid>
          </GridContainer>
        </ConfigProvider>
      </form>
    </FormContainer>
  );
}
