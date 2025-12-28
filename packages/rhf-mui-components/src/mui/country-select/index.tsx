import {
  useContext,
  useMemo,
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
import Typography from '@mui/material/Typography';
import Autocomplete, {
  type AutocompleteProps,
  type AutocompleteChangeDetails,
  type AutocompleteChangeReason,
} from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import { FormControl, FormLabel, FormLabelText, FormHelperText } from '@/common';
import type {
  TrueOrFalse,
  CountryDetails,
  CountryISO,
  FormLabelProps,
  FormHelperTextProps,
  AutoCompleteTextFieldProps,
  MuiChipProps
} from '@/types';
import { fieldNameToLabel, isAboveMuiV5, keepLabelAboveFormField } from '@/utils';
import { countryList } from './countries';

type CountryMenuItemProps = {
  countryInfo: CountryDetails;
};

type AutoCompleteProps = Omit<
  AutocompleteProps<CountryDetails, TrueOrFalse, TrueOrFalse, false>,
  | 'freeSolo'
  | 'fullWidth'
  | 'renderInput'
  | 'renderOption'
  | 'renderTags'
  | 'options'
  | 'value'
  | 'defaultValue'
  | 'onChange'
  | 'getOptionKey'
  | 'getOptionLabel'
  | 'isOptionEqualToValue'
  | 'autoHighlight'
  | 'blurOnSelect'
  | 'disableCloseOnSelect'
  | 'ChipProps'
>;

export type RHFCountrySelectProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  countries?: CountryDetails[];
  preferredCountries?: CountryISO[];
  valueKey?: keyof Omit<CountryDetails, 'emoji'>;
  onValueChange?: (
    newValue: CountryDetails | CountryDetails[] | null,
    event: SyntheticEvent,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<CountryDetails>
  ) => void;
  label?: ReactNode;
  showLabelAboveFormField?: boolean;
  formLabelProps?: FormLabelProps;
  required?: boolean;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
  textFieldProps?: AutoCompleteTextFieldProps;
  displayFlagOnSelect?: boolean;
  ChipProps?: MuiChipProps;
} & AutoCompleteProps;

const RHFCountrySelect = <T extends FieldValues>({
  fieldName,
  control,
  registerOptions,
  countries,
  preferredCountries,
  valueKey = 'iso',
  disabled,
  onValueChange,
  label,
  showLabelAboveFormField,
  formLabelProps,
  required,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  multiple,
  textFieldProps,
  displayFlagOnSelect,
  slotProps,
  ChipProps,
  onBlur,
  ...otherAutoCompleteProps
}: RHFCountrySelectProps<T>) => {
  const { allLabelsAboveFields } = useContext(RHFMuiConfigContext);
  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isError = Boolean(errorMessage);

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

  const CountryMenuItem = ({ countryInfo }: CountryMenuItemProps) => (
    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Typography variant="h5" component="span">
        {countryInfo.emoji}
      </Typography>
      <Typography>
        {countryInfo.name}
      </Typography>
    </span>
  );

  return (
    <FormControl error={isError}>
      <FormLabel
        label={fieldLabel}
        isVisible={isLabelAboveFormField}
        required={required}
        error={isError}
        formLabelProps={formLabelProps}
      />
      <Controller
        name={fieldName}
        control={control}
        rules={registerOptions}
        render={({ field: { value, onChange, onBlur: rhfOnBlur, ...otherFieldProps } }) => {
          const selectedCountries = multiple
            ? (value ?? [])
              .map(val => countrySelectOptions.find(country => country[valueKey] === val))
              .filter((country): country is CountryDetails => Boolean(country))
            : countrySelectOptions.find(country => country[valueKey] === value) || null;

          return (
            <Autocomplete
              {...otherFieldProps}
              id={fieldName}
              options={countrySelectOptions}
              multiple={multiple}
              value={selectedCountries}
              onChange={(event, newValue, reason, details) => {
                const newValueKey = Array.isArray(newValue)
                  ? (newValue ?? []).map(item => item[valueKey])
                  : (newValue)?.[valueKey] ?? '';
                onChange(newValueKey);
                if (onValueChange) {
                  onValueChange(newValue, event, reason, details);
                }
              }}
              onBlur={blurEvent => {
                rhfOnBlur();
                onBlur?.(blurEvent);
              }}
              autoHighlight
              blurOnSelect={!multiple}
              disableCloseOnSelect={multiple}
              fullWidth
              disabled={disabled}
              limitTags={2}
              getLimitTagsText={more =>
                more === 1 ? '+1 Country' : `+${more} Countries`}
              getOptionKey={option => option[valueKey]}
              getOptionLabel={option => option.name}
              isOptionEqualToValue={(option, value) =>
                option[valueKey] === value[valueKey]}
              renderInput={params => {
                const textFieldInputProps = {
                  ...params.inputProps,
                  autoComplete: fieldName
                };
                return (
                  <TextField
                    {...textFieldProps}
                    {...params}
                    label={
                      !isLabelAboveFormField
                        ? (
                          <FormLabelText label={fieldLabel} required={required} />
                        )
                        : undefined
                    }
                    error={isError}
                    {...(isAboveMuiV5
                      && {
                        slotProps: {
                          htmlInput: textFieldInputProps,
                        }
                      }
                    )}
                  />
                );
              }}
              renderOption={({ key, ...props }, option) => (
                <Box
                  component="li"
                  key={key}
                  sx={{ display: 'flex', alignItems: 'center' }}
                  {...props}
                >
                  <CountryMenuItem countryInfo={option} />
                </Box>
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => {
                  const { key, ...otherChipProps } = getTagProps({ index });
                  return (
                    <Chip
                      key={key}
                      {...otherChipProps}
                      label={displayFlagOnSelect
                        ? <CountryMenuItem countryInfo={option} />
                        : option.name}
                      {...ChipProps}
                    />
                  );
                })}
              {...(isAboveMuiV5
                ? { slotProps }
                : { ChipProps }
              )}
              {...otherAutoCompleteProps}
            />
          );
        }}
      />
      <FormHelperText
        error={isError}
        errorMessage={errorMessage}
        hideErrorMessage={hideErrorMessage}
        helperText={helperText}
        formHelperTextProps={formHelperTextProps}
      />
    </FormControl>
  );
};

export type { CountryISO, CountryDetails };
export { countryList };
export default RHFCountrySelect;
