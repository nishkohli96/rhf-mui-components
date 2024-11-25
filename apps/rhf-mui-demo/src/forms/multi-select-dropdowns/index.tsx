'use client';

import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import RHFCountrySelect, { countryList, CountryISO } from '@nish1896/rhf-mui-components/mui/country-select';
import RHFMultiSelectDropdown from '@nish1896/rhf-mui-components/mui/multi-select-dropdown';
import {
  FormContainer,
  FormState,
  GridContainer,
  FieldVariantInfo,
  SubmitButton
} from '@/components';
import { Colors } from '@/types';

type FormSchema = {
  nationality?: string;
  countriesVisited: string[];
  dreamDestinations?: string[];
  randomNums?: number[];
  colors?: string[];
}

const MultiSelectDropdownForm = () => {
  const initialValues: FormSchema = {
    countriesVisited: ['AU', 'SG']
  };

  const preferredCountries: CountryISO[] = ['IN', 'AU', 'JP'];
  const randomNumbers = [23, 65, 78, 53, 67, 90, 88];
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormSchema>({
    defaultValues: initialValues
  });

  const filteredCountries = countryList.filter(country => country.name.length > 5);

  function onFormSubmit(formValues) {
    alert(`Form Submitted with values: \n\n ${JSON.stringify(formValues)}`);
  }

  return (
    <FormContainer title="Country Select Component with Register Options">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <GridContainer>
          <Grid item xs={12} md={6}>
            <FieldVariantInfo title="Required field with customized textfield" />
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
              errorMessage={errors?.nationality?.message}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FieldVariantInfo title="Multiple Selection with default values & Preferred Countries" />
            <RHFCountrySelect
              fieldName="countriesVisited"
              control={control}
              preferredCountries={preferredCountries}
              multiple
              errorMessage={errors?.countriesVisited?.message}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FieldVariantInfo title="Multiple Selection with minLength validation, valueKey, filtered Options and ChipProps" />
            <RHFCountrySelect
              fieldName="dreamDestinations"
              control={control}
              registerOptions={{
                required: {
                  value: true,
                  message: 'This field is required'
                },
                validate: {
                  minItems: value =>
                    value && value.length >= 3 ? true : 'Select at least 3 countries',
                },
              }}
              valueKey="name"
              preferredCountries={['IN', 'AU', 'JP']}
              countries={filteredCountries}
              multiple
              showLabelAboveFormField
              label="What are your Dream Destinations?"
              ChipProps={{ sx: { background: theme => theme.palette.primary.main } }}
              helperText={
                <Typography color="slateblue">
                  Select atleast 3 countries
                </Typography>
              }
              errorMessage={errors?.dreamDestinations?.message}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FieldVariantInfo title="Multi Select Dropdown with number options" />
            <RHFMultiSelectDropdown
              fieldName="randomNums"
              control={control}
              options={randomNumbers}
              registerOptions={{
                required: {
                  value: true,
                  message: 'This field is required'
                },
                validate: {
                  minItems: value =>
                    value && value.length >= 2 ? true : 'Select at least 2 numbers',
                },
              }}
              errorMessage={errors?.randomNums?.message}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FieldVariantInfo title="Multi Select Dropdown" />
            <RHFMultiSelectDropdown
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
                  minItems: (value?: string[])  =>
                    value && value.length >= 3 ? true : 'Select at least 3 colors',
                },
              }}
              errorMessage={errors?.colors?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <SubmitButton />
          </Grid>
          <Grid item xs={12}>
            <FormState formValues={watch()} errors={errors} />
          </Grid>
        </GridContainer>
      </form>
    </FormContainer>
  );
};

export default MultiSelectDropdownForm;
