'use client';

/**
 * MUIMultiAutocompleteObject example — plain React `useState`. A checkbox
 * multi-select that stores an array of whole option objects, with a
 * "Select All" option, `limitTags`, `ChipProps` and a custom
 * `renderOptionLabel`.
 */

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import MUIMultiAutocompleteObject from '@nish1896/mui-components/mui/multi-autocomplete-object';
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

type ProjectOption = { id: string; title: string; owner: string };

const projects: ProjectOption[] = [
  { id: 'p1', title: 'Website revamp', owner: 'Ana' },
  { id: 'p2', title: 'Mobile app', owner: 'Boris' },
  { id: 'p3', title: 'Data pipeline', owner: 'Clyde' },
  { id: 'p4', title: 'Design system', owner: 'Diana' }
];

export default function MultiAutocompleteObjectForm() {
  const pathName = usePathname();

  const [watched, setWatched] = useState<ProjectOption[]>([projects[0]]);
  const [watchedError, setWatchedError] = useState<string>();
  const [disableAllFields, setDisableAllFields] = useState(false);

  const formValues = { watched };
  const errors = { watched: watchedError };

  function resetForm() {
    setWatched([projects[0]]);
    setWatchedError(undefined);
  }

  async function onFormSubmit() {
    if (watched.length === 0) {
      setWatchedError('Watch at least one project');
      return;
    }
    setWatchedError(undefined);
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

          <Grid size={{ xs: 12, md: 8 }}>
            <FieldVariantInfo title="Multi-select storing whole objects, with Select All" />
            <MUIMultiAutocompleteObject
              fieldName="watched"
              label="Watched projects"
              options={projects}
              labelKey="title"
              valueKey="id"
              value={watched}
              onValueChange={({ newValue }) => {
                setWatched(newValue);
                setWatchedError(undefined);
              }}
              selectAllText="Watch all projects"
              limitTags={2}
              ChipProps={{ color: 'primary', size: 'small' }}
              renderOptionLabel={option => `${option.title} · ${option.owner}`}
              required
              errorMessage={watchedError}
              helperText="You'll get updates for the selected projects"
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
