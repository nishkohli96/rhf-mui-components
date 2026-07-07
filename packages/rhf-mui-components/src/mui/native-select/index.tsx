'use client';

import { useContext, type ReactNode, type ChangeEvent } from 'react';
import {
  Controller,
  type FieldValues,
  type Path,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import NativeSelect, { type NativeSelectProps } from '@mui/material/NativeSelect';
import {
  FormLabel,
  FormHelperText,
  defaultAutocompleteValue,
  type FormHelperTextProps,
  type FormLabelProps,
} from '@/common';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import type { StringOrNumber, StrNumObjOption } from '@/types';
import {
  fieldNameToLabel,
  getOptionValue,
  isKeyValueOption,
  normalizeSelectValue,
  useFieldIds,
  resolveLabelAboveControl
} from '@/utils';

type InputNativeSelectProps = Omit<
  NativeSelectProps,
  'name' | 'id' | 'labelId' | 'error' | 'onChange' | 'value'
>;

export type RHFNativeSelectProps<
  T extends FieldValues,
  Option extends StrNumObjOption = StrNumObjOption,
  LabelKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
  ValueKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
> = {
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
   * List of options to display in the dropdown.
   * Note:
   * - Works best for small to moderate datasets.
   * - If options exceed ~20 items, `RHFAutocomplete` or `RHFMultiAutocomplete` is
   *   recommended for improved searchability, keyboard navigation, and performance.
   */
  options: Option[];
  /**
   * Object key used to read the display label from each option.
   */
  labelKey?: LabelKey;
  /**
   * Object key used to derive the stored field value when options are an array of objects.
   */
  valueKey?: ValueKey;
  /**
   * Callback fired after the selected native value is normalized and stored in the field.
   * @param value - Normalized selected value from the native select.
   * @param event - Native select change event.
   */
  onValueChange?: (
    value: StringOrNumber | StringOrNumber[],
    event: ChangeEvent<HTMLSelectElement>
  ) => void;
  /**
   * Custom text displayed for the empty value option when
   * `showDefaultOption` is enabled.
   *
   * @default `Select ${fieldLabel}`
   */
  defaultOptionText?: string;
  /**
   * When true, renders the field label above the form field instead of inside or beside it.
   */
  showLabelAboveFormField?: boolean;
  /**
   * Props forwarded to the internal `FormLabel`. The `id` is managed by the component.
   */
  formLabelProps?: Omit<FormLabelProps, 'id'>;
  /**
   * Label content shown for the field. Defaults to a label generated from `fieldName`.
   */
  label?: ReactNode;
  /**
   * Helper text shown below the field when there is no visible validation error.
   */
  helperText?: ReactNode;
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
} & InputNativeSelectProps;

const RHFNativeSelect = <
  T extends FieldValues,
  Option extends StrNumObjOption = StrNumObjOption,
  LabelKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
  ValueKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
>({
  fieldName,
  control,
  registerOptions,
  options,
  labelKey,
  valueKey,
  onValueChange,
  disabled: muiDisabled,
  defaultOptionText,
  showLabelAboveFormField,
  formLabelProps,
  label,
  required,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  sx,
  onBlur,
  autoComplete = defaultAutocompleteValue,
  placeholder,
  ...otherNativeSelectProps
}: RHFNativeSelectProps<T, Option, LabelKey, ValueKey>) => {
  const {
    fieldId,
    labelId,
    helperTextId,
    errorId
  } = useFieldIds(fieldName);

  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const blankOptionText = defaultOptionText ?? placeholder ?? '';
  const { allLabelsAboveFields } = useContext(RHFMuiConfigContext);
  const isLabelAboveControl = resolveLabelAboveControl(
    showLabelAboveFormField,
    allLabelsAboveFields
  );

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
        }
      }) => {
        const isDisabled = muiDisabled || rhfDisabled;
        const isError = !!errorMessage;
        const showHelperTextElement = (!!helperText) || (isError && !hideErrorMessage);

        return (
          <FormControl fullWidth error={isError} disabled={isDisabled}>
            <FormLabel
              label={fieldLabel}
              isVisible={isLabelAboveControl}
              required={required}
              error={isError}
              disabled={isDisabled}
              formLabelProps={{
                ...formLabelProps,
                id: labelId,
                htmlFor: fieldId
              }}
            />
            <NativeSelect
              {...otherNativeSelectProps}
              id={fieldId}
              name={rhfFieldName}
              autoComplete={autoComplete}
              aria-required={required}
              aria-describedby={
                showHelperTextElement
                  ? (isError ? errorId : helperTextId)
                  : undefined
              }
              value={rhfValue ?? ''}
              inputRef={rhfRef}
              disabled={isDisabled}
              onChange={event => {
                const selectedValue = event.target.value;
                const normalizedValue = normalizeSelectValue(
                  selectedValue,
                  options,
                  labelKey,
                  valueKey
                );
                rhfOnChange(normalizedValue);
                onValueChange?.(normalizedValue, event);
              }}
              onBlur={blurEvent => {
                rhfOnBlur();
                onBlur?.(blurEvent);
              }}
              sx={{
                ...sx,
                '&.MuiNativeSelect-root': {
                  margin: 0
                }
              }}
            >
              <option value="" disabled={required}>
                {blankOptionText}
              </option>
              {options.map(option => {
                const isObject = isKeyValueOption(option, labelKey, valueKey);
                const opnValue = getOptionValue<Option, ValueKey>(
                  option,
                  valueKey
                );
                const opnLabel = isObject
                  ? String(option[labelKey!])
                  : String(option);
                return (
                  <option key={opnValue} value={opnValue}>
                    {opnLabel}
                  </option>
                );
              })}
            </NativeSelect>
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

export default RHFNativeSelect;
