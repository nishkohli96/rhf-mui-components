import { useContext, Fragment, ReactNode } from 'react';
import { UseFormRegister, RegisterOptions, Path, FieldValues } from 'react-hook-form';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import { FormControl, FormLabel, FormHelperText } from '@/mui/common';
import { CountryDetails } from '@/types';
import { fieldNameToLabel, keepLabelAboveFormField } from '@/utils';
import { countryList } from './countries';
import { SelectChangeEvent, FormLabelProps, FormHelperTextProps, InputLabel } from '@mui/material';

type CountryMenuItemProps = {
  countryInfo: CountryDetails;
};

type SelectValueType = string;

export type RHFCountrySelectProps<T extends FieldValues> = {
  fieldName: Path<T>;
  register: UseFormRegister<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  label?: ReactNode;
  countries?: CountryDetails[];
  preferredCountries?: string[];
  defaultValue?: SelectValueType;
  valueKey?: keyof Omit<CountryDetails, 'emoji'>;
  showDefaultOption?: boolean;
  defaultOptionText?: string;
  onValueChange?: (e: SelectChangeEvent<SelectValueType>) => void;
  showLabelAboveFormField?: boolean;
  formLabelProps?: FormLabelProps;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
} & AutocompleteProps<CountryDetails, false, false, false>

const RHFCountrySelect = <T extends FieldValues>({
  fieldName,
  register,
  registerOptions,
  countries,
  preferredCountries,
  defaultValue,
  valueKey = 'iso',
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
  ...otherSelectProps
}: RHFCountrySelectProps<T>) => {
  const { allLabelsAboveFormField } = useContext(RHFMuiConfigContext);
  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFormField
  );
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isError = Boolean(errorMessage);

  const { onChange, ...rest } = register(fieldName, registerOptions);
  const countryOptions = countries ?? countryList;
  let countriesToList = countryOptions;
  let countriesToListAtTop: CountryDetails[] = [];

  if (preferredCountries?.length) {
    countriesToListAtTop = countryOptions.filter(country =>
      preferredCountries.includes(country[valueKey])
    );
    countriesToListAtTop.sort((a, b) => preferredCountries.indexOf(a[valueKey]) - preferredCountries.indexOf(b[valueKey]));
    countriesToList = countryOptions.filter(country => !preferredCountries.includes(country[valueKey]));
  }

  const CountryMenuItem = ({ countryInfo }: CountryMenuItemProps) => (
    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Typography variant="h5" component="span">
        {countryInfo.emoji}
      </Typography>
      <Typography>{countryInfo.name}</Typography>
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
      <Autocomplete
        id={fieldName}
        fullWidth
        options={[...countriesToListAtTop, ...countriesToList]}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option[valueKey] === value[valueKey]}
        autoHighlight
        renderOption={(props, option) => (
          <Box component="li" sx={{ display: 'flex', alignItems: 'center' }} {...props}>
            <CountryMenuItem countryInfo={option} />
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Choose a country"
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password',
            }}
          />
        )}
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
