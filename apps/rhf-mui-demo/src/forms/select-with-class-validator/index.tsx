'use client';

import { useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import RHFSelect from '@nish1896/rhf-mui-components/mui/select';
import RHFNativeSelect from '@nish1896/rhf-mui-components/mui/native-select';
import { FormSchema } from './validation';
import {
  FormContainer,
  FormState,
  GridContainer,
  FieldVariantInfo,
  SubmitButton
} from '@/components';
import { IPLTeams, Currencies } from '@/constants';
import { Colors } from '@/types';

const SelectFormWithClassValidator = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormSchema>({
    defaultValues: { favouriteColor: Colors.Orange },
    resolver: classValidatorResolver(FormSchema)
  });

  function onFormSubmit(formValues: FormSchema) {
    alert(`Form Submitted with values: \n\n ${JSON.stringify(formValues)}`);
  }

  return (
    <FormContainer title="Select Component with Class-Validator">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <GridContainer>
          <Grid item xs={12} md={6}>
            <FieldVariantInfo title="Single select field with helpertext" />
            <RHFSelect
              fieldName="favouriteColor"
              control={control}
              options={Object.values(Colors)}
              errorMessage={errors?.favouriteColor?.message}
              helperText={
                watch('favouriteColor') ? (
                  <Typography color={watch('favouriteColor')}>
                    {`Select an option to change selected text color from ${watch('favouriteColor')}`}
                  </Typography>
                ) : undefined
              }
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FieldVariantInfo title="Multiple Select with options as an array of objects" />
            <RHFSelect
              fieldName="iplTeams"
              control={control}
              options={IPLTeams}
              labelKey="name"
              valueKey="abbr"
              showLabelAboveFormField
              showDefaultOption
              required
              multiple
              errorMessage={errors?.iplTeams?.message}
              helperText="Select one or more teams"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FieldVariantInfo title="Native select" />
            <RHFNativeSelect
              fieldName="currency"
              control={control}
              options={Currencies}
              labelKey="name"
              valueKey="code"
              label="Choose a currency"
              required
              errorMessage={errors?.currency?.message}
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

export default SelectFormWithClassValidator;
