'use client';

/**
 * Complete form covering every component, integrated with TanStack Form and
 * validated by a Joi schema (see `schema.ts`). The form-level validator returns
 * `{ fields }`, so each field's `meta.errors` — passed to `errorMessage` — is
 * driven by Joi. Includes a "disable all fields" toggle, submit and reset
 * buttons, and a live form-state readout.
 */

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useForm } from '@tanstack/react-form';
import { type DateTime } from 'luxon';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
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
import { showToastMessage, logFirebaseEvent, tanstackErrors } from '@/utils';
import {
  roleOptions,
  priorityOptions,
  frameworkOptions,
  skillOptions,
  hobbyOptions,
  contactOptions,
  cityOptions,
  preferredCountries,
  initialValues,
  toDisplayValues,
  type CompleteFormValues
} from '../data';
import { validateWithJoi } from '../schema';

/**
 * This form configures the Luxon adapter, so its picker values are Luxon
 * `DateTime`s. The shared `CompleteFormValues` types the date fields with the
 * adapter-agnostic `PickerValidDate` union (Dayjs | Moment | DateTime | Date);
 * feeding that union to TanStack Form's deep `DeepKeys`/`fieldMeta` type
 * machinery trips TS's instantiation-depth limit (TS2589). Narrowing the date
 * fields to this form's single concrete type keeps the readout honest and the
 * type instantiation shallow.
 */
type TanStackFormValues = Omit<
  CompleteFormValues,
  'dob' | 'meetingTime' | 'appointment'
> & {
  dob: DateTime | null;
  meetingTime: DateTime | null;
  appointment: DateTime | null;
};

/**
 * The form-level Joi validator validates every field at once, so `meta.errors`
 * is populated for all invalid (e.g. empty required) fields as soon as any field
 * changes — including `MUIPhoneInput`, which fires an `onValueChange` on mount to
 * normalize the empty value to its default dial code. Surfacing errors
 * unconditionally therefore shows a message under every field on initial load.
 *
 * Gate the message on `isBlurred || submitted` (mirroring the Formik example's
 * touched-based gating): a programmatic mount change sets `isTouched` but never
 * `isBlurred`, so errors appear once the user leaves a field or attempts a
 * submit, never before the form is interacted with.
 */
function fieldErrorMessage(
  meta: { isBlurred: boolean; errors: unknown[] },
  submitted: boolean
): string[] | undefined {
  return meta.isBlurred || submitted ? tanstackErrors(meta.errors) : undefined;
}

