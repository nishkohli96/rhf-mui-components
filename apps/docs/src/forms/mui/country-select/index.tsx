'use client';

/**
 * MUICountrySelect example — plain React `useState`. A country picker built on
 * MUI Autocomplete. Shows a single select with `preferredCountries` and a
 * custom `renderOptionLabel` (flag + name), and a multi-select with
 * `limitTags` and `ChipProps`. Stores the whole `CountryDetails` object(s).
 */

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import MUICountrySelect, {
  type CountryDetails,
  type CountryISO
} from '@nish1896/mui-components/mui/country-select';
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

const preferred: CountryISO[] = ['US', 'GB', 'IN', 'DE'];

export default function CountrySelectForm() {
  const pathName = usePathname();

  const [nationality, setNationality] = useState<CountryDetails | null>(null);
  const [countryError, setCountryError] = useState<string>();
  const [countriesVisited, setCountriesVisited] = useState<string[]>([]);
  const [disableAllFields, setDisableAllFields] = useState(false);

  const formValues = {
    nationality,
    countriesVisited
  };
  const errors = { nationality: countryError };

  function resetForm() {
    setNationality(null);
    setCountryError(undefined);
    setCountriesVisited([]);
  }

  async function onFormSubmit() {
    if (!nationality) {
      setCountryError('Select your country');
      return;
    }
    setCountryError(undefined);
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
            <FieldVariantInfo title="Single select with preferred countries & flags" />
            <MUICountrySelect
              fieldName="nationality"
              value={nationality}
              onValueChange={({ newValue }) => {
                setNationality(newValue);
                setCountryError(undefined);
              }}
              preferredCountries={preferred}
              renderOptionLabel={option => `${option.emoji} ${option.name}`}
              required
              errorMessage={countryError}
              helperText="Common countries appear at the top"
              disabled={disableAllFields}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Multi-select with valueKey, limitTags & chip props" />
            <MUICountrySelect
              fieldName="countriesVisited"
              label="Countries that you have visited"
              multiple
              value={countriesVisited}
              valueKey="name"
              onValueChange={({ newValue }) => setCountriesVisited(newValue)}
              limitTags={2}
              ChipProps={{ color: 'info', size: 'small' }}
              helperText="Select all that apply"
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
