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
  groceryList: string;
  color: string;
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
      groceryList: '<p><strong>Shopping List</strong></p><ol><li>Milk</li><li>Biscuits</li></ol>',
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
              fieldName="groceryList"
              value={getValues('groceryList')}
              setValue={setValue}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <RHFColorPicker
              fieldName="color"
              label="Choose color"
              value={getValues('color')}
              onValueChange={color => setValue('color', color.hex)}
              helperText={
                <Typography color={getValues('color')}>
                  Your selected color is applied on this helperText.
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
