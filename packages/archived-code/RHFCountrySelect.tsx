import { useContext, Fragment, ReactNode } from 'react';
import {
  UseFormRegister,
  RegisterOptions,
  Path,
  FieldValues
} from 'react-hook-form';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import { FormLabelProps } from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import { FormHelperTextProps } from '@mui/material/FormHelperText';
import MuiSelect, {
  SelectChangeEvent,
  SelectProps
} from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import { FormControl, FormLabel, FormHelperText } from '@/mui/common';
import { CountryDetails } from '@/types';
import { fieldNameToLabel, keepLabelAboveFormField } from '@/utils';
import { countryList } from '../rhf-mui-components/src/mui/country-select/countries';

type SelectValueType = string;

type SelectInputProps = Omit<
  SelectProps,
  'name' | 'id' | 'labelId' | 'error' | 'onChange' | 'value' | 'defaultValue' | 'multiple'
>;

export type RHFCountrySelectProps<T extends FieldValues> = {
  fieldName: Path<T>;
  register: UseFormRegister<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  countries?: CountryDetails[];
  preferredCountries?: string[];
  defaultValue?: SelectValueType;
  valueKey?: keyof Omit<CountryDetails, 'emoji'>;
  showDefaultOption?: boolean;
  defaultOptionText?: string;
  onValueChange?: (e: SelectChangeEvent<SelectValueType>) => void;
  showLabelAboveFormField?: boolean;
  formLabelProps?: Omit<FormLabelProps, 'error'>;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: Omit<FormHelperTextProps, 'children' | 'error'>;
} & SelectInputProps;

type CountryMenuItemProps = {
  countryInfo: CountryDetails;
};

const RHFCountrySelect = <T extends FieldValues>({
  fieldName,
  register,
  registerOptions,
  countries,
  preferredCountries,
  defaultValue,
  valueKey,
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
  const countryValueKey = valueKey ?? 'iso';

  const { onChange, ...rest } = register(fieldName, registerOptions);

  const countryOptions = countries ?? countryList;
  let countriesToList = countryOptions;
  let countriesToListAtTop: CountryDetails[] = [];

  /**
   * Render preferred countries at the top of the list.
   * Preferred countries will maintain the order in which they were
   * specified in the props, while other countries will be sorted
   * alphabetically.
   */
  if (preferredCountries?.length) {
    countriesToListAtTop = countryOptions.filter(country =>
      preferredCountries.includes(country[countryValueKey]));
    countriesToListAtTop.sort((a, b) => {
      return (
        preferredCountries.indexOf(a[countryValueKey]) - preferredCountries.indexOf(b[countryValueKey])
      );
    });

    countriesToList = countryOptions.filter(
      country => !preferredCountries.includes(country[countryValueKey])
    );
  }

  const CountryMenuItem = ({ countryInfo }: CountryMenuItemProps) => {
    return (
      <span
        style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        <Typography variant="h5" component="span">
          {countryInfo.emoji}
        </Typography>
        <Typography>
          {countryInfo.name}
        </Typography>
      </span>
    );
  };

  return (
    <FormControl error={isError}>
      <FormLabel
        label={fieldLabel}
        isVisible={isLabelAboveFormField}
        error={isError}
        formLabelProps={formLabelProps}
      />
      <Fragment>
        {!isLabelAboveFormField && (
          <InputLabel id={fieldName}>
            {fieldLabel}
          </InputLabel>
        )}
      </Fragment>
      <MuiSelect
        id={fieldName}
        labelId={isLabelAboveFormField ? undefined : fieldName}
        label={isLabelAboveFormField ? undefined : fieldName}
        defaultValue={defaultValue ?? ''}
        error={isError}
        renderValue={value => {
          const country = countryList.find(c => c[countryValueKey] === value);
          return (
            <Box sx={{ display: 'flex', alignItems: 'center', height: '23px' }}>
              <CountryMenuItem countryInfo={country!} />
            </Box>
          );
        }}
        onChange={e => {
          onChange(e);
          if (onValueChange) {
            onValueChange(e);
          }
        }}
        {...otherSelectProps}
        {...rest}
      >
        <MenuItem
          value=""
          disabled
          sx={{ display: showDefaultOption ? 'block' : 'none' }}
        >
          {showDefaultOption ? defaultOptionText ?? `Select ${fieldLabel}` : ''}
        </MenuItem>
        {countriesToListAtTop.map(countryInfo => {
          return (
            <MenuItem key={countryInfo.iso} value={countryInfo[countryValueKey]}>
              <CountryMenuItem countryInfo={countryInfo} />
            </MenuItem>
          );
        })}
        {countriesToListAtTop.length > 0 && <Divider />}
        {countriesToList.map(countryInfo => {
          return (
            <MenuItem key={countryInfo.iso} value={countryInfo[countryValueKey]}>
              <CountryMenuItem countryInfo={countryInfo} />
            </MenuItem>
          );
        })}
      </MuiSelect>
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
