import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { RHFCheckbox, RHFCheckboxGroup, RHFRadioGroup } from '@nish1896/rhf-mui-components';
import { formSchema, PersonInfo } from './validation';
import {
  FormContainer,
  RenderFormState,
  GridContainer,
  FieldVariantInfo,
  SubmitButton
} from '@site/src/components';
import { IPLTeams, CountriesList } from '@site/src/constants';
import { Gender } from '@site/src/types';

export function CheckboxRadioZodForm() {
  const {
    register,
		control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(formSchema)
  });
  console.log('watch: ', watch());
  console.log('errors: ', errors);

  function onFormSubmit(formValues: PersonInfo) {
    console.log('formValues: ', formValues);
  }

  return (
    <FormContainer title="Radio & Checkbox Group">
      <form>
        <GridContainer>
          <Grid item xs={12} md={6}>
            <FieldVariantInfo title="Radio Group with onValueChange function" />
            <RHFRadioGroup
              fieldName="gender"
              control={control}
              options={Object.values(Gender)}
							onValueChange={(e, newVal) => alert(`You selected ${newVal}`)}
              errorMsg={errors?.gender?.message}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FieldVariantInfo title="CheckboxGroup with options as an array of objects" />
            <RHFCheckboxGroup
              fieldName="countriesVisited"
              control={control}
              options={CountriesList}
              labelKey="country"
              valueKey="code"
              showLabelAboveFormField
              errorMsg={errors?.countriesVisited?.message}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FieldVariantInfo title="Single Checkbox" />
            <RHFCheckbox
              fieldName="agreeTnC"
              control={control}
							label="Agree to Terms & Conditions"
              errorMsg={errors?.agreeTnC?.message}
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
      <p>hello</p>
    </FormContainer>
  );
}
