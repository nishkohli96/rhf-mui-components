/**
 * Code Reference -
 * https://react-international-phone.vercel.app/docs/Advanced%20Usage/useWithUiLibs
 */

'use client';

import {
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  forwardRef,
  type JSX,
  type ReactNode,
  type Ref
} from 'react';
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
import ListSubheader from '@mui/material/ListSubheader';
import MenuItem from '@mui/material/MenuItem';
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
  mergeRefs,
  useFieldIds
} from '@/utils';
import CountryMenuItem from './CountryMenuItem';
import 'react-international-phone/style.css';

type PhoneInputChangeReturnValue = {
  phone: string;
  inputValue: string;
  country: ParsedCountry;
};

const countryMenuWidth = 350;
const countryMenuLeftOffset = -34;
const countryMenuViewportGutter = 32;

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
  | 'ref'
>;

type SearchCountryProps = {
  /**
   * Whether to show the inline country search field inside the country dropdown.
   * @default true
   */
  allowCountrySearch?: boolean;
  /**
   * Props forwarded to the internal MUI `TextField`.
   */
  textFieldProps?: Omit<TextFieldProps, 'value' | 'label'>;
  /**
   * Customize the content of each `MenuItem` in the country search dropdown.
   */
  renderCountryMenuItem?: (country: ParsedCountry) => ReactNode;
  /**
   * Text shown when the country search does not match any available country.
   * @default 'No countries found'
   */
  noCountryFoundText?: string;
};

type PhoneInputProps = Omit<UsePhoneInputConfig, 'value' | 'onChange'>;

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
  /**
   * Name/path of the React Hook Form field this component controls.
   */
  fieldName: Path<T>;
  /**
   * React Hook Form control object returned by `useForm`.
   */
  control: Control<T>;
  /**
   * Validation rules passed to React Hook Form for this field.
   */
  registerOptions?: RegisterOptions<T, Path<T>>;
  /**
   * Overrides the default phone input change handling.
   * Receives the normalized phone object and the raw react-international-phone change payload.
   * Call `rhfOnChange` with the `RHFPhoneInputValue` that should be stored; else the form value will not be updated.
   *
   * @param rhfOnChange - React Hook Form field change handler for the structured phone value.
   * @param newValue - Normalized phone value containing `phone`, `country`, `dialCode`, and `phoneNo`.
   * @param phoneData - Raw change payload returned by react-international-phone.
   */
  customOnChange?: ({
    rhfOnChange,
    newValue,
    phoneData
  }: RHFPhoneInputCustomOnChangeProps) => void;
  /**
   * Called after the default phone input handler stores the normalized phone value in React Hook Form.
   *
   * ⚠️ Important:
   * This callback is not called when `customOnChange` is used.
   *
   * @param newValue - Normalized phone value containing `phone`, `country`, `dialCode`, and `phoneNo`.
   * @param phoneData - Raw change payload returned by react-international-phone.
   */
  onValueChange?: ({
    newValue,
    phoneData
  }: RHFPhoneInputOnValueChangeProps) => void;
  /**
   * Options for the inline country search field in the country dropdown.
   */
  searchCountryProps?: SearchCountryProps;
  /**
   * When true, renders the field label above the form field instead of inside or beside it.
   */
  showLabelAboveFormField?: boolean;
  /**
   * Props forwarded to the internal `FormLabel`. The `id` is managed by the component.
   */
  formLabelProps?: Omit<FormLabelProps, 'id'>;
  /**
   * When true, hides the rendered field label while preserving accessible labeling where possible.
   */
  hideLabel?: boolean;
  /**
   * If true, hides the error message text while keeping the field in an error state.
   */
  hideErrorMessage?: boolean;
  /**
   * Props forwarded to the internal `FormHelperText`. The `id` is managed by the component.
   */
  formHelperTextProps?: Omit<FormHelperTextProps, 'id'>;
  /**
   * Configuration passed to `react-international-phone`'s `usePhoneInput` hook.
   */
  phoneInputProps?: PhoneInputProps;
  /**
   * Custom ids for generated field, label, helper text, and error elements.
   */
  customIds?: CustomComponentIds;
} & InputTextFieldProps;

