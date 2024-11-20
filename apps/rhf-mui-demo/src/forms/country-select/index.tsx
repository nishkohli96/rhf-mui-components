'use client';

import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import RHFCountrySelect from '@nish1896/rhf-mui-components/mui/country-select';
import {
  FormContainer,
  FormState,
  GridContainer,
  FieldVariantInfo,
  SubmitButton
} from '@/components';

type FormSchema = {
  nationality: string;
  dreamDestination?: string;
  countriesVisited: string[];
}

const CountrySelectForm = () => {
  const intialValues: FormSchema = {
    nationality: 'IN',
    countriesVisited: ['BR']
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

  function onFormSubmit(formValues) {
    alert(`Form Submitted with values: \n\n ${JSON.stringify(formValues)}`);
  }

  return (
    <FormContainer title="Country Select Component with Register Options">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <GridContainer>
          <Grid item xs={12} md={6}>
            <FieldVariantInfo title="Country Select" />
            <RHFCountrySelect
              fieldName="nationality"
              control={control}
              // defaultValue={["IN", "BR"]}
              // defaultValue={"IN"}
              // setValue={setValue}
              // showLabelAboveFormField
              // multiple
              // textFieldProps={{ variant: 'standard' }}
              // preferredCountries={['IN', 'AU', 'JP']}
              // onValueChange={(e, newValue) => {
              //   console.log('newValue: ', newValue);
              // }}
              errorMessage={errors?.nationality?.message}
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
