'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';
import MUITextField from '@nish1896/mui-components/mui/textfield';
import {
  FormContainer,
  GridContainer,
  FieldVariantInfo,
  FormState,
  SubmitButton,
  ResetButton
} from '@/components';
import { formSubmitEventName } from '@/constants';
import type { OptionalString } from '@/types';
import {
  reqdMsg,
  minCharMsg,
  maxCharMsg,
  showToastMessage,
  logFirebaseEvent
} from '@/utils';

const emailPattern = /^[a-zA-Z0-9](?:[a-zA-Z0-9._%+-]*[a-zA-Z0-9])?@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

const initialValues = {
  firstName: undefined,
  lastName: 'J',
  email: ''
};

export default function TextFieldForm() {
  const pathName = usePathname();

  const [firstName, setFirstName] = useState<OptionalString>(initialValues.firstName);
  const [firstNameError, setFirstNameError] = useState<OptionalString>();
  const [lastName, setLastName] = useState<OptionalString>(initialValues.lastName);
  const [email, setEmail] = useState<OptionalString>(initialValues.email);
  const [emailError, setEmailError] = useState<OptionalString>();
  const [disableAllFields, setDisableAllFields] = useState(false);

  const formValues = {
    firstName,
    lastName,
    email
  };

  const errors = {
    firstName: firstNameError,
    email: emailError
  };

  function validateFirstName(value: OptionalString) {
    if (!value) {
      return reqdMsg('First Name');
    }
    if (value.length < 4) {
      return minCharMsg(4);
    }
    if (value.length > 10) {
      return maxCharMsg(10);
    }
    return undefined;
  }

  function validateEmail(value: OptionalString) {
    if (!value) {
      return reqdMsg('Email');
    }
    if (!emailPattern.test(value)) {
      return 'Enter a valid email address';
    }
    return undefined;
  }

  function validateForm() {
    const nextFirstNameError = validateFirstName(firstName);
    const nextEmailError = validateEmail(email);

    setFirstNameError(nextFirstNameError);
    setEmailError(nextEmailError);

    return !nextFirstNameError && !nextEmailError;
  }

  function resetForm() {
    setFirstName(initialValues.firstName);
    setLastName(initialValues.lastName);
    setEmail(initialValues.email);
    setFirstNameError(undefined);
    setEmailError(undefined);
  }

  async function onFormSubmit() {
    if (!validateForm()) {
      return;
    }
    await logFirebaseEvent(formSubmitEventName, { pathName });
    showToastMessage(formValues);
  }

  return (
    <FormContainer>
      <GridContainer>
        <Grid size={12}>
          <FormControlLabel
            control={(
              <Checkbox
                checked={disableAllFields}
                onChange={event => {
                  setDisableAllFields(event.target.checked);
                }}
              />
            )}
            label="Disable all fields"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <FieldVariantInfo title="Basic Input field with required, min & max length validation" />
          <MUITextField
            fieldName="firstName"
            value={firstName}
            autoComplete="firstName"
            onValueChange={({ newValue }) => {
              setFirstName(newValue);
              setFirstNameError(undefined);
            }}
            onBlur={() => {
              setFirstNameError(validateFirstName(firstName));
            }}
            errorMessage={firstNameError}
            disabled={disableAllFields}
            required
            helperText="Enter min 4 and max 10 characters"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <FieldVariantInfo title="Input with variant prop, and value transformation" />
          <MUITextField
            fieldName="lastName"
            value={lastName}
            onValueChange={({ newValue }) => {
              setLastName(newValue.toUpperCase());
            }}
            variant="filled"
            disabled={disableAllFields}
            helperText="Input value would be capitalized!"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <FieldVariantInfo title="Input with pattern validation, label above form-field, custom ids and renderError" />
          <MUITextField
            fieldName="email"
            value={email}
            type="email"
            onValueChange={({ newValue }) => {
              setEmail(newValue);
              setEmailError(undefined);
            }}
            onBlur={() => {
              setEmailError(validateEmail(email));
            }}
            disabled={disableAllFields}
            errorMessage={emailError}
            renderError={errors => (
              <Box sx={{ alignItems: 'center', display: 'flex', gap: 0.5 }}>
                <ErrorOutlinedIcon color="error" fontSize="small" />
                <Typography component="span" variant="body2">
                  {errors[0]}
                </Typography>
              </Box>
            )}
            customIds={{
              field: 'userEmail',
              label: 'userEmail-label',
              error: 'userEmail-error'
            }}
            variant="standard"
            showLabelAboveFormField
            formLabelProps={{ sx: { color: 'blue', fontWeight: 600 } }}
          />
        </Grid>
        <Grid size={12}>
          <SubmitButton onClick={onFormSubmit} />
          <ResetButton onClick={resetForm} />
        </Grid>
        <Grid size={12}>
          <FormState
            formValues={formValues}
            errors={errors}
          />
        </Grid>
      </GridContainer>
    </FormContainer>
  );
}
