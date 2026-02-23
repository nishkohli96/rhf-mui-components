'use client';

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { faker } from '@faker-js/faker';
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
import { IPLTeams, Currencies, formSubmitEventName } from '@/constants';
import { Colors } from '@/types';
import { logFirebaseEvent, showToastMessage } from '@/utils';

const randomNumbers = [23, 56, 67, 32, 68, 54, 90];

const getLanguagesList = (count: number) => {
  const languages = new Set<string>();
  while (languages.size < count) {
    languages.add(faker.location.language().name);
  }
  return Array.from(languages);
};

const SelectFormWithClassValidator = () => {
  const pathName = usePathname();
  const languagesList = useMemo(() => getLanguagesList(10), []);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormSchema>({
    defaultValues: { favouriteColor: Colors.Orange },
    resolver: classValidatorResolver(FormSchema)
  });

  async function onFormSubmit(formValues: FormSchema) {
    await logFirebaseEvent(formSubmitEventName, { pathName });
    showToastMessage(formValues);
  }

  return (
    <FormContainer title="Select Component with Class-Validator">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <GridContainer>
          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Single select field with helpertext" />
            <RHFSelect
              fieldName="favouriteColor"
              control={control}
              options={Object.values(Colors)}
              errorMessage={errors?.favouriteColor?.message}
              {...(watch('favouriteColor') && {
                helperText: (
                  <Typography color={watch('favouriteColor')}>
                    {`Select an option to change selected text color from ${watch('favouriteColor')}`}
                  </Typography>
                )
              })}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Single select with multiple options as an array of strings" />
            <RHFSelect
              fieldName="languages"
              control={control}
              options={languagesList}
              errorMessage={errors?.languages?.message}
              multiple
              required
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Multiple Select with options as an array of objects" />
            <RHFSelect
              fieldName="iplTeams"
              control={control}
              options={IPLTeams}
              labelKey="name"
              valueKey="abbr"
              showLabelAboveFormField
              placeholder="Choose IPL teams"
              showDefaultOption
              defaultOptionText="Select IPL teams"
              label={
                <Typography variant="body1" color="success">
                  Select your favourite IPL teams
                </Typography>
              }
              required
              multiple
              errorMessage={errors?.iplTeams?.message}
              helperText="Select one or more teams"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Select with number options" />
            <RHFSelect
              fieldName="randomNum"
              control={control}
              options={randomNumbers}
              errorMessage={errors?.randomNum?.message}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
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
          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Native select with number options" />
            <RHFNativeSelect
              fieldName="ageGroup"
              control={control}
              options={[10, 20, 30, 40, 50]}
              label="Choose an age group"
              placeholder="Select age group"
              required
              errorMessage={errors?.ageGroup?.message}
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

export default SelectFormWithClassValidator;
