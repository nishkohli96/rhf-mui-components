import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {
  RHFRichTextEditor,
  RHFColorPicker,
} from '@nish1896/rhf-mui-components';
import {
  FormContainer,
  RenderFormState,
  GridContainer,
  FieldVariantInfo,
  SubmitButton
} from '@site/src/components';

type FormSchema = {
  rte: string | null;
  color: string | null;
};

export function MiscellaneousComponentsForm() {
  const {
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
              fieldName='rte'
              setValue={setValue}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <RHFColorPicker
              fieldName='color'
              label='Choose color'
              defaultValue={getValues('color')}
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
