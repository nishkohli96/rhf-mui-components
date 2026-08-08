'use client';

/**
 * MUISlider example — plain React `useState`. Shows a single-value slider, a
 * range slider (number array via the `activeThumb` payload), and pass-through
 * MUI `SliderProps` (`min`, `max`, `step`, `marks`, `valueLabelDisplay`) with
 * a label above the control and submit-time validation via `errorMessage`.
 */

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import MUISlider from '@nish1896/mui-components/mui/slider';
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

const temperatureMarks = [
  { value: 16, label: '16°' },
  { value: 22, label: '22°' },
  { value: 28, label: '28°' }
];

const minTemp = 20;
const minVolume = 10;

const initialValues = {
  volume: 30,
  priceRange: [200, 800] as number[],
  temperature: minTemp
};

export default function SliderForm() {
  const pathName = usePathname();

  const [volume, setVolume] = useState(initialValues.volume);
  const [priceRange, setPriceRange] = useState(initialValues.priceRange);
  const [temperature, setTemperature] = useState(initialValues.temperature);
  const [temperatureError, setTemperatureError] = useState<string>();
  const [disableAllFields, setDisableAllFields] = useState(false);

  const formValues = { volume, priceRange, temperature };
  const errors = { temperature: temperatureError };

  function resetForm() {
    setVolume(initialValues.volume);
    setPriceRange(initialValues.priceRange);
    setTemperature(initialValues.temperature);
    setTemperatureError(undefined);
  }

  async function onFormSubmit() {
    if(temperatureError) {
      return;
    }
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
            <FieldVariantInfo title="Single value with step & value label" />
            <MUISlider
              fieldName="volume"
              label="Volume"
              value={volume}
              onValueChange={({ newValue }) => {
                /* value is a number → newValue is inferred as number */
                if (newValue < minVolume) {
                  return;
                }
                setVolume(newValue);
              }}
              min={0}
              max={100}
              step={5}
              valueLabelDisplay="auto"
              helperText={`Drag to set the output volume; volume won't go below ${minVolume}`}
              disabled={disableAllFields}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Range slider (number array)" />
            <MUISlider
              fieldName="priceRange"
              label="Price range ($)"
              value={priceRange}
              onValueChange={({ newValue }) => setPriceRange(newValue)}
              min={0}
              max={1000}
              step={50}
              valueLabelDisplay="auto"
              disabled={disableAllFields}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Custom marks with submit-time validation" />
            <MUISlider
              fieldName="temperature"
              label="Thermostat (°C)"
              value={temperature}
              onValueChange={({ newValue }) => {
                setTemperature(newValue);
                if (newValue < minTemp) {
                  setTemperatureError(`Set the temperature to at least ${minTemp}`);
                  return;
                }
                setTemperatureError(undefined);
              }}
              min={16}
              max={28}
              step={1}
              marks={temperatureMarks}
              valueLabelDisplay="auto"
              errorMessage={temperatureError}
              helperText={`Must be at least ${minTemp}° to submit`}
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
