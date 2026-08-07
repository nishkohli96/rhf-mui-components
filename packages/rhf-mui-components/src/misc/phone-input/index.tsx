/**
 * Code Reference -
 * https://react-international-phone.vercel.app/docs/Advanced%20Usage/useWithUiLibs
 */

'use client';

import {
  useContext,
  useState,
  useEffect,
  useMemo,
  useRef,
  type ReactNode
} from 'react';
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
import Select, { type SelectProps as MuiSelectProps } from '@mui/material/Select';
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
import {
  FormControl,
  FormLabel,
  FormLabelText,
  FormHelperText,
  defaultAutocompleteValue,
  type FormLabelProps,
  type FormHelperTextProps
} from '@/common';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import {
  fieldNameToLabel,
  keepLabelAboveFormField,
  isAboveMuiV5,
  useFieldIds,
  resolveRequired,
  mergeSx
} from '@/utils';
import 'react-international-phone/style.css';

const countryMenuWidth = 350;
/*
 * Defensive-only: the menu is anchored to the field itself and capped at the
 * field's own width, so it can never overflow the field's box. This gutter
 * only guards the (rare) case where the field's own layout already pushes it
 * flush against the viewport edge, e.g. a full-width field with no side margin.
 */
const countryMenuViewportGutter = 32;

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

/**
 * Props forwarded to the internal MUI `Select` that renders the flag/dial-code
 * trigger and country dropdown.
 */
type CountrySelectProps = Omit<
  MuiSelectProps,
  | 'value'
  | 'defaultValue'
  | 'multiple'
  | 'onChange'
  | 'onOpen'
  | 'onClose'
  | 'multiline'
  | 'renderValue'
  | 'MenuProps'
  | 'disabled'
  | 'children'
  | 'ref'
>;

