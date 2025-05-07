'use client';

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { faker } from '@faker-js/faker';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import RHFCountrySelect, { countryList, type CountryISO } from '@nish1896/rhf-mui-components/mui/country-select';
import RHFAutocomplete from '@nish1896/rhf-mui-components/mui/autocomplete';
import RHFMultiAutocomplete from '@nish1896/rhf-mui-components/mui/multi-autocomplete';
import {
  FormContainer,
  FormState,
  GridContainer,
  FieldVariantInfo,
  SubmitButton
} from '@/components';
import { Colors } from '@/types';
import { IPLTeams, formSubmitEventName } from '@/constants';
import { showToastMessage, logFirebaseEvent } from '@/utils';

type AirportInfo = {
  iataCode: string;
  name: string;
};

type FormSchema = {
  sourceAirport?: string;
  destinationAirports?: string[];
  nationality?: string;
  countriesVisited: string[];
  dreamDestinations?: string[];
  colors?: Colors[];
  iplTeams?: string[];
};

const generateAirportNames = (count: number) => {
  const fullNames = new Set<AirportInfo>();
  while (fullNames.size < count) {
    fullNames.add(faker.airline.airport());
  }
  return Array.from(fullNames);
};

const AutocompleteForm = () => {
  const airportList = useMemo(() => generateAirportNames(100), []);
  const pathName = usePathname();

  const initialValues: FormSchema = {
    countriesVisited: ['AU', 'SG'],
    sourceAirport: airportList[2].iataCode,
    iplTeams: ['MI', 'CSK']
  };

  const preferredCountries: CountryISO[] = ['IN', 'AU', 'JP'];
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormSchema>({
    defaultValues: initialValues
  });

  const filteredCountries = countryList.filter(country => country.name.length > 5);

  async function onFormSubmit(formValues: FormSchema) {
    await logFirebaseEvent(formSubmitEventName, { pathName });
    showToastMessage(formValues);
  }

  return (
    <FormContainer title="Autocomplete variations with Register Options">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <GridContainer>
          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Autocomplete" />
            <RHFAutocomplete
              fieldName="sourceAirport"
              control={control}
              registerOptions={{
                required: {
                  value: true,
                  message: 'This field is required'
                }
              }}
              options={airportList}
              labelKey="name"
              valueKey="iataCode"
              required
              errorMessage={errors?.sourceAirport?.message}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Autocomplete accepting multiple options and customized chip" />
            <RHFAutocomplete
              fieldName="destinationAirports"
              control={control}
              registerOptions={{
                required: {
                  value: true,
                  message: 'This field is required'
                }
              }}
              options={airportList}
              labelKey="name"
              valueKey="iataCode"
              multiple
              showLabelAboveFormField
              textFieldProps={{ variant: 'standard' }}
              errorMessage={errors?.destinationAirports?.message}
              ChipProps={{
                sx: {
                  bgcolor: '#ea3677',
                  fontWeight: 800,
                  color: 'white'
                }
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Multi Autocomplete With String Options" />
            <RHFMultiAutocomplete
              fieldName="colors"
              control={control}
              options={Object.values(Colors)}
              label="Which colors do you like ?"
              registerOptions={{
                required: {
                  value: true,
                  message: 'This field is required'
                },
                validate: {
                  minItems: value => {
                    if (Array.isArray(value)) {
                      return value.length >= 2
                        ? true
                        : 'Select at least 2 colors';
                    }
                    return 'Invalid input';
                  }
                }
              }}
              getLimitTagsText={more => `+${more} Color(s)`}
              helperText="Select at least 2 colors"
              formControlLabelProps={{ sx: { color: 'royalblue' } }}
              errorMessage={errors?.colors?.message}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Multi Autocomplete With Object Array Options and customized checkbox and formLabel" />
            <RHFMultiAutocomplete
              fieldName="iplTeams"
              control={control}
              options={IPLTeams}
              labelKey="name"
              valueKey="abbr"
              label="Which Teams have won trophy in IPL ?"
              showLabelAboveFormField
              registerOptions={{
                required: {
                  value: true,
                  message: 'This field is required'
                },
                validate: {
                  minItems: value => {
                    if (Array.isArray(value)) {
                      return value.length >= 2
                        ? true
                        : 'Select at least 2 teams';
                    }
                    return 'Invalid input';
                  }
                }
              }}
              formControlLabelProps={{ sx: { color: 'royalblue' } }}
              checkboxProps={{ color: 'secondary' }}
              ChipProps={{
                sx: {
                  bgcolor: '#006699',
                  color: theme => theme.palette.secondary.main
                }
              }}
              required
              errorMessage={errors?.iplTeams?.message}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="CountrySelect with customized textfield" />
            <RHFCountrySelect
              fieldName="nationality"
              control={control}
              registerOptions={{
                required: {
                  value: true,
                  message: 'Choose the country of your nationality'
                }
              }}
              textFieldProps={{ variant: 'filled' }}
              required
              errorMessage={errors?.nationality?.message}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="CountrySelect - Multiple selection with default values & preferredCountries" />
            <RHFCountrySelect
              fieldName="countriesVisited"
              control={control}
              preferredCountries={preferredCountries}
              multiple
              displayFlagOnSelect
              errorMessage={errors?.countriesVisited?.message}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="CountrySelect - Multiple Selection with minLength validation, valueKey, filtered Options and ChipProps" />
            <RHFCountrySelect
              fieldName="dreamDestinations"
              control={control}
              registerOptions={{
                required: {
                  value: true,
                  message: 'This field is required'
                },
                validate: {
                  minItems: value => {
                    if (
                      Array.isArray(value)
                      && value.every(item => typeof item === 'string')
                    ) {
                      return value.length >= 3 || 'Select at least 3 countries';
                    }
                    return 'Invalid input';
                  }
                }
              }}
              valueKey="name"
              preferredCountries={['IN', 'AU', 'JP']}
              countries={filteredCountries}
              multiple
              showLabelAboveFormField
              label="What are your Dream Destinations?"
              ChipProps={{
                sx: {
                  background: theme => theme.palette.primary.main
                }
              }}
              helperText={
                <Typography color="slateblue">
                  Select atleast 3 countries
                </Typography>
              }
              required
              errorMessage={errors?.dreamDestinations?.message}
            />
          </Grid>
          <Grid size={12}>
            <SubmitButton />
          </Grid>
          <Grid size={12}>
            <FormState formValues={watch()} errors={errors} />
          </Grid>
        </GridContainer>
      </form>
    </FormContainer>
  );
};

export default AutocompleteForm;
