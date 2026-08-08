'use client';

/**
 * MUIRadioGroup example — plain React `useState`. Shows string options, object
 * options with `labelKey` / `valueKey` + `getOptionDisabled`, pass-through
 * `radioProps`, a custom `renderOptionLabel`, label placement above the group,
 * and required validation via `errorMessage`.
 */

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import { pink } from '@mui/material/colors';
import MUIRadioGroup from '@nish1896/mui-components/mui/radio-group';
import { toast } from 'react-toastify';
import {
  FormContainer,
  GridContainer,
  FieldVariantInfo,
  FormState,
  SubmitButton,
  ResetButton
} from '@/components';
import { formSubmitEventName } from '@/constants';
import { Gender } from '@/types';
import { showToastMessage, logFirebaseEvent } from '@/utils';

const planOptions = ['Free', 'Pro', 'Enterprise'];

const contactOptions = ['Email', 'Phone', 'SMS'];

type BillingOption = { id: string; title: string; disabled?: boolean };

const billingOptions: BillingOption[] = [
  { id: 'monthly', title: 'Monthly' },
  { id: 'yearly', title: 'Yearly (2 months free)' },
  { id: 'lifetime', title: 'Lifetime (coming soon)', disabled: true }
];

const ageGroupOptions = [
  { range: '1-10', maxAge: 10 },
  { range: '11-20', maxAge: 20 },
  { range: '21-30', maxAge: 30 },
  { range: '31-40', maxAge: 40 },
  { range: '41-50', maxAge: 50 },
  { range: '51-60', maxAge: 60 },
  { range: '61+', maxAge: 120 },
];

const initialValues = {
  plan: 'Free' as string | null,
  billing: 'monthly' as string | null,
  contact: null as string | null
};

export default function RadioGroupForm() {
  const pathName = usePathname();

  const [plan, setPlan] = useState(initialValues.plan);
  const [billing, setBilling] = useState(initialValues.billing);
  const [contact, setContact] = useState(initialValues.contact);
  const [contactError, setContactError] = useState<string>();
  const [ageGroup, setAgeGroup] = useState<number>();
  const [ageGroupError, setAgeGroupError] = useState<string>();
  const [gender, setGender] = useState<Gender>();
  const [genderError, setGenderError] = useState<string>();
  const [disableAllFields, setDisableAllFields] = useState(false);

  const formValues = { plan, billing, contact, ageGroup, gender };
  const errors = {
    contact: contactError,
    ageGroup: ageGroupError,
    gender: genderError,
  };

  function resetForm() {
    setPlan(initialValues.plan);
    setBilling(initialValues.billing);
    setContact(initialValues.contact);
    setContactError(undefined);
    setAgeGroupError(undefined);
    setGenderError(undefined);
  }

  async function onFormSubmit() {
    const contactError = !contact
      ? 'Select a preferred contact method'
      : undefined;
    const genderError = !gender
      ? 'Select your gender'
      : undefined;
    setContactError(contactError);
    setGenderError(genderError);
    if (contactError || genderError) {
      return;
    }
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
            <FieldVariantInfo title="String options with helper text" />
            <MUIRadioGroup
              fieldName="plan"
              options={planOptions}
              value={plan}
              onValueChange={({ newValue }) => setPlan(newValue)}
              helperText="Pick the plan that fits your team"
              disabled={disableAllFields}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Object options, disabled item & radio colour" />
            <MUIRadioGroup
              fieldName="billing"
              label="Billing cycle"
              options={billingOptions}
              labelKey="title"
              valueKey="id"
              value={billing}
              onValueChange={({ newValue }) => setBilling(newValue)}
              getOptionDisabled={option => Boolean(option.disabled)}
              radioProps={{ color: 'secondary' }}
              disabled={disableAllFields}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Required, custom option render & label above" />
            <MUIRadioGroup
              fieldName="contact"
              label="Preferred contact"
              options={contactOptions}
              value={contact}
              onValueChange={({ newValue }) => {
                setContact(newValue);
                setContactError(undefined);
              }}
              renderOptionLabel={(option, { disabled, selected }) => (
                <Typography
                  component="span"
                  sx={{
                    fontWeight: selected ? 700 : 500,
                    /* eslint-disable-next-line no-nested-ternary */
                    color: disabled
                      ? 'text.disabled'
                      : selected
                        ? 'primary.main'
                        : 'text.primary'
                  }}
                >
                  {`${option} me`}
                </Typography>
              )}
              showLabelAboveFormField
              required
              errorMessage={contactError}
              disabled={disableAllFields}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Radio Group with options as an array of objects" />
            <MUIRadioGroup
              fieldName="ageGroup"
              options={ageGroupOptions}
              value={ageGroup}
              onValueChange={({ newValue }) => {
                if(ageGroupError) {
                  setAgeGroupError(undefined);
                }
                setAgeGroup(newValue);
              }}
              labelKey="range"
              valueKey="maxAge"
              radioProps={{
                sx: {
                  color: pink[800],
                  '&.Mui-checked': {
                    color: pink[600],
                  }
                }
              }}
              required
              disabled={disableAllFields}
              getOptionDisabled={opn => opn.maxAge === 120 || opn.maxAge === 10}
            />
          </Grid>

          <Grid>
            <FieldVariantInfo title="Radio Group with renderOptionLabel" />
            <MUIRadioGroup
              fieldName="gender"
              options={Object.values(Gender)}
              row
              value={gender}
              onValueChange={({ newValue }) => {
                setGender(newValue);
                if(genderError) {
                  setGenderError(undefined);
                }
                toast.info(`You selected: ${newValue}`);
              }}
              renderOptionLabel={option => {
                switch (option) {
                  case Gender.Male:
                    return (
                      <span style={{ color: '#1976d2' }}>
                        Male ♂
                      </span>
                    );
                  case Gender.Female:
                    return (
                      <span style={{ color: '#d81b60' }}>
                        Female ♀
                      </span>
                    );
                  case Gender.Others:
                    return (
                      <span style={{ color: '#7b1fa2' }}>
                        Others ⚧
                      </span>
                    );
                  default:
                    return option;
                }
              }}
              disabled={disableAllFields}
              required
              errorMessage={genderError}
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
