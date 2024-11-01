'use client';

import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {
  FormContainer,
  RenderFormState,
  GridContainer,
  FieldVariantInfo,
  SubmitButton
} from '@/components';
import RHFColorPicker from '@nish1896/rhf-mui-components/misc/color-picker';
import RHFPhoneInput from '@nish1896/rhf-mui-components/misc/phone-input';
import RHFRichTextEditor from '@nish1896/rhf-mui-components/misc/rich-text-editor';

type FormSchema = {
  bio: string;
  contactNo: string;
  favouriteColor: string;
};

export default function MiscellaneousComponentsForm() {
  const {
    setValue,
    handleSubmit,
    watch,
    getValues,
    formState: { errors }
  } = useForm<FormSchema>({
    defaultValues: {
      favouriteColor: 'hsl(201 100% 73% / 1)'
    }
  });

  function onFormSubmit(formValues: FormSchema) {
    alert(`Form Submitted with values: \n\n ${JSON.stringify(formValues)}`);
  }

  return (
    <FormContainer title="Miscellaneous Components - RichTextEditor & ColorPicker">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <GridContainer>
          <Grid item xs={12} md={6}>
            <FieldVariantInfo title="CK5 Rich Text Editor" />
            <RHFRichTextEditor
              fieldName="bio"
              label={(
                <Typography color="#ea3677">
                  Briefly describe yourself
                </Typography>
              )}
              value={getValues('bio')}
              setValue={setValue}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FieldVariantInfo title="React Palette Color Picker" />
            <RHFColorPicker
              fieldName="color"
              value={getValues('favouriteColor') ?? ''}
              onValueChange={newColor => {
                console.log('newColor: ', newColor);
                setValue('favouriteColor', newColor.hex);
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FieldVariantInfo title="Phone Input" />
            <RHFPhoneInput
              value={getValues('contactNo') ?? ''}
              onChange={newPhone => {
                setValue('contactNo', newPhone);
              }}
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
