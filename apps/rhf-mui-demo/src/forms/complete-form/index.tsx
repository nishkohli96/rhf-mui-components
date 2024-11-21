'use client';

import { Path, useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import useTheme from '@mui/material/styles/useTheme';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
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
import { fieldNameToLabel } from '@nish1896/rhf-mui-components/form-helpers';
import {
  FormContainer,
  GridContainer,
  FormState,
  SubmitButton
} from '@/components';
import { useThemeContext } from '@/theme';
import { Colors, Gender, Sports, Person } from '@/types';
import { CountriesList, IPLTeams } from '@/constants';

const CompleteFormWithJoi = () => {
  const { currentTheme, toggleTheme } = useThemeContext();
  const muiTheme = useTheme();

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    formState: { errors }
  } = useForm<Person>({
    defaultValues: {
      darkTheme: currentTheme === 'dark',
    }
  });

	function reqdMessage(fieldName: Path<Person>) {
		return `${fieldNameToLabel(fieldName)} is required`;
	}

	function minLengthMsg(length: number) {
		return `Minimum length should be ${length}`
	}

	function matchPatternMessage(fieldName: Path<Person>) {
		return `The value for ${fieldName} must match the pattern specified.`;
	}

  function onFormSubmit(formValues: Person) {
    alert(`Form Submitted with values: \n\n ${JSON.stringify(formValues)}`);
  }

  return (
    <FormContainer title="Joi Form">
      <ConfigProvider
        defaultFormLabelSx={{
          mt: '20px',
          mb: '16px',
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
            <Grid item xs={12} md={6}>
              <RHFTextField
                fieldName="email"
                register={register}
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
              />
            </Grid>
            <Grid item xs={12} md={6}>
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
                errorMessage={errors?.favouriteColor?.message}
                defaultOptionText="--- Select ---"
                showDefaultOption
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFSelect
                fieldName="sports"
                control={control}
                registerOptions={{
                  required: {
                    value: true,
                    message: reqdMessage('sports')
                  },
                  validate: {
                    minLength: (value) =>
                      (value?.length ?? 0) >= 2 || minLengthMsg(2)
                  }
                }}
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
                control={control}
                registerOptions={{
                  required: {
                    value: true,
                    message: reqdMessage('iplTeams')
                  },
                  validate: {
                    minLength: (value) =>
                      (value?.length ?? 0) >= 3 || minLengthMsg(3)
                  }
                }}
                label="IPL Teams"
                labelKey="name"
                valueKey="abbr"
                options={IPLTeams}
                errorMessage={errors?.iplTeams?.message}
                multiple
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFCountrySelect
                fieldName="countryCode"
                control={control}
                label="Country Code of Nationality"
                registerOptions={{
                  required: {
                    value: true,
                    message: reqdMessage('countryCode')
                  }
                }}
                errorMessage={errors?.countryCode?.message}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFNativeSelect
                fieldName="favouriteSport"
                register={register}
                registerOptions={{
                  required: {
                    value: true,
                    message: reqdMessage('countryCode')
                  }
                }}
                options={Object.values(Sports)}
                errorMessage={errors?.favouriteSport?.message}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFCheckbox
                fieldName="agreeTnC"
                control={control}
                label="Agree To Terms & Conditions"
                registerOptions={{
                  required: {
                    value: true,
                    message: reqdMessage('agreeTnC')
                  }
                }}
                formControlLabelProps={{
                  labelPlacement: 'end'
                }}
                onValueChange={(e) => {
                  console.log('toggled checkbox', e);
                }}
                errorMessage={errors?.agreeTnC?.message}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFCheckboxGroup
                fieldName="colors"
                control={control}
                label="Select Color"
                showLabelAboveFormField
                options={Object.values(Colors)}
                registerOptions={{
                  required: {
                    value: true,
                    message: reqdMessage('colors')
                  }
                }}
                errorMessage={errors?.colors?.message}
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
                registerOptions={{
                  required: {
                    value: true,
                    message: reqdMessage('countries')
                  },
                  validate: {
                    minLength: (value) =>
                      (value?.length ?? 0) >= 4 || minLengthMsg(4)
                  }
                }}
                errorMessage={errors?.countries?.message}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFRadioGroup
                fieldName="gender"
                control={control}
                options={Object.values(Gender)}
                row
                registerOptions={{
                  required: {
                    value: true,
                    message: reqdMessage('gender')
                  }
                }}
                errorMessage={errors?.gender?.message}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFRadioGroup
                fieldName="country"
                control={control}
                options={CountriesList}
                labelKey="country"
                valueKey="code"
                row
                onValueChange={(_, selectedValue) => {
                  alert(`selectedValue: ${selectedValue}`);
                }}
                registerOptions={{
                  required: {
                    value: true,
                    message: reqdMessage('country')
                  }
                }}
                errorMessage={errors?.country?.message}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFSwitch
                fieldName="darkTheme"
                control={control}
                label="Enable Dark Theme"
                formControlLabelProps={{
                  labelPlacement: 'end'
                }}
                onValueChange={() => toggleTheme()}
                helperText="Toggling this changes theme"
                errorMessage={errors?.darkTheme?.message}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFSlider
                fieldName="age"
                control={control}
                label="Age"
                min={10}
                max={80}
                registerOptions={{
                  required: {
                    value: true,
                    message: reqdMessage('age')
                  },
                  valueAsNumber: true,
                  validate: {
                    min: value => (value && value >= 18) || 'Age must be greater than 18'
                  }
                }}
                helperText="min:10; max:80"
                errorMessage={errors?.age?.message}
              />
            </Grid>
            <Grid item xs={12} md={6}>
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
                errorMessage={errors?.rating?.message}
              />
            </Grid>
            <Grid item xs={12} md={6}>
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
                    validDate: (value) => {
                      if (!value) return "Date is required";
                      /* Ensure value is at least 10 days from today */
                      const tenDaysFromNow = new Date();
                      tenDaysFromNow.setDate(tenDaysFromNow.getDate() - 10);
                      return value <= tenDaysFromNow || "Date must be at least 10 days before from today";
                    },
                  }
                }}
                label="Date of Birth"
                format="DD MMM YYYY"
                disableFuture
                showLabelAboveFormField
                helperText="Cannot select future dates"
                errorMessage={errors?.dob?.message}
              />
            </Grid>
            <Grid item xs={12} md={6}>
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
                errorMessage={errors?.time?.message}
              />
            </Grid>
            <Grid item xs={12} md={6}>
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
                errorMessage={errors?.dateTime?.message}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFColorPicker
                fieldName="bgColor"
                onValueChange={(color) => setValue('bgColor', color.hex)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFRichTextEditor
                fieldName="feedback"
                control={control}
                errorMessage={errors?.feedback?.message}
                registerOptions={{
                  required: {
                    value: true,
                    message: reqdMessage('feedback')
                  },
                  validate: {
                    minLength: (value) =>
                      (value?.length ?? 0) >= 10 || minLengthMsg(10)
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFPhoneInput
                fieldName="phoneNumber"
                control={control}
                registerOptions={{
                  required: {
                    value: true,
                    message: reqdMessage('phoneNumber')
                  },
                  validate: {
                    minLength: (value) =>
                      (value?.length ?? 0) >= 10 || minLengthMsg(10)
                  }
                }}
                showLabelAboveFormField
                variant="standard"
                phoneInputProps={{
                  defaultCountry: 'in'
                }}
                errorMessage={errors?.phoneNumber?.message}
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
