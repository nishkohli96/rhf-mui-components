'use client';

import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import RHFCountrySelect, { countryList } from '@nish1896/rhf-mui-components/mui/country-select';
import {
  FormContainer,
  FormState,
  GridContainer,
  FieldVariantInfo,
  SubmitButton
} from '@/components';

type FormSchema = {
  nationality?: string;
  countriesVisited: string[];
  dreamDestinations?: string[];
}

const CountrySelectForm = () => {
  const intialValues: FormSchema = {
    countriesVisited: ['AU', 'SG']
  };

  const {
    register,
    control,
    setValue,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormSchema>({
    defaultValues: intialValues
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
              textFieldProps={{ variant: 'standard' }}
              showLabelAboveFormField
              errorMessage={errors?.nationality?.message}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FieldVariantInfo title="Multiple Selection with default values & Preferred Countries" />
            <RHFCountrySelect
              fieldName="countriesVisited"
              control={control}
              preferredCountries={['IN', 'AU', 'JP']}
              multiple
              errorMessage={errors?.countriesVisited?.message}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FieldVariantInfo title="Multiple Selection with minLength validation, valueKey filtered Options" />
            <RHFCountrySelect
              fieldName="dreamDestinations"
              control={control}
              registerOptions={{
                required: {
                  value: true,
                  message: 'Select atleast 1 country'
                },
                validate: {
                  minItems: (value) =>
                    value && value.length >= 3 ? true : 'Select at least 3 countries',
                },
              }}
              valueKey='name'
              preferredCountries={['IN', 'AU', 'JP']}
              countries={filteredCountries}
              multiple
              errorMessage={errors?.dreamDestinations?.message}
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

export default CountrySelectForm;
