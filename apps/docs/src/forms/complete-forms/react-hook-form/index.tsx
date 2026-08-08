'use client';

/**
 * Complete form covering every component, driven by React Hook Form
 * (`useForm` + `useWatch` + `setValue`) with Zod validation via
 * `zodResolver`. Every component here is a controlled `value`/`onValueChange`
 * component (none accept an RHF `control` prop directly), so RHF state is
 * wired in manually per field, same as the plain-state example. Includes a
 * "disable all fields" toggle, submit and reset buttons, and a live
 * form-state readout.
 *
 * NOTE: Prefer using @nish1896/rhf-mui-components package, which has been
 * built mainly for react-hook-form.
 */

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type PickerValidDate } from '@mui/x-date-pickers/models';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import Grid from '@mui/material/Grid';
import { ConfigProvider } from '@nish1896/mui-components/config';
import MUITextField from '@nish1896/mui-components/mui/textfield';
import MUIPasswordInput from '@nish1896/mui-components/mui/password-input';
import MUINumberInput from '@nish1896/mui-components/mui/number-input';
import MUITagsInput from '@nish1896/mui-components/mui/tags-input';
import MUIFileUploader from '@nish1896/mui-components/mui/file-uploader';
import MUISelect from '@nish1896/mui-components/mui/select';
import MUINativeSelect from '@nish1896/mui-components/mui/native-select';
import MUIAutocomplete from '@nish1896/mui-components/mui/autocomplete';
import MUIAutocompleteObject from '@nish1896/mui-components/mui/autocomplete-object';
import MUIMultiAutocomplete from '@nish1896/mui-components/mui/multi-autocomplete';
import MUIMultiAutocompleteObject from '@nish1896/mui-components/mui/multi-autocomplete-object';
import MUICountrySelect, {
  type CountryDetails
} from '@nish1896/mui-components/mui/country-select';
import MUICheckbox from '@nish1896/mui-components/mui/checkbox';
import MUICheckboxGroup from '@nish1896/mui-components/mui/checkbox-group';
import MUIRadioGroup from '@nish1896/mui-components/mui/radio-group';
import MUISwitch from '@nish1896/mui-components/mui/switch';
import MUISlider from '@nish1896/mui-components/mui/slider';
import MUIRating from '@nish1896/mui-components/mui/rating';
import { MUIDatePicker } from '@nish1896/mui-components/mui-pickers/date';
import { MUITimePicker } from '@nish1896/mui-components/mui-pickers/time';
import { MUIDateTimePicker } from '@nish1896/mui-components/mui-pickers/date-time';
import MUIColorPicker from '@nish1896/mui-components/misc/color-picker';
import MUIPhoneInput, {
  type MUIPhoneInputValue
} from '@nish1896/mui-components/misc/phone-input';
import MUIRichTextEditor from '@nish1896/mui-components/misc/rich-text-editor';
import {
  FormContainer,
  GridContainer,
  FieldVariantInfo,
  UploadedImage,
  FormState,
  SubmitButton,
  ResetButton
} from '@/components';
import { formSubmitEventName } from '@/constants';
import { showToastMessage, logFirebaseEvent } from '@/utils';
import {
  type CityOption,
  type CompleteFormValues,
  roleOptions,
  priorityOptions,
  frameworkOptions,
  skillOptions,
  hobbyOptions,
  contactOptions,
  cityOptions,
  preferredCountries,
  initialValues,
  toDisplayValues
} from '../data';
import { zodFormSchema } from './validation';


