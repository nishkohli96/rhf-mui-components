'use client';

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import InfoIcon from '@mui/icons-material/Info';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { ConfigProvider } from '@nish1896/rhf-mui-components/config';
import RHFDatePicker from '@nish1896/rhf-mui-components/mui-pickers/date';
import {
  FormContainer,
  FieldVariantInfo,
  GridContainer,
  FormState,
  SubmitButton,
} from '@/components';
import { formSubmitEventName } from '@/constants';
import { Colors } from '@/types';
import {
  reqdMsg,
  minCharMsg,
  maxCharMsg,
  showToastMessage,
  logFirebaseEvent,
  generateAirportNames,
} from '@/utils';
import StyledRHFTextField from './StyledTextField';
import StyledSelect from './StyledSelect';
import StyledAutocomplete from './StyledAutocomplete';

type FormSchema = {
  firstName: string;
  lastName: string;
  dob: Date | null;
  favouriteColor?: Colors;
  airports?: string[];
};

const initialValues: FormSchema = {
  firstName: '',
  lastName: '',
  dob: null
};

const colorOptions = Object.values(Colors).map(color => ({
  value: color,
  label: color.charAt(0).toUpperCase() + color.slice(1)
}));

export default function StyledReusableComponentForm() {
  const pathName = usePathname();
  const {
    control,
    watch,
    formState: { errors },
    handleSubmit
  } = useForm<FormSchema>({
    defaultValues: initialValues,
  });
  const airportList = useMemo(() => generateAirportNames(100), []);

  async function onFormSubmit(formValues: FormSchema) {
    await logFirebaseEvent(formSubmitEventName, { pathName });
    showToastMessage(formValues);
  }
  return (
    <FormContainer title="TextField & PasswordInput">
      <ConfigProvider
        defaultFormLabelSx={{
          color: '#007bff'
        }}
        defaultFormHelperTextSx={{
          ml: '12px'
        }}
        dateAdapter={AdapterLuxon}
      >
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <GridContainer>
            <Grid size={12}>
              <FieldVariantInfo title='Custom FormLabel for both text inputs; custom helperText for "firstName" field'/>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <StyledRHFTextField
                fieldName="firstName"
                control={control}
                registerOptions={{
                  required: {
                    value: true,
                    message: reqdMsg('First Name'),
                  },
                }}
                helperText={
                  <Typography variant="body2">
                    <InfoIcon color="info" />
                    The name that matches on your passport
                  </Typography>
                }
                errorMessage={errors?.firstName?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <StyledRHFTextField
                fieldName="lastName"
                control={control}
                registerOptions={{
                  minLength: {
                    value: 4,
                    message: minCharMsg(4),
                  },
                  maxLength: {
                    value: 10,
                    message: maxCharMsg(10),
                  },
                }}
                errorMessage={errors?.lastName?.message}
              />
            </Grid>
            <Grid size={6}>
              <FieldVariantInfo title="Date Picker with Luxon adapter" />
              <RHFDatePicker
                control={control}
                fieldName="dob"
                label="Date of Birth"
                disableFuture
              />
            </Grid>
            <Grid size={6}>
              <FieldVariantInfo title="Customized RHFSelect with a custom font family applied on form label text" />
              <StyledSelect
                control={control}
                fieldName="favouriteColor"
                label="Favourite Color"
                options={colorOptions}
                labelKey="label"
                valueKey="value"
              />
            </Grid>
            <Grid size={6}>
              <FieldVariantInfo title="Customized RHFAutocomplete with styled helpertext" />
              <StyledAutocomplete
                control={control}
                fieldName="airports"
                label="Airports"
                textFieldProps={{
                  placeholder: 'Select Airport(s) You\'ve travelled to'
                }}
                options={airportList}
                labelKey="name"
                helperText="You can select multiple airports"
                valueKey="iataCode"
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
}
