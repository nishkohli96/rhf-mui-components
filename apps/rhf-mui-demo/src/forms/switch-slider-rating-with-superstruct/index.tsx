'use client';

import { usePathname } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { superstructResolver } from '@hookform/resolvers/superstruct';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { orange } from '@mui/material/colors';
import RHFRating from '@nish1896/rhf-mui-components/mui/rating';
import RHFSlider from '@nish1896/rhf-mui-components/mui/slider';
import RHFSwitch from '@nish1896/rhf-mui-components/mui/switch';
import { type FormSchema, formSchema } from './validation';
import {
  FormContainer,
  FormState,
  GridContainer,
  FieldVariantInfo,
  SubmitButton
} from '@/components';
import { formSubmitEventName } from '@/constants';
import { showToastMessage, logFirebaseEvent } from '@/utils';

const orangeTheme = createTheme({
  palette: {
    primary: {
      main: orange[500]
    }
  }
});

const sliderMinimumValue = 30;
const minRating = 5;
const maxRating = 8;

const SwitchSliderRatingFormWithSuperstruct = () => {
  const pathName = usePathname();
  const initialValues = {
    score: sliderMinimumValue,
  };
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormSchema>({
    defaultValues: initialValues,
    resolver: superstructResolver(formSchema)
  });

  async function onFormSubmit(formValues: FormSchema) {
    await logFirebaseEvent(formSubmitEventName, { pathName });
    showToastMessage(formValues);
  }

  return (
    <FormContainer title="Switch, Slider & Rating with Superstruct validation">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <GridContainer>
          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Slider with label, custom range and marks" />
            <RHFSlider
              fieldName="score"
              control={control}
              min={0}
              max={50}
              marks={[
                { value: 0, label: '0' },
                { value: 50, label: '50' }
              ]}
              step={5}
              customOnChange={(rhfOnChange, value) => {
                if(value as number < sliderMinimumValue) {
                  return;
                }
                rhfOnChange(value);
              }}
              label="What is your score in class 10?"
              required
              helperText={`customOnChange handler will prevent you from sliding below ${sliderMinimumValue}`}
              errorMessage={errors?.score?.message}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Rating with custom maxValue & customOnChange" />
            <RHFRating
              fieldName="rating"
              control={control}
              label={`How much would you rate us out of ${maxRating} stars?`}
              max={maxRating}
              showLabelAboveFormField
              errorMessage={errors?.rating?.message}
              required
              helperText={`Please select atleast ${minRating}`}
              customOnChange={(rhfOnChange, value) => {
                if(value && value < minRating) {
                  return;
                }
                rhfOnChange(value);
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Switch with onValueChange and theme override" />
            <ThemeProvider theme={orangeTheme}>
              <RHFSwitch
                fieldName="turnOnWifi"
                control={control}
              />
            </ThemeProvider>
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

export default SwitchSliderRatingFormWithSuperstruct;
