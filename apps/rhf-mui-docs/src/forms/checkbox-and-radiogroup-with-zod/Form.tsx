import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Grid from '@mui/material/Grid';
import { RHFCheckbox, RHFCheckboxGroup, RHFRadioGroup } from '@nish1896/rhf-mui-components';
import { formSchema, PersonInfo } from './validation';
import {
  FormContainer,
  RenderFormState,
  GridContainer,
  FieldVariantInfo,
  SubmitButton
} from '@site/src/components';
import { CountriesList } from '@site/src/constants';
import { Gender } from '@site/src/types';

export default function CheckboxRadioZodForm() {
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
    <FormContainer title="Radio & Checkbox Group">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <GridContainer>
          <Grid item xs={12} md={6}>
            <FieldVariantInfo title="Radio Group with onValueChange function" />
            <RHFRadioGroup
              fieldName="gender"
              control={control}
              options={Object.values(Gender)}
              onValueChange={(_, newVal) => alert(`You selected ${newVal}`)}
              errorMessage={errors?.gender?.message}
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
              errorMessage={errors?.countriesVisited?.message}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FieldVariantInfo title="Single Checkbox" />
            <RHFCheckbox
              fieldName="agreeTnC"
              control={control}
              value="hello_world"
              label="Agree to Terms & Conditions"
              errorMessage={errors?.agreeTnC?.message}
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
