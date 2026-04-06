'use client';

import {
  useContext,
  useMemo,
  forwardRef,
  type Ref,
  type ReactNode,
  type SyntheticEvent
} from 'react';
import {
  Controller,
  type FieldValues,
  type Path,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import Box from '@mui/material/Box';
import Autocomplete, {
  type AutocompleteProps,
  type AutocompleteChangeDetails,
  type AutocompleteChangeReason,
  type AutocompleteValue
} from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import {
  FormControl,
  FormLabel,
  FormLabelText,
  FormHelperText,
  defaultAutocompleteValue
} from '@/common';
import type {
  CountryDetails,
  CountryISO,
  FormLabelProps,
  FormHelperTextProps,
  AutocompleteNewValue,
  AutoCompleteTextFieldProps,
  MuiChipProps,
  CustomComponentIds,
  CustomOnChangeProps
} from '@/types';
import {
  fieldNameToLabel,
  keepLabelAboveFormField,
  useFieldIds,
  mergeRefs
} from '@/utils';
import CountryMenuItem from './CountryMenuItem';
import { countryList } from './countries';

type OnValueChangeProps<
  Multiple extends boolean,
  DisableClearable extends boolean
> = {
  newValue: AutocompleteNewValue<Multiple, DisableClearable>;
  event: SyntheticEvent;
  reason: AutocompleteChangeReason;
  details?: AutocompleteChangeDetails<CountryDetails>;
};

type CountrySelectFieldValue<
  Multiple extends boolean,
  DisableClearable extends boolean
> = AutocompleteValue<CountryDetails, Multiple, DisableClearable, false>;

type AutoCompleteProps<
  Multiple extends boolean = false,
  DisableClearable extends boolean = false
> = Omit<
  AutocompleteProps<CountryDetails, Multiple, DisableClearable, false>,
  | 'freeSolo'
  | 'multiple'
  | 'fullWidth'
  | 'renderInput'
  | 'renderOption'
  | 'options'
  | 'value'
  | 'defaultValue'
  | 'onChange'
  | 'getOptionKey'
  | 'getOptionLabel'
  | 'isOptionEqualToValue'
  | 'autoHighlight'
  | 'blurOnSelect'
  | 'disableClearable'
  | 'disableCloseOnSelect'
  | 'ChipProps'
  | 'loading'
>;

export type RHFCountrySelectProps<
  T extends FieldValues,
  Multiple extends boolean = false,
  DisableClearable extends boolean = false
> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  countries?: CountryDetails[];
  multiple?: Multiple;
  preferredCountries?: CountryISO[];
  valueKey?: keyof Omit<CountryDetails, 'emoji'>;
  onValueChange?: ({
    newValue,
    event,
    reason,
    details
  }: OnValueChangeProps<Multiple, DisableClearable>) => void;
  /**
   * Custom change handler that overrides the default value update behavior.
   *
   * Use this when you need full control over how the selected value is processed
   * before updating React Hook Form state.
   *
   * ⚠️ Important: You must call `rhfOnChange` manually to update the form state.
   * `onValueChange` is not invoked when using `customOnChange`.
   *
   * @param rhfOnChange - React Hook Form's internal change handler
   * @param newValue - Selected value(s) stored in the form: `CountryDetails[]` when `multiple` is true, otherwise `CountryDetails`. Includes `null` only when clearing is allowed (`disableClearable` is false).
   * @param event - The event that triggered the change
   * @param reason - The reason for the change
   * @param details - The details of the change
   */
  customOnChange?: ({
    rhfOnChange,
    newValue,
    event,
    reason,
    details
  }: CustomOnChangeProps<
    OnValueChangeProps<Multiple, DisableClearable>,
    CountrySelectFieldValue<Multiple, DisableClearable>
  >) => void;
  disableClearable?: DisableClearable;
  label?: ReactNode;
  showLabelAboveFormField?: boolean;
  hideLabel?: boolean;
  formLabelProps?: FormLabelProps;
  renderOptionLabel?: (option: CountryDetails) => ReactNode;
  required?: boolean;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
  textFieldProps?: AutoCompleteTextFieldProps;
  ChipProps?: MuiChipProps;
  customIds?: CustomComponentIds;
} & AutoCompleteProps<Multiple, DisableClearable>;

