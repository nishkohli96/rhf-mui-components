'use client';

import { useForm } from 'react-hook-form';
import { superstructResolver } from '@hookform/resolvers/superstruct';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import RHFRating from '@nish1896/rhf-mui-components/mui/rating';
import RHFSlider from '@nish1896/rhf-mui-components/mui/slider';
import RHFSwitch from '@nish1896/rhf-mui-components/mui/switch';
import { FormSchema, formSchema } from './validation';
import {
  FormContainer,
  RenderFormState,
  GridContainer,
  FieldVariantInfo,
  SubmitButton
} from '@/components';
import { orange } from '@mui/material/colors';

const orangeTheme = createTheme({
  palette: {
    primary: {
      main: orange[500]
    }
  }
});

const SwitchSliderRatingFormWithSuperstruct = () => {
  const initialValues = {
    score: 20,
  };
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormSchema>({
    defaultValues: initialValues,
    resolver: superstructResolver(formSchema)
  });

  function onFormSubmit(formValues: FormSchema) {
    alert(`Form Submitted with values: \n\n ${JSON.stringify(formValues)}`);
  }

  return (
    <FormContainer title="Switch, Slider & Rating with Superstruct validation">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <GridContainer>
          <Grid item xs={12} md={6}>
            <FieldVariantInfo title="Slider with label, custom range and marks" />
            <RHFSlider
              fieldName="score"
              register={register}
              defaultValue={initialValues.score}
              min={0}
              max={50}
              marks={[
                { value: 0, label: '0' },
                { value: 50, label: '50' }
              ]}
              step={5}
              label="What is your score in class 10?"
              showLabelAboveFormField
              errorMessage={errors?.score?.message}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FieldVariantInfo title="Rating with custom maxValue" />
            <RHFRating
              fieldName="rating"
              control={control}
              label="How much would you rate us out of 8 stars?"
              max={8}
              showLabelAboveFormField
              errorMessage={errors?.rating?.message}
              helperText="Please select atleast 5"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FieldVariantInfo title="Switch with onValueChange and theme override" />
            <ThemeProvider theme={orangeTheme}>
              <RHFSwitch
                fieldName="turnOnWifi"
                control={control}
              />
            </ThemeProvider>
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
};

export default SwitchSliderRatingFormWithSuperstruct;
