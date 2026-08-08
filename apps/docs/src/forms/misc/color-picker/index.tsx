'use client';

/**
 * MUIColorPicker example — plain React `useState`. The `onValueChange` payload
 * is `{ color, colorValue, setColor }`: call `setColor(color)` to keep the
 * picker's visual state in sync and store `colorValue` (the formatted string).
 * Shows `valueKey` (hex / rgb / hsv), `defaultColor`, `excludeAlpha`, a custom
 * `height`, and using `setColor` to reject a value.
 */

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import MUIColorPicker from '@nish1896/mui-components/misc/color-picker';
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

const initialValues = {
  brandColor: '#1976d2',
  accentColor: 'rgba(238, 130, 238, 1)',
  chartColor: 'hsva(30, 100%, 100%, 1)'
};

export default function ColorPickerForm() {
  const pathName = usePathname();

  const [brandColor, setBrandColor] = useState(initialValues.brandColor);
  const [accentColor, setAccentColor] = useState(initialValues.accentColor);
  const [chartColor, setChartColor] = useState(initialValues.chartColor);
  const [disableAllFields, setDisableAllFields] = useState(false);

  const formValues = { brandColor, accentColor, chartColor };

  function resetForm() {
    setBrandColor(initialValues.brandColor);
    setAccentColor(initialValues.accentColor);
    setChartColor(initialValues.chartColor);
  }

  async function onFormSubmit() {
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
            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
              <Typography>
                Selected Colors :
              </Typography>
              {[brandColor, accentColor, chartColor].map((swatch, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 40,
                    height: 24,
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'divider',
                    backgroundColor: swatch
                  }}
                />
              ))}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Hex value, label above the picker" />
            <MUIColorPicker
              fieldName="brandColor"
              label="Brand colour"
              value={brandColor}
              onValueChange={({ color, colorValue, setColor }) => {
                setColor(color);
                setBrandColor(colorValue);
              }}
              showLabelAboveFormField
              helperText={(
                <Typography component="span" sx={{ color: brandColor }}>
                  This text uses the selected colour (
                  {brandColor}
                  )
                </Typography>
              )}
              disabled={disableAllFields}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="RGB value — rejects very red colours via setColor" />
            <MUIColorPicker
              fieldName="accentColor"
              label="Accent colour"
              value={accentColor}
              valueKey="rgb"
              defaultColor="violet"
              onValueChange={({ color, colorValue, setColor }) => {
                if (color.rgb.r > 200) {
                  return;
                }
                setColor(color);
                setAccentColor(colorValue);
              }}
              helperText="The colour won't change when red exceeds 200"
              excludeAlpha
              disabled={disableAllFields}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="HSV value, alpha excluded, taller picker" />
            <MUIColorPicker
              fieldName="chartColor"
              label="Chart colour"
              value={chartColor}
              valueKey="hsv"
              defaultColor="orange"
              excludeAlpha
              height={160}
              onValueChange={({ color, colorValue, setColor }) => {
                setColor(color);
                setChartColor(colorValue);
              }}
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
              errors={{}}
            />
          </Grid>
        </GridContainer>
      </form>
    </FormContainer>
  );
}
