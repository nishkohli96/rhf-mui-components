'use client';

import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import {
  FormContainer,
  RenderFormState,
  GridContainer,
  FieldVariantInfo,
  SubmitButton
} from '@/components';
import {
  RHFColorPicker,
  RHFRichTextEditor
} from '@nish1896/rhf-mui-components';

type FormSchema = {
  rte: string;
  color: string;
};

export function MiscellaneousComponentsForm() {
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    getValues,
    formState: { errors }
  } = useForm<FormSchema>({
    defaultValues: {
      color: '#007ABA'
    }
  });

  function onFormSubmit(formValues) {
    alert(`Form Submitted with values: \n\n ${JSON.stringify(formValues)}`);
  }

  return (
    <FormContainer title="Miscellaneous Components - RichTextEditor & ColorPicker">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <GridContainer>
          <Grid item xs={12} md={6}>
            <FieldVariantInfo title="CK5Editor" />
            <RHFRichTextEditor
              fieldName='rte'
              value={getValues('rte')}
              setValue={setValue}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <RHFColorPicker
              fieldName='color'
              value={getValues('color') ?? ''}
              onValueChange={(newColor) => setValue('color', newColor.hex)}
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
