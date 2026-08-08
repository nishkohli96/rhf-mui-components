'use client';

/**
 * MUIAutocompleteObject example — plain React `useState`. Unlike
 * `MUIAutocomplete`, this stores the whole selected option object(s). Shows a
 * single select with `labelKey` / `valueKey` and a multi-select with
 * `limitTags` and `ChipProps`.
 */

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import MUIAutocompleteObject from '@nish1896/mui-components/mui/autocomplete-object';
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

type CityOption = { id: string; name: string; country: string };

const cities: CityOption[] = [
  { id: 'LDN', name: 'London', country: 'UK' },
  { id: 'NYC', name: 'New York', country: 'USA' },
  { id: 'TOK', name: 'Tokyo', country: 'Japan' },
  { id: 'BER', name: 'Berlin', country: 'Germany' },
  { id: 'SYD', name: 'Sydney', country: 'Australia' }
];

export default function AutocompleteObjectForm() {
  const pathName = usePathname();

  const [homeCity, setHomeCity] = useState<CityOption | null>(cities[0]);
  const [visited, setVisited] = useState<CityOption[]>([cities[1]]);
  const [homeCityError, setHomeCityError] = useState<string>();
  const [disableAllFields, setDisableAllFields] = useState(false);

  const formValues = { homeCity, visited };
  const errors = { homeCity: homeCityError };

  function resetForm() {
    setHomeCity(cities[0]);
    setVisited([cities[1]]);
    setHomeCityError(undefined);
  }

  async function onFormSubmit() {
    if (!homeCity) {
      setHomeCityError('Select your home city');
      return;
    }
    setHomeCityError(undefined);
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
            <FieldVariantInfo title="Single select — stores the whole option object" />
            <MUIAutocompleteObject
              fieldName="homeCity"
              options={cities}
              labelKey="name"
              valueKey="id"
              value={homeCity}
              onValueChange={({ newValue }) => {
                setHomeCity(newValue);
                setHomeCityError(undefined);
              }}
              required
              errorMessage={homeCityError}
              disabled={disableAllFields}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Multi-select with limitTags, getLimitTagsText & chip props" />
            <MUIAutocompleteObject
              fieldName="visited"
              options={cities}
              labelKey="name"
              valueKey="id"
              multiple
              value={visited}
              onValueChange={({ newValue }) => setVisited(newValue)}
              limitTags={1}
              getLimitTagsText={more => `+${more} ${more > 1 ? 'Cities' : 'City'}`}
              ChipProps={{ color: 'success', size: 'small' }}
              helperText="Cities you have visited"
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
