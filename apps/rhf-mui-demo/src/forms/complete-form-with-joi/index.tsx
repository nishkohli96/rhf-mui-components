'use client';

import { FieldValues, useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import { joiResolver } from '@hookform/resolvers/joi';
import {
  RHFCheckbox,
  RHFCheckboxGroup,
  RHFDatePicker,
  RHFDateTimePicker,
  RHFNativeSelect,
  RHFPasswordField,
  RHFRadioGroup,
  RHFRating,
  RHFSelect,
  RHFSlider,
  RHFSwitch,
  RHFTextField,
  RHFTimePicker,
  ConfigProvider
} from '@nish1896/rhf-mui-components';
import {
  FormContainer,
  GridContainer,
  RenderFormState,
  SubmitButton
} from '@/components';
import { Colors, Gender, Sports } from '@/types';
import { CountriesList, IPLTeams } from '@/constants'
import { Person, JoiFormSchema } from './validation';

const initialValues: Person = {
  email: 'hello@example.com',
  password: '',
  dob: null,
  time: null,
  dateTime: null,
  age: 25,
  gender: null,
  country: '',
  favouriteSport: '',
  sports: [],
  iplTeams: [],
  favouriteColor: '',
  countries: null,
  color: null,
  darkTheme: true,
  rating: null,
  agreeTnC: false
};

export function CompleteFormWithJoi() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors }
  } = useForm<Person>({
    defaultValues: initialValues,
    resolver: joiResolver(JoiFormSchema)
  });

  function onFormSubmit(formValues: Person) {
    console.log('formValues: ', formValues);
  }

  return (
    <FormContainer title="Joi Form">
      <ConfigProvider
        defaultFormLabelSx={{
          mt: '20px',
          ml: '20px',
          mb: '16px'
        }}
        defaultFormHelperTextSx={{
          mt: '20px',
          ml: '40px'
        }}
        // dateAdapter='date-fns'
      >
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <GridContainer>
            <Grid item xs={12} md={6}>
              <RHFTextField
                fieldName="email"
                register={register}
                errorMsg={errors?.email?.message}
                showLabelAboveFormField
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFPasswordField
                fieldName="password"
                register={register}
                errorMsg={errors?.password?.message}
                showLabelAboveFormField
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFDateTimePicker
                fieldName="dateTime"
                register={register}
                setValue={setValue}
                showLabelAboveFormField
                ampm={false}
                errorMsg={errors?.dateTime?.message}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFDatePicker
                fieldName="dob"
                register={register}
                setValue={setValue}
                label="Date of Birth"
                showLabelAboveFormField
                helperText="dedme"
                errorMsg={errors?.dob?.message}
              />
            </Grid>
            <Grid item xs={12} md={6}>
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
              <RHFSlider
                fieldName="age"
                register={register}
                defaultValue={initialValues.age}
                label="Age"
                min={0}
                max={50}
                helperText="hel"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFSwitch
                fieldName="darkTheme"
                control={control}
                label="Hello"
                formControlLabelProps={{
                  labelPlacement: 'end'
                }}
                onValueChange={(e) => {
                  console.log('changed switch', e);
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFNativeSelect
                fieldName="favouriteSport"
                register={register}
                defaultValue={initialValues.favouriteSport}
                options={Object.values(Sports)}
                errorMsg={errors?.favouriteSport?.message}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFSelect
                fieldName="sports"
                register={register}
                defaultValue={initialValues.sports}
                label="Select Sport(s)"
                options={Object.values(Sports)}
                errorMsg={errors?.sports?.message}
                multiple
                showLabelAboveFormField
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFSelect
                fieldName="iplTeams"
                register={register}
                defaultValue={initialValues.iplTeams}
                label="IPL Teams"
                labelKey="name"
                valueKey="abbr"
                options={IPLTeams}
                errorMsg={errors?.sports?.message}
                multiple
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFSelect
                fieldName="favouriteColor"
                register={register}
                defaultValue={initialValues.favouriteColor}
                options={Object.values(Colors)}
                errorMsg={errors?.favouriteColor?.message}
                defaultOptionText="--- Select ---"
                showDefaultOption
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFCheckboxGroup
                fieldName="color"
                control={control}
                label="Select Color"
                showLabelAboveFormField
                options={Object.values(Colors)}
                errorMsg={errors?.color?.message}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFCheckboxGroup
                fieldName="countries"
                control={control}
                label="Select Countries"
                options={CountriesList}
                labelKey="country"
                valueKey="code"
                errorMsg={errors?.countries?.message}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFRadioGroup
                fieldName="gender"
                control={control}
                options={Object.values(Gender)}
                row
                errorMsg={errors?.gender?.message}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFRadioGroup
                fieldName="country"
                control={control}
                options={CountriesList}
                defaultValue={initialValues.country}
                labelKey="country"
                valueKey="code"
                row
                onValueChange={(e, v1, opn) => {
                  console.log('v1: ', v1);
                  console.log('opn: ', opn);
                }}
                errorMsg={errors?.country?.message}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFCheckbox
                fieldName="agreeTnC"
                control={control}
                label="Agree To Terms & Conditions"
                formControlLabelProps={{
                  labelPlacement: 'end'
                }}
                onValueChange={(e) => {
                  console.log('changed switch', e);
                }}
                showLabelAboveFormField
                errorMsg={errors?.agreeTnC?.message}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFRating
                fieldName="rating"
                control={control}
                errorMsg={errors?.rating?.message}
                max={10}
                showLabelAboveFormField
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
      </ConfigProvider>
    </FormContainer>
  );
}
