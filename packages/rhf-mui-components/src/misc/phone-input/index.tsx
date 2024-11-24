/**
 * Code Reference -
 * https://react-international-phone.vercel.app/docs/Advanced%20Usage/useWithUiLibs
 */

import { useContext, ReactNode } from 'react';
import {
  FieldValues,
  Path,
  PathValue,
  Controller,
  Control,
  RegisterOptions
} from 'react-hook-form';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Divider from '@mui/material/Divider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import {
  CountryData,
  CountryIso2,
  defaultCountries,
  FlagImage,
  parseCountry,
  ParsedCountry,
  usePhoneInput,
  UsePhoneInputConfig
} from 'react-international-phone';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import { FormControl, FormLabel, FormHelperText } from '@/mui/common';
import { FormLabelProps, FormHelperTextProps } from '@/types';
import { fieldNameToLabel, keepLabelAboveFormField } from '@/utils';
import 'react-international-phone/style.css';

type PhoneInputChangeReturnValue = {
  phone: string;
  inputValue: string;
  country: ParsedCountry;
};

type InputTextFieldProps = Omit<
  TextFieldProps,
  | 'name'
  | 'value'
  | 'defaultValue'
  | 'onChange'
  | 'error'
  | 'InputProps'
  | 'inputRef'
  | 'type'
>;

type PhoneInputProps = Omit<UsePhoneInputConfig, 'value' | 'onChange'> & {
  hideDropdown?: boolean;
};

export type RHFPhoneInputProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  value?: string;
  onValueChange?: (phoneData: PhoneInputChangeReturnValue) => void;
  showLabelAboveFormField?: boolean;
  formLabelProps?: FormLabelProps;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
  phoneInputProps?: PhoneInputProps;
} & InputTextFieldProps;

const RHFPhoneInput = <T extends FieldValues>({
  fieldName,
  control,
  registerOptions,
  value,
  onValueChange,
  label,
  showLabelAboveFormField,
  formLabelProps,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  disabled,
  phoneInputProps,
  ...rest
}: RHFPhoneInputProps<T>) => {
  const { allLabelsAboveFields } = useContext(RHFMuiConfigContext);
  const isError = Boolean(errorMessage);
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );

  const {
    countries,
    hideDropdown,
    preferredCountries,
    forceDialCode,
    ...otherPhoneInputProps
  } = phoneInputProps ?? {};

  const countryOptions = countries ?? defaultCountries;
  let countriesToList = countryOptions;
  let countriesToListAtTop: CountryData[] = [];

  /**
   * Render preferred countries at the top of the list.
   * Preferred countries will maintain the order in which they were
   * specified in the props, while other countries will be sorted
   * alphabetically.
   */
  if (preferredCountries?.length) {
    countriesToListAtTop = countryOptions.filter(country =>
      preferredCountries.includes(parseCountry(country).iso2));
    countriesToListAtTop.sort((a, b) => {
      return (
        preferredCountries.indexOf(parseCountry(a).iso2)
        - preferredCountries.indexOf(parseCountry(b).iso2)
      );
    });

    countriesToList = countryOptions.filter(
      country => !preferredCountries.includes(parseCountry(country).iso2)
    );
  }

  const { inputValue, handlePhoneValueChange, inputRef, country, setCountry }
    = usePhoneInput({
      ...otherPhoneInputProps,
      value,
      onChange: (phoneData: PhoneInputChangeReturnValue) => {
        if (onValueChange) {
          onValueChange(phoneData);
        }
      },
      countries: countryOptions,
      preferredCountries,
      forceDialCode: hideDropdown ?? forceDialCode
    });

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
        defaultValue={inputValue as PathValue<T, Path<T>>}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              {...rest}
              value={inputValue}
              autoComplete={fieldName}
              type="tel"
              onChange={e => {
                handlePhoneValueChange(e);
                field.onChange(e.target.value);
              }}
              inputRef={ref => {
                field.ref(ref);
                inputRef.current = ref;
              }}
              label={!isLabelAboveFormField ? fieldLabel : undefined}
              error={isError}
              disabled={disabled}
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    style={{ marginRight: '2px', marginLeft: '-8px' }}
                  >
                    <Select
                      MenuProps={{
                        style: {
                          height: '300px',
                          width: '360px',
                          top: '10px',
                          left: '-34px'
                        },
                        transformOrigin: {
                          vertical: 'top',
                          horizontal: 'left'
                        }
                      }}
                      sx={{
                        width: 'max-content',
                        fieldset: {
                          display: 'none'
                        },
                        '&.Mui-focused:has(div[aria-expanded="false"])': {
                          fieldset: {
                            display: 'block'
                          }
                        },
                        '.MuiSelect-select': {
                          padding: '8px',
                          paddingRight: '24px !important'
                        },
                        svg: {
                          right: 0
                        }
                      }}
                      value={country.iso2}
                      disabled={disabled || hideDropdown}
                      onChange={e => {
                        setCountry(e.target.value as CountryIso2);
                      }}
                      renderValue={value => (
                        <FlagImage iso2={value} style={{ display: 'flex' }} />
                      )}
                    >
                      {countriesToListAtTop.map(c => {
                        const countryInfo = parseCountry(c);
                        return (
                          <MenuItem
                            key={countryInfo.iso2}
                            value={countryInfo.iso2}
                          >
                            <FlagImage
                              iso2={countryInfo.iso2}
                              style={{ marginRight: '8px' }}
                            />
                            <Typography marginRight="8px">
                              {countryInfo.name}
                            </Typography>
                            <Typography color="gray">
                              +
                              {countryInfo.dialCode}
                            </Typography>
                          </MenuItem>
                        );
                      })}
                      {countriesToListAtTop.length > 0 && <Divider />}
                      {countriesToList.map(c => {
                        const countryInfo = parseCountry(c);
                        return (
                          <MenuItem
                            key={countryInfo.iso2}
                            value={countryInfo.iso2}
                          >
                            <FlagImage
                              iso2={countryInfo.iso2}
                              style={{ marginRight: '8px' }}
                            />
                            <Typography marginRight="8px">
                              {countryInfo.name}
                            </Typography>
                            <Typography color="gray">
                              +
                              {countryInfo.dialCode}
                            </Typography>
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </InputAdornment>
                )
              }}
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

export default RHFPhoneInput;