const RHFCountrySelectInner = forwardRef(function RHFCountrySelect<
  T extends FieldValues,
  Multiple extends boolean = false,
  DisableClearable extends boolean = false
>({
  fieldName,
  control,
  registerOptions,
  countries,
  preferredCountries,
  valueKey = 'iso',
  onValueChange,
  disabled: muiDisabled,
  customOnChange,
  label,
  showLabelAboveFormField,
  hideLabel,
  formLabelProps,
  renderOptionLabel,
  required,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  multiple,
  textFieldProps,
  slotProps,
  ChipProps,
  onBlur,
  disableClearable,
  customIds,
  ...otherAutoCompleteProps
}: RHFCountrySelectProps<T, Multiple, DisableClearable>,
ref: Ref<HTMLInputElement>) {
  const {
    fieldId,
    labelId,
    helperTextId,
    errorId
  } = useFieldIds(fieldName, customIds);

  const { allLabelsAboveFields } = useContext(RHFMuiConfigContext);
  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );
  const fieldLabel = label ?? fieldNameToLabel(fieldName);

  const countryOptions = countries ?? countryList;
  const countrySelectOptions = useMemo(() => {
    let countriesToList = countryOptions;
    let countriesToListAtTop: CountryDetails[] = [];

    if (preferredCountries?.length) {
      countriesToListAtTop = countryOptions.filter(country =>
        preferredCountries.includes(country.iso));

      countriesToListAtTop.sort(
        (a, b) =>
          preferredCountries.indexOf(a.iso)
          - preferredCountries.indexOf(b.iso)
      );

      countriesToList = countryOptions.filter(
        country => !preferredCountries.includes(country.iso)
      );
    }

    return [...countriesToListAtTop, ...countriesToList];
  }, [countryOptions, preferredCountries]);

  const countryMap = useMemo(() => {
    const map = new Map<string, CountryDetails>();
    countrySelectOptions.forEach(c => {
      map.set(c[valueKey], c);
    });
    return map;
  }, [countrySelectOptions, valueKey]);

  return (
    <Controller
      name={fieldName}
      control={control}
      rules={registerOptions}
      disabled={muiDisabled}
      render={({
        field: {
          name: rhfFieldName,
          value: rhfValue,
          onChange: rhfOnChange,
          onBlur: rhfOnBlur,
          ref: rhfRef,
          disabled: rhfDisabled
        },
        fieldState: { error: fieldStateError }
      }) => {
        const fieldErrorMessage
          = fieldStateError?.message?.toString() ?? errorMessage;
        const isError = !!fieldErrorMessage;
        const showHelperTextElement = !!(
          helperText
          || (isError && !hideErrorMessage)
        );

        const selectedCountries = multiple
          ? (rhfValue ?? [])
            .map(val => countryMap.get(val))
            .filter((country): country is CountryDetails => !!country)
          : (countryMap.get(rhfValue) ?? null);

        return (
          <FormControl error={isError}>
            {!hideLabel && (
              <FormLabel
                label={fieldLabel}
                isVisible={isLabelAboveFormField}
                required={required}
                error={isError}
                formLabelProps={{
                  id: labelId,
                  htmlFor: fieldId,
                  ...formLabelProps
                }}
              />
            )}
            <Autocomplete
              id={fieldId}
              options={countrySelectOptions}
              multiple={multiple}
              value={
                selectedCountries as CountrySelectFieldValue<
                  Multiple,
                  DisableClearable
                >
              }
              onChange={(event, newValue, reason, details) => {
                const newValueKey = multiple
                  ? (Array.isArray(newValue) ? newValue : []).map(
                    (item: CountryDetails) => item[valueKey]
                  )
                  : !Array.isArray(newValue) && newValue !== null
                    ? newValue[valueKey]
                    : null;
                const storedValue = newValueKey as AutocompleteNewValue<Multiple, DisableClearable>;
                if (customOnChange) {
                  customOnChange({
                    rhfOnChange,
                    newValue: storedValue,
                    event,
                    reason,
                    details
                  });
                  return;
                }
                rhfOnChange(storedValue);
                onValueChange?.({
                  newValue: storedValue,
                  event,
                  reason,
                  details
                });
              }}
              onBlur={blurEvent => {
                rhfOnBlur();
                onBlur?.(blurEvent);
              }}
              autoHighlight
              blurOnSelect={!multiple}
              disableCloseOnSelect={multiple}
              disableClearable={disableClearable}
              fullWidth
              disabled={rhfDisabled}
              limitTags={2}
              getLimitTagsText={more =>
                more === 1 ? '+1 Country' : `+${more} Countries`}
              getOptionKey={option => option[valueKey]}
              getOptionLabel={option => option.name}
              isOptionEqualToValue={(option, value) =>
                option[valueKey] === value[valueKey]}
              renderInput={params => {
                const {
                  InputProps,
                  inputProps,
                  disabled: paramsDisabled,
                  ...otherInputParams
                } = params ?? {};
                const {
                  autoComplete = defaultAutocompleteValue,
                  ...otherTextFieldProps
                } = textFieldProps ?? {};
                const textFieldInputProps = {
                  ...inputProps,
                  'aria-required': required,
                  'aria-invalid': isError,
                  'aria-labelledby': isLabelAboveFormField
                    ? labelId
                    : undefined,
                  'aria-describedby': showHelperTextElement
                    ? isError
                      ? errorId
                      : helperTextId
                    : undefined,
                  autoComplete
                };
                return (
                  <TextField
                    name={rhfFieldName}
                    inputRef={mergeRefs(rhfRef, ref)}
                    disabled={paramsDisabled || rhfDisabled}
                    {...otherTextFieldProps}
                    {...otherInputParams}
                    label={
                      !isLabelAboveFormField
                        ? (
                          <FormLabelText label={fieldLabel} required={required} />
                        )
                        : undefined
                    }
                    error={isError}
                    slotProps={{
                      ...textFieldProps?.slotProps,
                      input: {
                        ...InputProps,
                        ...textFieldProps?.slotProps?.input
                      },
                      htmlInput: textFieldInputProps
                    }}
                  />
                );
              }}
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ display: 'flex', alignItems: 'center' }}
                  {...props}
                >
                  {renderOptionLabel?.(option) ?? (
                    <CountryMenuItem countryInfo={option} />
                  )}
                </Box>
              )}
              slotProps={{
                ...slotProps,
                chip: ChipProps
              }}
              {...otherAutoCompleteProps}
            />
            <FormHelperText
              error={isError}
              errorMessage={fieldErrorMessage}
              hideErrorMessage={hideErrorMessage}
              helperText={helperText}
              showHelperTextElement={showHelperTextElement}
              formHelperTextProps={{
                id: isError ? errorId : helperTextId,
                ...formHelperTextProps
              }}
            />
          </FormControl>
        );
      }}
    />
  );
});

const RHFCountrySelect = RHFCountrySelectInner as <
  T extends FieldValues,
  Multiple extends boolean = false,
  DisableClearable extends boolean = false
>(
  props: RHFCountrySelectProps<T, Multiple, DisableClearable> & {
    ref?: Ref<HTMLInputElement>;
  }
) => JSX.Element;

export type { CountryISO, CountryDetails };
export { countryList };
export default RHFCountrySelect;
