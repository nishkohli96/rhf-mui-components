'use client';

/**
 * MUISwitch example — driven by plain React `useState` (no form library) to
 * show the component's basic contract plus its extra props: custom `label`,
 * `formControlLabelProps`, pass-through MUI `SwitchProps` (color/size),
 * `helperText`, `errorMessage` + `renderError`, and `customIds`.
 */

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';
import MUISwitch from '@nish1896/mui-components/mui/switch';
import {
  FormContainer,
  GridContainer,
  FieldVariantInfo,
  FormState,
  SubmitButton,
  ResetButton
} from '@/components';
import { formSubmitEventName } from '@/constants';
import { useThemeContext } from '@/theme';
import { showToastMessage, logFirebaseEvent } from '@/utils';
import ThemeSwitch from './ThemeSwitch';

const initialValues = {
  notifications: true,
  acceptTerms: false
};

export default function SwitchForm() {
  const pathName = usePathname();
  const { currentTheme } = useThemeContext();

  const [notifications, setNotifications] = useState(initialValues.notifications);
  const [acceptTerms, setAcceptTerms] = useState(initialValues.acceptTerms);
  const [acceptTermsError, setAcceptTermsError] = useState<string>();
  const [disableAllFields, setDisableAllFields] = useState(false);

  /* `ThemeSwitch` owns the toggle via the theme context; derive it for display. */
  const darkMode = currentTheme === 'dark';
  const formValues = { notifications, darkMode, acceptTerms };
  const errors = { acceptTerms: acceptTermsError };

  function resetForm() {
    setNotifications(initialValues.notifications);
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
            <FieldVariantInfo title="Basic switch with a helper text" />
            <MUISwitch
              fieldName="notifications"
              value={notifications}
              onValueChange={({ newValue }) => setNotifications(newValue)}
              helperText="Receive product and security emails"
              disabled={disableAllFields}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Theme toggle styled with MUI's MaterialUISwitch design" />
            <ThemeSwitch disabled={disableAllFields} />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Required toggle with custom error render & ids" />
            <MUISwitch
              fieldName="acceptTerms"
              label="I accept the terms and conditions"
              value={acceptTerms}
              onValueChange={({ newValue }) => {
                setAcceptTerms(newValue);
                setAcceptTermsError(undefined);
              }}
              errorMessage={acceptTermsError}
              renderError={errors => (
                <Box sx={{ alignItems: 'center', display: 'flex', gap: 0.5 }}>
                  <ErrorOutlinedIcon color="error" fontSize="small" />
                  <Typography component="span" variant="body2">
                    {errors[0]}
                  </Typography>
                </Box>
              )}
              customIds={{
                field: 'acceptTerms',
                error: 'acceptTerms-error'
              }}
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
