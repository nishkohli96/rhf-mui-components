'use client';

import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Grid from '@mui/material/Grid';
import useTheme from '@mui/material/styles/useTheme';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { ConfigProvider } from '@nish1896/rhf-mui-components/config';
import RHFTextField from '@nish1896/rhf-mui-components/mui/textfield';
import RHFPasswordInput from '@nish1896/rhf-mui-components/mui/password-input';
import RHFSelect from '@nish1896/rhf-mui-components/mui/select';
import RHFCountrySelect from '@nish1896/rhf-mui-components/mui/country-select';
import RHFNativeSelect from '@nish1896/rhf-mui-components/mui/native-select';
import RHFCheckbox from '@nish1896/rhf-mui-components/mui/checkbox';
import RHFCheckboxGroup from '@nish1896/rhf-mui-components/mui/checkbox-group';
import RHFRadioGroup from '@nish1896/rhf-mui-components/mui/radio-group';
import RHFRating from '@nish1896/rhf-mui-components/mui/rating';
import RHFSlider from '@nish1896/rhf-mui-components/mui/slider';
import RHFSwitch from '@nish1896/rhf-mui-components/mui/switch';
import RHFDatePicker from '@nish1896/rhf-mui-components/mui-pickers/date';
import RHFDateTimePicker from '@nish1896/rhf-mui-components/mui-pickers/date-time';
import RHFTimePicker from '@nish1896/rhf-mui-components/mui-pickers/time';
import RHFColorPicker from '@nish1896/rhf-mui-components/misc/color-picker';
import RHFRichTextEditor from '@nish1896/rhf-mui-components/misc/rich-text-editor';
import RHFPhoneInput from '@nish1896/rhf-mui-components/misc/phone-input';
import {
  FormContainer,
  GridContainer,
  FormState,
  SubmitButton
} from '@/components';
import { useThemeContext } from '@/theme';
import { Colors, Gender, Sports, Person } from '@/types';
import { CountriesList, IPLTeams } from '@/constants';
import { JoiFormSchema } from './validation';
import styles from './styles.module.css';

type FormSchema = Person & { disableAllFields?: boolean;}

