import { useContext, ReactNode } from 'react';
import {
  UseFormRegister,
  RegisterOptions,
  Path,
  FieldValues
} from 'react-hook-form';
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
import {
  SelectChangeEvent,
  InputLabel
} from '@mui/material';

type CountryMenuItemProps = {
  countryInfo: CountryDetails;
};

type SelectValueType = string;

type AutoCompleteProps = Omit<
  AutocompleteProps<CountryDetails, false, false, false>,
  'freeSolo' | 'fullWidth' | 'id' | 'renderInput' | 'options'
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
  textFieldProps?: AutoCompleteTextFieldProps;
} & AutoCompleteProps;

const RHFCountrySelect = <T extends FieldValues>({
  fieldName,
  register,
  registerOptions,
  countries,
  preferredCountries,
  defaultValue,
  disabled,
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

  const { onChange, ...otherRegisterProps } = register(fieldName, registerOptions);
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
        autoHighlight
        blurOnSelect
        disabled={disabled}
        limitTags={2}
        getLimitTagsText={more => more === 1 ? `+1 Country`: `+${more} Countries`}
        options={[...countriesToListAtTop, ...countriesToList]}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) =>
          option[valueKey] === value[valueKey]
        }
        // autoComplete
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
            disabled={disabled}
            error={isError}
            {...(isMuiV6
              ? {
                  slotProps: {
                    htmlInput: {
                      ...params.inputProps,
                      autoComplete: fieldName
                    },
                  },
                }
              : {
                  inputProps: {
                    ...params.inputProps,
                    autoComplete: fieldName
                  },
                })}
          />
        )}
        {...otherAutoCompleteProps}
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
