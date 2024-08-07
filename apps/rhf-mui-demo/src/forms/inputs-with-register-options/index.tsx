'use client';

import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import VisibilityOffTwoToneIcon from '@mui/icons-material/VisibilityOffTwoTone';
import { RHFTextField, RHFPasswordField } from '@nish1896/rhf-mui-components';
import {
  FormContainer,
  GridContainer,
  FieldVariantInfo,
  RenderFormState,
  SubmitButton
} from '@/components';
import { reqdMsg, minCharMsg, maxCharMsg } from '@/utils';

type FormSchema = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  age?: number;
};

const initialValues: FormSchema = {
  firstName: '',
  lastName: 'Jr.',
  email: '',
  password: '',
  confirmPassword: ''
};

export function TextAndPasswordInputForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormSchema>({
    defaultValues: initialValues
  });
  
  function onFormSubmit(formValues: FormSchema) {
    console.log('formValues: ', formValues);
  }

  return (
    <FormContainer title="TextField & PasswordInput">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <GridContainer>
          <Grid item xs={12} md={6}>
            <FieldVariantInfo title="Basic Input field with required validation" />
            <RHFTextField
              fieldName="firstName"
              register={register}
              registerOptions={{
                required: {
                  value: true,
                  message: reqdMsg('First Name')
                }
              }}
              errorMsg={errors?.firstName?.message}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FieldVariantInfo title="Input with min & max length validation" />
            <RHFTextField
              fieldName="lastName"
              register={register}
              registerOptions={{
                minLength: {
                  value: 4,
                  message: minCharMsg(4)
                },
                maxLength: {
                  value: 10,
                  message: maxCharMsg(10)
                }
              }}
              errorMsg={errors?.lastName?.message}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FieldVariantInfo title="Input with pattern validation & label above form-field" />
            <RHFTextField
              fieldName="email"
              register={register}
              errorMsg={errors?.email?.message}
              registerOptions={{
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Invalid Email Id'
                }
              }}
              variant='standard'
              showLabelAboveFormField
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FieldVariantInfo title="Simple Password Field" />
            <RHFPasswordField
              fieldName="password"
              register={register}
              registerOptions={{
                required: {
                  value: true,
                  message: reqdMsg('Password')
                },
                minLength: {
                  value: 4,
                  message: minCharMsg(4)
                }
              }}
              errorMsg={errors?.password?.message}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FieldVariantInfo title="Password Field with custom icons & validate rule" />
            <RHFPasswordField
              fieldName="confirmPassword"
              register={register}
              registerOptions={{
                required: {
                  value: true,
                  message: reqdMsg('your password again')
                },
                validate: {
                  minLen: (v) => v.length >= 4 || minCharMsg(4),
                  isPswdMatch: (value, formValues) =>
                    value === formValues.password || 'Passwords do not match'
                }
              }}
              showPasswordIcon={<VisibilityOffTwoToneIcon />}
              hidePasswordIcon={<VisibilityTwoToneIcon />}
              errorMsg={errors?.confirmPassword?.message}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FieldVariantInfo title="Number Input with Typography as a helper text & return value as a number" />
            <RHFTextField
              fieldName="age"
              register={register}
              type='number'
              registerOptions={{
                valueAsNumber: true
              }}
              errorMsg={errors?.age?.message}
              variant='filled'
              placeholder="What is your age?"
              helperText={<Typography color="seagreen">Optional</Typography>}
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
