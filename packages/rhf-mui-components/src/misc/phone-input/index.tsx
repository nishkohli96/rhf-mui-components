/**
 * Code Reference -
 * https://react-international-phone.vercel.app/docs/Advanced%20Usage/useWithUiLibs
 */

'use client';

import { useContext, useMemo, useRef, type ReactNode } from 'react';
import {
  Controller,
  useWatch,
  type FieldValues,
  type Path,
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
import type {
  FormLabelProps,
  FormHelperTextProps,
  CustomComponentIds
} from '@/types';
import {
  fieldNameToLabel,
  keepLabelAboveFormField,
  useFieldIds
} from '@/utils';
import 'react-international-phone/style.css';

type PhoneInputChangeReturnValue = {
  phone: string;
  inputValue: string;
  country: ParsedCountry;
};

/**
 * Structured phone value stored in RHF state.
 * `country` is captured directly from the picker because dial codes like +1
 * are shared across multiple countries and cannot be disambiguated later.
 */
export type RHFPhoneInputValue = {
  /** Full E.164-style phone value with dial code, e.g. "+15551234567". */
  phone: string;
  /** Selected ISO 3166-1 alpha-2 country code, e.g. "us" or "ca". */
  country: CountryIso2;
  /** Country calling code without the "+" prefix, e.g. "1". */
  dialCode: string;
  /** National significant number with the dial code stripped. */
  phoneNo: string;
};

type RHFPhoneInputOnValueChangeProps = {
  /** Structured value stored in the React Hook Form field. */
  newValue: RHFPhoneInputValue;
  /** Raw change payload returned by `react-international-phone`. */
  phoneData: PhoneInputChangeReturnValue;
};

type RHFPhoneInputCustomOnChangeProps = RHFPhoneInputOnValueChangeProps & {
  /** React Hook Form field change handler. Call this to update form state. */
  rhfOnChange: (newValue: RHFPhoneInputValue) => void;
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
  /**
   * Hides and disables the country dropdown.
   *
   * When true, the dial code is forced so users cannot remove it from the input.
   */
  hideDropdown?: boolean;
};

function toStructuredValue(
  phoneData: PhoneInputChangeReturnValue
): RHFPhoneInputValue {
  const { phone, country } = phoneData;
  const phoneNo = phone.startsWith(`+${country.dialCode}`)
    ? phone.slice(country.dialCode.length + 1)
    : phone;

  return {
    phone,
    country: country.iso2,
    dialCode: country.dialCode,
    phoneNo
  };
}

function getPhoneValue(value: unknown): string | undefined {
  if (typeof value === 'string') {
    return value;
  }

  if (value && typeof value === 'object' && 'phone' in value) {
    return String(value.phone ?? '');
  }

  return undefined;
}

export type RHFPhoneInputProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  /**
   * Override the default phone value update.
   *
   * Call `rhfOnChange(newValue)` with the structured value you want stored in
   * React Hook Form. `onValueChange` is not invoked when this callback is set.
   */
  customOnChange?: ({
    rhfOnChange,
    newValue,
    phoneData
  }: RHFPhoneInputCustomOnChangeProps) => void;
  /**
   * Fired after the phone value changes and the structured value is stored in
   * the field.
   *
   * Not invoked when `customOnChange` is set.
   */
  onValueChange?: ({
    newValue,
    phoneData
  }: RHFPhoneInputOnValueChangeProps) => void;
  showLabelAboveFormField?: boolean;
  formLabelProps?: FormLabelProps;
  hideLabel?: boolean;
  /**
   * @deprecated
   * Field error message is now automatically derived from form state.
   * Passing this prop is no longer necessary and it will be removed in the next major version.
   */
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
  /**
   * Configuration passed to `react-international-phone`'s `usePhoneInput` hook.
   */
  phoneInputProps?: PhoneInputProps;
  customIds?: CustomComponentIds;
} & InputTextFieldProps;

const RHFPhoneInput = <T extends FieldValues>({
  fieldName,
  control,
  registerOptions,
  customOnChange,
  onValueChange,
  label,
  showLabelAboveFormField,
  formLabelProps,
  hideLabel,
  required,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  disabled: muiDisabled,
  phoneInputProps,
  slotProps,
  onBlur,
  autoComplete = defaultAutocompleteValue,
  customIds,
  ...otherRHFPhoneInputProps
}: RHFPhoneInputProps<T>) => {
  const { fieldId, labelId, helperTextId, errorId } = useFieldIds(
    fieldName,
    customIds
  );
  const { allLabelsAboveFields } = useContext(RHFMuiConfigContext);
  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const watchedValue = useWatch({ control, name: fieldName });
  const currentPhoneValue = getPhoneValue(watchedValue);
  const phoneChangeHandlerRef = useRef<
    ((phoneData: PhoneInputChangeReturnValue) => void) | null
  >(null);

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
      value: currentPhoneValue,
      onChange: (phoneData: PhoneInputChangeReturnValue) => {
        phoneChangeHandlerRef.current?.(phoneData);
      },
      countries: countryOptions,
      preferredCountries,
      forceDialCode: hideDropdown ?? forceDialCode
    });

  return (
    <Controller
      name={fieldName}
      control={control}
      rules={registerOptions}
      render={({
        field: {
          name: rhfFieldName,
          onChange: rhfOnChange,
          onBlur: rhfOnBlur,
          ref: rhfRef,
          disabled: rhfDisabled
        },
        fieldState: { error: fieldStateError }
      }) => {
        const fieldErrorMessage
          = fieldStateError?.message?.toString() ?? errorMessage;
        const isError = !!fieldErrorMessage;
        const showHelperTextElement = !!(
          helperText
          || (isError && !hideErrorMessage)
        );

        const handleChange = (phoneData: PhoneInputChangeReturnValue) => {
          const newValue = toStructuredValue(phoneData);
          if (customOnChange) {
            customOnChange({ rhfOnChange, newValue, phoneData });
            return;
          }
          rhfOnChange(newValue);
          onValueChange?.({ newValue, phoneData });
        };
        phoneChangeHandlerRef.current = handleChange;

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
              disabled={muiDisabled || rhfDisabled || hideDropdown}
              onChange={e => {
                setCountry(e.target.value);
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
          <FormControl error={isError}>
            {!hideLabel && (
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
            )}
            <MuiTextField
              {...otherRHFPhoneInputProps}
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
              }}
              onBlur={blurEvent => {
                rhfOnBlur();
                onBlur?.(blurEvent);
              }}
              label={
                !hideLabel && !isLabelAboveFormField
                  ? (
                    <FormLabelText label={fieldLabel} required={required} />
                  )
                  : undefined
              }
              aria-labelledby={
                !hideLabel && isLabelAboveFormField ? labelId : undefined
              }
              aria-describedby={
                showHelperTextElement
                  ? isError
                    ? errorId
                    : helperTextId
                  : undefined
              }
              aria-required={required}
              error={isError}
              disabled={muiDisabled || rhfDisabled}
              slotProps={{
                ...slotProps,
                input: {
                  ...slotProps?.input,
                  startAdornment
                }
              }}
            />
            <FormHelperText
              error={isError}
              errorMessage={fieldErrorMessage}
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
      }}
    />
  );
};

export default RHFPhoneInput;
