import { useContext, ReactNode, SyntheticEvent, useMemo } from 'react';
import { Controller, Control, Path, FieldValues, RegisterOptions, PathValue } from 'react-hook-form';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { FormLabelProps } from '@mui/material/FormLabel';
import { FormHelperTextProps } from '@mui/material/FormHelperText';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import { FormControl, FormLabel, FormHelperText } from '@/mui/common';
import { CountryDetails, CountryISO } from '@/types';
import { fieldNameToLabel, isMuiV6, keepLabelAboveFormField } from '@/utils';
import { countryList } from './countries';

type CountryMenuItemProps = {
  countryInfo: CountryDetails;
};

type SelectValueType = string | string[];

type AutoCompleteProps = Omit<
  AutocompleteProps<CountryDetails, true | false, false, false>,
  | 'freeSolo'
  | 'fullWidth'
  | 'id'
  | 'renderInput'
  | 'options'
  | 'value'
  | 'defaultValue'
  | 'disabled'
>;

type AutoCompleteTextFieldProps = Omit<
  TextFieldProps,
  | 'value'
  | 'onChange'
  | 'disabled'
  | 'inputProps'
  | 'slotProps'
  | 'label'
  | 'error'
>

export type RHFCountrySelectProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  label?: ReactNode;
  countries?: CountryDetails[];
  preferredCountries?: CountryISO[];
  defaultValue?: SelectValueType;
  valueKey?: keyof Omit<CountryDetails, 'emoji'>;
  disabled?: boolean;
  onValueChange?: (e: SyntheticEvent, newValue: CountryDetails | CountryDetails[] | null) => void;
  showLabelAboveFormField?: boolean;
  formLabelProps?: FormLabelProps;
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
  defaultValue,
  disabled,
  onValueChange,
  label,
  showLabelAboveFormField,
  formLabelProps,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  multiple,
  textFieldProps,
  ...otherAutoCompleteProps
}: RHFCountrySelectProps<T>) => {
  const { allLabelsAboveFormField } = useContext(RHFMuiConfigContext);
  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFormField
  );
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isError = Boolean(errorMessage);

  const initialValue = multiple
    ? Array.isArray(defaultValue) ? defaultValue : []
    : defaultValue;
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
        error={isError}
        formLabelProps={formLabelProps}
      />
      <Controller
        name={fieldName}
        control={control}
        rules={registerOptions}
        defaultValue={initialValue as PathValue<T, Path<T>>}
        render={({ field: { value, onChange, ...otherFieldProps } }) => {
          const selectedCountries = multiple
            ? (value ?? [])
              .map(val => countrySelectOptions.find(country => country[valueKey] === val))
              .filter((country): country is CountryDetails => Boolean(country))
            : countrySelectOptions.find(country => country[valueKey] === value) || null;

          return (
            <Autocomplete
              {...otherFieldProps}
              id={fieldName}
              fullWidth
              options={countrySelectOptions}
              value={selectedCountries}
              onChange={(e, newValue) => {
                const newValueKey = Array.isArray(newValue)
                  ? (newValue ?? []).map(item => item[valueKey])
                  : (newValue)?.[valueKey] ?? '';
                onChange(newValueKey);
                if (onValueChange) {
                  onValueChange(e, newValue);
                }
              }}
              multiple={multiple}
              autoHighlight
              blurOnSelect
              disabled={disabled}
              limitTags={2}
              getLimitTagsText={more =>
                more === 1 ? '+1 Country' : `+${more} Countries`}
              getOptionLabel={option => option.name}
              isOptionEqualToValue={(option, value) =>
                option[valueKey] === (value as CountryDetails)[valueKey]}
              renderOption={({ key, ...props }, option) => (
                <Box
                  component="li"
                  key={option.iso}
                  sx={{ display: 'flex', alignItems: 'center' }}
                  {...props}
                >
                  <CountryMenuItem countryInfo={option} />
                </Box>
              )}
              renderInput={params => (
                <TextField
                  {...textFieldProps}
                  {...params}
                  label={!isLabelAboveFormField ? fieldLabel : undefined}
                  error={isError}
                  {...(isMuiV6
                    ? {
                      slotProps: {
                        htmlInput: { ...params.inputProps, autoComplete: fieldName },
                      },
                    }
                    : { inputProps: { ...params.inputProps, autoComplete: fieldName } })}
                />
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

export type { CountryISO };
export { countryList };
export default RHFCountrySelect;
