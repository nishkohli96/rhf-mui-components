/**
 * Code Reference -
 * https://react-international-phone.vercel.app/docs/Advanced%20Usage/useWithUiLibs
 */

import { useContext, ReactNode } from 'react';
import { Path, FieldValues, UseFormSetValue, PathValue } from 'react-hook-form';
import { FormLabelProps } from '@mui/material/FormLabel';
import { FormHelperTextProps } from '@mui/material/FormHelperText';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
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
import { fieldNameToLabel } from '@/utils';
import { FormControl, FormLabel, FormHelperText } from '@/mui/common';
import 'react-international-phone/style.css';

type PhoneInputChangeReturnValue = {
  phone: string;
  inputValue: string;
  country: ParsedCountry;
};

type OmittedTextFieldProps = Omit<
  TextFieldProps,
  | 'name'
  | 'value'
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
  value?: string;
  setValue: UseFormSetValue<T>;
  onValueChange?: (phoneData: PhoneInputChangeReturnValue) => void;
  showLabelAboveFormField?: boolean;
  formLabelProps?: Omit<FormLabelProps, 'error'>;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: Omit<FormHelperTextProps, 'children' | 'error'>;
  phoneInputProps?: PhoneInputProps;
} & OmittedTextFieldProps;

const RHFPhoneInput = <T extends FieldValues>({
  fieldName,
  value,
  setValue,
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
  const { defaultFormLabelSx, defaultFormHelperTextSx }
    = useContext(RHFMuiConfigContext);
  const isError = Boolean(errorMessage);
  const fieldLabel = label ?? fieldNameToLabel(fieldName);

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
		countriesToListAtTop = countryOptions.filter((country) => 
			preferredCountries.includes(parseCountry(country).iso2)
		);
		countriesToListAtTop.sort((a, b) => {
			return (
				preferredCountries.indexOf(parseCountry(a).iso2) - 
				preferredCountries.indexOf(parseCountry(b).iso2)
			);
		});
	
		countriesToList = countryOptions.filter(
			(country) => !preferredCountries.includes(parseCountry(country).iso2)
		);
		countriesToList = [...countriesToListAtTop, ...countriesToList];
	}

  const {
    inputValue,
    handlePhoneValueChange,
    inputRef,
    country,
    setCountry
  } = usePhoneInput({
    ...otherPhoneInputProps,
    value,
    onChange: (phoneData: PhoneInputChangeReturnValue) => {
			setValue(fieldName, phoneData.inputValue as PathValue<T, Path<T>>);
      if (onValueChange) {
				onValueChange(phoneData);
      }
    },
		countries: countryOptions,
		preferredCountries,
		forceDialCode: hideDropdown ?? forceDialCode,
  });

  return (
    <FormControl error={isError}>
      <FormLabel
        label={fieldLabel}
        isVisible={showLabelAboveFormField}
        error={isError}
        formLabelProps={formLabelProps}
        defaultFormLabelSx={defaultFormLabelSx}
      />
      <TextField
        autoComplete={fieldName}
        type="tel"
        {...rest}
        value={inputValue}
        onChange={handlePhoneValueChange}
        inputRef={inputRef}
        label={!showLabelAboveFormField ? fieldLabel : undefined}
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
                onChange={e => setCountry(e.target.value as CountryIso2)}
                renderValue={value => (
                  <FlagImage iso2={value} style={{ display: 'flex' }} />
                )}
              >
                {countriesToList.map(c => {
                  const country = parseCountry(c);
                  return (
                    <MenuItem key={country.iso2} value={country.iso2}>
                      <FlagImage
                        iso2={country.iso2}
                        style={{ marginRight: '8px' }}
                      />
                      <Typography marginRight="8px">
                        {country.name}
                      </Typography>
                      <Typography color="gray">
                        +
                        {country.dialCode}
                      </Typography>
                    </MenuItem>
                  );
                })}
              </Select>
            </InputAdornment>
          )
        }}
      />
      <FormHelperText
        error={isError}
        errorMessage={errorMessage}
        hideErrorMessage={hideErrorMessage}
        helperText={helperText}
        defaultFormHelperTextSx={defaultFormHelperTextSx}
        formHelperTextProps={formHelperTextProps}
      />
    </FormControl>
  );
};

export default RHFPhoneInput;
