'use client';

import { usePathname } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import VisibilityOffTwoToneIcon from '@mui/icons-material/VisibilityOffTwoTone';
import RHFTextField from '@nish1896/rhf-mui-components/mui/textfield';
import RHFNumberInput from '@nish1896/rhf-mui-components/mui/number-input';
import RHFPasswordInput from '@nish1896/rhf-mui-components/mui/password-input';
import RHFTagsInput from '@nish1896/rhf-mui-components/mui/tags-input';
import RHFFileUploader from '@nish1896/rhf-mui-components/mui/file-uploader';
import { getFileSize } from '@nish1896/rhf-mui-components/form-helpers';
import { toast } from 'react-toastify';
import {
  FormContainer,
  GridContainer,
  FieldVariantInfo,
  FormState,
  SubmitButton,
  ResetButton
} from '@/components';
import { formSubmitEventName } from '@/constants';
import {
  reqdMsg,
  minCharMsg,
  maxCharMsg,
  showToastMessage,
  logFirebaseEvent
} from '@/utils';

type FormSchema = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  age?: number;
  weight?: number;
  balance?: number;
  tags?: string[];
  keywords?: string[];
  resume?: File;
  pictures?: File[];
  documents?: File[];
};

const initialValues: FormSchema = {
  firstName: '',
  lastName: 'Jr.',
  email: '',
  password: '',
  confirmPassword: '',
  keywords: ['hello', 'world', 'foo', 'bar', 'lorem ipsum']
};

