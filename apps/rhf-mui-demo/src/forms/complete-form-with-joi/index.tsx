'use client';

import { usePathname } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Grid from '@mui/material/Grid2';
import useTheme from '@mui/material/styles/useTheme';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { ConfigProvider } from '@nish1896/rhf-mui-components/config';
import RHFTextField from '@nish1896/rhf-mui-components/mui/textfield';
import RHFNumberInput from '@nish1896/rhf-mui-components/mui/number-input';
import RHFPasswordInput from '@nish1896/rhf-mui-components/mui/password-input';
import RHFTagsInput from '@nish1896/rhf-mui-components/mui/tags-input';
import RHFFileUploader from '@nish1896/rhf-mui-components/mui/file-uploader';
import RHFSelect from '@nish1896/rhf-mui-components/mui/select';
import RHFNativeSelect from '@nish1896/rhf-mui-components/mui/native-select';
import RHFAutocomplete from '@nish1896/rhf-mui-components/mui/autocomplete';
import RHFMultiAutocomplete from '@nish1896/rhf-mui-components/mui/multi-autocomplete';
import RHFCountrySelect from '@nish1896/rhf-mui-components/mui/country-select';
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
import { toast } from 'react-toastify';
import {
  FormContainer,
  GridContainer,
  FormState,
  SubmitButton
} from '@/components';
import {
  CountriesList,
  IPLTeams,
  GroceryList,
  HobbiesList,
  formSubmitEventName,
} from '@/constants';
import { useThemeContext } from '@/theme';
import { Colors, Gender, Sports, type Person } from '@/types';
import { logFirebaseEvent, showToastMessage } from '@/utils';
import { JoiFormSchema } from './validation';
import styles from './styles.module.css';

type FormSchema = Person & { disableAllFields?: boolean };

