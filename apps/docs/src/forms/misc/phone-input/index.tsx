'use client';

/**
 * MUIPhoneInput example — integrated with Formik. `onValueChange` always emits
 * the structured `MUIPhoneInputValue` ({ phone, country, dialCode, phoneNo }).
 * Shows a default country + validation on `phoneNo`, and a second field with
 * `preferredCountries`, `forceDialCode`, a hidden country search and a label
 * above the field.
 */

import { useState } from 'react';
import { useFormik } from 'formik';
import { usePathname } from 'next/navigation';
import { type CountryIso2 } from 'react-international-phone';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import MUIPhoneInput, {
  type MUIPhoneInputValue
} from '@nish1896/mui-components/misc/phone-input';
import {
  FormContainer,
  GridContainer,
  FieldVariantInfo,
  FormState,
  SubmitButton,
  ResetButton
} from '@/components';
import { formSubmitEventName } from '@/constants';
import { showToastMessage, logFirebaseEvent, formikError } from '@/utils';
import CountryMenuItem from './CountryMenuItem';

const preferredCountries: CountryIso2[] = ['in', 'us', 'uk', 'au'];

type PhoneFormValues = {
  contactNumber: MUIPhoneInputValue | null;
  alternateNumber: MUIPhoneInputValue | null;
  workNumber: MUIPhoneInputValue | null;
};

const initialValues: PhoneFormValues = {
  contactNumber: null,
  alternateNumber: null,
  workNumber: null
};

export default function PhoneInputForm() {
  const pathName = usePathname();
  const [disableAllFields, setDisableAllFields] = useState(false);

  const formik = useFormik<PhoneFormValues>({
    initialValues,
    validate: values => {
      const errors: Partial<Record<keyof PhoneFormValues, string>> = {};
      const phoneNo = values.contactNumber?.phoneNo;
      if (!phoneNo) {
        errors.contactNumber = 'Enter your phone number';
      } else if (phoneNo.length < 6) {
        errors.contactNumber = 'Phone number looks too short';
      }
      return errors;
    },
    onSubmit: async values => {
      await logFirebaseEvent(formSubmitEventName, { pathName });
      showToastMessage(values);
    }
  });

  return (
    <FormContainer title="MUIPhoneInput">
      <form onSubmit={formik.handleSubmit}>
        <GridContainer>
          <Grid size={12}>
            <FormControlLabel
              control={(
                <Checkbox
                  checked={disableAllFields}
                  onChange={event => setDisableAllFields(event.target.checked)}
                />
              )}
              label="Disable all fields"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Default country (US) with helpertext and validation" />
            <MUIPhoneInput
              fieldName="contactNumber"
              value={formik.values.contactNumber}
              onValueChange={({ newValue }) => formik.setFieldValue('contactNumber', newValue)}
              phoneInputProps={{ defaultCountry: 'us' }}
              disabled={disableAllFields}
              required
              errorMessage={formikError(formik.submitCount > 0 && formik.errors.contactNumber)}
              helperText="Include your area code"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Preferred countries and searchCountryProps" />
            <MUIPhoneInput
              fieldName="alternateNumber"
              value={formik.values.alternateNumber}
              onValueChange={({ newValue }) => {
                formik.setFieldValue('alternateNumber', newValue);
              }}
              showLabelAboveFormField
              formLabelProps={{
                sx: { color: theme => theme.palette.warning.main }
              }}
              phoneInputProps={{
                defaultCountry: 'in',
                preferredCountries
              }}
              searchCountryProps={{
                textFieldProps: {
                  variant: 'filled',
                  sx: {
                    '& .MuiInputBase-input': {
                      color: theme => theme.palette.primary.main
                    }
                  }
                },
                renderCountryMenuItem: country => (
                  <CountryMenuItem country={country} />
                )
              }}
              disabled={disableAllFields}
              errorMessage={formikError(formik.submitCount > 0 && formik.errors.contactNumber)}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Forced dial code, no search" />
            <MUIPhoneInput
              fieldName="workNumber"
              label="Work number"
              value={formik.values.workNumber}
              onValueChange={({ newValue }) => formik.setFieldValue('workNumber', newValue)}
              phoneInputProps={{
                defaultCountry: 'gb',
                forceDialCode: true
              }}
              searchCountryProps={{ allowCountrySearch: false }}
              showLabelAboveFormField
              variant="standard"
              disabled={disableAllFields}
              helperText="Dial code can't be edited by hand"
            />
          </Grid>

          <Grid size={12}>
            <SubmitButton />
            <ResetButton onClick={() => formik.resetForm()} />
          </Grid>
          <Grid size={12}>
            <FormState
              formValues={formik.values}
              errors={{
                contactNumber: formik.submitCount > 0 && typeof formik.errors.contactNumber === 'string'
                  ? formik.errors.contactNumber
                  : undefined
              }}
            />
          </Grid>
        </GridContainer>
      </form>
    </FormContainer>
  );
}