export default function CompleteTanStackForm() {
  const pathName = usePathname();
  const [disableAllFields, setDisableAllFields] = useState(false);
  /**
   * Reveal every field's error only once a submit has been attempted (fields
   * also reveal their own error on blur). See `fieldErrorMessage`.
   */
  const [submitted, setSubmitted] = useState(false);

  const form = useForm({
    defaultValues: initialValues as TanStackFormValues,
    validators: {
      onChange: ({ value }) => validateWithJoi(value),
      onSubmit: ({ value }) => validateWithJoi(value)
    },
    onSubmit: async ({ value }) => {
      await logFirebaseEvent(formSubmitEventName, { pathName });
      showToastMessage(toDisplayValues(value));
    }
  });

  return (
    <FormContainer title="Complete Form — TanStack + Joi">
      <ConfigProvider dateAdapter={AdapterLuxon} allLabelsAboveFields>
        <form
          onSubmit={event => {
            event.preventDefault();
            setSubmitted(true);
            form.handleSubmit();
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
              <form.Field name="firstName">
                {field => (
                  <MUITextField
                    fieldName="firstName"
                    value={field.state.value}
                    onValueChange={({ newValue }) => field.handleChange(newValue)}
                    onBlur={field.handleBlur}
                    errorMessage={fieldErrorMessage(field.state.meta, submitted)}
                    required
                    disabled={disableAllFields}
                  />
                )}
              </form.Field>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="PasswordInput" />
              <form.Field name="password">
                {field => (
                  <MUIPasswordInput
                    fieldName="password"
                    value={field.state.value}
                    onValueChange={({ newValue }) => field.handleChange(newValue)}
                    onBlur={field.handleBlur}
                    errorMessage={fieldErrorMessage(field.state.meta, submitted)}
                    required
                    disabled={disableAllFields}
                  />
                )}
              </form.Field>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="NumberInput" />
              <form.Field name="age">
                {field => (
                  <MUINumberInput
                    fieldName="age"
                    value={field.state.value}
                    onValueChange={({ newValue }) => field.handleChange(newValue)}
                    onBlur={field.handleBlur}
                    onlyIntegers
                    nonNegative
                    errorMessage={fieldErrorMessage(field.state.meta, submitted)}
                    required
                    disabled={disableAllFields}
                  />
                )}
              </form.Field>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="TagsInput" />
              <form.Field name="tags">
                {field => (
                  <MUITagsInput
                    fieldName="tags"
                    value={field.state.value}
                    onValueChange={({ newValue }) => field.handleChange(newValue)}
                    maxTags={5}
                    disabled={disableAllFields}
                  />
                )}
              </form.Field>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="FileUploader" />
              <form.Field name="avatar">
                {field => (
                  <MUIFileUploader
                    fieldName="avatar"
                    value={field.state.value}
                    onValueChange={({ newValue }) => field.handleChange(newValue)}
                    accept="image/*"
                    renderFileItem={({ file, removeFile }) => (
                      <UploadedImage file={file} onRemove={removeFile} />
                    )}
                    disabled={disableAllFields}
                  />
                )}
              </form.Field>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="Select" />
              <form.Field name="role">
                {field => (
                  <MUISelect
                    fieldName="role"
                    options={roleOptions}
                    value={field.state.value}
                    onValueChange={({ newValue }) => field.handleChange(newValue)}
                    showDefaultOption
                    errorMessage={fieldErrorMessage(field.state.meta, submitted)}
                    required
                    disabled={disableAllFields}
                  />
                )}
              </form.Field>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="NativeSelect" />
              <form.Field name="priority">
                {field => (
                  <MUINativeSelect
                    fieldName="priority"
                    options={priorityOptions}
                    value={field.state.value}
                    onValueChange={({ newValue }) => field.handleChange(newValue)}
                    disabled={disableAllFields}
                  />
                )}
              </form.Field>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="Autocomplete" />
              <form.Field name="framework">
                {field => (
                  <MUIAutocomplete
                    fieldName="framework"
                    options={frameworkOptions}
                    value={field.state.value}
                    onValueChange={({ newValue }) => field.handleChange(newValue ?? '')}
                    onBlur={field.handleBlur}
                    errorMessage={fieldErrorMessage(field.state.meta, submitted)}
                    required
                    disabled={disableAllFields}
                  />
                )}
              </form.Field>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="AutocompleteObject" />
              <form.Field name="city">
                {field => (
                  <MUIAutocompleteObject
                    fieldName="city"
                    options={cityOptions}
                    labelKey="name"
                    valueKey="id"
                    value={field.state.value}
                    onValueChange={({ newValue }) => field.handleChange(newValue)}
                    errorMessage={fieldErrorMessage(field.state.meta, submitted)}
                    required
                    disabled={disableAllFields}
                  />
                )}
              </form.Field>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="CountrySelect" />
              <form.Field name="country">
                {field => (
                  <MUICountrySelect
                    fieldName="country"
                    value={field.state.value}
                    onValueChange={({ newValue }) => field.handleChange(newValue)}
                    preferredCountries={preferredCountries}
                    errorMessage={fieldErrorMessage(field.state.meta, submitted)}
                    required
                    disabled={disableAllFields}
                  />
                )}
              </form.Field>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="MultiAutocomplete" />
              <form.Field name="skills">
                {field => (
                  <MUIMultiAutocomplete
                    fieldName="skills"
                    options={skillOptions}
                    value={field.state.value}
                    onValueChange={({ newValue }) => field.handleChange(newValue)}
                    limitTags={2}
                    disabled={disableAllFields}
                  />
                )}
              </form.Field>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="MultiAutocompleteObject" />
              <form.Field name="visitedCities">
                {field => (
                  <MUIMultiAutocompleteObject
                    fieldName="visitedCities"
                    options={cityOptions}
                    labelKey="name"
                    valueKey="id"
                    value={field.state.value}
                    onValueChange={({ newValue }) => field.handleChange(newValue)}
                    limitTags={2}
                    disabled={disableAllFields}
                  />
                )}
              </form.Field>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="RadioGroup" />
              <form.Field name="contact">
                {field => (
                  <MUIRadioGroup
                    fieldName="contact"
                    options={contactOptions}
                    value={field.state.value}
                    onValueChange={({ newValue }) => field.handleChange(newValue)}
                    errorMessage={fieldErrorMessage(field.state.meta, submitted)}
                    required
                    disabled={disableAllFields}
                  />
                )}
              </form.Field>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="CheckboxGroup" />
              <form.Field name="hobbies">
                {field => (
                  <MUICheckboxGroup
                    fieldName="hobbies"
                    options={hobbyOptions}
                    value={field.state.value}
                    onValueChange={({ newValue }) => field.handleChange(newValue)}
                    disabled={disableAllFields}
                  />
                )}
              </form.Field>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="Slider & Rating" />
              <form.Field name="volume">
                {field => (
                  <MUISlider
                    fieldName="volume"
                    label="Volume"
                    value={field.state.value}
                    onValueChange={({ newValue }) => field.handleChange(newValue)}
                    valueLabelDisplay="auto"
                    disabled={disableAllFields}
                  />
                )}
              </form.Field>
              <form.Field name="rating">
                {field => (
                  <MUIRating
                    fieldName="rating"
                    value={field.state.value}
                    onValueChange={({ newValue }) => field.handleChange(newValue)}
                    errorMessage={fieldErrorMessage(field.state.meta, submitted)}
                    required
                    disabled={disableAllFields}
                  />
                )}
              </form.Field>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="Checkbox & Switch" />
              <form.Field name="subscribe">
                {field => (
                  <MUICheckbox
                    fieldName="subscribe"
                    label="Subscribe to the newsletter"
                    value={field.state.value}
                    onValueChange={({ newValue }) => field.handleChange(newValue)}
                    disabled={disableAllFields}
                  />
                )}
              </form.Field>
              <form.Field name="notifications">
                {field => (
                  <MUISwitch
                    fieldName="notifications"
                    label="Enable notifications"
                    value={field.state.value}
                    onValueChange={({ newValue }) => field.handleChange(newValue)}
                    disabled={disableAllFields}
                  />
                )}
              </form.Field>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <FieldVariantInfo title="DatePicker" />
              <form.Field name="dob">
                {field => (
                  <MUIDatePicker
                    fieldName="dob"
                    label="Date of birth"
                    value={field.state.value}
                    onValueChange={({ newValue }) => field.handleChange(newValue)}
                    disableFuture
                    errorMessage={fieldErrorMessage(field.state.meta, submitted)}
                    required
                    disabled={disableAllFields}
                  />
                )}
              </form.Field>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <FieldVariantInfo title="TimePicker" />
              <form.Field name="meetingTime">
                {field => (
                  <MUITimePicker
                    fieldName="meetingTime"
                    label="Meeting time"
                    value={field.state.value}
                    onValueChange={({ newValue }) => field.handleChange(newValue)}
                    disabled={disableAllFields}
                  />
                )}
              </form.Field>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <FieldVariantInfo title="DateTimePicker" />
              <form.Field name="appointment">
                {field => (
                  <MUIDateTimePicker
                    fieldName="appointment"
                    label="Appointment"
                    value={field.state.value}
                    onValueChange={({ newValue }) => field.handleChange(newValue)}
                    disabled={disableAllFields}
                  />
                )}
              </form.Field>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="ColorPicker" />
              <form.Field name="brandColor">
                {field => (
                  <MUIColorPicker
                    fieldName="brandColor"
                    label="Brand colour"
                    value={field.state.value}
                    onValueChange={({ colorValue, color, setColor }) => {
                      setColor(color);
                      field.handleChange(colorValue);
                    }}
                    disabled={disableAllFields}
                  />
                )}
              </form.Field>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FieldVariantInfo title="PhoneInput" />
              <form.Field name="phone">
                {field => (
                  <MUIPhoneInput
                    fieldName="phone"
                    label="Phone"
                    value={field.state.value}
                    onValueChange={({ newValue }) => field.handleChange(newValue)}
                    phoneInputProps={{ defaultCountry: 'us' }}
                    errorMessage={fieldErrorMessage(field.state.meta, submitted)}
                    required
                    disabled={disableAllFields}
                  />
                )}
              </form.Field>
            </Grid>

            <Grid size={12}>
              <FieldVariantInfo title="RichTextEditor" />
              <form.Field name="bio">
                {field => (
                  <MUIRichTextEditor
                    fieldName="bio"
                    label="Short bio"
                    value={field.state.value}
                    onValueChange={({ newValue }) => field.handleChange(newValue)}
                    errorMessage={fieldErrorMessage(field.state.meta, submitted)}
                    required
                  />
                )}
              </form.Field>
            </Grid>

            <form.Subscribe
              selector={state => ({
                values: state.values,
                fieldMeta: state.fieldMeta
              })}
            >
              {({ values, fieldMeta }) => {
                const errors = Object.fromEntries(
                  Object.entries(fieldMeta).map(([name, meta]) => [name, meta?.errors?.[0]])
                );
                return (
                  <>
                    <Grid size={12}>
                      <SubmitButton disabled={disableAllFields} />
                      <ResetButton
                        onClick={() => {
                          form.reset();
                          setSubmitted(false);
                        }}
                        disabled={disableAllFields}
                      />
                    </Grid>
                    <Grid size={12}>
                      <FormState
                        formValues={toDisplayValues(values)}
                        errors={errors}
                      />
                    </Grid>
                  </>
                );
              }}
            </form.Subscribe>
          </GridContainer>
        </form>
      </ConfigProvider>
    </FormContainer>
  );
}
