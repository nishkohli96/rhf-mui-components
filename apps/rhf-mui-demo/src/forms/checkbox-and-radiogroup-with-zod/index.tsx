'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Grid from '@mui/material/Grid';
import RHFCheckbox from '@nish1896/rhf-mui-components/mui/checkbox';
import RHFCheckboxGroup from '@nish1896/rhf-mui-components/mui/checkbox-group';
import RHFRadioGroup from '@nish1896/rhf-mui-components/mui/radio-group';
import {
  FormContainer,
  FormState,
  GridContainer,
  FieldVariantInfo,
  SubmitButton
} from '@/components';
import { CountriesList } from '@/constants';
import { Gender } from '@/types';
import { formSchema, PersonInfo } from './validation';

const CheckboxRadioZodForm = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<PersonInfo>({
    resolver: zodResolver(formSchema)
  });

  function onFormSubmit(formValues: PersonInfo) {
    alert(`Form Submitted with values: \n\n ${JSON.stringify(formValues)}`);
  }

  return (
    <FormContainer title="Checkbox & Radio Group">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <GridContainer>
          <Grid item xs={12} md={6}>
            <FieldVariantInfo title="Radio Group with onValueChange function" />
            <RHFRadioGroup
              fieldName="gender"
              control={control}
              options={Object.values(Gender)}
              onValueChange={newVal => alert(`You selected ${newVal}`)}
              required
              errorMessage={errors?.gender?.message}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FieldVariantInfo title="CheckboxGroup with options as an array of objects" />
            <RHFCheckboxGroup
              fieldName="countriesVisited"
              label="Select the countries have you visited"
              control={control}
              options={CountriesList}
              labelKey="country"
              valueKey="code"
              required
              errorMessage={errors?.countriesVisited?.message}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FieldVariantInfo title="Single Checkbox" />
            <RHFCheckbox
              fieldName="agreeTnC"
              control={control}
              label="Agree to Terms & Conditions"
              errorMessage={errors?.agreeTnC?.message}
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

export default CheckboxRadioZodForm;
