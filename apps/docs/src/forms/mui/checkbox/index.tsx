'use client';

/**
 * MUICheckbox example — plain React `useState`. Shows the boolean contract
 * plus custom `label`, pass-through MUI `CheckboxProps` (color/size),
 * `helperText`, and a required checkbox with a custom `renderError`.
 */

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';
import MUICheckbox from '@nish1896/mui-components/mui/checkbox';
import {
  FormContainer,
  GridContainer,
  FieldVariantInfo,
  FormState,
  SubmitButton,
  ResetButton
} from '@/components';
import { formSubmitEventName } from '@/constants';
import { showToastMessage, logFirebaseEvent } from '@/utils';

const initialValues = {
  newsletter: true,
  marketing: false,
  acceptTerms: false
};

export default function CheckboxForm() {
  const pathName = usePathname();

  const [newsletter, setNewsletter] = useState(initialValues.newsletter);
  const [marketing, setMarketing] = useState(initialValues.marketing);
  const [acceptTerms, setAcceptTerms] = useState(initialValues.acceptTerms);
  const [acceptTermsError, setAcceptTermsError] = useState<string>();
  const [disableAllFields, setDisableAllFields] = useState(false);

  const formValues = { newsletter, marketing, acceptTerms };
  const errors = { acceptTerms: acceptTermsError };

  function resetForm() {
    setNewsletter(initialValues.newsletter);
    setMarketing(initialValues.marketing);
    setAcceptTerms(initialValues.acceptTerms);
    setAcceptTermsError(undefined);
  }

  async function onFormSubmit() {
    if (!acceptTerms) {
      setAcceptTermsError('You must accept the terms to continue');
      return;
    }
    setAcceptTermsError(undefined);
    await logFirebaseEvent(formSubmitEventName, { pathName });
    showToastMessage(formValues);
  }

  return (
    <FormContainer>
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
                  onChange={event => setDisableAllFields(event.target.checked)}
                />
              )}
              label="Disable all fields"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Basic checkbox with helper text" />
            <MUICheckbox
              fieldName="newsletter"
              value={newsletter}
              onValueChange={({ newValue }) => setNewsletter(newValue)}
              helperText="Get our monthly product newsletter"
              disabled={disableAllFields}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Custom label, colour & size (CheckboxProps)" />
            <MUICheckbox
              fieldName="marketing"
              label="Send me marketing emails"
              value={marketing}
              onValueChange={({ newValue }) => setMarketing(newValue)}
              color="secondary"
              size="medium"
              disabled={disableAllFields}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Required checkbox with custom error render" />
            <MUICheckbox
              fieldName="acceptTerms"
              label="I accept the terms and conditions"
              value={acceptTerms}
              onValueChange={({ newValue }) => {
                setAcceptTerms(newValue);
                setAcceptTermsError(undefined);
              }}
              errorMessage={acceptTermsError}
              renderError={errorList => (
                <Box sx={{ alignItems: 'center', display: 'flex', gap: 0.5 }}>
                  <ErrorOutlinedIcon color="error" fontSize="small" />
                  <Typography component="span" variant="body2">
                    {errorList[0]}
                  </Typography>
                </Box>
              )}
              customIds={{ field: 'accept-terms', error: 'accept-terms-error' }}
              disabled={disableAllFields}
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
    </FormContainer>
  );
}