type PhoneInputProps = Omit<UsePhoneInputConfig, 'value' | 'onChange'> & {
  hideDropdown?: boolean;
};

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
   * Initial phone number value passed to `react-international-phone`.
   */
  value?: string;
  /**
   * Callback fired after the phone input changes.
   * @param phoneData - Phone metadata from `react-international-phone`, including
   * the formatted phone value, input value, and selected country.
   */
  onValueChange?: (phoneData: PhoneInputChangeReturnValue) => void;
  /**
   * When `true`, renders the label above the component instead of within the field layout.
   */
  showLabelAboveFormField?: boolean;
  /**
   * Props forwarded to the internal `FormLabel`. The `id` is managed by the component.
   */
  formLabelProps?: Omit<FormLabelProps, 'id'>;
  /**
   * Validation error message displayed in the `FormHelperText` component.
   * When provided, it takes precedence over `helperText` unless
   * `hideErrorMessage` is set to `true`.
   */
  errorMessage?: ReactNode;
  /**
   * If true, hides the error message text while keeping the field in an error state.
   */
  hideErrorMessage?: boolean;
  /**
   * Props forwarded to the internal `FormHelperText`. The `id` is managed by the component.
   */
  formHelperTextProps?: Omit<FormHelperTextProps, 'id'>;
  /**
   * Props forwarded to the internal MUI `Select` that renders the flag/dial-code
   * trigger and country dropdown — e.g. a custom `size` or `sx` (merged with
   * the component's own). See `CountrySelectProps` for what's excluded and why.
   */
  countrySelectProps?: CountrySelectProps;
  /**
   * Configuration passed to `react-international-phone`'s `usePhoneInput` hook.
   */
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
  countrySelectProps,
  phoneInputProps,
  slotProps,
  onBlur: muiOnBlur,
  autoComplete = defaultAutocompleteValue,
  InputProps,
  ...otherTextFieldProps
}: RHFPhoneInputProps<T>) => {
  const { fieldId, labelId, helperTextId, errorId } = useFieldIds(fieldName);
  const { allLabelsAboveFields } = useContext(RHFMuiConfigContext);
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );
  const isFieldRequired = resolveRequired(required, registerOptions?.required);

  const [countryMenuWidthPx, setCountryMenuWidthPx] = useState(countryMenuWidth);
  const [countryMenuAnchorEl, setCountryMenuAnchorEl] = useState<HTMLDivElement | null>(null);
  const phoneInputRootRef = useRef<HTMLDivElement | null>(null);

  const {
    countries,
    hideDropdown,
    preferredCountries,
    forceDialCode,
    ...otherPhoneInputProps
  } = phoneInputProps ?? {};
  const countryOptions = countries ?? defaultCountries;

  const updateCountryMenuLayout = () => {
    const inputWidth = phoneInputRootRef.current?.offsetWidth ?? 0;

    /*
     * Cap the menu at the field width so a narrow field (e.g. `md={6}`) doesn't
     * let the fixed 350px menu spill into the adjacent grid column. When the
     * field is wider than the menu, keep the full `countryMenuWidth`. The menu
     * is anchored directly to the field itself (see `anchorEl` below), so its
     * right edge never exceeds the field's own right edge on any viewport width.
     */
    setCountryMenuWidthPx(
      inputWidth > 0 ? Math.min(countryMenuWidth, inputWidth) : countryMenuWidth
    );
  };

  useEffect(() => {
    setCountryMenuAnchorEl(phoneInputRootRef.current);
    updateCountryMenuLayout();
    window.addEventListener('resize', updateCountryMenuLayout);
    return () => {
      window.removeEventListener('resize', updateCountryMenuLayout);
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
    <Controller
      name={fieldName}
      control={control}
      rules={registerOptions}
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
        const isDisabled = muiDisabled || rhfDisabled;
        const isError = !!errorMessage;
        const showHelperTextElement
          = !!helperText || (isError && !hideErrorMessage);

        const htmlInputProps = {
          'aria-labelledby': isLabelAboveFormField ? labelId : undefined,
          'aria-describedby': showHelperTextElement
            ? isError
              ? errorId
              : helperTextId
            : undefined,
          'aria-required': isFieldRequired
        };

        const startAdornment = (
          <InputAdornment
            position="start"
            style={{ marginRight: '2px', marginLeft: '-8px' }}
          >
            <Select
              {...countrySelectProps}
              MenuProps={{
                autoFocus: false,
                ...(countryMenuAnchorEl ? { anchorEl: countryMenuAnchorEl } : {}),
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'left'
                },
                transformOrigin: {
                  vertical: 'top',
                  horizontal: 'left'
                },
                PaperProps: {
                  sx: {
                    mt: '4px',
                    width: `min(${countryMenuWidthPx}px, calc(100vw - ${countryMenuViewportGutter}px))`,
                    maxWidth: `calc(100vw - ${countryMenuViewportGutter}px)`,
                    maxHeight: 300
                  }
                }
              }}
              sx={mergeSx(
                {
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
                },
                countrySelectProps?.sx
              )}
              value={country.iso2}
              disabled={isDisabled || hideDropdown}
              onOpen={updateCountryMenuLayout}
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
          <FormControl error={isError} disabled={isDisabled}>
            <FormLabel
              label={fieldLabel}
              isVisible={isLabelAboveFormField}
              required={isFieldRequired}
              error={isError}
              disabled={isDisabled}
              formLabelProps={{
                ...formLabelProps,
                id: labelId,
                htmlFor: fieldId
              }}
            />
            <MuiTextField
              {...otherTextFieldProps}
              ref={phoneInputRootRef}
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
                muiOnBlur?.(blurEvent);
              }}
              label={
                !isLabelAboveFormField
                  ? (
                    <FormLabelText label={fieldLabel} required={isFieldRequired} />
                  )
                  : undefined
              }
              error={isError}
              disabled={isDisabled}
              {...(isAboveMuiV5
                ? {
                  slotProps: {
                    ...slotProps,
                    input: {
                      ...slotProps?.input,
                      startAdornment
                    },
                    htmlInput: {
                      ...slotProps?.htmlInput,
                      ...htmlInputProps
                    }
                  }
                }
                : {
                  inputProps: {
                    ...otherTextFieldProps?.inputProps,
                    ...htmlInputProps
                  },
                  InputProps: {
                    ...InputProps,
                    startAdornment
                  }
                })}
            />
            <FormHelperText
              error={isError}
              errorMessage={errorMessage}
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
};

export default RHFPhoneInput;
