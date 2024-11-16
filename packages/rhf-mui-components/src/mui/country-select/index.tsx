import { useContext, Fragment, ReactNode } from 'react';
import {
  UseFormRegister,
  RegisterOptions,
  Path,
  FieldValues
} from 'react-hook-form';
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
import { countryList } from './countries';
import Divider from '@mui/material/Divider';

type OptionValue = string;
type SelectValueType = OptionValue | OptionValue[];

type SelectInputProps = Omit<
  SelectProps,
  'name' | 'id' | 'labelId' | 'error' | 'onChange' | 'value' | 'defaultValue'
>;

export type RHFCountrySelectProps<T extends FieldValues> = {
  fieldName: Path<T>;
  register: UseFormRegister<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  countries?: CountryDetails[];
  preferredCountries?: string[];
  defaultValue?: SelectValueType;
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
  showDefaultOption,
  defaultOptionText,
  onValueChange,
  label,
  showLabelAboveFormField,
  formLabelProps,
  multiple,
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

  /**
   * Render preferred countries at the top of the list.
   * Preferred countries will maintain the order in which they were
   * specified in the props, while other countries will be sorted
   * alphabetically.
   */
  if (preferredCountries?.length) {
    countriesToListAtTop = countryOptions.filter((country) =>
      preferredCountries.includes(country.iso)
    );
    countriesToListAtTop.sort((a, b) => {
      return (
        preferredCountries.indexOf(a.iso) - preferredCountries.indexOf(b.iso)
      );
    });

    countriesToList = countryOptions.filter(
      (country) => !preferredCountries.includes(country.iso)
    );
  }

  const CountryMenuItem = ({ countryInfo }: CountryMenuItemProps) => {
    return (
      <MenuItem
        key={countryInfo.iso}
        value={countryInfo.iso}
        sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        <Typography variant="h5" component="span">
          {countryInfo.emoji}
        </Typography>
        <Typography>{countryInfo.name}</Typography>
      </MenuItem>
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
          <InputLabel id={fieldName}>{fieldLabel}</InputLabel>
        )}
      </Fragment>
      <MuiSelect
        id={fieldName}
        labelId={isLabelAboveFormField ? undefined : fieldName}
        label={isLabelAboveFormField ? undefined : fieldName}
        defaultValue={defaultValue ?? (multiple ? [] : '')}
        error={isError}
        multiple={multiple}
        renderValue={(iso) => {
          const country = countryList.find((c) => c.iso === iso);
          // return <CountryMenuItem countryInfo={country!} />
          return (
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Typography variant="h5" component="span">
                {country?.emoji}
              </Typography>
              <Typography>{country?.name}</Typography>
            </span>
          );
        }}
        onChange={(e) => {
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
        {countriesToListAtTop.map((countryInfo) => {
          return (
            <CountryMenuItem countryInfo={countryInfo} key={countryInfo.iso} />
          );
          // return (
          //   <MenuItem
          //     key={countryInfo.iso}
          //     value={countryInfo.iso}
          //     sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          //   >
          //     <Typography variant="h5" component="span">
          //       {countryInfo.emoji}
          //     </Typography>
          //     <Typography>{countryInfo.name}</Typography>
          //   </MenuItem>
          // );
        })}

        {countriesToListAtTop.length > 0 && <Divider />}

        {countriesToList.map((countryInfo) => {
          // return (
          //   <CountryMenuItem countryInfo={countryInfo} key={countryInfo.iso} />
          // );
          return (
            <MenuItem
              key={countryInfo.iso}
              value={countryInfo.iso}
              sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <Typography variant="h5" component="span">
                {countryInfo.emoji}
              </Typography>
              <Typography>{countryInfo.name}</Typography>
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

export default RHFCountrySelect;
