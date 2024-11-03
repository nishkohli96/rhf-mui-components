'use client';

import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { defaultCountries, parseCountry, CountryIso2 } from 'react-international-phone';
import RHFColorPicker from '@nish1896/rhf-mui-components/misc/color-picker';
import RHFCountrySelect from '@nish1896/rhf-mui-components/misc/country-select';
import RHFPhoneInput from '@nish1896/rhf-mui-components/misc/phone-input';
import RHFRichTextEditor from '@nish1896/rhf-mui-components/misc/rich-text-editor';
import {
  FormContainer,
  RenderFormState,
  GridContainer,
  FieldVariantInfo,
  SubmitButton
} from '@/components';

type FormSchema = {
  bio: string;
  contactNumber: string;
  favouriteColor: string;
  countries: string[];
};

export default function MiscellaneousComponentsForm() {
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    getValues,
    formState: { errors }
  } = useForm<FormSchema>({
    defaultValues: {
      favouriteColor: 'hsl(201 100% 73% / 1)',
      contactNumber: '+1 (765) 232-3423'
    }
  });

  const countyCodes: CountryIso2[] = ['in', 'us', 'au', 'fi', 'ua', 'cn', 'gb', 'vn'];
  const countries = defaultCountries.filter((country) => {
    const { iso2 } = parseCountry(country);
    return countyCodes.includes(iso2);
  });

  function onFormSubmit(formValues: FormSchema) {
    alert(`Form Submitted with values: \n\n ${JSON.stringify(formValues)}`);
  }

  return (
    <FormContainer title="Miscellaneous Components">
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
              fieldName='contactNumber'
              value={getValues('contactNumber')}
              setValue={setValue}
              showLabelAboveFormField
              variant='standard'
              phoneInputProps={{
                defaultCountry: countyCodes[0],
                //countries,
                preferredCountries: countyCodes.slice(0,3)
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FieldVariantInfo title="Country Select" />
            <RHFCountrySelect
              fieldName='countries'
              register={register}
              showLabelAboveFormField
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