const CompleteFormWithJoi = () => {
  const pathName = usePathname();
  const { currentTheme, toggleTheme } = useThemeContext();
  const muiTheme = useTheme();

  const initialValues: FormSchema = {
    email: 'hello@example.com',
    password: '',
    favouriteFoods: ['Rajma Rice'],
    favouriteColor: '',
    sports: [Sports.Badminton],
    iplTeams: [],
    favouriteSport: '',
    agreeTnC: true,
    colors: null,
    countries: null,
    hobby: '',
    groceryList: [],
    gender: null,
    country: '',
    phoneNumber: '+91 9876598765',
    darkTheme: currentTheme === 'dark',
    age: 25,
    weight: 60,
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
    getValues,
    formState: { errors },
    handleSubmit
  } = useForm<FormSchema>({
    defaultValues: initialValues,
    resolver: joiResolver(JoiFormSchema)
  });
  const areAllFieldsDisabled = Boolean(getValues('disableAllFields'));
  console.log('resume ', watch('resume'));

  async function onFormSubmit(formValues: FormSchema) {
    await logFirebaseEvent(formSubmitEventName, { pathName });
    showToastMessage(formValues);
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
            <Grid size={12}>
              <RHFCheckbox
                fieldName="disableAllFields"
                control={control}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <RHFTextField
                fieldName="email"
                control={control}
                showLabelAboveFormField
                disabled={areAllFieldsDisabled}
                required
                errorMessage={errors?.email?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <RHFNumberInput
                fieldName="age"
                control={control}
                showLabelAboveFormField
                disabled={areAllFieldsDisabled}
                required
                errorMessage={errors?.age?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <RHFPasswordInput
                fieldName="password"
                control={control}
                showLabelAboveFormField
                disabled={areAllFieldsDisabled}
                required
                errorMessage={errors?.password?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <RHFTagsInput
                fieldName="favouriteFoods"
                control={control}
                disabled={areAllFieldsDisabled}
                required
                errorMessage={errors?.favouriteFoods?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <RHFFileUploader
                fieldName="resume"
                control={control}
                disabled={areAllFieldsDisabled}
                required
                errorMessage={errors?.resume?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <RHFSelect
                fieldName="favouriteColor"
                control={control}
                options={Object.values(Colors)}
                defaultOptionText="--- Select ---"
                showDefaultOption
                disabled={areAllFieldsDisabled}
                required
                errorMessage={errors?.favouriteColor?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <RHFSelect
                fieldName="sports"
                control={control}
                label="Select Sport(s)"
                options={Object.values(Sports)}
                multiple
                showLabelAboveFormField
                disabled={areAllFieldsDisabled}
                required
                errorMessage={errors?.sports?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <RHFSelect
                fieldName="iplTeams"
                control={control}
                label="IPL Teams"
                labelKey="name"
                valueKey="abbr"
                options={IPLTeams}
                multiple
                disabled={areAllFieldsDisabled}
                required
                errorMessage={errors?.sports?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <RHFNativeSelect
                fieldName="favouriteSport"
                control={control}
                options={Object.values(Sports)}
                disabled={areAllFieldsDisabled}
                required
                errorMessage={errors?.favouriteSport?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <RHFAutocomplete
                fieldName="hobby"
                control={control}
                options={HobbiesList}
                registerOptions={{
                  required: {
                    value: true,
                    message: 'This field is required'
                  }
                }}
                disabled={areAllFieldsDisabled}
                required
                errorMessage={errors?.hobby?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <RHFMultiAutocomplete
                fieldName="groceryList"
                control={control}
                options={GroceryList}
                required
                errorMessage={errors?.groceryList?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <RHFCountrySelect
                fieldName="countryCode"
                control={control}
                label="Country Code of Nationality"
                disabled={areAllFieldsDisabled}
                required
                errorMessage={errors?.countryCode?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
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
                disabled={areAllFieldsDisabled}
                errorMessage={errors?.agreeTnC?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <RHFCheckboxGroup
                fieldName="colors"
                control={control}
                label="Select Color"
                showLabelAboveFormField
                options={Object.values(Colors)}
                disabled={areAllFieldsDisabled}
                required
                errorMessage={errors?.colors?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <RHFCheckboxGroup
                fieldName="countries"
                control={control}
                label="Select Countries"
                options={CountriesList}
                labelKey="country"
                valueKey="code"
                disabled={areAllFieldsDisabled}
                required
                errorMessage={errors?.countries?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <RHFRadioGroup
                fieldName="gender"
                control={control}
                options={Object.values(Gender)}
                row
                disabled={areAllFieldsDisabled}
                required
                errorMessage={errors?.gender?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <RHFRadioGroup
                fieldName="country"
                control={control}
                options={CountriesList}
                defaultValue={initialValues.country}
                labelKey="country"
                valueKey="code"
                row
                onValueChange={selectedValue => {
                  toast.info(`selectedValue: ${selectedValue}`);
                }}
                disabled={areAllFieldsDisabled}
                required
                errorMessage={errors?.country?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
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
            <Grid size={{ xs: 12, md: 6 }}>
              <RHFSlider
                fieldName="weight"
                control={control}
                label="Age"
                min={10}
                max={100}
                helperText="min:10; max:100"
                disabled={areAllFieldsDisabled}
                required
                errorMessage={errors?.weight?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <RHFRating
                fieldName="rating"
                control={control}
                max={10}
                showLabelAboveFormField
                disabled={areAllFieldsDisabled}
                required
                errorMessage={errors?.rating?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <RHFDatePicker
                fieldName="dob"
                control={control}
                label="Date of Birth"
                format="DD MMM YYYY"
                disableFuture
                showLabelAboveFormField
                helperText="Cannot select future dates"
                disabled={areAllFieldsDisabled}
                required
                errorMessage={errors?.dob?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <RHFTimePicker
                fieldName="time"
                control={control}
                label="Time"
                ampm={false}
                disabled={areAllFieldsDisabled}
                required
                errorMessage={errors?.time?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <RHFDateTimePicker
                fieldName="dateTime"
                control={control}
                showLabelAboveFormField
                ampm={false}
                disabled={areAllFieldsDisabled}
                required
                errorMessage={errors?.dateTime?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <RHFColorPicker
                fieldName="bgColor"
                control={control}
                value={getValues('bgColor')}
                disabled={areAllFieldsDisabled}
                required
                errorMessage={errors?.bgColor?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <RHFRichTextEditor
                fieldName="feedback"
                control={control}
                disabled={areAllFieldsDisabled}
                required
                errorMessage={errors?.feedback?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <RHFPhoneInput
                fieldName="phoneNumber"
                control={control}
                value={getValues('phoneNumber')}
                showLabelAboveFormField
                variant="standard"
                phoneInputProps={{
                  defaultCountry: 'in'
                }}
                disabled={areAllFieldsDisabled}
                required
                errorMessage={errors?.phoneNumber?.message}
              />
            </Grid>
            <Grid size={12}>
              <SubmitButton />
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

export default CompleteFormWithJoi;
