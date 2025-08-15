'use client';

import { usePathname } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
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
  SubmitButton
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
    formState: { errors },
    handleSubmit
  } = useForm<FormSchema>({
    defaultValues: initialValues
  });

  async function onFormSubmit(formValues: FormSchema) {
    await logFirebaseEvent(formSubmitEventName, { pathName });
    showToastMessage(formValues);
  }

  console.log('pictures, resume, documents ', watch(['resume', 'pictures', 'documents']));
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
              errorMessage={errors?.firstName?.message}
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
              errorMessage={errors?.lastName?.message}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Input with pattern validation & label above form-field" />
            <RHFTextField
              fieldName="email"
              control={control}
              errorMessage={errors?.email?.message}
              registerOptions={{
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Invalid Email Id'
                }
              }}
              variant="standard"
              showLabelAboveFormField
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Simple Password Field" />
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
              required
              errorMessage={errors?.password?.message}
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
                  minLen: v => (v && `${String(v)}`.length >= 4) || minCharMsg(4),
                  isPswdMatch: (value, formValues) =>
                    value === formValues.password || 'Passwords do not match'
                }
              }}
              variant="filled"
              showPasswordIcon={<VisibilityOffTwoToneIcon />}
              hidePasswordIcon={<VisibilityTwoToneIcon />}
              showLabelAboveFormField
              required
              errorMessage={errors?.confirmPassword?.message}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Number Input with Typography as a helper text & return value as a number" />
            <RHFNumberInput
              fieldName="age"
              control={control}
              errorMessage={errors?.age?.message}
              variant="filled"
              placeholder="What is your age?"
              helperText={<Typography color="seagreen">Optional</Typography>}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Tags Input with upto 4 visible tags when not focussed and custom limit text" />
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
              getLimitTagsText={hiddenTags => (
                <Typography color="green">
                  {`& ${hiddenTags} More`}
                </Typography>
              )}
              required
              errorMessage={errors?.tags?.message}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Tags Input with styled chips and all tags visible" />
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
                  backgroundColor: theme => theme.palette.secondary.main
                }
              }}
              variant="filled"
              showLabelAboveFormField
              limitTags={-1}
              required
              errorMessage={errors?.keywords?.message}
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
                  {index + 1}
                  .
                  {file.name}
                  {' '}
                  -
                  {' '}
                  {getFileSize(file.size, { precision: 2 })}
                </Typography>
              )}
              onUploadError={(errors, rejectedFiles) => {
                toast.error(`${rejectedFiles.length} file(s) were rejected as ${errors.join(' ,')}`);
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
              renderUploadButton={fileInput => (
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
