import { useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { RHFSelect, RHFNativeSelect } from '@nish1896/rhf-mui-components';
// import { FormSchema } from './validation';
import {
  FormContainer,
  RenderFormState,
  GridContainer,
  FieldVariantInfo,
  SubmitButton
} from '@site/src/components';
import { IPLTeams, Currencies } from '@site/src/constants';
import { Colors } from '@site/src/types';

export function SelectFormWithClassValidator() {
  const defaultValues = {
    favouriteColor: Colors.Orange
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues
    // resolver: classValidatorResolver(FormSchema)
  });

  function onFormSubmit(formValues) {
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
              defaultValue={defaultValues.favouriteColor}
              register={register}
              options={Object.values(Colors)}
              errorMsg={errors?.favouriteColor?.message}
              helperText={
                Boolean(watch('favouriteColor')) ? (
                  <Typography color={watch('favouriteColor')}>
                    {`This text is in ${watch('favouriteColor')} color`}
                  </Typography>
                ) : undefined
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FieldVariantInfo title="Multiple Select with options as an array of objects" />
            <RHFSelect
              fieldName="iplTeams"
              register={register}
              options={IPLTeams}
              labelKey="name"
              valueKey="abbr"
              showLabelAboveFormField
              showDefaultOption
              multiple
              errorMsg={errors?.iplTeams?.message}
              helperText="Choose teams which have won atleast once"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FieldVariantInfo title="Native select" />
            <RHFNativeSelect
              fieldName="currency"
              register={register}
              options={Currencies}
              labelKey="name"
              valueKey="code"
              label="Choose a currency"
              errorMsg={errors?.currency?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <SubmitButton />
          </Grid>
          <Grid item xs={12}>
            <RenderFormState formValues={watch()} errors={errors} />
          </Grid>
        </GridContainer>
      </form>
    </FormContainer>
  );
}
