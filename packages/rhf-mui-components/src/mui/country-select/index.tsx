'use client';

import {
  useContext,
  useMemo,
  forwardRef,
  type JSX,
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

type CountrySelectStoredPrimitive = CountryDetails[
  keyof Omit<CountryDetails, 'emoji'>
];

type CountrySelectStoredItem = CountryDetails | CountrySelectStoredPrimitive;

type CountrySelectStoredValue<
  Multiple extends boolean,
  DisableClearable extends boolean
> = [Multiple] extends [true]
  ? CountrySelectStoredItem[]
  : [DisableClearable] extends [true]
    ? CountrySelectStoredItem
    : CountrySelectStoredItem | null;

type OnValueChangeProps<
  Multiple extends boolean,
  DisableClearable extends boolean
> = {
  newValue: CountrySelectStoredValue<Multiple, DisableClearable>;
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
  | 'getOptionLabel'
  | 'isOptionEqualToValue'
  | 'blurOnSelect'
  | 'disableClearable'
  | 'disableCloseOnSelect'
  | 'ChipProps'
  | 'loading'
  | 'ref'
>;

export type RHFCountrySelectProps<
  T extends FieldValues,
  Multiple extends boolean = false,
  DisableClearable extends boolean = false
> = {
  /**
   * Name/path of the React Hook Form field this component controls.
   */
  fieldName: Path<T>;
  /**
   * React Hook Form control object returned by `useForm`.
   */
  control: Control<T>;
  /**
   * Validation rules passed to React Hook Form for this field.
   */
  registerOptions?: RegisterOptions<T, Path<T>>;
  /**
   * List of countries to display in the country selector.
   *
   * Defaults to all countries from `countryList`.
   */
  countries?: CountryDetails[];
  /**
   * If `true`, allow selection of more than one countries.
   */
  multiple?: Multiple;
  /**
   * List of country ISO codes to pin at the top of the dropdown.
   *
   * Countries are displayed in the same order as provided in this array,
   * followed by the remaining countries sorted in their default order.
   *
   * @example
   * preferredCountries={['US', 'CA', 'IN']}
   */
  preferredCountries?: CountryISO[];
  /**
   * - When `valueKey` is provided, selected value(s) are stored using the
   *   specified country property.
   * - When `valueKey` is omitted, selected value(s) are stored as complete
   *   country objects.
   */
  valueKey?: keyof Omit<CountryDetails, 'emoji'>;
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
   * @param newValue - Value(s) written to the form: full country object(s) when `valueKey` is omitted, primitives from `valueKey` when it is provided, or `null` when clearable and cleared.
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
    CountrySelectStoredValue<Multiple, DisableClearable>
  >) => void;
  /**
   * Called after the field value changes with the normalized value payload.
   */
  onValueChange?: ({
    newValue,
    event,
    reason,
    details
  }: OnValueChangeProps<Multiple, DisableClearable>) => void;
  /**
   * When true, the selected value cannot be cleared from the input.
   * @default false
   */
  disableClearable?: DisableClearable;
  /**
   * Label content shown for the field. Defaults to a label generated from `fieldName`.
   */
  label?: ReactNode;
  /**
   * When true, renders the field label above the form field instead of inside or beside it.
   */
  showLabelAboveFormField?: boolean;
  /**
   * Props forwarded to the internal `FormLabel`. The `id` is managed by the component.
   */
  formLabelProps?: Omit<FormLabelProps, 'id'>;
  /**
   * When true, visually hides the field label while preserving accessible labeling where possible.
   */
  hideLabel?: boolean;
  /**
   * Customize how each country option is displayed in the dropdown menu.
   */
  renderOptionLabel?: (option: CountryDetails) => ReactNode;
  /**
   * When true, marks the field as required in the UI and accessibility attributes.
   */
  required?: boolean;
  /**
   * Helper text shown below the field when there is no visible validation error.
   */
  helperText?: ReactNode;
  /**
   * @deprecated
   * Field error message is now automatically derived from form state.
   * Passing this prop is no longer necessary and it will be removed in the next major version.
   */
  errorMessage?: ReactNode;
  /**
   * If true, hides the error message text while keeping the field in an error state.
   */
  hideErrorMessage?: boolean;
  /**
   * Props forwarded to the internal `FormHelperText`. The `id` is managed by the component.
   */
  formHelperTextProps?: Omit<FormHelperTextProps, 'id'>;
  /**
   * Props forwarded to the internal MUI `TextField` used to render the input.
   */
  textFieldProps?: AutoCompleteTextFieldProps;
  /**
   * Props forwarded to chips rendered for selected values.
   */
  ChipProps?: MuiChipProps;
  /**
   * Custom ids for generated field, label, helper text, and error elements.
   */
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
  valueKey,
  disabled: muiDisabled,
  autoHighlight = true,
  customOnChange,
  onValueChange,
  label,
  showLabelAboveFormField,
  formLabelProps,
  hideLabel,
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
  onBlur: muiOnBlur,
  disableClearable,
  customIds,
  limitTags = 2,
  getLimitTagsText,
  getOptionKey,
  ...otherCountrySelectProps
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
    if (!valueKey) {
      return null;
    }
    const map = new Map<CountrySelectStoredPrimitive, CountryDetails>();
    countrySelectOptions.forEach(country => {
      map.set(country[valueKey], country);
    });
    return map;
  }, [countrySelectOptions, valueKey]);

  return (
    <Controller
      name={fieldName}
      control={control}
      rules={registerOptions}
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
        const isDisabled = muiDisabled || rhfDisabled;
        const fieldErrorMessage
          = fieldStateError?.message?.toString() ?? errorMessage;
        const isError = !!fieldErrorMessage;
        const showHelperTextElement = !!(
          helperText
          || (isError && !hideErrorMessage)
        );

        const fieldValue = rhfValue as CountrySelectStoredValue<
          Multiple,
          DisableClearable
        >;
        const selectedCountries = multiple
          ? Array.isArray(fieldValue)
            ? valueKey && countryMap
              ? fieldValue
                .map(val => countryMap.get(val as CountrySelectStoredPrimitive))
                .filter((country): country is CountryDetails => !!country)
              : fieldValue
            : []
          : valueKey && countryMap
            ? countryMap.get(fieldValue as CountrySelectStoredPrimitive) ?? null
            : fieldValue ?? null;

        return (
          <FormControl error={isError} disabled={isDisabled}>
            {!hideLabel && (
              <FormLabel
                label={fieldLabel}
                isVisible={isLabelAboveFormField}
                required={required}
                error={isError}
                disabled={isDisabled}
                formLabelProps={{
                  ...formLabelProps,
                  id: labelId,
                  htmlFor: fieldId
                }}
              />
            )}
            <Autocomplete
              {...otherCountrySelectProps}
              id={fieldId}
              options={countrySelectOptions}
              multiple={multiple}
              freeSolo={false}
              value={
                selectedCountries as CountrySelectFieldValue<
                  Multiple,
                  DisableClearable
                >
              }
              disabled={isDisabled}
              onChange={(event, newValue, reason, details) => {
                const storedValue = (
                  multiple
                    ? Array.isArray(newValue)
                      ? valueKey
                        ? newValue.map(item => item[valueKey])
                        : newValue
                      : []
                    : !Array.isArray(newValue) && newValue !== null
                      ? valueKey
                        ? newValue[valueKey]
                        : newValue
                      : null
                ) as CountrySelectStoredValue<Multiple, DisableClearable>;
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
                muiOnBlur?.(blurEvent);
              }}
              autoHighlight={autoHighlight}
              blurOnSelect={!multiple}
              disableCloseOnSelect={multiple}
              disableClearable={disableClearable}
              fullWidth
              limitTags={limitTags}
              getLimitTagsText={more => getLimitTagsText?.(more) ?? ( more === 1 ? '+1 Country' : `+${more} Countries`)}
              getOptionKey={getOptionKey ?? (option => String(
                valueKey ? option[valueKey] : option.iso
              ))}
              getOptionLabel={option => option.name}
              isOptionEqualToValue={(option, value) =>
                valueKey
                  ? option[valueKey] === value[valueKey]
                  : option.iso === value.iso}
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
                  'aria-labelledby': !hideLabel && isLabelAboveFormField
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
                    disabled={paramsDisabled}
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
              renderOption={({ key, ...optionProps }, option) => (
                <Box
                  component="li"
                  key={key}
                  sx={{ display: 'flex', alignItems: 'center' }}
                  {...optionProps}
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
            />
            <FormHelperText
              error={isError}
              errorMessage={fieldErrorMessage}
              hideErrorMessage={hideErrorMessage}
              helperText={helperText}
              showHelperTextElement={showHelperTextElement}
              formHelperTextProps={{
                ...formHelperTextProps,
                id: isError ? errorId : helperTextId
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
