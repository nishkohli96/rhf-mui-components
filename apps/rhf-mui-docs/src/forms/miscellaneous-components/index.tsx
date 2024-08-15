import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import { RHFColorPicker } from '@nish1896/rhf-mui-components';
import Typography from '@mui/material/Typography';
import {
  FormContainer,
  RenderFormState,
  GridContainer,
  // RHFColorPicker,
  RHFRichTextEditor,
  FieldVariantInfo,
  SubmitButton
} from '@site/src/components';

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
    alert(`Form Submitted with values: \n\n ${JSON.stringify(formValues)}`);
  }

  return (
    <FormContainer title="Miscellaneous Components - RichTextEditor & ColorPicker">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <GridContainer>
          <Grid item xs={12}>
            <FieldVariantInfo title="CK5Editor" />
            <RHFRichTextEditor
              value={getValues('rte')}
              onChange={(newValue) => setValue('rte', newValue)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <RHFColorPicker
              formLabel="Pick a Color"
              defaultColor={getValues('color')}
              onValueChange={(newColor) => setValue('color', newColor.hex)}
              helperText={
                <Typography color={getValues('color')}>
                  This helperText keeps changing its color.
                </Typography>
              }
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