const InputsWithRegisterForm = () => {
  const pathName = usePathname();
  const {
    control,
    watch,
    reset,
    formState: { errors },
    handleSubmit
  } = useForm<FormSchema>({
    defaultValues: initialValues
  });

  async function onFormSubmit(formValues: FormSchema) {
    await logFirebaseEvent(formSubmitEventName, { pathName });
    showToastMessage(formValues);
  }

  return (
    <FormContainer title="Inputs">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <GridContainer>
          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Basic Input field with required validation" />
            <RHFTextField
              fieldName="firstName"
              control={control}
              registerOptions={{
                required: {
                  value: true,
                  message: reqdMsg('First Name')
                }
              }}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Input with min & max length validation" />
            <RHFTextField
              fieldName="lastName"
              control={control}
              registerOptions={{
                minLength: {
                  value: 4,
                  message: minCharMsg(4)
                },
                maxLength: {
                  value: 10,
                  message: maxCharMsg(10)
                }
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Input with pattern validation & label above form-field with custom id" />
            <RHFTextField
              fieldName="email"
              control={control}
              registerOptions={{
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Invalid Email Id'
                }
              }}
              customIds={{
                field: 'userEmail',
                label: 'userEmail-label'
              }}
              variant="standard"
              showLabelAboveFormField
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Simple Password Field with hidden label" />
            <RHFPasswordInput
              fieldName="password"
              control={control}
              registerOptions={{
                required: {
                  value: true,
                  message: reqdMsg('Password')
                },
                minLength: {
                  value: 4,
                  message: minCharMsg(4)
                }
              }}
              placeholder="Enter a secure password"
              hideLabel
              required
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Password Field with custom icons & validate rule" />
            <RHFPasswordInput
              fieldName="confirmPassword"
              control={control}
              registerOptions={{
                required: {
                  value: true,
                  message: reqdMsg('your password again')
                },
                validate: {
                  minLen: (v) =>
                    (v && `${String(v)}`.length >= 4) || minCharMsg(4),
                  isPswdMatch: (value, formValues) =>
                    value === formValues.password || 'Passwords do not match'
                }
              }}
              variant="filled"
              showPasswordIcon={<VisibilityOffTwoToneIcon />}
              hidePasswordIcon={<VisibilityTwoToneIcon />}
              showLabelAboveFormField
              required
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Number Input with integer value & Typography as a helper text" />
            <RHFNumberInput
              fieldName="age"
              control={control}
              variant="filled"
              placeholder="What is your age?"
              nonNegative
              onlyIntegers
              onFocus={e => e.target.select()}
              helperText={<Typography color="seagreen">Optional</Typography>}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Number Input with decimal place limit and integer stepAmount" />
            <RHFNumberInput
              fieldName="weight"
              control={control}
              maxDecimalPlaces={3}
              placeholder="Enter your weight"
              stepAmount={2}
              showMarkers
              nonNegative
              helperText={
                <Typography color="seagreen">
                  Press Arrow Up/Down keys to update input value; negative values are not allowed
                </Typography>
              }
              slotProps={{
                input: {
                  endAdornment: <InputAdornment position="end">kg</InputAdornment>
                }
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Number Input with 2 decimal places and stepAmount" />
            <RHFNumberInput
              fieldName="balance"
              control={control}
              registerOptions={{
                required: {
                  value: true,
                  message: reqdMsg('balance')
                },
              }}
              variant="filled"
              maxDecimalPlaces={2}
              stepAmount={0.5}
              showMarkers
              helperText={
                <Typography color="seagreen">
                  Press Arrow Up/Down keys to update input value
                </Typography>
              }
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Tags Input with upto 4 visible tags, and custom onTagAdd, onTagDelete and onTagPaste events" />
            <RHFTagsInput
              fieldName="tags"
              control={control}
              registerOptions={{
                required: {
                  value: true,
                  message: reqdMsg('tags')
                }
              }}
              limitTags={4}
              onTagAdd={newTag => {
                if (newTag.length < 3) {
                  return false;
                }
                if (newTag.toLowerCase().includes('sh')) {
                  return false;
                }
              }}
              onTagDelete={(deletedTag) => {
                if (deletedTag.length === 4) {
                  return false;
                }
              }}
              onTagPaste={pastedTags => {
                const filteredTags = pastedTags.filter(
                  (t) =>
                    t.length >= 3 &&
                    !t.toLowerCase().includes('sh')
                );
                return filteredTags;
              }}
              getLimitTagsText={(hiddenTags) => (
                <Typography color="green">{`& ${hiddenTags} More`}</Typography>
              )}
              required
              helperText="Enter min 3 characters; no 'sh' substring allowed"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Tags Input with styled chips, custom delimiter and all tags visible" />
            <RHFTagsInput
              fieldName="keywords"
              control={control}
              registerOptions={{
                required: {
                  value: true,
                  message: reqdMsg('keywords')
                }
              }}
              ChipProps={{
                variant: 'outlined',
                sx: {
                  color: 'white',
                  variant: 'filled',
                  backgroundColor: (theme) => theme.palette.secondary.main
                }
              }}
              delimiter="|"
              variant="filled"
              showLabelAboveFormField
              limitTags={-1}
              required
              helperText="Use '|' to separate tags"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Customized label and allow upload of at max 2 pdf files only" />
            <RHFFileUploader
              fieldName="documents"
              control={control}
              accept=".pdf"
              multiple
              label={
                <Typography color="secondary" sx={{ fontWeight: 600 }}>
                  <CloudUploadIcon />
                  {' Upload Documents'}
                </Typography>
              }
              showFileSize
              fullWidth
              maxFiles={2}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Upload multiple images showing and show files uploaded" />
            <RHFFileUploader
              fieldName="pictures"
              control={control}
              accept="image/*"
              label="Upload Pictures"
              multiple
              showFileSize
              fullWidth
              renderFileItem={(file, index) => (
                <Typography variant="body2">
                  {index + 1}.{file.name} -{' '}
                  {getFileSize(file.size, { precision: 2 })}
                </Typography>
              )}
              onUploadError={(errors, rejectedFiles) => {
                toast.error(
                  `${
                    rejectedFiles.length
                  } file(s) were rejected as ${errors.join(' ,')}`
                );
                console.log('rejectedFiles: ', rejectedFiles);
                console.log('errors: ', errors);
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="FileUploader with custom button" />
            <RHFFileUploader
              fieldName="resume"
              control={control}
              label="Upload Resume"
              showLabelAboveFormField
              accept="application/pdf"
              renderUploadButton={(fileInput) => (
                <div style={{ width: '200px' }}>
                  <IconButton component="label" tabIndex={-1}>
                    <UploadFileIcon />
                    {fileInput}
                  </IconButton>
                </div>
              )}
            />
          </Grid>
          <Grid size={12}>
            <SubmitButton />
            <ResetButton onClick={() => reset(initialValues)} />
          </Grid>
          <Grid size={12}>
            <FormState formValues={watch()} errors={errors} />
          </Grid>
        </GridContainer>
      </form>
    </FormContainer>
  );
};

export default InputsWithRegisterForm;
