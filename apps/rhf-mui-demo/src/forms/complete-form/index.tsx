'use client';

import { Path, useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid2';
import useTheme from '@mui/material/styles/useTheme';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
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
import { fieldNameToLabel } from '@nish1896/rhf-mui-components/form-helpers';
import {
  FormContainer,
  GridContainer,
  FormState,
  SubmitButton
} from '@/components';
import { CountriesList, IPLTeams, GroceryList, HobbiesList } from '@/constants';
import { useThemeContext } from '@/theme';
import { Colors, Gender, Sports, Person } from '@/types';

type FormSchema = Person & { disableAllFields?: boolean; }

const CompleteFormWithJoi = () => {
  const { currentTheme, toggleTheme } = useThemeContext();
  const muiTheme = useTheme();

  const {
    control,
    watch,
    getValues,
    formState: { errors },
    handleSubmit
  } = useForm<FormSchema>({
    defaultValues: {
      darkTheme: currentTheme === 'dark',
    }
  });
  const areAllFieldsDisabled = Boolean(getValues('disableAllFields'));

  function reqdMessage(fieldName: Path<Person>) {
    return `${fieldNameToLabel(fieldName)} is required`;
  }

  function minLengthMsg(length: number) {
    return `Minimum length should be ${length}`;
  }

  function matchPatternMessage(fieldName: Path<Person>) {
    return `The value for ${fieldName} must match the pattern specified.`;
  }

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
        dateAdapter={AdapterDayjs}
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
                registerOptions={{
                  required: {
                    value: true,
                    message: reqdMessage('email')
                  },
                  minLength: {
                    value: 5,
                    message: minLengthMsg(5)
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9_]+\.[a-zA-Z]{2,4}$/i,
                    message: matchPatternMessage('email')
                  }
                }}
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
                registerOptions={{
                  required: {
                    value: true,
                    message: reqdMessage('age')
                  },
                  validate: {
                    min: value => (value && value >= 18) || 'Age must be greater than 18'
                  }
                }}
                showLabelAboveFormField
                showMarkers
                disabled={areAllFieldsDisabled}
                required
                errorMessage={errors?.age?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <RHFPasswordInput
                fieldName="password"
                control={control}
                registerOptions={{
                  required: {
                    value: true,
                    message: reqdMessage('password')
                  },
                  minLength: {
                    value: 8,
                    message: minLengthMsg(8)
                  },
                  pattern: {
                    value:
                      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i,
                    message: matchPatternMessage('password')
                  }
                }}
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
                registerOptions={{
                  required: {
                    value: true,
                    message: reqdMessage('favouriteFoods')
                  },
                  validate: {
                    minLength: value =>
                      (value?.length ?? 0) >= 2 || minLengthMsg(2)
                  }
                }}
                disabled={areAllFieldsDisabled}
                required
                errorMessage={errors?.favouriteFoods?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <RHFFileUploader
                fieldName='resume'
                control={control}
                registerOptions={{
                  required: {
                    value: true,
                    message: reqdMessage('resume')
                  }
                }}
                disabled={areAllFieldsDisabled}
                required
                errorMessage={errors?.resume?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <RHFSelect
                fieldName="favouriteColor"
                control={control}
                registerOptions={{
                  required: {
                    value: true,
                    message: reqdMessage('favouriteColor')
                  }
                }}
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
                registerOptions={{
                  required: {
                    value: true,
                    message: reqdMessage('sports')
                  },
                  validate: {
                    minLength: value =>
                      (value?.length ?? 0) >= 2 || minLengthMsg(2)
                  }
                }}
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
                registerOptions={{
                  required: {
                    value: true,
                    message: reqdMessage('iplTeams')
                  },
                  validate: {
                    minLength: value =>
                      (value?.length ?? 0) >= 3 || minLengthMsg(3)
                  }
                }}
                label="IPL Teams"
                labelKey="name"
                valueKey="abbr"
                options={IPLTeams}
                multiple
                disabled={areAllFieldsDisabled}
                required
                errorMessage={errors?.iplTeams?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <RHFNativeSelect
                fieldName="favouriteSport"
                control={control}
                registerOptions={{
                  required: {
                    value: true,
                    message: reqdMessage('favouriteSport')
                  }
                }}
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
                registerOptions={{
                  required: {
                    value: true,
                    message: 'This field is required'
                  }
                }}
                options={HobbiesList}
                disabled={areAllFieldsDisabled}
                required
                errorMessage={errors?.hobby?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <RHFMultiAutocomplete
                fieldName="groceryList"
                control={control}
                registerOptions={{
                  required: {
                    value: true,
                    message: 'This field is required'
                  },
                  validate: {
                    minItems: value => {
                      if (Array.isArray(value)) {
                        return value.length >= 2 ? true : 'Select at least 2 items';
                      }
                      return 'Invalid input';
                    },
                  }
                }}
                options={GroceryList}
                disabled={areAllFieldsDisabled}
                required
                errorMessage={errors?.groceryList?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <RHFCountrySelect
                fieldName="countryCode"
                control={control}
                registerOptions={{
                  required: {
                    value: true,
                    message: reqdMessage('countryCode')
                  }
                }}
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
                registerOptions={{
                  required: {
                    value: true,
                    message: reqdMessage('agreeTnC')
                  }
                }}
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
                registerOptions={{
                  required: {
                    value: true,
                    message: reqdMessage('colors')
                  }
                }}
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
                registerOptions={{
                  required: {
                    value: true,
                    message: reqdMessage('countries')
                  },
                  validate: {
                    minLength: value =>
                      (value?.length ?? 0) >= 4 || minLengthMsg(4)
                  }
                }}
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
                registerOptions={{
                  required: {
                    value: true,
                    message: reqdMessage('gender')
                  }
                }}
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
                registerOptions={{
                  required: {
                    value: true,
                    message: reqdMessage('country')
                  }
                }}
                options={CountriesList}
                labelKey="country"
                valueKey="code"
                row
                onValueChange={selectedValue => {
                  alert(`selectedValue: ${selectedValue}`);
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
                  labelPlacement: 'end'
                }}
                onValueChange={() => toggleTheme()}
                helperText="Toggling this changes theme"
                disabled={areAllFieldsDisabled}
                errorMessage={errors?.darkTheme?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <RHFSlider
                fieldName="weight"
                control={control}
                registerOptions={{
                  required: {
                    value: true,
                    message: reqdMessage('weight')
                  },
                  valueAsNumber: true,
                  validate: {
                    min: value => (value && value >= 10) || 'Weight must be greater than 10'
                  }
                }}
                label="weight"
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
                registerOptions={{
                  required: {
                    value: true,
                    message: reqdMessage('rating')
                  },
                  valueAsNumber: true,
                  validate: {
                    min: value => (value && value >= 5) || 'Don\'t you think we deserve a better rating ?'
                  }
                }}
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
                registerOptions={{
                  required: {
                    value: true,
                    message: reqdMessage('dob')
                  },
                  valueAsDate: true,
                  validate: {
                    validDate: value => {
                      if (!value) {
                        return 'Date is required';
                      }
                      /* Ensure value is at least 10 days from today */
                      const tenDaysFromNow = new Date();
                      tenDaysFromNow.setDate(tenDaysFromNow.getDate() - 10);
                      return value <= tenDaysFromNow || 'Date must be at least 10 days before from today';
                    },
                  }
                }}
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
                registerOptions={{
                  required: {
                    value: true,
                    message: reqdMessage('time')
                  },
                  valueAsDate: true,
                }}
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
                registerOptions={{
                  required: {
                    value: true,
                    message: reqdMessage('dateTime')
                  },
                  valueAsDate: true,
                }}
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
                registerOptions={{
                  required: {
                    value: true,
                    message: reqdMessage('bgColor')
                  }
                }}
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
                registerOptions={{
                  required: {
                    value: true,
                    message: reqdMessage('feedback')
                  },
                  validate: {
                    minLength: value =>
                      (value?.length ?? 0) >= 10 || minLengthMsg(10)
                  }
                }}
                disabled={areAllFieldsDisabled}
                required
                errorMessage={errors?.feedback?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <RHFPhoneInput
                fieldName="phoneNumber"
                control={control}
                registerOptions={{
                  required: {
                    value: true,
                    message: reqdMessage('phoneNumber')
                  },
                  validate: {
                    minLength: value =>
                      (value?.length ?? 0) >= 10 || minLengthMsg(10)
                  }
                }}
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
