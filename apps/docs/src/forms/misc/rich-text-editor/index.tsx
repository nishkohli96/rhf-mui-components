'use client';

/**
 * MUIRichTextEditor example — plain React `useState`. The value is an HTML
 * string emitted by CKEditor. Shows a required editor with a custom `label`
 * and validation, and a second editor with the label above the field.
 */

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import MUIRichTextEditor from '@nish1896/mui-components/misc/rich-text-editor';
import {
  FormContainer,
  GridContainer,
  FieldVariantInfo,
  FormState,
  SubmitButton,
  ResetButton
} from '@/components';
import { formSubmitEventName } from '@/constants';
import { showToastMessage, logFirebaseEvent } from '@/utils';

/** CKEditor emits an empty document as "<p>&nbsp;</p>" or "" — treat both as blank. */
function isBlankHtml(html: string) {
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, '').trim().length === 0;
}

const initialValues = {
  bio: '',
  notes: ''
};

export default function RichTextEditorForm() {
  const pathName = usePathname();

  const [bio, setBio] = useState(initialValues.bio);
  const [bioError, setBioError] = useState<string>();
  const [notes, setNotes] = useState(initialValues.notes);
  const [disableAllFields, setDisableAllFields] = useState(false);

  const formValues = { bio, notes };
  const errors = { bio: bioError };

  function resetForm() {
    setBio(initialValues.bio);
    setNotes(initialValues.notes);
    setBioError(undefined);
  }

  async function onFormSubmit() {
    if (isBlankHtml(bio)) {
      setBioError('Please add a short bio');
      return;
    }
    setBioError(undefined);
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
          <Grid size={12}>
            <FieldVariantInfo title="Required editor with a custom label & validation" />
            <MUIRichTextEditor
              fieldName="bio"
              label={(
                <Typography color="#primary">
                  Briefly describe yourself
                </Typography>
              )}
              value={bio}
              onValueChange={({ newValue }) => {
                setBio(newValue);
                setBioError(undefined);
              }}
              required
              disabled={disableAllFields}
              errorMessage={bioError}
            />
          </Grid>

          <Grid size={12}>
            <FieldVariantInfo title="Editor with the helperText" />
            <MUIRichTextEditor
              fieldName="notes"
              label="Additional notes"
              value={notes}
              onValueChange={({ newValue }) => setNotes(newValue)}
              showLabelAboveFormField
              helperText="Optional — anything else we should know?"
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
