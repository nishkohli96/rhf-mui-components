/**
 * Code Reference -
 * https://react-international-phone.vercel.app/docs/Advanced%20Usage/useWithUiLibs
 */

'use client';

import {
  useContext,
  forwardRef,
  type JSX,
  type ReactNode,
  type Ref
} from 'react';
import {
  Controller,
  type FieldError,
  type FieldValues,
  type Path,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import { type TextFieldProps } from '@mui/material/TextField';
import {
  type CountryIso2,
  type ParsedCountry,
  type UsePhoneInputConfig
} from 'react-international-phone';
import MUIPhoneInput from '@nish1896/mui-components/misc/phone-input';
import {
  type FormLabelProps,
  type FormHelperTextProps
} from '@/common';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import type { CustomComponentIds } from '@/types';
import {
  keepLabelAboveFormField,
  mergeRefs,
  mergeSx,
  resolveRequired
} from '@/utils';

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
   * Configuration passed to `react-international-phone`'s `usePhoneInput` hook.
   */
  phoneInputProps?: PhoneInputProps;
  /**
   * Options for the inline country search field in the country dropdown.
   */
  searchCountryProps?: SearchCountryProps;
  /**
   * When `true`, renders the label above the component instead of within the field layout.
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
   * Custom renderer for the React Hook Form field error.
   * Receives the current field error and must return renderable content, such as `error.message` or a custom element.
   *
   * @param error - React Hook Form field error for this field.
   */
  renderError?: (error: FieldError) => ReactNode;
  /**
   * If true, hides the error message text while keeping the field in an error state.
   */
  hideErrorMessage?: boolean;
  /**
   * Props forwarded to the internal `FormHelperText`. The `id` is managed by the component.
   */
  formHelperTextProps?: Omit<FormHelperTextProps, 'id'>;
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
    required,
    customOnChange,
    onValueChange,
    disabled: muiDisabled,
    onBlur: muiOnBlur,
    phoneInputProps,
    searchCountryProps,
    label,
    showLabelAboveFormField,
    formLabelProps,
    hideLabel,
    renderError,
    hideErrorMessage,
    helperText,
    formHelperTextProps,
    slotProps,
    autoComplete,
    customIds,
    ...otherRHFPhoneInputProps
  }: RHFPhoneInputProps<T>,
  ref: Ref<HTMLInputElement>
) {
  const {
    allLabelsAboveFields,
    defaultFormLabelSx,
    defaultFormHelperTextSx
  } = useContext(RHFMuiConfigContext);
  const isFieldRequired = resolveRequired(required, registerOptions?.required);
  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );
  const {
    sx: formLabelSx,
    ...otherFormLabelProps
  } = formLabelProps ?? {};
  const {
    sx: formHelperTextSx,
    ...otherFormHelperTextProps
  } = formHelperTextProps ?? {};

  return (
    <Controller
      name={fieldName}
      control={control}
      rules={registerOptions}
      render={({
        field: {
          name: rhfFieldName,
          value: rhfValue,
          onChange: rhfOnChange,
          onBlur: rhfOnBlur,
          ref: rhfRef,
          disabled: rhfDisabled
        },
        fieldState: { error: fieldStateError }
      }) => {
        const isDisabled = muiDisabled || rhfDisabled;

        return (
          <MUIPhoneInput
            {...otherRHFPhoneInputProps}
            fieldName={rhfFieldName}
            autoComplete={autoComplete}
            required={isFieldRequired}
            ref={mergeRefs(rhfRef, ref)}
            value={rhfValue}
            onValueChange={({ newValue, phoneData }) => {
              if (customOnChange) {
                customOnChange({ rhfOnChange, newValue, phoneData });
                return;
              }
              rhfOnChange(newValue);
              onValueChange?.({ newValue, phoneData });
            }}
            onBlur={blurEvent => {
              rhfOnBlur();
              muiOnBlur?.(blurEvent);
            }}
            disabled={isDisabled}
            phoneInputProps={phoneInputProps}
            searchCountryProps={searchCountryProps}
            label={label}
            showLabelAboveFormField={isLabelAboveFormField}
            formLabelProps={{
              ...otherFormLabelProps,
              sx: mergeSx(defaultFormLabelSx, formLabelSx)
            }}
            hideLabel={hideLabel}
            errorMessage={fieldStateError?.message?.toString()}
            renderError={() => fieldStateError
              ? renderError?.(fieldStateError)
              : undefined}
            hideErrorMessage={hideErrorMessage}
            helperText={helperText}
            formHelperTextProps={{
              ...otherFormHelperTextProps,
              sx: mergeSx(defaultFormHelperTextSx, formHelperTextSx)
            }}
            slotProps={slotProps}
            customIds={customIds}
          />
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
