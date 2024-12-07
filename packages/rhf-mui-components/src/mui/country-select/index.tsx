import { useContext, ReactNode, SyntheticEvent, useMemo } from 'react';
import {
  FieldValues,
  Path,
  Controller,
  Control,
  RegisterOptions
} from 'react-hook-form';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Autocomplete, {
  AutocompleteProps,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import { FormControl, FormLabel, FormLabelText, FormHelperText } from '@/mui/common';
import {
  TrueOrFalse,
  CountryDetails,
  CountryISO,
  FormLabelProps,
  FormHelperTextProps,
  AutoCompleteTextFieldProps
} from '@/types';
import { fieldNameToLabel, isMuiV5, keepLabelAboveFormField } from '@/utils';
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
  ChipProps,
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
        render={({ field: { value, onChange, ...otherFieldProps } }) => {
          const selectedCountries = multiple
            ? (value ?? [])
              .map(val => countrySelectOptions.find(country => country[valueKey] === val))
              .filter((country): country is CountryDetails => Boolean(country))
            : countrySelectOptions.find(country => country[valueKey] === value) || null;

          return (
            /**
             * Added ts-ignore as slotProps.chips doesnt
             * exist in MUI5 for autocomplete
             */
            // @ts-ignore
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
                      !isLabelAboveFormField ? (
                        <FormLabelText label={fieldLabel} required={required} />
                      ) : undefined
                    }
                    error={isError}
                    {...(!isMuiV5
                      ? {
                        slotProps: {
                          htmlInput: textFieldInputProps
                        }
                      }
                      : {
                        inputProps: textFieldInputProps
                      }
                    )}
                  />
                );
              }}
              {...(!isMuiV5
                ? { slotProps: { chip: ChipProps } }
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
