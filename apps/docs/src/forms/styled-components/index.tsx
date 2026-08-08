'use client';

/**
 * Reusable styled-component form driven by plain React `useState`. Every field
 * is one of the local `Styled*` wrappers (a preset, restyled `MUI*` component),
 * and each has `required` + manual per-field error handling — validated on
 * submit and cleared as the user edits.
 */

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { type DateTime } from 'luxon';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import InfoIcon from '@mui/icons-material/Info';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { ConfigProvider } from '@nish1896/mui-components/config';
import {
  FormContainer,
  FieldVariantInfo,
  GridContainer,
  FormState,
  SubmitButton,
  ResetButton
} from '@/components';
import { formSubmitEventName, hobbiesList, countriesList } from '@/constants';
import {
  reqdMsg,
  minCharMsg,
  showToastMessage,
  logFirebaseEvent
} from '@/utils';
import StyledTextField from './StyledTextField';
import StyledSelect from './StyledSelect';
import StyledAutocomplete from './StyledAutocomplete';
import StyledDatePicker from './StyledDatePicker';
import StyledIOSSwitch from './StyledIOSSwitch';

function validateName(value?: string) {
  if (!value) {
    return reqdMsg('your full name');
  }
  if (value.length < 4) {
    return minCharMsg(4);
  }
  return undefined;
}

function validateHobbies(value?: string[]) {
  if (!value || !value.length) {
    return 'Select atleast one hobby.';
  }
  return undefined;
}

function validateCountries(value?: string[]) {
  if (!value || !value.length) {
    return 'Select atleast one country.';
  }
  return undefined;
}

function validateDob(value: DateTime | null) {
  return value ? undefined : reqdMsg('your date of birth');
}

function validateNotification(value?: boolean) {
  return value ? undefined : 'Please enable notifications to continue.';
}

export default function StyledReusableComponentForm() {
  const pathName = usePathname();

  const [name, setName] = useState<string>();
  const [nameError, setNameError] = useState<string>();
  const [hobbies, setHobbies] = useState<string[]>();
  const [hobbiesError, setHobbiesError] = useState<string>();
  const [countries, setCountries] = useState<string[]>();
  const [countriesError, setCountriesError] = useState<string>();
  const [dob, setDob] = useState<DateTime | null>(null);
  const [dobError, setDobError] = useState<string>();
  const [enableNotification, setEnableNotification] = useState<boolean>();
  const [notificationError, setNotificationError] = useState<string>();

  const [disableAllFields, setDisableAllFields] = useState(false);

  const formValues = {
    name,
    hobbies,
    countries,
    dob: dob?.toISODate() ?? null,
    enableNotification
  };

  const errors = {
    name: nameError,
    hobbies: hobbiesError,
    countries: countriesError,
    dob: dobError,
    enableNotification: notificationError
  };

  function resetForm() {
    setName(undefined);
    setHobbies(undefined);
    setCountries(undefined);
    setDob(null);
    setEnableNotification(undefined);
    setNameError(undefined);
    setHobbiesError(undefined);
    setCountriesError(undefined);
    setDobError(undefined);
    setNotificationError(undefined);
  }

  async function onFormSubmit() {
    const nextNameError = validateName(name);
    const nextHobbiesError = validateHobbies(hobbies);
    const nextCountriesError = validateCountries(countries);
    const nextDobError = validateDob(dob);
    const nextNotificationError = validateNotification(enableNotification);

    setNameError(nextNameError);
    setHobbiesError(nextHobbiesError);
    setCountriesError(nextCountriesError);
    setDobError(nextDobError);
    setNotificationError(nextNotificationError);

    if (
      nextNameError
      || nextHobbiesError
      || nextCountriesError
      || nextDobError
      || nextNotificationError
    ) {
      return;
    }

    await logFirebaseEvent(formSubmitEventName, { pathName });
    showToastMessage(formValues);
  }

  return (
    <FormContainer title="Styled reusable components">
      <ConfigProvider
        dateAdapter={AdapterLuxon}
      >
        <form
          onSubmit={event => {
            event.preventDefault();
            onFormSubmit();
          }}
        >
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
            <Grid size={12}>
              <FieldVariantInfo title='Custom FormLabel for all fields; custom helperText for the "name" field' />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <StyledTextField
                fieldName="name"
                value={name}
                onValueChange={({ newValue }) => {
                  setName(newValue);
                  setNameError(undefined);
                }}
                onBlur={() => {
                  setNameError(validateName(name));
                }}
                disabled={disableAllFields}
                required
                errorMessage={nameError}
                helperText={(
                  <Typography
                    variant="body2"
                    sx={{
                      alignItems: 'center',
                      display: 'flex',
                      gap: 0.5
                    }}
                  >
                    <InfoIcon color="info" />
                    The name that matches on your passport
                  </Typography>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="Customized multi MUISelect with a custom font family on the label" />
              <StyledSelect
                fieldName="hobbies"
                value={hobbies}
                options={hobbiesList}
                onValueChange={({ newValue }) => {
                  setHobbies(newValue);
                  setHobbiesError(undefined);
                }}
                required
                multiple
                disabled={disableAllFields}
                errorMessage={hobbiesError}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="Customized multi Autocomplete with styled helperText" />
              <StyledAutocomplete
                fieldName="countries"
                options={countriesList}
                labelKey="country"
                valueKey="code"
                value={countries}
                onValueChange={({ newValue }) => {
                  setCountries(newValue);
                  setCountriesError(undefined);
                }}
                disabled={disableAllFields}
                required
                errorMessage={countriesError}
                helperText="You can select multiple countries"
                textFieldProps={{
                  placeholder: 'Select the countries you\'ve travelled to'
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="Customized DatePicker with Luxon adapter" />
              <StyledDatePicker
                fieldName="dob"
                value={dob}
                onValueChange={({ newValue }) => {
                  setDob(newValue);
                  setDobError(undefined);
                }}
                label="Date of Birth"
                required
                disableFuture
                disabled={disableAllFields}
                errorMessage={dobError}
              />
            </Grid>
            <Grid size={12}>
              <FieldVariantInfo title="Styled Switch, iOS style" />
              <StyledIOSSwitch
                fieldName="enableNotification"
                value={enableNotification}
                onValueChange={({ newValue }) => {
                  setEnableNotification(newValue);
                  setNotificationError(undefined);
                }}
                label="Enable notifications?"
                disabled={disableAllFields}
                errorMessage={notificationError}
              />
            </Grid>
            <Grid size={12}>
              <SubmitButton />
              <ResetButton onClick={resetForm} />
            </Grid>
            <Grid size={12}>
              <FormState
                formValues={formValues}
                errors={errors}
              />
            </Grid>
          </GridContainer>
        </form>
      </ConfigProvider>
    </FormContainer>
  );
}
