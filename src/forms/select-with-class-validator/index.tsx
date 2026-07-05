'use client';

import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
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
  SubmitButton,
  ResetButton
} from '@/components';
import { IPLTeams, Currencies } from '@/constants';
import { Colors } from '@/types';
import { showToastMessage } from '@/utils';

const randomNumbers = [23, 56, 67, 32, 68, 54, 90];

const getLanguagesList = (count: number) => {
  const languages = new Set<string>();
  while (languages.size < count) {
    languages.add(faker.location.language().name);
  }
  return Array.from(languages);
};

const initialValues = { favouriteColor: Colors.Orange };

const SelectFormWithClassValidator = () => {
  const [disableAllFields, setDisableAllFields] = useState(false);
  const languagesList = useMemo(() => getLanguagesList(10), []);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm<FormSchema>({
    defaultValues: initialValues,
    resolver: classValidatorResolver(FormSchema)
  });

  function onFormSubmit(formValues: FormSchema) {
    showToastMessage(formValues);
  }

  return (
    <FormContainer title="Select Component with Class-Validator">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <GridContainer>
          <Grid size={12}>
            <FormControlLabel
              control={(
                <Checkbox
                  checked={disableAllFields}
                  onChange={event => {
                    setDisableAllFields(event.target.checked);
                  }}
                />
              )}
              label="Disable all fields"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Single select field with helpertext" />
            <RHFSelect
              fieldName="favouriteColor"
              control={control}
              options={Object.values(Colors)}
              {...(watch('favouriteColor') && {
                helperText: (
                  <Typography color={watch('favouriteColor')}>
                    {`Select an option to change selected text color from ${watch('favouriteColor')}`}
                  </Typography>
                )
              })}
              errorMessage={errors?.favouriteColor?.message}
              disabled={disableAllFields}
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
              disabled={disableAllFields}
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
                <div style={{ color: '#007aba' }}>
                  Select your favourite IPL teams
                </div>
              }
              required
              multiple
              disabled={disableAllFields}
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
              showLabelAboveFormField
              disabled={disableAllFields}
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
              disabled={disableAllFields}
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
              disabled={disableAllFields}
              errorMessage={errors?.ageGroup?.message}
            />
          </Grid>
          <Grid size={12}>
            <SubmitButton />
            <ResetButton onClick={() => reset(initialValues)} />
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
