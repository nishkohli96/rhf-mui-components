'use client';

import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import InfoIcon from '@mui/icons-material/Info';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { ConfigProvider } from '@nish1896/rhf-mui-components/config';
import RHFDatePicker from '@nish1896/rhf-mui-components/mui-pickers/date';
import {
  FormContainer,
  FieldVariantInfo,
  GridContainer,
  RenderFormState,
  SubmitButton,
} from '@/components';
import { reqdMsg, minCharMsg, maxCharMsg } from '@/utils';
import StyledRHFTextField from './StyledTextField';

type FormSchema = {
  firstName: string;
  lastName: string;
  dob: Date | null;
};

const initialValues: FormSchema = {
  firstName: '',
  lastName: '',
  dob: null
};

export default function StyledReusableComponentForm() {
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormSchema>({
    defaultValues: initialValues,
  });

  function onFormSubmit(formValues: FormSchema) {
    alert(`Form Submitted with values: \n\n ${JSON.stringify(formValues)}`);
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
            <Grid item xs={12}>
              <FieldVariantInfo title='Custom FormLabel for both text inputs; custom helperText for "firstName" field'/>
            </Grid>
            <Grid item xs={12} md={6}>
              <StyledRHFTextField
                fieldName="firstName"
                register={register}
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
            <Grid item xs={12} md={6}>
              <StyledRHFTextField
                fieldName="lastName"
                register={register}
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
            <Grid item xs={6}>
              <FieldVariantInfo title="Date Picker with Luxon adapter" />
              <RHFDatePicker
                register={register}
                setValue={setValue}
                fieldName="dob"
                label="Date of Birth"
                disableFuture
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
