'use client';

/**
 * MUIRating example — plain React `useState`. Shows the numeric value plus
 * pass-through MUI `RatingProps` (`precision`, `max`, `size`), a label above
 * the control, `helperText`, and required validation via `errorMessage`.
 */

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MUIRating from '@nish1896/mui-components/mui/rating';
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

const initialValues: Record<string, number | null> = {
  overall: 4,
  quality: 2.75,
  support: null
};

const minSupportRating = 7;
const minSupportError = `Please give us a rating of atleast ${minSupportRating}`;

export default function RatingForm() {
  const pathName = usePathname();

  const [overall, setOverall] = useState(initialValues.overall);
  const [quality, setQuality] = useState(initialValues.quality);
  const [support, setSupport] = useState(initialValues.support);
  const [supportError, setSupportError] = useState<string>();
  const [disableAllFields, setDisableAllFields] = useState(false);

  const formValues = { overall, quality, support };
  const errors = { support: supportError };

  function resetForm() {
    setOverall(initialValues.overall);
    setQuality(initialValues.quality);
    setSupport(initialValues.support);
    setSupportError(undefined);
  }

  async function onFormSubmit() {
    if (!support || support < minSupportRating) {
      setSupportError(minSupportError);
      return;
    }
    setSupportError(undefined);
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
            <FieldVariantInfo title="Basic rating with helper text" />
            <MUIRating
              fieldName="overall"
              value={overall}
              onValueChange={({ newValue }) => setOverall(newValue)}
              helperText="How would you rate us overall?"
              disabled={disableAllFields}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Half-star precision & size" />
            <MUIRating
              fieldName="quality"
              label="Product quality"
              value={quality}
              onValueChange={({ newValue }) => setQuality(newValue)}
              precision={0.25}
              size="large"
              disabled={disableAllFields}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Required rating with custom icons, max value and validation" />
            <MUIRating
              fieldName="support"
              label="Support experience"
              value={support}
              onValueChange={({ newValue }) => {
                setSupport(newValue);
                if(!newValue || newValue < minSupportRating) {
                  setSupportError(minSupportError);
                } else {
                  setSupportError(undefined);
                }
              }}
              icon={<FavoriteIcon color="error" fontSize="inherit" />}
              emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
              max={10}
              required
              errorMessage={supportError}
              helperText={`A rating of atleast ${minSupportRating} is required to submit`}
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