export default function CompleteRHFForm() {
  const pathName = usePathname();
  const [disableAllFields, setDisableAllFields] = useState(false);

  const {
    control,
    setValue,
    reset,
    formState: { errors },
    handleSubmit
  } = useForm<CompleteFormValues>({
    defaultValues: initialValues,
    resolver: zodResolver(zodFormSchema)
  });
  const formValues = useWatch({ control });

  async function onFormSubmit(values: CompleteFormValues) {
    await logFirebaseEvent(formSubmitEventName, { pathName });
    showToastMessage(toDisplayValues(values));
  }

  return (
    <FormContainer title="Complete Form - React Hook Form with Zod">
      <ConfigProvider dateAdapter={AdapterMoment} allLabelsAboveFields>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <GridContainer>
            <Grid size={12}>
              <MUICheckbox
                fieldName="disableAllFields"
                label="Disable all fields"
                value={disableAllFields}
                onValueChange={({ newValue }) => setDisableAllFields(newValue)}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="TextField" />
              <MUITextField
                fieldName="firstName"
                value={formValues.firstName}
                onValueChange={({ newValue }) => setValue('firstName', newValue, { shouldValidate: true })}
                errorMessage={errors.firstName?.message}
                required
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="PasswordInput" />
              <MUIPasswordInput
                fieldName="password"
                value={formValues.password}
                onValueChange={({ newValue }) => setValue('password', newValue, { shouldValidate: true })}
                errorMessage={errors.password?.message}
                required
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="NumberInput" />
              <MUINumberInput
                fieldName="age"
                value={formValues.age}
                onValueChange={({ newValue }) => setValue('age', newValue, { shouldValidate: true })}
                onlyIntegers
                nonNegative
                errorMessage={errors.age?.message}
                required
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="TagsInput" />
              <MUITagsInput
                fieldName="tags"
                value={formValues.tags}
                onValueChange={({ newValue }) => setValue('tags', newValue)}
                maxTags={5}
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="FileUploader" />
              <MUIFileUploader
                fieldName="avatar"
                value={formValues.avatar}
                onValueChange={({ newValue }) => setValue('avatar', newValue, { shouldValidate: true })}
                accept="image/*"
                renderFileItem={({ file, removeFile }) => (
                  <UploadedImage file={file} onRemove={removeFile} />
                )}
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="Select" />
              <MUISelect
                fieldName="role"
                options={roleOptions}
                value={formValues.role}
                onValueChange={({ newValue }) => setValue('role', newValue, { shouldValidate: true })}
                showDefaultOption
                errorMessage={errors.role?.message}
                required
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="NativeSelect" />
              <MUINativeSelect
                fieldName="priority"
                options={priorityOptions}
                value={formValues.priority}
                onValueChange={({ newValue }) => setValue('priority', newValue)}
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="Autocomplete" />
              <MUIAutocomplete
                fieldName="framework"
                options={frameworkOptions}
                value={formValues.framework}
                onValueChange={({ newValue }) => setValue('framework', newValue ?? '', { shouldValidate: true })}
                errorMessage={errors.framework?.message}
                required
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="AutocompleteObject" />
              <MUIAutocompleteObject
                fieldName="city"
                options={cityOptions}
                labelKey="name"
                valueKey="id"
                value={formValues.city as CityOption | null}
                onValueChange={({ newValue }) => setValue('city', newValue, { shouldValidate: true })}
                errorMessage={errors.city?.message}
                required
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="CountrySelect" />
              <MUICountrySelect
                fieldName="country"
                value={formValues.country as CountryDetails | null}
                onValueChange={({ newValue }) => setValue('country', newValue as CountryDetails | null, { shouldValidate: true })}
                preferredCountries={preferredCountries}
                errorMessage={errors.country?.message}
                required
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="MultiAutocomplete" />
              <MUIMultiAutocomplete
                fieldName="skills"
                options={skillOptions}
                value={formValues.skills}
                onValueChange={({ newValue }) => setValue('skills', newValue as string[])}
                limitTags={2}
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="MultiAutocompleteObject" />
              <MUIMultiAutocompleteObject
                fieldName="visitedCities"
                options={cityOptions}
                labelKey="name"
                valueKey="id"
                value={formValues.visitedCities as CityOption[]}
                onValueChange={({ newValue }) => setValue('visitedCities', newValue as CityOption[])}
                limitTags={2}
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="RadioGroup" />
              <MUIRadioGroup
                fieldName="contact"
                options={contactOptions}
                value={formValues.contact}
                onValueChange={({ newValue }) => setValue('contact', newValue, { shouldValidate: true })}
                errorMessage={errors.contact?.message}
                required
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="CheckboxGroup" />
              <MUICheckboxGroup
                fieldName="hobbies"
                options={hobbyOptions}
                value={formValues.hobbies}
                onValueChange={({ newValue }) => setValue('hobbies', newValue)}
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="Slider & Rating" />
              <MUISlider
                fieldName="volume"
                label="Volume"
                value={formValues.volume}
                onValueChange={({ newValue }) => setValue('volume', newValue)}
                valueLabelDisplay="auto"
                disabled={disableAllFields}
              />
              <MUIRating
                fieldName="rating"
                value={formValues.rating}
                onValueChange={({ newValue }) => setValue('rating', newValue, { shouldValidate: true })}
                errorMessage={errors.rating?.message}
                required
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="Checkbox & Switch" />
              <MUICheckbox
                fieldName="subscribe"
                label="Subscribe to the newsletter"
                value={formValues.subscribe}
                onValueChange={({ newValue }) => setValue('subscribe', newValue)}
                disabled={disableAllFields}
              />
              <MUISwitch
                fieldName="notifications"
                label="Enable notifications"
                value={formValues.notifications}
                onValueChange={({ newValue }) => setValue('notifications', newValue)}
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <FieldVariantInfo title="DatePicker" />
              <MUIDatePicker
                fieldName="dob"
                label="Date of birth"
                value={formValues.dob as PickerValidDate | null}
                onValueChange={({ newValue }) => setValue('dob', newValue, { shouldValidate: true })}
                disableFuture
                errorMessage={errors.dob?.message}
                required
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <FieldVariantInfo title="TimePicker" />
              <MUITimePicker
                fieldName="meetingTime"
                label="Meeting time"
                value={formValues.meetingTime as PickerValidDate | null}
                onValueChange={({ newValue }) => setValue('meetingTime', newValue)}
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <FieldVariantInfo title="DateTimePicker" />
              <MUIDateTimePicker
                fieldName="appointment"
                label="Appointment"
                value={formValues.appointment as PickerValidDate | null}
                onValueChange={({ newValue }) => setValue('appointment', newValue)}
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="ColorPicker" />
              <MUIColorPicker
                fieldName="brandColor"
                label="Brand colour"
                value={formValues.brandColor}
                onValueChange={({ colorValue, color, setColor }) => {
                  setColor(color);
                  setValue('brandColor', colorValue);
                }}
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="PhoneInput" />
              <MUIPhoneInput
                fieldName="phone"
                label="Phone"
                value={formValues.phone as MUIPhoneInputValue | null}
                onValueChange={({ newValue }) => setValue('phone', newValue, { shouldValidate: true })}
                phoneInputProps={{ defaultCountry: 'us' }}
                errorMessage={errors.phone?.message}
                required
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={12}>
              <FieldVariantInfo title="RichTextEditor" />
              <MUIRichTextEditor
                fieldName="bio"
                label="Short bio"
                value={formValues.bio}
                onValueChange={({ newValue }) => setValue('bio', newValue, { shouldValidate: true })}
                errorMessage={errors.bio?.message}
                required
              />
            </Grid>

            <Grid size={12}>
              <SubmitButton disabled={disableAllFields} />
              <ResetButton onClick={() => reset(initialValues)} disabled={disableAllFields} />
            </Grid>
            <Grid size={12}>
              <FormState
                formValues={toDisplayValues(formValues as CompleteFormValues)}
                errors={errors as Record<string, string | undefined>}
              />
            </Grid>
          </GridContainer>
        </form>
      </ConfigProvider>
    </FormContainer>
  );
}
