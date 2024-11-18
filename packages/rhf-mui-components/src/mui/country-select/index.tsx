import { useContext, ReactNode, SyntheticEvent } from 'react';
import { Controller, Control, Path, FieldValues, RegisterOptions } from 'react-hook-form';
import muiPackage from '@mui/material/package.json';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { FormLabelProps } from '@mui/material/FormLabel';
import { FormHelperTextProps } from '@mui/material/FormHelperText';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import { FormControl, FormLabel, FormHelperText } from '@/mui/common';
import { CountryDetails } from '@/types';
import { fieldNameToLabel, keepLabelAboveFormField } from '@/utils';
import { countryList } from './countries';

type CountryMenuItemProps = {
  countryInfo: CountryDetails;
};

type SelectValueType = string | string[];

type AutoCompleteProps = Omit<
  AutocompleteProps<CountryDetails, false, false, false>,
  | 'freeSolo'
  | 'fullWidth'
  | 'id'
  | 'renderInput'
  | 'options'
  | 'defaultValue'
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
  preferredCountries?: string[];
  defaultValue?: SelectValueType;
  valueKey?: keyof Omit<CountryDetails, 'emoji'>;
  disabled?: boolean;
  showDefaultOption?: boolean;
  defaultOptionText?: string;
  onValueChange?: (e: SyntheticEvent, newValue: CountryDetails | null) => void;
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
  showDefaultOption,
  defaultOptionText,
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

  const countryOptions = countries ?? countryList;
  let countriesToList = countryOptions;
  let countriesToListAtTop: CountryDetails[] = [];

  if (preferredCountries?.length) {
    countriesToListAtTop = countryOptions.filter((country) =>
      preferredCountries.includes(country[valueKey])
    );
    countriesToListAtTop.sort(
      (a, b) =>
        preferredCountries.indexOf(a[valueKey]) -
        preferredCountries.indexOf(b[valueKey])
    );
    countriesToList = countryOptions.filter(
      (country) => !preferredCountries.includes(country[valueKey])
    );
  }

  const isMuiV6 = muiPackage.version.startsWith('6.');

  const CountryMenuItem = ({ countryInfo }: CountryMenuItemProps) => (
    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Typography variant="h5" component="span">
        {countryInfo.emoji}
      </Typography>
      <Typography>{countryInfo.name}</Typography>
    </span>
  );

  const countrySelectOptions = [...countriesToListAtTop, ...countriesToList];

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
        // @ts-ignore
        defaultValue={
          multiple
            ? Array.isArray(defaultValue) ? defaultValue : []
            : defaultValue
        }
        render={({ field: { value, onChange, ...otherFieldProps } }) => {
          // Map current value(s) to corresponding country objects
          const selectedCountries = multiple
            ? (value ?? []).map((val) =>
                countrySelectOptions.find((c) => c[valueKey] === val)
              ).filter(Boolean)
            : countrySelectOptions.find((c) => c[valueKey] === value) || null;

          return (
            <Autocomplete
              {...otherFieldProps}
              id={fieldName}
              fullWidth
              options={countrySelectOptions}
              // @ts-ignore
              value={selectedCountries}
              onChange={(e, newValue) => {
                const newValueKey = multiple
                // @ts-ignore
                  ? (newValue ?? []).map((item) => item[valueKey])
                  : (newValue as CountryDetails)?.[valueKey] || '';
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
              getLimitTagsText={(more) =>
                more === 1 ? `+1 Country` : `+${more} Countries`
              }
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) =>
                option[valueKey] === (value as CountryDetails)[valueKey]
              }
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ display: 'flex', alignItems: 'center' }}
                  {...props}
                >
                  <CountryMenuItem countryInfo={option} />
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...textFieldProps}
                  {...params}
                  label={!isLabelAboveFormField ? fieldLabel : undefined}
                  error={isError}
                  {...(muiPackage.version.startsWith('6.')
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

export { countryList };
export default RHFCountrySelect;
