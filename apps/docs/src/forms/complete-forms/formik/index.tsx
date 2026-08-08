'use client';

/**
 * Complete form covering every component, integrated with Formik using a
 * direct `validate` function (shared with the state form). Includes a "disable
 * all fields" toggle, submit and reset buttons, and a live form-state readout.
 */

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useFormik } from 'formik';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
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
import MUICountrySelect from '@nish1896/mui-components/mui/country-select';
import MUIMultiAutocomplete from '@nish1896/mui-components/mui/multi-autocomplete';
import MUIMultiAutocompleteObject from '@nish1896/mui-components/mui/multi-autocomplete-object';
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

export default function CompleteFormikForm() {
  const pathName = usePathname();
  const [disableAllFields, setDisableAllFields] = useState(false);

  const formik = useFormik<CompleteFormValues>({
    initialValues,
    validate: validateCompleteForm,
    onSubmit: async values => {
      await logFirebaseEvent(formSubmitEventName, { pathName });
      showToastMessage(toDisplayValues(values));
    }
  });

  const showError = <K extends keyof CompleteFormValues>(name: K): string | undefined => {
    const error = formik.errors[name];
    return formik.submitCount > 0 && typeof error === 'string' ? error : undefined;
  };

  const displayErrors = formik.submitCount > 0
    ? Object.fromEntries(
      Object.entries(formik.errors).map(([key, value]) => [
        key,
        typeof value === 'string' ? value : undefined
      ])
    )
    : {};

  return (
    <FormContainer title="Complete Form — Formik">
      <ConfigProvider dateAdapter={AdapterDayjs} allLabelsAboveFields>
        <form onSubmit={formik.handleSubmit}>
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
                value={formik.values.firstName}
                onValueChange={({ newValue }) => formik.setFieldValue('firstName', newValue)}
                errorMessage={showError('firstName')}
                required
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="PasswordInput" />
              <MUIPasswordInput
                fieldName="password"
                value={formik.values.password}
                onValueChange={({ newValue }) => formik.setFieldValue('password', newValue)}
                errorMessage={showError('password')}
                required
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="NumberInput" />
              <MUINumberInput
                fieldName="age"
                value={formik.values.age}
                onValueChange={({ newValue }) => formik.setFieldValue('age', newValue)}
                onlyIntegers
                nonNegative
                errorMessage={showError('age')}
                required
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="TagsInput" />
              <MUITagsInput
                fieldName="tags"
                value={formik.values.tags}
                onValueChange={({ newValue }) => formik.setFieldValue('tags', newValue)}
                maxTags={5}
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="FileUploader" />
              <MUIFileUploader
                fieldName="avatar"
                value={formik.values.avatar}
                onValueChange={({ newValue }) => formik.setFieldValue('avatar', newValue)}
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
                value={formik.values.role}
                onValueChange={({ newValue }) => formik.setFieldValue('role', newValue)}
                showDefaultOption
                errorMessage={showError('role')}
                required
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="NativeSelect" />
              <MUINativeSelect
                fieldName="priority"
                options={priorityOptions}
                value={formik.values.priority}
                onValueChange={({ newValue }) => formik.setFieldValue('priority', newValue)}
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="Autocomplete" />
              <MUIAutocomplete
                fieldName="framework"
                options={frameworkOptions}
                value={formik.values.framework}
                onValueChange={({ newValue }) => formik.setFieldValue('framework', newValue ?? '')}
                errorMessage={showError('framework')}
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
                value={formik.values.city}
                onValueChange={({ newValue }) => formik.setFieldValue('city', newValue)}
                errorMessage={showError('city')}
                required
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="CountrySelect" />
              <MUICountrySelect
                fieldName="country"
                value={formik.values.country}
                onValueChange={({ newValue }) => formik.setFieldValue('country', newValue)}
                preferredCountries={preferredCountries}
                errorMessage={showError('country')}
                required
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="MultiAutocomplete" />
              <MUIMultiAutocomplete
                fieldName="skills"
                options={skillOptions}
                value={formik.values.skills}
                onValueChange={({ newValue }) => formik.setFieldValue('skills', newValue)}
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
                value={formik.values.visitedCities}
                onValueChange={({ newValue }) => formik.setFieldValue('visitedCities', newValue)}
                limitTags={2}
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="RadioGroup" />
              <MUIRadioGroup
                fieldName="contact"
                options={contactOptions}
                value={formik.values.contact}
                onValueChange={({ newValue }) => formik.setFieldValue('contact', newValue)}
                errorMessage={showError('contact')}
                required
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="CheckboxGroup" />
              <MUICheckboxGroup
                fieldName="hobbies"
                options={hobbyOptions}
                value={formik.values.hobbies}
                onValueChange={({ newValue }) => formik.setFieldValue('hobbies', newValue)}
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="Slider & Rating" />
              <MUISlider
                fieldName="volume"
                label="Volume"
                value={formik.values.volume}
                onValueChange={({ newValue }) => formik.setFieldValue('volume', newValue)}
                valueLabelDisplay="auto"
                disabled={disableAllFields}
              />
              <MUIRating
                fieldName="rating"
                value={formik.values.rating}
                onValueChange={({ newValue }) => formik.setFieldValue('rating', newValue)}
                errorMessage={showError('rating')}
                required
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="Checkbox & Switch" />
              <MUICheckbox
                fieldName="subscribe"
                label="Subscribe to the newsletter"
                value={formik.values.subscribe}
                onValueChange={({ newValue }) => formik.setFieldValue('subscribe', newValue)}
                disabled={disableAllFields}
              />
              <MUISwitch
                fieldName="notifications"
                label="Enable notifications"
                value={formik.values.notifications}
                onValueChange={({ newValue }) => formik.setFieldValue('notifications', newValue)}
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <FieldVariantInfo title="DatePicker" />
              <MUIDatePicker
                fieldName="dob"
                label="Date of birth"
                value={formik.values.dob}
                onValueChange={({ newValue }) => formik.setFieldValue('dob', newValue)}
                disableFuture
                errorMessage={showError('dob')}
                required
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <FieldVariantInfo title="TimePicker" />
              <MUITimePicker
                fieldName="meetingTime"
                label="Meeting time"
                value={formik.values.meetingTime}
                onValueChange={({ newValue }) => formik.setFieldValue('meetingTime', newValue)}
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <FieldVariantInfo title="DateTimePicker" />
              <MUIDateTimePicker
                fieldName="appointment"
                label="Appointment"
                value={formik.values.appointment}
                onValueChange={({ newValue }) => formik.setFieldValue('appointment', newValue)}
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="ColorPicker" />
              <MUIColorPicker
                fieldName="brandColor"
                label="Brand colour"
                value={formik.values.brandColor}
                onValueChange={({ colorValue, color, setColor }) => {
                  setColor(color);
                  formik.setFieldValue('brandColor', colorValue);
                }}
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="PhoneInput" />
              <MUIPhoneInput
                fieldName="phone"
                label="Phone"
                value={formik.values.phone}
                onValueChange={({ newValue }) => formik.setFieldValue('phone', newValue)}
                phoneInputProps={{ defaultCountry: 'us' }}
                errorMessage={showError('phone')}
                required
                disabled={disableAllFields}
              />
            </Grid>

            <Grid size={12}>
              <FieldVariantInfo title="RichTextEditor" />
              <MUIRichTextEditor
                fieldName="bio"
                label="Short bio"
                value={formik.values.bio}
                onValueChange={({ newValue }) => formik.setFieldValue('bio', newValue)}
                errorMessage={showError('bio')}
                required
              />
            </Grid>

            <Grid size={12}>
              <SubmitButton disabled={disableAllFields} />
              <ResetButton onClick={() => formik.resetForm()} disabled={disableAllFields} />
            </Grid>
            <Grid size={12}>
              <FormState
                formValues={toDisplayValues(formik.values)}
                errors={displayErrors}
              />
            </Grid>
          </GridContainer>
        </form>
      </ConfigProvider>
    </FormContainer>
  );
}