const RHFPhoneInputInner = forwardRef(function RHFPhoneInput<
  T extends FieldValues
>(
  {
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
    hideErrorMessage,
    formHelperTextProps,
    disabled: muiDisabled,
    phoneInputProps,
    slotProps,
    onBlur,
    autoComplete = defaultAutocompleteValue,
    customIds,
    searchCountryProps,
    ...otherRHFPhoneInputProps
  }: RHFPhoneInputProps<T>,
  ref: Ref<HTMLInputElement>
) {
  const { fieldId, labelId, helperTextId, errorId } = useFieldIds(
    fieldName,
    customIds
  );
  const { allLabelsAboveFields } = useContext(RHFMuiConfigContext);
  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );
  const defaultFieldLabel = fieldNameToLabel(fieldName);
  const fieldLabel = label ?? defaultFieldLabel;
  const accessibleFieldLabel = typeof fieldLabel === 'string'
    ? fieldLabel
    : defaultFieldLabel;

  const watchedValue = useWatch({ control, name: fieldName });
  const currentPhoneValue = getPhoneValue(watchedValue);
  const [countrySearch, setCountrySearch] = useState('');
  const [countryMenuLeft, setCountryMenuLeft] = useState(0);
  const phoneInputRootRef = useRef<HTMLDivElement | null>(null);
  const phoneChangeHandlerRef = useRef<
    ((phoneData: PhoneInputChangeReturnValue) => void) | null
  >(null);

  const {
    countries,
    preferredCountries,
    forceDialCode,
    ...otherPhoneInputProps
  } = phoneInputProps ?? {};
  const countryOptions = countries ?? defaultCountries;

  const {
    textFieldProps: searchCountryTextFieldProps,
    allowCountrySearch = true,
    renderCountryMenuItem,
    noCountryFoundText = 'No countries found'
  } = searchCountryProps ?? {};

  const {
    id: searchCountryTextFieldId = `${fieldName}_search-country`,
    fullWidth: searchCountryFullWidth = true,
    size: searchCountrySize = 'small',
    placeholder: searchCountryPlaceholder = 'Search by country or dial code',
    onChange: searchCountryOnChange,
    onClick: searchCountryOnClick,
    onKeyDown: searchCountryOnKeyDown,
    ...otherSearchCountryTextFieldProps
  } = searchCountryTextFieldProps ?? {};

  /*
   * Keep the country menu tucked under the flag selector on wide inputs, but
   * avoid that left shift when the viewport is too narrow to contain it.
   */
  const updateCountryMenuLeft = () => {
    const inputWidth = phoneInputRootRef.current?.offsetWidth ?? 0;
    const hasViewportRoom
      = window.innerWidth
        > countryMenuWidth
        + Math.abs(countryMenuLeftOffset)
        + countryMenuViewportGutter;

    setCountryMenuLeft(
      inputWidth > countryMenuWidth && hasViewportRoom
        ? countryMenuLeftOffset
        : 0
    );
  };

  useEffect(() => {
    updateCountryMenuLeft();
    window.addEventListener('resize', updateCountryMenuLeft);
    return () => {
      window.removeEventListener('resize', updateCountryMenuLeft);
    };
  }, []);

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

  const filterCountry = (countryData: CountryData) => {
    const search = countrySearch.trim().toLowerCase();
    if (!search) {
      return true;
    }

    const countryInfo = parseCountry(countryData);
    const dialCodeSearch = search.replace('+', '');

    return (
      countryInfo.name.toLowerCase().includes(search)
      || countryInfo.iso2.toLowerCase().includes(search)
      || countryInfo.dialCode.includes(dialCodeSearch)
    );
  };

  const filteredCountriesToListAtTop
    = countriesToListAtTop.filter(filterCountry);
  const filteredCountriesToList = countriesToList.filter(filterCountry);

  const { inputValue, handlePhoneValueChange, inputRef, country, setCountry }
    = usePhoneInput({
      ...otherPhoneInputProps,
      value: currentPhoneValue,
      onChange: (phoneData: PhoneInputChangeReturnValue) => {
        phoneChangeHandlerRef.current?.(phoneData);
      },
      countries: countryOptions,
      preferredCountries,
      forceDialCode
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
        const isDisabled = muiDisabled || rhfDisabled;
        const fieldErrorMessage
          = fieldStateError?.message?.toString();
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
                autoFocus: false,
                PaperProps: {
                  sx: {
                    width: `min(${countryMenuWidth}px, calc(100vw - 32px))`,
                    maxWidth: 'calc(100vw - 32px)',
                    maxHeight: 300
                  }
                },
                MenuListProps: {
                  sx: {
                    pt: allowCountrySearch ? 0 : '8px'
                  }
                },
                style: {
                  top: '10px',
                  left: countryMenuLeft
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
              disabled={isDisabled || forceDialCode}
              onOpen={updateCountryMenuLeft}
              onClose={() => {
                setCountrySearch('');
              }}
              onChange={e => {
                setCountry(e.target.value, { focusOnInput: true });
              }}
              renderValue={value => (
                <FlagImage iso2={value} style={{ display: 'flex' }} />
              )}
            >
              {allowCountrySearch && (
                <ListSubheader
                  sx={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    bgcolor: 'background.paper',
                    lineHeight: 'normal',
                    padding: '8px',
                  }}
                >
                  <MuiTextField
                    {...otherSearchCountryTextFieldProps}
                    label={null}
                    id={searchCountryTextFieldId}
                    fullWidth={searchCountryFullWidth}
                    placeholder={searchCountryPlaceholder}
                    size={searchCountrySize}
                    value={countrySearch}
                    onChange={event => {
                      setCountrySearch(event.target.value);
                      searchCountryOnChange?.(event);
                    }}
                    onClick={event => {
                      event.stopPropagation();
                      searchCountryOnClick?.(event);
                    }}
                    onKeyDown={event => {
                      event.stopPropagation();
                      searchCountryOnKeyDown?.(event);
                    }}
                  />
                </ListSubheader>
              )}
              {filteredCountriesToListAtTop.map(c => {
                const countryInfo = parseCountry(c);
                return (
                  <MenuItem key={countryInfo.iso2} value={countryInfo.iso2}>
                    {renderCountryMenuItem?.(countryInfo) ?? <CountryMenuItem country={countryInfo} />}
                  </MenuItem>
                );
              })}
              {filteredCountriesToListAtTop.length > 0
                && filteredCountriesToList.length > 0
                && <Divider />}
              {filteredCountriesToList.map(c => {
                const countryInfo = parseCountry(c);
                return (
                  <MenuItem key={countryInfo.iso2} value={countryInfo.iso2}>
                    {renderCountryMenuItem?.(countryInfo) ?? <CountryMenuItem country={countryInfo} />}
                  </MenuItem>
                );
              })}
              {filteredCountriesToListAtTop.length === 0
                && filteredCountriesToList.length === 0 && (
                <MenuItem disabled>
                  {noCountryFoundText}
                </MenuItem>
              )}
            </Select>
          </InputAdornment>
        );

        return (
          <FormControl error={isError} disabled={isDisabled}>
            {!hideLabel && (
              <FormLabel
                label={fieldLabel}
                isVisible={isLabelAboveFormField}
                required={required}
                error={isError}
                disabled={isDisabled}
                formLabelProps={{
                  ...formLabelProps,
                  id: labelId,
                  htmlFor: fieldId
                }}
              />
            )}
            <MuiTextField
              {...otherRHFPhoneInputProps}
              ref={phoneInputRootRef}
              id={fieldId}
              name={rhfFieldName}
              inputRef={mergeRefs(rhfRef, inputRef, ref)}
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
              aria-label={hideLabel ? accessibleFieldLabel : undefined}
              aria-describedby={
                showHelperTextElement
                  ? isError
                    ? errorId
                    : helperTextId
                  : undefined
              }
              aria-required={required}
              error={isError}
              disabled={isDisabled}
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
                ...formHelperTextProps,
                id: isError ? errorId : helperTextId
              }}
            />
          </FormControl>
        );
      }}
    />
  );
});

const RHFPhoneInput = RHFPhoneInputInner as <T extends FieldValues>(
  props: RHFPhoneInputProps<T> & {
    ref?: Ref<HTMLInputElement>;
  }
) => JSX.Element;

export default RHFPhoneInput;
