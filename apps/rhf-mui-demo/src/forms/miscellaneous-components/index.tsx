'use client';

import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import {
  FormContainer,
  RenderFormState,
  GridContainer,
  RHFColorPicker,
  RHFRichTextEditor,
  FieldVariantInfo,
  SubmitButton
} from '@/components';

type FormSchema = {
  rte: string | null;
  color: string | null;
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
      rte: null,
      color: '#007ABA'
    }
  });

  function onFormSubmit(formValues) {
    console.log('formValues: ', formValues);
  }

  return (
    <FormContainer title="Miscellaneous Components - RichTextEditor & ColorPicker">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <GridContainer>
          {/* <Grid item xs={12} md={6}>
            <FieldVariantInfo title="CK5Editor" />
            <RHFRichTextEditor
              value={getValues('rte')}
              onChange={(newValue) => setValue('rte', newValue)}
            />
          </Grid> */}
          <Grid item xs={12} md={6}>
            <RHFColorPicker
              selectedColor={getValues('color') ?? ''}
              onUpdateColor={(newColor) => setValue('color', newColor)}
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
