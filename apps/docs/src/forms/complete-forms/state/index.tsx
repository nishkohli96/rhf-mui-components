'use client';

/**
 * Complete form covering every component, driven by plain React `useState`
 * (one `values` object + one `errors` object) with manual validation. Includes
 * a "disable all fields" toggle, submit and reset buttons, and a live
 * form-state readout.
 */

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
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
import MUICountrySelect from '@nish1896/mui-components/mui/country-select';
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
import MUIPhoneInput from '@nish1896/mui-components/misc/phone-input';
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
  type CompleteFormValues,
  type CompleteFormErrors,
  roleOptions,
  priorityOptions,
  frameworkOptions,
  skillOptions,
  hobbyOptions,
  contactOptions,
  cityOptions,
  preferredCountries,
  initialValues,
  validateCompleteForm,
  toDisplayValues
} from '../data';

export default function CompleteStateForm() {
  const pathName = usePathname();
  const [values, setValues] = useState<CompleteFormValues>(initialValues);
  const [errors, setErrors] = useState<CompleteFormErrors>({});
  const [disableAllFields, setDisableAllFields] = useState(false);

  function setField<K extends keyof CompleteFormValues>(name: K, value: CompleteFormValues[K]) {
    setValues(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  }

  function resetForm() {
    setValues(initialValues);
    setErrors({});
  }

  async function onFormSubmit() {
    const nextErrors = validateCompleteForm(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }
    await logFirebaseEvent(formSubmitEventName, { pathName });
    showToastMessage(toDisplayValues(values));
  }

  return (
    <FormContainer title="Complete Form — React state">
      <ConfigProvider dateAdapter={AdapterDateFns} allLabelsAboveFields>
        <form
          onSubmit={event => {
            event.preventDefault();
            onFormSubmit();
          }}
        >
          <GridContainer>
            <Grid size={12}>
              <FormControlLabel
                control={(
                  <Checkbox
                    checked={disableAllFields}
                    onChange={event => setDisableAllFields(event.target.checked)}
                  />
                )}
                label="Disable all fields"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="TextField" />
              <MUITextField
                fieldName="firstName"
                value={values.firstName}
                onValueChange={({ newValue }) => setField('firstName', newValue)}
                errorMessage={errors.firstName}
                required
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="PasswordInput" />
              <MUIPasswordInput
                fieldName="password"
                value={values.password}
                onValueChange={({ newValue }) => setField('password', newValue)}
                errorMessage={errors.password}
                required
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="NumberInput" />
              <MUINumberInput
                fieldName="age"
                value={values.age}
                onValueChange={({ newValue }) => setField('age', newValue)}
                onlyIntegers
                nonNegative
                errorMessage={errors.age}
                required
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="TagsInput" />
              <MUITagsInput
                fieldName="tags"
                value={values.tags}
                onValueChange={({ newValue }) => setField('tags', newValue)}
                maxTags={5}
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="FileUploader" />
              <MUIFileUploader
                fieldName="avatar"
                value={values.avatar}
                onValueChange={({ newValue }) => setField('avatar', newValue)}
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
                value={values.role}
                onValueChange={({ newValue }) => setField('role', newValue)}
                showDefaultOption
                errorMessage={errors.role}
                required
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="NativeSelect" />
              <MUINativeSelect
                fieldName="priority"
                options={priorityOptions}
                value={values.priority}
                onValueChange={({ newValue }) => setField('priority', newValue )}
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="Autocomplete" />
              <MUIAutocomplete
                fieldName="framework"
                options={frameworkOptions}
                value={values.framework}
                onValueChange={({ newValue }) => setField('framework', newValue ?? '')}
                errorMessage={errors.framework}
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
                value={values.city}
                onValueChange={({ newValue }) => setField('city', newValue)}
                errorMessage={errors.city}
                required
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="CountrySelect" />
              <MUICountrySelect
                fieldName="country"
                value={values.country}
                onValueChange={({ newValue }) => setField('country', newValue)}
                preferredCountries={preferredCountries}
                errorMessage={errors.country}
                required
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="MultiAutocomplete" />
              <MUIMultiAutocomplete
                fieldName="skills"
                options={skillOptions}
                value={values.skills}
                onValueChange={({ newValue }) => setField('skills', newValue)}
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
                value={values.visitedCities}
                onValueChange={({ newValue }) => setField('visitedCities', newValue)}
                limitTags={2}
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="RadioGroup" />
              <MUIRadioGroup
                fieldName="contact"
                options={contactOptions}
                value={values.contact}
                onValueChange={({ newValue }) => setField('contact', newValue)}
                errorMessage={errors.contact}
                required
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="CheckboxGroup" />
              <MUICheckboxGroup
                fieldName="hobbies"
                options={hobbyOptions}
                value={values.hobbies}
                onValueChange={({ newValue }) => setField('hobbies', newValue)}
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="Slider & Rating" />
              <MUISlider
                fieldName="volume"
                label="Volume"
                value={values.volume}
                onValueChange={({ newValue }) => setField('volume', newValue)}
                valueLabelDisplay="auto"
                disabled={disableAllFields}
              />
              <MUIRating
                fieldName="rating"
                value={values.rating}
                onValueChange={({ newValue }) => setField('rating', newValue)}
                errorMessage={errors.rating}
                required
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="Checkbox & Switch" />
              <MUICheckbox
                fieldName="subscribe"
                label="Subscribe to the newsletter"
                value={values.subscribe}
                onValueChange={({ newValue }) => setField('subscribe', newValue)}
                disabled={disableAllFields}
              />
              <MUISwitch
                fieldName="notifications"
                label="Enable notifications"
                value={values.notifications}
                onValueChange={({ newValue }) => setField('notifications', newValue)}
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <FieldVariantInfo title="DatePicker" />
              <MUIDatePicker
                fieldName="dob"
                label="Date of birth"
                value={values.dob}
                onValueChange={({ newValue }) => setField('dob', newValue)}
                disableFuture
                errorMessage={errors.dob}
                required
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <FieldVariantInfo title="TimePicker" />
              <MUITimePicker
                fieldName="meetingTime"
                label="Meeting time"
                value={values.meetingTime}
                onValueChange={({ newValue }) => setField('meetingTime', newValue )}
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <FieldVariantInfo title="DateTimePicker" />
              <MUIDateTimePicker
                fieldName="appointment"
                label="Appointment"
                value={values.appointment}
                onValueChange={({ newValue }) => setField('appointment', newValue)}
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="ColorPicker" />
              <MUIColorPicker
                fieldName="brandColor"
                label="Brand colour"
                value={values.brandColor}
                onValueChange={({ colorValue, color, setColor }) => {
                  setColor(color);
                  setField('brandColor', colorValue);
                }}
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="PhoneInput" />
              <MUIPhoneInput
                fieldName="phone"
                label="Phone"
                value={values.phone}
                onValueChange={({ newValue }) => setField('phone', newValue)}
                phoneInputProps={{ defaultCountry: 'us' }}
                errorMessage={errors.phone}
                required
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={12}>
              <FieldVariantInfo title="RichTextEditor" />
              <MUIRichTextEditor
                fieldName="bio"
                label="Short bio"
                value={values.bio}
                onValueChange={({ newValue }) => setField('bio', newValue)}
                errorMessage={errors.bio}
                required
              />
            </Grid>

            <Grid size={12}>
              <SubmitButton disabled={disableAllFields} />
              <ResetButton onClick={resetForm} disabled={disableAllFields} />
            </Grid>
            <Grid size={12}>
              <FormState
                formValues={toDisplayValues(values)}
                errors={errors}
              />
            </Grid>
          </GridContainer>
        </form>
      </ConfigProvider>
    </FormContainer>
  );
}
