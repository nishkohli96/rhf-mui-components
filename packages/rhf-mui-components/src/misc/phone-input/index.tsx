/**
 * Code Reference -
 * https://react-international-phone.vercel.app/docs/Advanced%20Usage/useWithUiLibs
 */

'use client';

import { useContext, useMemo, type ReactNode } from 'react';
import {
  Controller,
  type FieldValues,
  type Path,
  type PathValue,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import MuiTextField, { type TextFieldProps } from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Divider from '@mui/material/Divider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import {
  defaultCountries,
  FlagImage,
  parseCountry,
  usePhoneInput,
  type CountryData,
  type CountryIso2,
  type ParsedCountry,
  type UsePhoneInputConfig
} from 'react-international-phone';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import {
  FormControl,
  FormLabel,
  FormLabelText,
  FormHelperText,
  defaultAutocompleteValue
} from '@/common';
import type { FormLabelProps, FormHelperTextProps } from '@/types';
import {
  fieldNameToLabel,
  keepLabelAboveFormField,
  isAboveMuiV5,
  useFieldIds
} from '@/utils';
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
  | 'inputRef'
  | 'type'
  | 'FormHelperTextProps'
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
  required,
  value,
  onValueChange,
  label,
  showLabelAboveFormField,
  formLabelProps,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  disabled: muiDisabled,
  phoneInputProps,
  slotProps,
  onBlur,
  autoComplete = defaultAutocompleteValue,
  InputProps,
  ...rest
}: RHFPhoneInputProps<T>) => {
  const { fieldId, labelId, helperTextId, errorId } = useFieldIds(fieldName);
  const { allLabelsAboveFields } = useContext(RHFMuiConfigContext);
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );
  const isError = !!errorMessage;
  const showHelperTextElement = !!helperText || (isError && !hideErrorMessage);

  const {
    countries,
    hideDropdown,
    preferredCountries,
    forceDialCode,
    ...otherPhoneInputProps
  } = phoneInputProps ?? {};
  const countryOptions = countries ?? defaultCountries;

  /**
   * Render preferred countries at the top of the list.
   * Preferred countries will maintain the order in which they were
   * specified in the props, while other countries will be sorted
   * alphabetically.
   */
  const { countriesToList, countriesToListAtTop } = useMemo(() => {
    if (!preferredCountries?.length) {
      return {
        countriesToList: countryOptions,
        countriesToListAtTop: [] as CountryData[]
      };
    }

    const countriesToListAtTop = countryOptions
      .filter(country =>
        preferredCountries.includes(parseCountry(country).iso2))
      .sort(
        (a, b) =>
          preferredCountries.indexOf(parseCountry(a).iso2)
          - preferredCountries.indexOf(parseCountry(b).iso2)
      );

    const countriesToList = countryOptions.filter(
      country => !preferredCountries.includes(parseCountry(country).iso2)
    );

    return { countriesToList, countriesToListAtTop };
  }, [countryOptions, preferredCountries]);

  const { inputValue, handlePhoneValueChange, inputRef, country, setCountry }
    = usePhoneInput({
      ...otherPhoneInputProps,
      value,
      onChange: (phoneData: PhoneInputChangeReturnValue) => {
        onValueChange?.(phoneData);
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
        required={required}
        error={isError}
        formLabelProps={{
          id: labelId,
          htmlFor: fieldId,
          ...formLabelProps
        }}
      />
      <Controller
        name={fieldName}
        control={control}
        rules={registerOptions}
        disabled={muiDisabled}
        defaultValue={inputValue as PathValue<T, Path<T>>}
        render={({
          field: {
            name: rhfFieldName,
            onChange: rhfOnChange,
            onBlur: rhfOnBlur,
            ref: rhfRef,
            disabled: rhfDisabled
          }
        }) => {
          const startAdornment = (
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
                disabled={muiDisabled || hideDropdown}
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
                    <MenuItem key={countryInfo.iso2} value={countryInfo.iso2}>
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
                    <MenuItem key={countryInfo.iso2} value={countryInfo.iso2}>
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
          );

          return (
            <MuiTextField
              id={fieldId}
              name={rhfFieldName}
              inputRef={ref => {
                rhfRef(ref);
                inputRef.current = ref;
              }}
              value={inputValue}
              autoComplete={autoComplete}
              type="tel"
              onChange={e => {
                handlePhoneValueChange(e);
                rhfOnChange(e.target.value);
              }}
              onBlur={blurEvent => {
                rhfOnBlur();
                onBlur?.(blurEvent);
              }}
              label={
                !isLabelAboveFormField
                  ? (
                    <FormLabelText label={fieldLabel} required={required} />
                  )
                  : undefined
              }
              aria-labelledby={isLabelAboveFormField ? labelId : undefined}
              aria-describedby={
                showHelperTextElement
                  ? isError
                    ? errorId
                    : helperTextId
                  : undefined
              }
              aria-required={required}
              error={isError}
              disabled={rhfDisabled}
              {...(isAboveMuiV5
                ? {
                  slotProps: {
                    ...slotProps,
                    input: {
                      ...slotProps?.input,
                      startAdornment
                    }
                  }
                }
                : {
                  InputProps: {
                    ...InputProps,
                    startAdornment
                  }
                })}
              {...rest}
            />
          );
        }}
      />
      <FormHelperText
        error={isError}
        errorMessage={errorMessage}
        hideErrorMessage={hideErrorMessage}
        helperText={helperText}
        showHelperTextElement={showHelperTextElement}
        formHelperTextProps={{
          id: isError ? errorId : helperTextId,
          ...formHelperTextProps
        }}
      />
    </FormControl>
  );
};

export default RHFPhoneInput;
