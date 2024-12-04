'use client';

import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { defaultCountries, parseCountry, CountryIso2 } from 'react-international-phone';
import RHFColorPicker from '@nish1896/rhf-mui-components/misc/color-picker';
import RHFPhoneInput from '@nish1896/rhf-mui-components/misc/phone-input';
import RHFRichTextEditor from '@nish1896/rhf-mui-components/misc/rich-text-editor';
import {
  FormContainer,
  FormState,
  GridContainer,
  FieldVariantInfo,
  SubmitButton
} from '@/components';

type FormSchema = {
  bio: string;
  contactNumber: string;
  contactNumber2?: string;
  favouriteColor: string;
  countries: string;
};

const MiscellaneousComponentsForm = () => {
  const initialValues = {
    favouriteColor: 'hsl(201 100% 73% / 1)',
    contactNumber: '+1 (765) 232-3423',
    countries: 'Angola'
  };

  const {
    control,
    setValue,
    handleSubmit,
    watch,
    getValues,
    formState: { errors }
  } = useForm<FormSchema>({
    defaultValues: initialValues
  });

  const countyCodes: CountryIso2[] = ['in', 'us', 'au', 'fi', 'ua', 'cn', 'gb', 'vn'];
  const countries = defaultCountries.filter(country => {
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
          <Grid item xs={12}>
            <FieldVariantInfo title="CK5 Rich Text Editor" />
            <RHFRichTextEditor
              fieldName="bio"
              control={control}
              label={(
                <Typography color="#ea3677">
                  Briefly describe yourself
                </Typography>
              )}
              required
              errorMessage={errors?.bio?.message}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FieldVariantInfo title="React Palette Color Picker" />
            <RHFColorPicker
              fieldName="favouriteColor"
              value={getValues('favouriteColor')}
              onValueChange={newColor => {
                console.log('newColor: ', newColor);
                setValue('favouriteColor', newColor.hex);
              }}
              required
              errorMessage={errors?.favouriteColor?.message}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FieldVariantInfo title="Phone Input" />
            <RHFPhoneInput
              fieldName="contactNumber"
              control={control}
              value={getValues('contactNumber')}
              errorMessage={errors?.contactNumber?.message}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FieldVariantInfo title="Phone Input from a set of countries, with a few preferred countries at the top" />
            <RHFPhoneInput
              fieldName="contactNumber2"
              control={control}
              value={getValues('contactNumber2')}
              showLabelAboveFormField
              variant="standard"
              phoneInputProps={{
                countries,
                defaultCountry: countyCodes[0],
                preferredCountries: countyCodes.slice(0, 3)
              }}
              registerOptions={{
                required: {
                  value: true,
                  message: 'Please enter your phone number'
                },
                minLength: {
                  value: 6,
                  message: 'Minimum 6 characters required'
                }
              }}
              required
              errorMessage={errors?.contactNumber2?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <SubmitButton />
          </Grid>
          <Grid item xs={12}>
            <FormState formValues={watch()} errors={errors} />
          </Grid>
        </GridContainer>
      </form>
    </FormContainer>
  );
};

export default MiscellaneousComponentsForm;
