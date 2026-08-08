'use client';

/**
 * MUIAutocomplete example — integrated with TanStack Form. Shows a single
 * free-solo select (stores a `string`) and a multi-select (stores a
 * `string[]`) with `limitTags`, `getLimitTagsText` and `ChipProps`, plus
 * `textFieldProps` and validation surfaced through `errorMessage`.
 */

import { useCallback, useRef, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useForm } from '@tanstack/react-form';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import MUIAutocomplete from '@nish1896/mui-components/mui/autocomplete';
import { fieldNameToLabel } from '@nish1896/mui-components/form-helpers';
import {
  FormContainer,
  GridContainer,
  FieldVariantInfo,
  FormState,
  SubmitButton,
  ResetButton
} from '@/components';
import { formSubmitEventName } from '@/constants';
import { showToastMessage, logFirebaseEvent, tanstackErrors } from '@/utils';
import { fetchPokemons, type Pokemon } from './pokeApi';

const frameworks = ['React', 'Vue', 'Angular', 'Svelte', 'Solid', 'Qwik'];
const languages = ['TypeScript', 'JavaScript', 'Python', 'Go', 'Rust', 'Java', 'Kotlin'];
const LIMIT = 50;

type AutocompleteValues = {
  framework: string;
  languages: string[];
  pokemons: string[];
};

const initialValues: AutocompleteValues = {
  framework: '',
  languages: ['TypeScript'],
  pokemons: []
};

export default function AutocompleteExampleForm() {
  const pathName = usePathname();
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [disableAllFields, setDisableAllFields] = useState(false);

  const pokemonOffsetRef = useRef(0);
  const hasMorePokemonsRef = useRef(true);
  const isPokemonFetchInFlightRef = useRef(false);

  const loadPokemons = useCallback(async () => {
    if (isPokemonFetchInFlightRef.current || !hasMorePokemonsRef.current) {
      return;
    }

    isPokemonFetchInFlightRef.current = true;
    setLoading(true);

    try {
      const data = await fetchPokemons(LIMIT, pokemonOffsetRef.current);
      setPokemonList(prev => {
        const existingIds = new Set(prev.map(pokemon => pokemon.id));
        const uniqueResults = data.results.filter(
          pokemon => !existingIds.has(pokemon.id)
        );
        return uniqueResults.length ? [...prev, ...uniqueResults] : prev;
      });
      hasMorePokemonsRef.current = !!data.next;
      pokemonOffsetRef.current += LIMIT;
    } catch (error) {
      console.error('Failed to fetch Pokemon options:', error);
    } finally {
      isPokemonFetchInFlightRef.current = false;
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    /**
     * Load the first page once on mount; pagination is handled from the
     * listbox scroll event.
     *
     * Pagination state is kept in refs so the loader can be called safely
     * from mount and listbox scrolling without re-running this effect.
     */
    loadPokemons();
  }, [loadPokemons]);

  const form = useForm({
    defaultValues: initialValues,
    onSubmit: async ({ value }) => {
      await logFirebaseEvent(formSubmitEventName, { pathName });
      showToastMessage(value);
    }
  });

  return (
    <FormContainer>
      <form
        onSubmit={event => {
          event.preventDefault();
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
            <FieldVariantInfo title="Single free-solo select with validation" />
            <form.Field
              name="framework"
              validators={{
                onChange: ({ value }) => (!value ? 'Choose a framework' : undefined)
              }}
            >
              {field => (
                <MUIAutocomplete
                  fieldName="framework"
                  options={frameworks}
                  value={field.state.value}
                  onValueChange={({ newValue }) => field.handleChange((newValue as string) ?? '')}
                  onBlur={field.handleBlur}
                  errorMessage={tanstackErrors(field.state.meta.errors)}
                  freeSolo
                  required
                  textFieldProps={{ placeholder: 'Type or pick a framework' }}
                  disabled={disableAllFields}
                />
              )}
            </form.Field>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Multi-select with limitTags & chip props" />
            <form.Field
              name="languages"
              validators={{
                onChange: ({ value }) =>
                  (value?.length === 0 ? 'Pick at least one language' : undefined)
              }}
            >
              {field => (
                <MUIAutocomplete
                  fieldName="languages"
                  options={languages}
                  value={field.state.value}
                  onValueChange={({ newValue }) => field.handleChange((newValue as string[]) ?? [])}
                  multiple
                  limitTags={3}
                  getLimitTagsText={more => `+${more} more`}
                  ChipProps={{ color: 'primary', size: 'small' }}
                  required
                  errorMessage={tanstackErrors(field.state.meta.errors)}
                  disabled={disableAllFields}
                />
              )}
            </form.Field>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Autocomplete fetching options from API and appending more options on scrolling" />
            <form.Field
              name="pokemons"
              validators={{
                onChange: ({ value }) =>
                  (value?.length === 0 ? 'Select at least one pokemon' : undefined)
              }}
            >
              {field => (
                <MUIAutocomplete
                  fieldName="pokemons"
                  value={field.state.value}
                  onValueChange={({ newValue }) => field.handleChange(newValue ?? [])}
                  options={pokemonList}
                  labelKey="name"
                  valueKey="name"
                  multiple
                  required
                  showLabelAboveFormField
                  loading={loading}
                  disabled={disableAllFields}
                  renderOption={({ key, ...props }, option) => {
                    return (
                      <Box
                        key={key}
                        component="li"
                        {...props}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.5,
                          py: 1
                        }}
                      >
                        <Image
                          src={option.image}
                          alt={option.name}
                          width={40}
                          height={40}
                          style={{ objectFit: 'contain' }}
                        />
                        <Typography>
                          {fieldNameToLabel(option.name)}
                        </Typography>
                      </Box>
                    );
                  }}
                  slotProps={{
                    listbox: {
                      onScroll: event => {
                        const listboxNode = event.currentTarget;
                        const scrollBottom
                          = listboxNode.scrollTop + listboxNode.clientHeight
                            >= listboxNode.scrollHeight - 5;
                        if (scrollBottom && !loading) {
                          loadPokemons();
                        }
                      }
                    }
                  }}
                  renderValue={value => {
                    return (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {value.map(item => {
                          return (
                            <Chip
                              key={item.id}
                              label={fieldNameToLabel(item.name)}
                              avatar={
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  width={30}
                                  height={30}
                                  style={{ objectFit: 'contain' }}
                                />
                              }
                            />
                          );
                        })}
                      </Box>
                    );
                  }}
                  textFieldProps={{ variant: 'standard' }}
                  errorMessage={tanstackErrors(field.state.meta.errors)}
                />
              )}
            </form.Field>
          </Grid>

          <form.Subscribe
            selector={state => ({
              values: state.values,
              fieldMeta: state.fieldMeta,
              canSubmit: state.canSubmit
            })}
          >
            {({ values, fieldMeta, canSubmit }) => {
              const errors = Object.fromEntries(
                Object.entries(fieldMeta).map(([name, meta]) => [name, meta?.errors?.[0]])
              );
              return (
                <>
                  <Grid size={12}>
                    <SubmitButton disabled={!canSubmit} />
                    <ResetButton onClick={() => form.reset(initialValues)} />
                  </Grid>
                  <Grid size={12}>
                    <FormState
                      formValues={values}
                      errors={errors}
                    />
                  </Grid>
                </>
              );
            }}
          </form.Subscribe>
        </GridContainer>
      </form>
    </FormContainer>
  );
}
