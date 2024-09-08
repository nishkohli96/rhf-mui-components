import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import { joiResolver } from '@hookform/resolvers/joi';
import {
  RHFCheckbox,
  RHFCheckboxGroup,
  RHFDatePicker,
  RHFDateTimePicker,
  RHFNativeSelect,
  RHFPasswordInput,
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
} from '@site/src/components';
import { Colors, Gender, Sports } from '@site/src/types';
import { CountriesList, IPLTeams } from '@site/src/constants'
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
    alert(`Form Submitted with values: \n\n ${JSON.stringify(formValues)}`);
  }

  return (
    <FormContainer title="Joi Form">
      <ConfigProvider
        defaultFormLabelSx={{
          mt: '20px',
          mb: '16px'
        }}
        defaultFormHelperTextSx={{
          mt: '20px',
          ml: '40px'
        }}
      >
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <GridContainer>
            <Grid item xs={12} md={6}>
              <RHFTextField
                fieldName="email"
                register={register}
                errorMessage={errors?.email?.message}
                showLabelAboveFormField
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFPasswordInput
                fieldName="password"
                register={register}
                errorMessage={errors?.password?.message}
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
                errorMessage={errors?.dateTime?.message}
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
                errorMessage={errors?.dob?.message}
              />
            </Grid>
            <Grid item xs={12} md={6}>
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
                errorMessage={errors?.favouriteSport?.message}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFSelect
                fieldName="sports"
                register={register}
                defaultValue={initialValues.sports}
                label="Select Sport(s)"
                options={Object.values(Sports)}
                errorMessage={errors?.sports?.message}
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
                errorMessage={errors?.sports?.message}
                multiple
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFSelect
                fieldName="favouriteColor"
                register={register}
                defaultValue={initialValues.favouriteColor}
                options={Object.values(Colors)}
                errorMessage={errors?.favouriteColor?.message}
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
                errorMessage={errors?.color?.message}
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
                errorMessage={errors?.countries?.message}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFRadioGroup
                fieldName="gender"
                control={control}
                options={Object.values(Gender)}
                row
                errorMessage={errors?.gender?.message}
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
                errorMessage={errors?.country?.message}
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
                errorMessage={errors?.agreeTnC?.message}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFRating
                fieldName="rating"
                control={control}
                errorMessage={errors?.rating?.message}
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
