'use client';

/**
 * MUIFileUploader example — plain React `useState`. Shows a single-file
 * uploader with `accept` / `maxSize` and an `onUploadError` handler that sets
 * the error state, and a multi-file uploader with `maxFiles`, `fullWidth` and
 * drag-and-drop. File objects are shown by name in the form-state readout.
 */

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import MUIFileUploader, {
  FileUploadError,
  type FileUploadErrorDetails
} from '@nish1896/mui-components/mui/file-uploader';
import {
  FormContainer,
  GridContainer,
  FieldVariantInfo,
  FormState,
  UploadedFile,
  UploadedImage,
  SubmitButton,
  ResetButton,
} from '@/components';
import { formSubmitEventName } from '@/constants';
import { showToastMessage, logFirebaseEvent } from '@/utils';

const MAX_AVATAR_SIZE = 2 * 1024 * 1024; // 2 MB

export default function FileUploaderForm() {
  const pathName = usePathname();

  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarError, setAvatarError] = useState<string>();
  const [documents, setDocuments] = useState<File[]>([]);
  const [disableAllFields, setDisableAllFields] = useState(false);

  const formValues = {
    avatar: avatar?.name ?? null,
    documents: documents.map(file => file.name)
  };
  const errors = { avatar: avatarError };

  function handleAvatarError(fileErrors: FileUploadErrorDetails[]) {
    const reasons = fileErrors.flatMap(detail => detail.errors);
    if (reasons.includes(FileUploadError.sizeExceeded)) {
      setAvatarError('Image is larger than 2 MB');
    } else if (reasons.includes(FileUploadError.invalidExtension)) {
      setAvatarError('Only image files are allowed');
    } else {
      setAvatarError('That file could not be uploaded');
    }
  }

  function resetForm() {
    setAvatar(null);
    setAvatarError(undefined);
    setDocuments([]);
  }

  async function onFormSubmit() {
    if (!avatar) {
      setAvatarError('Please upload an avatar');
      return;
    }
    setAvatarError(undefined);
    await logFirebaseEvent(formSubmitEventName, { pathName });
    showToastMessage(formValues);
  }

  return (
    <FormContainer>
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
            <FieldVariantInfo title="Single image, max 2 MB, with onUploadError" />
            <MUIFileUploader
              fieldName="avatar"
              value={avatar}
              onValueChange={({ newValue }) => {
                setAvatar(newValue);
                setAvatarError(undefined);
              }}
              accept="image/*"
              maxSize={MAX_AVATAR_SIZE}
              onUploadError={handleAvatarError}
              renderFileItem={({ file, removeFile }) => (
                <UploadedImage file={file} onRemove={removeFile} />
              )}
              required
              errorMessage={avatarError}
              helperText="An Image file up to 2 MB"
              disabled={disableAllFields}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Multiple files, max 3, full width & drag-drop" />
            <MUIFileUploader
              fieldName="documents"
              value={documents}
              onValueChange={({ newValue }) => setDocuments((newValue as File[]) ?? [])}
              accept=".pdf,.doc,.docx"
              multiple
              maxFiles={3}
              fullWidth
              renderFileItem={({ file, removeFile }) => (
                <UploadedFile file={file} onRemove={removeFile} />
              )}
              helperText="Up to 3 PDF or Word documents"
              disabled={disableAllFields}
            />
          </Grid>

          <Grid size={12}>
            <SubmitButton />
            <ResetButton onClick={resetForm} />
          </Grid>
          <Grid size={12}>
            <FormState
              formValues={formValues}
              errors={errors}
            />
          </Grid>
        </GridContainer>
      </form>
    </FormContainer>
  );
}
