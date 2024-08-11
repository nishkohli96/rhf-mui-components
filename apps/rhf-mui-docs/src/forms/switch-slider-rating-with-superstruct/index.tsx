import { useForm } from 'react-hook-form';
import { superstructResolver } from '@hookform/resolvers/superstruct';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { RHFRating, RHFSlider, RHFSwitch } from '@nish1896/rhf-mui-components';
import { formSchema } from './validation';
import {
  FormContainer,
  RenderFormState,
  GridContainer,
  FieldVariantInfo,
  SubmitButton
} from '@site/src/components';
import { orange } from '@mui/material/colors';

const orangeTheme = createTheme({
  palette: {
    primary: {
      main: orange[500]
    }
  }
});

export function SwitchSliderRatingFormWithSuperstruct() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    resolver: superstructResolver(formSchema)
  });
  console.log('watch: ', watch());
  console.log('errors: ', errors);

  function onFormSubmit(formValues) {
    console.log('formValues: ', formValues);
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
              defaultValue={20}
              min={0}
              max={75}
              marks={[
                { value: 0, label: '0' },
                { value: 75, label: '75' }
              ]}
              step={5}
              label="What is your score in class 10?"
              showLabelAboveFormField
              errorMsg={errors?.score?.message}
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
              errorMsg={errors?.rating?.message}
              helperText="Please select atleast 5"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FieldVariantInfo title="Switch with onValueChange and theme override" />
            <ThemeProvider theme={orangeTheme}>
              <RHFSwitch
                fieldName="darkTheme"
                control={control}
                label="Enable Dark Theme ?"
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
}
