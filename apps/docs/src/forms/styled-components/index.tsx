'use client';

/**
 * Reusable styled-component form driven by React Hook Form. Every field is one
 * of the local `Styled*` wrappers (a preset, restyled `RHF*` component), with
 * validation supplied via `registerOptions` and errors/disabled state driven
 * entirely by RHF's own field state.
 */

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { type DateTime } from 'luxon';
import { useForm, useWatch } from 'react-hook-form';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import InfoIcon from '@mui/icons-material/Info';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { ConfigProvider } from '@nish1896/rhf-mui-components/config';
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

type FormSchema = {
  name: string;
  hobbies: string[];
  countries: string[];
  dob: DateTime | null;
  enableNotification: boolean;
};

const initialValues: FormSchema = {
  name: '',
  hobbies: [],
  countries: [],
  dob: null,
  enableNotification: false
};

export default function StyledComponentsForm() {
  const pathName = usePathname();

  const [disableAllFields, setDisableAllFields] = useState(false);

  const {
    control,
    reset,
    formState: { errors },
    handleSubmit
  } = useForm<FormSchema>({
    defaultValues: initialValues,
    disabled: disableAllFields
  });
  const formValues = useWatch({ control });

  async function onFormSubmit(values: FormSchema) {
    await logFirebaseEvent(formSubmitEventName, { pathName });
    showToastMessage(values);
  }

  return (
    <FormContainer title="Styled reusable components">
      <ConfigProvider
        dateAdapter={AdapterLuxon}
      >
        <form onSubmit={handleSubmit(onFormSubmit)}>
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
                control={control}
                registerOptions={{
                  required: reqdMsg('your full name'),
                  minLength: { value: 4, message: minCharMsg(4) }
                }}
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
                control={control}
                options={hobbiesList}
                registerOptions={{
                  validate: value =>
                    (Array.isArray(value) && value.length > 0)
                    || 'Select atleast one hobby.'
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="Customized multi Autocomplete with styled helperText" />
              <StyledAutocomplete
                fieldName="countries"
                control={control}
                options={countriesList}
                labelKey="country"
                valueKey="code"
                registerOptions={{
                  validate: value =>
                    (Array.isArray(value) && value.length > 0)
                    || 'Select atleast one country.'
                }}
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
                control={control}
                registerOptions={{ required: reqdMsg('your date of birth') }}
                label="Date of Birth"
                disableFuture
              />
            </Grid>
            <Grid size={12}>
              <FieldVariantInfo title="Styled Switch, iOS style" />
              <StyledIOSSwitch
                fieldName="enableNotification"
                control={control}
                registerOptions={{
                  validate: value =>
                    value === true
                    || 'Please enable notifications to continue.'
                }}
                label="Enable notifications?"
              />
            </Grid>
            <Grid size={12}>
              <SubmitButton disabled={disableAllFields} />
              <ResetButton onClick={() => reset(initialValues)} />
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