const CompleteFormWithJoi = () => {
  const { currentTheme, toggleTheme } = useThemeContext();
  const muiTheme = useTheme();
  
  const initialValues: FormSchema = {
    email: 'hello@example.com',
    password: '',
    favouriteColor: '',
    sports: [],
    iplTeams: [],
    favouriteSport: '',
    agreeTnC: true,
    colors: null,
    countries: null,
    gender: null,
    country: '',
    phoneNumber: '+91 9876598765',
    darkTheme: currentTheme === 'dark',
    age: 25,
    rating: null,
    dob: null,
    time: null,
    dateTime: null,
    bgColor: '#007ABA',
    feedback: '',
    disableAllFields: false
  };

  const {
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
    handleSubmit
  } = useForm<FormSchema>({
    defaultValues: initialValues,
    resolver: joiResolver(JoiFormSchema)
  });
  
  const areAllFieldsDisabled = Boolean(getValues('disableAllFields'));

  function onFormSubmit(formValues: FormSchema) {
    alert(`Form Submitted with values: \n\n ${JSON.stringify(formValues)}`);
  }

  return (
    <FormContainer title="Joi Form">
      <ConfigProvider
        defaultFormLabelSx={{
          mb: '8px',
          color: '#EA3677'
        }}
        defaultFormControlLabelSx={{
          color: '#1976D2'
        }}
        defaultFormHelperTextSx={{
          mt: '20px',
          fontWeight: 500,
          color: muiTheme.palette.info.main
        }}
        dateAdapter={AdapterMoment}
      >
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <GridContainer>
            <Grid item xs={12}>
              <RHFCheckbox
                fieldName='disableAllFields'
                control={control}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField
                fieldName="email"
                control={control}
                errorMessage={errors?.email?.message}
                showLabelAboveFormField
                disabled={areAllFieldsDisabled}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFPasswordInput
                fieldName="password"
                control={control}
                errorMessage={errors?.password?.message}
                showLabelAboveFormField
                disabled={areAllFieldsDisabled}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFSelect
                fieldName="favouriteColor"
                control={control}
                defaultValue={initialValues.favouriteColor}
                options={Object.values(Colors)}
                errorMessage={errors?.favouriteColor?.message}
                defaultOptionText="--- Select ---"
                showDefaultOption
                disabled={areAllFieldsDisabled}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFSelect
                fieldName="sports"
                control={control}
                defaultValue={initialValues.sports}
                label="Select Sport(s)"
                options={Object.values(Sports)}
                errorMessage={errors?.sports?.message}
                multiple
                showLabelAboveFormField
                disabled={areAllFieldsDisabled}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFSelect
                fieldName="iplTeams"
                control={control}
                defaultValue={initialValues.iplTeams}
                label="IPL Teams"
                labelKey="name"
                valueKey="abbr"
                options={IPLTeams}
                errorMessage={errors?.sports?.message}
                multiple
                disabled={areAllFieldsDisabled}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFCountrySelect
                fieldName="countryCode"
                control={control}
                label="Country Code of Nationality"
                errorMessage={errors?.countryCode?.message}
                disabled={areAllFieldsDisabled}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFNativeSelect
                fieldName="favouriteSport"
                control={control}
                options={Object.values(Sports)}
                errorMessage={errors?.favouriteSport?.message}
                disabled={areAllFieldsDisabled}
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
                onValueChange={isChecked => {
                  console.log('Is checked', isChecked);
                }}
                errorMessage={errors?.agreeTnC?.message}
                disabled={areAllFieldsDisabled}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFCheckboxGroup
                fieldName="colors"
                control={control}
                label="Select Color"
                showLabelAboveFormField
                options={Object.values(Colors)}
                errorMessage={errors?.colors?.message}
                disabled={areAllFieldsDisabled}
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
                disabled={areAllFieldsDisabled}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFRadioGroup
                fieldName="gender"
                control={control}
                options={Object.values(Gender)}
                row
                errorMessage={errors?.gender?.message}
                disabled={areAllFieldsDisabled}
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
                onValueChange={selectedValue => {
                  alert(`selectedValue: ${selectedValue}`);
                }}
                errorMessage={errors?.country?.message}
                disabled={areAllFieldsDisabled}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFSwitch
                fieldName="darkTheme"
                control={control}
                label="Enable Dark Theme"
                formControlLabelProps={{
                  labelPlacement: 'end',
                  classes: {
                    label: styles.switchLabel
                  }
                }}
                onValueChange={() => toggleTheme()}
                disabled={areAllFieldsDisabled}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFSlider
                fieldName="age"
                control={control}
                label="Age"
                min={10}
                max={80}
                helperText="min:10; max:80"
                errorMessage={errors?.age?.message}
                disabled={areAllFieldsDisabled}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFRating
                fieldName="rating"
                control={control}
                errorMessage={errors?.rating?.message}
                max={10}
                showLabelAboveFormField
                disabled={areAllFieldsDisabled}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFDatePicker
                fieldName="dob"
                control={control}
                label="Date of Birth"
                format="DD MMM YYYY"
                disableFuture
                showLabelAboveFormField
                helperText="Cannot select future dates"
                errorMessage={errors?.dob?.message}
                disabled={areAllFieldsDisabled}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTimePicker
                fieldName="time"
                control={control}
                label="Time"
                ampm={false}
                errorMessage={errors?.time?.message}
                disabled={areAllFieldsDisabled}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFDateTimePicker
                fieldName="dateTime"
                control={control}
                showLabelAboveFormField
                ampm={false}
                errorMessage={errors?.dateTime?.message}
                disabled={areAllFieldsDisabled}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFColorPicker
                fieldName="bgColor"
                onValueChange={color => setValue('bgColor', color.hex)}
                disabled={areAllFieldsDisabled}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFRichTextEditor
                fieldName="feedback"
                control={control}
                errorMessage={errors?.feedback?.message}
                disabled={areAllFieldsDisabled}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFPhoneInput
                fieldName="phoneNumber"
                control={control}
                value={getValues('phoneNumber')}
                showLabelAboveFormField
                variant="standard"
                phoneInputProps={{
                  defaultCountry: 'in'
                }}
                errorMessage={errors?.phoneNumber?.message}
                disabled={areAllFieldsDisabled}
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

export default CompleteFormWithJoi;
